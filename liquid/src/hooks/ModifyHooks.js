import {useState} from 'react';

const useModifyForm = (callback) => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    filename: '',
    brightness: 100,
    contrast: 100,
    saturation: 100,
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
    setInputs((inputs) => {
      return {
        ...inputs,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSliderChange = (event, value) => {
    if (event.target !== null &&
      event.target.previousElementSibling !== null &&
      event.target.previousElementSibling.name !== undefined) {
      setInputs((inputs) => {
        return {
          ...inputs,
          [event.target.previousElementSibling.name]: value,
        };
      });
    }
  };

  return {
    handleSubmit,
    handleInputChange,
    handleSliderChange,
    inputs,
    setInputs,
  };
};

export default useModifyForm;
