import { GHistory } from '@/entities/channel/model/interfaces'
import { Link } from 'react-router-dom'

interface Props {
    history: GHistory;
}

export const HistoryCard = ({ history }: Props) => {
    return (
        <Link to={`/history/single/${history.id}`} key={history.id} className='aspect-[9/16] bg-primary'>
            {history.type === 'video' ?
                <video className='' src={history.video} controls /> :
                <img className='w-full h-full object-cover object-center' src={history.image} alt="" />}
        </Link>
    )
}
