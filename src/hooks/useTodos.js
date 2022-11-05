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

  const { mutateAsync: updateTodo } = useMutation(
    ({ idTodo, data }) => actionAPI("patch", `todo-items/${idTodo}`, data),
    {
      onSuccess: (newData) => {
        queryClient.setQueryData(["activity", "detail", id], (old) => ({
          ...old,
          todo_items: old.todo_items?.map((item) =>
            item.id === newData?.id ? newData : item
          ),
        }));
      },
    }
  );

  const { mutateAsync: deleteTodo } = useMutation(
    (idTodo) => actionAPI("delete", `todo-items/${idTodo}`),
    {
      onSuccess: () => {
        const idTodo = localStorage.getItem("idTodo");
        queryClient.setQueryData(["activity", "detail", id], (old) => ({
          ...old,
          todo_items: old.todo_items?.filter(
            (item) => item.id !== Number(idTodo)
          ),
        }));
      },
    }
  );

  const filterTodos = (filter) => {
    queryClient.setQueryData(["activity", "detail", id], (old) => ({
      ...old,
      todo_items: old?.todo_items.sort((a, b) =>
        filter === "A-Z"
          ? a.title > b.title
            ? 1
            : b.title > a.title
            ? -1
            : 0
          : filter === "Z-A"
          ? a.title < b.title
            ? 1
            : b.title < a.title
            ? -1
            : 0
          : filter === "Terbaru"
          ? a.id < b.id
            ? 1
            : b.id < a.id
            ? -1
            : 0
          : filter === "Terlama"
          ? a.id > b.id
            ? 1
            : b.id > a.id
            ? -1
            : 0
          : a.is_active < b.is_active
          ? 1
          : b.is_active < a.is_active
          ? -1
          : 0
      ),
    }));
  };

  return {
    createTodo,
    updateTodo,
    deleteTodo,
    filterTodos,
    isLoading,
  };
};
