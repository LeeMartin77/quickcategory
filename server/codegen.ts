import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3012/api/graphql",
  generates: {
    "src/graphql/types/__generated__.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
