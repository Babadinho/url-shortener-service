import React from 'react';
import { Button } from 'antd';
import Router from 'next/router';

const Head = ({ registerHandler, user }) => {
  return (
    <section className='section-hero flex-column flex-column-reverse flex-md-row d-flex align-items-center bg-white pt-5'>
      <div className='header-section text-center text-md-start mb-5'>
        <h2>
          Track & Personalize your <br /> Shortened URLs
        </h2>
        <p>
          Shorten, personalize, and share your <br />
          fully branded short URLs.
        </p>
        <div className='mt-4'>
          {user && (
            <Button
              type='primary'
              size='large'
              className='rounded-0 px-4'
              style={{ fontSize: '1.1rem' }}
              onClick={() => Router.push('/user/urls')}
            >
              Go to Dashboard
            </Button>
          )}
          {!user && (
            <Button
              type='primary'
              size='large'
              className='rounded-0 px-4'
              style={{ fontSize: '1.1rem' }}
              onClick={registerHandler}
            >
              Get Started for Free
            </Button>
          )}
        </div>
      </div>
      <div className='image-wrapper'>
        <img className='img-fluid' src='/images/short-header.png' />
      </div>
    </section>
  );
};

export default Head;
