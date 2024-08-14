import { ALLOWED_ORIGINS, LOCALES, PUBLIC_PAGES } from "./common";

/**
 * Create authentication middleware options
 */
export const authMiddlewareOptions = {
  // Authorize only if token exists
  callbacks: { authorized: ({ token }: any) => token != null },

  // Redirect to login if not authorized
  pages: { signIn: '/login' }
};

/**
 * Check if the page is public
 * @param {string} pathname - Pathname to check
 * @returns  {boolean} - If the page is public
 */
export const isPublicPage = (pathname: string): boolean => {
  const publicPathnameRegex = RegExp(`^(/(${LOCALES.join('|')}))?(${PUBLIC_PAGES.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`, 'i');
  return publicPathnameRegex.test(pathname);
}

/**
 * Is a valid origin - True if origin is allowed or is not production
 */
export const isValidOrigin = (origin: string): boolean => {
  return ALLOWED_ORIGINS.includes(origin) || process.env.NODE_ENV !== 'production';
}