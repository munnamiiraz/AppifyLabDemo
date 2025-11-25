import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../../store/store'

import "../../assets/css/bootstrap.min.css"
import "../../assets/css/common.css"
import "../../assets/css/main.css"
import "../../assets/css/responsive.css"
import Navbar from '../ui/Navbar'
import LeftSidebar from '../ui/LeftSidebar'
import LayoutMiddle from '../ui/LayoutMiddle'
import RightSidebar from '../ui/RightSidebar'

const Feed = () => {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    // Check for token in localStorage
    const storedToken = localStorage.getItem('token')
    
    // Redirect to login if not authenticated or no token
    if (!isAuthenticated || !token || !storedToken) {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }, [isAuthenticated, token, navigate])

  // Prevent rendering if not authenticated or no token
  if (!isAuthenticated || !token || !localStorage.getItem('token')) {
    return null
  }

  return (
    <div className='_layout _layout_main_wrapper'>
      <div className='_main_layout'>
        <Navbar />
        <div className="container _custom_container">
				  <div className="_layout_inner_wrap" style={{marginTop: '64px', paddingTop: '0'}}>
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

export default Feed
