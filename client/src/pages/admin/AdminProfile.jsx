
import { useState } from 'react'

function AdminProfile() {
  const admin = JSON.parse(localStorage.getItem('admin'))

  const [name, setName] = useState(admin?.name || '')
  const [email, setEmail] = useState(admin?.email || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage('')
    setError('')

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/profile`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            adminId: admin.id,
            name,
            email,
            currentPassword,
            newPassword,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Failed to update profile')
        return
      }

      localStorage.setItem(
        'admin',
        JSON.stringify(data.admin)
      )

      setMessage('Profile updated successfully!')
      setCurrentPassword('')
      setNewPassword('')
    } catch (error) {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="admin-profile">
      <h1>Admin Profile</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            placeholder="Leave empty to keep current password"
          />
        </div>

        {message && (
          <p style={{ color: 'green' }}>{message}</p>
        )}

        {error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}

        <button type="submit">
          Update Profile
        </button>
      </form>
    </div>
  )
}

export default AdminProfile