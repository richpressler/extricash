const resolvers = {
  Query: {
    account: (parent, args, { me }) => {
      return {
        id: 1,
        name: 'billing'
      }
    }
  }
};

export default resolvers;