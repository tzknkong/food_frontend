<template>
  <footer class="footer">
    <div class="meta">
      <div class="inner">
        <div class="inner-item">
          <h2>{{ support.text }}</h2>
          <ul>
            <li v-for="(item,idx) in support.list" :key="idx">
              <a href="#">{{ item }}</a>
            </li>
          </ul>
        </div>
        <div class="inner-item">
          <h2>{{ contact.text }}</h2>
          <ul class="contact-list">
            <li v-for="(item,idx) in contact.list" :key="idx">
              <i :class="item.icon"></i>
              <span>{{ item.text }}</span>
            </li>
          </ul>
        </div>
        <div class="inner-item">
          <h2>{{ follow.text }}</h2>
          <ul class="follow-list">
            <li v-for="(item,idx) in follow.list" :key="idx">
              <i :class="item"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="copyright">
      <div class="inner">
        <span>{{ copyright }}</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      support: {
        text: "support",
        list: ["Feedback", "Get Help", "About Us"]
      },
      contact: {
        text: "contact info",
        list: [
          {
            icon: "fa fa-location-arrow",
            text:"infoinfo"
          },
          {
            icon: "fa fa-phone",
            text: "+1111111111"
          },
          {
            icon: "fa fa-envelope-o",
            text: "Food@info.com"
          }
        ]
      },
      follow: {
        text: "follow us",
        list: [
          "fa fa-facebook",
          "fa fa-twitter",
          "fa fa-instagram",
          "fa fa-google-plus"
        ]
      },
      copyright: "© 2020 Food , All Rights Reserved."
    };
  }
};
</script>

<style lang="less" scoped>
.footer {
  color: #dee2e6;
  .meta {
    background: #343a40;
    display: flex;
    align-items: center;
    @media screen and(min-width:1187px) {
      height: 200px;
    }
    .inner {
      width: 100%;
      @media screen and(min-width:1187px) {
        width: 1190px;
      }

      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;

      align-items: center;
      .inner-item {
        text-align: center;
        width: 50%;
        padding: 20px 0px;
        @media screen and(min-width:1187px) {
          width: 25%;
        }
        @media screen and (max-width: 570px) {
          width: 100%;
        }

        img {
          height: 56px;
        }
        h2 {
          margin-bottom: 10px;
          letter-spacing: 0.5px;
          font-size: 14px;
          color: #868e96;
          text-transform: uppercase;
        }
        ul {
          margin: 0 auto;
          width: 80%;
          text-align: center;
          li {
            color: #fff;
            margin-bottom: 6px;
          }
        }
        .contact-list {
          i {
            margin-right: 10px;
          }
          span {
            font-size: 13px;
          }
        }
        .follow-list {
          li {
            display: inline-block;
            margin-right: 20px;
          }
          i {
            font-size: 30px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .copyright {
    height: 40px;
    line-height: 40px;
    background: #212529;
    text-align: center;
    .inner {
      min-width: 100%;
      @media screen and(min-width:1187px) {
        min-width: 1190px;
      }
      margin: 0 auto;
    }
  }
}
</style>