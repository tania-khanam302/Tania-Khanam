
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './admin.css'

function AdminDashboard() {
  const navigate = useNavigate()

  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
    journeys: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          projectsResponse,
          skillsResponse,
          messagesResponse,
          journeysResponse,
        ] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/projects`),
          fetch(`${import.meta.env.VITE_API_URL}/api/skills`),
          fetch(`${import.meta.env.VITE_API_URL}/api/messages`),
          fetch(`${import.meta.env.VITE_API_URL}/api/journeys`),
        ])

        const projects = await projectsResponse.json()
        const skills = await skillsResponse.json()
        const messages = await messagesResponse.json()
        const journeys = await journeysResponse.json()

        setStats({
          projects: projects.length,
          skills: skills.length,
          messages: messages.length,
          journeys: journeys.length,
        })
      } catch (error) {
        console.error(
          'Failed to fetch dashboard statistics:',
          error
        )
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="admin-dashboard">

      {/* Dashboard Header */}
      <div className="admin-dashboard-header">

        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Welcome to your portfolio management dashboard.
          </p>
        </div>

      </div>


      {/* Statistics */}
      <div className="admin-statistics">

        <div className="stat-card">
          <i className="fa-solid fa-briefcase"></i>

          <div>
            <h3>{stats.projects}</h3>
            <p>Total Projects</p>
          </div>
        </div>


        <div className="stat-card">
          <i className="fa-solid fa-code"></i>

          <div>
            <h3>{stats.skills}</h3>
            <p>Total Skills</p>
          </div>
        </div>


        <div className="stat-card">
          <i className="fa-solid fa-envelope"></i>

          <div>
            <h3>{stats.messages}</h3>
            <p>Total Messages</p>
          </div>
        </div>


        <div className="stat-card">
          <i className="fa-solid fa-graduation-cap"></i>

          <div>
            <h3>{stats.journeys}</h3>
            <p>Total Journey</p>
          </div>
        </div>

      </div>


      {/* Management Cards */}
      <div className="admin-cards">

        <div
          className="admin-card"
          onClick={() => navigate('/admin/projects')}
        >
          <i className="fa-solid fa-briefcase"></i>

          <h3>Projects</h3>

          <p>Manage your projects</p>
        </div>


        <div
          className="admin-card"
          onClick={() => navigate('/admin/messages')}
        >
          <i className="fa-solid fa-envelope"></i>

          <h3>Messages</h3>

          <p>View contact messages</p>
        </div>


        <div
          className="admin-card"
          onClick={() => navigate('/admin/skills')}
        >
          <i className="fa-solid fa-code"></i>

          <h3>Skills</h3>

          <p>Manage your skills</p>
        </div>


        <div
          className="admin-card"
          onClick={() => navigate('/admin/journey')}
        >
          <i className="fa-solid fa-graduation-cap"></i>

          <h3>Journey</h3>

          <p>Manage education and experience</p>
        </div>

      </div>

    </div>
  )
}

export default AdminDashboard
