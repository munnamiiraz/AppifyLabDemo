import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGetPostsQuery } from '../../store/api/getPostApi'
import type { Like } from '../../types'
import { AiOutlineLike, AiFillLike, AiOutlineComment, AiOutlineShareAlt, AiFillHeart } from 'react-icons/ai'

import PostImg from "../../assets/images/post_img.png"
import CommentImg from "../../assets/images/comment_img.png"
import axios from 'axios'
import LikesModal from './LikeModal'
import CommentsModal from './CommentModal'
import ThreeDotsMenu from './ThreedotMenu'

const Posts = () => {
  const [commentTexts, setCommentTexts] = useState<{ [key: string]: string }>({})
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({})
  const [showReplyBox, setShowReplyBox] = useState<{ [key: string]: boolean }>({})
  const [showLikesModal, setShowLikesModal] = useState<{ [key: string]: boolean }>({})
  const [showCommentsModal, setShowCommentsModal] = useState<{ [key: string]: boolean }>({})
  const [showDropdown, setShowDropdown] = useState<{ [key: string]: boolean }>({})
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  
  const { data, isLoading, error, refetch } = useGetPostsQuery()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(showDropdown).forEach(postId => {
        if (showDropdown[postId] && dropdownRefs.current[postId] && !dropdownRefs.current[postId]?.contains(event.target as Node)) {
          setShowDropdown(prev => ({ ...prev, [postId]: false }))
        }
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDropdown])

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }



  const getCurrentUserId = () => {
    // Get current user ID from localStorage or auth context
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return user.id
  }

  const isPostLikedByCurrentUser = (likes: Like[]) => {
    const currentUserId = getCurrentUserId()
    return likes.some(like => like.userId === currentUserId)
  }

  const handleCommentChange = (postId: string, value: string) => {
    setCommentTexts(prev => ({ ...prev, [postId]: value }))
  }

  const handleReplyChange = (commentId: string, value: string) => {
    setReplyTexts(prev => ({ ...prev, [commentId]: value }))
  }

  const toggleReplyBox = (commentId: string) => {
    setShowReplyBox(prev => ({ ...prev, [commentId]: !prev[commentId] }))
  }

  const handleLikePost = async (postId: string) => {
    try {
      const res = await axios.post(
        `http://localhost:9000/api/posts/${postId}/react`,
        {postId}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      )
      
      if (res.data.success) {
        // Refetch posts to update UI
        refetch()
      }
    } catch (error) {
      console.error("Failed to toggle like:", error)
    }
  }

  const handleLikeComment = async (commentId: string) => {
    try {
      const res = await axios.post(
        `http://localhost:9000/api/posts/comments/${commentId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      )
      
      if (res.data.success) {
        refetch()
      }
    } catch (error) {
      console.error('Failed to like comment:', error)
    }
  }

  const handleLikeReply = async (replyId: string) => {
    try {
      const res = await axios.post(
        `http://localhost:9000/api/posts/replies/${replyId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      )
      
      if (res.data.success) {
        refetch()
      }
    } catch (error) {
      console.error('Failed to like reply:', error)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent, postId: string) => {
    e.preventDefault()
    const content = commentTexts[postId]
    if (!content || !content.trim()) return

    try {
      const response = await axios.post(
        `http://localhost:9000/api/posts/${postId}/comments`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      )
      
      if (response.data.success) {
        setCommentTexts(prev => ({ ...prev, [postId]: '' }))
        refetch()
      }
    } catch (error) {
      console.error('Failed to post comment:', error)
    }
  }

  const handleSubmitReply = async (e: React.FormEvent, commentId: string) => {
    e.preventDefault()
    const content = replyTexts[commentId]
    if (!content || !content.trim()) return

    try {
      const response = await axios.post(
        `http://localhost:9000/api/posts/comments/${commentId}/replies`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      )
      
      if (response.data.success) {
        setReplyTexts(prev => ({ ...prev, [commentId]: '' }))
        setShowReplyBox(prev => ({ ...prev, [commentId]: false }))
        refetch()
      }
    } catch (error) {
      console.error('Failed to post reply:', error)
    }
  }

  const toggleLikesModal = (postId: string) => {
    setShowLikesModal(prev => ({ ...prev, [postId]: !prev[postId] }))
  }

  const toggleCommentsModal = (postId: string) => {
    setShowCommentsModal(prev => ({ ...prev, [postId]: !prev[postId] }))
  }

  const toggleDropdown = (postId: string) => {
    setShowDropdown(prev => ({ ...prev, [postId]: !prev[postId] }))
  }

  const isCurrentUserPost = (authorId: string) => {
    const currentUserId = getCurrentUserId()
    return currentUserId === authorId
  }

  const handleEditPost = (postId: string) => {
    // TODO: Implement edit post modal/form
    console.log('Edit post:', postId)
    setShowDropdown(prev => ({ ...prev, [postId]: false }))
  }

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return
    }
    
    try {
      const res = await axios.delete(
        `http://localhost:9000/api/user/post`,
        {
          data: { postId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      )
      
      if (res.data.success) {
        refetch()
      }
    } catch (error) {
      console.error('Failed to delete post:', error)
      alert('Failed to delete post. Please try again.')
    }
    
    setShowDropdown(prev => ({ ...prev, [postId]: false }))
  }

  if (isLoading) {
    return <div>Loading posts...</div>
  }

  if (error) {
    return <div>Error loading posts. Please try again.</div>
  }

  const posts = data?.posts || []

  return (
    <>
      {posts.map((post) => {
        const isLiked = isPostLikedByCurrentUser(post.likes)
        
        return (
          <div key={post.id} className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
            <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
              <div className="_feed_inner_timeline_post_top">
                <div className="_feed_inner_timeline_post_box">
                  <div className="_feed_inner_timeline_post_box_image">
                    <img 
                      src={post.author.image || PostImg} 
                      alt={`${post.author.firstName} ${post.author.lastName}`} 
                      className="_post_img" 
                    />
                  </div>
                  <div className="_feed_inner_timeline_post_box_txt">
                    <h4 className="_feed_inner_timeline_post_box_title">
                      {post.author.firstName} {post.author.lastName}
                    </h4>
                    <p className="_feed_inner_timeline_post_box_para">
                      {getTimeAgo(post.createdAt)} . 
                      <Link to="#0">Public</Link>
                    </p>
                  </div>
                </div>
                <div 
                  className="_feed_inner_timeline_post_box_dropdown" 
                  style={{ 
                    position: 'relative',
                    display: 'inline-block'
                  }}
                  ref={(el) => { 
                    if (el) dropdownRefs.current[post.id] = el 
                  }}
                >
                  <button
                    type="button"
                    className="_feed_timeline_post_dropdown_link"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleDropdown(post.id)
                    }}
                    style={{ 
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="4" r="2" fill="#666"/>
                      <circle cx="10" cy="10" r="2" fill="#666"/>
                      <circle cx="10" cy="16" r="2" fill="#666"/>
                    </svg>
                  </button>
                  {showDropdown[post.id] && (
                    <ThreeDotsMenu
                      isAuthor={isCurrentUserPost(post.author.id)}
                      onEdit={() => handleEditPost(post.id)}
                      onDelete={() => handleDeletePost(post.id)}
                      show={true}
                      onClose={() => setShowDropdown(prev => ({ ...prev, [post.id]: false }))}
                    />
                  )}
                </div>
              </div>

              {post.content && (
                <h4 className="_feed_inner_timeline_post_title">{post.content}</h4>
              )}
              
              {post.media.length > 0 && (
                <div className="_feed_inner_timeline_image">
                  <img src={post.media[0].url} alt="" className="_time_img" />
                </div>
              )}
            </div>
            
            {/* Post Stats */}
            <div className="_padd_r24 _padd_l24 _mar_b16">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {post.likesCount > 0 && (
                  <p 
                    onClick={() => toggleLikesModal(post.id)} 
                    style={{ 
                      cursor: 'pointer', 
                      fontWeight: '600', 
                      fontSize: '14px',
                      margin: 0,
                      color: '#262626'
                    }}
                  >
                    {post.likesCount} {post.likesCount === 1 ? 'like' : 'likes'}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#65676b' }}>
                  <span 
                    onClick={() => toggleCommentsModal(post.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                  </span>
                  <span>0 Shares</span>
                </div>
              </div>
            </div>
            
            {/* Separator line */}
            <div className="_padd_r24 _padd_l24">
              <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px solid #e4e6ea' }} />
            </div>
            
            <div className="_feed_inner_timeline_reaction">
              <button 
                className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${isLiked ? '_feed_reaction_active' : ''}`}
                onClick={() => handleLikePost(post.id)}
              >
                <span className="_feed_inner_timeline_reaction_link">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isLiked ? <AiFillLike size={18} /> : <AiOutlineLike size={18} />}
                    {isLiked ? 'Liked' : 'Like'}
                  </span>
                </span>
              </button>
              <button 
                className="_feed_inner_timeline_reaction_comment _feed_reaction"
                onClick={() => toggleCommentsModal(post.id)}
              >
                <span className="_feed_inner_timeline_reaction_link">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AiOutlineComment size={18} />
                    Comment
                  </span>
                </span>
              </button>
              <button className="_feed_inner_timeline_reaction_share _feed_reaction">
                <span className="_feed_inner_timeline_reaction_link">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AiOutlineShareAlt size={18} />
                    Share
                  </span>
                </span>
              </button>
            </div>
            
            <div className="_feed_inner_timeline_cooment_area"> 
              <div className="_feed_inner_comment_box">
                <form className="_feed_inner_comment_box_form" onSubmit={(e) => handleSubmitComment(e, post.id)}>
                  <div className="_feed_inner_comment_box_content">
                    <div className="_feed_inner_comment_box_content_image">
                      <img src={CommentImg} alt="" className="_comment_img" />
                    </div>
                    <div className="_feed_inner_comment_box_content_txt">
                      <textarea
                        className="form-control _comment_textarea" 
                        placeholder="Write a comment" 
                        id="floatingTextarea2"
                        value={commentTexts[post.id] || ''}
                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="_feed_inner_comment_box_icon">
                    <button 
                      type="submit" 
                      className="_feed_inner_comment_box_icon_btn"
                      disabled={!commentTexts[post.id]?.trim()}
                      style={{
                        backgroundColor: commentTexts[post.id]?.trim() ? '#1877f2' : '#e4e6ea',
                        color: commentTexts[post.id]?.trim() ? 'white' : '#65676b',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: commentTexts[post.id]?.trim() ? 'pointer' : 'not-allowed'
                      }}
                    >
                      Comment
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="_timline_comment_main">
              {(() => {
                const totalCommentsAndReplies = post.comments.reduce((total, comment) => {
                  return total + 1 + comment.replies.length
                }, 0)
                
                if (totalCommentsAndReplies > 2) {
                  return (
                    <div className="_previous_comment">
                      <button type="button" className="_previous_comment_txt" onClick={() => toggleCommentsModal(post.id)}>
                        View {totalCommentsAndReplies - 2} previous comments
                      </button>
                    </div>
                  )
                }
                return null
              })()}
              
              {(() => {
                const allItems: Array<{type: 'comment' | 'reply', data: any, parentId?: string}> = []
                post.comments.forEach(comment => {
                  allItems.push({type: 'comment', data: comment})
                  comment.replies.forEach(reply => {
                    allItems.push({type: 'reply', data: reply, parentId: comment.id})
                  })
                })
                
                return allItems.slice(-2).map((item) => {
                  if (item.type === 'comment') {
                    const comment = item.data
                    const isCommentLiked = isPostLikedByCurrentUser(comment.likes)
                    
                    return (
                  <div key={comment.id} className="_comment_main">
                    <div className="_comment_image">
                      <Link to="profile.html" className="_comment_image_link">
                        <img 
                          src={comment.author.image || CommentImg} 
                          alt={`${comment.author.firstName} ${comment.author.lastName}`} 
                          className="_comment_img1" 
                        />
                      </Link>
                    </div>
                    <div className="_comment_area">
                      <div className="_comment_details">
                        <div className="_comment_details_top">
                          <div className="_comment_name">
                            <Link to="profile.html">
                              <h4 className="_comment_name_title">
                                {comment.author.firstName} {comment.author.lastName}
                              </h4>
                            </Link>
                          </div>
                        </div>
                        <div className="_comment_status">
                          <p className="_comment_status_text">
                            <span>{comment.content}</span>
                          </p>
                        </div>
                        {comment.likesCount > 0 && (
                          <div className="_total_reactions">
                            <div className="_total_react">
                              <span className="_reaction_like">
                                <AiFillLike size={14} color="#1877f2" />
                              </span>
                              <span className="_reaction_heart">
                                <AiFillHeart size={14} color="#e91e63" />
                              </span>
                            </div>
                            <span className="_total">
                              {comment.likesCount}
                            </span>
                          </div>
                        )}
                        <div className="_comment_reply">
                          <div className="_comment_reply_num">
                            <ul className="_comment_reply_list">
                              <li><span onClick={() => handleLikeComment(comment.id)} style={{ cursor: 'pointer' }}>{isCommentLiked ? 'Liked' : 'Like'}.</span></li>
                              <li><span onClick={() => toggleReplyBox(comment.id)} style={{ cursor: 'pointer' }}>Reply.</span></li>
                              <li><span>Share</span></li>
                              <li><span className="_time_link">.{getTimeAgo(comment.createdAt)}</span></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {showReplyBox[comment.id] && (
                        <div className="_feed_inner_comment_box">
                          <form className="_feed_inner_comment_box_form" onSubmit={(e) => handleSubmitReply(e, comment.id)}>
                            <div className="_feed_inner_comment_box_content">
                              <div className="_feed_inner_comment_box_content_image">
                                <img src={CommentImg} alt="" className="_comment_img" />
                              </div>
                              <div className="_feed_inner_comment_box_content_txt">
                                <textarea 
                                  className="form-control _comment_textarea" 
                                  placeholder="Write a reply" 
                                  id="floatingTextarea2"
                                  value={replyTexts[comment.id] || ''}
                                  onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                                ></textarea>
                              </div>
                            </div>
                            <div className="_feed_inner_comment_box_icon">
                              <button 
                                type="submit" 
                                className="_feed_inner_comment_box_icon_btn"
                                disabled={!replyTexts[comment.id]?.trim()}
                                style={{
                                  backgroundColor: replyTexts[comment.id]?.trim() ? '#1877f2' : '#e4e6ea',
                                  color: replyTexts[comment.id]?.trim() ? 'white' : '#65676b',
                                  border: 'none',
                                  padding: '6px 12px',
                                  borderRadius: '6px',
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  cursor: replyTexts[comment.id]?.trim() ? 'pointer' : 'not-allowed'
                                }}
                              >
                                Reply
                              </button>
                            </div>
                          </form>
                        </div>
                      )}
                      
                    </div>
                  </div>
                    )
                  } else {
                    const reply = item.data
                    const isReplyLiked = isPostLikedByCurrentUser(reply.likes)
                    
                    return (
                      <div key={reply.id} className="_comment_main" style={{ marginLeft: '40px' }}>
                        <div className="_comment_image">
                          <Link to="profile.html" className="_comment_image_link">
                            <img 
                              src={reply.author.image || CommentImg} 
                              alt={`${reply.author.firstName} ${reply.author.lastName}`} 
                              className="_comment_img1" 
                            />
                          </Link>
                        </div>
                        <div className="_comment_area">
                          <div className="_comment_details">
                            <div className="_comment_details_top">
                              <div className="_comment_name">
                                <Link to="profile.html">
                                  <h4 className="_comment_name_title">
                                    {reply.author.firstName} {reply.author.lastName}
                                  </h4>
                                </Link>
                              </div>
                            </div>
                            <div className="_comment_status">
                              <p className="_comment_status_text">
                                <span>{reply.content}</span>
                              </p>
                            </div>
                            {reply.likesCount > 0 && (
                              <div className="_total_reactions">
                                <div className="_total_react">
                                  <span className="_reaction_like">
                                    <AiFillLike size={14} color="#1877f2" />
                                  </span>
                                  <span className="_reaction_heart">
                                    <AiFillHeart size={14} color="#e91e63" />
                                  </span>
                                </div>
                                <span className="_total">{reply.likesCount}</span>
                              </div>
                            )}
                            <div className="_comment_reply">
                              <div className="_comment_reply_num">
                                <ul className="_comment_reply_list">
                                  <li><span onClick={() => handleLikeReply(reply.id)} style={{ cursor: 'pointer' }}>{isReplyLiked ? 'Liked' : 'Like'}.</span></li>
                                  <li><span>Reply.</span></li>
                                  <li><span>Share</span></li>
                                  <li><span className="_time_link">.{getTimeAgo(reply.createdAt)}</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })
              })()}
            </div>

            {/* Likes Modal */}
            {showLikesModal[post.id] && (
              <LikesModal postId={post.id} onClose={() => toggleLikesModal(post.id)} />
            )}

            {/* Comments Modal */}
            {showCommentsModal[post.id] && (
              <CommentsModal postId={post.id} onClose={() => toggleCommentsModal(post.id)} />
            )}
          </div>
        )
      })}
    </>
  )
}

export default Posts