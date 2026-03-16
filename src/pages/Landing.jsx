import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Landing.css'

const seasons = [
  { name: 'Spring', emoji: '🌸', desc: 'Warm & Light', colors: ['#F4A261', '#E9C46A', '#F7C59F', '#FFCBA4', '#FAD7A0'] },
  { name: 'Summer', emoji: '🌊', desc: 'Cool & Light', colors: ['#A8DADC', '#B8C0CC', '#C9ADA7', '#D4B8E0', '#B5C7D3'] },
  { name: 'Autumn', emoji: '🍂', desc: 'Warm & Deep', colors: ['#C1440E', '#8B6914', '#6B4F12', '#A0522D', '#D2691E'] },
  { name: 'Winter', emoji: '❄️', desc: 'Cool & Deep', colors: ['#2C3E6B', '#6B2D5E', '#1A5C3A', '#8B1A1A', '#2C2C2C'] },
]

export default function Landing() {
  const { user } = useAuth()

  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="container hero-content">
          <p className="hero-eyebrow fade-up" style={{ animationDelay: '0s' }}>Seasonal Colour Analysis</p>
          <h1 className="hero-title fade-up" style={{ animationDelay: '0.1s' }}>
            Discover the Colours<br />
            <em>That Were Made For You</em>
          </h1>
          <p className="hero-subtitle fade-up" style={{ animationDelay: '0.2s' }}>
            Upload your photo or answer a few questions.<br />
            Our AI analyses your natural colouring and reveals your perfect palette.
          </p>
          <div className="hero-actions fade-up" style={{ animationDelay: '0.3s' }}>
            <Link to={user ? '/analysis' : '/auth'} className="btn btn-primary">Begin Your Analysis</Link>
            <a href="#how" className="btn btn-ghost">Learn More</a>
          </div>
        </div>
        <div className="hero-scroll-hint">scroll</div>
      </section>

      <section className="seasons-section" id="seasons">
        <div className="container">
          <div className="section-header">
            <h2>The Four Seasons</h2>
            <p>Everyone falls into one of four seasonal colour families, each with unique undertones and depths.</p>
          </div>
          <div className="seasons-grid">
            {seasons.map((s, i) => (
              <div key={s.name} className="season-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="season-palette">
                  {s.colors.map((c) => (
                    <div key={c} className="swatch" style={{ background: c }} />
                  ))}
                </div>
                <div className="season-info">
                  <span className="season-emoji">{s.emoji}</span>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how-section" id="how">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
          </div>
          <div className="steps-grid">
            {[
              { n: '01', title: 'Upload or Answer', desc: 'Upload a clear photo of your face in natural lighting, or take our guided colour quiz.' },
              { n: '02', title: 'AI Analysis', desc: 'Our AI examines your skin undertone, eye colour, and hair colour to determine your season.' },
              { n: '03', title: 'Your Palette', desc: 'Receive a personalised colour palette with clothing, makeup, and styling recommendations.' },
            ].map((step) => (
              <div key={step.n} className="step-card">
                <span className="step-number">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to find your colours?</h2>
          <p>Join thousands who've discovered their perfect palette.</p>
          <Link to={user ? '/analysis' : '/auth'} className="btn btn-primary">Start Free Analysis</Link>
        </div>
      </section>
    </div>
  )
}