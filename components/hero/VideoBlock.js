"use client";
//react
import { useEffect, useRef, useState } from "react";
//ffmpgeg.wasmLib
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
//jotaiLib
import { useAtom, useAtomValue, useSetAtom } from "jotai";
//ytdlLib
import ytdl from "ytdl-core";
//shadcn
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
//icons
import { CiSettings } from "react-icons/ci";
import { MdClear } from "react-icons/md";
//customComponents
import { VideoPreviewComponent } from "../../lib/VideoPreview";
import { YouTubeThumbnailComponent } from "../../lib/YTThumbnail";
import transcode from "../../lib/ffmpegTranscode";
//customAtoms
import {
  ffmpegLoadedAtom,
  fileInputType,
  frameInterval,
  titleHiddenAtom,
  videoAtom,
  videoFileURL,
  ytURL
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
  const [inputType, setInputType] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  //useRef
  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef(null);
  //useAtom
  const [video, setVideo] = useAtom(videoAtom);
  const [videoURL, setVideoURL] = useAtom(videoFileURL);
  const [ytLink, setytLink] = useAtom(ytURL);
  const [interval, setInterval] = useAtom(frameInterval);
  //useSetAtom
  const setffmpegLoadedAtom = useSetAtom(ffmpegLoadedAtom);
  const setFileInputType = useSetAtom(fileInputType);
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
    // Clear the Outputs
    setVideoURL([null]);
    //console.log("Video URL after clearing:", videoURL); // Debug log
    setTimeout(() => {
      const fileInput = document.getElementById("file_input");
      const ytURLInput = document.getElementById("youtube_url_input");
      if (fileInput) {
        fileInput.value = "";
      }
      if (ytURLInput) {
        ytURLInput.value = "";
      }
      //Clear Inputs
      setVideo(null);
      setytLink("");
      setSummaryExiting(false);
    }, 300);
  };
  // F //Check is Youtube Link is Valid
  const isValidYouTubeUrl = (url) => {
    return ytdl.validateURL(url);
  };

  //useEffect
  //Effect //video and ytLink SummaryBlock Visibility
  useEffect(() => {
    if (!video && (!ytLink || !isValidYouTubeUrl(ytLink))) {
      setSummaryVisible(false);
      return;
    }
    if (!hidden) {
      setTimeout(() => {
        setSummaryVisible(true);
      }, 200);
    } else {
      setSummaryVisible(true);
    }
    setVideoURL(null);
  }, [video, ytLink, hidden]);
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
  //Effect //Fetch the thumbnail URL
  useEffect(() => {
    const fetchThumbnailUrl = async () => {
      if (isValidYouTubeUrl(ytLink)) {
        try {
          const response = await fetch(
            `/api/youtube?url=${encodeURIComponent(ytLink)}`,
          );
          const data = await response.json();
          setThumbnailUrl(data.thumbnailUrl);
        } catch (error) {
          console.error("Error fetching thumbnail:", error);
          setThumbnailUrl(null);
        }
      } else {
        setThumbnailUrl(null);
      }
    };

    fetchThumbnailUrl();
  }, [ytLink]);
  //Effect //Fetch the thumbnail URL
  useEffect(() => {
    setFileInputType(inputType);
    setVideo();
    setytLink();
  }, [inputType]);

  //RenderFrontEnd
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* InputFormBlock */}
      <Form {...form}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="z-10 flex flex-col items-end w-full gap-2 p-6 rounded-md h-fit bg-background"
        >
          {/* Dynamic Text */}
          <div className="flex w-full">
            {inputType === "" ? (
              <>
                {/* InputLabel */}
                <div className="w-full font-bold">
                  Select Type of Video Input
                </div>
              </>
            ) : inputType === "Youtube" ? (
              <>
                {/* InputLabel */}
                <div className="w-full">
                  Enter YouTube Video Link
                  <span className="ml-2 text-[12px] text-slate-400">
                    [Max 360px Output]
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* InputLabel */}
                <div className="w-full">
                  Upload Local Video File
                  <span className="ml-2 text-[12px] text-slate-400">
                    [MP4. (Max 360px Output)]
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Inputs */}
          <div className="flex items-end w-full gap-2">
            {/* FileInputType */}
            <Select
              value={inputType}
              onValueChange={(value) => setInputType(value)}
            >
              <SelectTrigger
                className={`border border-foreground hover:bg-foreground hover:text-background ${
                  inputType ? "w-[150px]" : "w-full"
                }`}
              >
                <SelectValue placeholder="Youtube || Upload" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem className="text-slate-400" value="Youtube">
                    Youtube
                  </SelectItem>
                  <SelectItem className="text-slate-400" value="Upload">
                    Upload
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* VideoInput */}
            <div className="grow">
              {/* YoutubeURLInput */}
              {inputType === "Youtube" && (
                <FormField
                  control={form.control}
                  name="youtubeUrl"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            id="youtube_url_input"
                            type="text"
                            placeholder="https://youtu.be/dQw4w9WgXcQ?si=6_xxI-w-8yM4UoXP"
                            {...field}
                            className="border border-foreground hover:bg-foreground hover:text-background"
                            onChange={(e) => setytLink(e.target.value)}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              )}
              {/* FileInput */}
              {inputType === "Upload" && (
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
              )}
            </div>

            {/* settingsInputsButton */}
            <Popover>
              {/* settingsTriggerButton */}
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="p-0"
                  disabled={(!ytLink && !video) || processing}
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
                              value={interval}
                              onChange={(e) =>
                                setInterval(parseInt(e.target.value))
                              }
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
              disabled={(!ytLink && !video) || processing}
            >
              <div className="flex h-[40px] w-[40px] items-center justify-center">
                <MdClear className="h-[25px] w-[25px] text-red-500" />
              </div>
            </Button>
          </div>

          {/* ProcessButton */}
          <Button
            variant="main"
            className={` mt-2 w-full ${videoURL ? "border-2 border-red-500 bg-background" : ""}`}
            onClick={() =>
              transcode(
                ffmpegRef,
                video,
                setProcessing,
                setVideoURL,
                videoURL,
                messageRef,
                interval,
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
        className={`flex w-full flex-col gap-4 sm:flex-row ${
          isSummaryVisible
            ? "animate-slide-in"
            : isSummaryExiting
              ? "animate-slide-out"
              : "hidden"
        }`}
      >
        {/* VideoBlock */}
        <div className=" flex h-fit min-h-[100px] max-w-[360px] flex-col rounded-md bg-background p-4 sm:min-w-[360px]">
          {inputType === "Youtube" && (
            <>
              {thumbnailUrl ? (
                <YouTubeThumbnailComponent thumbnailUrl={thumbnailUrl} />
              ) : (
                <>
                  {/* Loading Spinner */}
                  <div className="flex min-h-[150px] items-center justify-center rounded-md border border-red-500 bg-red-200">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin fill-foreground dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                </>
              )}
            </>
          )}
          {inputType === "Upload" && (
            <>
              {video ? (
                <VideoPreviewComponent video={video} />
              ) : (
                <>
                  {/* Loading Spinner */}
                  <div className="flex min-h-[150px] items-center justify-center rounded-md border border-red-500 bg-red-200">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 text-gray-200 animate-spin fill-foreground dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                </>
              )}
            </>
          )}
          <p
            className={`${processing ? "w-max-[360px] mt-2 text-wrap text-left" : "hidden"}`}
            ref={messageRef}
          ></p>
        </div>
        {/* FunctionBlock */}
        <div className="w-full p-4 rounded-md bg-foreground sm:grow">
          <Tabs defaultValue="frames" className="w-full h-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="frames" className="hover:text-red-500">
                Scenes
              </TabsTrigger>
              <TabsTrigger value="transcribe" className="hover:text-red-500">
                Transcribe
              </TabsTrigger>
              <TabsTrigger value="summarize" className="hover:text-red-500">
                Summarize
              </TabsTrigger>
              <TabsTrigger value="chat" className="hover:text-red-500">
                Chat
              </TabsTrigger>
            </TabsList>
            <TabsContent value="frames">
              {videoURL ? (
                <div className="pr-2 overflow-y-scroll h-fit">
                  <div className="grid max-h-[150px] grid-cols-3 gap-4 sm:max-h-[300px]">
                    {videoURL.map((videoURL, index) => (
                      <img
                        key={index}
                        src={videoURL}
                        alt={`Frame ${index}`}
                        className="w-full h-auto rounded-sm"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </TabsContent>
            <TabsContent value="transcribe">
              <div className="flex flex-col items-center justify-center text-center h-60 text-background">
                COMING SOON..
              </div>
            </TabsContent>
            <TabsContent value="summarize">
              <div className="flex flex-col items-center justify-center text-center h-60 text-background">
                COMING SOON..
              </div>
            </TabsContent>
            <TabsContent value="chat">
              <div className="flex flex-col items-center justify-center text-center h-60 text-background">
                COMING SOON..
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

//BACKUP
