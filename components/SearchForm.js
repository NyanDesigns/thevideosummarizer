"use client";

//shadcn
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
//icons
import { CiSettings } from "react-icons/ci";
import { MdClear } from "react-icons/md";

export function SearchForm() {
  //set Default Values
  // Define default values directly
  const form = useForm({
    defaultValues: {
      address: "",
      categories: "",
    },
  });

  return (
    <Form {...form}>
      {/* FormWarper */}
      <form className="flex flex-col items-end w-full gap-2 p-6 rounded h-fit bg-background">
        
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
                        type="file"
                        {...field}
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
            <PopoverTrigger asChild>
              {/* settingsTriggerButton */}
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
          <Button variant="outline" className="h-[40px] w-[40px] p-0">
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
  );
}
