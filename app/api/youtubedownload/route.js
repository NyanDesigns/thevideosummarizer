// app/api/youtube/route.js
import { NextResponse } from "next/server";
import ytdl, { getInfo } from "ytdl-core";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!ytdl.validateURL(url)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const info = await getInfo(url);
    const formats = info.formats;

    // Find the video format closest to 360p resolution
    const desiredVideoFormat = formats.find(
      (format) =>
        format.container === "mp4" &&
        format.hasVideo &&
        format.width <= 360 &&
        format.height <= 360,
    );

    // If no video format is found with the desired resolution, use the lowest video resolution
    const videoFormat =
      desiredVideoFormat || formats.filter((format) => format.hasVideo)[0];

    // Find the audio format
    const audioFormat = formats.find((format) => format.hasAudio);

    const videoStream = ytdl(url, { format: videoFormat });
    const audioStream = ytdl(url, { format: audioFormat });

    const videoBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      videoStream.on("data", (chunk) => chunks.push(chunk));
      videoStream.on("end", () => resolve(Buffer.concat(chunks)));
      videoStream.on("error", reject);
    });

    const audioBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      audioStream.on("data", (chunk) => chunks.push(chunk));
      audioStream.on("end", () => resolve(Buffer.concat(chunks)));
      audioStream.on("error", reject);
    });

    const videoBlob = new Blob([videoBuffer], { type: "video/mp4" });
    const audioBlob = new Blob([audioBuffer], { type: "audio/mp3" });

    return NextResponse.json({
      videoFile: videoBlob,
      audioFile: audioBlob,
    });
  } catch (error) {
    console.error("Error fetching YouTube video info:", error);
    return NextResponse.json(
      { error: "Failed to fetch video info" },
      { status: 500 },
    );
  }
}
