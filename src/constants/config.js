import { version } from '../../package.json';

export const API_HOST = `${process.env.API_HOST}`;
export const CLIENT_ID = `${process.env.CLIENT_ID}`;
export const CLIENT_SECRET = `${process.env.CLIENT_SECRET}`;
export const BUILD_TIME = process.env.BUILD_TIME;
export const APP_VERSION = version;


