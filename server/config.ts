import { join} from 'path';
import { memoize, mapValues } from 'lodash';
import { RouterConfig } from 'direct-react-router';

import { SiteConfig } from '../lib/SiteConfig';
import { Page } from '../lib/Page';

export function loadSiteConfig(): SiteConfig {
    // todo: захардкожен путь к файлу
    const config = require('../config').default;

    // if (config instanceof SiteConfig) {
        return config;
    // }

    // throw new Error('config is not config');
} 

export const buildRouterConfig = memoize((config: SiteConfig): RouterConfig => {
    return { 
        routes: mapValues(config.pages, (page: Page<any>) => page.route )
    };
});
