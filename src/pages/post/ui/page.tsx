import { PostCard } from '@/entities/post'
import { getPosts } from '@/entities/post/api/postApi'
import { setPostsNextPage } from '@/entities/post/model/slice'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { Button } from '@/shared/ui/button'
import React from 'react'

// add: user profile data update


export const PostPage = () => {
  
  const dispatch = useAppDispatch()
  const posts = useAppSelector((state) => state.postSlice.posts.data)
  const hasPrev = useAppSelector((state) => state.postSlice.posts.prev)
  const hasNext = useAppSelector((state) => state.postSlice.posts.next)
  const loading = useAppSelector((state) => state.postSlice.posts.loading)
  const page = useAppSelector((state) => state.postSlice.posts.nextPage)

  const loadMore = () => {
    dispatch(getPosts(page))
    dispatch(setPostsNextPage())
  }

  React.useEffect(() => {
    if(!hasPrev){
      dispatch(getPosts(1))
    }
  }, [])

  return (
    <div className='bg-secondary rounded-md p-4'>
      <div className='grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>

      {posts?.map((post) => {
        return (
          <PostCard key={post.id} post={post} className='h-[320px]' />
          )
        })}
        </div>
        {hasNext && (
          <Button
            loading={loading}
            onClick={loadMore}
            className="mx-auto block mt-4"
            title={"Load more"}
          />
        )}
    </div>
  )
}
