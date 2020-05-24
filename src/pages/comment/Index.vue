<template>
  <section class="user background">
    <Header background="dark"/>
    <main class="main">
      <h2 class="separator">Your comments</h2>
      <table class="comments">
        <tr>
          <th>food name</th>
          <th>content</th>
          <th>gallery</th>
          <th>created at</th>
          <th>operate</th>
        </tr>

        <p v-if="comments.length === 0" class="nodata">No data.</p>

        <tr v-for="(item,idx) in comments" :key="idx" v-else>
          <td>
            <router-link
              v-if="!item.food.isDeleted"
              :to="{path:'details',query:{id:item.food._id}}"
            >{{ item.food.name }}</router-link>
            <div v-else>{{ item.food.name }} <strong style="color:red">（DELETE）</strong></div>
          </td>
          <td>{{ item.content }}</td>
          <td>
            <img
              class="logo"
              :src="gallery"
              v-for="(gallery,idx) in item.gallery.slice(0,2)"
              :key="idx"
            >
          </td>
          <td>{{ moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}}</td>
          <td>
            <button class="delete" @click="onDeleteComment(idx)">Delete</button>
          </td>
        </tr>
      </table>
    </main>
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
      userInfo: {
        address: "",
        avatar: "",
        email: "",
        nickname: "",
        updated: ""
      },
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
    this._fetchComment();
  },
  components: {
    Header,
    Upload
  },
  methods: {

    _fetchComment() {
      this.$http
        .get(this.api.comment.replace("/{id}", ""), {
          params: {
            userId: this.id
          }
        })
        .then(
          res => {
            this.comments = res.data;
          },
          err => {
            this.$Message.error(err);
          }
        );
    },

    onDeleteComment(idx) {
      const id = this.comments[idx]._id;

      this.$http.delete(this.api.comment.replace("{id}", id)).then(
        res => {
          // reload
          this._fetchComment();
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