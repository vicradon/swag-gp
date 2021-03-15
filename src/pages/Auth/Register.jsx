import { Button, Form } from "react-bootstrap";
import MainTemplate from "../../templates/Main/Main";
import { Link, useHistory } from "react-router-dom";
import maxios from "../../utils/maxios";
import { useContext, useState } from "react";
import PulsatingSpinner from "../../components/PulsatingSpinner";
import { AuthContext } from "../../components/AuthProvider";

function Register() {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [duration, setDuration] = useState(4);
  const [gradeSystem, setGradeSystem] = useState(5);
  const baseErrorObject = {
    email: "",
    password: "",
    duration: "",
    gradeSystem: "",
  };
  const [errors, setErrors] = useState(baseErrorObject);

  const { authDispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setErrors(baseErrorObject);
      setLoading(true);
      const { data } = await maxios.post("/api/v1/register", {
        email,
        password,
        grade_system: String(gradeSystem),
        duration: String(duration),
      });
      setLoading(false);
      authDispatch({
        type: "AUTHENTICATE_USER",
        payload: { token: data.token },
      });
    } catch (error) {
      const errObj = {};
      error.response.data.message.forEach((err) => {
        errObj[[err.field]] = err.message;
      });
      setErrors(errObj);
      setLoading(false);
    }
  };
  return (
    <MainTemplate>
      <h3>Register</h3>

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
          <span className="text-danger">{errors.email}</span>
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
          <span className="text-danger">{errors.password}</span>
        </Form.Group>

        <Form.Group>
          <Form.Label>Course Duration</Form.Label>
          <Form.Control
            onChange={({ target }) => setDuration(target.value)}
            value={duration}
            name="duration"
            as="select"
            custom
            required
          >
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <option key={index} value={index + 2}>
                  {index + 2}
                </option>
              ))}
          </Form.Control>
          <span className="text-danger">{errors.duration}</span>
        </Form.Group>

        <Form.Group>
          <Form.Label>Grade System</Form.Label>
          <Form.Control
            onChange={({ target }) => setGradeSystem(target.value)}
            value={gradeSystem}
            name="duration"
            as="select"
            custom
            required
          >
            <option value={4}>4 Point</option>
            <option value={5}>5 Point</option>
          </Form.Control>
          <span className="text-danger">{errors.gradeSystem}</span>
        </Form.Group>

        <Button variant="primary" type="submit">
          <PulsatingSpinner loading={loading} />
          Register
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
