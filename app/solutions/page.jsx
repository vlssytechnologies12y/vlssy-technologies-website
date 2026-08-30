import Link from 'next/link';
import styles from './Solutions.module.css';

const solutions = [
  {
    number: '01',
    icon: '✦',
    title: 'AI & Automation',
    description:
      'AI-powered workflows that reduce repetitive work and help teams move faster.',
    tags: ['AI workflows', 'Automation', 'Assistants'],
  },
  {
    number: '02',
    icon: '◈',
    title: 'Learning Platforms',
    description:
      'Modern LMS solutions for training, assessment, certification and learner management.',
    tags: ['LMS', 'Training', 'Assessment'],
  },
  {
    number: '03',
    icon: '⌘',
    title: 'Custom Software',
    description:
      'Purpose-built digital products designed around your people, processes and goals.',
    tags: ['Web apps', 'Enterprise', 'Integrations'],
  },
  {
    number: '04',
    icon: '↗',
    title: 'API & Integration',
    description:
      'Reliable connections between your systems, applications and digital workflows.',
    tags: ['APIs', 'Systems', 'Workflows'],
  },
  {
    number: '05',
    icon: '▣',
    title: 'Cloud & IT',
    description:
      'Scalable infrastructure and technology support designed for dependable growth.',
    tags: ['Cloud', 'Infrastructure', 'Support'],
  },
  {
    number: '06',
    icon: '◎',
    title: 'SaaS Products',
    description:
      'Scalable software products built from a clear idea through production and growth.',
    tags: ['SaaS', 'Product', 'Scale'],
  },
];

const capabilities = [
  'Digital transformation',
  'Enterprise applications',
  'Learning technology',
  'AI implementation',
  'Business automation',
  'System integration',
];

const process = [
  {
    number: '01',
    title: 'Understand',
    text: 'We start with your users, processes and business objectives.',
  },
  {
    number: '02',
    title: 'Design',
    text: 'We turn requirements into clear experiences and practical technology.',
  },
  {
    number: '03',
    title: 'Build',
    text: 'We create secure, scalable and production-ready solutions.',
  },
  {
    number: '04',
    title: 'Improve',
    text: 'We keep refining the product as your organization evolves.',
  },
];

export default function SolutionsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroOrb} />
        <div className={styles.container}>
          <div className={styles.eyebrow}>
            <span />
            VLSSY TECHNOLOGIES
            <b>/</b>
            SOLUTIONS
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1>
                Technology built
                <em> for what’s next.</em>
              </h1>

              <p>
                AI, software, learning and automation designed to make
                complex work simpler.
              </p>

              <div className={styles.actions}>
                <Link href="/contact/" className={styles.primaryButton}>
                  Start a conversation
                  <strong>↗</strong>
                </Link>

                <Link href="/services/" className={styles.secondaryLink}>
                  Explore capabilities
                  <strong>↗</strong>
                </Link>
              </div>
            </div>

            <div className={styles.visual} aria-hidden="true">
              <div className={`${styles.orbit} ${styles.orbitOne}`} />
              <div className={`${styles.orbit} ${styles.orbitTwo}`} />
              <div className={`${styles.orbit} ${styles.orbitThree}`} />

              <div className={styles.glow} />

              <div className={styles.core}>
                <span>V</span>
                <b>VLSSY</b>
                <small>INTELLIGENCE</small>
              </div>

              <div className={`${styles.chip} ${styles.chipAi}`}>
                <b>AI</b>
                <small>assist</small>
              </div>

              <div className={`${styles.chip} ${styles.chipLms}`}>
                <b>LMS</b>
                <small>learn</small>
              </div>

              <div className={`${styles.chip} ${styles.chipApi}`}>
                <b>API</b>
                <small>connect</small>
              </div>

              <div className={`${styles.chip} ${styles.chipCloud}`}>
                <b>Cloud</b>
                <small>scale</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div>
              <span className={styles.label}>WHAT WE BUILD</span>
              <h2>
                Technology that
                <em> moves work forward.</em>
              </h2>
            </div>

            <p>
              We combine practical technology with thoughtful design to solve
              real business problems without unnecessary complexity.
            </p>
          </div>

          <div className={styles.capabilityGrid}>
            {capabilities.map((item, index) => (
              <div className={styles.capability} key={item}>
                <span>0{index + 1}</span>
                <b>{item}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.solutions}>
        <div className={styles.container}>
          <div className={styles.sectionTop}>
            <div>
              <span className={styles.label}>OUR CAPABILITIES</span>
              <h2>
                Built around
                <em> real problems.</em>
              </h2>
            </div>

            <p>
              Choose the technology your organization needs today and build
              toward what comes next.
            </p>
          </div>

          <div className={styles.solutionGrid}>
            {solutions.map((item) => (
              <article className={styles.card} key={item.number}>
                <div className={styles.cardTop}>
                  <span>{item.number}</span>
                  <i>{item.icon}</i>
                </div>

                <div className={styles.cardBody}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <div className={styles.tags}>
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <Link href="/contact/" className={styles.cardLink}>
                  Discuss a project
                  <strong>↗</strong>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.feature}>
        <div className={styles.container}>
          <div className={styles.featureGrid}>
            <div className={styles.dashboard}>
              <div className={styles.dashboardBar}>
                <span />
                <span />
                <span />
                <b>VLSSY / intelligence</b>
              </div>

              <div className={styles.dashboardBody}>
                <small>BUSINESS PERFORMANCE</small>
                <h3>Automation impact</h3>

                <div className={styles.bars}>
                  <i style={{ height: '36%' }} />
                  <i style={{ height: '49%' }} />
                  <i style={{ height: '43%' }} />
                  <i style={{ height: '67%' }} />
                  <i style={{ height: '59%' }} />
                  <i style={{ height: '84%' }} />
                  <i style={{ height: '76%' }} />
                </div>

                <div className={styles.metrics}>
                  <div>
                    <small>Efficiency</small>
                    <b>+46%</b>
                  </div>
                  <div>
                    <small>Automated</small>
                    <b>68%</b>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.featureCopy}>
              <span className={styles.label}>TECHNOLOGY WITH PURPOSE</span>
              <h2>
                Make complex
                <em> work feel simple.</em>
              </h2>
              <p>
                Better systems should feel clear to the people using them.
                We connect technology, people and processes into one
                practical experience.
              </p>

              <div className={styles.featurePoints}>
                <span>Practical technology</span>
                <span>Scalable architecture</span>
                <span>Human-centered design</span>
                <span>Long-term support</span>
              </div>

              <Link href="/contact/" className={styles.lightButton}>
                Talk to our team
                <strong>↗</strong>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.container}>
          <div className={styles.sectionTop}>
            <div>
              <span className={styles.label}>HOW WE WORK</span>
              <h2>
                From idea
                <em> to impact.</em>
              </h2>
            </div>

            <p>
              A clear process keeps every project focused, useful and ready
              for the real world.
            </p>
          </div>

          <div className={styles.processGrid}>
            {process.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <div>
            <span className={styles.ctaLabel}>HAVE A PROJECT IN MIND?</span>
            <h2>
              Let’s build something
              <em> useful.</em>
            </h2>
          </div>

          <Link href="/contact/" className={styles.ctaButton}>
            Let’s talk
            <strong>↗</strong>
          </Link>
        </div>
      </section>
    </main>
  );
}
