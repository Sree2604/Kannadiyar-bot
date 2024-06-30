import React from "react";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";

function EditAddressmodel({ addressDetail,oldAddress }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [id,setId] = useState(oldAddress.id);
  const [name, setName] = useState(oldAddress.name);
  const [phone, setPhone] = useState(oldAddress.phone);
  const [pincode, setPincode] = useState(oldAddress.pincode);
  const [locality, setLocality] = useState(oldAddress.locality);
  const [address, setAddress] = useState(oldAddress.address);
  const [state, setState] = useState(oldAddress.state);
  const [district, setDistrict] = useState(oldAddress.district);
  const [town, setTown] = useState(oldAddress.town);
  const [email, setEmail] = useState(oldAddress.email);
  const [others, setOthers] = useState(oldAddress.others);

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
    },id);
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
        onClick={handleShow}
      >
        <div className="flex flex-row">
        <ion-icon name="create-outline"></ion-icon>
        </div>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className=" text-primecolor text-xl font-content">
            EDIT ADDRESS
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
                <Form.Control
                  type="text"
                  placeholder="Enter State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
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
              className="border-1 bg-primecolor p-2 px-3 rounded-md text-orange-100"
            />  
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className=" border-1  bg-primecolor p-2 px-3 rounded-md text-orange-100"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditAddressmodel;
