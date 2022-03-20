import React from 'react';
import { Result, Button } from 'antd';
import Router from 'next/router';

const Custom404 = () => {
  return (
    <div className='mt-5'>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, Link expired or page does not exist.'
        extra={
          <Button type='primary' onClick={() => Router.push('/')}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default Custom404;
