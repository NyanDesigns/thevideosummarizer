//jotaiLib
import { useAtomValue } from "jotai";
//customAtoms
import { videoAtom } from "./atom";

export function VideoPreviewComponent() {
  //useAtomValue
  const video = useAtomValue(videoAtom);

  if (!video) return null;

  //RenderFrontEnd
  return (
    <video
      controls
      className="block w-full rounded-md"
      src={URL.createObjectURL(video)}
    ></video>
  );
}
