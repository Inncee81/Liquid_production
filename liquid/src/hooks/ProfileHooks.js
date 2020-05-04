import {useState} from 'react';


const useProfileUpdateForm = (user, callback) => {
    const [inputs, setInputs] = useState({    
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        password: '',
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
    return {
      handleSubmit,
      handleInputChange,
      inputs,
      setInputs,
    };
  };

  export default useProfileUpdateForm;
