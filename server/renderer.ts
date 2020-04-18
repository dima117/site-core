import { template } from 'lodash';
import { readFileSync } from 'fs';
import {resolve} from 'path';
import serialize from 'serialize-javascript'; 
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';

// todo: захардкожен путь к файлу
const templatePath = resolve(__dirname, '../../index.html');
const tpl = readFileSync(templatePath).toString();


function buildDataScript(data: any): string {
    return `<script>window.__SERVER_DATA = ${serialize(data)};</script>`;
}

function buildHtml(component: any): string {
    const html = renderToString(createElement(component));

    return `<div id="root">${html}</div>`;
}

export function renderHtml(data: any, component: any) {
    const compied = template(tpl);
        return compied({ 
        html: buildHtml(component), 
        dataScript: buildDataScript(data)
    });
}