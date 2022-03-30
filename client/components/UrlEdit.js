import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { Input } from '@nextui-org/react';
import { isAuthenticated, reAuthenticate } from '../helpers/localStorage';
import { editUrl } from '../actions/user';

const UrlEdit = ({ urlEdit, setUrlEdit, active }) => {
  const [spinner, setSpinner] = useState(false);
  const [urlID, setURLID] = useState();
  const [url, setURL] = useState();
  const [error, setError] = useState();
  // const url = active && active.shortUrl.indexOf(urlID);
  // const newUrl = active && active.shortUrl.substring(0, url);

  useEffect(() => {
    setURLID(active && active.urlId);
    setURL(active && active);
  }, [urlEdit]);

  const handleChange = (e) => {
    setURLID(e.target.value);
  };

  const handleOk = () => {
    setUrlEdit(false);
  };

  const handleCancel = () => {
    setUrlEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = isAuthenticated() && isAuthenticated()._id;

    setSpinner(true);

    try {
      const res = await editUrl({ urlId: url.urlId, userId, urlID });
      setTimeout(() => {
        setURL(res.data.url);
        // reAuthenticate(res.data.user);
        // dispatch({
        //   type: 'USER',
        //   payload: res.data.user,
        // });
        // setDisable(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setError(error.response);
    }
  };

  return (
    <div>
      <Modal
        title={`Edit '${active && active.shortUrl}'`}
        footer={null}
        visible={urlEdit}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className='row justify-content-center'>
          <div className='col-12 url-edit-input'>
            <Input
              fullWidth
              value={urlID}
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
