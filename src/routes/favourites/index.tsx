import React from 'react';
import Favourites from './Favourites';
import Layout from '../../components/Layout/Layout';

const title = 'Favourites';

function action() {
  return {
    title,
    component: (
      <Layout>
        <Favourites title={title} />
      </Layout>
    ),
  };
}

export default action;
