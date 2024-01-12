import { categorySlice } from '@/entities/category'
import { getChannels } from '@/entities/channel/api/channelApi'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { Button } from '@/shared/ui/button'
import clsx from 'clsx'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const ChannelPage = () => {
  const dispatch = useAppDispatch()
  const channels = useAppSelector((state) => state.channelSlice.channels.data)
  const navigate = useNavigate()
  const hasNext = useAppSelector((state) => state.channelSlice.channels.next)
  const loading = useAppSelector((state) => state.channelSlice.channels.loading)
  const nextPage = useAppSelector((state) => state.channelSlice.channels.nextPage)


  const loadMore = () => dispatch(getChannels(nextPage))

  React.useEffect(() => {
    if (channels.length === 0) {
      loadMore()
    }
  }, [])

  return (
    <div className='bg-secondary rounded-md p-4'>
      <div className="p-4">
        <Button
          onClick={() => navigate("/channel/create")}
          className="ml-auto block"
          title="Add Channel"
        />
      </div>
      <div className='grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
        {channels?.map((channel) => {
          return (
            <Link
              to={`/channel/single/${channel.id}`}
              key={channel?.id}
              className={clsx("bg-background rounded-md p-4 flex flex-col",)}
            >
              <img
                className="aspect-square flex-1 object-fit object-cover w-full rounded-md"
                src={channel?.avatar}
                alt=""
              />
              <div className="mt-2">
                <hr className="w-full h-[1px] outline-none border-none bg-primary/20 my-2" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-2">
                    <p>{channel?.name}</p>
                  </div>
                </div>
              </div>
            </Link>
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
