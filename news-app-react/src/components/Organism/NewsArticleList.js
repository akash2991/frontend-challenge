import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NewsArticleCard } from '../Molecules';
import { HeadingText } from '../Atoms';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function NewsArticleList({ data = [], hideArticle }) {
  const classes = useStyles();
  const NewsList = data.map((item, index) => (
    <NewsArticleCard
      key={item.title}
      data={item}
      hideArticle={() => hideArticle(index)}
    />
  ));
  const EmptyMessage = (
    <HeadingText text="News is not available. Please refresh the page" />
  );

  return (
    <div className={classes.cardContainer}>
      {data.length ? NewsList : EmptyMessage}
    </div>
  );
}

export default memo(NewsArticleList);
