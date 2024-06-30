import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Forms({ customer }) {
  return (
    <>
      {customer.map((val) => (
        <div className="sm: mt-2 sm: border-1 sm: border-black sm: p-2  lg:w-3/4 lg:p-5 ">
          <Form>
            <Row>
              <Col>
              <Form.Label>First Name</Form.Label>
                <Form.Control disabled  placeholder="First name" value={val.first_name} />
              </Col>
              <Col>
              <Form.Label>Last Name</Form.Label>
                <Form.Control disabled placeholder="Last name" value={val.last_name} />
              </Col>
              <div className='mt-4'>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" disabled placeholder="Enter email" value={val.email} />
                </Form.Group></div>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="text" disabled placeholder="Phone number" value={val.phone_number}/>
              </Form.Group>
            </Row>
            
          </Form>
        </div>
      ))}

    </>
  );
}

export default Forms;