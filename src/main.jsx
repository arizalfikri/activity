import React from 'react'
import ReactDOM from "react-dom/client";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";

import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { router } from "./routes";

import theme from "./theme";
import "./main.css";
import MainLayout from "./layouts/Main.layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      notifyOnChangeProps: "all",
      retry: false,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <MainLayout>
          <RouterProvider router={router} />
        </MainLayout>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
