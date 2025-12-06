import { useState, useEffect } from 'react'
import axios from 'axios'
import { AiFillLike } from 'react-icons/ai'

interface User {
  id: string
  firstName: string
  lastName: string
  image: string | null
}

interface Reply {
  id: string
  authorId: string
  commentId: string
  author: User
  content: string
  likesCount: number
  likes: any[]
  isLikedByMe: boolean
  createdAt: string
}

interface Comment {
  id: string
  postId: string
  authorId: string
  author: User
  content: string
  likesCount: number
  likes: any[]
  isLikedByMe: boolean
  replies: Reply[]
  createdAt: string
}


interface CommentsModalProps {
  postId: string
  onClose: () => void
}

const CommentsModal = ({ postId, onClose }: CommentsModalProps) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({})
  const [showReplyBox, setShowReplyBox] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/${postId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      )
      
      if (response.data.success) {
        setComments(response.data.comments)
      }

      console.log(response);
      
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch comments:', error)
      setLoading(false)
    }
  }

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

  const handleReplySubmit = async (commentId: string) => {
    const content = replyTexts[commentId]
    if (!content || !content.trim()) return

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts/comments/${commentId}/replies`,
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
        fetchComments()
      }
    } catch (error) {
      console.error('Failed to post reply:', error)
    }
  }

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts/${postId}/comments`,
        { content: commentText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      )
      
      if (response.data.success) {
        setCommentText('')
        fetchComments()
      }
    } catch (error) {
      console.error('Failed to post comment:', error)
    }
  }

  const handleLikeComment = async (commentId: string) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts/comments/${commentId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      )
      console.log(res);
      
      if (res.data.success) {
        fetchComments()
      }
    } catch (error) {
      console.error('Failed to like comment:', error)
    }
  }

  const handleLikeReply = async (replyId: string) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/posts/replies/${replyId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      )
      
      if (res.data.success) {
        fetchComments()
      }
    } catch (error) {
      console.error('Failed to like reply:', error)
    }
  }

  const getTotalCount = () => {
    let total = comments.length
    comments.forEach(comment => {
      total += comment.replies.length
    })
    return total
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        width: '600px',
        maxWidth: '90%',
        maxHeight: '700px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
            Comments ({getTotalCount()})
          </h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666',
              padding: '0',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>

        {/* Comments List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 0'
        }}>
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              Loading comments...
            </div>
          ) : comments.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
              No comments yet. Be the first to comment!
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} style={{ padding: '12px 20px' }}>
                {/* Comment */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '12px'
                }}>
                  <img 
                    src={comment.author.image || 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg'} 
                    alt={`${comment.author.firstName} ${comment.author.lastName}`}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      backgroundColor: '#f0f2f5',
                      borderRadius: '18px',
                      padding: '8px 12px'
                    }}>
                      <div style={{ 
                        fontWeight: '600', 
                        fontSize: '13px',
                        marginBottom: '4px'
                      }}>
                        {comment.author.firstName} {comment.author.lastName}
                      </div>
                      <div style={{ 
                        fontSize: '14px',
                        lineHeight: '1.4'
                      }}>
                        {comment.content}
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '4px 12px',
                      fontSize: '12px',
                      color: '#65676b',
                      alignItems: 'center'
                    }}>
                      <span 
                        style={{ 
                          cursor: 'pointer', 
                          fontWeight: '600',
                          color: comment.isLikedByMe ? '#1877f2' : '#65676b',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        {comment.isLikedByMe && <AiFillLike size={12} />}
                        {comment.isLikedByMe ? 'Liked' : 'Like'}
                      </span>
                      <span 
                        style={{ cursor: 'pointer', fontWeight: '600' }}
                        onClick={() => setShowReplyBox(prev => ({ ...prev, [comment.id]: !prev[comment.id] }))}
                      >
                        Reply
                      </span>
                      <span>{getTimeAgo(comment.createdAt)}</span>
                      {comment.likesCount > 0 && (
                        <span style={{ fontWeight: '400' }}>{comment.likesCount} {comment.likesCount === 1 ? 'like' : 'likes'}</span>
                      )}
                    </div>

                    {/* Reply Input Box */}
                    {showReplyBox[comment.id] && (
                      <div style={{ marginTop: '8px', marginLeft: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="Write a reply..."
                          value={replyTexts[comment.id] || ''}
                          onChange={(e) => setReplyTexts(prev => ({ ...prev, [comment.id]: e.target.value }))}
                          onKeyPress={(e) => e.key === 'Enter' && handleReplySubmit(comment.id)}
                          style={{
                            flex: 1,
                            padding: '6px 12px',
                            borderRadius: '18px',
                            border: '1px solid #e5e5e5',
                            outline: 'none',
                            fontSize: '13px'
                          }}
                        />
                        <button
                          onClick={() => handleReplySubmit(comment.id)}
                          disabled={!replyTexts[comment.id]?.trim()}
                          style={{
                            backgroundColor: replyTexts[comment.id]?.trim() ? '#1877f2' : '#e4e6ea',
                            color: replyTexts[comment.id]?.trim() ? 'white' : '#65676b',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: replyTexts[comment.id]?.trim() ? 'pointer' : 'not-allowed'
                          }}
                        >
                          Reply
                        </button>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div style={{ marginTop: '8px', marginLeft: '12px' }}>
                        {comment.replies.map((reply) => (
                          <div key={reply.id} style={{
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '8px'
                          }}>
                            <img 
                              src={reply.author.image || 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg'} 
                              alt={`${reply.author.firstName} ${reply.author.lastName}`}
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                flexShrink: 0
                              }}
                            />
                            <div style={{ flex: 1 }}>
                              <div style={{
                                backgroundColor: '#f0f2f5',
                                borderRadius: '18px',
                                padding: '8px 12px'
                              }}>
                                <div style={{ 
                                  fontWeight: '600', 
                                  fontSize: '13px',
                                  marginBottom: '4px'
                                }}>
                                  {reply.author.firstName} {reply.author.lastName}
                                </div>
                                <div style={{ 
                                  fontSize: '14px',
                                  lineHeight: '1.4'
                                }}>
                                  {reply.content}
                                </div>
                              </div>
                              <div style={{
                                display: 'flex',
                                gap: '16px',
                                padding: '4px 12px',
                                fontSize: '12px',
                                color: '#65676b',
                                alignItems: 'center'
                              }}>
                                <span 
                                  style={{ 
                                    cursor: 'pointer', 
                                    fontWeight: '600',
                                    color: reply.isLikedByMe ? '#1877f2' : '#65676b',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}
                                  onClick={() => handleLikeReply(reply.id)}
                                >
                                  {reply.isLikedByMe && <AiFillLike size={12} />}
                                  {reply.isLikedByMe ? 'Liked' : 'Like'}
                                </span>
                                <span style={{ cursor: 'pointer', fontWeight: '600' }}>Reply</span>
                                <span>{getTimeAgo(reply.createdAt)}</span>
                                {reply.likesCount > 0 && (
                                  <span style={{ fontWeight: '400' }}>{reply.likesCount} {reply.likesCount === 1 ? 'like' : 'likes'}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid #e5e5e5',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <img 
            src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg" 
            alt="Your profile"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '18px',
              border: '1px solid #e5e5e5',
              outline: 'none',
              fontSize: '14px'
            }}
          />
          <button
            onClick={handleCommentSubmit}
            disabled={!commentText.trim()}
            style={{
              backgroundColor: commentText.trim() ? '#1877f2' : '#e4e6ea',
              color: commentText.trim() ? 'white' : '#65676b',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: commentText.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentsModal