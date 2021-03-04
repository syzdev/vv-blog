<template>
  <div>
    <h1>测试</h1>
    <ul v-for="item in items" :key="item._id">
      <li>{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('/category/list')
      this.items = res.data
      console.log(this.items)
    }
  },
  created() {
    this.fetch()
  },
}
</script>

<style>

</style>