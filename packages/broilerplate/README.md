# Broilerplate

## What is it?

A reusable Webpack / React configuration toolbox / broilerplate.

## Why is it?

I don't believe in create-react-app. You always end up
ejecting, and I think that it is too naive. That is why I believe create-react-app-rewired,
which is a great tool, is doomed to fail.

My own previous reusable broilerplates have all failed. Some believe
that all broilerplate projects are doomed to fail.

Still, mostly everything Webpack and broilerplate stuff are copy-paste.
Making a webpack config is not hard per se, what is hard is to know and understand
all the caveats. This knowledge also grows by doing, thus causing somewhat hidden technical debt
in older projects.

Broilerplate offers a thin abstraction over Webpack. It has features that enable loaders and plugins,
and a two by two matrix of feature sets: development / production + client / server.

From these combinations Broilerplate "just knows" how to configure your application.

* Production grade settings from the get go.
* Re-configure / remove / add anything
* Never eject

And so forth. Will write good instructions when thoughts are validated.

## How?

### Initialize a project

* `yarn init`

### Add Broilerplate and all it's peer dependencies

Add broilerplate and all it's peer dependencies, somehow. This script will do.

```sh
(
  export PKG=@dr-kobros/broilerplate;
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add --dev "$PKG@latest"
)
```

### Initialize Broilerplate

This will create the two base files for Broilerplate, `.broilerplate.js` and `webpack.config.babel.js`

* `yarn run broilerplate`

### Tune your configuration

Broilerplate's default configuration is a sane one, but you may edit `.broilerplate.js`
to add and / or remove some features.

### Add package scripts

Edit your package.json to contain the following scripts:

```json
"scripts": {
  "start": "cross-env NODE_ENV=development webpack-dev-server --port 9000 --history-api-fallback --hot --inline --disable-host-check --progress",
  "build:client": "cross-env NODE_ENV=production webpack --progress --display-optimization-bailout",
  "build:server": "cross-env NODE_ENV=production webpack --progress --config webpack.server.config.babel.js --display-optimization-bailout",
  "build:node": "cross-env NODE_ENV=production babel src/index.js > dist-server/index.js",
  "build": "yarn run build:client && yarn run build:server && yarn run build:node"
}
```

### Run start script for the first time

This will ensure that all the files from your selected feature set exist.

* `yarn run start`

### Develop

Have fun!
