import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingComponent = (isLoading) => {
  return (
    <div style={{ display: 'flex', position: 'absolute', top: '50%' }}>
      {isLoading && <CircularProgress color="primary" />}
    </div>
  );
};

export default LoadingComponent;
