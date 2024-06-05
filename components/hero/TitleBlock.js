//icons
import { FaPowerOff } from "react-icons/fa";

export function TitleBlock() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* heading */}
      <h1 className="text-4xl font-bold text-center text-white sm:text-5xl sm:leading-tight">
        Summarize Any Video,
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
        Cut through the noise and get to the point. Let our AI-powered tool
        summarize videos for you, delivering the key highlights in a fraction of
        the time.
      </p>
    </div>
  );
}
