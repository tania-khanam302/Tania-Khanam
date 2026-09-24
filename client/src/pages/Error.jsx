
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../css/style.css'
import '../../css/responsive.css'

function Error() {
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

  return (
    <>
      {/* ========== Header Start ========== */}
      <header className="header-area bg-area header">
        <div className="container">
          <div className="header-wrapper">

            <div className="logo">
              <Link to="/">
                <h1>
                  TA
                  <p>NIA</p>
                </h1>

                <span
                  className="animate"
                  style={{ '--i': 1 }}
                ></span>
              </Link>
            </div>

            <div className="bx bx-menu" id="menu-icon">
              <i className="fa-solid fa-bars"></i>

              <span
                className="animate"
                style={{ '--i': 2 }}
              ></span>
            </div>

            <nav className="navber">
              <Link to="/" className="active">
                Home
              </Link>

              <a href="/#about">About</a>
              <a href="/#journey">Journey</a>
              <a href="/#skills">Skills</a>

              <Link to="/portfolio">
                Work
              </Link>

              <a href="/#contact">Contact</a>

              <span className="active-nav"></span>

              <span
                className="animate"
                style={{ '--i': 2 }}
              ></span>
            </nav>

            <div
              id="darkmode"
              style={{ cursor: 'pointer' }}
            >
              <i className="fa-solid fa-sun"></i>
            </div>

          </div>
        </div>
      </header>
      {/* ========== Header End ========== */}


      {/* ========== Error Section Start ========== */}
      <section
        className="error-area bg-area show-animate"
        id="error"
      >
        <div className="container">

          <div className="error-wrapper">

            <span
              className="animate"
              style={{ '--i': 5 }}
            ></span>

            <div className="error-container">

              <h1>404</h1>

              <h3>
                Oops, This Page Not Be Found !
              </h3>

              <p className="text">
                Can't find what you need? Take a moment and do a search
                <br />
                below or start from our{' '}

                <Link to="/">
                  indexpage.
                </Link>
              </p>

            </div>
          </div>

        </div>
      </section>
      {/* ========== Error Section End ========== */}
    </>
  )
}

export default Error
