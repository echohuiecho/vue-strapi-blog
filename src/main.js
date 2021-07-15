import { createApp, h } from 'vue';
// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
// import VueApollo from 'vue-apollo';
// import VueApollo from '@vue/apollo-option';
import { createApolloProvider } from '@vue/apollo-option';

// import Markdown from 'vue3-markdown-it';
// import 'github-markdown-css/github-markdown.css';

import App from './App.vue';
import router from './router';

const httpLink = new HttpLink({
  // You should use an absolute URL here
  // uri: 'http://localhost:3001/graphql',
  uri: process.env.VUE_APP_GRAPHQL_URL,
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// createApp(App).use(router).mount('#app');
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
});

app.use(apolloProvider);
// app.use(Markdown);
app.use(router);
app.mount('#app');
