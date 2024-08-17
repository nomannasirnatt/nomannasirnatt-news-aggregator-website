import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';

interface NewsCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  url: string;
  author: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
}

const NewsCard: React.FC<NewsCardProps> = ({ id, image, title, description, url, author, publishedAt, source }) => {
  return (
    <div className="w-full pb-8 px-4">
      <div className="max-w-lg rounded shadow-lg bg-lightGreen dark:bg-gray-900 text-white">
        <div className="relative group transition-colors">
          <div className="relative group overflow-hidden h-250">
            <img
              className="object-cover w-full h-full img-fluid"
              src={image}
              alt={title}
            />
          </div>
        </div>
        <div className="px-2 py-4">
          <div className="flex justify-between items-center mb-1">
            <h6>{author}</h6>
            <span>{new Date(publishedAt).toLocaleDateString()}</span>
          </div>
          <Link href={url} className="font-bold text-xl mb-2 line-clamp-1 hover:text-greenish hover:dark:text-darkColor">
            {title}
          </Link>
          <p className="text-white text-base overflow-hidden line-clamp-4">
            {description}
          </p>
          <h2 className="text-white bg-dark px-4 py-2 mt-3 inline-block rounded-5">{source.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
