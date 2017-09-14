import http from 'http';
import path from 'path';
import swaggerTools from 'swagger-tools';
import jsyaml from 'js-yaml';
import fs from 'fs';

const serverPort = 8080;
export default(app) => {
// swaggerRouter configuration
  const options = {
    swaggerUi: '/swagger.json',
    controllers: path.join(__dirname, './controllers'),
    useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
  };

  // The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
  const spec = fs.readFileSync(path.join(__dirname, './api/swagger.yaml'), 'utf8');
  const swaggerDoc = jsyaml.safeLoad(spec);
  console.log('you are me', '========');
  // Initialize the Swagger middleware
  swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());
  });
};
