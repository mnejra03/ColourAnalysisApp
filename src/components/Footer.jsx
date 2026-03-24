import './Footer.css'
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h3>Colour Analysis</h3>
          <p>
            Discover your perfect colours and enhance your natural beauty.
          </p>
        </div>

        <div className="footer-right">
          <p className="copyright">
            © {new Date().getFullYear()} Nejra Muminović ·
            <a href="https://github.com/mnejra03" target="_blank"> GitHub</a>
          </p>
          <p className="small-text">All rights reserved</p>
        </div>

      </div>
    </footer>
  )
}