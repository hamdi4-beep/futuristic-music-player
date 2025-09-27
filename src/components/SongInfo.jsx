import * as React from 'react'
import { audio } from './Player'
import { formatTime } from '../utils'
import songs from '../data.json'

const SongInfo = ({ songId }) => {
  const [duration, setDuration] = React.useState(0)
  const [currentTime, setCurrentTime] = React.useState(0)
  const item = songs.byId[songId]

  React.useEffect(() => {
    const loadedMetaDataHandler = () => {
      const duration = audio.duration
      setDuration(duration)
    }

    audio.addEventListener('loadedmetadata', loadedMetaDataHandler)

    return () =>
      audio.remove('loadedmetadata', loadedMetaDataHandler)
  }, [])

  React.useEffect(() => {
    const timerId = setInterval(() => void setCurrentTime(audio.currentTime), 0)
    return () => clearInterval(timerId)
  }, [songId])

  return (
    <div className="song-info">
      <p>{item.artist}</p>
      <p>{item.name}</p>
      <div className="bar-duration"></div>
      <p>{formatTime(currentTime)} / {formatTime(duration)}</p>
    </div>
  )
}

export default SongInfo