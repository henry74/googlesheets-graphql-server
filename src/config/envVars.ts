import * as dotenv from "dotenv";

dotenv.config();

const ENVIRONMENT_VARIABLES = {
  CLIENT_EMAIL: "",
  PRIVATE_KEY: ""
};

let fetched: boolean = false;

const fetchEnvVar = envVarName => {
  ENVIRONMENT_VARIABLES[envVarName] =
    process.env[envVarName] || ENVIRONMENT_VARIABLES[envVarName] || "";
};

export default function envVars() {
  if (fetched) {
    return ENVIRONMENT_VARIABLES;
  }
  Object.keys(ENVIRONMENT_VARIABLES).map(fetchEnvVar);
  Object.freeze(ENVIRONMENT_VARIABLES);
  fetched = true;
  return ENVIRONMENT_VARIABLES;
}
