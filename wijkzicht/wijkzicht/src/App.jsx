import { useEffect, useState } from 'react'
import { FaArrowLeft, FaHome } from 'react-icons/fa'
import { LuBike, LuHouse, LuLeaf, LuShoppingBag } from 'react-icons/lu'
import bouwfondsLogo from './assets/bouwfonds logo.png'
import desaxGebouw from './assets/desax_gebouw.png'
import bouwfondsAchtergrond from './assets/bouwfondsAchtergrond.png'
import gebouw1 from './assets/gebouw1.png'
import gebouw2 from './assets/gebouw2.jpg'
import gebouw3 from './assets/gebouw3.jpg'
import foto1 from './assets/foto_1.jpg'
import foto2 from './assets/foto_2.jpg'
import foto3 from './assets/foto_3.jpg'
import foto4 from './assets/foto_4.jpg'
import gemeenteRotterdamLogo from './assets/gemeenterotterdamlogo.png'
import dutchFlag from './assets/dutch_flag.png'
import englishFlag from './assets/english_flag.png'
import { developmentFund } from './data/developmentFund'
import { languageOptions, quickLinks } from './data/navigation'
import { projectInfo } from './data/projectInfo'
import { milestones, timelineProgress } from './data/timeline'
import './App.css'

const homeSlides = [
  { image: gebouw2, label: 'De SAX overzicht', position: '62% center' },
  { image: gebouw1, label: 'De SAX gebouwdetail', position: 'center center' },
  { image: gebouw3, label: 'De SAX vanuit de omgeving', position: 'center center' },
]

const homeSlideDuration = 5000
const languageFlags = {
  nl: dutchFlag,
  en: englishFlag,
}
const milestoneDetailImages = {
  gebouw3,
}
const projectInfoImages = {
  foto1,
  foto2,
  foto3,
  foto4,
}
const statIcons = {
  bike: LuBike,
  house: LuHouse,
  leaf: LuLeaf,
  'shopping-bag': LuShoppingBag,
}
const defaultLanguage = 'nl'
const uiText = {
  nl: {
    backHome: 'Terug naar home',
    backTimeline: 'Terug naar tijdlijn',
    languagePicker: 'Taalkeuze',
    languageChange: 'Taal wijzigen naar',
    screenIndicator: 'Schermindicator',
    showSlide: 'tonen',
    mainNavigation: 'Hoofdnavigatie',
    projectProgress: 'Projectvoortgang',
    milestones: 'Mijlpalen',
    projectImages: 'Projectbeelden',
    percent: 'procent',
    milestone: 'Mijlpaal',
    milestoneNotFound: 'Mijlpaal niet gevonden',
    milestoneNotFoundText: 'Deze mijlpaal bestaat niet of is verplaatst.',
    stayUpdated: 'Blijf op de hoogte',
    stayUpdatedTitle: 'Blijf op de hoogte',
    stayUpdatedText: 'Laat je e-mailadres achter en ontvang updates over De Sax.',
    emailLabel: 'E-mailadres',
    emailPlaceholder: 'naam@voorbeeld.nl',
    submitEmail: 'Aanmelden',
    closeModal: 'Sluiten',
    signupSuccess: 'Bedankt, we houden je op de hoogte.',
  },
  en: {
    backHome: 'Back to home',
    backTimeline: 'Back to timeline',
    languagePicker: 'Language selection',
    languageChange: 'Change language to',
    screenIndicator: 'Screen indicator',
    showSlide: 'show',
    mainNavigation: 'Main navigation',
    projectProgress: 'Project progress',
    milestones: 'Milestones',
    projectImages: 'Project images',
    percent: 'percent',
    milestone: 'Milestone',
    milestoneNotFound: 'Milestone not found',
    milestoneNotFoundText: 'This milestone does not exist or has been moved.',
    stayUpdated: 'Stay informed',
    stayUpdatedTitle: 'Stay informed',
    stayUpdatedText: 'Leave your email address and receive updates about De Sax.',
    emailLabel: 'Email address',
    emailPlaceholder: 'name@example.com',
    submitEmail: 'Sign up',
    closeModal: 'Close',
    signupSuccess: 'Thank you, we will keep you informed.',
  },
}

