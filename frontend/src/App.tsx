import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserFromStorage } from './store/slices/authSlice'
import type { RootState } from './store/store'
import Navbar from './components/ui/Navbar'
import Login from './components/ui/Login'
import Registration from './components/ui/Registration'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import "./assets/css/bootstrap.min.css"
import "./assets/css/common.css"
import "./assets/css/main.css"
import "./assets/css/responsive.css"

import LeftSidebar from './components/ui/LeftSidebar'
import LayoutMiddle from './components/ui/LayoutMiddle'
import RightSidebar from './components/ui/RightSidebar'
import DarkModeToggle from './components/ui/DarkModeToggle'


function ConditionalNavbar() {
  const location = useLocation()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  
  // Don't show navbar on auth pages
  const authPages = ['/login', '/register']
  const shouldShowNavbar = isAuthenticated && !authPages.includes(location.pathname)
  
  return shouldShowNavbar ? <Navbar /> : null
}

function FeedLayout() {
  return (
    <div className="_layout _layout_main_wrapper">
      <DarkModeToggle />
      <div className="_main_layout">
        <ConditionalNavbar />
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              <LeftSidebar />
              <LayoutMiddle />
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUserFromStorage() as any)
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <FeedLayout />
          </ProtectedRoute>
        } />
        
        <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><Registration /></AuthLayout>} />
      </Routes>
    </Router>
  )
}

export default App