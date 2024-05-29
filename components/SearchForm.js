"use client";

//shadcn
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";


export function SearchForm() {
  //set Default Values
  // Define default values directly
  const form = useForm({
    defaultValues: {
      address: "",
      categories: "",
      minPrice: "",
      maxPrice: "",
    },
  });

  return (
    <Form {...form}>
      <form className="grid items-end w-full gap-6 p-6 rounded bg-background sm:grid-cols-2 lg:grid-cols-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Upload Video File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="MP4. (max 480px)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Frame Interval</FormLabel>
                <Input
                  type="number"
                  placeholder="Interval in Seconds"
                  {...field}
                />
              </FormItem>
            );
          }}
        />

        <Button className="col-start-[1] col-end-[-1]">Search</Button>
      </form>
    </Form>
  );
}
