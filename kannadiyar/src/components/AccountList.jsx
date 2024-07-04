import React from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

function AccountList() {
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };
  return (
    <>
      <div className="sm: mt-4 sm: w-fit sm: ml-12">
        <Tab.Container
          id="list-group-tabs-example"
          defaultActiveKey="link1"
          className="lg:bg-slate-300"
        >
          <Row>
            <Col lg={20}>
              <ListGroup>
                <ListGroup.Item action href="/MyAccount" className="px-10">
                  <ion-icon name="person-outline"></ion-icon>&nbsp; My Accounts
                </ListGroup.Item>
                <ListGroup.Item action href="/Order" className="px-10">
                  <ion-icon name="cart-outline"></ion-icon>&nbsp; Orders
                </ListGroup.Item>
                <ListGroup.Item action href="/Address" className="px-10">
                  <ion-icon name="home-outline"></ion-icon>&nbsp; My Address
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="/"
                  onClick={handleLogout}
                  className="px-10"
                >
                  <ion-icon name="person-outline"></ion-icon>&nbsp; Log Out
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="/MyAccount"></Tab.Pane>
                <Tab.Pane eventKey="/Order"></Tab.Pane>
                <Tab.Pane eventKey="/Address"></Tab.Pane>
                <Tab.Pane eventKey="/"></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}

export default AccountList;
