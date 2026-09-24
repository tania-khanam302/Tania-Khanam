
import { useEffect, useState } from 'react'

import '../../css/style.css'
import '../../css/responsive.css'


function Home() {
const [projects, setProjects] = useState([])
const [skills, setSkills] = useState([])
const [journeys, setJourneys] = useState([])
const [contactForm, setContactForm] = useState({
  name: '',
  email: '',
  mobile: '',
  subject: '',
  message: '',
})
useEffect(() => {
  fetch('http://localhost:5176/api/skills')
    .then((response) => response.json())
    .then((data) => {
      setSkills(data)
    })
    .catch((error) => {
      console.error('Failed to fetch skills:', error)
    })
}, [])

useEffect(() => {
  fetch('http://localhost:5176/api/journeys')
    .then((response) => response.json())
    .then((data) => {
      setJourneys(data)
    })
    .catch((error) => {
      console.error('Failed to fetch journeys:', error)
    })
}, [])

const handleContactChange = (e) => {
  setContactForm({
    ...contactForm,
    [e.target.name]: e.target.value,
  })
}
  useEffect(() => {
    fetch('http://localhost:5176/api/projects')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data)
      })
      .catch((error) => {
        console.error('Failed to fetch projects:', error)
      })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      const navLinks = document.querySelectorAll('header nav a')

      sections.forEach((sec) => {
        const top = window.scrollY
        const offset = sec.offsetTop - 100
        const height = sec.offsetHeight
        const id = sec.getAttribute('id')

        if (top >= offset && top < offset + height) {

          navLinks.forEach((link) => {
            link.classList.remove('active')
          })

          const activeLink = document.querySelector(
            `header nav a[href*="${id}"]`
          )

          if (activeLink) {
            activeLink.classList.add('active')
          }

          sec.classList.add('show-animate')

        } else {
          sec.classList.remove('show-animate')
        }
      })

      // Sticky Header
      const header = document.querySelector('header')

      if (header) {
        header.classList.toggle('sticky', window.scrollY > 100)
      }
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <>
      {/* ========== Header Start ========== */}
      <header className="header-area bg-area header">
        <div className="container">
          <div className="header-wrapper">

            <div className="logo">
              <a href="#index">
                <h1>
                  TA
                  <p>NIA</p>
                </h1>
                <span className="animate" style={{ '--i': 1 }}></span>
              </a>
            </div>

         <div
  className="bx bx-menu"
  id="menu-icon"
  onClick={(e) => {
    e.currentTarget.classList.toggle('bx-x')
    document.querySelector('.navber').classList.toggle('active')
  }}
>
  <i className="fa-solid fa-bars"></i>
  <span className="animate" style={{ '--i': 2 }}></span>
</div>

            <nav className="navber">
              <a href="#index" className="active">Home</a>
              <a href="#about">About</a>
              <a href="#journey">Journey</a>
              <a href="#skills">Skills</a>
              <a href="#work">Work</a>
              <a href="#contact">Contact</a>

              <span className="active-nav"></span>
              <span className="animate" style={{ '--i': 2 }}></span>
            </nav>
<div
  id="darkmode"
  onClick={() => document.body.classList.toggle('dark-theme')}
>
  <i className="fa-solid fa-sun"></i>
</div>

          </div>
        </div>
      </header>

      {/* ========== Header End ========== */}


      {/* ========== Banner Start ========== */}
     <section className="banner-area bg-area show-animate" id="index">
        <div className="container">

          <div className="banner-wrapper">

            <div className="right-img">
              <img src="/images/1.png" alt="Tania Khanam" />
            </div>

            <div className="index-content">

              <h1>
                Hi, I'm
                <span className="animate" style={{ '--i': 2 }}></span>
                <br />

                <span>Tania Khanam</span>
              </h1>

              <div className="text-animated">
                <h3>Front-end Developer</h3>
                <span className="animate" style={{ '--i': 3 }}></span>
              </div>

    <p>
  I am a passionate Frontend Developer who enjoys creating
  modern, responsive, and user-friendly websites and web
  applications. I love turning ideas into clean and
  interactive digital experiences using modern web
  technologies.
  <span className="animate" style={{ '--i': 4 }}></span>
