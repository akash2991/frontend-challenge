import { useEffect, useState } from 'react';

const stage = 'dev';
const BASE_URL = `${process.env.REACT_APP_SERVICE_URL}${stage}`;

const dummyData = [
  {
    source: {
      id: 'bbc-news',
      name: 'BBC News',
    },
    author: 'https://www.facebook.com/bbcnews',
    title:
      'Emergency services respond to derailed train near Stonehaven - BBC News',
    description:
      'Smoke can be seen as about 30 emergency vehicles were called to the scene, near Stonehaven in Aberdeenshire.',
    url:
      'https://www.bbc.co.uk/news/uk-scotland-north-east-orkney-shetland-53751678',
    urlToImage:
      'https://ichef.bbci.co.uk/news/1024/branded_news/8E26/production/_113909363_train2.jpg',
    publishedAt: '2020-08-12T10:30:00Z',
    content:
      'Image caption\r\n Smoke is billowing at the scene\r\nEmergency services are dealing with a derailed train near Stonehaven.\r\nAbout 30 emergency vehicles, including an air ambulance, are at the scene with … [+513 chars]',
  },
  {
    source: {
      id: null,
      name: 'Sky.com',
    },
    author: 'Sky',
    title:
      'Coronavirus: Oldham on brink of local lockdown as hundreds flout COVID laws in Greater Manchester - Sky News',
    description:
      'The seven-day infection rate in Oldham has overtaken the ones in Blackburn with Darwen and Leicester.',
    url:
      'https://news.sky.com/story/coronavirus-people-in-oldham-told-to-act-now-to-prevent-a-local-lockdown-12047560',
    urlToImage:
      'https://e3.365dm.com/20/08/1600x900/skynews-oldham-greater-manchester_5065387.jpg?20200812093836',
    publishedAt: '2020-08-12T10:18:45Z',
    content: null,
  },
];

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
        // setArticleList(dummyData);
        setIsLoading(false);
      }
    }

    getArticles();
  }, [searchQuery, country, category]);

  return { data: articleList, isLoading, error, hideArticle };
};
