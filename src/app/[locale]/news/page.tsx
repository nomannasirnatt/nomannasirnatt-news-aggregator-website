"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import NewsCard from "@/components/NewsCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import Select, { MultiValue } from 'react-select';
import DatePicker from 'react-date-picker';
import { useGetNewsQuery } from "@/api/news/NewsExtendedApi";
import { format, isValid } from 'date-fns';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";

const INITIAL_ITEMS = 100;
const LOAD_MORE_ITEMS = 4;

interface NewsType {
  url: string;
  urlToImage?: string;
  title: string;
  description?: string;
  author?: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
}

interface Filters {
  keyword: string;
  category: MultiValue<{ value: string; label: string }>;
  source: MultiValue<{ value: string; label: string }>;
  publishedAt: Date | null;
}

const FilterModal: React.FC = () => {
  const [allNews, setAllNews] = useState<NewsType[]>([]);
  const [displayedNews, setDisplayedNews] = useState<NewsType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filters, setFilters] = useState<Filters>({
    keyword: "",
    category: [],
    source: [],
    publishedAt: null,
  });
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { data, isLoading, isFetching, isSuccess } = useGetNewsQuery({});
  const containerRef = useRef<HTMLDivElement>(null);
  const newNewsRef = useRef<HTMLDivElement>(null);

  const scrollToNewItems = useCallback(() => {
    if (containerRef.current && newNewsRef.current) {
      const container = containerRef.current;
      const newItem = newNewsRef.current;
      const containerRect = container.getBoundingClientRect();
      const newItemRect = newItem.getBoundingClientRect();
      const scrollY = window.scrollY;

      const scrollPosition = scrollY + newItemRect.top - containerRect.top - 100;

      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      setAllNews(data.articles);
      setDisplayedNews(data.articles.slice(0, INITIAL_ITEMS));
    }
  }, [data, isSuccess]);

  const applyFilters = (articles: NewsType[]) => {
    const filtered = articles.filter(article => {
      let articleDate = '';
      let filterDate = '';

      if (isValid(new Date(article.publishedAt))) {
        articleDate = format(new Date(article.publishedAt), 'MM-dd-yyyy');
      }

      if (filters.publishedAt && isValid(filters.publishedAt)) {
        filterDate = format(filters.publishedAt, 'MM-dd-yyyy');
      }

      const publishDateMatch = !filters.publishedAt || articleDate === filterDate;
      const categoryMatch = !filters.category.length || filters.category.some(category => category.value === article.source.name);
      const sourceMatch = !filters.source.length || filters.source.some(source => source.value.toLowerCase() === article.source.name.toLowerCase());

      return (
        article.title.toLowerCase().includes(filters.keyword.toLowerCase()) &&
        categoryMatch &&
        sourceMatch &&
        publishDateMatch
      );
    });
    setDisplayedNews(filtered.slice(0, INITIAL_ITEMS));
  };

  const loadMore = () => {
    setCurrentPage(prevPage => {
      const newPage = prevPage + 1;
      const start = newPage * LOAD_MORE_ITEMS;
      const end = start + LOAD_MORE_ITEMS;
      const newItems = allNews.slice(0, end);
      setDisplayedNews(newItems);
      setTimeout(scrollToNewItems, 300);

      return newPage;
    });
  };

  const handleFilterChange = (filterName: keyof Filters, value: any) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyFilters(allNews);
  };

  const handleReset = () => {
    setFilters({
      keyword: "",
      category: [],
      source: [],
      publishedAt: null,
    });
    setDisplayedNews(allNews.slice(0, INITIAL_ITEMS));
  };

  const categoryOptions = [
    { value: 'business', label: 'Business' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'general', label: 'General' },
    { value: 'health', label: 'Health' },
    { value: 'science', label: 'Science' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' },
  ];

  const sourceOptions = [
    { value: 'wired', label: 'Wired' },
    { value: 'gizmodo-com', label: 'Gizmodo.com' },
    { value: 'slashdot-org', label: 'Slashdot.org' },
    { value: 'readwrite', label: 'ReadWrite' },
    { value: 'yahoo-entertainment', label: 'Yahoo Entertainment' },
    { value: 'business-insider', label: 'Business Insider' },
    { value: 'xataka-com', label: 'Xataka.com' },
    { value: 'golem-de', label: 'Golem.de' },
    { value: 'bbc-news', label: 'BBC News' },
    { value: 'hipertextual', label: 'Hipertextual' },
    { value: 'anthropocene-magazine', label: 'Anthropocene Magazine' },
    { value: 'die-zeit', label: 'Die Zeit' },
    { value: 'proton-me', label: 'Proton.me' },
    { value: 'schneier-com', label: 'Schneier.com' },
  ];

  return (
    <div className="relative">
      <div
        className={`fixed top-20 left-0 h-full ${sidebarOpen ? 'w-64' : 'w-0'} shadow-lg bg-bookMainBG dark:bg-gray-900 transition-all duration-300 ease-in-out overflow-y-auto z-40`}
        style={{ transition: 'width 0.3s ease' }}
      >
        <h2 className="text-xl font-bold mb-4 p-4">Filters</h2>
        {sidebarOpen && (
          <form onSubmit={handleSearch} className="flex flex-col gap-4 p-4">
            <div>
              <label className="font-bold mb-2 block">Keyword</label>
              <input
                type="text"
                value={filters.keyword}
                onChange={(e) => handleFilterChange('keyword', e.target.value)}
                placeholder="Search by keyword"
                className="p-2 border border-gray-600 rounded w-full text-dark"
              />
            </div>
            {/*<div>
              <label className="font-bold mb-2 block">Category</label>
              <Select
                isMulti
                options={categoryOptions}
                value={filters.category}
                onChange={(selected) => handleFilterChange('category', selected)}
                placeholder="Select categories"
                classNamePrefix="categories-select"
              />
            </div>*/}
            <div>
              <label className="font-bold mb-2 block">Source</label>
              <Select
                isMulti
                options={sourceOptions}
                value={filters.source}
                onChange={(selected) => handleFilterChange('source', selected)}
                placeholder="Select sources"
                classNamePrefix="categories-select"
              />
            </div>
            <div>
              <label className="font-bold mb-2 block">Published Date</label>
              <DatePicker
                value={filters.publishedAt}
                onChange={(date) => handleFilterChange('publishedAt', date)}
                className="rounded w-full border border-gray-600"
                format="MM/dd/yyyy"
              />
            </div>
            <div className="mt-4 flex gap-4">
              <button
                type="submit"
                className="bg-dark hover:bg-lightGreen text-white font-bold py-2 px-4 rounded"
              >
                Search
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="bg-dark hover:bg-lightGreen text-white font-bold py-2 px-4 rounded"
              >
                Reset
              </button>
            </div>
          </form>
        )}
      </div>

      <div className={`container mx-auto px-4`} ref={containerRef}>

        <div className="pt-34 py-100">
          <div className="flex justify-end mr-8">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className=" text-lg py-2 flex items-center justify-between px-4 bg-lightGreen text-white hover:bg-dark focus:ring-0 focus:outline-none font-medium rounded-lg text-sm text-center dark:bg-darkBg hover:dark:bg-darkHoverBg dark:focus:ring-blue-800"
            >
              <FontAwesomeIcon className="me-3" icon={sidebarOpen ? faTimes : ""} />
              {sidebarOpen ? ' Close Filters' : ' Apply Filters'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-0">
            <div className="col-span-10 p-4">
              {isLoading || isFetching ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, index) => (
                    <SkeletonLoader key={index} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {displayedNews.map((news, index) => (
                    <div
                      key={news.url}
                      ref={index === displayedNews.length - 1 ? newNewsRef : null}
                    >
                      <NewsCard
                        id={String(news.url)}
                        image={news.urlToImage || '/default-image.jpg'}
                        title={String(news.title)}
                        description={String(news.description)}
                        url={String(news.url)}
                        author={news.author ? String(news.author) : 'Unknown Author'}
                        publishedAt={String(news.publishedAt)}
                        source={news.source}
                      />
                    </div>
                  ))}
                </div>
              )}
              {/* {allNews.length > displayedNews.length && (
                <div className="flex justify-center mt-0">
                  <button
                    onClick={loadMore}
                    className="animate-bounce bg-lightGreen text-white hover:bg-dark focus:ring-0 focus:outline-none font-medium rounded-lg text-sm text-center dark:bg-darkBg hover:dark:bg-darkHoverBg dark:focus:ring-blue-800 py-4 px-8"
                  >
                    Load More
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

