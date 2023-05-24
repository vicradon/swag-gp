import { useContext, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import styles from "./styles.module.css";
import icons from "components/Icons";
import CrudModal from "./CrudModal";
import maxios from "utils/maxios.js";
import { AuthContext } from "context/AuthProvider";
import Loader from "components/Loader";
import { Course, Cumulative } from "utils/types";
import HomeLayout from "Layout/HomeLayout";

const Levels = () => {
  const DEFAULT_PROFILE_DURATION = 5;
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState(100);
  const [courses, setCourses] = useState<Course[]>([]);
  const [crudModalVisible, setCrudModalVisible] = useState(false);
  const [createMode, setCreateMode] = useState(true);
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [cumulative, setCumulative] = useState<{
    semester: Cumulative;
    overall: Cumulative;
  }>({
    semester: {
      grade_point_average: null,
      course_count: null,
      credit_load: null,
    },
    overall: {
      grade_point_average: null,
      course_count: null,
      credit_load: null,
    },
  });
  const [editedCourseDetails, setEditedCourseDetails] = useState<Course>();
  const [courseUpdated, setCourseUpdated] = useState(Math.random());
  const [duration, setDuration] = useState(DEFAULT_PROFILE_DURATION);

  const updateCourseTable = (course: Course) => {
    setCourses([...courses, course]);
  };

  const handleEdit = (id: number | string) => {
    const course = courses.find((c) => c.id === id);
    setEditedCourseDetails(course);
    setCreateMode(false);
    setCrudModalVisible(true);
  };

  const handleDelete = async (id: number | string) => {
    if (authState.isAuthenticated) {
      const deletionResponse = await maxios.delete(`/api/v1/courses/${id}`);
      setCourses(courses.filter((course) => course.id !== id));
      setCumulative({
        semester: deletionResponse.data.semester_cumulative,
        overall: deletionResponse.data.cumulative,
      });
    } else {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (authState.isAuthenticated) {
          const { data: courses } = await maxios.get(
            `/api/v1/courses?semester=${selectedSemester}&level=${selectedLevel}`
          );
          const { data: cumulative } = await maxios.get(
            `/api/v1/cumulative?semester=${selectedSemester}&level=${selectedLevel}`
          );
          const { data: profile } = await maxios.get("/api/v1/users/profile");

          setDuration(profile.duration || DEFAULT_PROFILE_DURATION);

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
    }
    fetchData();
  }, [
    selectedLevel,
    selectedSemester,
    courseUpdated,
    authState.isAuthenticated,
  ]);

  return (
    <HomeLayout>
      <h3>Levels</h3>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form.Group>
          <Form.Label>Select level</Form.Label>
          <Form.Control
            as="select"
            required
            value={selectedLevel}
            onChange={({ target }) => setSelectedLevel(Number(target.value))}
          >
            {Array(duration)
              .fill(0)
              .map((_, index) => (
                <option key={index} value={(index + 1) * 100}>
                  {(index + 1) * 100}
                </option>
              ))}
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
    </HomeLayout>
  );
};

export default Levels;
