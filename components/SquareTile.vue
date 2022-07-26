<template>
  <div>
    <div class="tiles-row">
      <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper tiles-slider">
          <div class="swiper-slide" v-for="nft in smallTiles" :key="nft.id">
            <div class="tile-wrapper">
              <div class="nft-image-container">
                <img
                  class="nft-image"
                  src="@/assets/img/nft_image.jpg"
                  alt=""
                />
                <img
                  class="blured-copy"
                  src="@/assets/img/nft_image.jpg"
                  alt=""
                />
                <!-- <img class="nft-image" :src="nft.image" alt="" /> -->
              </div>
              <div class="nft-price">{{ nft.price.toFixed(2) }} ETH</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smallTiles: [],
      swiperOption: {
        observer: true,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
        },
        loop: true,
        loopedSlides: 20,
        slidesPerView: 'auto',

        centeredSlides: true,
        centeredSlidesBounds: true,
        spaceBetween: 24,

        navigation: {
          nextEl: '.swiper-one-button-next',
        },

        speed: 2000,
      },
      async loadSmallTiles() {
        for (let i = 0; i < 20; i++) {
          let nft = {}
          nft.price = 1 + Math.random() * 6
          // nft.image = `https://source.unsplash.com/collection/50332754/600x600/?sig=${Math.floor(
          //   1 + Math.random() * 275
          // )}`
          this.smallTiles.push(nft)
        }
      },
    }
  },
  mounted() {
    this.loadSmallTiles()
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
  // overflow: visible;
  padding-bottom: 50px;
  padding: 30px 0 50px;
}
.tiles-row {
  display: flex;
  width: auto;
  // padding-bottom: 24px;

  img {
    border-radius: 20px;
  }

  .swiper-slide {
    width: auto;
  }
  .blured-copy {
    position: absolute;
    z-index: -1;
    top: 25px;
    left: 0;
    width: 100%;
    height: auto;

    opacity: 0.2;
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
      // overflow: hidden;
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
