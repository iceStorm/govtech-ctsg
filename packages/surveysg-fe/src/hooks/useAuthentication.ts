import { useContext } from 'react';

import AuthenticationContext from '~/contexts/AuthenticationContext';

const useAuthentication = () => {
  const contextValues = useContext(AuthenticationContext);

  if (!contextValues) {
    throw new Error('useAuthentication must be used within an AuthenticationContextProvider');
  }

  return contextValues;
};

export default useAuthentication;
