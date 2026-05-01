# V-Inspection

A web application for managing inspection requests in yard operations — built with Vue 3, TypeScript, and Vite.

## Features

| Feature | Status |
|---------|--------|
| Inspection request listing with tab-based status filtering | Available |
| Create new inspection request with dynamic item selection | Available |
| Inspection detail view | Not yet implemented |
| Pending Journal tab | Not yet implemented |
| Export inspection data | Not yet implemented |

## Tech Stack

- **Framework**: Vue 3 (beta) + TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios
- **Icons**: Lucide Vue
- **Linting**: ESLint + Oxlint
- **Formatting**: Prettier

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur if installed).

## Recommended Browser Setup

- **Chromium-based** (Chrome, Edge, Brave):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Enable Custom Object Formatters in DevTools](http://bit.ly/object-formatters)
- **Firefox**:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Enable Custom Object Formatters in DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports

TypeScript does not handle type information for `.vue` imports by default. We use `vue-tsc` in place of `tsc` for type checking, and [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to enable Vue type awareness in the editor.

## Customize Configuration

See the [Vite Configuration Reference](https://vite.dev/config/).

## Docker

Build and run the production image:

```sh
docker build -t v-inspection .
docker run -p 8080:80 v-inspection
```

The app will be available at `http://localhost:8080`.

## Project Setup

> Requires Node.js v20.19.0+ or v22.12.0+

```sh
bun install
```

### Development Server

```sh
bun dev
```

### Type-Check, Compile, and Minify for Production

```sh
bun run build
```

### Preview Production Build

```sh
bun preview
```

### Lint

```sh
bun lint
```

### Format

```sh
bun format
```
