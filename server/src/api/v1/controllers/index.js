import path from 'path';
import { eagerLoadFiles } from '../utils';

const config = {
  basename: path.basename(module.filename),
  dirname: __dirname
};

const controllers = eagerLoadFiles(config);
export default controllers;
