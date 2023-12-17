import { useGetTodos } from "@/hooks/useGetTodos";
import { getApiClient } from "@/services";
import { SubmitHandler, useForm } from "react-hook-form";

const issue = getApiClient().path("/todo/add").method("post").create();

type Inputs = {
  text: string;
};

export const AddItem = () => {
  const { mutate } = useGetTodos();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    await issue({ text: data.text });
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
            className="flex border min-h-[2lh] resize-vertical border-black rounded-xl p-2 space-y-2 w-full"
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
      </form>
    </div>
  );
};
