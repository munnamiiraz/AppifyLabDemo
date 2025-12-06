import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { uploadBufferToCloudinary } from '../utils/cloudinary-buffer';
import cloudinary from '../config/cloudinary';

const prisma = new PrismaClient();

export interface AuthFileRequest extends Request {
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  files?: Express.Multer.File[];
}

// ============================================
// POST CRUD ENDPOINTS
// ============================================

export const createPost = async (req: AuthFileRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const contentRaw = req.body?.content;
    const content = typeof contentRaw === 'string' && contentRaw.trim().length > 0 ? contentRaw.trim() : null;

    const files = (req.files as Express.Multer.File[] | undefined) ?? [];

    if (!content && files.length === 0) {
      return res.status(400).json({ message: 'Post must contain text or at least one photo' });
    }

    if (files.length > 4) {
      return res.status(400).json({ message: 'Maximum 4 images are allowed' });
    }

    for (const f of files) {
      if (!f.mimetype?.startsWith('image/')) {
        return res.status(400).json({ message: 'Only image files are allowed' });
      }
    }

    const uploadedFiles: Array<{url: string, type: string, publicId: string}> = [];
    
    if (files.length > 0) {
      for (const file of files) {
        try {
          const uploadResult = await uploadBufferToCloudinary(file.buffer, file.originalname, 'posts');
          const fileExtension = file.originalname.split('.').pop()?.toLowerCase() || uploadResult?.format || 'jpg';
          
          uploadedFiles.push({
            url: uploadResult.url,
            type: fileExtension,
            publicId: uploadResult.publicId
          });
        } catch (err) {
          for (const uploaded of uploadedFiles) {
            try {
              await cloudinary.uploader.destroy(uploaded.publicId);
            } catch (cleanupErr) {
              console.error('Cleanup error:', cleanupErr);
            }
          }
          throw new Error('Media upload failed: ' + (err as any)?.message);
        }
      }
    }

    const createdPost = await prisma.$transaction(async (tx) => {
      const post = await tx.post.create({
        data: {
          authorId: userId,
          content,
          isPrivate: Boolean(req.body?.isPrivate === 'true' || req.body?.isPrivate === true),
        },
      });

      if (uploadedFiles.length > 0) {
        const mediaCreates = uploadedFiles.map(file => 
          tx.postMedia.create({
            data: {
              postId: post.id,
              url: file.url,
              type: file.type,
            },
          })
        );

        await Promise.all(mediaCreates);
      }

      return tx.post.findUnique({
        where: { id: post.id },
        include: { 
          media: true,
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              profileImage: true,
coverImage: true,

            }
          }
        },
      });
    });

    return res.status(201).json({ message: 'Post created', post: createdPost });
  } catch (err: any) {
    console.error('createPost error:', err);
    if (err.message && err.message.startsWith('Media upload failed')) {
      return res.status(500).json({ message: 'Media upload failed', error: err.message });
    }
    return res.status(500).json({ message: 'Failed to create post', error: err?.message ?? String(err) });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id; 
    console.log("Authenticated user:", userId);

    const where = userId
      ? {
          OR: [
            { isPrivate: false },
            { AND: [{ isPrivate: true }, { authorId: userId }] }
          ]
        }
      : { isPrivate: false };

    const posts = await prisma.post.findMany({
      where,
      include: {
        media: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true,
coverImage: true,

          },
        },
        likes: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profileImage: true,
coverImage: true,

              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        comments: {
          include: {
            author: true,
            likes: { include: { user: true }, orderBy: { createdAt: 'desc' } },
            replies: {
              include: {
                author: true,
                likes: { include: { user: true }, orderBy: { createdAt: 'desc' } },
              },
              orderBy: { createdAt: 'asc' },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const postsWithCounts = posts.map(post => ({
      ...post,
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
      comments: post.comments.map(comment => ({
        ...comment,
        likesCount: comment.likes.length,
        repliesCount: comment.replies.length,
        replies: comment.replies.map(reply => ({
          ...reply,
          likesCount: reply.likes.length,
        })),
      })),
    }));

    return res.status(200).json({
      message: 'Posts retrieved successfully',
      posts: postsWithCounts,
    });

  } catch (err: any) {
    console.error('getPosts error:', err);
    return res.status(500).json({
      message: 'Failed to retrieve posts',
      error: err?.message ?? String(err),
    });
  }
};

export const getMyPosts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,   // <= Only YOUR posts
      },
      include: {
        media: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true,
coverImage: true,

          },
        },
        likes: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profileImage: true,
coverImage: true,

              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profileImage: true,
coverImage: true,

              },
            },
            likes: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    profileImage: true,
