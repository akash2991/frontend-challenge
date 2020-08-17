import { useEffect, useState } from 'react';
import { newsDummyData } from '../utils/constants';

const stage = 'dev';
const BASE_URL = `${process.env.REACT_APP_SERVICE_URL}${stage}`;

export const useFetchArticles = ({
  searchQuery = '',
  country = '',
  category = '',
}) => {
  const noAnyQueryParam = !searchQuery && !country && !category;
  if (noAnyQueryParam) {
    country = 'gb';
  }
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const hideArticle = (index) => {
    const copy = JSON.parse(JSON.stringify(articleList));
    copy.splice(index, 1);
    setArticleList(copy);
  };

  useEffect(() => {
    async function getArticles() {
      setIsLoading(true);
      const body = {
        q: searchQuery,
        country,
        category,
      };
      const type = searchQuery ? 'search' : 'headlines';

      const url = `${BASE_URL}/articles?type=${type}`;
      const options = {
        method: 'POST',
        credentials: 'include',
        'Content-Type': 'application/json',
        body: JSON.stringify(body),
      };
      try {
        const response = await fetch(url, options);
        const { articles } = await response.json();
        setArticleList(articles);
        setIsLoading(false);
      } catch (error) {
        setArticleList([]);
        setError(new Error('We Encountered Some Problem'));
        // setArticleList(newsDummyData);
        setIsLoading(false);
      }
    }

    getArticles();
  }, [searchQuery, country, category]);

  return { data: articleList, isLoading, error, hideArticle };
};
