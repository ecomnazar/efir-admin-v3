import { getHistories } from '@/entities/history/api/historyApi'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { Button } from '@/shared/ui/button'
import React from 'react'

export const HistoryPage = () => {
  const dispatch = useAppDispatch()
  const histories = useAppSelector((state) => state.historySlice.histories.data)
  const loading = useAppSelector((state) => state.historySlice.histories.loading)
  const hasNext = useAppSelector((state) => state.historySlice.histories.next)
  const nextPage = useAppSelector((state) => state.historySlice.histories.nextPage)


  const loadMore = () => {
    dispatch(getHistories(nextPage))
  }

  React.useEffect(() => {
    if (histories.length === 0) {
      dispatch(getHistories(nextPage))
    }
  }, [])

  return (

    <div className='bg-secondary rounded-md p-4'>
      <div className='grid grid-cols-4 gap-4'>
        {histories?.map((history) => {
          return (
            <div className='aspect-[9/16]' key={history.id}>
              <img className='w-full h-full object-cover object-center' src={history.image} alt="" />
            </div>
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
