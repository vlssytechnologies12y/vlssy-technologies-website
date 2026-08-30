import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <section className="footer-brand-column">
          <Link className="brand footer-brand" href="/">
            <img src="/images/logo-tech-crop.png" alt="VLSSY Technologies" width="220" height="61" />
          </Link>
          <p className="footer-tagline">Technology. Learning. Innovation.</p>
          <p className="footer-description">Building smarter digital platforms through technology, learning and intelligent automation.</p>
          <div className="social-links" aria-label="Social media profiles">
            <a href="https://www.facebook.com/profile.php?id=61593882333663" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
            <a href="https://www.instagram.com/vlssytechnologies.pvtltd/" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
            <a href="#" aria-label="LinkedIn">in</a>
          </div>
        </section>
        <nav className="footer-column"><h2>Company</h2><Link href="/">Home</Link><Link href="/about/">About</Link><Link href="/services/">Services</Link><Link href="/#industries">Industries</Link><Link href="/contact/">Contact</Link></nav>
        <nav className="footer-column"><h2>Services</h2><Link href="/services/">LMS &amp; Moodle</Link><Link href="/services/">AI Automation</Link><Link href="/services/">Software Development</Link><Link href="/services/">API Integration</Link><Link href="/services/">Cloud &amp; IT</Link><Link href="/services/">SaaS Solutions</Link></nav>
        <section className="footer-column footer-contact-column"><h2>Get in touch</h2><p>Let&apos;s talk about your next project.</p><a href="mailto:info@vlssytechnologies.com">info@vlssytechnologies.com</a><span>vlssytechnologies.in</span></section>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} VLSSY Technologies. All rights reserved.</span><span>Built for better work.</span></div>
    </footer>
  );
}
