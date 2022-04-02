import React from 'react';
import { List, Divider, Empty } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';
import BarChartIcon from '@mui/icons-material/BarChart';

const UrlList = ({ urls, active, loadUserUrls, handleListToggle }) => {
  return (
    <div className='col-md-5 d-none d-md-block'>
      {urls && (
        <>
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
            <div
              className='py-2 px-4'
              style={{
                background: '#f8f9fa',
              }}
            >
              <span
                style={{
                  fontSize: '1rem',
                  color: '#6b6767',
                }}
              >
                Total URLs Shortened: {urls.length}
              </span>
            </div>
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
                      padding: '1.5rem 1.5rem 1.5rem',
                    }}
                  >
                    <List.Item.Meta
                      title={
                        <>
                          <div className='small'>
                            {moment(item.date).fromNow()}
                          </div>{' '}
                          <div
                            className='fw-bold'
                            style={{ fontSize: '1.2rem' }}
                          >
                            {item.shortUrl}
                          </div>
                        </>
                      }
                      description={item.originalUrl}
                    />
                    <div className='d-flex'>
                      <span>{item.visits}</span>{' '}
                      <BarChartIcon className='ms-1' />
                    </div>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </>
      )}
      {!urls && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </div>
  );
};

export default UrlList;
