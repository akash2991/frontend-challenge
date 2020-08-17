import React, { memo, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    marginTop: 20,
    marginRight: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  link: {
    marginLeft: 'auto',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function NewsArticleCard({ data, hideArticle }) {
  const {
    source,
    author,
    url,
    // title,
    description,
    urlToImage,
    publishedAt,
    // content,
  } = data;

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleSettingsMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsMenuClick = () => {
    hideArticle();
    setAnchorEl(null);
  };

  const titleString = author ? `${author} | ${source.name}` : source.name;
  const dateString = new Date(publishedAt).toDateString();
  const classes = useStyles();

  const menuId = 'news-card-settings-menu';
  const renderSettingsMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleSettingsMenuClose}
    >
      <MenuItem onClick={handleSettingsMenuClick}>Hide News</MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
    </Menu>
  );

  return (
    <Fragment>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {(author || source.name || '').charAt(0)}
            </Avatar>
          }
          action={
            // <IconButton aria-label="settings">
            //   <MoreVertIcon />
            // </IconButton>
            <IconButton
              edge="end"
              aria-label="settings"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleSettingsMenuOpen}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={titleString}
          subheader={dateString}
        />

        <CardMedia
          className={classes.media}
          image={urlToImage}
          // title="Paella dish"
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            href={url}
            target="blank"
            className={classes.link}
          >
            Read More
          </Button>
        </CardActions>
      </Card>
      {renderSettingsMenu}
    </Fragment>
  );
}

export default memo(NewsArticleCard);
