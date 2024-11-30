import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";

const Settings = () => {
  const themeOptions = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "ocean", label: "Ocean" },
    { value: "forest", label: "Forest" },
  ];

  const fontSizeOptions = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");
  const [showSidebar, setShowSidebar] = useState(true);

  // Kullanıcı tercihlerini yükleme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedFontSize = localStorage.getItem("fontSize") || "medium";
    const savedShowSidebar = JSON.parse(localStorage.getItem("showSidebar"));

    setTheme(savedTheme);
    setFontSize(savedFontSize);
    setShowSidebar(savedShowSidebar !== null ? savedShowSidebar : true);
  }, []);

  // Tercihleri kaydetme
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("showSidebar", JSON.stringify(showSidebar));
    // Sayfayı yenilemek yerine temayı dinamik olarak değiştirmek için aşağıdaki kodu kullanabilirsiniz
    document.body.className = "";
    document.body.classList.add(`theme-${theme}`);
    document.body.style.fontSize =
      fontSize === "small" ? "14px" : fontSize === "medium" ? "16px" : "18px";
  }, [theme, fontSize, showSidebar]);

  const handleThemeChange = (selectedOption) => {
    setTheme(selectedOption.value);
  };

  const handleFontSizeChange = (selectedOption) => {
    setFontSize(selectedOption.value);
  };

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const handleResetSettings = () => {
    setTheme("light");
    setFontSize("medium");
    setShowSidebar(true);
    localStorage.removeItem("theme");
    localStorage.removeItem("fontSize");
    localStorage.removeItem("showSidebar");
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Settings</h1>

      <Form>
        {/* Tema Seçimi */}
        <Form.Group as={Row} controlId="themeSelect" className="mb-3">
          <Form.Label column sm={2}>
            Theme
          </Form.Label>
          <Col sm={10}>
            <Select
              options={themeOptions}
              value={themeOptions.find((option) => option.value === theme)}
              onChange={handleThemeChange}
              isSearchable
            />
          </Col>
        </Form.Group>

        {/* Yazı Büyüklüğü Seçimi */}
        <Form.Group as={Row} controlId="fontSizeSelect" className="mb-3">
          <Form.Label column sm={2}>
            Font Size
          </Form.Label>
          <Col sm={10}>
            <Select
              options={fontSizeOptions}
              value={fontSizeOptions.find(
                (option) => option.value === fontSize
              )}
              onChange={handleFontSizeChange}
              isSearchable
            />
          </Col>
        </Form.Group>

        {/* Yan Menü Göster/Gizle */}
        <Form.Group as={Row} controlId="sidebarToggle" className="mb-3">
          <Form.Label column sm={2}>
            Show Sidebar
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="switch"
              id="sidebar-switch"
              label={showSidebar ? "Enabled" : "Disabled"}
              checked={showSidebar}
              onChange={handleSidebarToggle}
            />
          </Col>
        </Form.Group>

        {/* Ayarları Sıfırla */}
        <Button variant="danger" onClick={handleResetSettings} className="mt-3">
          Reset to Default
        </Button>
      </Form>
    </Container>
  );
};

export default Settings;
