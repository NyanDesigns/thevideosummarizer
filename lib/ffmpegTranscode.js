// /lib/transcode.js
import { fetchFile } from "@ffmpeg/util";

const transcode = async (
  ffmpegRef,
  video,
  setProcessing,
  setVideoURL,
  videoURL,
  messageRef,
) => {
  const ffmpeg = ffmpegRef.current;
  setProcessing(true);
  if (video) {
    try {
      await ffmpeg.writeFile("input.mp4", await fetchFile(video));
      await ffmpeg.exec(["-i", "input.mp4", "output.gif"]);
      const data = await ffmpeg.readFile("output.gif");

      const blob = new Blob([data], { type: "image/gif" });
      setVideoURL(URL.createObjectURL(blob));
    } catch (error) {
      console.error("The following error occurred while transcoding: ", error);
    } finally {
      setProcessing(false);
      if (videoURL) {
        URL.revokeObjectURL(videoURL);
      }
      // Clear the messageRef after processing is complete
      if (messageRef.current) {
        messageRef.current.innerHTML = "";
      }
    }
  }
};
export default transcode;