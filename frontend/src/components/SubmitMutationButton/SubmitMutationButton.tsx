import { Button } from '@material-ui/core';
import * as React from 'react';
import { MutationFn } from 'react-apollo';
import { FetchResult } from 'apollo-link';

export interface SubmitMutationButtonProps {
  preSubmit: () => object;
  mutation: MutationFn;
  refreshQueries?: string[];
  postSubmit?: (result: object) => void;
}

export const SubmitMutationButton: React.SFC<SubmitMutationButtonProps> = props => {
  const handleClick = async () => {
    const variables = props.preSubmit();
    const result = await props.mutation({
      variables
    });
    props.postSubmit && props.postSubmit(result as FetchResult);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      {props.children}
    </Button>
  );
};
