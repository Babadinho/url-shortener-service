import React, { useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Input, Modal, Text } from '@nextui-org/react';
import { authenticate } from '../actions/localStorage';
import { login } from '../actions/auth';
import { useDispatch } from 'react-redux';

const Login = ({ loginVisible, setLoginVisible, setRegisterVisible }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
  });
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState([]);

  const { email, password, error, loading } = state;

  const registerHandler = () => {
    setLoginVisible(false);
    setRegisterVisible(true);
  };

  const closeHandler = () => {
    setLoginVisible(false);
    console.log('closed');
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
      const res = await login({
        email: email,
        password: password,
      });
      if (res.data) {
        setUserDetails(res.data);
        authenticate(res.data);
        dispatch({
          type: 'USER',
          payload: res.data,
        });
        setTimeout(() => {
          closeHandler();
          setState({
            ...state,
            loading: false,
          });
        }, 500);
      }
    } catch (error) {
      console.log(error.response.data);
      setState({
        ...state,
        error: error.response.data,
        loading: false,
      });
    }
  };

  return (
    <div>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        open={loginVisible}
        onClose={closeHandler}
        style={{ cursor: 'auto' }}
      >
        <Modal.Header>
          <Text id='modal-title' size={18}>
            Login to your Account
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
              class='btn btn-success form-control shadow-none'
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
                'Login'
              )}
            </button>
          </Modal.Footer>
          <div className='d-flex justify-content-center flex-column align-items-center mb-2'>
            <div className='mb-1'>
              <Text size={15} onClick={registerHandler}>
                Don't have an Account?{' '}
                <span size={15} role='button' className='text-success'>
                  Register
                </span>
              </Text>{' '}
            </div>
            <div>
              <Text size={15} role='button'>
                <span class='text-success'>Forgot password?</span>
              </Text>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
