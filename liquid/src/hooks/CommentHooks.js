import {useState} from 'react';


const useCommentForm = (callback) => {
    const [inputs, setInputs] = useState({
        comment: '',
    });
    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    };
    const handleInputChange = (event) => {
      console.log(event.target.name, event.target.value);
      event.persist();
      setInputs( (inputs) => { 
        return {
              ...inputs, 
              [event.target.name]: event.target.value,
            };
        });
    };


    return {
      handleSubmit,
      handleInputChange,
      inputs,
      setInputs,
    };
  };

  export default useCommentForm;