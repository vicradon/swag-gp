import MainTemplate from "../../templates/Main/Main";
import Icons from "../../components/icons.jsx";
import { Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import maxios from "../../utils/maxios";
import Loader from "../../components/Loader/Loader";
import PulsatingSpinner from "../../components/PulsatingSpinner";

function Profile() {
  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    school: "",
    department: "",
  });
  const [loading, setLoading] = useState(true);
  const [profileUpdating, setProfileUpdating] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  useEffect(async () => {
    try {
      const ajaxRes = await maxios.get("/api/v1/users/profile");
      setProfileDetails(ajaxRes.data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setProfileDetails({ ...profileDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setProfileUpdating(true);

    maxios
      .patch("/api/v1/users/profile", profileDetails)
      .then(({ data }) => {
        console.log(data);
        setProfileDetails(data.user);
        setProfileUpdating(false);
        setProfileModalVisible(false);
      })
      .catch((error) => {
        console.error(error.message);
        setProfileUpdating(false);
      });
  };

  return (
    <MainTemplate>
      <div className="d-flex align-items-baseline">
        <h3 className="mr-3">Profile</h3>
        <img
          onClick={() => setProfileModalVisible(true)}
          src={Icons.edit}
          alt="edit"
        />
      </div>

      <Loader loading={loading} />
      {!loading && (
        <div className="p-3 border rounded shadow-sm">
          <div className="mb-4">
            <span className="mr-4">First Name</span>
            <span>{profileDetails.firstName || "-"}</span>
          </div>
          <div className="mb-4">
            <span className="mr-4">Last Name</span>
            <span>{profileDetails.lastName || "-"}</span>
          </div>
          <div className="mb-4">
            <span className="mr-4">Email</span>
            <span>{profileDetails.email || "-"}</span>
          </div>
          <div className="mb-4">
            <span className="mr-4">Department</span>
            <span>{profileDetails.department || "-"}</span>
          </div>
          <div className="mb-4">
            <span className="mr-4">School</span>
            <span>{profileDetails.school || "-"}</span>
          </div>
        </div>
      )}

      <Modal
        centered
        show={profileModalVisible}
        onHide={() => setProfileModalVisible(false)}
      >
        <Modal.Title className="p-3">Update Profile</Modal.Title>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                value={profileDetails.firstName || ""}
                name="firstName"
                required
                type="text"
                placeholder="e.g. John"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                value={profileDetails.lastName || ""}
                required
                name="lastName"
                type="text"
                placeholder="e.g. Wick"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                value={profileDetails.department || ""}
                required
                name="department"
                type="text"
                placeholder="e.g. Mechanical Engineering"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>School</Form.Label>
              <Form.Control
                onChange={handleInputChange}
                value={profileDetails.school || ""}
                required
                name="school"
                type="text"
                placeholder="e.g. Federal University of Technology, Owerri"
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                <PulsatingSpinner loading={profileUpdating} />
                Update Profile
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </MainTemplate>
  );
}

export default Profile;
