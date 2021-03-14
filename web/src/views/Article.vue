<template>
  <div v-if="model">
    <mavon-editor
      :value="model.body"
      :subfield="false"
      defaultOpen="preview"
      :toolbarsFlag="false"
      :editable="false"
      :scrollStyle="true"
      :ishljs="true"
      :boxShadow="false"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: null,
    }
  },
  props: ['id'],
  methods: {
    async fetch() {
      const res = await this.$http.get(`article/${this.id}`)
      this.model = res.data
    },
  },
  created() {
    this.fetch()
  },
}
</script>

<style>
</style>