import React from 'react';
import { Button } from 'antd';

const Faq = () => {
  return (
    <section className='container-fluid section-faq bg-white px-10 pt-5 pb-5'>
      <div className='row'>
        <h2 className='text-center mb-4'>Frequently Asked Questions</h2>
        <div className='col-md-8 col-lg-8 col-sm-12 mx-auto'>
          <div class='accordion accordion-flush' id='accordionFlushExample'>
            <div class='accordion-item'>
              <h2 class='accordion-header' id='flush-headingOne'>
                <button
                  class='accordion-button collapsed shadow-none'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#flush-collapseOne'
                  aria-expanded='false'
                  aria-controls='flush-collapseOne'
                >
                  How can I redirect my short URL?
                </button>
              </h2>
              <div
                id='flush-collapseOne'
                class='accordion-collapse collapse'
                aria-labelledby='flush-headingOne'
                data-bs-parent='#accordionFlushExample'
              >
                <div class='accordion-body'>
                  All you need to do is share the short URL like you would a
                  normal URL. If users visit the short URL, they will be
                  redirected to the specified page.
                </div>
              </div>
            </div>
            <div class='accordion-item'>
              <h2 class='accordion-header' id='flush-headingTwo'>
                <button
                  class='accordion-button collapsed shadow-none'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#flush-collapseTwo'
                  aria-expanded='false'
                  aria-controls='flush-collapseTwo'
                >
                  How can I track my URL Visits
                </button>
              </h2>
              <div
                id='flush-collapseTwo'
                class='accordion-collapse collapse'
                aria-labelledby='flush-headingTwo'
                data-bs-parent='#accordionFlushExample'
              >
                <div class='accordion-body'>
                  This option is only available to registered users. Once you
                  create an account you can see the number of visits for all
                  your URLs from your URL list.
                </div>
              </div>
            </div>
            <div class='accordion-item'>
              <h2 class='accordion-header' id='flush-headingThree'>
                <button
                  class='accordion-button collapsed shadow-none'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#flush-collapseThree'
                  aria-expanded='false'
                  aria-controls='flush-collapseThree'
                >
                  WIll my URL ever be deleted?
                </button>
              </h2>
              <div
                id='flush-collapseThree'
                class='accordion-collapse collapse'
                aria-labelledby='flush-headingThree'
                data-bs-parent='#accordionFlushExample'
              >
                <div class='accordion-body'>
                  Unless you are creating the URL as a guest. All URLs from
                  registered users will never be deleted. Unless you delete them
                  yourself.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
