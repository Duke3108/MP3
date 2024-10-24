import React from 'react'
import { useState, useEffect } from 'react'
import icons from '../ultis/icons'
import SongItem from './SongItem'
import { useSelector } from 'react-redux'
import { apiGetDetailPlaylist } from '../apis'
import { Scrollbars } from 'react-custom-scrollbars-2'

const SidebarRight = () => {

  const [isRecent, setIsRecent] = useState(false)
  const [playlist, setPlaylist] = useState()
  const {ImBin} = icons
  const { curSongData, curPlaylistId, isPlaying, recentSongs, curSongId} = useSelector(state => state.music)

  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetailPlaylist(curPlaylistId)
    if(response.data?.err === 0) setPlaylist(response.data.data?.song?.items)
  }

  useEffect(() => {
    curPlaylistId && fetchDetailPlaylist()
  }, [])

  useEffect(() => {
    isPlaying && setIsRecent(false)
  }, [isPlaying, curSongId])

  useEffect(() => {
    if(curPlaylistId && isPlaying) fetchDetailPlaylist()
  }, [curPlaylistId,isPlaying])

  return (
    <div className='flex flex-col text-xs w-full h-full'>
      <div className='h-[70px] w-full flex-none py-[14px] px-2 gap-8 flex justify-between items-center'>
        <div className=' h-[50px] flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer'>
          <span
            className={`${!isRecent && 'bg-main-100'} flex-1 flex justify-center items-center rounded-l-full rounded-r-full`}
            onClick={() => setIsRecent(prev => !prev)}
          >
            Danh sách phát
          </span>
          <span
            className={`${isRecent && 'bg-main-100'} flex-1 flex justify-center items-center rounded-l-full rounded-r-full`}
            onClick={() => setIsRecent(prev => !prev)}
          >
            Nghe gần đây
          </span>
        </div>
        <span className='p-2 rounded-full cursor-pointer hover:bg-main-100'><ImBin size={14}/></span>
      </div>
     
      {isRecent 
      ? <div className='w-full flex flex-col flex-auto px-2'> 
        <Scrollbars autoHide style={{width: '100%', height: '100%'}}>
          {recentSongs && <div className='flex flex-col'>{recentSongs?.map(item => (
              <SongItem
                key={item.sid}
                thumbnail={item?.thumbnail}
                title={item?.title}
                artists={item?.artists}
                sid={item?.sid}
                size='w-[40px] h-[40px]'
              />
            ))}</div>}
        </Scrollbars>
      </div> 
      : <div className='w-full flex flex-col flex-auto px-2'>
      <Scrollbars autoHide style={{width: '100%', height: '100%'}}>
        {curSongId &&<SongItem
          thumbnail={curSongData?.thumbnail}
          title={curSongData?.title}
          artists={curSongData?.artistsNames}
          sid={curSongData?.encodeId}
          size='w-[40px] h-[40px]'
          style='bg-main-500 text-white'
        />}
        <div className='flex flex-col text-black pt-[15px] px-2 pb-[5px]'>
          <span className='text-sm font-bold'>Tiếp theo</span>
          <span className='opacity-70 text-xs flex gap-1'>
            <span>Từ playlist</span>
            <span className='font-semibold text-main-500'>{curSongData?.album?.title.length > 35 ? `${curSongData?.album?.title.slice(0,35)}...` : curSongData?.album?.title}</span>
          </span>
        </div>
        {playlist && <div className='flex flex-col'>{playlist?.map(item => (
          <SongItem
            key={item.encodeId}
            thumbnail={item?.thumbnail}
            title={item?.title}
            artists={item?.artistsNames}
            sid={item?.encodeId}
            size='w-[40px] h-[40px]'
          />
        ))}</div>}
        </Scrollbars>
      </div>}
      <div className='w-full h-[90px]'></div>
      
    </div>
  )
}

export default SidebarRight