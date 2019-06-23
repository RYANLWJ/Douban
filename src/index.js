import dva from 'dva';
// import './index.css';

// import './assets/css/base.css';
// import './assets/css/main.css';
// 引入全局样式

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
