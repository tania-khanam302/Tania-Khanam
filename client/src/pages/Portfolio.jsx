
import { useEffect, useState } from 'react'
import '../../css/style.css'
import '../../css/responsive.css'

function Portfolio() {
  const [currentPage, setCurrentPage] = useState(1)
  const [projects, setProjects] = useState([])

  // Fetch projects from MongoDB API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((response) => response.json())
      .then((data) => {
        setProjects(data)
      })
      .catch((error) => {
        console.error('Failed to fetch projects:', error)
      })
  }, [])

  const projectsPerPage = 6

  const totalPages = Math.ceil(projects.length / projectsPerPage)

  const startIndex = (currentPage - 1) * projectsPerPage

  const currentProjects = projects.slice(
    startIndex,
    startIndex + projectsPerPage
  )

  // Dark Mode
  useEffect(() => {
    const darkMode = document.getElementById('darkmode')

    const handleDarkMode = () => {
      document.body.classList.toggle('dark-theme')
    }

    if (darkMode) {
      darkMode.addEventListener('click', handleDarkMode)
    }

    return () => {
      if (darkMode) {
        darkMode.removeEventListener('click', handleDarkMode)
      }
    }
  }, [])

  // Page change
  const changePage = (page) => {
    setCurrentPage(page)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {/* ========== Header Start ========== */}
      <header className="header-area bg-area header">
        <div className="container">
          <div className="header-wrapper">

            <div className="logo">
              <a href="/">
                <h1>
                  TA
                  <p>NIA</p>
                </h1>

                <span
                  className="animate"
                  style={{ '--i': 1 }}
                ></span>
              </a>
            </div>

            <div
              className="bx bx-menu"
              id="menu-icon"
            >
              <i className="fa-solid fa-bars"></i>

              <span
                className="animate"
                style={{ '--i': 2 }}
              ></span>
            </div>

            <nav className="navber">

              <a href="/" className="active">
                Home
              </a>

              <a href="/#about">
                About
              </a>

              <a href="/#journey">
                Journey
              </a>

              <a href="/#skills">
                Skills
              </a>

              <a href="/#work">
                Work
              </a>

              <a href="/#contact">
                Contact
              </a>

              <span className="active-nav"></span>

              <span
                className="animate"
                style={{ '--i': 2 }}
              ></span>

            </nav>

            <div
              id="darkmode"
              onClick={() =>
                document.body.classList.toggle('dark-theme')
              }
            >
              <i className="fa-solid fa-sun"></i>
            </div>

          </div>
        </div>
      </header>

      {/* ========== Header End ========== */}


      {/* ========== Portfolio Section Start ========== */}
      <section
        className="portfolio-area bg-area show-animate"
        id="work"
      >
        <div className="container">

          <h2 className="section-heading">
            My <span>Work</span>

            <span
              className="animate"
              style={{ '--i': 2 }}
            ></span>
          </h2>


          {/* ========== Project Cards ========== */}
          <div className="portfolio-wrapper">

            {currentProjects.length > 0 ? (

              currentProjects.map((project) => (

                <div
                  className="portfolio-box"
                  key={project._id}
                >

                  <img
                    src={project.image}
                    alt={project.title}
                  />

                  <div className="portfolio-layer">

                    <h4>
                      {project.title}
                    </h4>

                    <p>
                      {project.description}
                    </p>

                    <a
                      href={
                        project.liveLink ||
                        project.githubLink ||
                        '#'
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </a>

                  </div>

                </div>

              ))

            ) : (

              <p className="no-projects">
                No projects available.
              </p>

            )}

          </div>
          {/* ========== Project Cards End ========== */}


          {/* ========== Pagination Start ========== */}

          {totalPages > 1 && (

            <div className="portfolio-pagination">

              {/* Previous */}
              <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() =>
                  changePage(currentPage - 1)
                }
              >
                <i className="fa-solid fa-angle-left"></i>

                Previous
              </button>


              {/* Page Numbers */}
              <div className="pagination-numbers">

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (

                  <button
                    key={page}
                    className={`pagination-number ${
                      currentPage === page
                        ? 'active'
                        : ''
                    }`}
                    onClick={() =>
                      changePage(page)
                    }
                  >
                    {page}
                  </button>

                ))}

              </div>


              {/* Next */}
              <button
                className="pagination-btn"
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  changePage(currentPage + 1)
                }
              >
                Next

                <i className="fa-solid fa-angle-right"></i>
              </button>

            </div>

          )}

          {/* ========== Pagination End ========== */}

        </div>
      </section>
      {/* ========== Portfolio Section End ========== */}


      {/* ========== Back To Top ========== */}
      <div className="iconTop">
        <a href="/">
          <i className="fa-solid fa-arrow-up"></i>
        </a>
      </div>


      {/* ========== Footer Section Start ========== */}
      <footer className="footer-area bg-area footer-bg">

        <div className="footer-text">

          <p>
            Copyright © 2025 by || All Rights Reserved
          </p>

          <span
            className="animate scroll"
            style={{ '--i': 1 }}
          ></span>


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


            <a
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram instagram-bg"></i>
            </a>

          </div>

        </div>

      </footer>
      {/* ========== Footer Section End ========== */}

    </>
  )
}

export default Portfolio