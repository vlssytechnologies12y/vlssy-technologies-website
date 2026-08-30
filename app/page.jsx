import Link from 'next/link';

const services = [
  { n: '01', title: 'LMS & Moodle', text: 'Learning platforms built around people, content and outcomes.', tone: 'navy' },
  { n: '02', title: 'AI & Automation', text: 'Intelligent workflows that remove repetitive work.', tone: 'mint' },
  { n: '03', title: 'Custom Software', text: 'Focused products for the way your organization operates.', tone: 'white' },
  { n: '04', title: 'API & Integration', text: 'Connect systems, data and teams without the friction.', tone: 'white' },
  { n: '05', title: 'Cloud & IT', text: 'Reliable infrastructure designed for scale and resilience.', tone: 'mint' },
  { n: '06', title: 'SaaS Products', text: 'From product thinking to production-ready software.', tone: 'white' },
];

const industries = ['Education', 'Healthcare', 'Corporate', 'Training & Learning', 'Professional Services', 'Government'];
const stack = ['AI', 'Moodle', 'Next.js', 'Laravel', 'Node.js', 'APIs', 'Cloud', 'H5P'];

const faqs = [
  ['Can you modernize our existing LMS?', 'Yes. We can redesign the experience, workflows, integrations, reporting and administration without losing the platform capabilities you already rely on.'],
  ['Can AI be added to an existing system?', 'Yes. We focus on useful AI: assistants, document processing, workflow automation, search and reporting that fit your actual business process.'],
  ['Do you provide ongoing support?', 'Yes. We provide maintenance, monitoring, upgrades, troubleshooting and continuous improvement for the systems we build or inherit.'],
  ['Can you connect our existing applications?', 'Yes. We design API-led integrations between LMS, ERP, CRM, HR and other business systems.'],
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  return (
    <main className="home-modern">
      <section className="hm-hero">
        <div className="hm-hero-noise" />
        <div className="hm-hero-orb orb-a" />
        <div className="hm-hero-orb orb-b" />
        <div className="container hm-hero-inner">
          <div className="hm-hero-copy">
            <div className="hm-kicker"><i /> AI · DIGITAL · LEARNING</div>
            <h1>Build what’s <span>next.</span></h1>
            <p>We design intelligent digital products, learning platforms and automation that make complex work feel simple.</p>
            <div className="hm-actions">
              <Link className="hm-button" href="/contact/">Start a project <Arrow /></Link>
              <Link className="hm-quiet-link" href="/services/">Explore capabilities <Arrow /></Link>
            </div>
            <div className="hm-trust-line"><span>Trusted technology partner</span><b /> <span>AI · LMS · Software · Cloud</span></div>
          </div>

          <div className="hm-hero-visual" aria-label="Abstract AI technology visualization">
            <div className="hm-grid" />
            <div className="hm-visual-ring ring-1" />
            <div className="hm-visual-ring ring-2" />
            <div className="hm-visual-ring ring-3" />
            <div className="hm-core-glow" />
            <div className="hm-core"><span>V</span><b>VLSSY</b><small>intelligence</small></div>
            <div className="hm-chip chip-ai"><strong>✦</strong><span>AI</span><small>assist</small></div>
            <div className="hm-chip chip-lms"><strong>◈</strong><span>LMS</span><small>learn</small></div>
            <div className="hm-chip chip-api"><strong>⌁</strong><span>API</span><small>connect</small></div>
            <div className="hm-chip chip-cloud"><strong>○</strong><span>Cloud</span><small>scale</small></div>
            <div className="hm-mini-card"><small>WORKFLOW</small><strong>Automated</strong><div><i /><i /><i /><i /></div></div>
          </div>
        </div>
        <div className="container hm-metrics">
          <div><b>AI</b><span>Practical intelligence</span></div>
          <div><b>LMS</b><span>Learning ecosystems</span></div>
          <div><b>API</b><span>Connected systems</span></div>
          <div><b>24/7</b><span>Reliable support</span></div>
        </div>
      </section>

      <section className="hm-intro">
        <div className="container hm-intro-grid">
          <div>
            <span className="hm-label">01 / THE APPROACH</span>
            <h2>Technology should give your team <em>an edge.</em></h2>
          </div>
          <div className="hm-intro-right">
            <p className="hm-lead">Less complexity. Better systems. More room for people to do meaningful work.</p>
            <p>We bring product thinking, engineering and AI together to create digital experiences that are useful today and ready for tomorrow.</p>
            <Link className="hm-inline" href="/about/">How we work <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="hm-services">
        <div className="container">
          <div className="hm-section-top"><div><span className="hm-label">02 / CAPABILITIES</span><h2>One partner.<br /><em>Many possibilities.</em></h2></div><p>From one workflow to a complete digital ecosystem.</p></div>
          <div className="hm-service-grid">
            {services.map((item) => (
              <Link href="/services/" className={`hm-service-card ${item.tone}`} key={item.n}>
                <div className="hm-card-top"><span>{item.n}</span><Arrow /></div>
                <div className="hm-card-icon">{item.n === '02' ? '✦' : item.n === '04' ? '⌁' : item.n === '05' ? '◌' : '◫'}</div>
                <h3>{item.title}</h3><p>{item.text}</p>
                <small>Explore <Arrow /></small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-ai-feature" id="ai">
        <div className="container hm-ai-grid">
          <div className="hm-product-visual">
            <div className="hm-window">
              <div className="hm-window-bar"><span /><span /><span /><b>VLSSY / AI WORKSPACE</b></div>
              <div className="hm-window-body">
                <div className="hm-ai-title"><span>AI assistant</span><b>● online</b></div>
                <div className="hm-message user-msg">Turn this monthly report into a clear action plan.</div>
                <div className="hm-message ai-msg"><i>✦</i><div><strong>Here’s the signal.</strong><p>3 priorities found · 2 workflows can be automated · 1 decision needs review.</p><div className="hm-signal"><span>Priority</span><b>82%</b><i /></div></div></div>
                <div className="hm-input">Ask something useful <span>↑</span></div>
              </div>
            </div>
          </div>
          <div className="hm-feature-copy"><span className="hm-label">03 / AI, WITHOUT THE HYPE</span><h2>Make busywork <em>disappear.</em></h2><p>AI should not feel like another tool to manage. We embed intelligence directly into the workflows your team already uses.</p><div className="hm-feature-points"><span>Automate repetitive work</span><span>Search your knowledge instantly</span><span>Turn documents into decisions</span><span>Build smarter customer support</span></div><Link className="hm-button" href="/contact/">Talk about AI <Arrow /></Link></div>
        </div>
      </section>

      <section className="hm-lms-feature" id="lms">
        <div className="container hm-lms-grid">
          <div className="hm-feature-copy"><span className="hm-label">04 / LEARNING SYSTEMS</span><h2>Learning that feels <em>effortless.</em></h2><p>Powerful Moodle and LMS solutions with a cleaner experience for administrators, instructors and learners.</p><div className="hm-pill-list"><span>Course management</span><span>Assessments</span><span>SCORM / H5P</span><span>Certificates</span><span>Reports</span><span>Integrations</span></div><Link className="hm-dark-button" href="/contact/">Build your LMS <Arrow /></Link></div>
          <div className="hm-dashboard">
            <div className="hm-dash-card"><div className="hm-dash-head"><span>Learning overview</span><b>Live</b></div><div className="hm-dash-score"><small>COMPLETION</small><strong>84.6%</strong></div><div className="hm-dash-bars">{[42,58,48,74,63,88,70].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div><div className="hm-dash-footer"><span>124 courses</span><span>24 cohorts</span><span>1,208 learners</span></div></div>
            <div className="hm-dash-badge">Moodle <b>+</b> AI</div>
          </div>
        </div>
      </section>

      <section className="hm-industries">
        <div className="container"><div className="hm-section-top"><div><span className="hm-label">05 / BUILT AROUND PEOPLE</span><h2>For teams with <em>work to move.</em></h2></div><p>Digital systems should fit the organization — not force the organization to fit the system.</p></div><div className="hm-industry-grid">{industries.map((item,i)=><div key={item}><span>0{i+1}</span><strong>{item}</strong><Arrow /></div>)}</div></div>
      </section>

      <section className="hm-stack"><div className="container"><div className="hm-stack-copy"><span className="hm-label">06 / OUR TOOLKIT</span><h2>Modern by default.<br /><em>Proven where it matters.</em></h2><p>We use dependable platforms and modern engineering where each one creates real value.</p></div><div className="hm-stack-cloud">{stack.map((item,i)=><span key={item} className={i===0||i===1?'featured':''}>{item}</span>)}</div></div></section>

      <section className="hm-faq"><div className="container hm-faq-grid"><div><span className="hm-label">07 / QUESTIONS</span><h2>Let’s make it <em>clear.</em></h2><p>Not sure where to start? Tell us what feels difficult today. We’ll help map the next step.</p><Link className="hm-inline" href="/contact/">Start a conversation <Arrow /></Link></div><div className="hm-faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>

      <section className="hm-cta"><div className="container"><span className="hm-label">READY WHEN YOU ARE</span><h2>Have a complex idea?<br /><em>Let’s make it simple.</em></h2><Link className="hm-white-button" href="/contact/">Start a conversation <Arrow /></Link></div></section>
    </main>
  );
}
