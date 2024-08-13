import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className='dark'>
        <NextIntlClientProvider messages={messages}>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 5000,
              error: {
                style: { background: '#D35400', color: '#fff' },
                iconTheme: { primary: '#fff', secondary: '#ff4d4f' }
              },
              success: {
                style: { background: '#52c41a', color: '#fff' },
                iconTheme: { primary: '#fff', secondary: '#52c41a' }
              }
            }} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}