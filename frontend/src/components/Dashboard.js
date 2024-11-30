import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Dropdown,
  Button,
} from "react-bootstrap";
import Cookies from "js-cookie";
import logo from "../assets/logo.png";
import logoWhite from "../assets/logo-w.png";
import {
  FaBars,
  FaChevronDown,
  FaChevronUp,
  FaBell,
  FaChartLine,
  FaFileAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTasks,
  FaCog,
  FaBuilding,
  FaTruck,
  FaUserFriends,
} from "react-icons/fa";

import FinanceData from "./FinanceData";
import Reports from "./Reports";
import CalendarModule from "./Calendar";
import ExchangeRates from "./ExchangeRates";
import TodoList from "./TodoList";
import Settings from "./Settings";
import MaliVeriler from "./MaliVeriler";
import DikeyAnaliz from "./DikeyAnaliz";
import YatayAnaliz from "./YatayAnaliz";
import RasyoAnalizi from "./RasyoAnalizi";
import NakitAkımTablosu from "./NakitAkımTablosu";
import Sirketler from "./Sirketler";
import Tedarikciler from "./Tedarikciler";
import Musteriler from "./Musteriler";

import "../styles.css";

const themes = {
  light: {
    header: { backgroundColor: "#ced1d3", color: "#000" },
    sidebar: { backgroundColor: "#e9ecef", color: "#000" },
    content: { backgroundColor: "#fff", color: "#000" },
    logo: logo,
  },
  dark: {
    header: { backgroundColor: "#343a40", color: "#fff" },
    sidebar: { backgroundColor: "#212529", color: "#fff" },
    content: { backgroundColor: "#e9ecef", color: "#000" },
    logo: logoWhite,
  },
  ocean: {
    header: { backgroundColor: "#0077be", color: "#fff" },
    sidebar: { backgroundColor: "#005f87", color: "#fff" },
    content: { backgroundColor: "#d0efff", color: "#000" },
    logo: logoWhite,
  },
  forest: {
    header: { backgroundColor: "#2d6a4f", color: "#fff" },
    sidebar: { backgroundColor: "#1b4332", color: "#fff" },
    content: { backgroundColor: "#95d5b2", color: "#000" },
    logo: logoWhite,
  },
};

