import { getApiClient } from "@/services";
import useSWR from "swr";

const getTodos = getApiClient().path("/todo/items").method("get").create();

export const useGetTodos = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "getTodos",
    async () => (await getTodos({})).data,
    { refreshInterval: 10000 }
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
