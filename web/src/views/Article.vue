<template>
  <div v-if="model">
    <div class="title">{{ model.title }}</div>
    <div class="desc">
      <span>时间：{{ model.updatedAt | timeFormat }}</span>
      <span>分类：</span>
      <span class="desc-category">
        <span
          v-for="category in model.category"
          :key="category._id"
          >{{ category.name }}</span
        >
      </span>
    </div>
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
      console.log(res.data)
    },
  },
  created() {
    this.fetch()
  },
}
</script>

<style lang="scss" scoped>
.title {
  line-height: 40px;
  font-size: 25px;
  margin-bottom: 20px;
  cursor: pointer;
  text-align: center;
}
.desc {
  margin-bottom: 20px;
  color: #999;
  text-align: center;
  >span:nth-child(2) {
    padding-left: 30px;
  }
  .desc-category span:not(:last-child):after {
    content: '、';
  }
}
</style>