import { api } from "../MainApi";

const NewsEnhancedApi = () => {
  api.enhanceEndpoints({
    endpoints: {
      getNews: {
        providesTags: ["News"],
      },
    },
  });
};

export default NewsEnhancedApi;
