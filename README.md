# Photo Frame (photo-frame-pwa)

Photo Viewer

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).


## Carousel tips

To pause when mouse over
```
      @mouseenter="autoplay = 0"
      @mouseleave="autoplay = 8000"
```