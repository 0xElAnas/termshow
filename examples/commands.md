# System Information

Let's check some system details:

- Node.js version: `$ node -v`
- System uptime: `$ uptime`
- Current directory: `$ pwd`

And some network info:
```sh
!curl -I https://example.com
```

---

4. Differences between command types:

- Inline commands (`$ command`): Part of the text flow, displayed but not executed
- Code block commands (```sh): Can be auto-executed with ! prefix
- Regular code blocks: Just displayed as code


```sh
echo "Hello, World!"
```

```sh
ls -la
```

```sh
pwd
```