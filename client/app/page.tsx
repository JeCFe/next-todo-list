"use client";
import { useGetTodos } from "@/hooks/useGetTodos";

import { getApiClient } from "../services";
import { ArrowDown, ArrowUp, Delete } from "@/components";

const issue = getApiClient().path("/todo/add").method("post").create();

export default function Home() {
  const { data, isLoading: todoLoading, error: todoError } = useGetTodos();

  if (todoLoading) return <div>Loading...</div>;
  else if (data === undefined) return <div>No todos. Why not create one?</div>;
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col"></div>

        <div className="flex w-full flex-col space-y-4 border border-black rounded-xl p-4">
          {data.map((todo, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 border rounded-xl border-grey-600 p-4"
            >
              <div className="flex flex-col">
                {index !== 0 && <ArrowUp />}
                {index !== data.length - 1 && <ArrowDown />}
              </div>
              <div className="flex w-full">{todo.text}</div>

              <div className="mr-2">
                <Delete className="fill-red-500 w-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
