"use client";
import { useGetTodos } from "@/hooks/useGetTodos";

import { getApiClient } from "../services";
import { Delete, FilterOptions, Accordion, AddItem } from "@/components";
import { useMemo, useState } from "react";

export type Filter = {
  colours?: string[];
  tags: string[];
  showClosed: boolean;
};

const deleteTodo = getApiClient().path("/todo/delete").method("post").create();

// Perhaps need an unauthoised page
export default function Home() {
  const { data, isLoading: todoLoading, mutate } = useGetTodos();
  const [filter, setFilter] = useState<Filter>({
    colours: [],
    tags: [],
    showClosed: false,
  });

  const filteredTodos = useMemo(() => {
    return data?.filter(
      (x) =>
        (!x.closed || (x.closed && filter.showClosed)) &&
        (!x.colour ||
          filter.colours?.length === 0 ||
          filter.colours?.includes(x.colour)) &&
        (!x.tags || filter.tags?.length === 0 || filter.tags.includes(x.tags))
    );
  }, [data, filter]);

  const sortedTodos = useMemo(() => {
    if (filteredTodos === undefined) {
      return undefined;
    }
    return filteredTodos.sort(
      (a, b) => new Date(a.created!).getTime() - new Date(b.created!).getTime()
    );
  }, [filteredTodos]);

  if (todoLoading || data === undefined) return <div>Loading...</div>;
  return (
    <div className="container mx-auto space-y-2">
      <AddItem />
      <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 ">
        <FilterOptions filterOn={data} filter={filter} setFilter={setFilter} />

        <div className="flex w-full h-fit flex-col space-y-4 border border-black rounded-xl p-4">
          {sortedTodos === undefined || sortedTodos.length === 0 ? (
            <div>{`This feels lonely :( why don't you add a few todos`}</div>
          ) : (
            sortedTodos.map((todo, index) => (
              <div
                key={index}
                className={`flex flex-col border rounded-xl border-black p-4 bg-${todo.colour}-100 divide-y divide-black`} // This bg is bad, only working as Add item is setting up the tailwind class name
              >
                <div className="flex flex-row items-center space-x-4 pb-2">
                  <div className="flex w-full">{todo.text}</div>
                  {!todo.closed && (
                    <div
                      className="mr-2"
                      onClick={() => {
                        deleteTodo({
                          text: todo.text,
                          created: todo.created,
                          version: todo.version,
                        });
                        mutate();
                      }}
                    >
                      <Delete className="fill-red-500 w-8 hover:fill-red-800 hover:cursor-pointer transition duration-200 ease-in-out" />
                    </div>
                  )}
                </div>
                <div className="flex flex-row pt-2">
                  <Accordion
                    openTitle="Show addional information"
                    closeTitle="Hide additional information"
                  >
                    <div className="w-full flex flex-col space-y-2 md:flex-row md:space-y-0 divide-black">
                      <div className="w-full md:w-1/2">
                        <span className="w-fit">Created:</span>
                        <span className="w-fit font-bold pl-2">
                          {new Date(todo.created!).toLocaleString()}
                        </span>
                      </div>
                      {todo.closed && (
                        <div className="w-full md:w-1/2">
                          <span className="w-fit">Closed:</span>
                          <span className="w-fit font-bold pl-2">
                            {new Date(todo.closed).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </Accordion>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
