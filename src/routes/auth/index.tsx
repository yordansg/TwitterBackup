import React from 'react';
import Layout from '../../components/Layout';
import { Auth } from './Auth';

const title = 'Authenticating';

function action(context) {
  // console.log('context ', context);
  return {
    title,
    component: (
      <Layout>
        <Auth
          title={title}
          accessToken={context.params.accessToken}
          accessTokenSecret={context.params.accessTokenSecret}
        />
      </Layout>
    ),
  };
}

export default action;
