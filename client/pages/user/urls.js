import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';
import { Input, Modal, useModal, Text } from '@nextui-org/react';
import { getUserUrls } from '../../actions/user';
import {
  isAuthenticated,
  reAuthenticate,
  getCookie,
} from '../../helpers/localStorage';
import { shortenUser } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import withAuth from '../withAuth';
import UrlDetailsMob from '../../components/UrlDetailsMob';
import UrlDetails from '../../components/UrlDetails';
import UrlListMob from '../../components/UrlListMob';
import UrlList from '../../components/UrlList';
import UrlEdit from '../../components/UrlEdit';
import Router from 'next/router';

const Urls = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UrlShortenerUser);
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [active, setActive] = useState();
  const [copy, setCopy] = useState(false);
  const [disable, setDisable] = useState(false);
  const [user, setUser] = useState(null);
  const [urlEdit, setUrlEdit] = useState(null);
  const { setVisible, bindings } = useModal();

  const [state, setState] = useState({
    mainUrl: '',
    error: '',
    spinner: false,
    data: [],
  });

  const { mainUrl, error, spinner, data } = state;

  const handleChange = (e) => {
    setState({
      ...state,
      mainUrl: e.target.value,
      error: false,
    });
  };

  const handleEdit = () => {
    setUrlEdit(true);
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    const token = getCookie('token');
    e.preventDefault();
    const userId = isAuthenticated() && isAuthenticated()._id;

    setState({ ...state, spinner: true });

    try {
      const res = await shortenUser({ mainUrl, userId }, token);
      setTimeout(() => {
        setState({
          ...state,
          spinner: false,
          mainUrl: '',
          error: '',
          data: res.data,
        });
        reAuthenticate(res.data.user);
        dispatch({
          type: 'USER',
          payload: res.data.user,
        });
        setCopy(false);
        setDisable(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setState({ ...state, error: error.response.data });
    }
  };

  const loadUserUrls = async () => {
    const token = getCookie('token');
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const res = await getUserUrls(isAuthenticated()._id, token);
      if (res.data) {
        setUrls(res.data);
        setActive(res.data[0]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadUserUrls();
    setUser(isAuthenticated());
    if (!isAuthenticated()) {
      Router.push('/');
    }
  }, [data, userInfo]);

  const handleCopy = () => {
    setCopy(true);
    const textToBeCopied = document.querySelector('#shortUrl');
    textToBeCopied.type = 'text';
    textToBeCopied.select();
    textToBeCopied.setSelectionRange(0, 99999); /* For mobile devices */

    navigator.clipboard.writeText(textToBeCopied.value);
    textToBeCopied.type = 'hidden';
    setDisable(true);
  };

  const handleListToggle = (item) => {
    setActive(item);
    setDisable(false);
    setCopy(false);
  };

  const handleModal = (item) => {
    setActive(item);
    setDisable(false);
    setVisible(true);
    setCopy(false);
  };

  const errorNotice = () => (
    <>
      <Alert
        message={error}
        type='error'
        className='mb-2'
        showIcon
        style={{ visibility: !error && 'hidden' }}
      />
    </>
  );

  const shortenForm = () => (
    <div className='container shorten-form'>
      {user && (
        <div className='row justify-content-center'>
          <div className='col-12'>
            <Input
              clearable
              fullWidth
              underlined
              value={mainUrl}
              shadow={false}
              placeholder='Enter Full URL'
              size='xl'
              onChange={handleChange}
            />
          </div>

          <div className='d-grid gap-2 col-12' onClick={handleSubmit}>
            {!spinner && (
              <>
                <button
                  className='btn btn-primary btn-lg mt-2 rounded-1 shadow-none'
                  type='button'
                >
                  <i className='fas fa-link'></i> &nbsp; Quick Shorten
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
      )}
    </div>
  );

  const mobileUrlDetails = () => {
    return (
      <div>
        <Modal
          scroll
          fullScreen
          className='rounded-0'
          closeButton
          aria-labelledby='modal-title'
          aria-describedby='modal-description'
          {...bindings}
        >
          <Modal.Body>
            <Text>
              <UrlDetailsMob
                active={active}
                handleCopy={handleCopy}
                copy={copy}
                disable={disable}
                errorNotice={errorNotice}
                shortenForm={shortenForm}
                handleEdit={handleEdit}
              />
            </Text>
          </Modal.Body>
          {/* <Modal.Footer>{shortenForm()}</Modal.Footer> */}
        </Modal>
      </div>
    );
  };

  return (
    <>
      <div className='container-fluid urls-main'>
        <div className='row'>
          <UrlList
            urls={urls}
            active={active}
            loadUserUrls={loadUserUrls}
            handleListToggle={handleListToggle}
          />
          <UrlListMob
            urls={urls}
            active={active}
            loadUserUrls={loadUserUrls}
            handleModal={handleModal}
            errorNotice={errorNotice}
            shortenForm={shortenForm}
          />
          <UrlDetails
            active={active}
            handleCopy={handleCopy}
            copy={copy}
            disable={disable}
            errorNotice={errorNotice}
            shortenForm={shortenForm}
            handleEdit={handleEdit}
          />
          <UrlEdit
            setVisible={setVisible}
            urlEdit={urlEdit}
            setUrlEdit={setUrlEdit}
            active={active}
          />
        </div>

        <div className='row'>
          <div className='col-11'>{mobileUrlDetails()}</div>
        </div>
      </div>
    </>
  );
};

export default withAuth(Urls);
