import React, { useState , useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../utils/mutations";
import "./index.css";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../utils/auth";
 
function Register(props) {
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext)
  const { onChange, onSubmit, values } = useForm(SignUser, {
    username: "",
    password: ""
  })
 

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, {data: {login: userData}}) { // instead of data i just destructure the result check register to check or the console.log on the line bellow
      // console.log(result.data.login);
      context.login(userData);
      props.history.push("/"); //take you back to home page
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      username: values.username,
      password: values.password, // or we can use just word => values
    },
  });

  function SignUser() {
   loginUser()
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
          Login
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
