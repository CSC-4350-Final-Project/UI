/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  Col,
  Container,
  Form,
  Row,
  Button,
} from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';

function Login({ register }) {
  const [form, setForm] = useState({ email: '', password: '', username: '' });
  const auth = useAuth();

  async function loginRegister(e) {
    e.preventDefault();

    if (!form.email && !form.password && (!register || !form.username)) {
      return;
    }

    const res = await (
      await fetch(`${process.env.REACT_APP_DOMAIN}/${register ? 'register' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    ).json();

    if (!res.error && !register) { // if we're logging in
      auth.login(res.token);
    } else {
      alert(res.message);
    }

    setForm({ password: '' });
  }

  return auth.authed ? <Navigate to="/" replace /> : (
    <Container>
      <Form onSubmit={(e) => loginRegister(e)}>
        <Row className="mt-3">
          <Col className="mx-auto" xs={12} sm={4}>
            <h4>
              {register ? 'Register' : 'Login'}
            </h4>
          </Col>
        </Row>
        <Row>
          <Col className="mx-auto" xs={12} sm={4}>
            {register
              && (
                <Form.Group className="mb-2">
                  <Form.Label>Username</Form.Label>
                  <Form.Control required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} type="text" />
                </Form.Group>
              )}
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="text" />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Password</Form.Label>
              <Form.Control required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="mx-auto" xs={12} sm={4}>
            <div>
              <Button type="submit" variant="primary">{register ? 'Register' : 'Login'}</Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="mx-auto" xs={12} sm={4}>
            <div>
              {register ? <Link to="/login">Back to login</Link>
                : <Link to="/register">Or click here to register</Link>}
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

Login.propTypes = { register: PropTypes.bool };

Login.defaultProps = { register: false };

export default Login;
