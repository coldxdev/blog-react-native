# Blog React Native

## Installation
Install the dependencies and devDependencies and start the server.

```sh
cd blog-react-native
npm i
npm run start
```

### Building apk

For production release:

```sh
npm install -g eas-cli
eas login
eas build -p android --profile preview
```
