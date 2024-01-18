import React from 'react'
import { PostCard } from '@/entities/post'
import { getPosts } from '@/entities/post/api/postApi'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { LoadMoreButton } from '@/shared/ui/button'

export const PostPage = () => {

    const dispatch = useAppDispatch()
    const posts = useAppSelector((state) => state.postSlice.posts.data)
    const hasPrev = useAppSelector((state) => state.postSlice.posts.prev)
    const hasNext = useAppSelector((state) => state.postSlice.posts.next)
    const loading = useAppSelector((state) => state.postSlice.posts.loading)
    const nextPage = useAppSelector((state) => state.postSlice.posts.nextPage)

    const loadMore = () => dispatch(getPosts(nextPage))

    React.useEffect(() => {
        if (!hasPrev) {
            loadMore()
        }
    }, [])

    return (
        <div className='bg-secondary rounded-md p-4'>
            <div className='grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
                {posts?.map((post) => {
                    return (
                        <PostCard key={post.id} post={post} className='' />
                    )
                })}
            </div>
            <LoadMoreButton hasNext={hasNext} loading={loading} loadMore={loadMore} />
        </div>
    )
}
