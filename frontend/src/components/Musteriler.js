import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";

const Tedarikciler = () => {
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
      <h1>Müşteriler</h1>
      <Button variant="primary" onClick={handleShowModal}>
        Yeni Ekle
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Adı</th>
            <th>Vergi Kimlik No</th>
            <th>Açıklama</th>
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

      {/* Yeni Müşteri Ekleme Modalı */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Yeni Müşteri Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Adı</Form.Label>
              <Form.Control
                type="text"
                placeholder="Müşteri adı giriniz"
                value={companyData.name}
                onChange={(e) =>
                  setCompanyData({ ...companyData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Vergi Kimlik No</Form.Label>
              <Form.Control
                type="text"
                placeholder="Vergi kimlik numarası giriniz"
                value={companyData.taxId}
                onChange={(e) =>
                  setCompanyData({ ...companyData, taxId: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Açıklama</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Açıklama giriniz"
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
            Kapat
          </Button>
          <Button variant="primary" onClick={handleSaveCompany}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Müşteri Detayları Modalı */}
      {selectedCompany && (
        <Modal
          show={!!selectedCompany}
          onHide={() => setSelectedCompany(null)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Müşteri Detayları</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Adı:</strong> {selectedCompany.name}
            </p>
            <p>
              <strong>Vergi Kimlik No:</strong> {selectedCompany.taxId}
            </p>
            <p>
              <strong>Açıklama:</strong> {selectedCompany.description}
            </p>

            {/* Boşsa bu mesaj, doluysa listeyi göster */}
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Belge</th>
                  <th>Açıklama</th>
                </tr>
              </thead>
              <tbody>
                {/* Placeholder veri - Boşsa "Veri yok" */}
                <tr>
                  <td colSpan="2">Bu öğeye ait veri yok</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDeleteCompany}>
              Sil
            </Button>
            <Button
              variant="secondary"
              onClick={() => setSelectedCompany(null)}
            >
              Kapat
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Tedarikciler;
