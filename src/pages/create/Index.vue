<template>
  <section class="foods background">
    <Header background="dark" />
    <main class="main">
      <h2 class="separator">{{$route.query._id?'Edit Food':'New Food'}}</h2>
      <div v-if="isLogin" class="form">
        <label for="banner">BANNER:</label>
        <Upload :srcPath="form.banner" text="Upload Banner" @upload="upload" name="banner" />

        <label for="name">NAME:</label>
        <input v-model="form.name" name="name">

        <label for="description">DESCRIPTION:</label>
        <textarea v-model="form.description" name="description" />

        <label for="material">MATERIAL:</label>
        <textarea v-model="form.material" name="material"/>

        <label for="practice">PRACTICE:</label>
        <textarea v-model="form.practice" name="practice"/>

        <button @click="$router.go(-1)">BACK</button> <button :disabled="submitAble" @click="onSubmit">SUBMIT</button>
      </div>

      <router-link
        v-else
        class="signin"
        :to="{path: '/sign',query:{type:'signin',from:'foods'}}"
      >
        <button class="siginbutton">You can add a food after signing in</button>
      </router-link>
    </main>

    <Footer/>
  </section>
</template>

<script>
import Header from "@components/Header";
import Footer from "@components/Footer";
import Card from "@components/Card";
import Upload from "@components/Upload";

export default {
  data() {
    return {
      min: 0,
      max: 4,
      per: 2,
      foods: [],
      total: 0,
      moreAble: false,
      form: {
        userId: this.$store.state.userId,
        banner: "",
        name: "",
        description: "",
        material: "",
        practice: ""
      },
      uploadList:[],
      submitAble: true
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    api() {
      return this.$store.state.api;
    }
  },
  components: {
    Header,
    Footer,
    Card,
    Upload
  },
  mounted() {
    this.fetchDetails();
  },
  watch: {

    form: {
      deep: true,
      handler: function (newValue) {
        for (let key of Object.keys(newValue)) {
          if (newValue[key] === "") {
            this.submitAble = true;
            return;
          }
        }
        this.submitAble = false;
      }
    }
  },
  methods: {
    upload(path = "") {
      this.form.banner = path;
    },
    /**submit*/
    fetchDetails() {
      if (this.$route.query._id)
        this.$http
          .get(this.api.food.replace("{id}", this.$route.query._id))
          .then(res => {
            this.form = res.data[0];
            this.uploadList = [{
              name: 'img1.jpg',
              url: this.form.banner
            }]
          });
    },
    onSubmit() {
      this.submitAble = true;
      if (this.$route.query._id) {
        this.$http
          .put(
            this.api.food.replace("{id}", this.$route.query._id),
            this.form
          )
          .then(res => {
            this.$Message.success(res.message);
          });
      } else {
        this.$http
          .post(this.api.food.replace("/{id}", ""), this.form)
          .then(res => {
            this.$Message.success(res.message);
            this.$router.push({ name: 'list' })
          });
      }

    }
  }
};
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
      margin: 40px auto 100px auto;
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
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
