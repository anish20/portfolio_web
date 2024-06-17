import React from 'react'

const Experience = () => {
  return (
    <div className="experience" id="experience">
    <div className="container">
        <header className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
            <p>My Resume</p>
            <h2>Working Experience</h2>
        </header>
        <div className="timeline">
            <div className="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
                <div className="timeline-text">
                    <div className="timeline-date">2018 - 2019</div>
                    <h2>Customer Support Executive</h2>
                    <h4>Serco Pvt Ltd, Gurgaon</h4>
                    <p>
                       I have 6 month experience in Serco Pvt Ltd as a customer support executive for SBI Card.
                    </p>
                </div>
            </div>
            <div className="timeline-item right wow slideInRight" data-wow-delay="0.1s">
                <div className="timeline-text">
                    <div className="timeline-date">2019 - 2020</div>
                    <h2>Technical Support </h2>
                    <h4>Aditi Computers Pvt Ltd, Janakpur Delhi</h4>
                    <p>
                    I have 6-month experience as Software Technical Support & Software Installation at Aditi 
Computers in Janakpuri, New Delhi

                    </p>
                </div>
            </div>
            <div className="timeline-item left wow slideInLeft" data-wow-delay="0.1s">
                <div className="timeline-text">
                    <div className="timeline-date">2020 - 2022</div>
                    <h2>Web Developer</h2>
                    <h4>FerventSoft Pvt Ltd, Malviya Nagar, Delhi</h4>
                    <p>
                    I have 2.0 Year Experience in Fervent Software Solution PVT LTD as Web Developer in Multiple 
                    Technologies such as .NET and ReactJs & Nodejs
                    </p>
                </div>
            </div>
            <div className="timeline-item right wow slideInRight" data-wow-delay="0.1s">
                <div className="timeline-text">
                    <div className="timeline-date">2022 - Currently</div>
                    <h2>Web Developer</h2>
                    <h4>Jabitsoft Pvt Ltd, Noida, UP</h4>
                    <p>
                        Currently I am here working as Web Developer & Designer.
                    </p>
                </div>
            </div>
           
        </div>
    </div>
</div>
  )
}

export default Experience