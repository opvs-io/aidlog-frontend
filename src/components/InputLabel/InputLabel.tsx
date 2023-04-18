import React from 'react';

type Props = {
  children: React.ReactNode;
};

const InputLabel = ({ children }: Props) => {
  return (
    <label className="block text-sm font-medium text-gray-900 mb-1">
      {children}
    </label>
  );
};

export default InputLabel;
