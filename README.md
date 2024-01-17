# electrocars.ru

## Оглавление

#### 1. [Основное](#основное)

#### 2. [Техническая документация шаблона](#техническая-документация-шаблона)

#### 3. [Выгрузка на продакшн](#выгрузка-на-продакшн)

#### 4. [Перенос фронта с github на gitlab](#перенос-фронта-с-github-на-gitlab)

## Основное

**Верстка** - [Ссылка на ]

**Макет** - [Cсылка на макет в Фигме](https://www.figma.com/file/XOEJKMmxBWe4f6BVz7qQmy/electrocars.ru---%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD-(Copy)?type=design&mode=design&t=rsS5E30EM998Fqjw-0)

**Продакшн** - [Ссылка на запущенный сайт]()

**Gitlab** - [Ссылка на Gitlab]()

#### Краткое описание:

1. 

**Верстку выполнил** - 

**Фронт выполнил** - ...

**Проектный менеджер** - 

**Дизайн выполнил** - 

**Бэкенд разработчик** - ...

## Техническая документация шаблона

# Фронтенд Шаблон v2.0.0

Шаблон предназначен для верстки сайтов и веб-приложений с
использованием [Vite](https://vitejs.dev/) и [Vue 3](https://v3.vuejs.org/).

В основе шаблона используются следующие
технологии: [Pug](https://pugjs.org/api/getting-started.html), [Sass](https://sass-lang.com/), [TypeScript](https://www.typescriptlang.org/).

## Требования

- [Node.js](https://nodejs.org/en/) >= 18.0.0
- [Bunjs](https://bun.sh/) >= 1.0
- [Yarn](https://yarnpkg.com/) >= 4.0.0 или [NPM](https://www.npmjs.com/) >= 9.0.0

## Выгрузка на продакшн

1. Заполнить данные продакшена в файле `project.config.ts`, в объекте `FTP_PRODUCTION_OPTIONS`
2. Запустить команду:
	```
	bun run deploy-production
	```

## Перенос фронта с github на gitlab

1. В gitlab репозитории создать папку `/local/client-app/`
2. Перенести все содержимое github репозитория
3. Удалить папки/файлы .github, .gitignore, .git
4. В корне репозитория gitlab в файле .gitignore добавить строку `!/local/client-app/.env`
5. В [handbook](https://gitlab.in-progress.ru/frontend/frontend-rules/-/wikis/helpfull/hdbk) добавить, ссылку на gitlab фронт
6. Github репозиторий переименовать в `название репозитория-old`, либо кого то попросить
7. В github репозитории добавить в `README.md`, что репозиторий перенесен
	```
	# ВНИМАНИЕ!!! ПЕРЕЕХАЛ НА [GITLAB](ссылка) ‼ ‼
	```

## Доступные команды

Установка зависимостей

Bun:

```
curl -fsSL https://bun.sh/install | bash
```
```
source ./.bashrc
```
```
bun install --frozen-lockfile
```
```
bun run
```

Запуск в режиме разработчика

```
bun run dev
```

Собрать проект

```
bun run build
```

Собрать проект и html

```
bun run build-initial
```

Собрать проект и запустить локальный сервер для просмотра продакшн версии

```
bun run preview
```

Деплой проекта на html.xpager.ru

```
bun run deploy
```

Деплой проекта на продакшн

```
bun run deploy-production
```

### Эмулятор safari

```
npm install -g playwright
```
```
npx playwright install chromium webkit
```
```
npx playwright install-deps chromium webkit
```
```
npx playwright wk localhost:8080
```

## Структура папок и файлов

```
├── .vscode/                            # настройки VSCode
├── config/                             # настройки сборки
│   ├── helpers/                        # хелперы для сборщика
│   └── plugins/                        # плагины для сборщика
│       ├── pug/                        # плагин для сборки pug файлов
│       └── deploy/                     # плагин для деплоя проекта
├── dist/                               # собранный проект
├── src/                                # исходники
│   ├── assets/                         # ресурсы проекта (картинки, шрифты, иконки, ...)
│   │   ├── img/                        # папка для хранения картинок
│   │   └── icons/                      # папка для хранения иконок (svg)
│   ├── components/                     # VUE компоненты
│   │   ├── sliders/                    # компоненты слайдеров (Swiper)
│   │   ├── selects/                    # компоненты селектов (пример)
│   │   └── utils/                      # полезные компоненты
│   │       ├── form/                   # компоненты форм (checkbox, input, ...)
│   │       ├── modals/                 # компоненты модальных окон
│   │       ├── templates/              # компоненты шаблонов
│   │       ├── transitions/            # компоненты переходов
│   │       └── ui/                     # компоненты UI (табы, аккордеоны, ...)
│   ├── public/                         # папка для хранения статических файлов (favicon, opengraph, шрифты, ...)
│   │   ├── favicons/                   # фавиконки
│   │   ├── fonts/                      # шрифты
│   │   └── img/                        # папка для хранения статичных картинок
│   ├── scripts/                        # скрипты
│   │   ├── api/                        # модули для работы с API
│   │   ├── consts/                     # константы, постоянные данные
│   │   ├── declarations/               # декларации TS
│   │   ├── directives/                 # директивы Vue
│   │   ├── hooks/                      # хуки Vue
│   │   ├── mixins/                     # миксины Vue
│   │   ├── plugins/                    # плагины проекта
│   │   │   ├── app/                    # плагины приложения (подключемые к Vue)
│   │   │   └── vanila/                 # плагины для работы с ванильным JS 
│   │   ├── router/                     # роутер Vue
│   │   ├── store/                      # хранилище Vue
│   │   ├── utils/                      # утилиты
│   │   ├── ap.ts                       # точка входа для Vue
│   │   └── main.js                     # главный скрипт
│   ├── styles/                         # стили сайта
│   │   ├── main.scss                   # главный файл стилей
│   │   ├── base/                       # базовые стили
│   │   │   ├── nested/                 # миксины, переменные и функции
│   │   │   ├── animations.sass         # анимации, используемые скриптом animations.ts
│   │   │   ├── base.sass               # базовые стили (html, body, ...)
│   │   │   ├── keyframes.sass          # общие keyframes
│   │   │   ├── null.sass               # сброс стилей браузера
│   │   │   ├── text.sass               # базовые стили текста
│   │   │   ├── preview-styles.sass     # стили для превью страницы
│   │   │   └── variables.sass          # переменные
│   │   ├── blocks/                     # стили общих блоков
│   │   │   ├── ui/                     # стили UI (кнопки, ссылки, модальные окна ...)
│   │   │   ├── form.sass               # стили форм
│   │   │   ├── error-block.sass        # стили блока ошибки
│   │   │   └── standard-block.sass     # стили контентного блока
│   │   ├── emails/                     # стили почтовых писем
│   │   ├── libs/                       # стили различных библиотек (плагинов)
│   │   ├── modals/                     # стили модалок
│   │   ├── pages/                      # стили страниц
│   │   └── sections/                   # стили секций
│   ├── templates/                      # Разметка
│   │   ├── base/                       # базовые шаблоны
│   │   │   ├── _head.pug               # шаблон страницы
│   │   │   ├── _mixins.pug             # миксины
│   │   │   └── _scripts.pug            # подключение скриптов
│   │   ├── blocks/                     # шаблоны общих блоков
│   │   ├── emails/                     # почтовые шаблоны
│   │   ├── pages/                      # шаблоны страниц
│   │   ├── popups/                     # шаблоны попапов
│   │   └── sections/                   # шаблоны секциий
│   ├── views/                          # страницы
│   │   ├── emails/                     # почтовые шаблоны
│   └── index.html                      # главный индексовый файл проекта
├── .editorconfig                       # файл с настройками форматирования кода
├── .env                                # файл с переменными окружения
├── .eslint.config.js                   # файл с настройками eslint
├── .gitignore                          # файл с настройками git (исключает ненужные папки)
├── .npmrc                              # файл с настройками npm
├── .env.d.ts                           # файл с типами переменных окружения
├── package.json                        # файл с установленными пакетами
├── project.config.ts                   # файл с настройками проекта
├── README.md                           # документация сборки
├── tsconfig.json                       # файл с настройками typescript
├── tsconfig.node.json                  # файл с настройками typescript для node
└── vite.config.ts                      # файл с настройками vite
```

## Плагины для Vite

1. [Vite](https://yarn.pm/vite)
2. [@vitejs/plugin-vue](https://www.npmjs.com/package/@vitejs/plugin-vue)
3. vite-plugin-pug (Находится внутри проекта)
4. [vite-plugin-stylelint](https://www.npmjs.com/package/vite-plugin-stylelint)
5. [terser](https://yarn.pm/terser)
6. [@vituum/vite-plugin-juice](https://yarn.pm/@vituum/vite-plugin-juice)
7. [@spiriit/vite-plugin-svg-spritemap](https://yarn.pm/@spiriit/vite-plugin-svg-spritemap)
8. [unplugin-fonts](https://yarn.pm/unplugin-fonts)

## Плагины для CSS

1. [postcss](https://yarn.pm/postcss)
2. [postcss-html](https://yarn.pm/postcss-html)
3. [postcss-short](https://yarn.pm/postcss-short)
4. [postcss-sort-media-queries](https://yarn.pm/postcss-sort-media-queries)
5. [sass](https://yarn.pm/sass)
6. [lightningcss](https://yarn.pm/lightningcss)
7. [autoprefixer](https://yarn.pm/autoprefixer)

## Правила и плагины ESLint

1. [eslint](https://yarn.pm/eslint)
2. [@antfu/eslint-config](https://yarn.pm/@antfu/eslint-config))
3. [@stylistic/eslint-plugin](https://yarn.pm/@stylistic/eslint-plugin))

## Другие плагины сборки

1. [pug](https://yarn.pm/pug)
2. [typescript](https://yarn.pm/typescript)
3. [vue-tsc](https://yarn.pm/vue-tsc)
4. [ssh2-sftp-client](https://yarn.pm/ssh2-sftp-client)

## Плагины и зависимости для Vue

1. [vue](https://yarn.pm/vue)
2. [vue-router](https://yarn.pm/vue-router)
3. [pinia](https://yarn.pm/pinia)
4. [@vueform/multiselect](https://yarn.pm/@vueform/multiselect)
5. [@vueform/slider](https://yarn.pm/@vueform/slider)
6. [@vueform/toggle](https://yarn.pm/@vueform/toggle)
7. [@vuelidate/core](https://yarn.pm/@vuelidate/core)
8. [@vuelidate/validators](https://yarn.pm/@vuelidate/validators)
9. [v-calendar](https://yarn.pm/v-calendar)
10. [vue-awesome-paginate](https://yarn.pm/vue-awesome-paginate)
11. [vue-toastification](https://yarn.pm/vue-toastification)

## Зависимости

1. [swiper](https://yarn.pm/swiper)
2. [maska](https://yarn.pm/maska)
3. [axios](https://yarn.pm/axios)
4. [dialog-polyfill](https://yarn.pm/dialog-polyfill)
5. [lodash](https://yarn.pm/lodash)
6. [gsap](https://yarn.pm/gsap)
7. [@popperjs/core](https://yarn.pm/@popperjs/core)
8. [photoswipe](https://yarn.pm/photoswipe)
