import React from 'react';
import { LoadingOverlay } from '@mantine/core';

export type Props = {
  children: React.ReactNode;
  visible: boolean;
};

const OverlayLoader: React.FC<Props> = ({ children, visible }) => {
  return (
    <div className="relative w-full">
      <LoadingOverlay visible={visible} overlayBlur={2} />
      {children}
    </div>
  );
};

export default OverlayLoader;
