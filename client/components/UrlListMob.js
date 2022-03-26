import React from 'react';
import { List, Divider, Empty } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import moment from 'moment';

const UrlListMob = ({
  urls,
  active,
  loadUserUrls,
  handleModal,
  shortenForm,
}) => {
  return (
    <div className='col-md-5 d-sm-block d-md-none d-lg-none d-xl-none d-xxl-none'>
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
                  onClick={() => handleModal(item)}
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
                    <i className='fas fa-chart-area ms-2'></i>
                  </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      )}
      <div className='mb-2'>{shortenForm()}</div>
      {!urls && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </div>
  );
};

export default UrlListMob;
