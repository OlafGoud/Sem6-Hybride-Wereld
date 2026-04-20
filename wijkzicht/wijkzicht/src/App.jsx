import bouwfondsLogo from './assets/bouwfonds logo.png'
import desaxGebouw from './assets/desax_gebouw.png'
import bouwfondsAchtergrond from './assets/bouwfondsAchtergrond.png'
import gemeenteRotterdamLogo from './assets/gemeenterotterdamlogo.png'
import dutchFlag from './assets/dutch_flag.png'
import { developmentFund } from './data/developmentFund'
import { languageOptions, quickLinks } from './data/navigation'
import { milestones, timelineProgress } from './data/timeline'
import './App.css'

function HomePage() {
  const handleLanguageChange = (event) => {
    const { value } = event.target

    if (value) {
      window.location.href = value
    }
  }

  return (
    <main className="wireframe-shell">
      <section className="wireframe-screen">
        <div className="hero-panel" style={{ backgroundImage: `url(${desaxGebouw})` }}>
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title">DE SAX</h1>
          </div>

          <div className="pager" aria-label="Schermindicator">
            <span className="pager-dot pager-dot--active" />
            <span className="pager-dot" />
            <span className="pager-dot" />
          </div>
        </div>

        <aside className="side-panel">
          <img className="brand-mark" src={gemeenteRotterdamLogo} alt="Gemeente Rotterdam" />

          <nav className="feature-list" aria-label="Hoofdnavigatie">
            {quickLinks.map((link) => (
              <article className="feature-card" key={link.href}>
                <div className="feature-card__image" aria-hidden="true" />
                <div className="feature-card__body">
                  <h2>
                    {link.titleLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h2>
                  <a className="feature-card__action" href={link.href} aria-label={link.title}>
                    <span className="feature-card__arrow" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </nav>

          <label className="language-picker">
            <span className="language-picker__chevron" aria-hidden="true" />
            <select defaultValue={languageOptions[0].value} onChange={handleLanguageChange}>
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <img className="language-picker__flag" src={dutchFlag} alt="" aria-hidden="true" />
          </label>
        </aside>
      </section>
    </main>
  )
}

function TimelinePage() {
  const progressPercentage = Math.min(Math.max(timelineProgress.percentage, 0), 100)
  const progressRadius = 108
  const progressCircumference = 2 * Math.PI * progressRadius
  const progressDashOffset = progressCircumference * (1 - progressPercentage / 100)

  return (
    <main className="wireframe-shell">
      <section className="timeline-screen">
        <header className="timeline-hero" style={{ backgroundImage: `url(${desaxGebouw})` }}>
          <div
            className="timeline-progress"
            aria-label={`Projectvoortgang ${progressPercentage} procent`}
          >
            <svg className="timeline-progress__ring" viewBox="0 0 260 260" aria-hidden="true">
              <circle className="timeline-progress__track" cx="130" cy="130" r={progressRadius} />
              <circle
                className="timeline-progress__value"
                cx="130"
                cy="130"
                r={progressRadius}
                strokeDasharray={progressCircumference}
                strokeDashoffset={progressDashOffset}
              />
            </svg>
            <div className="timeline-progress__content">
              <strong>{progressPercentage}%</strong>
              <span>{timelineProgress.label}</span>
            </div>
          </div>
        </header>

        <section className="milestone-section" aria-labelledby="milestone-title">
          <h1 id="milestone-title" className="milestone-title">Mijlpalen</h1>
          <div className="milestone-track" role="list">
            {milestones.map((milestone, index) => (
              <article
                className={`milestone-card milestone-card--${index % 2 === 0 ? 'left' : 'right'}`}
                key={milestone.title}
                role="listitem"
              >
                <div className="milestone-card__content">
                  <h2>{milestone.title}</h2>
                  <p>{milestone.description}</p>
                  <a className="milestone-card__action" href="/tijdlijn" aria-label={milestone.title}>
                    <span>{milestone.actionLabel}</span>
                    <span className="milestone-card__action-arrow" aria-hidden="true" />
                  </a>
                </div>
                <time className="milestone-card__date" dateTime={milestone.dateTime}>
                  <span className="milestone-card__date-month">{milestone.date.month}</span>
                  <span className="milestone-card__date-day">{milestone.date.day}</span>
                  <span className="milestone-card__date-year">{milestone.date.year}</span>
                </time>
              </article>
            ))}
          </div>
        </section>

        <article className="development-fund" style={{ backgroundImage: `url(${bouwfondsAchtergrond})` }}>
          <img className="development-fund__logo" src={bouwfondsLogo} alt="" aria-hidden="true" />
          <h2>{developmentFund.title}</h2>
          <p>{developmentFund.description}</p>
          <a href={developmentFund.phoneHref} className="development-fund__phone">
            <span aria-hidden="true">{'\u260E'}</span>
            {developmentFund.phoneLabel}
          </a>
        </article>
      </section>
    </main>
  )
}

function App() {
  const isTimelinePage = window.location.pathname === '/tijdlijn'

  return isTimelinePage ? <TimelinePage /> : <HomePage />
}

export default App
