<template>
  <vue-markdown-it :source="markdown" id="some-id" class="my-markdown-class"/>
</template>

<script lang="ts">
import VueMarkdownIt from 'vue-markdown-it';

export default {
  name: 'YourComponent',
  components: {
    VueMarkdownIt,
  },
  data() {
    return {
      markdown: '### Hello world!',
    };
  },
};
</script>
