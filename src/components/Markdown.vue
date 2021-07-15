<template>
  <components :is="html" class="markdown-body"></components>
</template>

<script>
import MarkdownIt from 'markdown-it';

export default {
  name: 'Markdown',
  props: {
    content: String,
  },
  data: () => ({
    md: null,
  }),
  computed: {
    // 使用 computed 才能在動態綁定時動態更新
    html() {
      let res = this.md.render(this.content);
      // 使用正則表達式將站內鏈接替換為 router-link 標籤
      res = res.replace(
        /<a href="(?!http:\/\/|https:\/\/)(.*?)" rel="external nofollow" >(.*?)<\/a>/g,
        '<router-link to="$1">$2</router-link>',
      );
      // 使用正則表達式將站外鏈接在新視窗中打開
      res = res.replace(
        /<a href="(.*?)" rel="external nofollow" >(.*?)<\/a>/g,
        '<a href="$1" rel="external nofollow" target="_blank">$2</a>',
      );
      return {
        template: `<div>${res}</div>`,
      };
    },
  },
  created() {
    this.md = new MarkdownIt();
  },
};
</script>
