import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";
import "./index.css";

function Register(props) {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log(result);
      props.history.push("/"); //take you back to home page
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      username: values.username,
      email: values.email,
      password: values.password, // or we can use just values
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser();
    // window.location.assign("/");
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name={"username"}
          value={values.username}
          onChange={onChange}
          type="username"
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name={"password"}
          value={values.password}
          onChange={onChange}
          type="password"
        />
        <Button
          type="submit"
          primary
          disabled={
            !(
              values.password &&
              values.username
            )
          }
        >
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Register;
