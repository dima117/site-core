import { SiteConfig } from './lib/SiteConfig';
import { Index } from './example/pages/Index';
import { About } from './example/pages/About';

export const enum Pages {
    INDEX = 'index',
    ABOUT = 'about',
}

const config: SiteConfig = new SiteConfig()
    .register(Pages.INDEX, {
        route: '/',
        component: Index,
        getData: () => Promise.resolve('Index+'),
    })
    .register(Pages.ABOUT, {
        route: '/about',
        component: About,
        getData: () => Promise.reject(new Error('About+')),
    });
export default config;
