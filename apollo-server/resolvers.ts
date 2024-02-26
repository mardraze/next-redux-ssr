import { User } from "@prisma/client"

export interface GQLContext {
    user: User | null
    browserCardKey: string
    wid: string,
    workspaceId: number
}

const resolvers = {
    Query: {
      me: async (parent, args, contextValue:GQLContext) => {
        if(contextValue.user){
          return contextValue.user
        }
      }
    }
}
  
export default resolvers