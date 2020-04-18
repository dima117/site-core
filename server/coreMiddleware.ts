import { Request, Response, NextFunction, RequestHandler } from 'express';
import { parseLocation } from 'direct-react-router';
import { createMemoryHistory } from 'history';

import { buildRouterConfig } from './config';
import { renderHtml } from './renderer';
import { SiteConfig } from '../lib/SiteConfig';



export function coreMiddleware(config: SiteConfig): RequestHandler {
    const routeConfig = buildRouterConfig(config);

    return async (req: Request, res: Response, next: NextFunction) => {
        const history = createMemoryHistory();
        history.push(req.url);

        const location = parseLocation(routeConfig, history.location);
        const { component, getData } = config.pages[location.key] || {};

        if (component) {
            try {
                const data = getData ? await getData(location) : undefined;
                res.send(renderHtml(data, component));    
            } catch (err) {
                next(err);
            }
        } else {
            next();
        }
    };
}