coverImage: true,

                  },
                },
              },
              orderBy: { createdAt: "desc" },
            },
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    profileImage: true,
coverImage: true,

                  },
                },
                likes: {
                  include: {
                    user: {
                      select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        profileImage: true,
coverImage: true,

                      },
                    },
                  },
                  orderBy: { createdAt: "desc" },
                },
              },
              orderBy: { createdAt: "asc" },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const postsWithCounts = posts.map((post) => ({
      ...post,
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
      comments: post.comments.map((comment) => ({
        ...comment,
        likesCount: comment.likes.length,
        repliesCount: comment.replies.length,
        replies: comment.replies.map((reply) => ({
          ...reply,
          likesCount: reply.likes.length,
        })),
      })),
    }));

    return res.status(200).json({
      message: "Your posts retrieved successfully",
      posts: postsWithCounts,
    });
  } catch (err: any) {
    console.error("getMyPosts error:", err);
    return res.status(500).json({
      message: "Failed to retrieve your posts",
      error: err?.message ?? String(err),
    });
  }
};


export const getPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        media: true,
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImage: true,
coverImage: true,

          },
        },
        likes: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profileImage: true,
coverImage: true,

              },
            },
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                profileImage: true,
coverImage: true,

              },
            },
            likes: {
              include: {
                user: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    profileImage: true,
coverImage: true,

                  },
                },
              },
            },
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    profileImage: true,
coverImage: true,

                  },
                },
                likes: {
                  include: {
                    user: {
                      select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        profileImage: true,
coverImage: true,

                      },
                    },
                  },
                },
              },
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const postWithCounts = {
      ...post,
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
      comments: post.comments.map(comment => ({
        ...comment,
        likesCount: comment.likes.length,
        repliesCount: comment.replies.length,
        replies: comment.replies.map(reply => ({
          ...reply,
          likesCount: reply.likes.length,
        })),
      })),
    };

    return res.status(200).json({ 
      message: 'Post retrieved successfully', 
      post: postWithCounts 
    });
  } catch (err: any) {
    console.error('getPostById error:', err);
    return res.status(500).json({ 
      message: 'Failed to retrieve post', 
      error: err?.message ?? String(err) 
    });
  }
};

