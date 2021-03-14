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
  const [selectedLevel, setSelectedLevel] = useState(100);
  const [courses, setCourses] = useState([]);
  const [crudModalVisible, setCrudModalVisible] = useState(false);
  const [createMode, setCreateMode] = useState(true);
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [cumulative, setCumulative] = useState({});
  const [editedCourseDetails, setEditedCourseDetails] = useState({});
  const [courseUpdated, setCourseUpdated] = useState(Math.random());
  const updateCourseTable = (course) => {
    setCourses([...courses, course]);
  };

  const handleEdit = (id) => {
    const course = courses.find((c) => c.id === id);
    setEditedCourseDetails(course);
    setCreateMode(false);
    setCrudModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const deletionResponse = await maxios.delete(`/api/v1/courses/${id}`);
      setCourses(courses.filter((course) => course.id !== id));
      setCumulative({
        semester: deletionResponse.data.semester_cumulative,
        overall: deletionResponse.data.cumulative,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(async () => {
    try {
      if (authState.isAuthenticated) {
        const { data: courses } = await maxios.get(
          `/api/v1/courses?semester=${selectedSemester}&level=${selectedLevel}`
        );
        const { data: cumulative } = await maxios.get(
          `/api/v1/cumulative?semester=${selectedSemester}&level=${selectedLevel}`
        );

        setCourses(courses);
        setCumulative({
          semester: cumulative.semester_cumulative,
          overall: cumulative.cumulative,
        });

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }, [selectedLevel, selectedSemester, courseUpdated]);

  return (
    <MainTemplate>
      <h3>Levels</h3>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form.Group>
          <Form.Label>Select level</Form.Label>
          <Form.Control
            as="select"
            custom
            required
            value={selectedLevel}
            onChange={({ target }) => setSelectedLevel(target.value)}
          >
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
          </Form.Control>
        </Form.Group>

        <p>
          CGPA: {cumulative.overall && cumulative.overall.grade_point_average}
        </p>
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
            onClick={() => {
              setCrudModalVisible(true);
              setCreateMode(true);
            }}
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
                <th className="text-primary">Code</th>
                <th className="text-primary">Grade</th>
                <th className="text-primary">Credit Load</th>
                <th className="text-primary">Title</th>
                <th className="text-primary">Actions</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course, index) => (
                <tr key={course.id}>
                  <td>{index + 1}</td>
                  <td>{course.code}</td>
                  <td>{course.grade}</td>
                  <td>{course.credit_load}</td>
                  <td>{course.title}</td>
                  <td>
                    <Button
                      onClick={() => handleEdit(course.id)}
                      variant="transparent"
                    >
                      <img width={20} src={icons.edit} alt="edit" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(course.id)}
                      variant="transparent"
                    >
                      <img width={20} src={icons.trash} alt="delete" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {!courses.length && <p className="text-center">No Courses</p>}
      </div>

      <div className="d-flex flex-wrap justify-content-between px-4 py-3 align-items-center bg-white shadow-sm rounded mb-4 border">
        <div className="d-flex align-items-center my-2">
          <div>
            <img src={icons.courses} alt="courses" />
          </div>
          <span className="ml-2">
            {cumulative.semester && cumulative.semester.course_count} Courses
          </span>
        </div>
        <div className="d-flex align-items-center my-2">
          <div>
            <img src={icons.units} alt="units" />
          </div>
          <span className="ml-2">
            {cumulative.semester && cumulative.semester.credit_load} Units
          </span>
        </div>
        <div className="d-flex align-items-center my-2">
          <div>
            <img src={icons.gpa} alt="gpa" />
          </div>
          <span className="ml-2">
            {cumulative.semester && cumulative.semester.grade_point_average} GPA
          </span>
        </div>
      </div>

      <CrudModal
        createMode={createMode}
        setCreateMode={setCreateMode}
        crudModalVisible={crudModalVisible}
        setCrudModalVisible={setCrudModalVisible}
        selectedLevel={selectedLevel}
        selectedSemester={selectedSemester}
        updateCourseTable={updateCourseTable}
        setCumulative={setCumulative}
        editedCourseDetails={editedCourseDetails}
        setEditedCourseDetails={setEditedCourseDetails}
        setCourseUpdated={setCourseUpdated}
      />
    </MainTemplate>
  );
};

export default Home;
