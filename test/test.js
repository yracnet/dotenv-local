const { loadEnv } = require("dotenv-local");

describe("dotenv-local Library", () => {
  // Test for loading default environment variables
  it("should load default environment variables", () => {
    const envVariables = loadEnv();
    expect(envVariables).toEqual({
      APP_DB1: "https://server.db/db1_TEST",
      APP_DB2: "https://server.db/db2_TEST",
    });
  });

  // Test for loading environment variables in development mode
  it("should load environment variables in development mode", () => {
    const envVariables = loadEnv({
      mode: "development",
      envPrefix: ["APP_", "SSR_"],
    });
    expect(envVariables).toEqual({
      APP_DB1: "https://server.db/db1_DEV",
      APP_DB2: "https://server.db/db2_DEV",
      SSR_MODE: "BOT_DEV",
      SSR_DOMAIN: "web.server_DEV",
    });
  });

  // Test for loading environment variables in a custom mode
  it("should load environment variables in custom mode", () => {
    const envVariables = loadEnv({
      mode: "xxx",
      envPrefix: ["SSR_"],
    });
    expect(envVariables).toEqual({
      SSR_MODE: "BOT_XXX",
      SSR_DOMAIN: "web.server_XXX",
    });
  });

  // Test for removing the environment prefix
  it("should remove the specified environment prefix", () => {
    const envVariables = loadEnv({
      envPrefix: ["APP_"],
      removeEnvPrefix: true,
    });
    expect(envVariables).toEqual({
      DB1: "https://server.db/db1_TEST",
      DB2: "https://server.db/db2_TEST",
    });
  });

  // Test for handling undefined mode
  it("should load default variables when mode is not defined", () => {
    const envVariables = loadEnv({
      mode: undefined,
    });
    expect(envVariables).toEqual({
      APP_DB1: "https://server.db/db1_TEST",
      APP_DB2: "https://server.db/db2_TEST",
    });
  });

  // Test for loading environment variables from local files
  it("should load environment variables from local files", () => {
    const envVariables = loadEnv({
      mode: "files",
      envPrefix: ["LOCAL_"],
    });
    expect(envVariables).toEqual({
      LOCAL_DB1: "https://server.db/db1_FILES",
      LOCAL_DB2: "https://server.db/db2_FILES_LOCAL",
    });
  });

  // Test for loading variables from a non-existent mode
  it("should load default variables for a non-existent mode", () => {
    const envVariables = loadEnv({
      mode: "EXIST",
    });
    expect(envVariables).toEqual({
      APP_DB1: "https://server.db/db1_DEFAULT",
      APP_DB2: "https://server.db/db2_DEFAULT",
    });
  });
});
