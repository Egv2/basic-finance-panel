import React from "react";
import { Container, Row, Col, Tab, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Logoyu doğru yerden import edin
import "../styles.css";

const Login = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={12} className="text-center mb-4">
          {/* Scorist Logosu */}
          <img src={logo} alt="Scorist Logo" style={{ width: "150px" }} />
        </Col>
        <Col md={12}>
          <div className="custom-border">
            <Tab.Container defaultActiveKey="login">
              <Nav variant="pills" className="justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="login">Log in</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="register">Register</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className="mt-4">
                <Tab.Pane eventKey="login">
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="mt-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-4">
                      Log in
                    </Button>
                  </Form>
                  {/* Backend endpoint burada olacak */}
                  <div className="mt-3">
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="register">
                  <Form>
                    <Form.Group controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className="mt-3">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="mt-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-4">
                      Register
                    </Button>
                  </Form>
                  {/* Backend endpoint */}
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
