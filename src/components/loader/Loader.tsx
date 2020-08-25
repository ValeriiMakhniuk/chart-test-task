import React from 'react';

import loader from '../../assets/loader.gif';

export const Loader: React.FC = () => {
  return <img src={loader} alt='Loading' className='m-auto' />;
};
