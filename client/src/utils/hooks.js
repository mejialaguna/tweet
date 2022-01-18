import { useCallback, useState } from "react";


export const useForm = (Callback, initialState = {}) => {
    
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
}