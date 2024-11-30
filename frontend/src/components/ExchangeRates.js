import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Container,
  Spinner,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import Select from "react-select";

const ExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [selectedCurrencies, setSelectedCurrencies] = useState(["EUR"]);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Döviz kurlarını çekme
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
        );
        setExchangeRates(Object.entries(response.data.rates));
        setAvailableCurrencies(Object.keys(response.data.rates));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, [baseCurrency]);

  // Kullanıcı tercihlerini yerel depolamadan yükleme
  useEffect(() => {
    const savedCurrencies = JSON.parse(
      localStorage.getItem("selectedCurrencies")
    );
    if (
      savedCurrencies &&
      Array.isArray(savedCurrencies) &&
      savedCurrencies.length > 0
    ) {
      setSelectedCurrencies(savedCurrencies);
    }
  }, []);

  // Kullanıcı tercihlerini yerel depolamaya kaydetme
  useEffect(() => {
    localStorage.setItem(
      "selectedCurrencies",
      JSON.stringify(selectedCurrencies)
    );
  }, [selectedCurrencies]);

  // Kur ekleme işlemi
  const handleAddCurrency = (selectedOption) => {
    if (selectedOption && !selectedCurrencies.includes(selectedOption.value)) {
      setSelectedCurrencies([...selectedCurrencies, selectedOption.value]);
    }
  };

  // Kur silme işlemi
  const handleRemoveCurrency = (currency) => {
    setSelectedCurrencies(selectedCurrencies.filter((cur) => cur !== currency));
  };

  // Çevirme işlemi
  const handleConvert = () => {
    if (targetCurrency === baseCurrency) {
      setConvertedAmount(amount);
      return;
    }
    const rate = exchangeRates.find(
      ([currency]) => currency === targetCurrency
    )[1];
    setConvertedAmount((amount * rate).toFixed(2));
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>Loading exchange rates...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <h2>Error fetching exchange rates: {error}</h2>
      </Container>
    );
  }

  // react-select için seçeneklerin hazırlanması
  const currencyOptions = availableCurrencies
    .map((currency) => ({
      value: currency,
      label: currency,
    }))
    .filter((option) => !selectedCurrencies.includes(option.value));

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Exchange Rates</h1>

      {/* Döviz Kurları Tablosu */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map(
            ([currency, rate]) =>
              selectedCurrencies.includes(currency) && (
                <tr key={currency}>
                  <td>{currency}</td>
                  <td>{rate}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveCurrency(currency)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>

      {/* Yeni Döviz Ekleme */}
      <Row className="align-items-center my-4">
        <Col xs={12} md={6}>
          <Select
            options={currencyOptions}
            onChange={handleAddCurrency}
            placeholder="Select currency to add..."
            isSearchable
          />
        </Col>
        <Col xs={12} md={6} className="text-md-right mt-3 mt-md-0">
          <Button
            variant="primary"
            onClick={() => setBaseCurrency(baseCurrency)}
          >
            Refresh Rates
          </Button>
        </Col>
      </Row>

      {/* Döviz Çevirici */}
      <h2 className="mb-3">Currency Converter</h2>
      <Form>
        <Row className="align-items-end">
          <Col xs={12} md={4}>
            <Form.Group controlId="baseCurrency">
              <Form.Label>Base Currency</Form.Label>
              <Form.Control
                as="select"
                value={baseCurrency}
                onChange={(e) => setBaseCurrency(e.target.value)}
              >
                {availableCurrencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} md={4}>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={4}>
            <Form.Group controlId="targetCurrency">
              <Form.Label>Target Currency</Form.Label>
              <Form.Control
                as="select"
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
              >
                {selectedCurrencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="success" className="mt-3" onClick={handleConvert}>
          Convert
        </Button>
      </Form>

      {/* Çeviri Sonucu */}
      {convertedAmount !== null && (
        <h3 className="mt-4">
          {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
        </h3>
      )}
    </Container>
  );
};

export default ExchangeRates;
