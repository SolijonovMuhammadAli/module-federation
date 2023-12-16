import webpack from "webpack";
import path from "path";
import { buildWebpack, BuildMode, BuildPaths } from "@packages/build-config";
import packageJson from "./package.json";

interface EnvVariables {
  mode?: BuildMode;
  post?: number;
  SHOP_REMOTE_URL?: string;
  ADMIN_REMOTE_URL?: string;
}

const paths: BuildPaths = {
  output: path.resolve(__dirname, "build"),
  html: path.resolve(__dirname, "public", "index.html"),
  entry: path.resolve(__dirname, "src", "index.tsx"),
};

export default (env: EnvVariables) => {
  const config: webpack.Configuration = buildWebpack({
    port: env.post ?? 8880,
    mode: env.mode ?? "development",
    paths,
  });

  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? "http://localhost:8882";
  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? "http://localhost:8881";

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",

      remotes: {
        shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
        admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
      },

      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          // requiredVersion: packageJson.dependencies["react"],
        },
        "react-dom": {
          eager: true,
          // requiredVersion: packageJson.dependencies["react-dom"],
        },
        "react-router-dom": {
          eager: true,
          // requiredVersion: packageJson.dependencies["react-router-dom"],
        },
      },
    })
  );

  return config;
};
