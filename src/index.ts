import dotenv from "dotenv";
import path from "path";

/**
 * Options for loading environment variables.
 */
export type LoadEnvOpts = {
  /**
   * Directory where the environment variable files are located.
   * If not specified, the current working directory will be used.
   * @default process.cwd()
   */
  envDir?: string;
  /**
   * The mode for the environment. Common modes are "development", "production",
   * "testing", "staging". If not provided, it can be any string value.
   * @default process.env.NODE_ENV || "production"
   */
  mode?: "development" | "production" | "testing" | "staging" | string;
  /**
   * Prefix to filter environment variables. Can be a single string or an array of strings.
   * If not specified, no prefix filtering is applied.
   * @default "APP_"
   */
  envPrefix?: string | string[];
  /**
   * Initial set of environment variables to be loaded.
   * If not provided, no initial variables will be set.
   * @default {}
   */
  envInitial?: Record<string, string>;
  /**
   * If true, removes the environment variable prefix from the variable names.
   * If false or not provided, the prefix will be preserved.
   * @default false
   */
  removeEnvPrefix?: boolean;
  /**
   * The encoding used for reading environment files. Typically "utf-8".
   * If not specified, defaults to "utf-8".
   * @default "utf-8"
   */
  encoding?: string;
};

const getEnvFilesForMode = (mode: string) => {
  return [
    /** default file */ `.env`,
    /** local file */ `.env.local`,
    /** mode file */ `.env.${mode}`,
    /** mode local file */ `.env.${mode}.local`,
  ];
};

export const loadEnv = (opts: LoadEnvOpts = {}) => {
  const {
    mode = process.env.NODE_ENV || "production",
    envDir = process.cwd(),
    envPrefix = "APP_",
    envInitial = {},
    removeEnvPrefix = false,
    encoding = "utf-8",
  } = opts;
  const envFiles = getEnvFilesForMode(mode);
  const prefixList = (
    Array.isArray(envPrefix) ? envPrefix : [envPrefix]
  ).filter((it) => it);

  if (mode === "local") {
    throw new Error("The 'local' mode is not allowed.");
  }

  if (envPrefix.length === 0) {
    throw new Error("The 'envPrefix' cannot be an empty string or array.");
  }

  const envFileLoad: Record<string, string> = { ...envInitial };

  envFiles.forEach((file) => {
    const filePath = path.join(envDir, file);
    dotenv.configDotenv({
      path: filePath,
      override: true,
      processEnv: envFileLoad,
      encoding,
    });
  });

  const envResult: Record<string, string> = {};
  const regExp = removeEnvPrefix
    ? new RegExp(`^(${prefixList.join("|")})`)
    : false;

  Object.entries(envFileLoad).forEach(([key, value]) => {
    const hasPrefix = prefixList.some((p) => key.startsWith(p));
    if (hasPrefix) {
      const newKey = regExp ? key.replace(regExp, "") : key;
      envResult[newKey] = value;
    }
  });
  return envResult;
};
