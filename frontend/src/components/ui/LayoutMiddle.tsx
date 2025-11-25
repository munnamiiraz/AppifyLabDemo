import "../../assets/css/bootstrap.min.css"
import "../../assets/css/common.css"
import "../../assets/css/main.css"
import "../../assets/css/responsive.css"
import Story from './Story'
import StoryMobile from './StoryMobile'
import CreatePost from './CreatePost'
import Posts from './Posts'




const LayoutMiddle = () => {
  
  return (
      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
        <div className="_layout_middle_wrap">
          <div className="_layout_middle_inner">

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
