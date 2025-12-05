import { useGetPostsQuery } from '../../store/api/getPostApi'


import Post from './Post'

const Posts = () => {
  
  const { data, isLoading, error, refetch } = useGetPostsQuery()

  

  

  

  if (isLoading) {
    return <div>Loading posts...</div>
  }

  if (error) {
    return <div>Error loading posts. Please try again.</div>
  }

  const posts = data?.posts || []

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} refetch={refetch} />
      ))}
    </>
  )
}

export default Posts