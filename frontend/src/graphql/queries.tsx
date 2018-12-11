import gql from 'graphql-tag';

export const meQuery = gql`
  {
    me {
      id
      monthlyIncome
      bills {
        name
        dayOfMonth
        amount
      }
      accounts {
        id
        name
        balance
        transactions(orderBy: "-date", limit: 1) {
          id
          date
          amount
        }
      }
    }
  }
`;
