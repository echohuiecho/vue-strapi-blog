<template>
  <div>
    <div class="uk-section">
      <div class="uk-container uk-container-large">
        <h1>Strapi Artwork Articles</h1>
        <!-- Apollo loading state -->
        <h2 v-if="$apollo.queries.articles.loading">Loading...</h2>
        <ArticlesList :articles="articles"></ArticlesList>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ArticlesList from '../components/ArticlesList.vue';

export default {
  components: {
    ArticlesList,
  },
  data() {
    return {
      articles: [],
      lang: '',
    };
  },
  // --- Standard query ---
  // apollo: {
  //   articles: gql`
  //     query Articles {
  //       articles {
  //         id
  //         title
  //         content
  //         image {
  //           url
  //         }
  //         category {
  //           name
  //         }
  //       }
  //     }
  //   `,
  // },
  // --- Query with parameters ---
  apollo: {
    articles: {
      query: gql`
        query Articles($language: String!) {
          articles(locale: $language) {
            id
            title
            content
            image {
              url
            }
            category {
              name
            }
          }
        }
      `,
      // Reactive parameters
      variables() {
        // Use vue reactive properties here
        return {
          language: this.$store.state.lang,
        };
      },
      update(data) {
        // console.log(data);
        // The returned value will update
        // the vue property 'pingMessage'
        return data.articles;
      },
      // Error handling
      error(error) {
        console.error("We've got an error!", error);
      },
    },
  },
  // watch: {
  //   '$store.state.lang': {
  //     handler(nv) {
  //       console.log('new state', nv);
  //     },
  //     immediate: true, // provides initial (not changed yet) state
  //   },
  // },
  mounted() {
    // console.dir(this.$i18n.locale);
    this.lang = this.$i18n.locale;
  },
};
</script>
