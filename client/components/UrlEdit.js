import React, { useState, useEffect } from 'react';
import { Modal, Alert } from 'antd';
import { Input } from '@nextui-org/react';
import {
  isAuthenticated,
  reAuthenticate,
  getCookie,
} from '../helpers/localStorage';
import { editUrl } from '../actions/user';
import { useDispatch } from 'react-redux';

const UrlEdit = ({ urlEdit, setUrlEdit, active, setVisible }) => {
  const dispatch = useDispatch();
  const [spinner, setSpinner] = useState(false);
  const [newUrlId, setNewURLID] = useState();
  const [url, setURL] = useState();
  const [error, setError] = useState();
  // const url = active && active.shortUrl.indexOf(newUrlId);
  // const newUrl = active && active.shortUrl.substring(0, url);

  useEffect(() => {
    setURL(active && active);
  }, [urlEdit]);

  const handleChange = (e) => {
    setNewURLID(e.target.value);
    setError('');
  };

  const handleOk = () => {
    setUrlEdit(false);
  };

  const handleCancel = () => {
    setUrlEdit(false);
    setNewURLID('');
    setURL('');
  };

  const handleSubmit = async (e) => {
    const token = getCookie('token');
    e.preventDefault();
    const userId = isAuthenticated() && isAuthenticated()._id;

    setSpinner(true);

    try {
      const res = await editUrl({ urlId: url.urlId, userId, newUrlId }, token);
      setTimeout(() => {
        setURL(res.data.url[0]);
        reAuthenticate(res.data.user[0]);
        dispatch({
          type: 'USER',
          payload: res.data.user[0],
        });
        setUrlEdit(false);
        setSpinner(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
      setSpinner(false);
    }
  };

  const errorNotice = () => (
    <>
      <Alert
        message={error}
        type='error'
        className='mb-3'
        showIcon
        style={{ display: !error && 'none' }}
      />
    </>
  );

  return (
    <div className='container'>
      <Modal
        title={`Edit '${active && active.shortUrl}'`}
        footer={null}
        visible={urlEdit}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className='row justify-content-center'>
          <div>{errorNotice()}</div>
          <div className='col-12 url-edit-input'>
            <Input
              fullWidth
              value={newUrlId ? newUrlId : active && active.urlId}
              shadow={false}
              size='xl'
              onChange={handleChange}
              labelLeft='http://localhost:3000/'
            />
          </div>

          <div className='d-grid gap-2 col-12' onClick={handleSubmit}>
            {!spinner && (
              <>
                <button
                  className='btn btn-primary btn-lg mt-2 rounded-1 shadow-none'
                  type='button'
                >
                  <i className='fas fa-link'></i> &nbsp; Edit URL
                </button>
              </>
            )}

            {spinner && (
              <button
                className='btn btn-primary btn-lg mt-2 rounded-1 shadow-none'
                type='button'
                disabled
                style={{ background: '007bff' }}
              >
                <div className='d-flex justify-content-center'>
                  <span
                    className='spinner-border spinner-border-md me-2'
                    role='status'
                    aria-hidden='true'
                  ></span>
                </div>
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UrlEdit;
