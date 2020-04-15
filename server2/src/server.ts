import express from 'express';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import path from 'path';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 })
);

app.get('/xxx', (req, res) => {
    res.json(__dirname);
});

if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorHandler());
}

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
