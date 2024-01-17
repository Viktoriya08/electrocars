import fs from 'node:fs';
import { send } from 'vite';
import type { Plugin, ViteDevServer } from 'vite';
import { compileFile } from 'pug';
import type { LocalsObject, Options } from 'pug';

interface PugSettings {
	options: Options
	locals: LocalsObject
}

function transformPugToHtml(server: ViteDevServer,	path: string,	options: Options,	locals: LocalsObject) {
	try {
		const compiled = compileFile(path, options)(locals);
		return server.transformIndexHtml(path, compiled);
	}
	catch (error) {
		console.log(error);
		return server.transformIndexHtml(path, 'Pug Compile Error');
	}
}

export function vitePluginPugServe({ options, locals }: PugSettings): Plugin {
	return {
		name: 'vite-plugin-pug-serve',
		enforce: 'pre',
		apply: 'serve',
		handleHotUpdate: ({ file, server }) => {
			if (file.endsWith('.pug'))
				server.ws.send({ type: 'full-reload' });
		},
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				const { root } = server.config;
				let fullReqPath = root + req.url;

				if (fullReqPath.endsWith('/'))
					fullReqPath += 'index.html';

				if (fullReqPath.endsWith('.html')) {
					if (fs.existsSync(fullReqPath))
						return next();

					const pugPath = `${
					fullReqPath.slice(0, Math.max(0, fullReqPath.lastIndexOf('.'))) || fullReqPath
				}.pug`;
					if (!fs.existsSync(pugPath))
						return send(req, res, '404 Not Found', 'html', {});

					const html = await transformPugToHtml(server, pugPath, options, locals);
					return send(req, res, html, 'html', {});
				}

				return next();
			});
		},
	};
}
