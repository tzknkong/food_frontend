<template>
  <section class="foods background">
    <Header background="dark" />
    <main class="main">
      <button class="more" @click="$router.push({ name: 'create' })">
        + New Food
      </button>
      <div class="gallery">
        <Card :foods="foods" />
      </div>

      <h3>{{ total }} foods in total.</h3>
      <button class="more" @click="onMore" :disabled="moreAble">
        Discover More
      </button>
    </main>

    <Footer />
  </section>
</template>

<script>
import Header from '@components/Header'
import Footer from '@components/Footer'
import Card from '@components/Card'
import Upload from '@components/Upload'

export default {
  data() {
    return {
      min: 0,
      max: 4,
      per: 2,
      foods: [],
      total: 0,
      moreAble: false
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    api() {
      return this.$store.state.api
    }
  },
  components: {
    Header,
    Footer,
    Card,
    Upload
  },
  mounted() {
    this.fetch()
  },
  methods: {
    upload(path = '') {
      this.form.banner = path
    },
    fetch() {
      this.$http
        .get(this.api.food.replace('/{id}', ''), {
          params: {
            sort: 'createdAt',
            min: this.min,
            max: this.max
          }
        })
        .then(res => {
          const data = res.data.foods
          const total = res.data.total
          if (data.length === 0) {
            this.$Message.info('No more foods.')
            this.moreAble = true
            return
          }
          this.total = total
          this.foods = this.foods.concat(data)
        })
    },
    
    
    onMore() {
      this.min = this.max
      this.max = this.max + this.per
      this.fetch()
    }
  }
}
</script>

<style lang="less" scoped>
.foods {
  .main {
    .gallery {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .item {
        display: flex;
        flex-direction: column;
        .banner {
          width: 360px;
          height: 360px;
        }
      }
    }
    .signin {
      font-size: 16px;
    }
    .more {
      display: block;
      margin: 30px auto 50px auto;
    }

    .form,
    .signin {
      margin: 120px auto;
    }
    .form {
      width: 80%;
      @media screen and(min-width:1189px) {
        width: 880px;
      }

      input {
        height: 40px;
        border: none;
        border-bottom: 1px solid #ddd;
        &:focus {
          border-bottom: 1px solid #228be6;
        }
        transition: all 0.4s ease-in-out;
      }
    }
    button {
      margin: 40px 0;
    }
  }
}
</style>
