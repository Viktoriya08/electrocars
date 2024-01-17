import { basename, resolve } from 'node:path';
import process from 'node:process';
import { loadEnv } from 'vite';

const PROJECT_ENV = loadEnv('', process.cwd());
const PROJECT_NAME = PROJECT_ENV.VITE_APP_NAME ?? basename(__dirname);
const PROJECT_TITLE = PROJECT_ENV.VITE_APP_TITLE ?? PROJECT_NAME;

const SOURCE_DIR = resolve(__dirname, 'src');
const OUTPUT_DIR = resolve(__dirname, 'dist');
const VIEWS_DIR = resolve(SOURCE_DIR, 'views');

const BASE_PORT = 8080;

const FTP_OPTIONS = {
	host: '',
	user: '',
	password: '',
	serverPath: `/srv/www/html.xpager.ru/htdocs/${PROJECT_NAME}`,
};

const FTP_PRODUCTION_OPTIONS = {
	host: '',
	user: '',
	password: '',
	serverPath: '/local/client-app/dist/', // Пример: /srv/www/academy.hctraktor.org/htdocs/public/local/client-app/dist/
};

export { SOURCE_DIR, OUTPUT_DIR, VIEWS_DIR, BASE_PORT, FTP_OPTIONS, FTP_PRODUCTION_OPTIONS, PROJECT_NAME, PROJECT_TITLE };

