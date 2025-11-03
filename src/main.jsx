import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import {
  add404PageToRoutesChildren,
  addErrorElementToRoutes,
  convertPagesToRoute,
} from "./libs/react-router/file-base-routing";
import { middleware } from "./middleware";
import { ReactQueryProvider } from "./libs/react-query/react-query-provider";
import "antd/dist/reset.css";
import "admiral/style.css";
import "./styles/theme.css";
import "./styles/navbar.css";
import "leaflet/dist/leaflet.css";
import "./utils/surpress-warning";

const files = import.meta.glob("./app/**/*(page|layout).jsx");
const errorFiles = import.meta.glob("./app/**/*error.jsx");
const notFoundFiles = import.meta.glob("./app/**/*404.jsx");
const loadingFiles = import.meta.glob("./app/**/*loading.jsx");
const routes = convertPagesToRoute(files, loadingFiles);
addErrorElementToRoutes(errorFiles, routes);
add404PageToRoutesChildren(notFoundFiles, routes);

const router = createBrowserRouter([
  {
    ...routes,
    loader: middleware,
    shouldRevalidate: () => true,
  },
]);

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
  </StrictMode>
);
