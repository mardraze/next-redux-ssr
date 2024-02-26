import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express'
import http from 'http'
import cors from 'cors'

import resolvers, { GQLContext } from "./resolvers"
import { User } from '@prisma/client';
import Session from '../server-lib/session';
import { workspaceManager } from '../server-lib/workspace';
import { exceptionHandler } from '../server-lib/exception-handler';
import cookieParser from 'cookie-parser';
import { readFileSync } from 'fs';

const typeDefs = readFileSync(__dirname+'/schema.graphql', { encoding: 'utf-8' });

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<GQLContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(cookieParser())
  app.use(
    '/',
    cors<cors.CorsRequest>({origin: true, credentials: true}),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => { 
        const uid = req.cookies['uid']
        let user:User | null = null
        if(uid){
            const session = new Session()
            user = await session.getUserFromJwt(uid+'')
        }

        const browserCardKey = (req.headers['x-browser-card-key'] || '') + '';
        const widHeader = (req.headers['x-workspace'] || '')+'';
        let wid = ''
        let workspaceId = 0
        if(widHeader && user && user.id){
            try{
                const {id} = await workspaceManager.getAuthWorkspace(wid, user.id)
                wid = widHeader
                workspaceId = id
            }catch(e){
                exceptionHandler(e)
            }
        }

        return { user, wid, workspaceId, browserCardKey};
      },
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
}
startApolloServer().then(() => console.log('Apollo Server started'));