import { api } from "../MainApi";
import { createBaseQuery } from "../ApiHead";
import NewsEnhancedApi from "./NewsEnhancedApi";

const baseQuery = createBaseQuery();

const NewsExtendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => `everything?q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
    }),
  }),
  overrideExisting: true,
});
NewsEnhancedApi();
baseQuery:baseQuery;

export const { useGetNewsQuery } = NewsExtendedApi;



