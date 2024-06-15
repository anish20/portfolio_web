import React from 'react'
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  return (
    <div className="hero" id="home">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-sm-12 col-md-12">
                        <div className="hero-content">
                          {/* <!-- <div className="d-flex align-items-center justify-content-center">
                            <img src="assets/img/anish-img1.jpg" className="w-50 img-thumbnail rounded-circle animated profile-img" alt="">
                          </div> --> */}
                            <div className="hero-text mt-4">
                                
                                <h1>I'm Anish</h1>
                                {/* <h3>Web Designer, Web Developer, Freelauncer </h3> */}
                                {/* <h3 id="typewriter"></h3> */}
                                <TypeAnimation
      sequence={[
        'Web Designer',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Web Developer',
        1000,
        'Freelauncer',
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '25px', display: 'inline-block',color:'#fff' }}
      repeat={Infinity}
    />
                                <div className="typed-text">Web Designer, Web Developer, Freelauncer</div>
                            </div>
                            <div className="hero-btn">
                                <a className="btn" href="">Hire Me</a>
                                <a className="btn" href="">Contact Me</a>
                            </div>
                        </div>
                    </div>
                    {/* <!-- <div className="col-sm-12 col-md-6 d-none d-md-block">
                        <div className="hero-image">
                            <img src="img/hero.png" alt="Hero Image">
                        </div>
                    </div> --> */}
                </div>
            </div>
        </div>
  )
}

export default HeroSection
