import * as React from 'react';
import { OperationVariables, ApolloQueryResult } from 'apollo-client';

export interface RefetchOnMountProps {
  refetch: (variables?: OperationVariables) => Promise<ApolloQueryResult<any>>;
  variables?: OperationVariables;
}

export class RefetchOnMount extends React.Component<RefetchOnMountProps> {
  componentDidMount() {
    this.props.refetch(this.props.variables);
  }

  render() {
    return <></>;
  }
}
