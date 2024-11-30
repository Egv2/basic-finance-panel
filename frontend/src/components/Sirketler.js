import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const Sirketler = () => {
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyData, setCompanyData] = useState({
    name: "",
    taxId: "",
    description: "",
  });

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

  return (
    <div>
      <h1>Companies</h1>
      <Button variant="primary" onClick={handleShowModal}>
        Yeni Ekle
      </Button>

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

      {/* Yeni Şirket Ekleme Modalı */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Company name"
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

      {/* Şirket Detayları Modalı */}
      {selectedCompany && (
        <Modal
          show={!!selectedCompany}
          onHide={() => setSelectedCompany(null)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Company Details</Modal.Title>
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

export default Sirketler;
