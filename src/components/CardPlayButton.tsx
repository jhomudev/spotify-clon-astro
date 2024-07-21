import { usePlayerStore, type CurrentMusic } from '@/store/playerStore'
import { PauseIcon, PlayIcon } from "./Player"
import clsx from 'clsx'

interface Props {
  playlistId: string
  size?: 'sm' | 'lg'
}

function CardPlayButton({ playlistId, size = 'sm' }: Props) {
  const { currentMusic, isPlaying, setCurrentMusic, setIsPlaying } = usePlayerStore(state => state)

  const handlePlay = async () => {
    const res = await fetch(`${import.meta.env.PUBLIC_APP_URL}/api/get-info-playlist.json?id=${playlistId}`)
    const { playlist, songs } = await res.json() as Omit<CurrentMusic, 'song'>
    if (playlist) {
      const isThisCurrentPlaylist = currentMusic.playlist?.id === playlistId
      if (isThisCurrentPlaylist) {
        setIsPlaying(!isPlaying)
        return
      }

      setCurrentMusic({
        playlist,
        song: songs[0],
        songs,
      })
      setIsPlaying(true)
    }
  }

  const isPLayingThisPlaylist = isPlaying && currentMusic.playlist?.id === playlistId

  return (
    <button
      onClick={handlePlay}
      className={clsx(
        size === 'sm' ? "w-[50px] p-2" : "w-[70px] p-4",
        "card-play-button relative aspect-square bg-green-500 text-black rounded-full grid place-items-center hover:brightness-125 hover:shadow-md transition-all duration-500"
      )}>
      {
        isPLayingThisPlaylist
          ? <PauseIcon className={size === 'sm' ? "w-4 h-4" : "w-7 h-7"} />
          : <PlayIcon className={size === 'sm' ? "w-4 h-4" : "w-7 h-7"} />
      }
    </button>
  )
}

export default CardPlayButton