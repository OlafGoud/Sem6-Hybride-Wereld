import bouwfondsLogo from './assets/bouwfonds logo.png'
import desaxGebouw from './assets/desax_gebouw.png'
import bouwfondsAchtergrond from './assets/bouwfondsAchtergrond.png'
import gebouw1 from './assets/gebouw1.png'
import gebouw2 from './assets/gebouw2.png'
import gebouw3 from './assets/gebouw3.png'
import gemeenteRotterdamLogo from './assets/gemeenterotterdamlogo.png'
import dutchFlag from './assets/dutch_flag.png'
import { developmentFund } from './data/developmentFund'
import { languageOptions, quickLinks } from './data/navigation'
import { projectInfo } from './data/projectInfo'
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
                  <a className="milestone-card__action" href={`/tijdlijn/${milestone.slug}`} aria-label={milestone.title}>
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

function InfoPage() {
  return (
    <main className="wireframe-shell">
      <section className="info-screen">
        <section className="info-gallery" aria-label="Projectbeelden">
          <img className="info-gallery__image info-gallery__image--large" src={gebouw1} alt="De SAX gebouwdetail" />
          <img className="info-gallery__image" src={gebouw2} alt="De SAX toren en bruggebouw" />
          <img className="info-gallery__image" src={gebouw3} alt="De SAX vanuit de omgeving" />
        </section>

        <section className="info-content" aria-labelledby="project-info-title">
          <h1 id="project-info-title">{projectInfo.title}</h1>
          <dl className="info-stats">
            {projectInfo.stats.map((stat) => (
              <div className="info-stat" key={stat.value}>
                <dt>{stat.value}</dt>
                <dd>
                  <span className="info-stat__icon" aria-hidden="true">{stat.icon}</span>
                  <span className="info-stat__label">
                    {stat.labelLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </section>
    </main>
  )
}

function MilestoneDetailPage({ milestone }) {
  if (!milestone) {
    return (
      <main className="wireframe-shell">
        <section className="milestone-detail-screen">
          <a className="milestone-detail__back" href="/tijdlijn">Terug naar tijdlijn</a>
          <h1>Mijlpaal niet gevonden</h1>
          <p>Deze mijlpaal bestaat niet of is verplaatst.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="wireframe-shell">
      <article className="milestone-detail-screen">
        <a className="milestone-detail__back" href="/tijdlijn">Terug naar tijdlijn</a>
        <time className="milestone-detail__date" dateTime={milestone.dateTime}>
          <span>{milestone.date.month}</span>
          <strong>{milestone.date.day}</strong>
          <span>{milestone.date.year}</span>
        </time>
        <p className="milestone-detail__eyebrow">Mijlpaal</p>
        <h1>{milestone.detailTitle}</h1>
        <p className="milestone-detail__summary">{milestone.description}</p>
        <p className="milestone-detail__text">{milestone.detailText}</p>
      </article>
    </main>
  )
}

function App() {
  const { pathname } = window.location

  if (pathname.startsWith('/tijdlijn/')) {
    const slug = pathname.replace('/tijdlijn/', '')
    const milestone = milestones.find((item) => item.slug === slug)

    return <MilestoneDetailPage milestone={milestone} />
  }

  if (pathname === '/tijdlijn') {
    return <TimelinePage />
  }

  if (pathname === '/info') {
    return <InfoPage />
  }

  return <HomePage />
}

export default App
