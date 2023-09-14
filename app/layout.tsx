import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Email Generator',
  description: 'personalized email generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <div className="w-screen h-screen relative">
          <aside className="absolute left-0 top-0 h-full w-[200px] border-r border-black/40 bg-[#202123]">
            <div className="px-4 my-4">
              <span className="text-3xl text-white">Email-GPT</span>
            </div>
          </aside>
          <div className="ml-[200px] h-full w-[calc(100vw-200px)]">
            <header className="h-[60px] border-b border-black/40">
              <nav className="px-4 h-full">
                <div className="flex items-center justify-end h-full">
                  <Image
                    src="/logo.png"
                    alt="website logo"
                    width={40}
                    height={40}
                    style={{ borderRadius: '20%' }}
                  />
                </div>
              </nav>
            </header>
            <div className="h-[calc(100vh-60px)]">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
