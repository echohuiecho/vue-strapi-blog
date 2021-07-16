import { createApp, h } from 'vue';
// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
// import VueApollo from 'vue-apollo';
// import VueApollo from '@vue/apollo-option';
import { createApolloProvider } from '@vue/apollo-option';

// import Markdown from 'vue3-markdown-it';
// import 'github-markdown-css/github-markdown.css';
import { createI18n } from 'vue-i18n/index';
import { createStore } from 'vuex';

import App from './App.vue';
import router from './router';

const httpLink = new HttpLink({
  // uri: 'http://localhost:3001/graphql',
  uri: process.env.VUE_APP_GRAPHQL_URL,
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// Create a new store instance.
const store = createStore({
  state() {
    return {
      lang: null,
    };
  },
  mutations: {
    // 切換語系設定
    setLang(state, value) {
      state.lang = value;
    },
  },
});

let locale = 'en';

// 檢查 localStorage 是否已有保存使用者選用的語系資訊
if (localStorage.getItem('footmark-lang')) {
  locale = localStorage.getItem('footmark-lang');
  store.commit('setLang', locale);
} else {
  store.commit('setLang', locale);
}

const i18n = createI18n({
  locale,
  // locale: 'en',
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en: {
      welcome: 'Welcome to Strapi-Vue',
    },
    'zh-Hant': {
      welcome: '歡迎來到 Strapi-Vue',
    },
    'zh-Hans': {
      welcome: '欢迎来到 Strapi-Vue',
    },
  },
});

const app = createApp({
  render: () => h(App),
});

// Install the vue plugin
// app.use(VueApollo);
app.use(createApolloProvider);
// Create a provider
// const apolloProvider = new VueApollo({
//   defaultClient: apolloClient,
// });
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
  defaultOptions: {
    // See 'apollo' definition
    // For example: default query options
    $query: {
      loadingKey: 'loading',
      fetchPolicy: 'cache-and-network',
    },
  },
  // Global error handler for all smart queries and subscriptions
  errorHandler(error) {
    console.log('Global error handler');
    console.error(error);
  },
});

app.use(apolloProvider);
// app.use(Markdown);
app.use(i18n);
app.use(store);
app.use(router);
app.mount('#app');
