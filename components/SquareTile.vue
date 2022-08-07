<template>
  <div>
    <div class="tiles-row tiles-slider">
      <div class="swiper-wrapper">
        <div class="swiper-slide tile" v-for="nft in smallTiles" :key="nft.id">
          <div class="tile-wrapper">
            <div class="nft-image-container">
              <img
                class="nft-image"
                :src="require(`~/assets/img/bottom-tiles/${nft.image}`)"
                alt=""
              />
              <img
                class="blured-copy"
                :src="require(`~/assets/img/bottom-tiles/${nft.image}`)"
                alt=""
              />
            </div>
            <div class="nft-price">{{ nft.price.toFixed(2) }} ETH</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'

export default {
  data() {
    return {
      smallTiles: [],
      async loadSmallTiles() {
        for (let i = 1; i < 21; i++) {
          let nft = {}
          nft.price = 1 + Math.random() * 6
          nft.image = 'bottom-tile_' + i + '.jpg'
          this.smallTiles.push(nft)
        }
      },
    }
  },
  mounted() {
    this.loadSmallTiles()

    Swiper.use([Autoplay])

    const swiperTiles = new Swiper('.tiles-slider', {
      modules: [Autoplay],
      observer: true,
      loop: false,
      slidesPerView: 'auto',
      centeredSlides: false,
      spaceBetween: 24,
      simulateTouch: true,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
      speed: 2000,
    })
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
}
</script>

<style lang="scss" scoped>
.swiper-container {
  padding-bottom: 50px;
  padding: 30px 0 50px;
}
.tiles-row {
  display: flex;
  width: auto;
  max-width: 100%;

  .tile {
    width: auto;
  }

  img {
    border-radius: 20px;
  }

  .blured-copy {
    position: absolute;
    z-index: -1;
    top: 25px;
    left: 0;
    width: 100%;
    height: auto;

    opacity: 0.1;
    filter: blur(31px);
  }

  .tile-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;

    .nft-image-container {
      width: 90px;
      height: 90px;
      border-radius: 20px;
      position: relative;
      .nft-image {
        width: 100%;
        height: auto;
      }
    }

    .nft-price {
      font-family: $inter;
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      text-align: center;
      letter-spacing: 0.2px;

      color: $grey_100;
    }
  }
}
</style>
