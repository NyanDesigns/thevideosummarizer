// /lib/transcode.js
import { fetchFile } from "@ffmpeg/util";

//F // Extract Video Length from Target Video
const extractVideoLength = async (videoFile) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(videoFile);
    video.addEventListener("loadedmetadata", () => {
      const duration = video.duration;
      resolve( duration );
    });
    video.addEventListener("error", (error) => {
      reject(error);
    });
  });
};

//F // Process Video with FFMPEG
const transcode = async (
  ffmpegRef,
  video,
  setProcessing,
  setVideoURL,
  videoURL,
  messageRef,
  interval
) => {
  const ffmpeg = ffmpegRef.current;
  if (video) {
    try {
      // Disable Process Button
      setProcessing(true);

      // CLEAR PREV FRAMES //
      // If it's not null, clear the videoURL array
      if (videoURL) {
        console.log("videoURL exists");
        // Delete previous frames
        videoURL.forEach((url) => URL.revokeObjectURL(url));
        videoURL.length = 0;
        console.log("Previous Frames cleared:", videoURL);
      } else {
        // If it's null, move on
        console.log("videoURL does not exist");
      }

      // CALCULATE FRAME COUNT //
      const frameRate = 1 / interval;
      const videoLength = await extractVideoLength(video);
      console.log("extractVideoLength", videoLength);
      const framesCount = Math.floor(videoLength * frameRate);
      console.log("framesCount", framesCount);
      
      // FFMPEG // writeFile
      await ffmpeg.writeFile("input.mp4", await fetchFile(video));
      // FFMPEG // Extract Frames every [frameRate] second
      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-vf",
        `fps=${frameRate}`,
        "frame_%04d.png",
      ]);

      // SET FRAMES //
      const frames = [];
      let index = 1;
      let fileName = `frame_${String(index).padStart(4, "0")}.png`;

      while (index <= framesCount) {
        try {
          const data = await ffmpeg.readFile(fileName);
          const blob = new Blob([data], { type: "image/png" });
          const url = URL.createObjectURL(blob);
          frames.push(url);
          index++;
          fileName = `frame_${String(index).padStart(4, "0")}.png`;
        } catch (error) {
          console.log(error);
          break;
        }
      }
      console.log("Current frames Added:", frames);

      // Set the frame URLs in the global state
      setVideoURL(frames);
    } catch (error) {
      console.error("The following error occurred while transcoding: ", error);
    } finally {
      setProcessing(false);
      // Clear the messageRef after processing is complete
      if (messageRef.current) {
        messageRef.current.innerHTML = "";
      }
    }
  }
};
export default transcode;

//Backup