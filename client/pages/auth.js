import React, { useState } from 'react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Modal, Text } from '@nextui-org/react';

const Auth = ({
  loginVisible,
  setLoginVisible,
  registerVisible,
  setRegisterVisible,
}) => {
  const loginHandler = () => {
    setLoginVisible(true);
    setRegisterVisible(false);
  };

  const registerHandler = () => {
    setRegisterVisible(true);
    setLoginVisible(false);
  };

  const closeRegisterHandler = () => {
    setRegisterVisible(false);
    console.log('closed');
  };
  const closeLoginHandler = () => {
    setLoginVisible(false);
    console.log('closed');
  };

  const registerModal = () => {
    if (registerVisible) {
      return (
        <Modal
          closeButton
          aria-labelledby='modal-title'
          open={registerVisible}
          onClose={closeRegisterHandler}
          style={{ cursor: 'auto' }}
        >
          <Modal.Header>
            <Text id='modal-title' size={18}>
              Register an Account
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              fullWidth
              color='primary'
              size='lg'
              type='email'
              placeholder='Username'
              contentLeft={<UserOutlined />}
            />
            <Input
              fullWidth
              color='primary'
              size='lg'
              placeholder='Email'
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
                onClick={closeRegisterHandler}
                style={{ fontSize: '17px' }}
              >
                Register
              </button>
            </Modal.Footer>
            <div className='d-flex justify-content-center align-items-center mb-2'>
              <div>
                <Text size={15} onClick={loginHandler}>
                  Already have an Account?{' '}
                  <span size={15} role='button' className='text-success'>
                    Login
                  </span>
                </Text>{' '}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      );
    }
  };

  const loginModal = () => (
    <Modal
      closeButton
      aria-labelledby='modal-title'
      open={loginVisible}
      onClose={closeLoginHandler}
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
            onClick={closeLoginHandler}
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
            </Text>
          </div>
          <div>
            <Text size={15} role='button'>
              <span class='text-success'>Forgot password?</span>
            </Text>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
  return <>{registerModal()}</>;
};

export default Auth;
