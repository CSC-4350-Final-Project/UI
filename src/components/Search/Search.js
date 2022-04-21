import React, { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import SearchResults from './SearchResults/SearchResults';

function Search() {
  const [form, setForm] = useState({ keyword: '', postalCode: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  async function search() {
    // const body = JSON.stringify(form);
    setSearchResults([]);
    setSearched(true);
  }

  function clear() {
    setSearchResults([]);
    setSearched(false);
  }

  return (
    <Container>
      <Form onSubmit={(e) => { e.preventDefault(); search(); }}>
        <Row className="mt-3 bg-light rounded p-2 shadow-sm">
          <Row>
            <Col>
              <h3 className="text-center">Search for an Event</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={8}>
              <Form.Group className="m-2">
                <Form.Label>Keyword</Form.Label>
                <Form.Control type="text" value={form.keyword} onChange={(e) => setForm({ ...form, keyword: e.target.value })} />
              </Form.Group>
            </Col>
            <Col xs={12} sm={4}>
              <Form.Group className="m-2">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-3" xs={12}>
              <Button onClick={() => search()} variant="outline-primary">Submit</Button>
              <Button onClick={() => clear()} className="ms-2" variant="outline-secondary">Clear</Button>
            </Col>
          </Row>
        </Row>
      </Form>
      {searched && <SearchResults results={searchResults} />}
    </Container>
  );
}

Search.propTypes = {};

Search.defaultProps = {};

export default Search;
