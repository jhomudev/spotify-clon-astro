import { usePlayerStore } from '@/store/playerStore'
import React, { useEffect } from 'react'
import { VolumeIcon, VolumeMutedIcon } from './Player'
import { Slider } from './Slider'

interface Props {
  audioRef: React.RefObject<HTMLAudioElement>
}

function VolumeControl({ audioRef }: Props) {
  const { volume, setVolume, isMuted, setIsMuted } = usePlayerStore((state) => state)

  const handleClickMuted = () => {
    setIsMuted(!isMuted)
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [isMuted, volume])

  return (
    <>
      <button
        onClick={handleClickMuted}
        className='text-sm hover:text-green-400'
      >
        {
          !isMuted && volume > 0
            ? <VolumeIcon />
            : <VolumeMutedIcon />
        }
      </button>
      <Slider
        // defaultValue={[volume * 100]}
        max={100}
        min={0}
        value={[isMuted ? 0 : volume * 100]}
        className='!w-[95px]'
        onValueChange={(value) => {
          const [volume] = value
          setVolume(volume / 100)
        }}
      />
    </>
  )
}

export default VolumeControl