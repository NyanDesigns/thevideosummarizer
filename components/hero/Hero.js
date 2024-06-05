"use client";

//customComponents
import NoSSRWrapper from "../../lib/NoSSRWrapper";
import { TitleBlock } from "./TitleBlock";
import { VideoBlock } from "./VideoBlock";

export function Hero() {
  //RenderFrontEnd
  return (
    //heroSection
    <NoSSRWrapper>
      <div className="mb-10 mt-24 flex h-fit w-full flex-col px-6 sm:mt-28 sm:max-w-[1000px]">
        {/* hearoWarper */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* titleBlock */}
          <TitleBlock />
          {/* FormBlock */}
          <VideoBlock />
        </div>
      </div>
    </NoSSRWrapper>
  );
}
