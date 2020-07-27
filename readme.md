## Create Adobe-CEP extension
### Adobe-CEP with React, Material-UI, Native Node modules, Webpack, Babel and ExtendScript

<img src="kap.gif"/>

this Adobe-CEP extension creator bootstraps for creating Adobe CC extensions easily with
modern web technologies and with native node.js modules for session logic
and with support for extendscript (host app). It is built in a semi opinionated
way so you can focus on writing your great extensions.

#### how to build
first run `npm  install`, then choose  
- `npm run build:dev` / `npm run build:prod` - will build into `./dist` folder
- `npm run deploy:dev` / `npm run deploy:prod` - will deploy `./dist` folder into the extension folder.
if in dev mode, it will create a **symbolic link**, otherwise it will copy the entire folder.
- `npm run archive` will create a self signed certificate and sign a **ZXP** package ready to publish
- `npm run release:dev` / `npm run release:prod` - will build, deploy and archive (in production)

the output is a `./dist` extension folder
```
dist
    com.package.name/
        index.html
        .debug
        CSXS/
            manifest.xml
        icons/
            favicon.ico    
        node_modules/
        host/
            index.js
        client-dist/
            bundle.js
            main.css
        session-dist/
            bundle.js
        host/
        libs/
            CSInterface.js
```

#### how to customize
start with `./pluginrc.js`, this is the plugin config I created, here is an example
```javascript
module.exports = {
    extensionBundleId: 'com.hendrix.demo',
    extensionBundleName: 'demo',
    extensionBundleVersion: '1.0.1',
    cepVersion: '7.0',
    panelName: 'hendrix demo',
    width: '400',
    height: '600',
    root: root,
    sourceFolder: srcFolder,
    destinationFolder: destFolder,
    certificate : {
        customCert: {
            path: '',
            password: 'password'
        },
        selfSign: {
            country: 'US',
            province: 'CA',
            org: 'org',
            name: 'name',
            password: 'password',
            locality: 'locality',
            orgUnit: 'orgUnit',
            email: 'your@email.com',
            output: certPath
        }

    }

}
```
when build is happening, then the build will pickup your package id and panel name
and other configurations from this file and will use it against a template that will
generate the `./dist/CSXS/manifest.xml` and `.debug` (in dev mode) file for you.
also, I added support for a custom certificate and for a self-signed certificate.  
feel free to modify the contents of the `assets` folder for you own need.

#### how to debug
debugging is achieved through the chrome debugger
- release a dev build with `npm run release:dev`
- inside Adobe, open the extension, you may have to restart if this is the first time.
- open a browser at the following location http://localhost:`PORT`/ (See port number in .debug file)

### what does this include ?
this bootstrap is composed of three parts

#### Front end side
inside `src/client-src` you have the entry point for creating ReactJS application.
installing modules is against the project root, see `/project.json`.  
a nice feature, that it has is that you can use `webpack-dev-server` to see
your UI results with watching at the browser, simply use:
- `npm start` or
- `npm run client:dev-server`
this will generate the template html for you and run it in your browser,
and will rebuild on code changes which is nice to have.

#### back end side / session (using node modules)
inside `src/session-src` you have the entry point for using native node.js modules.
Adobe-CEP supports instantiating Node.js runtime as well as Chromium but I believe
most developers would like to use the power of Node.js for doing IO.

Adobe-CEP does provide it's native IO for disk access and also using Chromium
you can use the browser `Fetch` api, but it can lead to very bad code structuring.

I inject the `session` object in the `window` object and therefore it is accessible
even from the front end side.  
Also notice, that this folder has it's own `node-modules` separate from the root folder,
this is because, they are built differently from the Front end side.

using node modules can enhance the functionality.

#### ExtendScript side
inside `src/host`, you will put you `jsx` files, by default I will load `index.jsx`,
but I highly advise to use the session to load a `jsx` file dynamically so it can pick
up it's `#include` dependencies otherwise it won't (this is a known issue)

#### Webpack side
so why am I using **Webpack** ?  
without webpack, you will have to require modules by absolute path, which is not nice,
also I wanted to enjoy a better ES6 syntax.

why are there separate **Webpack** configs for `client` and `session`?  
very good question. It boils down to the following fact, the client/front-end side, uses
pure web technologies and can be bundeled with all of it's dependencies and it has a classic
`web` target for webpack.  
the `session` side uses native node.js modules and has a `node` target in it's config, they
are not to be mixed together or else subtle configuration will not work. this is equivalent
to other projects using `electron`, also, it is not advisable to bundle native node.js modules,
this is not efficient.

#### Build scripts
inside `/build-scripts`, you will find the webpack configs and also the build and deploy
scripts. They use no-fancy node modules to keep things simple (no libs like Gulp).

you can find:  
- `/build-script/build.js development/production` this will build the entire thing
- `/build-script/deploy.js development/production` this will deploy the entire thing into
the adobe extensions folder in debug mode currently, I still need to sign the extension
- `/build-script/archive.js` this will archive the distribution in **ZXP** format, ready to be published

#### FAQ
**Q:** how do I add more web development modules (like redux) ?  
**A:** simply `npm install redux` from the root `./` directory  

**Q:** how do I add more session native node modules (like fs-extra) ?  
**A:** simply `npm install fs-extra` from the `./src/session-src` directory, when building occurs, these
modules will be copied to the `./dist` folder.  

**Q:** how do I add some js lib without npm ?  
**A:** simply edit `./src/index.html`  

**Q:** how do I add some extendscript files ?  
**A:** you must add them to `./src/host/` folder and then you have two choices. one, is to edit
`./assets/CSXS/manifest.xml` file to declare them, or load them at runtime dynamically (better, you can read
    about it more later)

#### How to install
- for dev mode with chrome debugging, simply `npm run release:dev`
- for prod mode with **zxp** signed package, simply `npm run release:prod`, to install the zxp package,
i advise the following resource:
    - http://install.anastasiy.com/
    - http://zxpinstaller.com/
    - https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Package%20Distribute%20Install
    - http://uberplugins.cc/help/how-to-install-photoshop-extension/
