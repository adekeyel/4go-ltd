const work = [
  { name: 'OffPay', area: 'Fintech', text: 'Digital payments and wallet technology.' },
  { name: '4GO Chatting App', area: 'Communication', text: 'A messaging application for everyday conversation.' },
  { name: 'NexusDesk', area: 'Business software', text: 'Helpdesk and customer support technology.' },
  { name: 'Leaf', area: 'Digital product', text: 'A product from the 4GO portfolio.' },
]

export default function Portfolio() {
  return (
    <section className="border-y border-line bg-mist py-24 sm:py-32" aria-labelledby="portfolio-heading">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 id="portfolio-heading" className="text-4xl font-bold leading-[1.05] sm:text-5xl">Built by 4GO</h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-slate">
            A selection of the digital products our team has built across different categories of technology.
          </p>
        </div>

        <ul className="border-t border-ink">
          {work.map((w) => (
            <li key={w.name} className="grid gap-1 border-b border-line py-6 sm:grid-cols-[1fr_1.4fr] sm:gap-8">
              <div>
                <h3 className="text-xl font-bold">{w.name}</h3>
                <p className="text-sm text-slate">{w.area}</p>
              </div>
              <p className="leading-relaxed text-slate">{w.text}</p>
            </li>
          ))}
          <li className="border-b border-line py-6 text-slate">More in development.</li>
        </ul>
      </div>
    </section>
  )
}
