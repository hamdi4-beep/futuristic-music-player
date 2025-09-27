import * as React from 'react'
import {FaCirclePlay, FaCirclePause} from 'react-icons/fa6'
import songs from '../data.json'
import SongInfo from './SongInfo'

export const audio = new Audio()

const Player = React.memo(({
  songId
}) => {
  const [isSongPlaying, setIsSongPlaying] = React.useState(false)
  const item = songs.byId[songId]

  if (!item) return

  React.useEffect(() => {
    const pauseEventHandler = () => void setIsSongPlaying(false)
    const playEventHandler = () => void setIsSongPlaying(true)

    audio.addEventListener('play', playEventHandler)
    audio.addEventListener('pause', pauseEventHandler)

    return () => {
      audio.removeEventListener('play', playEventHandler)
      audio.removeEventListener('pause', pauseEventHandler)
    }
  }, [])

  React.useEffect(() => {
    audio.src = `/songs/${item.filename}`
    if (audio.paused) setIsSongPlaying(false)
  }, [songId])

  const style = {
    animationPlayState: isSongPlaying ? 'running' : 'paused'
  }

  const handlePlayClick = () => {
    if (audio.currentTime === audio.duration) audio.load()
    audio.play()
  }

  const handlePauseClick = () => void audio.pause()

  return (
    <div className="player">
      <div className='header' style={style}></div>

      <div className="content">
        <SongInfo songId={item.id} />

        <div className="control">
          {!isSongPlaying ? (
            <FaCirclePlay size={50} onClick={handlePlayClick} />
          ) : (
            <FaCirclePause size={50} onClick={handlePauseClick} />
          )}
        </div>
      </div>
    </div>
  )
})

export default Player