export const updatePost = async (req: AuthFileRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      include: { media: true },
    });

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (existingPost.authorId !== userId) {
      return res.status(403).json({ message: 'You can only edit your own posts' });
    }

    const contentRaw = req.body?.content;
    const content = typeof contentRaw === 'string' && contentRaw.trim().length > 0 ? contentRaw.trim() : null;

    const newFiles = (req.files as Express.Multer.File[] | undefined) ?? [];
    const keepMediaIds = req.body?.keepMediaIds 
      ? (Array.isArray(req.body.keepMediaIds) ? req.body.keepMediaIds : [req.body.keepMediaIds])
      : [];

    const totalMediaCount = keepMediaIds.length + newFiles.length;

    if (!content && totalMediaCount === 0) {
      return res.status(400).json({ message: 'Post must contain text or at least one photo' });
    }

    if (totalMediaCount > 4) {
      return res.status(400).json({ message: 'Maximum 4 images are allowed' });
    }

    for (const f of newFiles) {
      if (!f.mimetype?.startsWith('image/')) {
        return res.status(400).json({ message: 'Only image files are allowed' });
      }
    }

    const mediaToDelete = existingPost.media.filter(m => !keepMediaIds.includes(m.id));
    const uploadedFiles: Array<{url: string, type: string, publicId: string}> = [];
    
    if (newFiles.length > 0) {
      for (const file of newFiles) {
        try {
          const uploadResult = await uploadBufferToCloudinary(file.buffer, file.originalname, 'posts');
          const fileExtension = file.originalname.split('.').pop()?.toLowerCase() || uploadResult?.format || 'jpg';
          
          uploadedFiles.push({
            url: uploadResult.url,
            type: fileExtension,
            publicId: uploadResult.publicId
          });
        } catch (err) {
          for (const uploaded of uploadedFiles) {
            try {
              await cloudinary.uploader.destroy(uploaded.publicId);
            } catch (cleanupErr) {
              console.error('Cleanup error:', cleanupErr);
            }
          }
          throw new Error('Media upload failed: ' + (err as any)?.message);
        }
      }
    }

    const updatedPost = await prisma.$transaction(async (tx) => {
      if (mediaToDelete.length > 0) {
        await tx.postMedia.deleteMany({
          where: {
            id: { in: mediaToDelete.map(m => m.id) },
          },
        });
      }

      if (uploadedFiles.length > 0) {
        const mediaCreates = uploadedFiles.map(file => 
          tx.postMedia.create({
            data: {
              postId: postId,
              url: file.url,
              type: file.type,
            },
          })
        );

        await Promise.all(mediaCreates);
      }

      const post = await tx.post.update({
        where: { id: postId },
        data: {
          content,
          isPrivate: Boolean(req.body?.isPrivate === 'true' || req.body?.isPrivate === true),
        },
        include: { 
          media: true,
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              profileImage: true,
coverImage: true,

            }
          }
        },
      });

      return post;
    });

    if (mediaToDelete.length > 0) {
      for (const media of mediaToDelete) {
        try {
          const urlParts = media.url.split('/');
          const fileWithExt = urlParts[urlParts.length - 1];
          const publicId = `posts/${fileWithExt.split('.')[0]}`;
          
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error('Error deleting old media from Cloudinary:', err);
        }
      }
    }

    return res.status(200).json({ message: 'Post updated', post: updatedPost });
  } catch (err: any) {
    console.error('updatePost error:', err);
    if (err.message && err.message.startsWith('Media upload failed')) {
      return res.status(500).json({ message: 'Media upload failed', error: err.message });
    }
    return res.status(500).json({ message: 'Failed to update post', error: err?.message ?? String(err) });
  }
};

export const deletePost = async (req: AuthFileRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      include: { media: true },
    });

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (existingPost.authorId !== userId) {
      return res.status(403).json({ message: 'You can only delete your own posts' });
    }

    if (existingPost.media.length > 0) {
      for (const media of existingPost.media) {
        try {
          const urlParts = media.url.split('/');
          const fileWithExt = urlParts[urlParts.length - 1];
          const publicId = `posts/${fileWithExt.split('.')[0]}`;

          await cloudinary.uploader.destroy(publicId);
        } catch (error) {
          console.error("Cloudinary delete failed:", error);
        }
      }
    }

    await prisma.postMedia.deleteMany({
      where: { postId }
    });

    await prisma.post.delete({
      where: { id: postId }
    });

    return res.status(200).json({ message: "Post deleted successfully" });

  } catch (err: any) {
    console.error("deletePost error:", err);
    return res.status(500).json({
      message: "Failed to delete post",
      error: err.message || "Unknown error"
    });
  }
};

export const togglePostLike = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { postId } = req.params;

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        postId
      }
    });

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
      res.status(200).json({
        success: true,
        liked: false,
        message: "Post unliked"
      });
      return;
    }

    await prisma.like.create({
      data: {
        userId,
        postId
      }
    });

    res.status(200).json({
      success: true,
      liked: true,
      message: "Post liked successfully"
    });

  } catch (error: any) {
    const status = error.status || 500;
    res.status(status).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

// ============================================
// COMMENT ENDPOINTS
// ============================================

// POST /api/posts/:postId/comments
// Create a new comment on a post
export const createComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id; // Assuming user is attached to request via auth middleware

    // Validate input
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Comment content is required' });
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        authorId: userId,
        postId: postId
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            coverImage: true,

          }
        },
        likes: true,
        replies: {
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
                coverImage: true,

              }
            },
            likes: true
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    return res.status(201).json({
      success: true,
      comment
    });
  } catch (error) {
    console.error('Create comment error:', error);
    return res.status(500).json({ error: 'Failed to create comment' });
  }
};

