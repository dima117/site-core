import { Request, Response, NextFunction, RequestHandler } from 'express';
import { parseLocation, RouterLocation } from 'direct-react-router';
import { createMemoryHistory } from 'history';

import { buildRouterConfig } from './config';
import { SiteConfig } from '../lib/SiteConfig';

export function dataMiddleware(config: SiteConfig): RequestHandler {
    const routeConfig = buildRouterConfig(config);

    return (req: Request, res: Response, next: NextFunction) => {
        const history = createMemoryHistory();
        history.push(req.url);

        const location: RouterLocation = parseLocation(routeConfig, history.location);
        const getData = config.pages[location.key]?.getData;

        if (getData) {
            getData(location).then(data => res.json(data), err => next(err));
        } else {
            next();
        }
    };
}