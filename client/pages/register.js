import React, { useState } from 'react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Modal, Text } from '@nextui-org/react';
import { register } from '../actions/auth';

const Register = ({ registerVisible, setRegisterVisible, setLoginVisible }) => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    error: '',
    success: '',
    loading: false,
  });

  const { username, email, password, error, success, loading } = state;

  const loginHandler = () => {
    setLoginVisible(true);
    setRegisterVisible(false);
  };

  const closeHandler = () => {
    setRegisterVisible(false);
  };

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });

    try {
      const res = await register({
        username: username,
        email: email,
        password: password,
      });
      if (res.data) {
        setTimeout(() => {
          setState({
            ...state,
            username: '',
            email: '',
            password: '',
            success: res.data,
            loading: false,
          });
          closeHandler();
        }, 1000);
      }
    } catch (error) {
      console.log(error.response);
      setState({
        ...state,
        error: error.response.data,
        success: '',
        loading: false,
      });
    }
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        open={registerVisible}
        onClose={closeHandler}
        style={{ cursor: 'auto' }}
      >
        <Modal.Header>
          <Text id='modal-title' size={18}>
            Register an Account
          </Text>
        </Modal.Header>
        <div className='text-danger' style={{ fontSize: '0.9rem' }}>
          {error}
        </div>
        <Modal.Body>
          <Input
            fullWidth
            color='primary'
            size='lg'
            placeholder='Username'
            value={username}
            contentLeft={<UserOutlined />}
            onChange={handleChange('username')}
          />
          <Input
            fullWidth
            color='primary'
            size='lg'
            type='email'
            placeholder='Email'
            value={email}
            contentLeft={<MailOutlined />}
            onChange={handleChange('email')}
          />
          <Input.Password
            fullWidth
            color='primary'
            size='lg'
            placeholder='Password'
            value={password}
            contentLeft={<LockOutlined />}
            onChange={handleChange('password')}
          />
          <Modal.Footer>
            <button
              class='btn btn-secondary form-control rounded-1 shadow-none'
              type='button'
              onClick={handleSubmit}
              style={{ fontSize: '17px' }}
            >
              {loading ? (
                <span
                  class='spinner-border spinner-border-md me-2'
                  role='status'
                  aria-hidden='true'
                ></span>
              ) : (
                'Register'
              )}
            </button>
          </Modal.Footer>
          <div className='d-flex justify-content-center align-items-center mb-2'>
            <div>
              <Text size={15} onClick={loginHandler}>
                Already have an Account?{' '}
                <span size={15} role='button' className='text-secondary'>
                  Login
                </span>
              </Text>{' '}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;
