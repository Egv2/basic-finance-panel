import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const MaliVeriler = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firmName: "",
    taxId: "",
    userDescription: "",
    category: "",
    reportPeriod: { month: "", year: "" },
    file: null,
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSave = async () => {
    const form = new FormData();
    form.append("firmName", formData.firmName);
    form.append("taxId", formData.taxId);
    form.append("userDescription", formData.userDescription);
    form.append("category", formData.category);
    form.append("reportPeriod", JSON.stringify(formData.reportPeriod));
    if (formData.file) form.append("file", formData.file);

    try {
      await axios.post("http://localhost:5000/api/financial-data", form);
      alert("Data added successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error adding data:", error);
      alert("Error occurred while adding data.");
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShowModal}>
        Add New Financial Data
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Financial Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                name="firmName"
                value={formData.firmName}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Tax ID Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tax ID number"
                name="taxId"
                value={formData.taxId}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="userDescription"
                value={formData.userDescription}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Report Period</Form.Label>
              <div className="d-flex">
                <Form.Control
                  as="select"
                  name="month"
                  value={formData.reportPeriod.month}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reportPeriod: {
                        ...formData.reportPeriod,
                        month: e.target.value,
                      },
                    })
                  }
                >
                  <option value="">Select month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </Form.Control>
                <Form.Control
                  type="number"
                  placeholder="Year"
                  className="ms-2"
                  name="year"
                  value={formData.reportPeriod.year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reportPeriod: {
                        ...formData.reportPeriod,
                        year: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Category</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Company"
                  type="radio"
                  name="category"
                  value="company"
                  checked={formData.category === "company"}
                  onChange={handleInputChange}
                />
                <Form.Check
                  inline
                  label="Supplier"
                  type="radio"
                  name="category"
                  value="supplier"
                  checked={formData.category === "supplier"}
                  onChange={handleInputChange}
                />
                <Form.Check
                  inline
                  label="Customer"
                  type="radio"
                  name="category"
                  value="customer"
                  checked={formData.category === "customer"}
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MaliVeriler;
