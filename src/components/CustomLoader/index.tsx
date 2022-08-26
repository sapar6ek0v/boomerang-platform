import React from 'react';
import { Loader } from '@mantine/core';

const CustomLoader = () => {
  return (
    <div className="fixed top-1/2	left-1/2 translate-x-1/2 translate-y-1/2">
      <Loader />
    </div>
  );
};

export default CustomLoader;
