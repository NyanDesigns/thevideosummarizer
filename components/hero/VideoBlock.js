"use client";

//jotaiLib
import { useAtom } from "jotai";
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
//customAtoms
import { videoAtom } from "../../lib/atom";

export function VideoBlock() {
  //set Default Values
  const form = useForm({
    defaultValues: {
      address: "",
      categories: "",
    },
  });
  //useAtom
  const [video, setVideo] = useAtom(videoAtom);

  //FUCTIONS
  //F //ClearFileInput
  const handleClearInputs = () => {
    // Clear the file input value
    const fileInput = document.getElementById("file_input");
    if (fileInput) {
      fileInput.value = "";
    }
    // Reset the video state to null
    setVideo(null);
  };

  //RenderFrontEnd
  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* InputFormBlock */}
      <Form {...form}>
        <form   onSubmit={(e) => e.preventDefault()}
        className="flex flex-col items-end w-full gap-2 p-6 rounded-md h-fit bg-background">
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
                <Button variant="outline" className="p-0">
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
            >
              <div className="flex h-[40px] w-[40px] items-center justify-center">
                <MdClear className="h-[25px] w-[25px] text-red-500" />
              </div>
            </Button>
          </div>

          {/* ProcessButton */}
          <Button variant="main" className="w-full mt-2">
            Process Video
          </Button>
        </form>
      </Form>
      {/* SummaryBlock */}
      <div className="flex flex-col w-full gap-4 sm:flex-row">
        {/* VideoBlock */}
        <div className="min-h-[200px] max-w-[360px] rounded-md bg-background p-4">
          <VideoPreviewComponent video={video} />
        </div>
        {/* AiBlock */}
        <div className="rounded-md grow bg-foreground"></div>
      </div>
    </div>
  );
}
