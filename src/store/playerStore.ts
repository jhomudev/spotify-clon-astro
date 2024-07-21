import { allPlaylists, songs, type Playlist, type Song } from "@/lib/data";
import { create } from "zustand";
export interface CurrentMusic {
  playlist: Playlist
  song: Song
  songs: Song[]
}

interface Store {
  isPlaying: boolean
  currentMusic: CurrentMusic
  volume: number
  isMuted: boolean
  setIsMuted: (isMuted: boolean) => void
  setVolume: (volume: number) => void
  setIsPlaying: (isPlaying: boolean) => void
  setCurrentMusic: (currentMusic: CurrentMusic) => void
}

const defaultCurrentMusic: CurrentMusic = {
  playlist: allPlaylists[0],
  song: songs.filter((song) => song.albumId === allPlaylists[0].albumId)[0],
  songs: [],
}

export const usePlayerStore = create<Store>((set) => ({
  isPlaying: false,
  currentMusic: defaultCurrentMusic,
  volume: 0.5,
  isMuted: false,
  setIsMuted: (isMuted: boolean) => set({ isMuted }),
  setVolume: (volume: number) => set({ volume }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setCurrentMusic: (currentMusic: any) => set({ currentMusic }),
}))