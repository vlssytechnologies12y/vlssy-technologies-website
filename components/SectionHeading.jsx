export default function SectionHeading({ eyebrow, title, children, dark = false }) {
  return <div className={`section-heading ${dark ? 'on-dark' : ''}`}><div><p className="eyebrow">{eyebrow}</p><h2 dangerouslySetInnerHTML={{ __html: title }} /></div>{children && <div className="section-intro">{children}</div>}</div>;
}
