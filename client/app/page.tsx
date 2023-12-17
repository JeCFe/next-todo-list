"use client";
import { useGetTodos } from "@/hooks/useGetTodos";

import { getApiClient } from "../services";
import { ArrowDown, ArrowUp, Delete, AddItem } from "@/components";
import { useMemo } from "react";

export default function Home() {
  const { data, isLoading: todoLoading, error: todoError } = useGetTodos();

  const filteredTodos = useMemo(() => {
    return data;
  }, [data]); // sets up the memo for filters

  const filterTags = useMemo(() => {
    if (!filteredTodos) {
      return undefined;
    }
    const tags = filteredTodos
      .map((todo) => todo.tags)
      .filter((tag): tag is string => tag !== null && tag !== undefined);

    if (tags.length === 0) {
      return undefined;
    }

    return [...new Set(tags)];
  }, [filteredTodos]);

  const filteredColours = useMemo(() => {
    if (!filteredTodos) {
      return undefined;
    }
    const tags = filteredTodos
      .map((todo) => todo.colour)
      .filter(
        (colour): colour is string => colour !== null && colour !== undefined
      );

    if (tags.length === 0) {
      return undefined;
    }

    return [...new Set(tags)];
  }, [filteredTodos]);

  if (todoLoading) return <div>Loading...</div>;
  else if (data === undefined) return <div>No todos. Why not create one?</div>;
  return (
    <div className="container mx-auto space-y-2">
      <AddItem />
      <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 ">
        <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2">
          <div className="flex flex-col border border-black rounded-xl p-2 space-y-2 w-1/2 md:w-fit">
            <h2 className="text-lg">Filter</h2>
            <h3 className="underline underline-offset-4">Tags</h3>
            {filterTags !== undefined
              ? filterTags.map((tag) => <div key={tag}>{tag}</div>)
              : "No tags available"}
            <h3 className="underline underline-offset-4">Colours</h3>
            {filteredColours !== undefined
              ? filteredColours.map((colour) => (
                  <div key={colour}>{colour}</div>
                ))
              : "No colours available"}
          </div>
          <div className="flex flex-col border border-black rounded-xl p-2 space-y-2 w-1/2 md:w-fit">
            <h2 className="text-lg">Sort</h2>
            ADD SORTING STUFF
          </div>
        </div>

        <div className="flex w-full h-fit flex-col space-y-4 border border-black rounded-xl p-4">
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
