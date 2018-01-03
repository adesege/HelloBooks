import path from 'path';
import { eagerLoadFiles } from '../utils';

const config = {
  basename: path.basename(module.filename),
  dirname: __dirname
};

const middlewares = eagerLoadFiles(config);
export default middlewares;
