## ✨ Features
range date selection 

<div align="center">
  <img src="https://github.com/LuCHEN33/multilingual-datepicker/assets/96775861/f19ddeba-a941-496d-bcec-130aa23c0277" />
</div>
<div align="center">
  <img src="https://github.com/LuCHEN33/multilingual-datepicker/assets/96775861/f5ef53ff-32b0-4747-97f1-7381870949de" />
</div>

You can choose your favorite language as needed

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

