import React from 'react';
import PropTypes from "prop-types";
import { useSingleMedia } from "../hooks/ApiHooks"
import Backbutton from '../components/Backbutton';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
     

const Single = ({match, history}) => {
    console.log('match', match.params.id);
    const file = useSingleMedia(match.params.id); 
  return (
    <>
    {file !== null &&
    <>
    <Backbutton/>
      <h1>{file.title}</h1>
      <img src={mediaUrl + file.filename} alt={file.title}/>
      <h4>{file.description}</h4>
      </>
      }
      <Backbutton/>
    </>
  );
};


Single.propTypes = {
    match: PropTypes.object,
  };

export default Single;