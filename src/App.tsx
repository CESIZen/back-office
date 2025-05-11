import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Layout from "./components/Layout"
import User from "@/pages/user/User.tsx"
import LoginPage from "@/pages/Auth/Login.tsx"
import {AuthProvider} from "@/context/AuthContext.tsx";
import PrivateRoute from "@/components/PrivateRoute.tsx";
import NotFound from "@/pages/NotFound.tsx";
import CreateUser from "@/pages/user/CreateUser.tsx";
import EditUser from "@/pages/user/EditUser.tsx";
import Role from "@/pages/role/Role.tsx";
import EditRole from "@/pages/role/EditRole.tsx";
import CreateRole from "@/pages/role/CreateRole.tsx";
import CreateCategory from "@/pages/informationCategory/CreateCategory.tsx";
import EditCategory from "@/pages/informationCategory/EditCategory.tsx";
import Category from "@/pages/informationCategory/Category.tsx";
import Information from "@/pages/information/Information.tsx";
import CreateInformation from "@/pages/information/CreateInformation.tsx";
import EditInformation from "@/pages/information/EditInformation.tsx";
import EmotionType from "@/pages/emotionType/EmotionType.tsx";
import CreateEmotionType from "@/pages/emotionType/CreateEmotionType.tsx";
import EditEmotionType from "@/pages/emotionType/EditEmotionType.tsx";
import CreateEmotion from "@/pages/emotion/CreateEmotion.tsx";
import EditEmotion from "@/pages/emotion/EditEmotion.tsx";
import Emotion from "@/pages/emotion/Emotion.tsx";
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from "@/pages/Auth/ResetPassword.tsx";

function AppRoutes() {
  const location = useLocation()

  const publicPages = ["/login", "/forgot-password", "/reset-password"]
  const isPublicPage = publicPages.some(path => location.pathname.startsWith(path))

  return isPublicPage ? (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </AuthProvider>
  ) : (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<User />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/roles" element={<Role />} />
            <Route path="/create-role" element={<CreateRole />} />
            <Route path="/edit-role/:id" element={<EditRole />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/create-category" element={<CreateCategory />} />
            <Route path="/edit-category/:id" element={<EditCategory />} />
            <Route path="/informations" element={<Information />} />
            <Route path="/create-informations" element={<CreateInformation />} />
            <Route path="/edit-informations/:id" element={<EditInformation />} />
            <Route path="/type-emotion" element={<EmotionType />} />
            <Route path="/create-type-emotion" element={<CreateEmotionType />} />
            <Route path="/edit-type-emotion/:id" element={<EditEmotionType />} />
            <Route path="/emotions" element={<Emotion />} />
            <Route path="/create-emotions" element={<CreateEmotion />} />
            <Route path="/edit-emotions/:id" element={<EditEmotion />} />
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