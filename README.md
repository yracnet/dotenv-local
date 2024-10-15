## dotenv-local

`dotenv-local` is a utility library for loading environment variables with a specific order of priority, ideal for managing configurations in different environments such as development, production, and testing.

### Installation

```
npm install dotenv-local
# or
yarn add dotenv-local
```

### Usage

#### Define the `LoadEnvOpts` type

```typescript
export type LoadEnvOpts = {
  envDir?: string;
  mode?: "development" | "production" | "testing" | "staging" | string;
  envPrefix?: string | string[];
  envInitial?: Record<string, string>;
  removeEnvPrefix?: boolean;
  encoding?: string;
};
```

#### Import the library

```javascript
import { loadEnv, LoadEnvOpts } from "dotenv-local";
```

#### Define the options

```javascript
const opts: LoadEnvOpts = {
  envDir: "/path/to/env/files",
  mode: "production",
  envPrefix: ["APP_"],
  envInitial: {
    DEFAULT_VAR: "default_value",
  },
  removeEnvPrefix: false,
  encoding: "utf-8",
};
```

#### Use the library

```javascript
const envVariables = loadEnv(opts);
console.log(envVariables);
```

### Options

- **envDir**: Directory where the environment files are located. Default: Current working directory (`process.cwd()`).
- **mode**: Application mode used to determine which environment files to load. Default: `process.env.NODE_ENV || "production"`.
- **envPrefix**: Prefix for environment variables to be loaded. Default: `'APP_'`.
- **envInitial**: Initial values for environment variables. Default: `{}`.
- **removeEnvPrefix**: Whether to remove the prefix from loaded environment variables. Default: `false`.
- **encoding**: Encoding of the environment files. Default: `'utf-8'`.

#### Default options

```javascript
const {
  mode = process.env.NODE_ENV || "production",
  envDir = process.cwd(),
  envPrefix = "APP_",
  envInitial = {},
  removeEnvPrefix = false,
  encoding = "utf-8",
} = opts;
```

### Prioritizing File Loading with `getEnvFilesForMode`

The library determines the order of environment file loading based on the provided mode (e.g., mode = development).

```javascript
[".env", ".env.local", ".env.development", ".env.development.local"];
```

This array represents the priority order in which environment files will be loaded. Files with later positions in the array will override those defined earlier.

### Examples

#### Basic Usage

```javascript
import { loadEnv } from "dotenv-local";
const envVariables = loadEnv();
console.log(envVariables);
```

#### Custom Options

```javascript
import { loadEnv } from "dotenv-local";
const customOptions = {
  envDir: "/path/to/custom/env/files",
  mode: "staging",
  envPrefix: ["API_", "MONGO_"],
  envInitial: {
    INITIAL_VAR: "initial_value",
  },
  removeEnvPrefix: true,
  encoding: "utf-16",
};
const envVariables = loadEnv(customOptions);
console.log(envVariables);
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
