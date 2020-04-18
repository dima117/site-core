

import { SiteConfig } from './lib/SiteConfig';
import { Index } from './example/pages/Index';
import { About } from './example/pages/About';

export const enum Pages {
    INDEX = 'index',
    ABOUT = 'about'
};

const config: SiteConfig = new SiteConfig()
    .register(Pages.INDEX, { route: '/', component: Index })
    .register(Pages.ABOUT, { route: '/about', component: About })
;

export default config;