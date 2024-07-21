import type { Song } from '@/lib/data'
import { usePlayerStore } from '@/store/playerStore'
import { PauseIcon, PlayIcon } from "./Player"

interface Props {
  song: Song
  n: number
}

function PlaylistSongPlayButton({ song, n }: Props) {
  const { currentMusic, isPlaying, setCurrentMusic, setIsPlaying } = usePlayerStore(state => state)

  const handlePlay = async () => {
    const isThisCurrentSong = currentMusic.song.id === song.id && currentMusic.song.albumId === song.albumId
    if (isThisCurrentSong) {
      setIsPlaying(!isPlaying)
      return
    }

    setCurrentMusic({
      ...currentMusic,
      song
    })
    setIsPlaying(true)
  }

  const isThisCurrentSong = currentMusic.song.id === song.id && currentMusic.song.albumId === song.albumId

  return (

    <div className="text-center grid place-items-center">
      <div className="block group-hover:hidden">
        {(isPlaying && isThisCurrentSong) ? (
          <img
            className="w-5 aspect-square"
            src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif"
            alt=""
          />
        ) : (
          <span>{n}</span>
        )}
      </div>
      <div className="hidden group-hover:grid text-sm place-items-center">
        <button onClick={handlePlay} className="relative w-[30px] aspect-square grid place-items-center hover:brightness-125 hover:shadow-md transition-all duration-500">
          {
            isThisCurrentSong
              ? <PauseIcon />
              : <PlayIcon />
          }
        </button>
      </div>
    </div>
  )
}

export default PlaylistSongPlayButton