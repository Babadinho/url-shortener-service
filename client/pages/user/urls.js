import React, { useState, useEffect } from 'react';
import { Card, List, Divider, Result, Button, Tag, Alert, Empty } from 'antd';
import { Input, Tooltip } from '@nextui-org/react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getUserUrls } from '../../actions/user';
import { isAuthenticated, reAuthenticate } from '../../helpers/localStorage';
import moment from 'moment';
import Link from 'next/link';
import { shortenUser } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

const Urls = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [active, setActive] = useState();
  const [copy, setCopy] = useState(false);
  const [disable, setDisable] = useState(false);
  const [user, setUser] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = isAuthenticated() && isAuthenticated()._id;

    setState({ ...state, spinner: true });

    try {
      const res = await shortenUser({ mainUrl, userId });
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
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const res = await getUserUrls(isAuthenticated()._id);
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
  }, [data]);

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

  const urlList = () => (
    <div className='col-md-5'>
      {urls && (
        <div
          id='scrollableDiv'
          style={{
            height: 600,
            overflow: 'auto',
            border: '1px solid rgba(140, 140, 140, 0.35)',
            borderTop: 'none',
            backgroundColor: '#fff',
            borderRadius: 'none',
          }}
        >
          <InfiniteScroll
            dataLength={urls.length}
            next={loadUserUrls}
            hasMore={urls.length < urls.length}
            endMessage={<Divider plain>Shorten more URLs</Divider>}
            scrollableTarget='scrollableDiv'
          >
            <List
              dataSource={urls}
              renderItem={(item) => (
                <List.Item
                  key={item._id}
                  role='button'
                  onClick={() => handleListToggle(item)}
                  style={{
                    backgroundColor:
                      active && active._id === item._id && '#f1f3f4',
                    marginBottom: 'unset',
                    borderBottom: '1px solid #d3d4d7',
                    padding: '1.5rem 2rem 1.5rem',
                  }}
                >
                  <List.Item.Meta
                    title={
                      <>
                        <div className='small'>
                          {moment(item.date).fromNow()}
                        </div>{' '}
                        <div className='fw-bold' style={{ fontSize: '1.2rem' }}>
                          {item.shortUrl}
                        </div>
                      </>
                    }
                    description={item.originalUrl}
                  />
                  <div className='d-flex align-items-center'>
                    <span>{item.visits}</span>{' '}
                    <i class='fas fa-chart-area ms-2'></i>
                  </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      )}
      {!urls && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </div>
  );

  const urlDetails = () => (
    <>
      <div
        className='col-md-7'
        style={{
          height: 600,
          border: '1px solid rgba(140, 140, 140, 0.35)',
          borderTop: 'none',
          backgroundColor: '#fff',
        }}
      >
        {active && (
          <>
            <div className='mb-2 ant-card'>
              <Card className='box-shadow'>
                <div className='url-details pt-5 pb-4'>
                  <Result
                    className='mb-4'
                    title={
                      <Link href={active.shortUrl}>{active.shortUrl}</Link>
                    }
                    subTitle={
                      <>
                        <div>{active.originalUrl}</div>{' '}
                        <div className='mt-2 d-flex justify-content-center align-items-center'>
                          <Tag color='blue' style={{ fontSize: '0.7rem' }}>
                            <div className='d-flex align-items-center'>
                              <Tooltip content='URL is Private to you'>
                                <QuestionCircleOutlined className='me-1' />
                              </Tooltip>
                              <span>
                                {active.status[0].toUpperCase() +
                                  active.status.substring(1)}{' '}
                                URL
                              </span>{' '}
                            </div>
                          </Tag>
                          <Tag color='green' style={{ fontSize: '0.7rem' }}>
                            <div className='d-flex align-items-center'>
                              <i class='fas fa-chart-area me-1'></i>
                              <span>Visited {active.visits} times</span>
                            </div>
                          </Tag>
                        </div>
                        <div
                          className='text-dark mt-3'
                          style={{ fontSize: '0.9rem' }}
                        >
                          <span className='bg-light px-5 py-2'>
                            {moment(active.date).format('MMMM Do YYYY, h:mm a')}{' '}
                            by{' '}
                            <b className='text-capitalize'>
                              {active.user.username}
                            </b>
                          </span>
                        </div>
                      </>
                    }
                    extra={[
                      <Button
                        type='primary'
                        key='console'
                        className='mb-2'
                        onClick={() => Router.push('/user/urls')}
                      >
                        <i class='fa-solid fa-pen-to-square me-2'></i> Edit URL
                      </Button>,
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
                      </Button>,
                    ]}
                  ></Result>
                </div>

                <input
                  type='hidden'
                  value={active.shortUrl}
                  id='shortUrl'
                ></input>
              </Card>
            </div>
          </>
        )}
        {!active && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        <div className='pt-4' style={{ borderTop: '1px solid #d3d4d7' }}>
          <div className='col-12 col-md-9 mx-auto'>
            <div className=''>
              <div className='col-12 col-md-10 mx-auto'>{errorNotice()}</div>
            </div>
            {shortenForm()}
          </div>
        </div>
      </div>
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

  return (
    <>
      <div className='container-fluid urls-main'>
        <div className='row'>
          {urlList()}
          {urlDetails()}
        </div>

        <div className='row'>
          <div className='col-md-5'></div>
          <div className='col-md-5'></div>
        </div>
      </div>
    </>
  );
};

export default Urls;
