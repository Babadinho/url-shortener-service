import React from 'react';
import { Card, Result, Button, Tag, Empty } from 'antd';
import { Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import moment from 'moment';
import { QuestionCircleOutlined } from '@ant-design/icons';
import BarChartIcon from '@mui/icons-material/BarChart';

const UrlDetails = ({
  active,
  handleCopy,
  copy,
  disable,
  errorNotice,
  shortenForm,
  handleEdit,
}) => {
  return (
    <>
      <div
        className='col-md-7 d-none d-md-block'
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
                              <BarChartIcon fontSize='small' />
                              <span>Visited {active.visits} times</span>
                            </div>
                          </Tag>
                        </div>
                        <div
                          className='text-dark mt-3'
                          style={{ fontSize: '0.9rem' }}
                        >
                          <span className='bg-light px-5 py-2'>
                            {moment(active.date).format('DD/MM/YYYY, h:mm a')}{' '}
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
                        onClick={handleEdit}
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
};

export default UrlDetails;
