import gql from 'graphql-tag';

export const LoginMutation = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const RegisterMutation = gql`
  mutation RegisterMutation($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      token
    }
  }
`;

export const CreateTransactionsMutation = gql`
  mutation createTransactions($input: [CreateTransactionInput!]!) {
    createTransactions(input: $input) {
      id
    }
  }
`;
