import React from 'react';
import { Card, Result, Button, Tag, Empty } from 'antd';
import { Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import moment from 'moment';
import { QuestionCircleOutlined, SmileOutlined } from '@ant-design/icons';

const MobileUrlDetails = ({
  active,
  handleCopy,
  copy,
  disable,
  errorNotice,
  shortenForm,
}) => {
  return (
    <>
      <div
        className=''
        style={{
          borderTop: 'none',
          backgroundColor: '#fff',
        }}
      >
        {active && (
          <>
            <div className='mb-2 ant-card'>
              <Card className='box-shadow'>
                <div className='url-details-mobile pt-5 pb-4'>
                  <Result
                    icon={<SmileOutlined />}
                    className='mb-4'
                    title={
                      <Link href={active.shortUrl}>
                        <b className='text-dark'>{active.shortUrl}</b>
                      </Link>
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
                              <i className='fas fa-chart-area me-1'></i>
                              <span>Visited {active.visits} times</span>
                            </div>
                          </Tag>
                        </div>
                        <div
                          className='text-dark mt-3'
                          style={{ fontSize: '0.9rem' }}
                        >
                          <span className='bg-light px-3 py-2'>
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
                        <i className='fa-solid fa-pen-to-square me-2'></i> Edit
                        URL
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
      </div>
    </>
  );
};

export default MobileUrlDetails;
