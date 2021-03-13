import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import MainTemplate from "../../templates/Main/Main";
import styles from "./styles.module.css";
import icons from "../../components/icons.jsx";
import CrudModal from "./CrudModal";
import maxios from "../../utils/maxios";
import { AuthContext } from "../../components/AuthProvider";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [courses, setCourses] = useState([]);
  const [crudModalVisible, setCrudModalVisible] = useState(false);
  const [createMode, setCreateMode] = useState(true);
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      if (authState.isAuthenticated) {
        const { data: courses } = await maxios.get("/api/v1/courses");
        setCourses(courses);

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }, []);

  return (
    <MainTemplate>
      <h3>Levels</h3>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form.Group>
          <Form.Label>Select level</Form.Label>
          <Form.Control
            as="select"
            custom
            defaultValue="Select Feedback"
            required
          >
            <option disabled value="Select Feedback">
              Select level
            </option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
          </Form.Control>
        </Form.Group>

        <p>CGPA: 3.5</p>
      </div>

      <div className="mb-4">
        <div className="flex align-items-baseline">
          <Button
            variant={selectedSemester === 1 ? "primary" : "outline-primary"}
            className={styles.left_button}
            onClick={() => setSelectedSemester(1)}
          >
            Semester 1
          </Button>
          <Button
            variant={selectedSemester === 2 ? "primary" : "outline-primary"}
            className={styles.right_button}
            onClick={() => setSelectedSemester(2)}
          >
            Semester 2
          </Button>
        </div>
      </div>

      <div className="mb-4 bg-white shadow-sm rounded border">
        <div className="d-flex justify-content-between align-items-center p-3">
          <h5>Courses</h5>
          <Button
            className="d-flex justify-content-between align-items-center"
            size="sm"
            onClick={() => setCrudModalVisible(true)}
          >
            <span className="font-size-1-5rem">&#43;</span>
            <span className="ml-2">Add Course</span>
          </Button>
        </div>

        <Loader loading={loading} />

        {!loading && (
          <Table striped borderless hover responsive>
            <thead>
              <tr>
                <th className="text-primary">S/N</th>
                <th className="text-primary">Title</th>
                <th className="text-primary">Grade</th>
                <th className="text-primary">Credit Load</th>
                <th className="text-primary">Code</th>
                <th className="text-primary">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>Some Course</td>
                <td>A</td>
                <td>3</td>
                <td>SOM 204</td>
                <td>
                  <Button variant="transparent">
                    <img width={20} src={icons.edit} alt="edit" />
                  </Button>
                  <Button variant="transparent">
                    <img width={20} src={icons.trash} alt="delete" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>

      <div className="d-flex justify-content-between p-4 align-items-center bg-white shadow-sm rounded mb-4 border">
        <div className="d-flex align-items-center">
          <div>
            <img src={icons.courses} alt="courses" />
          </div>
          <span className="ml-2">18 Courses</span>
        </div>
        <div className="d-flex align-items-center">
          <div>
            <img src={icons.units} alt="units" />
          </div>
          <span className="ml-2">28 Units</span>
        </div>
        <div className="d-flex align-items-center">
          <div>
            <img src={icons.gpa} alt="gpa" />
          </div>
          <span className="ml-2">4.43 GPA</span>
        </div>
      </div>

      <CrudModal
        createMode={createMode}
        setCreateMode={setCreateMode}
        crudModalVisible={crudModalVisible}
        setCrudModalVisible={setCrudModalVisible}
      />
    </MainTemplate>
  );
};

export default Home;
