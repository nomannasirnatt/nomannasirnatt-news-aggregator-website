export interface NewsType {
  id: string;
  image: string;
  title: string;
  description: string;
  url: string;
  urlToImage:string;
  author: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  name: string;
}
