import { useState, useEffect } from 'react'
import "../../assets/css/bootstrap.min.css"
import "../../assets/css/common.css"
import "../../assets/css/main.css"
import "../../assets/css/responsive.css"
import Story from './Story'
import StoryMobile from './StoryMobile'
import CreatePost from './CreatePost'
import Posts from './Posts'

const LayoutMiddle = () => {
  const [pullDistance, setPullDistance] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  const [startY, setStartY] = useState(0)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        setStartY(e.touches[0].clientY)
        setIsPulling(true)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isPulling && window.scrollY === 0) {
        const currentY = e.touches[0].clientY
        const distance = Math.max(0, Math.min((currentY - startY) / 2, 80))
        setPullDistance(distance)
      }
    }

    const handleTouchEnd = () => {
      setIsPulling(false)
      setPullDistance(0)
    }

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isPulling, startY])
  
  return (
      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <div className="_layout_middle_wrap">
          {pullDistance > 0 && (
            <div style={{
              position: 'fixed',
              top: '64px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1000,
              opacity: pullDistance / 80
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '3px solid #1877f2',
                borderTopColor: 'transparent',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
          )}
          <div className="_layout_middle_inner" style={{ transform: `translateY(${pullDistance}px)`, transition: isPulling ? 'none' : 'transform 0.3s ease' }}>

            <Story />
            <StoryMobile />
            
            <CreatePost />

            <Posts />
            
          </div>
        </div>
      </div>
  )
}

export default LayoutMiddle
