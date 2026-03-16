import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">◈</span>
          <span>Chromia</span>
        </Link>
        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/analysis" className={location.pathname === '/analysis' ? 'active' : ''}>Analyze</Link>
              <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>My Profile</Link>
              <button onClick={handleSignOut} className="navbar-signout">Sign Out</button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '12px' }}>Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  )
}