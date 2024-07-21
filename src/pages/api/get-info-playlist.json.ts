import {allPlaylists, songs} from '@/lib/data.ts'

export const GET = async ({ params, request }: {
  params: { id: string }
  request: Request
}) => { 
  const query = new URL(request.url).searchParams
  const playlistId = query.get('id')
  const playlist = allPlaylists.find((playlist) => playlist.id === playlistId)
  const playlistSongs = songs.filter((song) => song.albumId === playlist?.albumId)

  return new Response(JSON.stringify({
    playlist,
    songs: playlistSongs
  }), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}