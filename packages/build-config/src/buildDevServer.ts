import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function builderDevServer({ port }: BuildOptions): DevServerConfiguration {
  return {
    port,
    open: true,
    historyApiFallback: true,
  };
}
