'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const services = [
  ['lms', 'LMS / Moodle'], ['ai', 'AI Automation'], ['software', 'Software Development'],
  ['integration', 'API Integration'], ['cloud', 'Cloud & IT'], ['saas', 'SaaS'], ['other', 'Other'],
];

export default function ContactForm() {
  const params = useSearchParams();
  const [service, setService] = useState('');
  const [status, setStatus] = useState({ type: '', text: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const requested = params.get('service');
    if (services.some(([value]) => value === requested)) setService(requested);
  }, [params]);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSending(true);
    setStatus({ type: '', text: '' });
    const data = new FormData(form);
    const selected = services.find(([value]) => value === data.get('service'));
    const extra = [data.get('company') && `Company: ${data.get('company')}`, data.get('phone') && `Phone: ${data.get('phone')}`].filter(Boolean).join('\n');
    const message = extra ? `${extra}\n\n${data.get('message')}` : data.get('message');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: data.get('name'), email: data.get('email'), subject: selected?.[1] || '', message }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || 'Unable to send your message.');
      setStatus({ type: 'success', text: result.message || 'Your message has been sent successfully.' });
      form.reset();
      setService('');
    } catch {
      setStatus({ type: 'error', text: 'We could not send your message right now. Please try again or email us directly.' });
    } finally { setSending(false); }
  }

  return <form className="contact-form glass-card" onSubmit={submit}>
    <div className="form-intro"><span className="form-badge">01</span><div><h3>Tell us what you&apos;re building</h3><p>A few details are enough to start a useful conversation.</p></div></div>
    <div className="form-grid">
      <div className="form-row"><label htmlFor="name">Name <sup>*</sup></label><input id="name" name="name" required autoComplete="name" placeholder="Your name" /></div>
      <div className="form-row"><label htmlFor="company">Company</label><input id="company" name="company" autoComplete="organization" placeholder="Organization" /></div>
      <div className="form-row"><label htmlFor="email">Email <sup>*</sup></label><input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" /></div>
      <div className="form-row"><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 ..." /></div>
      <div className="form-row full"><label htmlFor="service">Service <sup>*</sup></label><select id="service" name="service" value={service} onChange={e => setService(e.target.value)} required><option value="">Choose a service</option>{services.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
      <div className="form-row full"><label htmlFor="message">Message <sup>*</sup></label><textarea id="message" name="message" rows="6" required placeholder="Tell us about the problem, project or idea..." /></div>
    </div>
    <div className="form-actions"><button className="button" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send enquiry'} <span>↗</span></button><p>We&apos;ll review your enquiry and get back to you shortly.</p></div>
    {status.text && <p className={`form-status ${status.type}`}>{status.text}</p>}
  </form>;
}
