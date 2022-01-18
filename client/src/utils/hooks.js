import { useState } from "react";

export const useForm = (Callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    Callback();
    // window.location.assign("/");
  };
  return {
    onChange,
    onSubmit,
    values,
  };
};

