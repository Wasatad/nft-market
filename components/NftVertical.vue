<template>
  <div class="slider-wrapper">
    <div class="item-head">
      <div class="nft-image-container">
        <img class="nft-image" src="@/assets/img/nft_image.jpg" alt="" />
        <!-- <img class="nft-image" :src="nft.image" alt="" /> -->
      </div>
      <div class="nft-details">
        <div class="nft-name">{{ nft.name }}</div>
      </div>
    </div>
    <div class="item-bottom">
      <div class="timer">
        <div class="timer-row">
          <img src="@/assets/img/timer_icon.svg" alt="" />
          <div class="time">{{ timeAsString }}</div>
        </div>

        <div class="nft-price">{{ nft.price.toFixed(2) }} ETH</div>
      </div>
      <hr />
      <div class="likes">
        <div class="peoples">
          <div class="people-qty">
            {{ nft.biddingUsers }} people are bidding
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
import { mapMutations, mapActions } from 'vuex'
export default {
  props: {
    nft: {
      type: Object,
    },
  },
  data() {
    return {
      timestamp: 0,
    }
  },
  computed: {
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
    ...mapActions(['updateItem']),
    ...mapMutations(['toggleFav', 'timer', 'activateCountingState']),
    async updateCounter() {
      await this.updateItem(this.nft)
      this.timestamp = this.nft.expireTimestamp

      let that = this
      setTimeout(function go() {
        that.timer(that.nft.id)
        if (that.nft.timeTillTheEnd >= 1000) {
          setTimeout(go, 1000)
        } else {
          that.updateCounter()
        }
      }, 1000)
    },
    like() {
      this.toggleFav(this.nft.id)
    },
  },
  mounted() {
    let that = this
    if (this.nft.timeTillTheEnd) {
      if (this.nft.countingInAction) {
        return
      } else {
        that.activateCountingState(that.nft.id)
        setTimeout(function go() {
          that.timer(that.nft.id)
          if (that.nft.timeTillTheEnd >= 1000) {
            setTimeout(go, 1000)
          } else {
            that.updateCounter()
          }
        }, 1000)
      }
    } else {
      that.activateCountingState(that.nft.id)
      setTimeout(function go() {
        that.timer(that.nft.id)
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
  width: 260px;
  height: 500px;

  .nft-image-container {
    width: 100%;
    height: 320px;
    overflow: hidden;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;

    .nft-image {
      height: 100%;
    }
  }

  .nft-name {
    width: 100%;
    font-family: 'Sora';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 110%;
    letter-spacing: 0.2px;
    max-width: 260px;
    margin-bottom: 20px;

    color: $textBlack;

    &:first-letter {
      text-transform: capitalize;
    }
  }
}
.timer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  .timer-row {
    display: flex;
    gap: 8px;
  }
  .nft-price {
    display: inline-block;
    font-family: $sora;
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    text-align: center;
    letter-spacing: 0.2px;
    color: $PurpleDark_100;

    padding: 6px 10px;
    background-color: rgba(42, 39, 201, 0.1);
    border-radius: 4px;
  }
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
  width: 100%;
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
</style>
