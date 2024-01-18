import React from 'react'
import { Button } from '..'
import clsx from 'clsx';

interface Props {
    hasNext: boolean;
    loading: boolean;
    loadMore: () => void;
    className?: string;
}

export const LoadMoreButton: React.FC<Props> = ({ hasNext, loadMore, loading, className }) => {
    return (
        hasNext ?
            <Button
                loading={loading}
                onClick={loadMore}
                className={clsx("mx-auto block mt-4", className)}
                title={'Load more'}
            />
            : <></>
    )
}
