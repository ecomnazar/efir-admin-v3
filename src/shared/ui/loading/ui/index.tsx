import { clsx } from 'clsx'
import { RotatingLines } from 'react-loader-spinner'

interface LoadingProps {
    className?: string
}

export const Loading = ({ className }: LoadingProps) => {
  return <div className={clsx('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', className)}><RotatingLines strokeColor='white' width='16' /></div>
}
