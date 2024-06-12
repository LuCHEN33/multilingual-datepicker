## ✨ Features
### range date selection 

<div align="center">
  <img src="https://github.com/LuCHEN33/multilingual-datepicker/assets/96775861/f19ddeba-a941-496d-bcec-130aa23c0277" />
</div>
<div align="center">
  <img src="https://github.com/LuCHEN33/multilingual-datepicker/assets/96775861/f5ef53ff-32b0-4747-97f1-7381870949de" />
</div>

### You can choose your favorite language as needed

<div align="center">
  <img src="https://github.com/LuCHEN33/multilingual-datepicker/assets/96775861/ecb4eaf0-002e-4f82-92d0-6b9f24de659f" />
</div>


## 🚀 Installation
```
npm i multilingual-date-picker
```

## ⚙️ Usage

### Globle
```javascript
import { createApp } from 'vue';
import App from './App.vue';

import MultilingualDatepicker from 'multilingual-date-picker';

const app = createApp(App);
app.component('MultilingualDatepicker', MultilingualDatepicker);
```

### Local
Import package
```javascript
<script>
import  MultilingualDatepicker from 'multilingual-date-picker';

export default {
  components: {
    MultilingualDatepicker
  }
}
</script>
```

Create component in your template
```javascript

<template>
  <MultilingualDatepicker />

</template>

```

### How to add Tailwind CSS 

Installed Tailwind CSS and necessary configuration files
```
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

Initialize Tailwind CSS configuration if you haven't already
```
npx tailwindcss init -p
```

In "tailwind.config.js" file

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./src/**/*.{vue,js,ts,jsx,tsx,html}",
  "./index.html",
  "./node_modules/multilingual-date-picker/**/*.{js,ts,jsx,tsx,vue}",

  ],
  theme: {
  extend: {},
  },
  plugins: [],
  }

```

Verify Tailwind directives in main CSS file (e.g., src/style.css) 
```
@tailwind base;
@tailwind components;
@tailwind utilities;

```
Update your "postcss.config.js" file

```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

Import your CSS file in your main.js or main.ts file

```
import { createApp } from 'vue';
import App from './App.vue';
import './style.css'; // Import Tailwind CSS

createApp(App).mount('#app');

```

### How to add Font Awesome to the <head> section of your HTML file

```
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ......
    <!-- Add Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

</head>

```

