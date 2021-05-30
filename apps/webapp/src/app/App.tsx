import React from 'react';
import { ReactComponent as BrandLogo } from '../assets/logo.svg';
import style from './App.module.css';
import { ReferralContextProvider } from './components/ReferralContextProvider';
import { ReferralList } from './pages/ReferralList';

export const App = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <BrandLogo className={style.logo} />
      </div>
      <div className={style.listItem}>
        <ReferralContextProvider>
          <ReferralList />
        </ReferralContextProvider>
      </div>
    </div>
  );
};

export default App;
