export function SectionHeading({ eyebrow, title, description, centered = false }: { eyebrow?: string; title: string; description?: string; centered?: boolean }) {
  return <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>{eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.18em] text-net-primary">{eyebrow}</p> : null}<h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-net-accent sm:text-4xl">{title}</h2>{description ? <p className="mt-4 text-base leading-7 text-net-neutral-600 sm:text-lg">{description}</p> : null}</div>;
}
