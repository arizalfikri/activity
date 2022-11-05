import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import DetailActivity, { loader } from "../pages/DetailActivity";
import ListActivity from "../pages/ListActivity";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ListActivity />,
  },
  {
    path: "detail/:id",
    element: <DetailActivity />,
    loader: loader(queryClient),
  },
]);
