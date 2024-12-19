# Ful Stack Deployment Techniques for Project
### 1. add proxy server on vite.config.js

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  plugins: [react()],
});
```

### 2. Rename all API with /api convention

```js
app.get("/products"); //❌❌
app.get("/api/products"); //✅✅
```


### 3. replace all your API URL with "/api"

### 4. Comment Await Commands and important credentials on client side

### 5. copy build to server

Build your client

```bash
npm run build
```

copy and paste in vercel

### 6. use express.static middleware

```js
const path = require("path");
app.use(express.static(path.join(__dirname, "dist")));
```

### 7. Replace your default get function with this

```js
app.get("*", (__, res) => {
  console.log(path.join(__dirname, "dist", "index.html"));
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
```

### 8. add vercel.json for full-stack deployment

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    },
    {
      "src": "dist/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    },
    {
      "src": "/(.+\\.[a-z]+)$",
      "dest": "/dist/$1"
    }
  ]
}
```

### 9. Deploy & add to Firebase for Authorization
```bash
vercel  --prod
```

