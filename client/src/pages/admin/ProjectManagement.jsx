
import { useEffect, useState } from 'react'
import './admin.css'

function ProjectManagement() {
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    githubLink: '',
    liveLink: '',
  })

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects`
      )

      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: '',
      githubLink: '',
      liveLink: '',
    })

    setEditingId(null)
    setShowForm(false)
  }

  // Add / Update project
  const handleSubmit = async (e) => {
    e.preventDefault()

    const projectData = {
      ...formData,
      technologies: formData.technologies
        .split(',')
        .map((tech) => tech.trim())
        .filter(Boolean),
    }

    try {
      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/api/projects/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/projects`

      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      })

      const data = await response.json()

      if (response.ok) {
        alert(
          editingId
            ? 'Project updated successfully!'
            : 'Project added successfully!'
        )

        resetForm()
        fetchProjects()
      } else {
        alert(data.message || 'Operation failed')
      }
    } catch (error) {
      console.error('Project save error:', error)
      alert('Something went wrong')
    }
  }

  // Edit project
  const handleEdit = (project) => {
    setEditingId(project._id)

    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || '',
      technologies: project.technologies
        ? project.technologies.join(', ')
        : '',
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
    })

    setShowForm(true)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Delete project
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this project?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
        {
          method: 'DELETE',
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert('Project deleted successfully!')
        fetchProjects()
      } else {
        alert(data.message || 'Failed to delete project')
      }
    } catch (error) {
      console.error('Delete project error:', error)
      alert('Something went wrong')
    }
  }

  return (
    <div className="project-management">

      <h1>Project Management</h1>

      <div className="project-header">

        <h2>
          Total Projects: {projects.length}
        </h2>

        <button
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
            : 'Add Project'}
        </button>

      </div>

      {/* Add / Edit Project Form */}

      {showForm && (
        <form
          className="project-form"
          onSubmit={handleSubmit}
        >

          <h2>
            {editingId
              ? 'Edit Project'
              : 'Add New Project'}
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <input
            type="text"
            name="image"
            placeholder="Image Path e.g. /images/project.png"
            value={formData.image}
            onChange={handleChange}
          />

          <input
            type="text"
            name="technologies"
            placeholder="Technologies e.g. React, Node.js, MongoDB"
            value={formData.technologies}
            onChange={handleChange}
          />

          <input
            type="text"
            name="githubLink"
            placeholder="GitHub Link"
            value={formData.githubLink}
            onChange={handleChange}
          />

          <input
            type="text"
            name="liveLink"
            placeholder="Live Project Link"
            value={formData.liveLink}
            onChange={handleChange}
          />

          <div className="project-form-buttons">

            <button
              type="submit"
              className="btn"
            >
              <i className="fa-solid fa-save"></i>

              {editingId
                ? 'Update Project'
                : 'Save Project'}
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

      {/* Project List */}

      <div className="admin-project-list">

        {projects.map((project) => (
          <div
            className="admin-project-card"
            key={project._id}
          >

            <img
              src={project.image}
              alt={project.title}
            />

            <div>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <p>
                <strong>Technologies:</strong>{' '}
                {project.technologies?.join(', ')}
              </p>

              <div className="project-actions">

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(project)}
                >
                  <i className="fa-solid fa-pen"></i>
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(project._id)
                  }
                >
                  <i className="fa-solid fa-trash"></i>
                  Delete
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default ProjectManagement