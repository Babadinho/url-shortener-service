import React from 'react';
import { redirect } from '../actions/index';

const Redirect = () => {
  //   const router = useRouter();
  return <div>Here comes JSX !</div>;
};

Redirect.getInitialProps = async (context) => {
  const { urlid } = context.query;
  let resData = {};
  if (urlid) {
    try {
      const res = await redirect(urlid);
      console.log(res);
      resData = res;
    } catch (error) {
      console.log(error);
    }
  }

  if (context?.res) {
    const go = resData?.data ? resData?.data : '/404';
    console.log(go);
    context?.res.writeHead(307, {
      Location: go,
    });
    context?.res.end();
  }

  return {};
};

export default Redirect;
