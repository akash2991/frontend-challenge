import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { SearchField, HeadingText, MenuButton } from '../Atoms';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

function MainBar({ handleSearchFieldInput }) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <MenuButton />

          <HeadingText text="News App" />

          <SearchField handleSearchFieldInput={handleSearchFieldInput} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default memo(MainBar);
