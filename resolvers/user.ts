const resolvers = {
  Query: {
    me: (parent, args, { me }) => {
      return {
        id: 1,
        username: 'rmpressler'
      }
    }
  }
};

export default resolvers;