const Dashboard = () => {
  const [theme, setTheme] = useState("light");
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [financeMenuOpen, setFinanceMenuOpen] = useState(false);
  const [modulesMenuOpen, setModulesMenuOpen] = useState(false);
  const [varliklarMenuOpen, setVarliklarMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [fontSize, setFontSize] = useState("medium");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedFontSize = localStorage.getItem("fontSize") || "medium";
    const savedShowSidebar = JSON.parse(localStorage.getItem("showSidebar"));

    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
    }

    if (savedFontSize) {
      setFontSize(savedFontSize);
    }

    setSidebarOpen(savedShowSidebar !== null ? savedShowSidebar : true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("showSidebar", JSON.stringify(sidebarOpen));
    // Temayı ve yazı büyüklüğünü dinamik olarak uygulama
    document.body.className = "";
    document.body.classList.add(`theme-${theme}`);
    document.body.style.fontSize =
      fontSize === "small" ? "14px" : fontSize === "medium" ? "16px" : "18px";
  }, [theme, fontSize, sidebarOpen]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleFontSizeChange = (newFontSize) => {
    setFontSize(newFontSize);
  };

  const handleProfileClick = () => {
    alert("Profile page will be opened!");
  };

  const handleLogout = () => {
    alert("Logged out!");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleFinanceMenu = () => {
    setFinanceMenuOpen(!financeMenuOpen);
  };

  const toggleModulesMenu = () => {
    setModulesMenuOpen(!modulesMenuOpen);
  };

  const toggleVarliklarMenu = () => {
    setVarliklarMenuOpen(!varliklarMenuOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <Container fluid style={{ padding: 0 }}>
      {/* Üst Navbar */}
      <Navbar
        style={themes[theme].header}
        expand="lg"
        className="d-flex align-items-center justify-content-between"
      >
        <Container className="d-flex align-items-center justify-content-between">
          {isMobile && (
            <Button
              variant="outline-secondary"
              onClick={toggleSidebar}
              className="me-3"
            >
              <FaBars />
            </Button>
          )}
          <Navbar.Brand href="#home">
            <img
              src={themes[theme].logo}
              alt="Scorist Logo"
              style={{ width: "100px" }}
            />
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <Dropdown
              align="end"
              show={showNotifications}
              onToggle={toggleNotifications}
              className="me-3"
            >
              <Dropdown.Toggle variant="secondary" id="dropdown-notifications">
                <FaBell />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {notifications.length === 0 ? (
                  <Dropdown.Item>No notifications</Dropdown.Item>
                ) : (
                  notifications.map((notification, index) => (
                    <Dropdown.Item key={index}>
                      {notification.message}
                    </Dropdown.Item>
                  ))
                )}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown align="end">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Settings
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>Theme Settings</Dropdown.Header>
                <Dropdown.Item onClick={() => handleThemeChange("light")}>
                  Light
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleThemeChange("dark")}>
                  Dark
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleThemeChange("ocean")}>
                  Ocean
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleThemeChange("forest")}>
                  Forest
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleProfileClick}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

      {/* Yan Menü ve İçerik */}
      <Row>
        <Col
          md={sidebarOpen ? 2 : 0}
          className={`sidebar ${sidebarOpen ? "open" : "closed"}`}
          style={{ ...themes[theme].sidebar, transition: "all 0.3s" }}
        >
          {sidebarOpen && (
            <Nav className="flex-column">
              {/* Finance Menu */}
              <div
                className="collapsible-menu has-arrow waves-effect"
                onClick={toggleFinanceMenu}
              >
                <FaFileAlt className="me-2" />
                <span>Finance</span>
                {financeMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div className={`submenu ${financeMenuOpen ? "open" : ""}`}>
                <Nav.Link
                  style={{ color: themes[theme].sidebar.color }}
                  onClick={() => setActiveModule("financeData")}
                >
                  <FaFileAlt className="me-2" />
                  Financial Analysis Report
                </Nav.Link>
                <Nav.Link
                  style={{ color: themes[theme].sidebar.color }}
                  onClick={() => setActiveModule("reports")}
                >
                  <FaFileAlt className="me-2" />
                  Reports
                </Nav.Link>
              </div>

              {/* Modules Menu */}
              <div
                className="collapsible-menu has-arrow waves-effect"
                onClick={toggleModulesMenu}
              >
                <FaChartLine className="me-2" />
                <span>Modules</span>
                {modulesMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div className={`submenu ${modulesMenuOpen ? "open" : ""}`}>
                <Nav.Link
                  style={{ color: themes[theme].sidebar.color }}
                  onClick={() => setActiveModule("yatayAnaliz")}
                >
                  <FaChartLine className="me-2" />
                  Horizontal Analysis
                </Nav.Link>
                <Nav.Link
                  style={{ color: themes[theme].sidebar.color }}
                  onClick={() => setActiveModule("rasyoAnalizi")}
                >
                  <FaChartLine className="me-2" />
                  Ratio Analysis
                </Nav.Link>
                <Nav.Link
                  style={{ color: themes[theme].sidebar.color }}
                  onClick={() => setActiveModule("nakitAkımTablosu")}
                >
                  <FaChartLine className="me-2" />
                  Cash Flow Statement
                </Nav.Link>
              </div>

              {/* Assets Menu */}
              <div
                className="collapsible-menu has-arrow waves-effect"
                onClick={toggleVarliklarMenu}
              >
                <FaBuilding className="me-2" />
                <span>Assets</span>
                {varliklarMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div className={`submenu ${varliklarMenuOpen ? "open" : ""}`}>
                <Nav.Link
                  style={{ color: themes[theme].sidebar.color }}
                  onClick={() => setActiveModule("sirketler")}
                >
                  <FaBuilding className="me-2" />
                  Companies
                </Nav.Link>
                <Nav.Link
                  style={{ color: themes[theme].sidebar.color }}
                  onClick={() => setActiveModule("tedarikciler")}
                >
                  <FaTruck className="me-2" />
                  Suppliers
                </Nav.Link>
                <Nav.Link
                  style={{ color: themes[theme].sidebar.color }}
                  onClick={() => setActiveModule("musteriler")}
                >
                  <FaUserFriends className="me-2" />
                  Customers
                </Nav.Link>
              </div>

              {/* Diğer Ana Menü Elemanları */}
              <Nav.Link
                style={{ color: themes[theme].sidebar.color }}
                onClick={() => setActiveModule("calendar")}
              >
                <FaCalendarAlt className="me-2" />
                Calendar
              </Nav.Link>
              <Nav.Link
                style={{ color: themes[theme].sidebar.color }}
                onClick={() => setActiveModule("exchangeRates")}
              >
                <FaMoneyBillWave className="me-2" />
                Exchange Rates
              </Nav.Link>
              <Nav.Link
                style={{ color: themes[theme].sidebar.color }}
                onClick={() => setActiveModule("todo")}
              >
                <FaTasks className="me-2" />
                To-Do List
              </Nav.Link>
              <Nav.Link
                style={{ color: themes[theme].sidebar.color }}
                onClick={() => setActiveModule("settings")}
              >
                <FaCog className="me-2" />
                Settings
              </Nav.Link>
            </Nav>
          )}
        </Col>

        <Col
          md={sidebarOpen ? 10 : 12}
          className="content"
          style={themes[theme].content}
        >
          {/* Ana Modüller */}
          {activeModule === "financeData" && <FinanceData />}
          {activeModule === "reports" && <Reports />}
          {activeModule === "maliVeriler" && <MaliVeriler />}
          {activeModule === "dikeyAnaliz" && <DikeyAnaliz />}
          {activeModule === "yatayAnaliz" && <YatayAnaliz />}
          {activeModule === "rasyoAnalizi" && <RasyoAnalizi />}
          {activeModule === "nakitAkımTablosu" && <NakitAkımTablosu />}
          {activeModule === "calendar" && <CalendarModule />}
          {activeModule === "exchangeRates" && <ExchangeRates />}
          {activeModule === "todo" && <TodoList />}
          {activeModule === "settings" && <Settings />}

          {/* Yeni Varlıklar Modülleri */}
          {activeModule === "sirketler" && <Sirketler />}
          {activeModule === "tedarikciler" && <Tedarikciler />}
          {activeModule === "musteriler" && <Musteriler />}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
