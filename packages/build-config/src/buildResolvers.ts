import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export function builderResolvers(options: BuildOptions): Configuration["resolve"] {
  return {
    extensions: [".tsx", ".ts", ".js"],
  };
}
