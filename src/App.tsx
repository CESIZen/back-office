import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Layout from "./components/Layout"
import User from "@/pages/user/User.tsx"
import LoginPage from "@/pages/Auth/Login.tsx"
import {AuthProvider} from "@/context/AuthContext.tsx";
import PrivateRoute from "@/components/PrivateRoute.tsx";
import NotFound from "@/pages/NotFound.tsx";

function AppRoutes() {
  const location = useLocation()

  const noLayoutPages = ["/login"]

  const isNoLayoutPage = noLayoutPages.includes(location.pathname)

  return isNoLayoutPage ? (
    <AuthProvider>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </AuthProvider>
  ) : (
    <AuthProvider>
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Layout>
    </AuthProvider>
  )
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}