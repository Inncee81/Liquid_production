import React from 'react';
import PropTypes from "prop-types";
import { useSingleMedia } from "../hooks/ApiHooks";
import Backbutton from '../components/Backbutton';
import Media from '../components/Media';


     

const Single = ({match, history}) => {
    console.log('match', match.params.id);
    const file = useSingleMedia(match.params.id); 
    let description = undefined;
    if (file !== null) {
      description = (JSON.parse(file.description));
    };
    console.log("single file", file);
    
  return (
    <>
    {file !== null &&
    <>
    <Backbutton/>
      <h1>{file.title}</h1>
      {description &&
      <>
      <h2>{file.user ? file.user.username : 'login to see userdata'} </h2>
      <Media file={file} description={description} />
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