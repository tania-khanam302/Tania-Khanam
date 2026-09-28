
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './admin.css'

function AdminLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        // Save login information
        localStorage.setItem('adminLoggedIn', 'true')
        localStorage.setItem('adminToken', data.token)
        localStorage.setItem(
          'admin',
          JSON.stringify(data.admin)
        )

        // Go to admin dashboard
        navigate('/admin')
      } else {
        alert(data.message || 'Invalid email or password')
      }
    } catch (error) {
      console.error('Admin login error:', error)
      alert('Unable to connect to server. Please try again.')
    }
  }

  return (
    <div className="admin-login-page">

      <div className="admin-login-box">

        <div className="admin-login-icon">
          <i className="fa-solid fa-user-shield"></i>
        </div>

        <h2>Admin Login</h2>

        <p>Login to manage your portfolio</p>

        <form onSubmit={handleSubmit}>

          <div className="admin-input">
            <i className="fa-solid fa-envelope"></i>

            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-input">
            <i className="fa-solid fa-lock"></i>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">
            Login
          </button>

        </form>

        <a href="/" className="admin-back">
          <i className="fa-solid fa-arrow-left"></i>
          Back to Home
        </a>

      </div>

    </div>
  )
}

export default AdminLogin
