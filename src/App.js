import React from 'react';

import Layout from './hoc/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder'
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <div>
      <Layout>
        <BurguerBuilder />
        <Checkout />
      </Layout>
    </div>
  );
}

export default App;
