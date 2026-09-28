
import { useNavigate, useLocation } from 'react-router-dom'
import './admin.css'

function AdminLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')

    navigate('/admin-login')
  }

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <div className="admin-sidebar-logo">
          <i className="fa-solid fa-user-shield"></i>
          <span>Admin Panel</span>
        </div>

        <nav className="admin-sidebar-nav">

          {/* Dashboard */}
          <button
            className={location.pathname === '/admin' ? 'active' : ''}
            onClick={() => navigate('/admin')}
          >
            <i className="fa-solid fa-gauge"></i>
            <span>Dashboard</span>
          </button>

          {/* Projects */}
          <button
            className={
              location.pathname === '/admin/projects'
                ? 'active'
                : ''
            }
            onClick={() => navigate('/admin/projects')}
          >
            <i className="fa-solid fa-briefcase"></i>
            <span>Projects</span>
          </button>

          {/* Skills */}
          <button
            className={
              location.pathname === '/admin/skills'
                ? 'active'
                : ''
            }
            onClick={() => navigate('/admin/skills')}
          >
            <i className="fa-solid fa-code"></i>
            <span>Skills</span>
          </button>

          {/* Journey */}
          <button
            className={
              location.pathname === '/admin/journey'
                ? 'active'
                : ''
            }
            onClick={() => navigate('/admin/journey')}
          >
            <i className="fa-solid fa-graduation-cap"></i>
            <span>Journey</span>
          </button>

          {/* Messages */}
          <button
            className={
              location.pathname === '/admin/messages'
                ? 'active'
                : ''
            }
            onClick={() => navigate('/admin/messages')}
          >
            <i className="fa-solid fa-envelope"></i>
            <span>Messages</span>
          </button>

          {/* Profile */}
          <button
            className={
              location.pathname === '/admin/profile'
                ? 'active'
                : ''
            }
            onClick={() => navigate('/admin/profile')}
          >
            <i className="fa-solid fa-user"></i>
            <span>Profile</span>
          </button>

        </nav>

        {/* Logout */}
        <button
          className="admin-sidebar-logout"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </button>

      </aside>

      {/* Page Content */}
      <main className="admin-main">
        {children}
      </main>

    </div>
  )
}

export default AdminLayout