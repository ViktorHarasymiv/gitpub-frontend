import React from 'react';
import { ClipLoader } from 'react-spinners';

interface SpinnerProps {
  loading?: boolean;
  size?: number;
  color?: string;
  cssOverride?: object;
}

function Loader({ loading }: SpinnerProps) {
  return (
    <ClipLoader
      color="var(--color-scheme-accent)"
      loading={loading}
      size={24}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Loader;
