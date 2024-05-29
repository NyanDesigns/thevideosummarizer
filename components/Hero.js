import { FaPowerOff } from "react-icons/fa";

export function Hero() {
  return (
    //heroSection
    <div className="flex flex-col h-full max-w-4xl px-6 mt-24">
      {/* hearoWarper */}
      <div className="space-y-6">
        {/* heading */}
        <h1 className="text-4xl font-bold text-center text-white sm:text-6xl sm:leading-tight">
          Summarize Any Video,
          <br className="mt-2 max-md:hidden" />
          <span className="text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text">
            Visually & Audibly,
          </span>
          <br className="mt-2 max-md:hidden" />
          w/ Artificial Intelligence
        </h1>

        {/* bubbleTag */}
        <div className="flex flex-col items-center w-full">
          {/* bubble */}
          <div className="flex w-fit flex-row items-center text-[10px] gap-2 rounded-[20px] border border-yellow-500 px-2 py-1 text-yellow-500 ">
            <FaPowerOff />
            Powered by GPT-4o
          </div>
        </div>

        {/* subHeading */}
        <p className="text-center text-slate-400">
          Cut through the noise and get to the point. Let our AI-powered tool
          summarize videos for you, delivering the key highlights in a fraction
          of the time.
        </p>

        {/* inputForm */}
        <p className="text-center text-white">SEARCH BAR</p>
      </div>
    </div>
  );
}
