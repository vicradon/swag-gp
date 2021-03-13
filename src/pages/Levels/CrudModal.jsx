import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import PulsatingSpinner from "../../components/PulsatingSpinner";
import maxios from "../../utils/maxios";

function CrudModal({
  createMode,
  setCreateMode,
  crudModalVisible,
  setCrudModalVisible,
  editedCourseDetails,
  semesterAndLevel,
}) {
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    credit_load: 3,
    code: "",
    grade: "A",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setCourseDetails({ ...courseDetails, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const { semester, level } = semesterAndLevel;
      if (createMode) {
        const { data: course_res } = maxios.post("/api/v1/courses", {
          ...courseDetails,
          semester,
          level,
        });
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      centered
      show={crudModalVisible}
      onHide={() => setCrudModalVisible(false)}
    >
      <Modal.Title className="p-3">
        {createMode ? "Add New Course" : "Update Course"}
      </Modal.Title>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Course Code</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              value={courseDetails.code}
              name="code"
              required
              type="text"
              placeholder="e.g. MTH 320"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Course Title</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              value={courseDetails.title}
              name="title"
              required
              type="text"
              placeholder="e.g. Everyday Mathematics"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Credit Load</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              value={courseDetails.credit_load}
              name="credit_load"
              as="select"
              custom
              required
            >
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Grade</Form.Label>
            <Form.Control
              onChange={handleInputChange}
              value={courseDetails.grade}
              name="grade"
              as="select"
              custom
              required
            >
              {["A", "B", "C", "D", "F"].map((letter, index) => (
                <option key={index} value={letter}>
                  {letter}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              <PulsatingSpinner loading={loading} />

              {createMode ? "Add Course" : "Update Course"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CrudModal;
