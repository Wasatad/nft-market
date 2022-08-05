<template>
  <div>
    <FlashMessage v-if="isCongratsAlertVisible" />
    <div class="container">
      <div class="item-wrapper">
        <div class="icons-wrapper">
          <div class="icon-container">
            <div
              @click="like()"
              :class="[currentNFT.favorite ? 'active' : '', 'icon-like']"
            ></div>
          </div>
          <div class="icon-container">
            <div class="icon-copy"></div>
          </div>
          <div class="icon-container">
            <div class="icon-share"></div>
          </div>
        </div>
        <div class="nft-preview">
          <div class="original">
            <img class="unsplash-image" :src="currentNFT.image" alt="" />
          </div>
        </div>
        <div class="nft-info">
          <div class="nft-title">{{ currentNFT.name }}</div>
          <div class="nft-description">
            Ut amet vulputate faucibus vitae semper eget auctor. Diam tempor
            pulvinar ultricies dolor feugiat aliquam commodo.
          </div>
          <div class="meta-info">
            <div class="meta-wrapper">
              <img :src="currentNFT.author.picture" alt="" />
              <div class="text-content">
                <div class="meta-title">Creator</div>
                <div class="meta-description">
                  @{{ currentNFT.author.name }}
                </div>
              </div>
            </div>
            <div class="meta-wrapper">
              <img
                :src="require(`~/assets/img/${currentNFT.collection.picture}`)"
                alt=""
              />
              <div class="text-content">
                <div class="meta-title">Collection</div>
                <div class="meta-description">
                  {{ currentNFT.collection.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="bid-pannel">
            <div class="time-price">
              <div class="current-price">
                <div class="label">Current price</div>
                <div class="price">
                  {{ currentNFT.price.toFixed(2) }}<span> ETH</span>
                </div>
              </div>
              <div class="time-left">
                <div class="label">Time left</div>
                <div :class="[timeIsUp ? errorTime : '', activeTime]">
                  {{ !timeIsUp ? timeAsString : '00:00:00' }}
                </div>
                <div class="exp-date">
                  ({{ expireDate }} - {{ expireTime }})
                </div>
              </div>
            </div>
            <button
              :class="[
                timeIsUp || alredyOffered(currentNFT.id) ? disabledButton : '',
                activeButton,
              ]"
              @click="toggleBidInput"
            >
              {{ timeIsUp ? 'Time is Up' : 'Place a bid' }}
            </button>
            <BidModal
              @addBid="addBid"
              @closeInput="toggleBidInput"
              v-if="bidInputVisible"
            />
          </div>
          <div class="chart-wrapper">
            <div class="chart-title">
              History of bids ({{ currentNFT.bidsHistory.length }} people are
              bidding)
            </div>
            <div class="chart">
              <AreaChart :chartData="chartData" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="most-popular">
      <div data-aos="fade-up" class="popular-overline">Overline</div>
      <div data-aos="fade-up" class="popular-title">More form this author</div>
      <div class="most-popular-content">
        <div v-for="nft in otherNFTs" :key="nft.id">
          <other-nft :nft="nft" class="nft-item"></other-nft>
        </div>
      </div>
      <button @click="loadNFTs()" class="linear-btn">Show me more</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      bidInputVisible: false,
      bid: null,
      timeIsUp: false,
      expInterval: null,

      //CSS
      activeTime: 'time',
      errorTime: 'time-is-up',
      activeButton: 'solid-btn',
      disabledButton: 'disabled',
    }
  },
  computed: {
    ...mapState(['currentNFT', 'isCongratsAlertVisible', 'otherNFTs']),
    ...mapGetters(['alredyOffered', 'timerIsActive']),

    timeAsString() {
      let fullDate = new Date(this.currentNFT.timeTillTheEnd)

      let hour = fullDate.getUTCHours()
      if (hour < 10) {
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
    expireTime() {
      let fullDate = new Date(this.currentNFT.timeTillTheEnd + Date.now())

      let hour = fullDate.getHours()
      if (hour < 10) {
        hour = '0' + hour
      }

      let minute = fullDate.getMinutes()
      if (minute < 10) {
        minute = '0' + minute
      }

      let second = fullDate.getSeconds()
      if (second < 10) {
        second = '0' + second
      }
      return `${hour}:${minute}:${second}`
    },
    expireDate() {
      let fullDate = new Date(this.currentNFT.timeTillTheEnd + Date.now())

      let date = fullDate.getDate()
      if (date < 10) {
        date = '0' + date
      }

      let month = fullDate.getMonth()
      if (month < 10) {
        month = '0' + month
      }

      let year = fullDate.getFullYear()

      return `${date}.${month}:${year}`
    },
    chartData() {
      let chartData = {
        labels: [],
        datasets: [{ data: [] }],
      }
      chartData.labels = this.currentNFT.bidsHistory
      chartData.datasets[0].data = this.currentNFT.bidsHistory
      return chartData
    },
    getCurrentNFT() {
      return this.currentNFT
    },
  },
  methods: {
    ...mapMutations(['currentTimer', 'openCongratsAlert']),
    ...mapActions(['setCurrentItem']),
    like() {
      this.$store.commit('toggleFav', this.currentNFT.id)
    },
    toggleBidInput() {
      if (
        ((!this.timeIsUp || (this.timeIsUp && this.bidInputVisible)) &&
          !this.alredyOffered(this.currentNFT.id)) ||
        (this.alredyOffered && this.bidInputVisible)
      ) {
        this.bidInputVisible = !this.bidInputVisible
      }
    },
    addBid(bid) {
      if (!this.timeIsUp) {
        this.$store.commit('setNewPrice', {
          price: bid,
          id: this.currentNFT.id,
        })
        this.openCongratsAlert()
      }
    },
    setExpTimer() {
      let that = this
      this.expInterval = setInterval(function go() {
        that.currentTimer()
        that.timeIsUp = false
        if (that.currentNFT.timeTillTheEnd < 1000) {
          clearInterval(that.expInterval)
          that.timeIsUp = true
        }
      }, 1000)
    },
    loadNFTs() {
      this.$store.dispatch('loadNFTs', {
        category: 'otherNFTs',
        qty: 5,
        loadRealUsers: false,
        author: this.currentNFT.author,
      })
    },
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.expInterval)
    next()
  },
  mounted() {
    this.setExpTimer()
    this.$store.dispatch('clearNFTs', 'otherNFTs')
    if (this.otherNFTs.length < 5) {
      this.loadNFTs()
    }
  },

  watch: {
    getCurrentNFT(newNFT, oldNFT) {
      if (newNFT.id != oldNFT.id) {
        if (oldNFT.timeTillTheEnd <= 1000) {
          this.setExpTimer()
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  padding: 0 32px 0 15px;
  margin-bottom: 150px;
  @media (max-width: 900px) {
    margin-bottom: 110px;
  }
  .item-wrapper {
    position: relative;
    max-width: 1400px;
    margin: 200px auto 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
    padding: 24px 90px 24px 24px;
    border: 1px solid $grey_20;
    border-radius: 20px;
    @media (max-width: 1300px) {
      padding: 24px 64px 24px 24px;
    }

    @media (max-width: 900px) {
      flex-direction: column;
      padding: 24px;
      margin: 120px auto 0;
    }

    .icons-wrapper {
      position: absolute;
      z-index: 2;
      top: 80px;
      right: 0;
      transform: translateX(50%);
      display: flex;
      justify-content: flex-start;
      gap: 16px;
      align-items: center;
      flex-direction: column;
      @media (max-width: 500px) {
        top: 48px;
      }
      .icon-container {
        width: 56px;
        height: 56px;
        border: 1px solid $grey_20;
        border-radius: 100%;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon-like {
          display: flex;
          align-items: center;
          gap: 8px;
          background-image: url('assets/img/heart-disabled.svg');
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        .icon-like.active {
          background-image: url('assets/img/heart-active.svg');
        }
        .icon-copy {
          display: flex;
          align-items: center;
          gap: 8px;
          background-image: url('assets/img/copy.svg');
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        .icon-share {
          display: flex;
          align-items: center;
          gap: 8px;
          background-image: url('assets/img/share.svg');
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
      }
    }

    .nft-preview {
      width: 55%;
      align-self: stretch;
      position: relative;
      @media (max-width: 900px) {
        width: 100%;
      }

      .original {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        overflow: hidden;
        border-radius: 20px;
        max-height: 930px;
        @media (max-width: 1200px) {
          height: 80%;
        }
        @media (max-width: 1000px) {
          height: 60%;
        }
        @media (max-width: 900px) {
          height: auto;
          width: 100%;
        }
        img {
          height: 100%;
          object-fit: cover;
          width: 100%;

          @media (max-width: 900px) {
            height: auto;
            width: 100%;
          }
        }
      }
    }

    .nft-info {
      width: 45%;
      max-width: 500px;
      // margin-bottom: 40px;
      padding-top: 40px;
      @media (max-width: 900px) {
        width: 100%;
      }
      @media (max-width: 500px) {
        padding-top: 24px;
      }
      .nft-title {
        font-family: $sora;
        font-weight: 600;
        font-size: 40px;
        line-height: 125%;
        letter-spacing: 0.2px;
        color: $textBlack;
        margin-bottom: 8px;
        &:first-letter {
          text-transform: capitalize;
        }
        @media (max-width: 500px) {
          font-size: 32px;
        }
      }
      .nft-description {
        font-family: $inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        letter-spacing: 0.2px;
        color: $grey_100;
        margin-bottom: 28px;
      }
      .meta-info {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 40px;
        margin-bottom: 40px;
        @media (max-width: 400px) {
          flex-direction: column;
        }
        .meta-wrapper {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 12px;
          img {
            width: 40px;
            border-radius: 100%;
          }
          .text-content {
            .meta-title {
              font-family: $inter;

              font-weight: 400;
              font-size: 14px;
              line-height: 150%;
              letter-spacing: 0.2px;

              color: $grey_100;
            }
            .meta-description {
              font-family: $sora;
              font-weight: 600;
              font-size: 13px;
              line-height: 16px;
              letter-spacing: 0.2px;

              color: $textBlack;
            }
          }
        }
      }
      .bid-pannel {
        background: $grey_10;
        border-radius: 20px;
        padding: 32px 40px;
        margin-bottom: 40px;
        position: relative;
        .time-price {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 32px;
          margin-bottom: 32px;
          @media (max-width: 1200px) {
            flex-direction: column;
            gap: 16px;
          }
          @media (max-width: 900px) {
            flex-direction: row;
            gap: 24px;
          }
          @media (max-width: 600px) {
            flex-direction: column;
            gap: 16px;
          }
          .label {
            font-family: $inter;
            font-weight: 400;
            font-size: 14px;
            line-height: 150%;
            letter-spacing: 0.2px;
            color: $grey_100;
            margin-bottom: 14px;
          }
          .price {
            font-family: $sora;
            font-weight: 600;
            font-size: 47px;
            line-height: 100%;
            letter-spacing: 0.2px;
            color: $textBlack;
            @media (max-width: 500px) {
              font-size: 40px;
            }
            span {
              font-size: 22px;
            }
          }
          .time-left {
            .time {
              font-family: $sora;
              font-weight: 600;
              font-size: 24px;
              line-height: 100%;
              letter-spacing: 0.2px;
              color: $textBlack;
              margin-bottom: 5px;
              span {
                font-size: 18px;
              }
            }
            .time-is-up {
              color: #e22525 !important;
            }
          }
          .exp-date {
            font-family: $inter;
            font-weight: 400;
            font-size: 14px;
            line-height: 150%;
            letter-spacing: 0.2px;
            color: $grey_100;
          }
        }
        button {
          width: 100%;
        }
      }
      .chart-wrapper {
        .chart-title {
          font-family: $inter;
          font-weight: 400;
          font-size: 14px;
          line-height: 150%;
          letter-spacing: 0.2px;
          color: $grey_100;
          margin-bottom: 14px;
          margin-bottom: 40px;
        }
      }
    }
  }
}

.most-popular {
  margin-bottom: 100px;
  .popular-overline {
    font-family: $inter;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: $grey_50;
    margin-bottom: 16px;
  }
  .popular-title {
    font-family: $sora;
    font-weight: 600;
    font-size: 36px;
    line-height: 45px;
    text-align: center;
    letter-spacing: 0.2px;
    color: $textBlack;
    margin-bottom: 70px;
    @media (max-width: 500px) {
      font-size: 32px;
      margin-bottom: 40px;
    }
  }
  .most-popular-content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 24px;
    max-width: 1440px;
    padding: 0 15px;
    margin: 0 auto;
    margin-bottom: 32px;
  }
  button {
    margin: 0 auto;
    display: block;
  }
}

.solid-btn {
  @include solidBtn;
}
.linear-btn {
  @include linearBtn;
}
.disabled {
  @include solidBtn;
  background-color: #b3b3b3 !important;
  background: none;
  cursor: default;
}
</style>
