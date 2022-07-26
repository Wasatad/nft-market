<template>
  <footer>
    <div class="footer-wrapper">
      <div class="left">
        <img class="logo" src="@/assets/img/logo.svg" alt="" />
        <div class="useful-links">
          <span class="link">Support</span>
          <span class="link">Term of service</span>
          <span class="link">License</span>
        </div>
      </div>
      <div class="mid">
        <ul class="menu">
          <li>Auctions</li>
          <li>Roadmap</li>
          <li>Discover</li>
          <li>Community</li>
        </ul>
        <button class="solid-btn">My account</button>
        <div class="social-links">
          <img src="@/assets/img/facebook-icon.svg" alt="" />
          <img src="@/assets/img/linkedin-icon.svg" alt="" />
          <img src="@/assets/img/github-icon.svg" alt="" />
          <img src="@/assets/img/twitter-icon.svg" alt="" />
          <img src="@/assets/img/instagram-icon.svg" alt="" />
        </div>
      </div>
      <div class="right">
        <span class="footer-info"
          >Nibh volutpat, aliquam id sagittis elementum. Pellentesque laoreet
          velit, sed egestas in. Id nam semper dolor tellus vulputate eget
          turpis.
        </span>
        <div class="search-input">
          <input placeholder="Newsletter" class="search" type="text" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
footer {
  width: 100%;
  padding: 0 15px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    margin-bottom: 32px;
  }
  .footer-wrapper {
    margin: 0 auto;
    display: flex;
    width: 100%;

    border: 1px solid $grey_20;
    max-width: 1400px;
    border-radius: 20px;

    @media (max-width: 900px) {
      flex-direction: column;
    }

    .left,
    .mid,
    .right {
      padding: 48px 48px 40px 48px;
      @media (max-width: 1100px) {
        padding: 24px 24px 20px 24px;
      }
    }
    .left {
      height: 400px;
      width: 33.3%;
      border-right: 1px solid $grey_20;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      @media (max-width: 1000px) {
        width: 25%;
      }
      @media (max-width: 900px) {
        width: 100%;
        flex-direction: row;
        border-right: 0px;
        border-bottom: 1px solid $grey_20;
        height: 100%;
        align-items: center;
      }
      @media (max-width: 600px) {
        flex-direction: column;
        gap: 12px;
      }
      .logo {
        width: 100%;
        max-width: 220px;
        display: block;
      }
      .useful-links {
        @media (max-width: 1300px) {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 24px;
          @media (max-width: 900px) {
            flex-direction: row;
          }
        }
        .link {
          font-family: $inter;
          font-weight: 400;
          font-size: 14px;
          line-height: 150%;
          text-align: center;
          letter-spacing: 0.2px;
          color: $grey_100;
          cursor: pointer;
        }
        .link:not(:first-of-type) {
          margin-left: 40px;
          @media (max-width: 1300px) {
            margin-left: 0;
          }
        }
      }
    }
    .mid {
      height: 400px;
      width: 33.3%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      @media (max-width: 1000px) {
        width: 25%;
      }
      @media (max-width: 900px) {
        width: 100%;
        height: 100%;
        flex-direction: row;
        align-items: center;
      }
      @media (max-width: 800px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      @media (max-width: 600px) {
        align-items: center;
      }

      ul {
        @media (max-width: 900px) {
          display: flex;
          justify-content: center;
          gap: 24px;
          align-items: center;
        }
        @media (max-width: 600px) {
          flex-wrap: wrap;
          gap: 12px;
        }
        li {
          font-family: $sora;
          font-weight: 600;
          font-size: 16px;
          line-height: 20px;
          display: flex;
          align-items: center;
          text-align: center;
          letter-spacing: 0.2px;
          color: $textBlack;
          cursor: pointer;
        }
        li:not(:last-of-type) {
          margin-bottom: 16px;
          @media (max-width: 900px) {
            margin-bottom: 0px;
          }
        }
      }

      .solid-btn {
        @media (max-width: 860px) {
          display: none;
        }
      }

      .social-links img {
        cursor: pointer;
      }
      .social-links img:not(:first-of-type) {
        margin-left: 25px;
        @media (max-width: 1100px) {
          margin-left: 8px;
        }
      }
    }
    .right {
      height: 400px;
      width: 33.3%;
      border-left: 1px solid $grey_20;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      @media (max-width: 1000px) {
        width: 50%;
      }
      @media (max-width: 900px) {
        width: 100%;
        height: 100%;
        gap: 18px;
        border-left: 0px;
        border-top: 1px solid $grey_20;
      }

      .footer-info {
        font-family: $inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        letter-spacing: 0.2px;
        color: $grey_100;
        @media (max-width: 900px) {
          max-width: 600px;
        }
      }

      .search-input {
        position: relative;
        // padding: 0 15px;
        width: 100%;
        max-width: 600px;

        &::before {
          content: 'Sign in';
          position: absolute;
          right: 40px;
          top: 16px;
          color: $PurpleDark_100;
          font-family: $sora;
          font-weight: 600;
          font-size: 16px;
          line-height: 20px;
          text-align: center;
          letter-spacing: 0.2px;
          cursor: pointer;
          @media (max-width: 400px) {
            right: 20px;
          }
        }
      }
      .search {
        width: 100%;
        border-radius: 16px;
        background-color: #fff;
        box-shadow: 0px 25px 75px rgba(6, 7, 20, 0.1);
        border: none;
        padding: 16px 24px 16px 32px;
        @media (max-width: 400px) {
          padding: 16px 10px 16px 16px;
        }

        &::placeholder {
          color: $grey_50;
          opacity: 0.7;
          @media (max-width: 500px) {
            font-size: 14px;
          }
        }
        &:focus {
          caret-color: $PurpleDark_100;
        }
      }
    }
  }
}

.solid-btn {
  @include solidBtn;
}
</style>
