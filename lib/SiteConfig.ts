import { Page } from './Page';

export type AnyPage = Page<any>;

export class SiteConfig {
    pages: Record<string, AnyPage> = {};

    register<T>(alias: string, page: Page<T>): SiteConfig {
        this.pages[alias] = page;

        return this;
    }
}