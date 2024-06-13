import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import Application from './App';
import { debugTokenExpiration } from './utils/jwt.util';

debugTokenExpiration();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Application />
  </StrictMode>,
);
