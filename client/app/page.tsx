"use client";
import { useGetTodos } from "@/hooks/useGetTodos";

import { getApiClient } from "../services";
import { FilterOptions, AddItem } from "@/components";
import { useMemo, useState } from "react";
import { TodoItem } from "@/components/todo-item/TodoItem";

export type Filter = {
  colours?: string[];
  tags: string[];
  showClosed: boolean;
};

// Perhaps need an unauthoised page
export default function Home() {
  const { data, isLoading: todoLoading } = useGetTodos();
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
              <TodoItem key={index} todo={todo} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
