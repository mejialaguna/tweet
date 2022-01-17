import React , {useState} from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutations"
import "./index.css";



function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  
  const [addUser, { loading }] = useMutation(ADD_USER, {
    update(Proxy, result) {
      console.log(result)
    },
    variables: {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword // just values
    }
  })

  const onSubmit = (e) => {
    e.preventDefault();
    addUser()
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name={"username"}
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name={"email"}
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name={"password"}
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name={"confirmPassword"}
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;