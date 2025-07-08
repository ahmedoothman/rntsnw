import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import AppWrapper from './src/components/AppWrapper';

import './global.css';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

export default App;
