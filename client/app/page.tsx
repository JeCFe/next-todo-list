"use client";
import { useGetTodos } from "@/hooks/useGetTodos";
import { FilterOptions, AddItem } from "@/components";
import { useMemo, useState } from "react";
import { TodoItem } from "@/components/todo-item/TodoItem";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Spinner } from "@/components/spinner";

export type Filter = {
  colours?: string[];
  tags: string[];
  showClosed: boolean;
};

export default function Home() {
  const { data, isLoading: todoLoading } = useGetTodos();
  const { user, isLoading } = useUser();
  const [filter, setFilter] = useState<Filter>({
    colours: [],
    tags: [],
    showClosed: false,
  });
  const [sort, setSort] = useState<"Asc" | "Dsc">("Dsc");

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
    switch (sort) {
      case "Asc":
        return filteredTodos.sort(
          (a, b) =>
            new Date(b.created!).getTime() - new Date(a.created!).getTime()
        );
      case "Dsc":
        return filteredTodos.sort(
          (a, b) =>
            new Date(a.created!).getTime() - new Date(b.created!).getTime()
        );
      default:
        return filteredTodos;
    }
  }, [filteredTodos, sort]);

  if (todoLoading || data === undefined || isLoading)
    return <Spinner fast={todoLoading} size="large" />;
  if (!isLoading && !user) {
    return <div>Please log in</div>;
  }
  return (
    <div className="space-y-2">
      <AddItem />
      <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 ">
        <FilterOptions
          filterOn={data}
          filter={filter}
          setFilter={setFilter}
          setSort={setSort}
        />

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
