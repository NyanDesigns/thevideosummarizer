//react
import { useEffect, useState } from "react";
//jotaiLib
import { useAtom, useAtomValue } from "jotai";
//icons
import { FaPowerOff } from "react-icons/fa";
//customAtoms
import { titleHiddenAtom, videoAtom } from "../../lib/atom";

export function TitleBlock() {
  //useState
  const [isTitleExiting, setTitleExiting] = useState(false);
  //useAtom
  const [hidden, setHidden] = useAtom(titleHiddenAtom);
  //useAtomValue
  const video = useAtomValue(videoAtom);

  //useEffect
  //Effect //video
  useEffect(() => {
    if (video) {
      setTitleExiting(true);
      setTimeout(() => {
        setHidden(true);
      }, 300);
    }
  }, [video]);

  return (
    <div
      className={`${
        hidden ? "hidden" : isTitleExiting ? "animate-slideUpAndFade" : "block"
      } transition-all duration-500 ease-in-out`}
    >
      <div className="space-y-4 sm:space-y-6">
        {/* heading */}
        <h1 className="text-4xl font-bold text-center text-white sm:text-5xl sm:leading-tight">
          Study Any Video,
          <br className="mt-2 max-sm:hidden" />
          <span className="text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text">
            Visually & Audibly,
          </span>
          <br className="mt-2 max-sm:hidden" />
          w/ Artificial Intelligence
        </h1>
        {/* bubbleTag */}
        <div className="flex flex-col items-center w-full">
          {/* bubble */}
          <div className="flex w-fit flex-row items-center gap-2 rounded-[20px] border border-yellow-500 px-2 py-1 text-[10px] text-yellow-500 ">
            <FaPowerOff />
            Powered by GPT-4o
          </div>
        </div>
        {/* subHeading */}
        <p className="pb-4 text-center text-slate-400 sm:pb-8">
          Transcribe . Translate . Chat . Summarize
        </p>
      </div>
    </div>
  );
}
