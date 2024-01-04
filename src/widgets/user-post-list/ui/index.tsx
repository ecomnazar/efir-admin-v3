import { getUserPosts } from '@/entities/post/api/postApi'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import React from 'react'
import { useParams } from 'react-router-dom'

// feature to do: onclick post open post modal

const UserPostList = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const posts = useAppSelector((state) => state.postSlice.userPosts.data)

    React.useEffect(() => {
        dispatch(getUserPosts(id!))
    }, [])

  return (
    <div className="bg-secondary basis-[66%] rounded-md p-4 grid grid-cols-3 gap-4">
      {posts?.map((post) => {
        return (
          <div key={post.id} className='h-[395px] bg-background rounded-md p-4'>
            <img className='aspect-square object-fit object-cover rounded-md' src={post.is_video ? post.thumbnail : post.images[0]} alt="" />
            <div className='mt-2'>
              <p className='text-[15px]'>Description: <span className='text-[13px]'>{post.description}</span></p>
              <p className='text-[15px]'>Likes: <span className='text-[13px]'>{post.likes}</span></p>
              <hr className="w-full h-[1px] outline-none border-none bg-primary/20 my-2" />
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-x-2'>
                  {post.user.avatar ? <img className='w-[35px] h-[35px] rounded-full object-cover object-center' src={post.user.avatar} alt="" /> : <div className='bg-secondary w-[40px] h-[40px] rounded-full'></div>}
                  <p>{post.user.username}</p>
                </div>
                <div className="flex flex-col items-end">
                    {/* <Link className='flex items-center gap-x-2' to={``}>
                      <p className='text-[14px]'>Edit</p>
                      <FiEdit size={15} />
                    </Link> */}
                    {/* <button className='flex items-center gap-x-2' onClick={() => {}}>
                      <p className='text-[14px]'>Delete</p>
                      <TbTrash size={17} />
                    </button> */}
                  </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UserPostList