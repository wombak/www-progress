# @wombak/www-progress

[![Netlify Status](https://api.netlify.com/api/v1/badges/3ccacd49-d920-4fe8-8822-27c8e4f210e5/deploy-status)](https://app.netlify.com/sites/wombak-progress/deploys)

> This project showcases the current progress of [@wombak/www](https://github.com/wombak/www) via a _3d-like_ visual interface.

**[progress.wombak.xyz](https://progress.wombak.xyz)**

## Development

To run this project locally first install the dependencies:

```bash
npm install
```

Next you'll need to configure your environment variables (see [`.env.example`](/.env.example) for the required values), and then start the [Parcel](https://parceljs.org) bundler via the `start` script:

```bash
npm start
```

To build the project for production you can use the `build` script:

```bash
npm run build
```

### Other scripts

- **`format`**: Apply [Prettier](https://prettier.io/) formatting to the codebase.
- **`lint`**: Run [ESLint](https://eslint.org/) on the codebase.

> Note: Prettier and ESLint automatically run on a `pre-commit` hook via [Husky](https://github.com/typicode/husky).
