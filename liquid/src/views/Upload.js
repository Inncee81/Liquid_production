import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';
import { uploadPicture } from '../hooks/ApiHooks';

const  Upload = ({history}) => {
    const doUpload = async () => {
        console.log('inputs', inputs);
        try {
            const result = await uploadPicture(inputs, localStorage.getItem('token'));
            console.log(result);
            setTimeout(()=> {
                history.push('/home');
            }, 2000);
        } catch (e) {
            console.log(e.message);
        }
    };

    const {inputs, setInputs, handleInputChange, handleSubmit, handleFileChange} = useUploadForm(doUpload);

    useEffect(() => {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            setInputs((inputs)=>{
                return {
                    ...inputs,
                    dataUrl: reader.result,
                };
            });
        }, false);
        if(inputs.file !== null) {
            reader.readAsDataURL(inputs.file);
        }
    }, [inputs.file, setInputs]);

    return (
        <>
        <h1>ウッポロアド</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title"
                value={inputs.title}
                onChange={handleInputChange}
            />
            <textarea
                name="description"
                value={inputs.description}
                onChange={handleInputChange}
                ></textarea>
            <input
                type="file"
                name="file"
                accept="image/*,video/*,audio/*"
                onChange={handleFileChange}
             />
            <button type="submit">Upload</button>
        </form>
        <img src={inputs.dataUrl} alt="previe"/>
        </>
    )
}

Upload.propTypes = {
    history: PropTypes.object,
};

export default Upload;

