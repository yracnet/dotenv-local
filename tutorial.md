# How to Use `dotenv-local` to Load Environment Variables for Applications and Environments

`dotenv-local` is a utility library designed to load environment variables with a specific priority order, ideal for managing configurations across different environments like development, production, or testing. In this tutorial, we will show you how to use `dotenv-local` to load environment variables for different applications and environments.

## Installation

To get started, install the library via npm or yarn:

```bash
npm install dotenv-local
# or
yarn add dotenv-local
```

## Usage

For a detailed explanation of the available options, refer to the official [repository documentation](https://github.com/yracnet/dotenv-local).

### Import the Library

Import `loadEnv` from `dotenv-local`:

```typescript
import { loadEnv } from "dotenv-local";
```

### Example for MongoDB Variables

Let's say you have multiple `.env` files:

- `.env`: Contains generic environment variables.
- `.env.local`: Contains local development overrides.
- `.env.production`: Contains production-specific variables.
- `.env.production.local`: Contains production overrides.

Using `dotenv-local`, you can ensure that environment variables related to MongoDB are loaded correctly, with the proper overrides depending on your environment.

#### Basic Usage

Here is a simple example to load all environment variables, without specific prefixes or options:

```typescript
import { loadEnv } from "dotenv-local";
const envVariables = loadEnv();
console.log(envVariables);
```

This will load all the environment variables available in the `.env` files.

#### Custom Options for MongoDB

Now, let’s load only MongoDB-related environment variables, with custom options:

```typescript
import { loadEnv } from "dotenv-local";

const { MONGO_URI, MONGO_PASSWORD } = loadEnv({
  envPrefix: "MONGO_",
  envInitial: {
    MONGO_URI: "mongodb://localhost:27017",
    MONGO_PASSWORD: "mongodb://localhost:27017",
  },
  removeEnvPrefix: false,
});
console.log({ MONGO_URI, MONGO_PASSWORD });
```

This will load only the environment variables that start with `MONGO_`, and it will not remove the prefix.

#### Custom Options for Express

Next, let’s load only environment variables related to Express, using a different prefix:

```typescript
import { loadEnv } from "dotenv-local";

const { HOST, PORT } = loadEnv({
  envPrefix: "DEPLOY_",
  envInitial: {
    DEPLOY_HOST: "127.0.0.1",
    DEPLOY_PORT: "3000",
  },
  removeEnvPrefix: true,
});
console.log({ HOST, PORT });
```

This will load the variables `DEPLOY_HOST` and `DEPLOY_PORT` from your environment files, removing the `DEPLOY_` prefix.

#### Load Multiple Variables for MongoDB and Express

Now, let’s load environment variables related to both MongoDB and Express using different prefixes:

```typescript
import { loadEnv } from "dotenv-local";

const { MONGO_URI, MONGO_PASSWORD, DEPLOY_HOST, DEPLOY_PORT } = loadEnv({
  envPrefix: ["DEPLOY_", "MONGO_"],
  envInitial: {
    MONGO_URI: "mongodb://localhost:27017",
    MONGO_PASSWORD: "mongodb://localhost:27017",
    DEPLOY_HOST: "127.0.0.1",
    DEPLOY_PORT: "3000",
  },
  removeEnvPrefix: false,
});
console.log({ MONGO_URI, MONGO_PASSWORD, DEPLOY_HOST, DEPLOY_PORT });
```

This will load the variables `DEPLOY_HOST` and `DEPLOY_PORT` from your environment files, as well as `MONGO_URI` and `MONGO_PASSWORD`, without removing their prefixes.

### Conclusion

Using `dotenv-local`, you can easily manage environment variables for different applications and environments (e.g., development, production). By defining custom prefixes, initial values, and the loading order, you can ensure that only the relevant variables for MongoDB, Express, or any other service are loaded, making your configuration process clean and efficient.

For more details on available options and how to configure them, check the official [documentation](https://github.com/yracnet/dotenv-local).

---

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
