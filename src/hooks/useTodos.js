import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { actionAPI } from "../services";

export const useTodos = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { mutateAsync: createTodo, isLoading } = useMutation(
    (data) => actionAPI("post", "todo-items", data),
    {
      onSuccess: (newData) => {
        queryClient.setQueryData(["activity", "detail", id], (old) => ({
          ...old,
          todo_items: [newData, ...old.todo_items],
        }));
      },
    }
  );
  return { createTodo, isLoading };
};
