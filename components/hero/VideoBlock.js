"use client";
//react
import { useEffect, useRef, useState } from "react";
//ffmpgeg.wasmLib
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
//jotaiLib
import { useAtom, useAtomValue, useSetAtom } from "jotai";
//shadcn
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
//icons
import { CiSettings } from "react-icons/ci";
import { MdClear } from "react-icons/md";
//customComponents
import { VideoPreviewComponent } from "../../lib/VideoPreview";
import transcode from "../../lib/ffmpegTranscode";
//customAtoms
import {
  ffmpegLoadedAtom,
  titleHiddenAtom,
  videoAtom,
  videoFileURL,
} from "../../lib/atom";

export function VideoBlock() {
  //set Default Values
  const form = useForm({
    defaultValues: {},
  });
  //useState
  const [isSummaryVisible, setSummaryVisible] = useState(false);
  const [isSummaryExiting, setSummaryExiting] = useState(false);
  const [processing, setProcessing] = useState(false);
  //useRef
  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef(null);
  //useAtom
  const [video, setVideo] = useAtom(videoAtom);
  const [videoURL, setVideoURL] = useAtom(videoFileURL);
  //useSetAtom
  const setffmpegLoadedAtom = useSetAtom(ffmpegLoadedAtom);
  //useAtomValue
  const hidden = useAtomValue(titleHiddenAtom);

  //FUCTIONS
  //F //load ffmpegCores from Web
  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
      console.log(message);
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm",
      ),
    });
    setffmpegLoadedAtom(true);
  };
  //F //Clear File Input
  const handleClearInputs = () => {
    setSummaryVisible(false);
    setSummaryExiting(true); // Trigger exit animation
    setVideoURL(null);
    setTimeout(() => {
      const fileInput = document.getElementById("file_input");
      if (fileInput) {
        fileInput.value = "";
      }
      setVideo(null);
      setSummaryExiting(false);
    }, 300);
  };

  //useEffect
  //Effect //video
  useEffect(() => {
    if (!video) {
      setSummaryVisible(false);
      return;
    }
    if (!hidden) {
      setTimeout(() => {
        setSummaryVisible(true)
      }, 200);
    } else {
      setSummaryVisible(true);
    }
    setVideoURL(null);
  }, [video, hidden]);
  //Effect //loadffmpegCores
  useEffect(() => {
    load();
  }, []);
  //Effect //refreshOutput
  useEffect(() => {
    return () => {
      if (videoURL) {
        URL.revokeObjectURL(videoURL);
      }
    };
  }, [videoURL]);

  //RenderFrontEnd
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* InputFormBlock */}
      <Form {...form}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-end w-full gap-2 p-6 rounded-md h-fit bg-background"
        >
          {/* InputLabel */}
          <div className="w-full">
            Upload Video{" "}
            <span className="text-[12px] text-slate-400">
              File. [MP4. (max 480px)]
            </span>
          </div>

          {/* Inputs */}
          <div className="flex items-end w-full gap-2">
            {/* FileInput */}
            <div className="grow">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          id="file_input"
                          type="file"
                          accept="video/*"
                          {...field}
                          onChange={(e) =>
                            setVideo(e.target.files?.[0] || null)
                          }
                          className="border border-foreground hover:bg-foreground hover:text-background"
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            </div>

            {/* settingsInputsButton */}
            <Popover>
              {/* settingsTriggerButton */}
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="p-0"
                  disabled={!video || processing}
                >
                  <div className="flex h-[40px] w-[40px] items-center justify-center">
                    <CiSettings className="h-[25px] w-[25px]" />
                  </div>
                </Button>
              </PopoverTrigger>

              {/* settingsMenuContent */}
              <PopoverContent className="mr-6 w-80 bg-foreground text-background">
                {/* settingsMenuWarper */}
                <div className="flex flex-col gap-4">
                  {/* settingsMenuLabels */}
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Video Settings</h4>
                    <p className="text-sm text-muted-foreground">
                      Set the parameters for video processing.
                    </p>
                  </div>

                  {/* settingsInputs */}
                  <div>
                    <FormField
                      control={form.control}
                      name="categories"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-row items-center w-full gap-2">
                            <FormLabel>Frame Interval</FormLabel>
                            <Input
                              type="number"
                              placeholder="Interval in Second(s)"
                              min={1}
                              max={60}
                              {...field}
                              className="text-foreground"
                            />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* ClearInputs */}
            <Button
              variant="outline"
              className="h-[40px] w-[40px] p-0"
              onClick={(e) => {
                // Modify this line
                e.preventDefault(); // Add this line
                handleClearInputs();
              }}
              disabled={!video || processing}
            >
              <div className="flex h-[40px] w-[40px] items-center justify-center">
                <MdClear className="h-[25px] w-[25px] text-red-500" />
              </div>
            </Button>
          </div>

          {/* ProcessButton */}
          <Button
            variant="main"
            className="w-full mt-2"
            onClick={() =>
              transcode(
                ffmpegRef,
                video,
                setProcessing,
                setVideoURL,
                videoURL,
                messageRef,
              )
            }
            disabled={processing}
          >
            {processing ? "Processing..." : "Process Video"}
          </Button>
        </form>
      </Form>
      {/* SummaryBlock */}
      <div
        className={`-z-10 flex w-full flex-col gap-4 sm:flex-row ${
          isSummaryVisible
            ? "animate-slide-in"
            : isSummaryExiting
              ? "animate-slide-out"
              : "hidden"
        }`}
      >
        {/* VideoBlock */}
        <div className="flex h-fit min-w-[360px] max-w-[360px] flex-col rounded-md bg-background p-4">
          <VideoPreviewComponent video={video} />
          <p
            className={`${processing ? "w-max-[360px] mt-2 text-wrap text-left" : "hidden"}`}
            ref={messageRef}
          ></p>
        </div>
        {/* AiBlock */}
        <div className="p-4 rounded-md grow bg-foreground">
          {videoURL ? (
            <>
              <img src={videoURL} alt="" width="360" />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
