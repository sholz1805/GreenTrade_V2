import { Montserrat } from 'next/font/google';
import '../styles/globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: "GreenTrade Africa V2",
  description: "Greentrade africa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}