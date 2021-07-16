<template>
  <div>
    <nav class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li>
            <a href="/">Strapi Blog </a>
          </li>
        </ul>
      </div>

      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li v-for="category in categories" v-bind:key="category.id">
            <router-link :to="{ path: '/category/' + category.id }" :key="category.id">
              {{ category.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'Nav',
  data() {
    return {
      categories: [],
    };
  },
  // apollo: {
  //   categories: gql`
  //     query Categories {
  //       categories {
  //         id
  //         name
  //       }
  //     }
  //   `,
  // },
  apollo: {
    categories: {
      query: gql`
        query Categories($language: String!) {
          categories(locale: $language) {
            id
            name
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
        return data.categories;
      },
      // Error handling
      error(error) {
        console.error("We've got an error!", error);
      },
    },
  },
};
</script>
