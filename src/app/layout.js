import './globals.css';

import Footer from '../components/footer/Footer';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Home | Next.js',
    template: '%s | Next.js',
  },
  description: 'Next.js starter app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
