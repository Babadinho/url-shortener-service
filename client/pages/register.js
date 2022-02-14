import React, { useState } from 'react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Modal, Text } from '@nextui-org/react';

const Register = ({ registerVisible, setRegisterVisible, setLoginVisible }) => {
  const loginHandler = () => {
    setLoginVisible(true);
    setRegisterVisible(false);
  };

  const closeHandler = () => {
    setRegisterVisible(false);
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
              onClick={closeHandler}
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
    </>
  );
};

export default Register;
