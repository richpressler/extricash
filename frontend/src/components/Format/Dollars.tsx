import * as React from 'react';

interface DollarsProps {
  value: number | string;
}

export const Dollars: React.SFC<DollarsProps> = props => (
  <>{typeof props.value === 'string' ? Number(props.value).toFixed(2) : props.value.toFixed(2)}</>
);
