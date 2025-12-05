import { Router } from 'express';
import {protect} from '../middleware/auth.middleware';
import { upload } from '../config/multer';

import { 
  // Post CRUD
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  togglePostLike,
  // Comments
  createComment, 
  deleteComment, 
  getComments, 
  toggleCommentLike, 
  updateComment,
  // Replies
  createReply,
  deleteReply,
  getReplies,
  toggleReplyLike,
  updateReply,
  // Likes
  toggleLike,
  getPostLikes,
  getPostComments,
  getMyPosts
} from '../controllers/post.controller';

const router = Router();

// Post CRUD routes
router.post("/", protect, upload.array('files', 4), createPost as any);
router.get("/", protect, getPosts);
router.get("/get-my-posts", protect, getMyPosts);
router.get("/:postId", protect, getPostById);
router.put("/:postId", protect, upload.array('files', 4), updatePost as any);
router.delete("/:postId", protect, deletePost as any);
router.post("/:postId/like", protect, togglePostLike);

// Post likes and comments
router.get("/likes/:postId", protect, getPostLikes);
router.get("/comments/:postId", protect, getPostComments);

// Comment routes
router.post("/:postId/comments", protect, createComment);
router.get("/:postId/comments", protect, getComments);
router.put("/comments/:commentId", protect, updateComment);
router.delete("/comments/:commentId", protect, deleteComment);
router.post("/comments/:commentId/like", protect, toggleCommentLike);

router.post("/:postId/react", protect, toggleLike);

// Reply routes
router.post("/comments/:commentId/replies", protect, createReply);
router.get("/comments/:commentId/replies", protect, getReplies);
router.put("/replies/:replyId", protect, updateReply);
router.delete("/replies/:replyId", protect, deleteReply);
router.post("/replies/:replyId/like", protect, toggleReplyLike);

export default router;