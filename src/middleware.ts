import { authMiddlewareOptions, isPublicPage, isValidOrigin } from '@utils/auth';
import { DEFAULT_LOCALE, LOCALES } from '@utils/intl';
import { withAuth } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Create internationalization middleware 
 */
const intlMiddleware = createMiddleware({ locales: LOCALES, defaultLocale: DEFAULT_LOCALE });

/**
 * Create authentication middleware
 */
const authMiddleware = withAuth(intlMiddleware, authMiddlewareOptions);

/**
 * Middleware to handle requests
 */
const middleware = (req: NextRequest) => {
  // Get pathname from nextUrl
  const { pathname, origin } = req.nextUrl;

  // Handle requests based on the pathname
  switch (true) {
    // Case 1: API request - Allow only requests from allowed origins
    case pathname.startsWith('/api'):
      return isValidOrigin(origin) ? NextResponse.next() : new NextResponse('Forbidden', { status: 403 });

    // Case 2: Public page request - Handle with intlMiddleware
    case isPublicPage(pathname):
      return intlMiddleware(req);

    // Case 3: Protected page request - Handle with authMiddleware
    default:
      return (authMiddleware as any)(req);
  }
};

/**
 * Configuration for the middleware
 */
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'] // Exclude /_next and files with extension
};

export default middleware;