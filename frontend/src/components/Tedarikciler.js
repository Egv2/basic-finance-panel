import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  ListGroup,
  InputGroup,
} from "react-bootstrap";

const Tedarikciler = () => {
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyData, setCompanyData] = useState({
    name: "",
    taxId: "",
    description: "",
  });
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setCompanyData({ name: "", taxId: "", description: "" });
  };

  const handleSaveCompany = () => {
    setCompanies([...companies, companyData]);
    handleCloseModal();
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const handleDeleteCompany = () => {
    setCompanies(companies.filter((company) => company !== selectedCompany));
    setSelectedCompany(null);
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAddTodo = () => {
    if (newTodoText.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoText("");
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <p style={{ fontStyle: "italic" }}>
        Click on tasks to mark them as completed
      </p>
      <ListGroup className="mb-3">
        {todos.map((todo) => (
          <ListGroup.Item
            key={todo.id}
            onClick={() => handleToggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
              backgroundColor: "#fff",
              color: "#000",
            }}
          >
            {todo.text}
            <Form.Check
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              style={{ float: "right" }}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Enter new task..."
          aria-label="New task"
          aria-describedby="basic-addon2"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={handleAddTodo}>
          Add
        </Button>
      </InputGroup>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tax ID number</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => (
            <tr key={index} onClick={() => handleCompanyClick(company)}>
              <td>{company.name}</td>
              <td>{company.taxId}</td>
              <td>{company.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Yeni Tedarikçi Ekleme Modalı */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Supplier name"
                value={companyData.name}
                onChange={(e) =>
                  setCompanyData({ ...companyData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Tax ID number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tax ID number"
                value={companyData.taxId}
                onChange={(e) =>
                  setCompanyData({ ...companyData, taxId: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                value={companyData.description}
                onChange={(e) =>
                  setCompanyData({
                    ...companyData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveCompany}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Tedarikçi Detayları Modalı */}
      {selectedCompany && (
        <Modal
          show={!!selectedCompany}
          onHide={() => setSelectedCompany(null)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Supplier Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Name:</strong> {selectedCompany.name}
            </p>
            <p>
              <strong>Tax ID number:</strong> {selectedCompany.taxId}
            </p>
            <p>
              <strong>Description:</strong> {selectedCompany.description}
            </p>

            {/* Boşsa bu mesaj, doluysa listeyi göster */}
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {/* Placeholder veri - Boşsa "Veri yok" */}
                <tr>
                  <td colSpan="2">No data</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDeleteCompany}>
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => setSelectedCompany(null)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Tedarikciler;
