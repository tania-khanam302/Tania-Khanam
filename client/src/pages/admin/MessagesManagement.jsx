import { useEffect, useState } from 'react'
import './admin.css'

function MessagesManagement() {
  const [messages, setMessages] = useState([])

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        'http://localhost:5176/api/messages'
      )

      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this message?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5176/api/messages/${id}`,
        {
          method: 'DELETE',
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert('Message deleted successfully!')
        fetchMessages()
      } else {
        alert(data.message || 'Failed to delete message')
      }
    } catch (error) {
      console.error('Delete message error:', error)
      alert('Something went wrong')
    }
  }

  return (
    <div className="project-management">

      <h1>Messages Management</h1>

      <div className="project-header">
        <h2>
          Total Messages: {messages.length}
        </h2>
      </div>

      <div className="messages-list">

        {messages.length === 0 ? (
          <div className="no-messages">
            <i className="fa-solid fa-envelope-open"></i>
            <h3>No Messages</h3>
            <p>No contact messages have been received yet.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              className="message-card"
              key={message._id}
            >

              <div className="message-header">
                <div>
                  <h3>{message.name}</h3>
                  <p>
                    <i className="fa-solid fa-envelope"></i>{' '}
                    {message.email}
                  </p>

                  {message.mobile && (
                    <p>
                      <i className="fa-solid fa-phone"></i>{' '}
                      {message.mobile}
                    </p>
                  )}
                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(message._id)
                  }
                >
                  <i className="fa-solid fa-trash"></i>
                  Delete
                </button>
              </div>

              <div className="message-content">

                <p>
                  <strong>Subject:</strong>{' '}
                  {message.subject || 'No Subject'}
                </p>

                <p>
                  <strong>Message:</strong>
                </p>

                <div className="message-text">
                  {message.message}
                </div>

              </div>

              <small>
                {new Date(
                  message.createdAt
                ).toLocaleString()}
              </small>

            </div>
          ))
        )}

      </div>

    </div>
  )
}

export default MessagesManagement