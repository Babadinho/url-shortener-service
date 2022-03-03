import { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Alert, Result, Button, Typography, Statistic, Row, Col } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Input, Card } from '@nextui-org/react';
import Link from 'next/link';
import { getStats, shortenGuest, shortenUser } from '../actions/index';
import {
  storeUrl,
  isGuest,
  reAuthenticate,
  isAuthenticated,
} from '../helpers/localStorage';
import Login from './login';
import Register from './register';
const { Paragraph, Text } = Typography;
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const [state, setState] = useState({
    mainUrl: '',
    loading: false,
    error: '',
    shortenedUrl: '',
    mainUrlAlias: '',
    shortUrlAlias: '',
  });
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UrlShortenerUser);
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [lastShortened, setLastShortened] = useState(null);
  const [stats, setStats] = useState(null);

  const [copy, setCopy] = useState(false);
  const [disable, setDisable] = useState(false);

  const { shortUrl, originalUrl } = isGuest();

  const { mainUrl, loading, error, shortenedUrl, mainUrlAlias, shortUrlAlias } =
    state;

  const loginHandler = () => {
    setLoginVisible(true);
    setRegisterVisible(false);
  };

  const loadStats = async () => {
    const res = await getStats();
    try {
      if (res.data) {
        setStats(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadStats();
    if (isAuthenticated()) {
      setLastShortened(isAuthenticated().last_shortened);
    }
  }, [shortenedUrl, userInfo]);

  useEffect(() => {
    if (!isAuthenticated() && isGuest()) {
      setState({
        ...state,
        shortUrlAlias: shortUrl,
        mainUrlAlias: originalUrl,
      });
    }
  }, []);

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
            mainUrl: '',
            error: '',
          });
          setCopy(false);
          setDisable(false);
          storeUrl(res.data);
        }, 1000);
      } catch (error) {
        setState({ ...state, error: error.response.data });
      }
    }

    if (isAuthenticated()) {
      try {
        const res = await shortenUser({ mainUrl, userId });
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
    <div className='mb-3'>
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
      <div class='d-grid gap-2' onClick={handleSubmit}>
        {!loading && (
          <>
            <button
              class='btn btn-secondary btn-lg mt-2 rounded-1 shadow-none'
              type='button'
            >
              <i class='fas fa-link'></i> &nbsp; Shorten URL
            </button>
          </>
        )}

        {loading && (
          <button
            class='btn btn-secondary btn-lg mt-2 rounded-1 shadow-none'
            type='button'
            disabled
          >
            <div className='d-flex justify-content-center'>
              <span
                class='spinner-border spinner-border-md me-2'
                role='status'
                aria-hidden='true'
              ></span>
            </div>
          </button>
        )}
      </div>
      <div className='site-statistic-demo-card mt-2'>
        <Row gutter={16}>
          <Col span={12}>
            <Card className='box-shadow rounded-3'>
              <Statistic
                className='d-flex justify-content-between align-items-center'
                title='URLs:'
                value={!stats ? '0' : stats.urls}
                valueStyle={{ color: '#6c757d' }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card className='box-shadow rounded-3'>
              <Statistic
                className='d-flex justify-content-between align-items-center'
                title='Users:'
                value={!stats ? '0' : stats.users}
                valueStyle={{ color: '#6c757d' }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );

  const urlList = () => (
    <>
      {!isAuthenticated() && shortUrlAlias && mainUrlAlias && (
        <div className='mb-5'>
          <Card className='box-shadow'>
            <div className='pt-4'>
              <Result
                className='mb-2'
                title={<Link href={shortUrlAlias}>{shortUrlAlias}</Link>}
                subTitle={mainUrlAlias}
                extra={[
                  <Button type='primary' key='console' onClick={loginHandler}>
                    Manage Links
                  </Button>,
                  <Button key='buy' onClick={handleCopy} disabled={disable}>
                    {!copy ? (
                      <>
                        <i class='far fa-copy fa-lg me-1' role='button'></i>{' '}
                        Copy Link
                      </>
                    ) : (
                      <>
                        <i class='far fa-copy fa-lg me-1' role='button'></i>{' '}
                        Link Copied
                      </>
                    )}
                  </Button>,
                ]}
              >
                <div className='desc'>
                  <Paragraph>
                    <Text
                      strong
                      style={{
                        fontSize: 16,
                      }}
                    >
                      Register an account to gain access to extras
                    </Text>
                  </Paragraph>
                  <Paragraph>
                    <CheckCircleOutlined className='site-result-demo-error-icon' />{' '}
                    Shorten as many links as possible.
                  </Paragraph>
                  <Paragraph>
                    <CheckCircleOutlined className='site-result-demo-error-icon' />{' '}
                    Track and customize your links.{' '}
                  </Paragraph>
                </div>
              </Result>
            </div>

            <input type='hidden' value={shortenedUrl} id='shortUrl'></input>
          </Card>
        </div>
      )}

      {isAuthenticated() && lastShortened && (
        <div className='mb-5'>
          <Card className='box-shadow'>
            <div className='pt-4'>
              <Result
                className='mb-2'
                title={
                  <Link href={lastShortened.shortUrl}>
                    {lastShortened.shortUrl}
                  </Link>
                }
                subTitle={lastShortened.originalUrl}
                extra={[
                  <Button type='primary' key='console' onClick={loginHandler}>
                    Manage Links
                  </Button>,
                  <Button key='buy' onClick={handleCopy} disabled={disable}>
                    {!copy ? (
                      <>
                        <i class='far fa-copy fa-lg me-1' role='button'></i>{' '}
                        Copy Link
                      </>
                    ) : (
                      <>
                        <i class='far fa-copy fa-lg me-1' role='button'></i>{' '}
                        Link Copied
                      </>
                    )}
                  </Button>,
                ]}
              />
            </div>

            <input type='hidden' value={shortenedUrl} id='shortUrl'></input>
          </Card>
        </div>
      )}
    </>
  );

  return (
    <>
      <div className='row mt-5'>
        <div className='col-md-10 col-lg-6 col-sm-10 mx-auto'>
          {errorNotice()}
          {shortenForm()}
          {urlList()}
        </div>
      </div>
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
