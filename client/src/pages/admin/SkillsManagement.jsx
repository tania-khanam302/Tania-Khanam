import { useEffect, useState } from 'react'
import './admin.css'

function SkillsManagement() {
  const [skills, setSkills] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    percentage: '',
    category: 'Frontend',
  })

  const fetchSkills = async () => {
    try {
      const response = await fetch(
        'http://localhost:5176/api/skills'
      )

      const data = await response.json()
      setSkills(data)
    } catch (error) {
      console.error('Failed to fetch skills:', error)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const resetForm = () => {
    setFormData({
      name: '',
      percentage: '',
      category: 'Frontend',
    })

    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const skillData = {
      name: formData.name,
      percentage: Number(formData.percentage),
      category: formData.category,
    }

    try {
      const url = editingId
        ? `http://localhost:5176/api/skills/${editingId}`
        : 'http://localhost:5176/api/skills'

      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillData),
      })

      const data = await response.json()

      if (response.ok) {
        alert(
          editingId
            ? 'Skill updated successfully!'
            : 'Skill added successfully!'
        )

        resetForm()
        fetchSkills()
      } else {
        alert(data.message || 'Operation failed')
      }
    } catch (error) {
      console.error('Skill save error:', error)
      alert('Something went wrong')
    }
  }

  const handleEdit = (skill) => {
    setEditingId(skill._id)

    setFormData({
      name: skill.name,
      percentage: skill.percentage,
      category: skill.category || 'Frontend',
    })

    setShowForm(true)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this skill?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5176/api/skills/${id}`,
        {
          method: 'DELETE',
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert('Skill deleted successfully!')
        fetchSkills()
      } else {
        alert(data.message || 'Failed to delete skill')
      }
    } catch (error) {
      console.error('Delete skill error:', error)
      alert('Something went wrong')
    }
  }

  return (
    <div className="project-management">

      <h1>Skills Management</h1>

      <div className="project-header">

        <h2>
          Total Skills: {skills.length}
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
            : 'Add Skill'}
        </button>

      </div>

      {showForm && (
        <form
          className="skill-form"
          onSubmit={handleSubmit}
        >

          <h2>
            {editingId
              ? 'Edit Skill'
              : 'Add New Skill'}
          </h2>

          {/* Skill Name */}
          <div className="skill-input-group">

            <label>Skill Name</label>

            <input
              type="text"
              name="name"
              placeholder="e.g. React"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          {/* Skill Percentage */}
          <div className="skill-input-group">

            <label>Skill Percentage</label>

            <input
              type="number"
              name="percentage"
              placeholder="e.g. 90"
              value={formData.percentage}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />

          </div>

          {/* Skill Category */}
          <div className="skill-input-group">

            <label>Skill Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Frontend">
                Frontend Development
              </option>

              <option value="Backend">
                Backend Development
              </option>

              <option value="Tools">
                Tools & Deployment
              </option>
            </select>

          </div>

          {/* Buttons */}
          <div className="project-form-buttons">

            <button
              type="submit"
              className="btn"
            >
              <i className="fa-solid fa-save"></i>

              {editingId
                ? 'Update Skill'
                : 'Save Skill'}
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

      {/* Skills List */}
      <div className="skills-admin-list">

        {skills.map((skill) => (
          <div
            className="skill-admin-card"
            key={skill._id}
          >

            <div className="skill-admin-info">

              <div>
                <h3>{skill.name}</h3>

                {skill.category && (
                  <small>
                    {skill.category}
                  </small>
                )}
              </div>

              <span>
                {skill.percentage}%
              </span>

            </div>

            <div className="skill-progress-bg">

              <div
                className="skill-progress-fill"
                style={{
                  width: `${skill.percentage}%`,
                }}
              ></div>

            </div>

            <div className="project-actions">

              <button
                type="button"
                className="edit-btn"
                onClick={() => handleEdit(skill)}
              >
                <i className="fa-solid fa-pen"></i>
                Edit
              </button>

              <button
                type="button"
                className="delete-btn"
                onClick={() =>
                  handleDelete(skill._id)
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

export default SkillsManagement