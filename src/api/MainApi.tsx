import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./ApiHead";

const baseQuery = createBaseQuery();

export const api = createApi({
  reducerPath: "NewsApp",
  baseQuery: baseQuery,
  tagTypes: ["News"],
  endpoints: () => ({}),
});
