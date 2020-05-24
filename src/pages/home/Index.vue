<template>
  <section class="home background">
    <Header/>


    <div class="top">
      <div class="banner" ref="banner">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,idx) in images" :key="idx">
            <img :src="item" alt class="images">
          </swiper-slide>

          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <main class="main">

      <div class="newest">
        <h2 class="separator">Newest Food</h2>
        <Card :foods="newest"/>

        <router-link to="list">
          <button class="allButton">All Food</button>
        </router-link>
      </div>
    </main>
    <Footer/>
  </section>
</template>

<script>
import Header from "@components/Header";
import Footer from "@components/Footer";
import Card from "@components/Card";
export default {
  data() {
    return {
      swiperOption: {
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      },
      images: [
        "/banner/001.jpg",
        "/banner/002.jpg",
        "/banner/003.jpg"
      ],
      newest: []
    };
  },
  computed: {
    api() {
      return this.$store.state.api;
    }
  },
  components: {
    Header,
    Footer,
    Card
  },
  mounted() {
    this.getFood();
  },
  methods: {
    getFood() {
      this.$http
        .get(this.api.food.replace("/{id}", ""), {
          params: {
            sort: "createdAt",
            min: 0,
            max: 3
          }
        })
        .then(res => {
          this.newest = res.data.foods;
        });
    },
 
    onScroll() {
      let bannerHeight = this.$refs.banner.offsetHeight;
      window.scrollTo({
        top: bannerHeight,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes fade {
  0% {
    bottom: 10%;
    opacity: 0.5;
  }

  25% {
    bottom: 9%;
    opacity: 0.8;
  }

  50% {
    bottom: 9%;
    opacity: 0.8;
  }

  100% {
    bottom: 10%;
    opacity: 0.5;
  }
}

.fade {
  animation: fade 1s ease-in-out infinite;
}

.home {
  .top {
    position: relative;
    @media screen and(min-width:570px) {
      margin-top: -100px;
      z-index: 2;
    }
    .banner {
      width: 100%;
      height: 640px;
      @media screen and (max-width: 980px) {
        height: 320px;
      }
      .images {
        width: 100%;
        height: 640px;
        @media screen and (max-width: 980px) {
          height: 320px;
        }
      }
    }
    .info {
      position: absolute;
      z-index: 3;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 34px;
      font-weight: 800;
      line-height: 1.8;
      @media screen and (max-width: 980px) {
        font-size: 28px;
        line-height: 1.5;
      }
      @media screen and (max-width: 570px) {
        font-size: 24px;
        line-height: 1.2;
      }

      hr {
        height: 3px;
        color: #fff;
        background: #fff;
        border: none;
        outline: none;
      }
    }
    .arrow {
      cursor: pointer;
      position: absolute;
      z-index: 3;
      left: 50%;
      bottom: 5%;
      transform: translate(-50%, 0);
      color: #fff;
      font-size: 28px;
    }
  }
  .main {
    .features,
    .introduce,
    .newest {
      width: 100%;
      margin: 0 auto;
      text-align: center;
      .allButton {
        margin: 40px 0;
      }
    }
    .features {
      display: flex;
      justify-content: center;
      margin-top: 5vh;
      margin-bottom: 5vh;
      @media screen and (max-width: 980px) {
        width: 96%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .item {
        div {
          img {
            width: 96px;
            height: 96px;
          }
          margin: 0 60px;
          padding: 10px;
          background: #228be6;
        }
        p {
          font-size: 16px;
        }
      }
    }
    .introduce {
      p {
        margin: 20px;
        padding: 0 80px;
        font-size: 17px;
        text-align: center;
        @media screen and (max-width: 980px) {
          width: 96%;
          padding: 0;
        }
      }
    }
  }
}
</style>