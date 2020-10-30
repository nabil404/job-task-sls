import { useState } from "react";

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  const onValueChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return [values, setValues, onValueChange];
};

export default useForm;
