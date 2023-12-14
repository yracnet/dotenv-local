import dotenv from "dotenv";
import path from "path";

export type LoadEnvOpts = {
  envDir?: string;
  mode?: "development" | "production" | "testing" | "staging" | string;
  envPrefix?: string | string[];
  envInitial?: Record<string, string>;
  removeEnvPrefix?: boolean;
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
