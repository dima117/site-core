import { Request, Response, NextFunction, RequestHandler } from 'express';
import { parseLocation } from 'direct-react-router';
import { createMemoryHistory } from 'history';
import { renderToNodeStream } from 'react-dom/server';
import { createElement } from 'react';

import { buildRouterConfig } from './config';
import { SiteConfig } from '../lib/SiteConfig';

export function coreMiddleware(config: SiteConfig): RequestHandler {
    const routeConfig = buildRouterConfig(config);

    return (req: Request, res: Response, next: NextFunction) => {
        const history = createMemoryHistory();
        history.push(req.url);

        const location = parseLocation(routeConfig, history.location);
        const component = config.pages[location.key]?.component;

        if (component) {
            renderToNodeStream(createElement(component, null)).pipe(res);
        } else {
            next();
        }
    };
}
