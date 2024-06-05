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
      <div className="flex flex-col h-full max-w-4xl px-6 mt-24 mb-10 sm:mt-28">
        {/* hearoWarper */}
        <div className="space-y-4 sm:space-y-6">
          {/* titleBlock */}
          <TitleBlock />
          {/* FormBlock */}
          <VideoBlock />
        </div>
      </div>
    </NoSSRWrapper>
  );
}
