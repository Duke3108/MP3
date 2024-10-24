import React from 'react'
import { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const SongItem = ({ thumbnail, title, artists, releaseDate, sid, size, style }) => {

  const dispatch = useDispatch()
  return (
    <div 
      onClick={() => {
          dispatch(actions.setCurSongId(sid))
          dispatch(actions.play(true))
          dispatch(actions.setRecent({thumbnail,title,sid,artists}))
      }}
      className={`w-full flex p-[10px] gap-[10px] justify-between items-center rounded-md cursor-pointer ${style || 'text-black hover:bg-main-200'}`}
    >
      <div className='flex gap-4'>
        <img src={thumbnail} alt='thumbnail' className={`${size || 'w-[60px] h-[60px]'} object-cover rounded-md`}/>
          <div className='flex flex-col'>
              <span className='text-sm font-semibold'>{title?.length > 25 ? `${title.slice(0,25)}...` : title}</span>
              <span className='text-xs opacity-70'>{artists?.length > 30 ? `${title.slice(0,30)}...` : artists}</span>
              {releaseDate && <span className='text-xs opacity-70'>{moment(releaseDate*1000).fromNow()}</span>}    
          </div>
      </div>
    </div>
  )
}

export default memo(SongItem)