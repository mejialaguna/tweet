import React, { useState , useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutations";
import "./index.css";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../utils/auth"

function Register(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({});


  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(ADD_USER, {
    update(_, {data: {login : userData}}) { // firs we get the result instead of destructuring it just result
      context.login(userData); // result.data.login
      // console.log(result.data.login);
      props.history.push("/"); //take you back to home page
    },
     onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword, // or we can use just word => values
    },
  });

  function registerUser(){
      addUser()
  }

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
          label="Email"
          placeholder="Email"
          name={"email"}
          value={values.email}
          onChange={onChange}
          type="email"
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name={"password"}
          value={values.password}
          onChange={onChange}
          type="password"
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name={"confirmPassword"}
          value={values.confirmPassword}
          onChange={onChange}
          type="password"
        />
        <Button
          type="submit"
          primary
          disabled={
            !(
              values.email &&
              values.password &&
              values.confirmPassword &&
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
