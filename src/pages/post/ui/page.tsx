import { getPosts } from '@/entities/post/api/postApi'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import React from 'react'

export const PostPage = () => {
  
  const dispatch = useAppDispatch()
  const posts = useAppSelector((state) => state.postSlice.posts.data)

  React.useEffect(() => {
    dispatch(getPosts(1))
  }, [])

  return (
    <div>PostPage</div>
  )
}
