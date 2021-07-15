<template>
  <div>
    <div class="uk-section">
      <div class="uk-container uk-container-large">
        <h1>Strapi Artwork Articles</h1>

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
    };
  },
  apollo: {
    articles: gql`
      query Articles {
        articles {
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
  },
};
</script>
