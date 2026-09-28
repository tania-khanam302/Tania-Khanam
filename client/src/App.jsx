import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Error from './pages/Error'

import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProjectManagement from './pages/admin/ProjectManagement'
import MessagesManagement from './pages/admin/MessagesManagement'
import SkillsManagement from './pages/admin/SkillsManagement'
import JourneyManagement from './pages/admin/JourneyManagement'
import AdminLayout from './pages/admin/AdminLayout'

// Protected Route
function ProtectedRoute({ children }) {
  const isAdminLoggedIn =
    localStorage.getItem('adminLoggedIn') === 'true'

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />
  }

  return children
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/portfolio"
          element={<Portfolio />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />


        {/* Protected Admin Routes */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/projects"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <ProjectManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <MessagesManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/skills"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <SkillsManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/journey"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <JourneyManagement />
              </AdminLayout>
            </ProtectedRoute>
          }
        />


        {/* Error */}

        <Route
          path="*"
          element={<Error />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App