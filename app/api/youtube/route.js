// app/api/youtube/route.js
import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!ytdl.validateURL(url)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const info = await ytdl.getInfo(url);
    const thumbnails = info.videoDetails.thumbnails;

    // Find the thumbnail closest to 360px
    const desiredThumbnail = thumbnails.find(
      (thumb) => thumb.width <= 360 && thumb.height <= 360,
    );

    // If no thumbnail is found with the desired resolution, use the lowest resolution
    const thumbnailUrl = desiredThumbnail
      ? desiredThumbnail.url
      : thumbnails[0].url;
    return NextResponse.json({ thumbnailUrl });
  } catch (error) {
    console.error("Error fetching YouTube video info:", error);
    return NextResponse.json(
      { error: "Failed to fetch video info" },
      { status: 500 },
    );
  }
}