</p>

              <div className="btn-box">

                <a href="#contact" className="btn">
                  Hire Me
                </a>

                <a href="#contact" className="btn">
                  Let's Talk
                </a>

                <span className="animate" style={{ '--i': 5 }}></span>

              </div>

            </div>

            <div className="social-icon index-sci">

              <a
                href="https://github.com/taniakhanam11"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>

              <a
                href="https://dribbble.com/tania-khanam"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-dribbble"></i>
              </a>

              <a
                href="https://www.behance.net/taniakh142"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-behance"></i>
              </a>

              <a
                href="https://www.linkedin.com/in/tania-khanam142/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>

              <a href="#index">
                <i className="fab fa-instagram instagram-bg"></i>
              </a>

              <span className="animate" style={{ '--i': 6 }}></span>

            </div>

            <span
              className="animate index-img"
              style={{ '--i': 7 }}
            ></span>

          </div>

        </div>
      </section>

      {/* ========== Banner End ========== */}

      {/* ========== About Section Start ========== */}
<section className="about-area bg-area" id="about">
  <div className="container">

    <h2 className="section-heading">
      About <span>Me</span>
      <span className="animate scroll" style={{ '--i': 1 }}></span>
    </h2>

    <div className="about">

      <div className="about-img">
        <img src="/images/1.png" alt="Tania Khanam" />

        <span className="circle-spin"></span>

        <span
          className="animate scroll"
          style={{ '--i': 2 }}
        ></span>
      </div>

      <div className="about-content">

        <h3>
          Frontend Developer
          <span
            className="animate scroll"
            style={{ '--i': 3 }}
          ></span>
        </h3>

    <p>
  I am Tania Khanam, a passionate Frontend Developer and
  BSc Engineering student with a strong interest in building
  modern, responsive, and user-friendly web applications.
  I work with HTML, CSS, Bootstrap, JavaScript, React.js,
  and Tailwind CSS. I also have experience with Node.js,
  Express.js, MongoDB, and REST APIs. I enjoy learning new
  technologies and creating practical solutions through web
  development.

  <span
    className="animate scroll"
    style={{ '--i': 4 }}
  ></span>
</p>

        <div className="btn-box btns">
          <a href="#contact" className="btn">
            Read More
          </a>

          <span
            className="animate scroll"
            style={{ '--i': 5 }}
          ></span>
        </div>

      </div>

    </div>
  </div>
</section>
{/* ========== About Section End ========== */}

{/* ========== Journey Section Start ========== */}
<section className="journey-area bg-area" id="journey">
  <div className="container">

    <h2 className="section-heading">
      My <span>Journey</span>
      <span className="animate scroll" style={{ '--i': 1 }}></span>
    </h2>

    <div className="journey-row">

      <div className="journey-column">
        <h3 className="title">Education</h3>

 <div className="journey-box">

  {journeys
    .filter((journey) => journey.type === 'Education')
    .map((journey) => (
      <div
        className="journey-content"
        key={journey._id}
      >
        <div className="content">

          <div className="year">
            <i className="fa-solid fa-calendar"></i>{' '}
            {journey.year}
          </div>

          <h3>{journey.title}</h3>

          <p>
            {journey.institution}
            <br />
            {journey.description}
          </p>

        </div>
      </div>
    ))}

</div>
      </div>

      <div className="journey-column">
        <h3 className="title">Experience</h3>
<div className="journey-box">

  {journeys
    .filter((journey) => journey.type === 'Experience')
    .map((journey) => (
      <div
        className="journey-content"
        key={journey._id}
      >
        <div className="content">

          <div className="year">
            <i className="fa-solid fa-calendar"></i>{' '}
            {journey.year}
          </div>

          <h3>{journey.title}</h3>

          <p>
            <strong>{journey.institution}</strong>
            <br />
            {journey.description}
          </p>

        </div>
      </div>
    ))}

