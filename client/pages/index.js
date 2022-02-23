import { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Alert, Result, Button, Typography, Statistic, Row, Col } from 'antd';
storeUrl;
import { CheckCircleOutlined } from '@ant-design/icons';
import { Input, Card } from '@nextui-org/react';
import Link from 'next/link';
import { index, shorten } from '../actions';
import { storeUrl, isGuest, isAuthenticated } from '../actions/localStorage';
import Login from './login';
import Register from './register';
const { Paragraph, Text } = Typography;
import { useDispatch, useSelector } from 'react-redux';
import { getUserUrls } from '../actions/user';

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
  const [userUrls, setUserUrls] = useState([]);

  const [copy, setCopy] = useState(false);
  const [disable, setDisable] = useState(false);

  const { shortUrl, originalUrl } = isGuest();

  const { mainUrl, loading, error, shortenedUrl, mainUrlAlias, shortUrlAlias } =
    state;

  const loadUrls = async () => {
    if (isAuthenticated()) {
      let res = await getUserUrls(isAuthenticated()._id);
      if (res.data) {
        setUserUrls(res.data);
        dispatch({
          type: 'URLS',
          payload: res.data,
        });
      }
    }
  };

  const loginHandler = () => {
    setLoginVisible(true);
    setRegisterVisible(false);
  };

  useEffect(() => {
    loadUrls();
  }, [userInfo]);

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

    setState({ ...state, loading: true });

    try {
      const res = await shorten({
        mainUrl,
      });
      setTimeout(() => {
        setState({
          ...state,
          shortenedUrl: res.data.shortUrl,
          loading: false,
          mainUrlAlias: res.data.originalUrl,
          shortUrlAlias: res.data.shortUrl,
          mainUrl: '',
        });
        setCopy(false);
        setDisable(false);
        !isAuthenticated() && storeUrl(res.data);
      }, 1000);
    } catch (error) {
      console.log(error);
      setState({ ...state, error: error.response.data });
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
              class='btn btn-success btn-lg mt-2 rounded-0 shadow-none'
              type='button'
            >
              <i class='fas fa-link'></i> &nbsp; Shorten URL
            </button>
          </>
        )}

        {loading && (
          <button
            class='btn btn-success btn-lg mt-2 rounded-0 shadow-none'
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
                value={428}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card className='box-shadow rounded-3'>
              <Statistic
                className='d-flex justify-content-between align-items-center'
                title='Users:'
                value={113}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );

  const urlList = () => (
    <>
      {!isAuthenticated() && (
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

      {isAuthenticated() && (
        <div className='mb-5'>
          <Card className='box-shadow'>
            <div className='pt-4'>
              <Result
                className='mb-2'
                title={
                  <Link href={userUrls.length > 0 ? userUrls[0].shortUrl : ''}>
                    {userUrls.length > 0 ? userUrls[0].shortUrl : ''}
                  </Link>
                }
                subTitle={userUrls.length > 0 && userUrls[0].originalUrl}
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
