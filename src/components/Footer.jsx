import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/assets/logo.jpeg" alt="MoveEase LLP logo" className="footer-logo" />
          <div>
            <p className="footer-brand-name">MoveEase LLP</p>
            <p className="footer-tagline">Your reliability is our priority</p>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li>Packing &amp; Unpacking</li>
            <li>Loading &amp; Unloading</li>
            <li>Long Distance Moving</li>
            <li>Residential &amp; Commercial</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:moveeasellp@gmail.com">moveeasellp@gmail.com</a></li>
            <li><a href="https://instagram.com/moveease.in" target="_blank" rel="noreferrer">@moveease.in</a></li>
            <li><a href="tel:+919620221007">+91 96202 21007</a></li>
            <li><a href="tel:+919844944290">+91 98449 44290</a></li>
            <li><a href="tel:+918660270116">+91 86602 70116</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} MoveEase LLP. All rights reserved.</p>
          <p>Packing &bull; Loading &bull; Logistics &bull; Cargo &bull; Long Distance</p>
        </div>
      </div>
    </footer>
  );
}
