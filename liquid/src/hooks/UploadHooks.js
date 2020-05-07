import {useState} from 'react';


const useUploadForm = (callback) => {
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        file: null,
        dataUrl:'',
        brightness: 100,
        contrast: 100,
        hue: 100,
        sepia: 0,
        review: '3',
        
    });
    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    };
    const handleInputChange = (event) => {
      event.persist();
      setInputs( (inputs) => { 
        return {
              ...inputs, 
              [event.target.name]: event.target.value,
            };
        });
    };

    const handleFileChange = (event) => {
        event.persist();
        setInputs( (inputs) => { 
            return {
                  ...inputs, 
                  file: event.target.files[0],
                };
            });

    };


    return {
      handleSubmit,
      handleInputChange,
      handleFileChange, 
      inputs,
      setInputs,
    };
  };

  export default useUploadForm;