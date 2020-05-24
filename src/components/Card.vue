<template>
  <ul class="card">
    <li
      v-for="(item, idx) in foods"
      :key="idx"
      :class="idx % 2 != 0 ? 'item even' : 'item'"
    >
      <img :src="item.banner" />
      <div class="detials">
        <h2 class="text">NAME:{{ item.name }}</h2>
        <h4 class="text">DESCRIPT:{{ item.description }}</h4>
        <p class="text">MATERIAL:{{ item.material }}</p>
        <p class="text">PRACTICE:{{ item.practice }}</p>
        <router-link :to="{ path: 'details', query: { id: item._id } }">
          <button>Details</button>
        </router-link>
        <button @click="onCollection(item)" style="margin-left:10px">
          Collection
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    foods: {
      type: Array,
      required: true
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    api() {
      return this.$store.state.api
    },
    userId() {
      return this.$store.state.userId
    }
  },
  methods: {
    async onCollection(item) {
      if (!this.isLogin) {
        return this.$Message.info('Please login!')
      }
      const res = await this.$http.post(
        this.api.collection.replace('/{id}', ''),
        {
          food: item._id,
          user: this.userId
        }
      )
      this.$Message.success(res.message)
    }
  }
}
</script>

<style lang="less" scoped>
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.text-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.card {
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 980px) {
    width: 96%;
  }

  .even {
    flex-direction: row-reverse;
  }
  .item {
    display: flex;
    margin-bottom: 40px;
    border: 1px solid #ddd;
    border-radius: 4px;

    @media screen and (max-width: 980px) {
      flex-direction: column;
    }

    img {
      width: 180px;
      height: 180px;
      min-height: 180px;
      min-width: 180px;

      @media screen and (max-width: 980px) {
        width: 100%;
        height: 100%;
        min-height: 100%;
        min-width: 100%;
      }
    }
    .detials {
      padding: 8px 20px;
      text-align: center;
      overflow: hidden;
      flex-grow: 1;
      h2,
      h4 {
        text-align: left;
      }
      h4 {
        margin-bottom: 10px;
      }
      p {
        line-height: 1.8;
        text-align: left;
        margin: 0;
        margin-bottom: 10px;
      }
      button {
        padding: 8px 8px;
        background: #fff;
        color: #495057;
        &:hover {
          color: #fff;
          background: #228be6;
        }
        transition: all 0.4s ease-in-out;
      }
    }
  }
}
</style>
