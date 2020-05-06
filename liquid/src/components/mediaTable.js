import React from 'react';
import MediaRow from './mediaRow';
import {useAllMedia} from '../hooks/ApiHooks';
import {
  GridList,
  GridListTile,
  ListSubheader,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const MediaTable = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const picArray = useAllMedia();

  console.log(picArray);

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={250}
        className={classes.gridList}
        cols={matches ? 1 : 1}>
        <GridListTile key="Subheader" cols={1} style={{height: 'auto'}}>
          <ListSubheader component="div">All Media</ListSubheader>
        </GridListTile>
        {
          picArray.map((file) =>
            <GridListTile key={file.file_id}>
              <MediaRow file={file}/>
            </GridListTile>)
        }
      </GridList>
    </div>
  );
};

export default MediaTable;

