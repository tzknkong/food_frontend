<template>
  <section class="user background">
    <Header background="dark"/>
    <main class="main">
      <h2 class="separator">Your food</h2>
      <table class="foods">
        <tr>
          <th>name</th>
          <th>banner</th>
          <th>description</th>
          <th>created at</th>
          <th>operate</th>
        </tr>

        <p v-if="foods.length === 0" class="nodata">No data.</p>

        <tr v-for="(item,idx) in foods" :key="idx" v-else>
          <td>
            <router-link :to="{path:'details',query:{id:item._id}}">{{ item.name }}</router-link>
          </td>
          <td>
            <img class="logo" :src="item.banner" alt>
          </td>
          <td>
            <span class="description">{{ item.description && item.description.substring(0,30)}} ...</span>
          </td>
          <td>{{ moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")  }}</td>
          <td>
            <button  @click="$router.push({name:'create',query:{_id:item._id}})">Edit</button>
            <button class="delete" @click="onDeletefood(idx)">Delete</button>
          </td>
        </tr>
      </table>
    </main>
    <Footer/>
  </section>
</template>

<script>
import Header from "@components/Header";
import Upload from "@components/Upload";
import * as Types from "@types";
import moment from 'moment'
export default {
  data() {
    return {
      moment,
      foods: [],
      comments: []
    };
  },
  computed: {
    id() {
      return this.$store.state.userId;
    },
    api() {
      return this.$store.state.api;
    }
  },
  mounted() {
    this._fetchfood();
  },
  components: {
    Header,
    Upload
  },
  methods: {
    _fetchfood() {
      this.$http
        .get(this.api.food.replace("/{id}", ""), {
          params: {
            min: 0,
            max: 99,
            userId: this.id
          }
        })
        .then(res => {
          this.foods = res.data.foods;
        });
    },
    onDeletefood(idx) {
      const id = this.foods[idx]._id;

      this.$http.delete(this.api.food.replace("{id}", id)).then(
        res => {
          // reload
          this._fetchfood();
          this.$Message.success("success");
        },
        err => {
          this.$Message.error(err.toString());
        }
      );
    },
    upload(path) {
      this.userInfo.avatar = path;
    }
  }
};
</script>

<style lang="less" scoped>
.user {
  .main {
    width: 96%;
    @media screen and(min-width:1189px) {
      width: 960px;
    }
    .userinfo {
      text-align: center;
      padding: 20px 10px;
      background: #fff;
      border-radius: 4px;

      label {
        text-align: center;
        width: 30%;
        margin-right: 12px;
        font-size: 14px;
      }

      input {
        width: 50%;
        height: 40px;
        line-height: 40px;
      }

      .item {
        display: flex;
        align-items: center;
        margin: 22px 0;
      }

      .update {
        display: block;
        margin: 40px auto;
      }

      .tips {
        text-align: right;
        color: #666;
        font-size: 14px;
        margin-right: 40px;
      }
    }

    table {
      width: 100%;
      margin: 40px 0;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      th {
        font-size: 18px;
        padding: 20px 0;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
      }

      td {
        text-align: center;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
      }

      .logo {
        width: 80px;
        height: 80px;
        margin: 5px;
      }

      .description {
        width: 220px;
        margin-left: 0;
        margin-right: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .delete {
        background-color: #e26d6d;
      }

      .nodata {
        font-size: 16px;
      }
    }
  }
}
</style>