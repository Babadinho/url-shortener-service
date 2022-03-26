import { useRouter } from 'next/router';

const withAuth = (Component) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const Router = useRouter();

      const user = localStorage.getItem('urlshortener');

      // If there is no user we redirect to "/" page.
      if (!user) {
        Router.replace('/');
        return null;
      }

      // If user we just render the component that was passed with all its props

      return <Component {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
