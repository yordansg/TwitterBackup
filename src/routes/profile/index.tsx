import React from 'react';
import Profile from './Profile';
import Layout from '../../components/Layout';

const title = 'Profile';

function action() {
  return {
    title,
    component: (
      <Layout>
        <Profile title={title} />
      </Layout>
    ),
  };
}

export default action;
