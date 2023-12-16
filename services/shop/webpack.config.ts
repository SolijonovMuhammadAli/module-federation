import webpack from "webpack";
import path from "path";
import { buildWebpack, BuildMode, BuildPaths } from "@packages/build-config";
import packageJson from "./package.json";

interface EnvVariables {
  mode: BuildMode;
  post: number;
}

const paths: BuildPaths = {
  output: path.resolve(__dirname, "build"),
  html: path.resolve(__dirname, "public", "index.html"),
  entry: path.resolve(__dirname, "src", "index.tsx"),
};

export default (env: EnvVariables) => {
  const config: webpack.Configuration = buildWebpack({
    port: env.post ?? 8881,
    mode: env.mode ?? "development",
    paths,
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "shop",
      filename: "remoteEntry.js",
      exposes: {
        "./Router": "./src/router/index.tsx",
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
        "react-router-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
      },
    })
  );

  return config;
};
