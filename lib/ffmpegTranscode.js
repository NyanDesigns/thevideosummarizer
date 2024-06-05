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
      // Extract frames every 1 second
      await ffmpeg.exec(["-i", "input.mp4", "-vf", "fps=1", "frame_%04d.png"]);

      // Collect the extracted frames into a list of URLs
      const frames = [];
      let index = 1;
      let fileName = `frame_${String(index).padStart(4, "0")}.png`;

      while (true) {
        try {
          const data = await ffmpeg.readFile(fileName);
          const blob = new Blob([data], { type: "image/png" });
          frames.push(URL.createObjectURL(blob));
          index++;
          fileName = `frame_${String(index).padStart(4, "0")}.png`;
        } catch (error) {
          // Exit the loop if the frame does not exist
          break;
        }
      }
      // Set the frame URLs in the global state
      setVideoURL(frames);
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