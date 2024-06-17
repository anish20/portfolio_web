import React from 'react'

const Footer = () => {
  return (
    <div className="footer wow fadeIn" data-wow-delay="0.3s">
    <div className="container-fluid">
        <div className="container">
            <div className="footer-info">
                <h2>AnishWebsoft</h2>
                <h3>H-13, Noida Sector 22, Uttar Pradesh</h3>
                <div className="footer-menu">
                    <p>+91 8468039620</p>
                    <p>info@anishwebsoft.in</p>
                </div>
                <div className="footer-social">
                    <a href=""><i className="fab fa-twitter"></i></a>
                    <a href=""><i className="fab fa-facebook-f"></i></a>
                    <a href=""><i className="fab fa-youtube"></i></a>
                    <a href=""><i className="fab fa-instagram"></i></a>
                    <a href=""><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
        <div className="container copyright">
            <p>&copy; <a href="#">AnishWebsoft</a>, All Right Reserved 
            </p>
        </div>
    </div>
</div>
  )
}

export default Footer