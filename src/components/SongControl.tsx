import React, { useEffect, useState } from 'react'
import { PauseIcon, PlayIcon } from './Player'
import { usePlayerStore } from '@/store/playerStore'
import { Slider } from './Slider'

type Props = {
  audioRef: React.RefObject<HTMLAudioElement>
}

function SongControl({ audioRef }: Props) {
  const { isPlaying, setIsPlaying } = usePlayerStore((state) => state)
  const [currentTime, setCurrentTime] = useState(0)

  const handleClickPlayer = () => {
    setIsPlaying(!isPlaying)
  }

  const handleChangeTime = () => {
    setCurrentTime(audioRef.current?.currentTime || 0)
    // if (audioRef.current) {
    //   audioRef.current.currentTime = currentTime
    // }
  }

  const formatTime = (time: number) => {
    if (time == null) return `0:00`
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleChangeTime)
    }
    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleChangeTime)
    }
  }, [currentTime, audioRef])

  return (
    <div className='flex flex-col items-center gap-2'>
      <button
        onClick={handleClickPlayer}
        className='w-9 aspect-square grid place-items-center bg-white text-zinc-900 rounded-full'
      >
        {
          isPlaying ? <PauseIcon /> : <PlayIcon />
        }
      </button>
      <div className='flex gap-2 items-center w-[max(100%,400px)]'>
        <span className='text-xs'>
          {formatTime(currentTime)}
        </span>
        <Slider
          min={0}
          max={audioRef.current?.duration || 0}
          value={[currentTime]}
          onValueChange={(value) => {
            const [time] = value
            if (audioRef.current) {
              audioRef.current.currentTime = time
            }
          }}
        />
        <span className='text-xs'>
          {
            audioRef.current?.duration &&
            formatTime(audioRef.current.duration)
          }
        </span>
      </div>
    </div>
  )
}

export default SongControl