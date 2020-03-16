import dva from 'dva';
//使用import导入。
import countModel from './models/example';
import router from './router';

import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(countModel);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');