import { Button, Form } from "react-bootstrap";
import MainTemplate from "../../templates/Main/Main";
import { Link } from "react-router-dom";

function Register() {
  return (
    <MainTemplate>
      <h3>Register</h3>

      <Form className="mb-4">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <div className="d-flex align-items-baseline">
        <p className="mr-2">Have an account? </p>
        <Link to="/auth/login">Login here</Link>
      </div>
    </MainTemplate>
  );
}

export default Register;
