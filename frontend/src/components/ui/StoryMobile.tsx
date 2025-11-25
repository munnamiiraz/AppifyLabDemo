import { Link } from 'react-router-dom'

import MobileStoryImg from "../../assets/images/mobile_story_img.png"
import MobileStoryImg1 from "../../assets/images/mobile_story_img1.png"
import MobileStoryImg2 from "../../assets/images/mobile_story_img2.png"

const StoryMobile = () => {
  return (
    <div className="_feed_inner_ppl_card_mobile _mar_b16">
      <div className="_feed_inner_ppl_card_area">
        <ul className="_feed_inner_ppl_card_area_list">
          <li className="_feed_inner_ppl_card_area_item">
            <Link to="#0" className="_feed_inner_ppl_card_area_link">
              <div className="_feed_inner_ppl_card_area_story">
                <img src={MobileStoryImg} alt="Image" className="_card_story_img" />
                <div className="_feed_inner_ppl_btn">
                  <button className="_feed_inner_ppl_btn_link" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
                      <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M6 2.5v7M2.5 6h7"/>
                    </svg>
                  </button>
                </div>
              </div>
              <p className="_feed_inner_ppl_card_area_link_txt">Your Story</p>
            </Link>
          </li>
          <li className="_feed_inner_ppl_card_area_item">
            <Link to="#0" className="_feed_inner_ppl_card_area_link">
              <div className="_feed_inner_ppl_card_area_story_active">
                <img src={MobileStoryImg1} alt="Image" className="_card_story_img1" />
              </div>
              <p className="_feed_inner_ppl_card_area_txt">Ryan...</p>
            </Link>
          </li>
          <li className="_feed_inner_ppl_card_area_item">
            <Link to="#0" className="_feed_inner_ppl_card_area_link">
              <div className="_feed_inner_ppl_card_area_story_inactive">
                <img src={MobileStoryImg2} alt="Image" className="_card_story_img1" />
              </div>
              <p className="_feed_inner_ppl_card_area_txt">Ryan...</p>
            </Link>
          </li>
          <li className="_feed_inner_ppl_card_area_item">
            <Link to="#0" className="_feed_inner_ppl_card_area_link">
              <div className="_feed_inner_ppl_card_area_link">
                <div className="_feed_inner_ppl_card_area_story_active">
                  <img src={MobileStoryImg1} alt="Image" className="_card_story_img1" />
                </div>
                <p className="_feed_inner_ppl_card_area_txt">Ryan...</p>
              </div>
            </Link>
          </li>
          <li className="_feed_inner_ppl_card_area_item">
            <Link to="#0" className="_feed_inner_ppl_card_area_link">
              <div className="_feed_inner_ppl_card_area_story_inactive">
                <img src={MobileStoryImg2} alt="Image" className="_card_story_img1" />
              </div>
              <p className="_feed_inner_ppl_card_area_txt">Ryan...</p>
            </Link>
          </li>
          <li className="_feed_inner_ppl_card_area_item">
            <Link to="#0" className="_feed_inner_ppl_card_area_link">
              <div className="_feed_inner_ppl_card_area_link">
                <div className="_feed_inner_ppl_card_area_story_active">
                  <img src={MobileStoryImg1} alt="Image" className="_card_story_img1" />
                </div>
                <p className="_feed_inner_ppl_card_area_txt">Ryan...</p>
              </div>
            </Link>
          </li>
          <li className="_feed_inner_ppl_card_area_item">
            <Link to="#0" className="_feed_inner_ppl_card_area_link">
              <div className="_feed_inner_ppl_card_area_story">
                <img src={MobileStoryImg} alt="Image" className="_card_story_img" />
              </div>
              <p className="_feed_inner_ppl_card_area_txt">Ryan...</p>
            </Link>
          </li>
          <li className="_feed_inner_ppl_card_area_item">
            <Link to="#0" className="_feed_inner_ppl_card_area_link">
              <div className="_feed_inner_ppl_card_area_story_active">
                <img src={MobileStoryImg1} alt="Image" className="_card_story_img1" />
              </div>
              <p className="_feed_inner_ppl_card_area_txt">Ryan...</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default StoryMobile
