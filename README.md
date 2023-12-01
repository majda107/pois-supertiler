# Setup

## M1 setup
- Install tippecanoe for tile join (MacOS Homebrew) `brew install tippecanoe`

- [Install native node runtime (x64)](https://gist.github.com/LeZuse/bf838718ff2689c5fc035c5a6825a11c)
- Use version 12 (tested on v12.22.12) `nvm use 12`

  
Your node setup should look like this:
```
➜  pois-supertiler git:(master) ✗ node -e 'console.log(process.arch)'
x64
➜  pois-supertiler git:(master) ✗ node -v
v12.22.12
➜  pois-supertiler git:(master) ✗ 
```

- If sqlite3 python error (`gyp info find Python using Python version 3.8.9 found at "/Applications/Xcode.app/Contents/Developer/usr/bin/python3"`) occurs, you need to set correct node <-> python path with `npm config set python /usr/bin/python3`

- If sqlite3 error occurs, install newer sqlite with `npm sqlite3@5.1.6`
- Rebuild repository `npm rebuild`
- If any further errors occur, remove `node_modules` folder, install dependencies with `npm install` and rebuild again


## Solution for GC memory stack exceeded

- Increase stack size with `export NODE_OPTIONS="--max-old-space-size=8192"`

## Setup debugging sources
- https://stackoverflow.com/questions/72553650/how-to-get-node-sqlite3-working-on-mac-m1
- https://github.com/TryGhost/node-sqlite3/issues/1538
- https://gist.github.com/LeZuse/bf838718ff2689c5fc035c5a6825a11c
