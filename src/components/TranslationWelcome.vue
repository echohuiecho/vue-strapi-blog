<template>
  <div class="uk-container hello">
    <h1>{{ $t('welcome') }}</h1>
  </div>
  <div>
    <div class="uk-container">
      <a v-if="$i18n.locale !== 'zh-Hant'" @click="changeLanguage('zh-Hant')">zh-Hant 繁</a>
      <strong v-if="$i18n.locale === 'zh-Hant'">zh-Hant 繁</strong>
      &nbsp;|&nbsp;
      <a v-if="$i18n.locale !== 'zh-Hans'" @click="changeLanguage('zh-Hans')">zh-Hans 简</a>
      <strong v-if="$i18n.locale === 'zh-Hans'">zh-Hans 简</strong>
      &nbsp;|&nbsp;
      <a v-if="$i18n.locale !== 'en'" @click="changeLanguage('en')">EN</a>
      <strong v-if="$i18n.locale === 'en'">EN</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TranslationWelcome',
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      console.dir(this.$i18n.locale);
      this.$store.commit('setLang', lang);
      console.log('this.$store.state = ', this.$store.state.lang);
      localStorage.setItem('footmark-lang', lang);
      if (this.$route.name === 'Article' || this.$route.name === 'Category') {
        this.$router.push('/');
      }
    },
  },
};
</script>
