type Props = {
  id: string
  ta: string
  en: string
  tone: 'navy' | 'cream'
  align?: 'left' | 'center'
}

export default function SectionHeading({ id, ta, en, tone, align = 'left' }: Props) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''
  return (
    <header className={`mb-10 max-w-3xl sm:mb-14 ${alignClass}`}>
      <h2
        id={id}
        className={`font-display text-4xl font-extrabold leading-[1.3] sm:text-5xl ${tone === 'navy' ? 'gold-text' : 'text-midnight-800'}`}
        style={{ textWrap: 'balance' }}
      >
        {ta}
      </h2>
      <p className={`mt-2 font-display text-xl font-medium ${tone === 'navy' ? 'text-white/80' : 'text-midnight-700/80'}`}>{en}</p>
    </header>
  )
}
