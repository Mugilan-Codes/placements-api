import { NODE_ENV } from '../../config';
import buildDevLogger from './dev-logger';
import buildProdLogger from './prod-logger';

// TODO: store the error log files in database like MongoDB
// REF: winston-mongo - https://www.section.io/engineering-education/logging-with-winston/

// REF: youtube (Node winston logging) - https://youtu.be/A5YiqaQbsyI
// REF: Winston Logger - https://coralogix.com/blog/complete-winston-logger-guide-with-hands-on-examples/
// REF: Logs Folder - https://stackoverflow.com/a/53863158/12381908

// REF: Node.js logging best practices https://blog.logrocket.com/node-js-logging-best-practices/

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6,
// };

let logger = null;

if (NODE_ENV === 'development') {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

export default logger;
