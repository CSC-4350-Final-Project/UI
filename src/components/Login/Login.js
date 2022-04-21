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
import './Login.css';

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
      <Row className="mt-3">
        <Col className="mx-auto" xs={12} sm={4}>
          <h3 className="text-center">
            {register ? 'Register' : 'Login'}
          </h3>
        </Col>
      </Row>
      <Row>
        <Col className="mx-auto" xs={12} sm={4}>
          <Form onSubmit={() => loginRegister()}>
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
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="mx-auto-button" xs={12} sm={4}>
          <div>
            <Button onClick={() => loginRegister()} variant="primary">{register ? 'Register' : 'Login'}</Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="mx-auto-button" xs={12} sm={4}>
          <div>
            {register
              ? <Button as={Link} to="/login">Back to login&nbsp;</Button>
              : <Button className="login-button" as={Link} to="/register">Register</Button>}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

Login.propTypes = { register: PropTypes.bool };

Login.defaultProps = { register: false };

export default Login;
