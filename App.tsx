import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {i18nInitializedPromise} from './src/i18n';

// Import components
import ThemeProvider from './src/components/ThemeProvider';
import MainContent from './src/components/MainContent';
import LoadingScreen from './src/components/LoadingScreen';

import './global.css';

function App(): React.JSX.Element {
  const [isI18nReady, setIsI18nReady] = useState(false);

  // Wait for i18n initialization
  useEffect(() => {
    i18nInitializedPromise
      .then(() => {
        setIsI18nReady(true);
      })
      .catch(err => {
        console.error('i18n initialization error:', err);
        // Even if there's an error, we should set it to ready
        setIsI18nReady(true);
      });
  }, []);

  // Always wrap with Provider to ensure Redux context is available
  return (
    <Provider store={store}>
      <ThemeProvider>
        {!isI18nReady ? <LoadingScreen /> : <MainContent />}
      </ThemeProvider>
    </Provider>
  );
}

export default App;
