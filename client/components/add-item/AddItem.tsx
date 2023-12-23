"use client"; // Move the advanced options to their over client side state or intergrate with react hook forms

import { useGetTodos } from "@/hooks/useGetTodos";
import { getApiClient } from "@/services";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const issue = getApiClient().path("/todo/add").method("post").create();
type ColourOptions = "red" | "green" | "blue" | "yellow" | "white";
type Inputs = {
  text: string;
  colour: ColourOptions;
};

export const AddItem = () => {
  const colourOptions: ColourOptions[] = [
    "red",
    "green",
    "blue",
    "yellow",
    "white",
  ];

  const { mutate } = useGetTodos();
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      colour: "white",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await issue({ text: data.text, colour: data.colour });
    mutate();
    reset();
  };
  return (
    <div className="border border-black rounded-xl p-2 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0 justify-center items-center">
          <textarea
            {...register("text", { required: true })}
            placeholder="Enter your todo..."
            className={`flex border min-h-[2lh] resize-vertical border-black rounded-xl p-2 space-y-2 w-full bg-${
              watch().colour
            }-100`}
          />

          <button
            type="submit"
            className="flex border border-black rounded-xl p-2 space-y-2 w-1/2 md:w-1/5 h-16 items-center justify-center bg-pink-100 hover:bg-pink-200 focus:ring-red-300 focus:ring-2 transition duration-300 ease-in-out"
          >
            Add
          </button>
        </div>

        <div className="flex flex-row text-red-500 text-bold text-lg">
          {errors.text && "Todo text is required"}
        </div>

        {showAdvanced && (
          <div className="flex flex-row">
            <div className="flex flex-col space-y-2 sm:space-x-2 sm:space-y-0 sm:flex-row item-center justify-center">
              <div className="flex items-center">Colour:</div>
              <div className="flex flex-row space-x-2">
                {colourOptions.map((colour) => (
                  <input
                    {...register("colour")}
                    type="radio"
                    value={colour}
                    key={colour}
                    className={`appearance-none flex flex-col border border-black rounded-xl w-8 h-8 bg-${colour}-100 hover:bg-${colour}-300 focus:ring-red-300 focus:ring-2 transition duration-300 ease-in-out`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div
          className="underline underline-offset-4 text-blue-500 hover:text-blue-900 transition duration-200 ease-in-out cursor-pointer"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {!showAdvanced ? "Show advanced options" : "Hide advanced options"}
        </div>
      </form>
    </div>
  );
};
