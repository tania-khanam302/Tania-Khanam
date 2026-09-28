
import { useEffect, useState } from 'react'
import './admin.css'

function JourneyManagement() {
  const [journeys, setJourneys] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    type: 'Education',
    year: '',
    title: '',
    institution: '',
    description: '',
  })

  const fetchJourneys = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/journeys`
      )

      const data = await response.json()
      setJourneys(data)
    } catch (error) {
      console.error('Failed to fetch journeys:', error)
    }
  }

  useEffect(() => {
    fetchJourneys()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const resetForm = () => {
    setFormData({
      type: 'Education',
      year: '',
      title: '',
      institution: '',
      description: '',
    })

    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/api/journeys/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/journeys`

      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        alert(
          editingId
            ? 'Journey updated successfully!'
            : 'Journey added successfully!'
        )

        resetForm()
        fetchJourneys()
      } else {
        alert(data.message || 'Operation failed')
      }
    } catch (error) {
      console.error('Journey save error:', error)
      alert('Something went wrong')
    }
  }

  const handleEdit = (journey) => {
    setEditingId(journey._id)

    setFormData({
      type: journey.type || 'Education',
      year: journey.year,
      title: journey.title,
      institution: journey.institution,
      description: journey.description,
    })

    setShowForm(true)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this journey?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/journeys/${id}`,
        {
          method: 'DELETE',
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert('Journey deleted successfully!')
        fetchJourneys()
      } else {
        alert(data.message || 'Failed to delete journey')
      }
    } catch (error) {
      console.error('Delete journey error:', error)
      alert('Something went wrong')
    }
  }

  return (
    <div className="project-management">

      <h1>Journey Management</h1>

      <div className="project-header">

        <h2>
          Total Journey: {journeys.length}
        </h2>

        <button
          type="button"
          className="btn"
          onClick={() => {
            if (showForm) {
              resetForm()
            } else {
              setShowForm(true)
            }
          }}
        >
          <i className="fa-solid fa-plus"></i>

          {showForm && !editingId
            ? 'Close'
            : 'Add Journey'}
        </button>

      </div>

      {showForm && (
        <form
          className="skill-form"
          onSubmit={handleSubmit}
        >

          <h2>
            {editingId
              ? 'Edit Journey'
              : 'Add New Journey'}
          </h2>

          {/* Type */}
          <div className="skill-input-group">
            <label>Journey Type</label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Education">
                Education
              </option>

              <option value="Experience">
                Experience
              </option>
            </select>
          </div>

          {/* Year */}
          <div className="skill-input-group">
            <label>Year</label>

            <input
              type="text"
              name="year"
              placeholder="e.g. 2022 - 2026"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          {/* Title */}
          <div className="skill-input-group">
            <label>Title</label>

            <input
              type="text"
              name="title"
              placeholder="e.g. BSc in Computer Science & Engineering"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Institution */}
          <div className="skill-input-group">
            <label>Institution / Organization</label>

            <input
              type="text"
              name="institution"
              placeholder="e.g. North Western University"
              value={formData.institution}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="skill-input-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Write a short description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="project-form-buttons">

            <button
              type="submit"
              className="btn"
            >
              <i className="fa-solid fa-save"></i>

              {editingId
                ? 'Update Journey'
                : 'Save Journey'}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </div>

        </form>
      )}

      {/* Journey List */}
      <div className="skills-admin-list">

        {journeys.map((journey) => (
          <div
            className="skill-admin-card"
            key={journey._id}
          >

            <div className="skill-admin-info">

              <div>

                <h3>
                  {journey.title}
                </h3>

                <small>
                  {journey.type} • {journey.year}
                </small>

              </div>

            </div>

            <p>
              <strong>
                {journey.institution}
              </strong>
            </p>

            <p>
              {journey.description}
            </p>

            <div className="project-actions">

              <button
                type="button"
                className="edit-btn"
                onClick={() => handleEdit(journey)}
              >
                <i className="fa-solid fa-pen"></i>
                Edit
              </button>

              <button
                type="button"
                className="delete-btn"
                onClick={() =>
                  handleDelete(journey._id)
                }
              >
                <i className="fa-solid fa-trash"></i>
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default JourneyManagement
