
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./apollo-server/schema.graphql",
  documents: "",
  generates: {
    "lib/model/": {
      preset: "client",
      plugins: []
    },
    "./apollo-server/graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