function translate(value, language) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value[language] ?? value[defaultLanguage]
  }

  return value
}

function StatIcon({ icon }) {
  const IconComponent = statIcons[icon]

  if (IconComponent) {
    return <IconComponent aria-hidden="true" focusable="false" />
  }

  return icon
}

function getInitialLanguage() {
  const savedLanguage = window.localStorage.getItem('wijkzicht-language')
  const languageCodes = languageOptions.map((option) => option.code)

  if (languageCodes.includes(savedLanguage)) {
    return savedLanguage
  }

  return defaultLanguage
}

function HomeButton({ t }) {
  return (
    <a className="home-button" href="/" aria-label={t.backHome}>
      <FaHome aria-hidden="true" focusable="false" />
    </a>
  )
}

function BackButton({ t }) {
  return (
    <a className="back-button" href="/tijdlijn" aria-label={t.backTimeline}>
      <FaArrowLeft aria-hidden="true" focusable="false" />
    </a>
  )
}

function LanguageSwitcher({ language, onLanguageChange, t, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const activeLanguage = languageOptions.find((option) => option.code === language) ?? languageOptions[0]

  const handleLanguageSelect = (nextLanguage) => {
    onLanguageChange(nextLanguage)
    setIsOpen(false)
  }

  return (
    <nav className={`language-picker${className ? ` ${className}` : ''}`} aria-label={t.languagePicker}>
      <button
        className="language-picker__trigger"
        type="button"
        aria-expanded={isOpen}
        aria-label={`${t.languagePicker}: ${activeLanguage.label}`}
        onClick={() => setIsOpen((current) => !current)}
      >
        <img src={languageFlags[activeLanguage.code]} alt="" aria-hidden="true" />
        <span className="language-picker__chevron" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="language-picker__menu">
          {languageOptions.map((option) => (
            <button
              className={`language-picker__option${option.code === language ? ' language-picker__option--active' : ''}`}
              type="button"
              key={option.code}
              aria-label={`${t.languageChange} ${option.label}`}
              aria-pressed={option.code === language}
              onClick={() => handleLanguageSelect(option.code)}
            >
              <img src={languageFlags[option.code]} alt="" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

function HomePage({ language, onLanguageChange, t }) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % homeSlides.length)
    }, homeSlideDuration)

    return () => {
      window.clearTimeout(timer)
    }
  }, [activeSlide])

  return (
    <main className="wireframe-shell">
      <section className="wireframe-screen">
        <div className="hero-panel">
          <div className="hero-slides" aria-hidden="true">
            {homeSlides.map((slide, index) => (
              <div
                className={`hero-slide${index === activeSlide ? ' hero-slide--active' : ''}`}
                key={slide.label}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundPosition: slide.position,
                }}
              />
            ))}
          </div>
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title">DE SAX</h1>
          </div>

          <div className="pager" aria-label={t.screenIndicator}>
            {homeSlides.map((slide, index) => (
              <button
                className={`pager-dot${index === activeSlide ? ' pager-dot--active' : ''}`}
                key={slide.label}
                type="button"
                aria-label={`${slide.label} ${t.showSlide}`}
                aria-current={index === activeSlide ? 'true' : undefined}
                onClick={() => setActiveSlide(index)}
                style={{ '--pager-duration': `${homeSlideDuration}ms` }}
              />
            ))}
          </div>
        </div>

        <aside className="side-panel">
          <img className="brand-mark" src={gemeenteRotterdamLogo} alt="Gemeente Rotterdam" />

          <nav className="feature-list" aria-label={t.mainNavigation}>
            {quickLinks.map((link) => (
              <article className="feature-card" key={link.href}>
                <div className="feature-card__image" aria-hidden="true" />
                <div className="feature-card__body">
                  <h2>
                    {translate(link.titleLines, language).map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h2>
                  <a className="feature-card__action" href={link.href} aria-label={translate(link.title, language)}>
                    <span className="feature-card__arrow" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </nav>

          <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} t={t} />
        </aside>
      </section>
    </main>
  )
}

function TimelinePage({ language, onLanguageChange, t }) {
  const progressPercentage = Math.min(Math.max(timelineProgress.percentage, 0), 100)
  const progressRadius = 108
  const progressCircumference = 2 * Math.PI * progressRadius
  const progressDashOffset = progressCircumference * (1 - progressPercentage / 100)

  return (
    <main className="wireframe-shell">
      <section className="timeline-screen">
        <HomeButton t={t} />
        <LanguageSwitcher
          className="language-picker--floating"
          language={language}
          onLanguageChange={onLanguageChange}
          t={t}
        />
        <header className="timeline-hero" style={{ backgroundImage: `url(${desaxGebouw})` }}>
          <div
            className="timeline-progress"
            aria-label={`${t.projectProgress} ${progressPercentage} ${t.percent}`}
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
              <span>{translate(timelineProgress.label, language)}</span>
            </div>
          </div>
        </header>

        <section className="milestone-section" aria-labelledby="milestone-title">
          <h1 id="milestone-title" className="milestone-title">{t.milestones}</h1>
          <div className="milestone-track" role="list">
            {milestones.map((milestone, index) => (
              <article
                className={`milestone-card milestone-card--${index % 2 === 0 ? 'left' : 'right'}${milestone.locked ? ' milestone-card--locked' : ''}`}
                key={milestone.slug}
                role="listitem"
              >
                <div className="milestone-card__content">
                  <h2>{translate(milestone.title, language)}</h2>
                  <p>{translate(milestone.description, language)}</p>
                  {milestone.locked ? (
                    <span className="milestone-card__action milestone-card__action--disabled">
                      {translate(milestone.actionLabel, language)}
                    </span>
                  ) : (
                    <a className="milestone-card__action" href={`/tijdlijn/${milestone.slug}`} aria-label={translate(milestone.title, language)}>
                      <span>{translate(milestone.actionLabel, language)}</span>
                      <span className="milestone-card__action-arrow" aria-hidden="true" />
                    </a>
                  )}
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
          <h2>{translate(developmentFund.title, language)}</h2>
          <p>{translate(developmentFund.description, language)}</p>
          <a href={developmentFund.phoneHref} className="development-fund__phone">
            <span aria-hidden="true">{'\u260E'}</span>
            {developmentFund.phoneLabel}
          </a>
        </article>
      </section>
    </main>
  )
}

function InfoPage({ language, onLanguageChange, t }) {
  const [isSignupOpen, setIsSignupOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSignupSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  const closeSignupModal = () => {
    setIsSignupOpen(false)
    setIsSubmitted(false)
  }

  return (
    <main className="wireframe-shell">
      <section className="info-screen">
        <HomeButton t={t} />
        <LanguageSwitcher
          className="language-picker--floating"
          language={language}
          onLanguageChange={onLanguageChange}
          t={t}
        />
        <section className="info-gallery" aria-label={t.projectImages}>
          <img className="info-gallery__image info-gallery__image--large" src={gebouw1} alt="De SAX gebouwdetail" />
          <img className="info-gallery__image" src={gebouw2} alt="De SAX toren en bruggebouw" />
          <img className="info-gallery__image" src={gebouw3} alt="De SAX vanuit de omgeving" />
        </section>

        <section className="info-content" aria-labelledby="project-info-title">
          <h1 id="project-info-title">{translate(projectInfo.title, language)}</h1>
          <dl className="info-stats">
            {projectInfo.stats.map((stat) => (
              <div className="info-stat" key={stat.value}>
                <dt>{stat.value}</dt>
                <dd>
                  <span className="info-stat__icon" aria-hidden="true">
                    <StatIcon icon={stat.icon} />
                  </span>
                  <span className="info-stat__label">
                    {translate(stat.labelLines, language).map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="project-story" aria-labelledby="project-story-title">
          <div className="project-story__intro">
            <h2 id="project-story-title">{translate(projectInfo.story.title, language)}</h2>
            {translate(projectInfo.story.body, language).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="project-story__sections">
            {projectInfo.storySections.map((section) => (
              <article className="project-story__section" key={translate(section.title, language)}>
                <img
                  className="project-story__image"
                  src={projectInfoImages[section.imageKey]}
                  alt={translate(section.imageAlt, language)}
                />
                <div className="project-story__body">
                  <h2>{translate(section.title, language)}</h2>
                  {translate(section.body, language).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="project-story__cta">
            <button className="project-story__button" type="button" onClick={() => setIsSignupOpen(true)}>
              {t.stayUpdated}
            </button>
          </div>
        </section>

        {isSignupOpen && (
          <div className="signup-modal" role="dialog" aria-modal="true" aria-labelledby="signup-modal-title">
            <div className="signup-modal__backdrop" onClick={closeSignupModal} />
            <form className="signup-modal__panel" onSubmit={handleSignupSubmit}>
              <button
                className="signup-modal__close"
                type="button"
                aria-label={t.closeModal}
                onClick={closeSignupModal}
              >
                ×
              </button>
              <h2 id="signup-modal-title">{t.stayUpdatedTitle}</h2>
              <p>{isSubmitted ? t.signupSuccess : t.stayUpdatedText}</p>
              {!isSubmitted && (
                <>
                  <label className="signup-modal__field">
                    <span>{t.emailLabel}</span>
                    <input
                      type="email"
                      value={email}
                      placeholder={t.emailPlaceholder}
                      required
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </label>
                  <button className="signup-modal__submit" type="submit">
                    {t.submitEmail}
                  </button>
                </>
              )}
            </form>
          </div>
        )}
      </section>
    </main>
  )
}

function MilestoneDetailPage({ language, milestone, onLanguageChange, t }) {
  if (!milestone) {
    return (
      <main className="wireframe-shell">
        <section className="milestone-detail-screen">
          <BackButton t={t} />
          <LanguageSwitcher
            className="language-picker--floating"
            language={language}
            onLanguageChange={onLanguageChange}
            t={t}
          />
          <h1>{t.milestoneNotFound}</h1>
          <p>{t.milestoneNotFoundText}</p>
        </section>
      </main>
    )
  }

  return (
    <main className="wireframe-shell">
      <article className="milestone-detail-screen">
        <BackButton t={t} />
        <LanguageSwitcher
          className="language-picker--floating"
          language={language}
          onLanguageChange={onLanguageChange}
          t={t}
        />
        <time className="milestone-detail__date" dateTime={milestone.dateTime}>
          <span>{milestone.date.month}</span>
          <strong>{milestone.date.day}</strong>
          <span>{milestone.date.year}</span>
        </time>
        <p className="milestone-detail__eyebrow">{t.milestone}</p>
        <h1>{translate(milestone.detailTitle, language)}</h1>
        <p className="milestone-detail__summary">{translate(milestone.description, language)}</p>
        <p className="milestone-detail__text">{translate(milestone.detailText, language)}</p>
        {milestone.detailSections?.length > 0 && (
          <div className="milestone-detail__sections">
            {milestone.detailSections.map((section) => (
              <section className="milestone-detail__section" key={translate(section.title, language)}>
                {section.imageKey && (
                  <img
                    className="milestone-detail__section-image"
                    src={milestoneDetailImages[section.imageKey]}
                    alt={translate(section.imageAlt, language)}
                  />
                )}
                <h2>{translate(section.title, language)}</h2>
                {translate(section.body, language).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        )}
      </article>
    </main>
  )
}

function App() {
  const { pathname } = window.location
  const [language, setLanguage] = useState(getInitialLanguage)
  const t = uiText[language]

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage)
    window.localStorage.setItem('wijkzicht-language', nextLanguage)
  }

  if (pathname.startsWith('/tijdlijn/')) {
    const slug = pathname.replace('/tijdlijn/', '')
    const milestone = milestones.find((item) => item.slug === slug && !item.locked)

    return (
      <MilestoneDetailPage
        language={language}
        milestone={milestone}
        onLanguageChange={handleLanguageChange}
        t={t}
      />
    )
  }

  if (pathname === '/tijdlijn') {
    return <TimelinePage language={language} onLanguageChange={handleLanguageChange} t={t} />
  }

  if (pathname === '/info') {
    return <InfoPage language={language} onLanguageChange={handleLanguageChange} t={t} />
  }

  return <HomePage language={language} onLanguageChange={handleLanguageChange} t={t} />
}

export default App