// GET /api/posts/:postId/comments
// Get all comments for a post
export const getComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user.id;

    const skip = (Number(page) - 1) * Number(limit);

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Get comments with pagination
    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: { postId },
        include: {
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profileImage: true,
              coverImage: true,

            }
          },
          likes: {
            include: {
              user: {
                select: {
                  id: true
                }
              }
            }
          },
          replies: {
            include: {
              author: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  profileImage: true,
                  coverImage: true,

                }
              },
              likes: {
                include: {
                  user: {
                    select: {
                      id: true
                    }
                  }
                }
              }
            },
            orderBy: { createdAt: 'asc' }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: Number(limit)
      }),
      prisma.comment.count({ where: { postId } })
    ]);

    // Add isLikedByMe flag
    const commentsWithLikeStatus = comments.map(comment => ({
      ...comment,
      likesCount: comment.likes.length,
      isLikedByMe: comment.likes.some(like => like.userId === userId),
      replies: comment.replies.map(reply => ({
        ...reply,
        likesCount: reply.likes.length,
        isLikedByMe: reply.likes.some(like => like.userId === userId)
      }))
    }));

    return res.status(200).json({
      success: true,
      comments: commentsWithLikeStatus,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get comments error:', error);
    return res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// PUT /api/comments/:commentId
// Update a comment
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Comment content is required' });
    }

    // Check if comment exists and user is the author
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.authorId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to update this comment' });
    }

    // Update comment
    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content: content.trim() },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            coverImage: true,

          }
        },
        likes: true,
        replies: {
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
                coverImage: true,

              }
            },
            likes: true
          }
        }
      }
    });

    return res.status(200).json({
      success: true,
      comment: updatedComment
    });
  } catch (error) {
    console.error('Update comment error:', error);
    return res.status(500).json({ error: 'Failed to update comment' });
  }
};

// DELETE /api/comments/:commentId
// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    // Check if comment exists and user is the author
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.authorId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this comment' });
    }

    // Delete comment (cascades to replies and likes)
    await prisma.comment.delete({
      where: { id: commentId }
    });

    return res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    return res.status(500).json({ error: 'Failed to delete comment' });
  }
};

// ============================================
// REPLY ENDPOINTS
// ============================================

// POST /api/comments/:commentId/replies
// Create a reply to a comment
export const createReply = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Reply content is required' });
    }

    // Check if comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Create reply
    const reply = await prisma.reply.create({
      data: {
        content: content.trim(),
        authorId: userId,
        commentId: commentId
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            coverImage: true,

          }
        },
        likes: true
      }
    });

    return res.status(201).json({
      success: true,
      reply
    });
  } catch (error) {
    console.error('Create reply error:', error);
    return res.status(500).json({ error: 'Failed to create reply' });
  }
};

// GET /api/comments/:commentId/replies
// Get all replies for a comment
export const getReplies = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;

    // Check if comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Get replies
    const replies = await prisma.reply.findMany({
      where: { commentId },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            coverImage: true,

          }
        },
        likes: true
      },
      orderBy: { createdAt: 'asc' }
    });

    return res.status(200).json({
      success: true,
      replies
    });
  } catch (error) {
    console.error('Get replies error:', error);
    return res.status(500).json({ error: 'Failed to fetch replies' });
  }
};

// PUT /api/replies/:replyId
// Update a reply
export const updateReply = async (req: Request, res: Response) => {
  try {
    const { replyId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Reply content is required' });
    }

    // Check if reply exists and user is the author
    const reply = await prisma.reply.findUnique({
      where: { id: replyId }
    });

    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }

    if (reply.authorId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to update this reply' });
    }

    // Update reply
    const updatedReply = await prisma.reply.update({
      where: { id: replyId },
      data: { content: content.trim() },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            coverImage: true,

          }
        },
        likes: true
      }
    });

    return res.status(200).json({
      success: true,
      reply: updatedReply
    });
  } catch (error) {
    console.error('Update reply error:', error);
    return res.status(500).json({ error: 'Failed to update reply' });
  }
};

