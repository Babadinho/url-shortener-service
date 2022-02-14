import React, { useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Input, Modal, Text } from '@nextui-org/react';

const Login = ({ loginVisible, setLoginVisible, setRegisterVisible }) => {
  const registerHandler = () => {
    setLoginVisible(false);
    setRegisterVisible(true);
  };

  const closeHandler = () => {
    setLoginVisible(false);
    console.log('closed');
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
        <Modal.Body>
          <Input
            fullWidth
            color='primary'
            size='lg'
            placeholder='Username'
            contentLeft={<MailOutlined />}
          />
          <Input.Password
            fullWidth
            color='primary'
            size='lg'
            placeholder='Password'
            contentLeft={<LockOutlined />}
          />
          <Modal.Footer>
            <button
              class='btn btn-success form-control shadow-none'
              type='button'
              onClick={closeHandler}
              style={{ fontSize: '17px' }}
            >
              Login
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
