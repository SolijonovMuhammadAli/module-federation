import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";

export function builderLoader({ mode }: BuildOptions): ModuleOptions["rules"] {
  const isDev = mode === "development";

  return [
    {
      test: /\.s[ac]ss$/i,
      use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    },
    {
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
  ];
}
