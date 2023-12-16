import webpack from "webpack";
import { builderDevServer } from "./buildDevServer";
import { builderLoader } from "./buildLoaders";
import { builderPlugins } from "./buildPlugins";
import { builderResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === "development";

  return {
    mode: mode ?? "development",
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: builderPlugins(options),
    module: {
      rules: builderLoader(options),
    },
    resolve: builderResolvers(options),
    devtool: isDev && "inline-source-map",
    devServer: isDev ? builderDevServer(options) : undefined,
  };
}
