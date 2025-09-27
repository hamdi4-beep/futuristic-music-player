import * as React from 'react'
import Player from './components/Player'
import SongsList from './components/SongsList'

const PlayerContainer = () => {
  const [currentSong, setCurrentSong] = React.useState(1)

  return (
    <div className="player-container">
      <SongsList updateCurrentSong={songId => setCurrentSong(songId)} />
      <Player songId={currentSong} />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <PlayerContainer />
    </div>
  )
}

export default App