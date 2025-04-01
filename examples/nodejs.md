# Node.js Examples

Let's explore some Node.js commands:

```sh
node -v
```

Let's create and run a simple Node.js script:

```sh
echo "console.log('Hello from Node.js!');" > hello.js
node hello.js
```

Let's try some Node.js REPL commands:

```sh
node -e "console.log(process.versions)"
```

Let's check npm information:

```sh
npm -v
npm config list
```

Let's try a more complex Node.js command:

```sh
node -e "const os = require('os'); console.log('System Info:', { platform: os.platform(), arch: os.arch(), cpus: os.cpus().length })"
```

---

Note: These commands demonstrate different ways to execute Node.js code:
1. Direct Node.js version check
2. Running a script file
3. Using the -e flag for inline code
4. npm commands
5. Complex Node.js operations 