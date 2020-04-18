import { Request, Response, NextFunction, RequestHandler } from 'express';
import { parseLocation } from 'direct-react-router';
import { createMemoryHistory } from 'history';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import serialize from 'serialize-javascript';

import { buildRouterConfig } from './config';
import { SiteConfig } from '../lib/SiteConfig';

function buildDataScript(data: any): string {
    return `<script>window.__SERVER_DATA = ${serialize(data)};</script>`;
}

export function coreMiddleware(config: SiteConfig): RequestHandler {
    const routeConfig = buildRouterConfig(config);

    return async (req: Request, res: Response, next: NextFunction) => {
        const history = createMemoryHistory();
        history.push(req.url);

        const location = parseLocation(routeConfig, history.location);
        const { component, getData } = config.pages[location.key] || {};

        if (component) {
            const parts = [];

            if (getData) {
                parts.push(buildDataScript(await getData(location)));
            }

            parts.push(renderToString(createElement(component)))

            res.send(parts.join(''));
        } else {
            next();
        }
    };
}
