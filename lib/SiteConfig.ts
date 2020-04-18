import { Page } from './Page';


export class SiteConfig {
    pages: Record<string, Page> = {};

    register(alias: string, page: Page): SiteConfig {
        this.pages[alias] = page;

        return this;
    }
}