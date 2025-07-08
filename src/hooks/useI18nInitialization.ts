import {useState, useEffect} from 'react';
import {i18nInitializedPromise} from '../i18n';

export const useI18nInitialization = () => {
  const [isI18nReady, setIsI18nReady] = useState(false);

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

  return {isI18nReady};
};
