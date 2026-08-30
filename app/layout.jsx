import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  metadataBase: new URL('https://vlssytechnologies.in'),
  title: {
    default: 'VLSSY Technologies | AI, LMS & Software Solutions',
    template: '%s | VLSSY Technologies',
  },
  description: 'VLSSY Technologies builds smarter digital platforms through LMS, Moodle, AI automation, custom software, integrations and reliable cloud technology.',
  keywords: ['VLSSY Technologies', 'Moodle', 'LMS', 'AI automation', 'software development', 'cloud', 'SaaS', 'API integration'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'VLSSY Technologies | Technology. Learning. Innovation.',
    description: 'Practical digital platforms, LMS solutions and AI-enabled automation for organizations ready to grow.',
    url: 'https://vlssytechnologies.in/',
    siteName: 'VLSSY Technologies',
    type: 'website',
  },
  icons: { icon: '/images/favicon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
