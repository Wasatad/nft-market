<template>
  <div class="slider-wrapper">
    <div @click="goToDetails(nft)" class="item-head">
      <div class="nft-image-container">
        <img class="nft-image" :src="nft.image" alt="" />
      </div>

      <div class="nft-blured">
        <img class="nft-image-blured" :src="nft.image" alt="" />
      </div>
      <div class="nft-details">
        <div class="nft-name">{{ nft.name }}</div>
        <div class="nft-price">{{ nft.price.toFixed(2) }} ETH</div>
      </div>
    </div>
    <div class="item-bottom">
      <div class="timer">
        <img src="@/assets/img/timer_icon.svg" alt="" />
        <div class="time">{{ timeAsString }} left</div>
      </div>
      <hr />
      <div class="likes">
        <div class="peoples">
          <div class="avatars">
            <img
              v-for="(user, id) in nft.users"
              :key="id"
              class="avatar"
              :src="user.picture"
              alt=""
            />
          </div>
          <div class="people-qty">
            {{ nft.bidsHistory.length }} people are bidding
          </div>
        </div>
        <div
          @click="like"
          :class="[nft.favorite ? 'active' : '', 'icon-like']"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  props: {
    nft: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters['nftById'],
    timeAsString() {
      let fullDate = new Date(this.nft.timeTillTheEnd)

      let hour = fullDate.getUTCHours()
      if (hour < 12) {
        hour = '0' + hour
      }

      let minute = fullDate.getUTCMinutes()
      if (minute < 10) {
        minute = '0' + minute
      }

      let second = fullDate.getUTCSeconds()
      if (second < 10) {
        second = '0' + second
      }
      return `${hour}:${minute}:${second}`
    },
  },
  methods: {
    ...mapActions(['setCurrentItem']),
    goToDetails(nft) {
      this.setCurrentItem(nft)
    },
    timer(id, category) {
      this.$store.commit('timer', {
        id: id,
        category: category,
      })
    },
    updateNFT(id, category) {
      this.$store.dispatch('updateNFT', {
        id: id,
        category: category,
      })
    },
    async updateCounter() {
      await this.updateNFT(this.nft.id, 'latestNFTs')
      this.timestamp = this.nft.expireTimestamp

      let that = this
      setTimeout(function go() {
        that.timer(that.nft.id, 'latestNFTs')
        if (that.nft.timeTillTheEnd >= 1000) {
          setTimeout(go, 1000)
        } else {
          that.updateCounter()
        }
      }, 1000)
    },
    like() {
      this.$store.commit('toggleFav', this.nft.id)
    },
    activateCounting(id, category) {
      this.$store.commit('activateCounting', {
        id: id,
        category: category,
      })
    },
  },
  mounted() {
    let that = this
    if (this.nft.timeTillTheEnd) {
      if (this.nft.countingInAction) {
        return
      } else {
        that.activateCounting(that.nft.id, 'latestNFTs')
        setTimeout(function go() {
          that.timer(that.nft.id, 'latestNFTs')
          if (that.nft.timeTillTheEnd >= 1000) {
            setTimeout(go, 1000)
          } else {
            that.updateCounter()
          }
        }, 1000)
      }
    } else {
      that.activateCounting(that.nft.id, 'latestNFTs')
      setTimeout(function go() {
        that.timer(that.nft.id, 'latestNFTs')
        if (that.nft.timeTillTheEnd >= 1000) {
          setTimeout(go, 1000)
        } else {
          that.updateCounter()
        }
      }, 1000)
    }
  },
}
</script>

<style lang="scss" scoped>
.slider-wrapper {
  position: relative;
  width: 400px;
  height: 730px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 500px) {
    width: 340px;
    height: 600px;
  }

  .item-head {
    cursor: pointer;
  }

  .nft-image-container {
    width: 100%;
    height: 520px;
    overflow: hidden;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    @media (max-width: 500px) {
      height: 400px;
    }

    .nft-image {
      height: 100%;
      width: 200%;
      object-fit: cover;
    }
  }
  .nft-blured {
    position: absolute;
    top: 48px;
    height: 100%;
    z-index: -1;
    opacity: 0.1;
    filter: blur(35px);
    @media (max-width: 500px) {
      height: 50%;
    }
    img {
      width: 80%;
    }
  }

  .nft-details {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;

    @media (max-width: 500px) {
      margin-bottom: 18px;
    }
    .nft-name {
      font-family: $sora;
      font-weight: 600;
      font-size: 20px;
      line-height: 25px;
      letter-spacing: 0.2px;
      max-width: 260px;
      margin-bottom: 8px;
      color: $textBlack;

      &:first-letter {
        text-transform: capitalize;
      }

      @media (max-width: 500px) {
        width: 60%;
        font-size: 17px;
      }
    }
    .nft-price {
      font-family: $sora;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      text-align: right;
      letter-spacing: 0.2px;
      color: $PurpleDark_100;

      padding: 8px 14px;
      background-color: rgba(42, 39, 201, 0.1);
      border-radius: 4px;
    }
  }
  .timer {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 28px;
    .time {
      font-family: $inter;
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      letter-spacing: 0.2px;
      color: $textBlack;
    }
  }
  hr {
    border: 1px solid $grey_20;
    opacity: 0.6;
    margin-bottom: 20px;
  }
  .likes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .peoples {
      display: flex;
      align-items: center;
      gap: 12px;
      .avatars {
        display: flex;
        img {
          width: 33px;
          border-radius: 100%;
          border: 5px solid #ffffff;
        }
        img:not(:first-of-type) {
          margin-left: -10px;
        }
      }
      .people-qty {
        font-family: $inter;
        font-weight: 400;
        font-size: 14px;
        line-height: 150%;
        letter-spacing: 0.2px;
        color: $grey_100;
      }
    }
    .icon-like {
      display: flex;
      align-items: center;
      gap: 8px;
      background-image: url('assets/img/heart-disabled.svg');
      width: 20px;
      height: 20px;
      cursor: pointer;
      .likes-qty {
        font-family: $inter;
        font-weight: 400;
        font-size: 14px;
        line-height: 150%;
        letter-spacing: 0.2px;
        color: $grey_100;
      }
    }
    .icon-like.active {
      background-image: url('assets/img/heart-active.svg');
    }
  }
}
</style>
