import { useState, useEffect } from 'react';
import { Alert, Result, Button, Typography, Tag } from 'antd';
import {
  CheckCircleOutlined,
  QuestionCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Input, Card, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { shortenGuest, shortenUser } from '../actions/index';
import {
  storeUrl,
  isGuest,
  reAuthenticate,
  isAuthenticated,
  getCookie,
} from '../helpers/localStorage';
import Login from './login';
import Register from './register';
import Header from '../components/Header';
import Faq from '../components/Faq';
const { Paragraph, Text } = Typography;
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Router from 'next/router';

const Home = () => {
  const [state, setState] = useState({
    mainUrl: '',
    loading: false,
    error: '',
    shortenedUrl: '',
    mainUrlAlias: '',
    shortUrlAlias: '',
    urlStatus: '',
    createdAt: '',
  });
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UrlShortenerUser);
  const guestInfo = useSelector((state) => state.UrlShortenerGuest);
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [lastShortened, setLastShortened] = useState(null);
  const [user, setUser] = useState(null);

  const [copy, setCopy] = useState(false);
  const [disable, setDisable] = useState(false);

  const { shortUrl, originalUrl, status, date } = isGuest();

  const {
    mainUrl,
    loading,
    error,
    shortenedUrl,
    mainUrlAlias,
    shortUrlAlias,
    urlStatus,
    createdAt,
  } = state;

  const loginHandler = () => {
    setLoginVisible(true);
    setRegisterVisible(false);
  };

  const registerHandler = () => {
    setRegisterVisible(true);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      setLastShortened(isAuthenticated().last_shortened);
      setState({
        ...state,
        shortenedUrl: isAuthenticated().last_shortened.shortUrl,
      });
      setUser(isAuthenticated());
      setCopy(false);
    }
  }, [shortenedUrl, userInfo]);

  useEffect(() => {
    if (!isAuthenticated() && isGuest()) {
      setState({
        ...state,
        shortUrlAlias: shortUrl,
        shortenedUrl: shortUrl,
        mainUrlAlias: originalUrl,
        urlStatus: status,
        createdAt: date,
      });
      setUser(undefined);
      setCopy(false);
    }

    if (!isAuthenticated() && !isGuest()) {
      setState({
        ...state,
        shortUrlAlias: '',
        shortenedUrl: '',
        mainUrlAlias: '',
        urlStatus: '',
        createdAt: '',
      });
      setUser(undefined);
      setCopy(false);
    }
  }, [guestInfo, userInfo]);

  const handleChange = (e) => {
    setState({
      ...state,
      mainUrl: e.target.value,
      error: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = isAuthenticated() && isAuthenticated()._id;

    setState({ ...state, loading: true });

    if (!isAuthenticated()) {
      try {
        const res = await shortenGuest({ mainUrl });
        setTimeout(() => {
          setState({
            ...state,
            shortenedUrl: res.data.shortUrl,
            loading: false,
            mainUrlAlias: res.data.originalUrl,
            shortUrlAlias: res.data.shortUrl,
            urlStatus: res.data.status,
            createdAt: res.data.date,
            mainUrl: '',
            error: '',
          });
          setCopy(false);
          setDisable(false);
          storeUrl(res.data);
          dispatch({
            type: 'GUEST',
            payload: res.data,
          });
        }, 1000);
      } catch (error) {
        setState({ ...state, error: error.response.data });
      }
    }

    if (isAuthenticated()) {
      const token = getCookie('token');
      try {
        const res = await shortenUser({ mainUrl, userId }, token);
        setTimeout(() => {
          setState({
            ...state,
            shortenedUrl: res.data.url.shortUrl,
            loading: false,
            mainUrlAlias: res.data.url.originalUrl,
            shortUrlAlias: res.data.url.shortUrl,
            mainUrl: '',
            error: '',
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
    }
  };

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

  const errorNotice = () => (
    <>
      <Alert
        message={error}
        type='error'
        className='mb-5'
        showIcon
        style={{ visibility: !error && 'hidden' }}
      />
    </>
  );

  const shortenForm = () => (
    <div className='mb-5 row shorten-form'>
      {user && (
        <div className='col-lg-8 col-md-7'>
          <Input
            clearable
            fullWidth
            underlined
            value={mainUrl}
            shadow={false}
            labelPlaceholder='Enter Full URL'
            size='xl'
            onChange={handleChange}
          />
        </div>
      )}
      {user === undefined && (
        <div className='col-lg-8 col-md-7'>
          <Input
            clearable
            fullWidth
            underlined
            value={mainUrl}
            shadow={false}
            labelPlaceholder='Enter Full URL'
            size='xl'
            onChange={handleChange}
          />
        </div>
      )}
      <div className='d-grid gap-2 col-lg-4 col-md-5' onClick={handleSubmit}>
        {!loading && (
          <>
            <button
              className='btn btn-primary btn-lg mt-2 rounded-1 shadow-none'
              type='button'
            >
              <i className='fas fa-link'></i> &nbsp; Shorten URL
            </button>
          </>
        )}

        {loading && (
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
  );

  const urlList = () => (
    <>
      {!user && !shortUrlAlias && !mainUrlAlias && (
        <div className='mb-2'>
          <Card className='box-shadow'>
            <div className='mb-4 guest-section'>
              <Result>
                <div className='desc flex-column flex-column-reverse flex-xxl-row d-flex align-items-center'>
                  <div>
                    <div className='me-lg-5' style={{ fontSize: '0.98rem' }}>
                      <Paragraph>
                        <Text
                          strong
                          style={{
                            fontSize: 19,
                          }}
                        >
                          Register an account to access the following features
                        </Text>
                      </Paragraph>
                      <Paragraph>
                        <CheckCircleOutlined className='site-result-demo-error-icon' />{' '}
                        Shorten unlimited URLs for free.
                      </Paragraph>
                      <Paragraph>
                        <CheckCircleOutlined className='site-result-demo-error-icon' />{' '}
                        Track and customize your URLs.{' '}
                      </Paragraph>
                      <Paragraph>
                        <CheckCircleOutlined className='site-result-demo-error-icon' />{' '}
                        Switch from public to private URLs.
                      </Paragraph>
                    </div>
                    <div className='d-flex'>
                      <Button
                        type='primary'
                        size='large'
                        className='mt-4 rounded-0'
                        onClick={registerHandler}
                      >
                        Get Started for Free
                      </Button>
                    </div>
                  </div>
                  <div>
                    <img src='/images/shorten.png' alt='url-shortener' />
                  </div>
                </div>
              </Result>
            </div>
          </Card>
        </div>
      )}

      {!user && shortUrlAlias && mainUrlAlias && (
        <div className='mb-2'>
          <Card className='box-shadow'>
            <div className='pt-4'>
              <Result
                className='mb-2'
                title={
                  <Link href={shortUrlAlias} className='d-flex text-center'>
                    {shortUrlAlias}
                  </Link>
                }
                subTitle={
                  <>
                    <div>{mainUrlAlias}</div>{' '}
                    <div className='mt-2 d-flex justify-content-center align-items-center'>
                      <Tag color='red' style={{ fontSize: '0.7rem' }}>
                        <div className='d-flex align-items-center'>
                          <Tooltip content='Shortened by a Public user'>
                            <QuestionCircleOutlined className='me-1' />
                          </Tooltip>
                          <span>
                            {urlStatus &&
                              urlStatus[0].toUpperCase() +
                                urlStatus.substring(1)}{' '}
                            URL
                          </span>{' '}
                        </div>
                      </Tag>
                      <Tag color='green' style={{ fontSize: '0.7rem' }}>
                        <div className='d-flex align-items-center'>
                          <ClockCircleOutlined className='me-1' />
                          <span> {moment(createdAt).fromNow()}</span>
                        </div>
                      </Tag>
                    </div>
                  </>
                }
                extra={[
                  <>
                    <Button
                      type='primary'
                      key='console'
                      className='btn-manage'
                      onClick={loginHandler}
                    >
                      Manage URLs
                    </Button>
                    <Button
                      key='buy'
                      onClick={handleCopy}
                      disabled={copy && disable}
                    >
                      {!copy ? (
                        <>
                          <i
                            className='far fa-copy fa-lg me-1'
                            role='button'
                          ></i>{' '}
                          Copy URL
                        </>
                      ) : (
                        <>
                          <i
                            className='far fa-copy fa-lg me-1'
                            role='button'
                          ></i>{' '}
                          URL Copied
                        </>
                      )}
                    </Button>
                  </>,
                ]}
              >
                <div className='desc flex-column flex-column-reverse flex-xxl-row d-flex align-items-center'>
                  <div>
                    <div className='me-lg-5' style={{ fontSize: '0.98rem' }}>
                      <Paragraph>
                        <Text
                          strong
                          style={{
                            fontSize: 19,
                          }}
                        >
                          Register an account to access the following features
                        </Text>
                      </Paragraph>
                      <Paragraph>
                        <CheckCircleOutlined className='site-result-demo-error-icon' />{' '}
                        Shorten unlimited URLs for free.
                      </Paragraph>
                      <Paragraph>
                        <CheckCircleOutlined className='site-result-demo-error-icon' />{' '}
                        Track and customize your URLs.{' '}
                      </Paragraph>
                      <Paragraph>
                        <CheckCircleOutlined className='site-result-demo-error-icon' />{' '}
                        Switch from public to private URLs.
                      </Paragraph>
                    </div>
                    <div className='d-flex'>
                      <Button
                        type='primary'
                        size='large'
                        className='mt-4 rounded-0'
                      >
                        Get Started for Free
                      </Button>
                    </div>
                  </div>
                  <div>
                    <img src='/images/shorten.png' alt='url-shortener' />
                  </div>
                </div>
              </Result>
            </div>

            <input type='hidden' value={shortenedUrl} id='shortUrl'></input>
          </Card>
        </div>
      )}

      {user && lastShortened && (
        <div className='mb-2'>
          <Card className='box-shadow'>
            <div className='pt-4'>
              <Result
                className='mb-4'
                title={
                  <Link href={lastShortened.shortUrl}>
                    {lastShortened.shortUrl}
                  </Link>
                }
                subTitle={
                  <>
                    <div>{lastShortened.originalUrl}</div>{' '}
                    <div className='mt-2 d-flex justify-content-center align-items-center'>
                      <Tag color='blue' style={{ fontSize: '0.7rem' }}>
                        <div className='d-flex align-items-center'>
                          <Tooltip content='URL is Private to you'>
                            <QuestionCircleOutlined className='me-1' />
                          </Tooltip>
                          <span>
                            {lastShortened.status[0].toUpperCase() +
                              lastShortened.status.substring(1)}{' '}
                            URL
                          </span>{' '}
                        </div>
                      </Tag>
                      <Tag color='green' style={{ fontSize: '0.7rem' }}>
                        <div className='d-flex align-items-center'>
                          <ClockCircleOutlined className='me-1' />
                          <span>{moment(lastShortened.date).fromNow()}</span>
                        </div>
                      </Tag>
                    </div>
                  </>
                }
                extra={[
                  <Button
                    type='primary'
                    key='console'
                    className='btn-manage mb-2'
                    onClick={() => Router.push('/user/urls')}
                  >
                    Manage URLs
                  </Button>,
                  <Button
                    key='buy'
                    onClick={handleCopy}
                    disabled={copy && disable}
                  >
                    {!copy ? (
                      <>
                        <i className='far fa-copy fa-lg me-1' role='button'></i>{' '}
                        Copy URL
                      </>
                    ) : (
                      <>
                        <i className='far fa-copy fa-lg me-1' role='button'></i>{' '}
                        URL Copied
                      </>
                    )}
                  </Button>,
                ]}
              >
                <div className='desc flex-column flex-column-reverse flex-xxl-row d-flex align-items-center'>
                  <div>
                    <div className='me-lg-5'>
                      <Paragraph>
                        <Text
                          strong
                          style={{
                            fontSize: 19,
                          }}
                        >
                          Customize and Track URLs
                        </Text>
                      </Paragraph>
                      <Paragraph
                        style={{ fontSize: '0.94rem', lineHeight: '1.6rem' }}
                      >
                        Our free URL shortener includes a number of premium
                        features that give you more options for targeting your
                        short link to the right audience and increasing brand
                        awareness. A custom alias, or a custom URL slug in your
                        short link, is one of them. Another feature is the
                        ability to track the number of people who have visited
                        your URLs.
                      </Paragraph>
                    </div>
                  </div>
                  <div>
                    <img
                      src='/images/short.png'
                      alt='url-shortener'
                      className='image-fluid'
                      style={{ maxWidth: '340px' }}
                    />
                  </div>
                </div>
              </Result>
            </div>

            <input type='hidden' value={shortenedUrl} id='shortUrl'></input>
          </Card>
        </div>
      )}
    </>
  );

  return (
    <>
      <Header registerHandler={registerHandler} user={user} />
      <div className=' mt-md-3 mt-sm-1 container'>
        <div className='row shorten-container'>
          <div className='col-md-12 col-lg-9 col-sm-10 col-xs-10 mx-auto'>
            <div className='row'>
              <div className='col-lg-8 col-md-7'>{errorNotice()}</div>
            </div>
            {shortenForm()}
            {urlList()}
          </div>
        </div>
      </div>
      <Faq />
      <Login
        loginVisible={loginVisible}
        setLoginVisible={setLoginVisible}
        setRegisterVisible={setRegisterVisible}
      />
      <Register
        registerVisible={registerVisible}
        setRegisterVisible={setRegisterVisible}
        setLoginVisible={setLoginVisible}
      />
    </>
  );
};

export default Home;
