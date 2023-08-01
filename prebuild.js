const fs = require('fs');
const manifest = require('./public/manifest.json');

const env = process.env.REACT_APP_ENV_NAME; 

manifest.name = `MyApp - ${env}`;

fs.writeFileSync('./public/manifest.json', JSON.stringify(manifest, null, 2));
