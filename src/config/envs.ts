import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  
  MSQL_HOST: get('MSQL_HOST').required().asString(),
  MSQL_USER: get('MSQL_USER').required().asString(),
  MSQL_PASSWORD: get('MSQL_PASSWORD').required().asString(),
  MSQL_DATABASE: get('MSQL_DATABASE').required().asString(),
  MSQL_PORT: get('MSQL_PORT').required().asString(),


}



