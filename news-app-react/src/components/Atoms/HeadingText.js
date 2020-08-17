import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      overflow: 'visible',
    },
  },
}));

const HeadingText = ({text}) => {
  const classes = useStyles();
  return (
    <Typography className={classes.title} variant="h6" noWrap>
      {text}
    </Typography>
  );
};

export default memo(HeadingText);