// DELETE /api/replies/:replyId
// Delete a reply
export const deleteReply = async (req: Request, res: Response) => {
  try {
    const { replyId } = req.params;
    const userId = req.user.id;

    // Check if reply exists and user is the author
    const reply = await prisma.reply.findUnique({
      where: { id: replyId }
    });

    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }

    if (reply.authorId !== userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this reply' });
    }

    // Delete reply
    await prisma.reply.delete({
      where: { id: replyId }
    });

    return res.status(200).json({
      success: true,
      message: 'Reply deleted successfully'
    });
  } catch (error) {
    console.error('Delete reply error:', error);
    return res.status(500).json({ error: 'Failed to delete reply' });
  }
};

// ============================================
// LIKE ENDPOINTS (for comments and replies)
// ============================================

// POST /api/comments/:commentId/like
// Toggle like on a comment
export const toggleCommentLike = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    // Check if comment exists
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Check if user already liked the comment
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        commentId
      }
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id }
      });

      return res.status(200).json({
        success: true,
        liked: false,
        message: 'Comment unliked'
      });
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId,
          commentId
        }
      });

      return res.status(200).json({
        success: true,
        liked: true,
        message: 'Comment liked'
      });
    }
  } catch (error) {
    console.error('Toggle comment like error:', error);
    return res.status(500).json({ error: 'Failed to toggle like' });
  }
};

// POST /api/replies/:replyId/like
// Toggle like on a reply
export const toggleReplyLike = async (req: Request, res: Response) => {
  try {
    const { replyId } = req.params;
    const userId = req.user.id;

    // Check if reply exists
    const reply = await prisma.reply.findUnique({
      where: { id: replyId }
    });

    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }

    // Check if user already liked the reply
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        replyId
      }
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id }
      });

      return res.status(200).json({
        success: true,
        liked: false,
        message: 'Reply unliked'
      });
    } else {
      // Like
      await prisma.like.create({
        data: {
          userId,
          replyId
        }
      });

      return res.status(200).json({
        success: true,
        liked: true,
        message: 'Reply liked'
      });
    }
  } catch (error) {
    console.error('Toggle reply like error:', error);
    return res.status(500).json({ error: 'Failed to toggle like' });
  }
};


export const toggleLike = async (req: Request, res: Response): Promise<void> => {

  try {
    const userId = req.user?.id;
    const { postId, commentId, replyId } = req.body;

    if (!userId) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    // Validate only one target at a time
    const countSelected = [postId, commentId, replyId].filter(Boolean).length;
    if (countSelected !== 1) {
      res.status(400).json({ success: false, message: "Provide exactly one target: postId, commentId, or replyId" });
      return;
    }

    // Check existing like
    const existing = await prisma.like.findFirst({
      where: {
        userId,
        postId: postId || undefined,
        commentId: commentId || undefined,
        replyId: replyId || undefined
      }
    });

    // UNLIKE
    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
      res.status(200).json({
        success: true,
        liked: false,
        message: "Like removed"
      });
      return;
    }

    // LIKE
    await prisma.like.create({
      data: {
        userId,
        postId: postId || undefined,
        commentId: commentId || undefined,
        replyId: replyId || undefined
      }
    });

    res.status(200).json({
      success: true,
      liked: true,
      message: "Liked successfully"
    });

  } catch (error: any) {
    const status = error.status || 500;

    res.status(status).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getPostLikes = async (req: Request, res: Response): Promise<void> => {

  try {
    const { postId } = req.params;

    if (!postId) {
      res.status(400).json({ success: false, message: "postId is required" });
      return;
    }

    const likes = await prisma.like.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            coverImage: true,

          }
        }
      }
    });

    res.status(200).json({
      success: true,
      total: likes.length,
      users: likes.map(like => like.user)
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch post likes"
    });
  }
};

export const getPostComments = async (req: Request, res: Response): Promise<void> => {

  try {
    const { postId } = req.params;

    if (!postId) {
      res.status(400).json({ success: false, message: "postId is required" });
      return;
    }

    // Fetch top-level comments
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
coverImage: true,

          },
        },
        replies: {
          orderBy: { createdAt: "asc" },
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
coverImage: true,

              },
            },
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      totalComments: comments.length,
      comments,
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
    });
  }
};
