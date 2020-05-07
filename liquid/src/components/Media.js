import React from 'react';
import PropTypes from 'prop-types';


const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Media = ({file, description}) => {
    return (
        <>{file.media_type === 'image' &&
        <>
            <img src={mediaUrl + file.filename} alt={file.title}/>
            {description.review && 
            <p>{description.review}/5</p>
            }
            </>
            }
            {file.media_type === 'video' &&
            <video
                src={mediaUrl + file.filename}
                controls
            />
            }
            {file.media_type === 'audio' &&
            <audio src={mediaUrl + file.filename} controls/>
            }
    
        </>
    )
}

Media.propTypes = {
    file: PropTypes.object,
    description: PropTypes.object,
};

export default Media;

