import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Layout";
import { useQuery } from "@apollo/client";
import { getPlaylists } from "../common/api";

function createRoute() {
  const { loading, error, data } = useQuery(getPlaylists);

  if (loading) {
    return null;
  }
  if (error) {
    return null;
  } else {
    const { getPlaylists } = data;
    return getPlaylists.map(({ title }) => {
      return <Route key={title} path={`/${title.split(" ").join("").toLowerCase()}`} />;
    });
  }
}

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {createRoute()}
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
