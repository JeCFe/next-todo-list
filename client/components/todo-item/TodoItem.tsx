import { TodoItem } from "@/types/server";
import { Accordion, ColourOptions, Delete, colourVariance } from "..";
import { getApiClient } from "@/services";
import { useGetTodos } from "@/hooks/useGetTodos";

const deleteTodo = getApiClient().path("/todo/delete").method("post").create();

type Props = {
  todo: TodoItem;
};

export function TodoItem({ todo }: Props) {
  const { mutate } = useGetTodos();
  return (
    <div
      className={colourVariance({
        colour: todo.colour as ColourOptions,
        className:
          "flex flex-col border rounded-xl border-black p-4 divide-y divide-black",
      })}
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
                {new Date(todo.created).toLocaleString()}
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
  );
}