</div>
      </div>

    </div>
  </div>
</section>
{/* ========== Journey Section End ========== */}


{/* ========== Skills Section Start ========== */}

<section className="bg-area skills-bg" id="skills">
  <div className="container">
    <div className="skills">

      <h2 className="section-heading">
        My <span>Skills</span>
        <span className="animate scroll" style={{ '--i': 1 }}></span>
      </h2>

      <p className="skills-subtitle">
        Technologies and tools I use to build modern, responsive, and
        user-friendly web applications.
      </p>

      <div className="skills-row">

        {/* ================= Frontend ================= */}
        <div className="skills-column">
          <div className="skills-card">

            <div className="skills-card-header">
              <div className="skills-icon">
                <i className="fa-solid fa-code"></i>
              </div>

              <div>
                <h3>Frontend Development</h3>
                <p>Building modern user interfaces</p>
              </div>
            </div>

            {skills
              .filter((skill) => skill.category === 'Frontend')
              .map((skill) => (
                <div className="skill-item" key={skill._id}>

                  <div className="skill-info">
                    <span>{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>

                  <div className="skill-bar">
                    <span
                      style={{
                        width: `${skill.percentage}%`,
                      }}
                    ></span>
                  </div>

                </div>
              ))}

          </div>
        </div>


        {/* ================= Backend ================= */}
        <div className="skills-column">
          <div className="skills-card">

            <div className="skills-card-header">
              <div className="skills-icon">
                <i className="fa-solid fa-server"></i>
              </div>

              <div>
                <h3>Backend Development</h3>
                <p>Developing APIs and server-side systems</p>
              </div>
            </div>

            {skills
              .filter((skill) => skill.category === 'Backend')
              .map((skill) => (
                <div className="skill-item" key={skill._id}>

                  <div className="skill-info">
                    <span>{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>

                  <div className="skill-bar">
                    <span
                      style={{
                        width: `${skill.percentage}%`,
                      }}
                    ></span>
                  </div>

                </div>
              ))}

          </div>
        </div>


        {/* ================= Tools ================= */}
        <div className="skills-column">
          <div className="skills-card">

            <div className="skills-card-header">
              <div className="skills-icon">
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </div>

              <div>
                <h3>Tools & Deployment</h3>
                <p>Tools I use for development and deployment</p>
              </div>
            </div>

            {skills
              .filter((skill) => skill.category === 'Tools')
              .map((skill) => (
                <div className="skill-item" key={skill._id}>

                  <div className="skill-info">
                    <span>{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>

                  <div className="skill-bar">
                    <span
                      style={{
                        width: `${skill.percentage}%`,
                      }}
                    ></span>
                  </div>

                </div>
              ))}

          </div>
        </div>

      </div>
    </div>
  </div>
</section>

{/* ========== Skills Section End ========== */}


{/* ========== Work Section Start ========== */}
<section className="portfolio-area bg-area" id="work">
  <div className="container">

    <h2 className="section-heading">
      My <span>Work</span>
      <span className="animate scroll" style={{ '--i': 1 }}></span>
    </h2>

<div className="portfolio-wrapper">

  {projects.slice(0, 3).map((project) => (
    <div className="portfolio-box" key={project._id}>

      <img
        src={project.image}
        alt={project.title}
      />

      <div className="portfolio-layer">

        <h4>{project.title}</h4>

        <p>{project.description}</p>

        <a
          href={project.liveLink || project.githubLink || '#'}
          target="_blank"
          rel="noreferrer"
        >
          <i className="fas fa-external-link-alt"></i>
        </a>

      </div>

    </div>
  ))}

</div>

    {/* Read More Button */}
    <div className="btn-box btns">
      <a href="/portfolio" className="btn">
  View More
</a>
      <span
        className="animate scroll"
        style={{ '--i': 5 }}
      ></span>
    </div>

  </div>
</section>
{/* ========== Work Section End ========== */}



{/* ========== Contact Section Start ========== */}
<section className="bg-area contact-bg" id="contact">
  <div className="container">
    <h2 className="section-heading">
      Contact <span>Me!</span>
      <span className="animate scroll" style={{ '--i': 1 }}></span>
    </h2>

    <div className="contact-wrapper">
    <form
  className="contact-form"
  onSubmit={async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        'http://localhost:5176/api/messages',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactForm),
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert('Message sent successfully!')

     setContactForm({
  name: '',
  email: '',
  mobile: '',
  subject: '',
  message: '',
})
      } else {
        alert(data.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      alert('Something went wrong. Please try again.')
    }
  }}
>
  {/* Name + Email */}
  <div className="input-box">

    <div className="input-field">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={contactForm.name}
        onChange={handleContactChange}
        required
      />
      <span className="focus"></span>
    </div>

    <div className="input-field">
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={contactForm.email}
        onChange={handleContactChange}
        required
      />
      <span className="focus"></span>
    </div>

    <span className="animate scroll" style={{ '--i': 3 }}></span>
  </div>
{/* Mobile Number - Optional */}
<div className="input-box">

  <div className="input-field">
    <input
      type="tel"
      name="mobile"
      placeholder="Mobile Number (Optional)"
      value={contactForm.mobile}
      onChange={handleContactChange}
    />
    <span className="focus"></span>
  </div>
     <div className="input-field">
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={contactForm.subject}
        onChange={handleContactChange}
        required
      />
      <span className="focus"></span>
    </div>

  <span className="animate scroll" style={{ '--i': 4 }}></span>
</div>
  {/* Subject */}
  {/* <div className="input-box">

    <div className="input-field">
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={contactForm.subject}
        onChange={handleContactChange}
        required
      />
      <span className="focus"></span>
    </div>

    <span className="animate scroll" style={{ '--i': 5 }}></span>
  </div> */}

  {/* Message */}
  <div className="textarea-field">

    <textarea
      name="message"
      cols="30"
      rows="8"
      placeholder="Your Message"
      value={contactForm.message}
      onChange={handleContactChange}
      required
    ></textarea>

    <span className="focus"></span>
    <span className="animate scroll" style={{ '--i': 7 }}></span>
  </div>

  {/* Submit Button */}
  <div className="contact-btn btn-box btns">

    <button type="submit" className="btn">
      Submit
    </button>

    <span className="animate scroll" style={{ '--i': 9 }}></span>

  </div>
</form>
    </div>
  </div>
</section>
{/* ========== Contact Section End ========== */}



{/* ========== Icon Top ========== */}
<div className="iconTop">
  <a href="#index">
    <i className="fa-solid fa-arrow-up"></i>
  </a>
</div>

{/* ========== Footer Section Start  ========== */}
<footer className="footer-area bg-area footer-bg">
  <div className="footer-text">
    <p>Copyright © 2025 by || All Rights Reserved</p>

    <span className="animate scroll" style={{ '--i': 1 }}></span>

    <div className="social-icon d-block">
      <a
        href="https://github.com/taniakhanam11"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa-brands fa-github"></i>
      </a>

      <a
        href="https://dribbble.com/tania-khanam"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa-brands fa-dribbble"></i>
      </a>

      <a
        href="https://www.behance.net/taniakh142"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa-brands fa-behance"></i>
      </a>

      <a
        href="https://www.linkedin.com/in/tania-khanam142/"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fa-brands fa-linkedin-in"></i>
      </a>

      <a href="#" target="_blank" rel="noreferrer">
        <i className="fab fa-instagram instagram-bg"></i>
      </a>
    </div>
  </div>
</footer>
{/* ========== Footer Section end  ========== */}









    </>
  )
}

export default Home