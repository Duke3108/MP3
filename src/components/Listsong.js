import React, {memo} from 'react'
import SongList from './SongList'
import icons from '../ultis/icons'
import moment from 'moment'
import { useSelector } from 'react-redux'

const {BsDot} =icons

const Listsong = ({totalDuration, isHideNoteIcon}) => {

  const { songs } = useSelector(state => state.music)

  return (
    <div className='w-full flex flex-col text-xs text-gray-600'>
         {totalDuration &&<div className='flex justify-between items-center p-[10px] font-semibold'>
            <span>BÀI HÁT</span>
            <span>ALBUM</span>
            <span>THỜI GIAN</span>
        </div>}
        <div className='flex flex-col'>
            {songs?.map(item => (
                <SongList key={item.encodeId} songData={item} isHideNodeIcon={isHideNoteIcon}/>
            ))}
        </div>
        {totalDuration && <span className='flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]'>
            <span>{`${songs?.length} bài hát`}</span>
            <BsDot size={24}/>
            <span>{moment.utc(totalDuration * 1000).format('HH:mm:ss')}</span> 
        </span>}
        
    </div>
  )
}

export default memo(Listsong)