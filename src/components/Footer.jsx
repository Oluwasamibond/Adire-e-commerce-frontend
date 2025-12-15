import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "../componentStyles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* section-1 */}
        <div className="footer-section contact">
          <h3>CONTACT US</h3>
          <p>
            <PhoneIcon fontSize="small" />
            Phone: 08064468552
          </p>
          <p>
            <MailIcon fontSize="small" />
            Email: Adirebymkz@gmail.com
          </p>
          <p>
            <LocationOnIcon fontSize="small" />
            Address: No, 58 Agboyi Road Ogudu Ori Oke, Lagos State
          </p>
        </div>

        {/*company */}
        <div className="footer-section contact">
          <h3>COMPANY</h3>
          <p>
            <a href="/">Home</a>
          </p>
          <p>
            <a href="about">About</a>
          </p>
          <p>
            <a href="terms">Terms & Condition</a>
          </p>
        </div>

        {/*useful links */}
        <div className="footer-section contact">
          <h3>USEFUL LINKS</h3>
          <p>
            <a href="dashboard/orders">Track Orders</a>
          </p>
          <p>
            <a href="return-policy">Return Policy</a>
          </p>
          <p>
            <a href="privacy-policy">Privacy Policy</a>
          </p>
        </div>

        {/* socials */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.instagram.com/adire_by_mkz/" target="_blank">
              <InstagramIcon className="social-icon" />
            </a>
            <a href="https://wa.me/08064468552" target="_blank">
              <WhatsAppIcon className="social-icon" />
            </a>
          </div>
        </div>
      </div>

       <div className="footer-bottom">
        &copy;{new Date().getFullYear()} ADIREBYMKZ. All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
