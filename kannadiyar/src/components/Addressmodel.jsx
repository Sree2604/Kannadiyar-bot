import React from "react";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";

function Addressmodel({ addressDetail }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const regions = [
    "Andhra Pradesh",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Northeast",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Ladakh",
    "Jammu and Kashmir",
  ];

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [pincode, setPincode] = useState();
  const [locality, setLocality] = useState();
  const [address, setAddress] = useState();
  const [state, setState] = useState();
  const [district, setDistrict] = useState();
  const [town, setTown] = useState();
  const [email, setEmail] = useState();
  const [others, setOthers] = useState();

  const handleSubmission = (e) => {
    e.preventDefault();
    addressDetail({
      name,
      phone,
      pincode,
      locality,
      address,
      state,
      district,
      town,
      email,
      others,
    });
    setName("");
    setPhone("");
    setPincode("");
    setLocality("");
    setAddress("");
    setState("");
    setDistrict("");
    setTown("");
    setEmail("");
    setOthers("");
    handleClose();
  };

  return (
    <>
      <button
        className="sm: border-1 sm: border-primecolor sm: p-2 sm: rounded-md sm: text-primecolor sm: mt-3 lg:border-1   lg:p-2 lg:rounded-md  "
        onClick={handleShow}
      >
        <div className="flex flex-row">
          <div className="text-xl pr-1">
            <ion-icon name="add-outline"></ion-icon>
          </div>
          ADD NEW ADDRESS
        </div>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className=" text-primecolor text-xl font-content">
            ADD A NEW ADDRESS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmission}>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocs
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the 10 digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoFocus
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Locality</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the locality"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  autoFocus
                />
              </Form.Group>
            </Row>
            <Form.Group
              as={Col}
              md="12"
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>State</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Enter State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  autoFocus
                /> */}
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  autoFocus
                >
                  <option value="">-- Select a region --</option>
                  {regions.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>District</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter District"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                  autoFocus
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Town/City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Town/City"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  required
                  autoFocus
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>How did you hear about us</Form.Label>
                <Form.Control
                  type="text"
                  value={others}
                  onChange={(e) => setOthers(e.target.value)}
                  // required
                  autoFocus
                />
              </Form.Group>
            </Row>
            <Form.Control
              type="Submit"
              className=" border-1 bg-primecolor p-2 px-3 rounded-md text-orange-100"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className=" border-1 bg-primecolor p-2 px-3 rounded-md text-orange-100"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Addressmodel;
