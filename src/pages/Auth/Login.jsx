import { Button, Form } from "react-bootstrap";
import MainTemplate from "../../templates/Main/Main";
import { Link } from "react-router-dom";
import maxios from "../../utils/maxios";
import { useState } from "react";
import PulsatingSpinner from "../../components/PulsatingSpinner";

function Login() {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { data: data1 } = await maxios.get("/");
      const { data } = await maxios.post("/api/v1/login", {
        email,
        password,
      });
      console.log(data1);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <MainTemplate>
      <h3>Login</h3>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          <PulsatingSpinner loading={loading} />
          Login
        </Button>
      </Form>
      <div className="d-flex align-items-baseline">
        <p className="mr-2">No account? </p>
        <Link to="/auth/register">Register here</Link>
      </div>
    </MainTemplate>
  );
}

export default Login;
