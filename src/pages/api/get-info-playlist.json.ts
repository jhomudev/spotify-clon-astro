import { allPlaylists, songs } from '@/lib/data.ts'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ request }) => {
  const query = new URL(request.url).searchParams
  const playlistId = query.get('id')
  const playlist = allPlaylists.find((playlist) => playlist.id === playlistId)
  const playlistSongs = songs.filter((song) => song.albumId === playlist?.albumId)

  return new Response(JSON.stringify({
    playlist,
    songs: playlistSongs
  }), {
    status: 200,
  })
}