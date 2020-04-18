import express from 'express';
import bodyParser from 'body-parser';

import { loadSiteConfig } from './config';
import { coreMiddleware } from './coreMiddleware';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure site
const siteConfig = loadSiteConfig();
app.use(coreMiddleware(siteConfig));

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;

