import React from 'react';
import PropTypes from "prop-types";
import { useSingleMedia } from "../hooks/ApiHooks"
import Backbutton from '../components/Backbutton';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
     

const Single = ({match, history}) => {
    console.log('match', match.params.id);
    const file = useSingleMedia(match.params.id); 
    let description = undefined;
    if (file !== null) {
      description = (JSON.parse(file.description));
    };
  return (
    <>
    {file !== null &&
    <>
    <Backbutton/>
      <h1>{file.title}</h1>
      {description &&
      <>
      <img style={{
            filter: ` 
                brightness(${description.filters.brightness}%)
                contrast(${description.filters.contrast}%)
                saturate(${description.filters.saturate}%)
                sepia(${description.filters.sepia}%)`,
                    
        }} src={mediaUrl + file.filename} alt={file.title}/>
      <h4>{description.desc}</h4>
      </>
      }
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