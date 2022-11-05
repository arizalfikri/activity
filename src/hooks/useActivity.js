import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { actionAPI } from "../services";


export const useGetOneActivity = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching, isError } = useQuery(
    ["activity", "detail", id],
    () => actionAPI("get", `activity-groups/${id}`),
    {
      enabled: !!id,
    }
  );

  return { data, isLoading, isFetching, isError };
};

export const usePostActivity = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: postActivity, isLoading } = useMutation(
    () =>
      actionAPI("post", "activity-groups", {
        title: "New Activity",
        email: "arizalfikri33@gmail.com",
      }),
    {
      onSuccess: (newData) => {
        const getQueryData = queryClient.getQueryData(["activities", "list"]);

        if (!getQueryData) {
          queryClient.invalidateQueries(["activities", "list"]);
        } else {
          queryClient.setQueryData(["activities", "list"], (old) => ({
            ...old,
            data: [newData, ...old.data],
          }));
        }
      },
    }
  );

  return { postActivity, isLoading };
};

export const useDeleteActivity = (id) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteActivity, isSuccess } = useMutation(
    () => actionAPI("delete", `activity-groups/${id}`),
    {
      onSuccess: () => {
        queryClient.setQueryData(["activities", "list"], (old) => ({
          ...old,
          data: old?.data?.filter((item) => item.id !== id),
        }));
      },
    }
  );

  return { deleteActivity, isSuccess };
};

export const useGetAllActivity = () => {
  const { data, isLoading, isFetching, isError } = useQuery(
    ["activities", "list"],
    () => actionAPI("get", "activity-groups?email=arizalfikri33@gmail.com"),
    {
      staleTime: Infinity,
    }
  );

  return { data, isLoading, isFetching, isError };
};

export const useUpdateActivity = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { mutateAsync: updateActivity } = useMutation(
    (data) => actionAPI("patch", `activity-groups/${id}`, data),
    {
      onSuccess: (newData) => {
        queryClient.setQueryData(["activity", "detail", id], (old) => ({
          ...old,
          title: newData.title,
        }));
        queryClient.setQueryData(["activities", "list"], (old) => ({
          ...old,
          data: old?.data?.map((item) =>
            item.id === newData.id ? newData : item
          ),
        }));
      },
    }
  );

  return { updateActivity };
};
