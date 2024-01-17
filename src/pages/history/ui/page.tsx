import React from 'react'
import { getHistories } from '@/entities/history/api/historyApi'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { Button } from '@/shared/ui/button'
import { HistoryCard } from '@/entities/history'

export const HistoryPage = () => {
  const dispatch = useAppDispatch()
  const histories = useAppSelector((state) => state.historySlice.histories.data)
  const loading = useAppSelector((state) => state.historySlice.histories.loading)
  const hasNext = useAppSelector((state) => state.historySlice.histories.next)
  const nextPage = useAppSelector((state) => state.historySlice.histories.nextPage)

  const loadMore = () => dispatch(getHistories(nextPage))

  React.useEffect(() => {
    if (histories.length === 0) loadMore()
  }, [])

  return (

    <div className='bg-secondary rounded-md p-4'>
      <div className='grid grid-cols-4 gap-4'>
        {histories?.map((history) => {
          return (
            <HistoryCard key={history.id} history={history} />
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
