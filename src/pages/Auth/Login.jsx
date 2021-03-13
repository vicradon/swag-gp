import { Button, Form } from "react-bootstrap";
import MainTemplate from "../../templates/Main/Main";
import { Link, useHistory } from "react-router-dom";
import maxios from "../../utils/maxios";
import { useContext, useState } from "react";
import PulsatingSpinner from "../../components/PulsatingSpinner";
import { AuthContext } from "../../components/AuthProvider";

function Login() {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authDispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const { data } = await maxios.post("/api/v1/login", {
        email,
        password,
      });
      setLoading(false);
      authDispatch({
        type: "AUTHENTICATE_USER",
        payload: { token: data.token },
      });
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
