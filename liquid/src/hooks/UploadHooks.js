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

    const handleSliderChange = (event, value) => {
      if (event.target.previousElementSibling !== null &&
          event.target.previousElementSibling.name !== undefined && event.target !== null) {
        setInputs( (inputs) => { 
          return {
                ...inputs, 
                [event.target.previousElementSibling.name]: value,
              };
          });
      };
    };

    return {
      handleSubmit,
      handleInputChange,
      handleFileChange, 
      inputs,
      setInputs,
      handleSliderChange, 
    };
  };

  export default useUploadForm;