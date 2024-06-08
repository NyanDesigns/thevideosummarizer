// app/api/youtube.ts

import { Response } from 'next/server';
import ytdl from 'ytdl-core';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get('videoUrl');

  if (!videoUrl) {
    return new Response(JSON.stringify({ error: 'Missing video URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const thumbnailURL = info.videoDetails.thumbnail.thumbnails[0].url;
    return new Response(JSON.stringify({ thumbnailURL }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching YouTube thumbnail:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
