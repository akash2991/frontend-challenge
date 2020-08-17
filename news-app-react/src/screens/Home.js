import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { MainBar, NewsArticleList, Picker } from '../components';
import { useFetchArticles } from '../service';
import { pickerDataCategory, pickerDataCountry } from '../utils';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mainContainer: {
    width: '100%',
    // backgroundColor: 'rgb(211,211,211)',
  },
  pickerContainer: {
    display: 'flex',
    marginTop: 10,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const { data = [], isLoading, error, hideArticle } = useFetchArticles({
    searchQuery,
    country,
    category,
  });

  function handleSearchQuery(e) {
    setSearchQuery(e.target.value);
  }

  function handleKeyPress(event) {
    // event.key;
    console.log('event.key: ', event.key);
    // setSearchQuery(e.target.value);
  }

  return (
    <div
      className={classes.mainContainer}
      onKeyPress={handleKeyPress}
      onKeyDown={handleKeyPress}
    >
      <MainBar handleSearchFieldInput={handleSearchQuery} />

      {isLoading && <LinearProgress color="secondary" />}

      <div className={classes.pickerContainer}>
        <Picker
          pickerData={pickerDataCategory}
          label="Category"
          getPickerValue={setCategory}
        />
        <Picker
          pickerData={pickerDataCountry}
          label="Country"
          getPickerValue={setCountry}
        />
      </div>

      <NewsArticleList data={data} hideArticle={hideArticle} />
    </div>
  );
}
