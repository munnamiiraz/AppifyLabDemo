# Social Media Backend API Documentation

## Overview
This is a complete social media backend API built with Node.js, Express, TypeScript, Prisma, and PostgreSQL. It supports user authentication, posts with media uploads, comments, replies, and likes.

## Features
- User authentication (signup/signin)
- Post CRUD operations with image uploads
- Comments and replies system
- Like/unlike functionality for posts, comments, and replies
- File upload to Cloudinary
- JWT-based authentication
- PostgreSQL database with Prisma ORM

## Environment Variables
```
DATABASE_URL="your_postgresql_connection_string"
NODE_ENV=production
PORT=9000
CORS_ORIGIN="*"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
JWT_SECRET="your_jwt_secret"
HOST_URL="*"
```

## API Endpoints

### Authentication
- `POST /api/auth/sign-up` - Register a new user
- `POST /api/auth/sign-in` - Login user

### User
- `GET /api/user/get-profile` - Get current user profile (protected)
- `GET /api/user/get-posts` - Get all posts (protected)
- `POST /api/user/post` - Create a new post (protected, with file upload)
- `PUT /api/user/post` - Update a post (protected, with file upload)
- `DELETE /api/user/post` - Delete a post (protected)

### Posts
- `POST /api/posts/` - Create a new post (protected, with file upload)
- `GET /api/posts/` - Get all public posts (protected)
- `GET /api/posts/:postId` - Get a specific post (protected)
- `PUT /api/posts/:postId` - Update a post (protected, with file upload)
- `DELETE /api/posts/:postId` - Delete a post (protected)
- `POST /api/posts/:postId/like` - Toggle like on a post (protected)
- `GET /api/posts/likes/:postId` - Get all likes for a post (protected)
- `GET /api/posts/comments/:postId` - Get all comments for a post (protected)

### Comments
- `POST /api/posts/:postId/comments` - Create a comment on a post (protected)
- `GET /api/posts/:postId/comments` - Get comments for a post with pagination (protected)
- `PUT /api/posts/comments/:commentId` - Update a comment (protected)
- `DELETE /api/posts/comments/:commentId` - Delete a comment (protected)
- `POST /api/posts/comments/:commentId/like` - Toggle like on a comment (protected)

### Replies
- `POST /api/posts/comments/:commentId/replies` - Create a reply to a comment (protected)
- `GET /api/posts/comments/:commentId/replies` - Get replies for a comment (protected)
- `PUT /api/posts/replies/:replyId` - Update a reply (protected)
- `DELETE /api/posts/replies/:replyId` - Delete a reply (protected)
- `POST /api/posts/replies/:replyId/like` - Toggle like on a reply (protected)

### Generic Like Endpoint
- `POST /api/posts/:postId/react` - Generic like/unlike endpoint (protected)

## Request/Response Examples

### User Registration
```json
POST /api/auth/sign-up
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### User Login
```json
POST /api/auth/sign-in
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Post
```json
POST /api/posts/
Content-Type: multipart/form-data
Authorization: Bearer <token>

{
  "content": "This is my post content",
  "isPrivate": false,
  "files": [image files] // up to 4 images
}
```

### Create Comment
```json
POST /api/posts/:postId/comments
Authorization: Bearer <token>

{
  "content": "This is a comment"
}
```

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## File Upload
- Maximum 4 images per post
- Supported formats: JPEG, PNG, GIF
- Maximum file size: 5MB per file
- Files are uploaded to Cloudinary

## Database Schema
The application uses the following main models:
- User (id, firstName, lastName, email, password, image, createdAt)
- Post (id, authorId, content, isPrivate, createdAt, updatedAt)
- PostMedia (id, postId, url, type)
- Comment (id, postId, authorId, content, likesCount, createdAt)
- Reply (id, commentId, authorId, content, likesCount, createdAt)
- Like (id, userId, postId?, commentId?, replyId?, createdAt)

## Running the Application

### Development
```bash
npm install
npm run dev
```

### Production
```bash
npm install
npm run build
npm start
```

### Database Setup
```bash
npx prisma migrate deploy
npx prisma generate
```

## Error Handling
The API returns consistent error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## Success Responses
Success responses follow this format:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```