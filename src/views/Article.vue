<template>
  <div>
    <div class="uk-container">
      <h1>Language selected:
        <span v-if="$i18n.locale === 'en'">EN</span>
        <span v-else>zh-Hant</span>
      </h1>
    </div>
    <div
      v-if="article.image"
      id="banner"
      class="uk-height-small uk-flex uk-flex-center uk-flex-middle
      uk-background-cover uk-light uk-padding"
      :data-src="article.image[0].url"
      uk-img
    >
      <h1>{{ article.title }}</h1>
    </div>

    <div class="uk-section">
      <div class="uk-container uk-container-small">
        <p v-if="article.content">
          {{ article.content }}
        </p>
        <p v-if="article.date">
          {{ convertedDate }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import gql from 'graphql-tag';

export default {
  name: 'Article',
  data() {
    return {
      article: {
        localizations: [],
      },
      convertedDate: '',
      moment,
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      routeParam: this.$route.params.id,
    };
  },
  methods: {
    dateTime() {
      this.convertedDate = moment(this.article.date).format('YYYY-MM-DD');
    },
  },
  apollo: {
    article: {
      query: gql`
        query Articles($id: ID!) {
          article(id: $id) {
            id
            title
            content
            image {
              url
            }
            date
            localizations {
              id
              title
              locale
            }
          }
        }
      `,
      variables() {
        return {
          id: this.routeParam,
          language: this.$store.state.lang,
        };
      },
      update(data) {
        return data.article;
      },
      error(error) {
        console.error("We've got an error!", error);
      },
    },
  },
  watch: {
    '$store.state.lang': {
      handler(nv) {
        console.log('new state', nv, this.$route);
      },
      immediate: true, // provides initial (not changed yet) state
    },
  },
  mounted() {
    this.dateTime();
  },
};
</script>
