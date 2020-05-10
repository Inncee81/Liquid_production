import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MediaRow from './mediaRow';
import {useAllMedia} from '../hooks/ApiHooks';
import {
  GridList,
  GridListTile,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import { MediaContext } from '../contexts/MediaContext';

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

const MyTable = ({tag, profile}) => {
    const [user] =useContext(MediaContext);
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const picArray = useAllMedia(tag);

  console.log(picArray);
  let newPicArray;
  if(picArray.length > 0 && user !== null) {
    newPicArray = picArray.filter(pic => pic.user_id === user.user_id);
    }

  return (
    <div className={classes.root}>
      {user !== null && picArray.length > 0 && (
        <GridList
          cellHeight={200}
          className={classes.gridList}
          cols={matches ? 3 : 2}
          style={{ background: "#DFDFDF" }}
        >
          {newPicArray.map((file) => (
            <GridListTile key={file.file_id}>
              <MediaRow file={file} profile={true} />
            </GridListTile>
          ))}
        </GridList>
      )}
    </div>
  );
};

MyTable.propTypes = {
    tag: PropTypes.string,
    profile: PropTypes.bool,
  };

export default MyTable;

