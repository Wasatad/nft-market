<template>
  <div>
    <kinesis-container>
      <div class="main-screen">
        <img
          class="circles"
          src="@/assets/img/main-screen-background.png"
          alt=""
        />
        <div class="content">
          <div
            data-aos="fade-down"
            data-aos-delay="150"
            data-aos-duration="450"
            class="label"
          >
            Non Fungible Tokens
          </div>

          <div data-aos="fade-right" class="h1 first-line">
            <span class="title">A new NFT</span>
            <img src="@/assets/img/green-peece.svg" alt="" />
          </div>
          <div data-aos="fade-left" class="h1 second-line">
            <img src="@/assets/img/blue-pink-peece.svg" alt="" />
            <span class="title">Experience</span>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-delay="300"
            data-aos-duration="600"
            class="subtitle"
          >
            Discover, collect and sell
          </div>
          <div data-aos="zoom-in" data-aos-duration="1000" class="search-input">
            <input
              placeholder="Items, collections and creators"
              class="search"
              type="text"
            />
          </div>
          <div data-aos="fade-up" class="partners">
            <img
              class="partner-logo"
              src="@/assets/img/ritter_sport.svg"
              alt=""
            />
            <img class="partner-logo" src="@/assets/img/nike.svg" alt="" />
            <img class="partner-logo" src="@/assets/img/adidas.svg" alt="" />
            <img
              class="partner-logo"
              src="@/assets/img/new_holland.svg"
              alt=""
            />
          </div>
        </div>

        <div class="bg-tiles">
          <div class="tile">
            <kinesis-element type="translate" :strength="10">
              <img class="tile-img" src="@/assets/img/tile_1.png" alt="" />
              <img class="blured-copy" src="@/assets/img/tile_1.png" alt="" />
              <div class="tile-price">2.55 ETH</div>
            </kinesis-element>
          </div>
          <div class="tile">
            <kinesis-element type="translate" :strength="30">
              <img class="tile-img" src="@/assets/img/tile_2.png" alt="" />
              <img class="blured-copy" src="@/assets/img/tile_2.png" alt="" />
              <div class="tile-price">2.55 ETH</div>
            </kinesis-element>
          </div>
          <div class="tile">
            <kinesis-element type="translate" :strength="20" axis="y">
              <img class="tile-img" src="@/assets/img/tile_3.png" alt="" />
              <img class="blured-copy" src="@/assets/img/tile_3.png" alt="" />
              <div class="tile-price">2.55 ETH</div>
            </kinesis-element>
          </div>
          <div class="tile">
            <kinesis-element type="translate" :strength="20">
              <img class="tile-img" src="@/assets/img/tile_4.png" alt="" />
              <img class="blured-copy" src="@/assets/img/tile_4.png" alt="" />
              <div class="tile-price">2.55 ETH</div>
            </kinesis-element>
          </div>
          <div class="tile">
            <kinesis-element type="translate" :strength="20">
              <img class="tile-img" src="@/assets/img/tile_5.png" alt="" />
              <img class="blured-copy" src="@/assets/img/tile_5.png" alt="" />
              <div class="tile-price">2.55 ETH</div>
            </kinesis-element>
          </div>
          <div class="tile">
            <kinesis-element type="translate" :strength="40">
              <img class="tile-img" src="@/assets/img/tile_6.png" alt="" />
              <img class="blured-copy" src="@/assets/img/tile_6.png" alt="" />
              <div class="tile-price">2.55 ETH</div>
            </kinesis-element>
          </div>
        </div>
      </div>

      <div class="nft-slider">
        <div data-aos="fade-up" class="section-title">Latest live auctions</div>
        <div class="swiper-one-button-next">
          <img src="@/assets/img/arrow-next.svg" alt="" />
        </div>
        <!-- <nft-item :nft='nft' class="nft-item"></nft-item> -->
        <div v-swiper:mySwiperOne="swiperOneOption">
          <div class="swiper-wrapper">
            <div
              @click="goToDetails(nft)"
              class="swiper-slide"
              v-for="nft in nftItems"
              :key="nft.id"
            >
              <nft-big
                :nft="nft"
                :nextSlide="emitNextSlide"
                class="nft-item"
              ></nft-big>
            </div>
          </div>
          <div class="swiper-pagination swiper-pagination-bullets"></div>
        </div>
      </div>

      <div class="info-block-wrapper">
        <div class="info-block">
          <div class="text-part">
            <div data-aos="fade-right" class="info-label">Overline</div>
            <div data-aos="fade-right" class="info-title">
              Sapien ipsum scelerisque convallis fusce
            </div>
            <div data-aos="fade-right" class="info-description">
              Ut amet vulputate faucibus vitae semper eget auctor. Diam tempor
              pulvinar ultricies dolor feugiat aliquam commodo.
            </div>
            <div class="info-btns">
              <button
                data-aos="fade-right"
                data-aos-delay="40"
                class="solid-btn"
              >
                Get started
              </button>
              <button data-aos="fade-right" class="linear-btn">
                Learn more
              </button>
            </div>
          </div>
          <div data-aos="fade-left" class="images">
            <kinesis-element type="translate" :strength="20">
              <img class="pie" src="@/assets/img/pie.png" alt="" />
            </kinesis-element>
            <kinesis-element type="translate" :strength="50">
              <img class="bucket" src="@/assets/img/bucket.png" alt="" />
            </kinesis-element>
          </div>
        </div>
      </div>

      <div class="offers">
        <div class="hottest">
          <div class="offers-title">Check out the<br />hottest Sale offers</div>
          <div class="slider">
            <div class="swiper-two-button-next">
              <img src="@/assets/img/arrow-next.svg" alt="" />
            </div>
            <div v-swiper:mySwiperTwo="swiperTwoOption">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="nft in nftItems" :key="nft.id">
                  <nft-vertical
                    :nft="nft"
                    :nextSlide="emitNextSlide"
                    class="nft-item"
                  ></nft-vertical>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="get-started">
          <img class="pleat" src="@/assets/img/pleat.svg" alt="" />
          <img class="hand" src="@/assets/img/metal-hand.png" alt="" />
          <div class="get-started-text">
            <div class="get-started-title">
              Get started creating<br />
              & selling your NFTs
            </div>
            <div class="get-started-description">
              Nunc gravida faucibus netus feugiat tellus, viverra massa feugiat.
              Mi est sit.
            </div>
          </div>
          <!-- <button class="solid-btn get-started-btn">Get started</button> -->

          <button class="solid-btn get-started-btn">Get started</button>

          <button class="solid-btn get-started-btn-mobile">Get started</button>
        </div>

        <div class="lower-price">
          <div class="offers-title">Top NFT at a lower<br />price</div>
          <nft-horizontal
            :nft="sortedByPrice[0]"
            :nextSlide="emitNextSlide"
            class="nft-item"
          ></nft-horizontal>
          <nft-horizontal
            :nft="sortedByPrice[1]"
            :nextSlide="emitNextSlide"
            class="nft-item"
          ></nft-horizontal>
          <nft-horizontal
            :nft="sortedByPrice[2]"
            :nextSlide="emitNextSlide"
            class="nft-item"
          ></nft-horizontal>
          <nft-horizontal
            :nft="sortedByPrice[3]"
            :nextSlide="emitNextSlide"
            class="nft-item"
          ></nft-horizontal>
        </div>
      </div>
      <div class="info-block-wrapper">
        <div class="info-block second">
          <div class="images">
            <kinesis-element type="translate" :strength="40">
              <img
                class="paper-plane"
                src="@/assets/img/paper-plane.png"
                alt=""
              />
            </kinesis-element>
            <kinesis-element type="translate" :strength="20">
              <img
                class="yellow-man"
                src="@/assets/img/yellow-man.png"
                alt=""
              />
            </kinesis-element>
          </div>
          <div class="text-part">
            <div data-aos="fade-left" class="info-label">Overline</div>
            <div data-aos="fade-left" class="info-title">
              Habitant tristique aliquam in vel scelerisque
            </div>
            <div data-aos="fade-left" class="info-description">
              Ut amet vulputate faucibus vitae semper eget auctor. Diam tempor
              pulvinar ultricies dolor feugiat aliquam commodo.
            </div>
            <div class="info-features">
              <div data-aos="fade-left" class="feature">
                <img src="@/assets/img/icon-paint.svg" alt="" />
                <div class="feature-title">Sollicitudin sapien</div>
                <div class="feature-description">Cursus fermentum</div>
              </div>
              <div data-aos="fade-left" class="feature">
                <img src="@/assets/img/icon-cubes.svg" alt="" />
                <div class="feature-title">Pulvinar metus</div>
                <div class="feature-description">Nunc sed</div>
              </div>
            </div>
            <div class="info-btns">
              <button data-aos="fade-left" class="solid-btn">
                Get started
              </button>
              <button
                data-aos="fade-left"
                data-aos-delay="40"
                class="linear-btn"
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="most-popular">
        <div data-aos="fade-up" class="popular-overline">Overline</div>
        <div data-aos="fade-up" class="popular-title">
          Most popular live auctions
        </div>
        <div class="most-popular-content">
          <div v-for="nft in popularNFT" :key="nft.id">
            <nft-popular
              @updateItem="updateItem(nft.id)"
              @timer="timer(nft.id)"
              @toggleFav="toggleFav(nft.id)"
              @activateCountingState="activateCountingState(nft.id)"
              :nft="nft"
              :nextSlide="emitNextSlide"
              class="nft-item"
            ></nft-popular>
          </div>
        </div>
        <button data-aos="fade-up" @click="loadNft()" class="linear-btn">
          Show me more
        </button>
      </div>
      <div class="divider-short"></div>
      <div class="numbers">
        <div class="item">
          <img src="@/assets/img/icon-user.svg" alt="" />
          <div class="big-number">
            <number
              ref="number1"
              :from="0"
              :to="300"
              :duration="2"
              :delay="4"
              easing="Power1.easeOut"
            />
          </div>
          <div class="description">Users Active</div>
        </div>
        <div class="item">
          <img src="@/assets/img/icon-artworks.svg" alt="" />
          <div class="big-number">
            <number
              ref="number2"
              :from="0"
              :to="52.5"
              :format="theFormat"
              :duration="2"
              :delay="4"
              easing="Power1.easeOut"
            />

            <span>k</span>
          </div>
          <div class="description">Artworks</div>
        </div>
        <div class="item">
          <img src="@/assets/img/icon-artists.svg" alt="" />
          <div class="big-number">
            <number
              ref="number3"
              :from="0"
              :to="17.5"
              :format="theFormat"
              :duration="2"
              :delay="4"
              easing="Power1.easeOut"
            />

            <span>k</span>
          </div>
          <div class="description">Artists</div>
        </div>
        <div class="item">
          <img src="@/assets/img/icon-wallet.svg" alt="" />
          <div class="big-number">
            <number
              ref="number4"
              :from="0"
              :to="35.58"
              :format="theFormat"
              :duration="2"
              :delay="4"
              easing="Power1.easeOut"
            />
          </div>
          <div class="description">ETH Spent</div>
        </div>
      </div>
      <div class="authors-cloud">
        <div class="container">
          <img class="pleat" src="@/assets/img/pleat-white.svg" alt="" />

          <div class="wrapper">
            <div class="top-gradient"></div>
            <div class="text-part">
              <div data-aos="fade-right" class="info-label">Overline</div>
              <div data-aos="fade-right" class="info-title">
                Cursus vitae sollicitudin donec nascetur. Join now
              </div>
              <div data-aos="fade-right" class="info-description">
                Donec volutpat bibendum justo, odio aenean congue est porttitor
                ut. Mauris vestibulum eros libero amet tincidunt.
              </div>
              <div class="info-btns">
                <button data-aos="fade-right" class="solid-btn">
                  Get started
                </button>
                <button
                  data-aos-delay="40"
                  data-aos="fade-right"
                  class="linear-btn"
                >
                  Learn more
                </button>
              </div>
            </div>
            <!-- <> -->
            <div class="cloud">
              <div class="authors-cloud-img">
                <kinesis-element type="translate" :strength="20">
                  <img
                    data-aos="fade-left"
                    src="@/assets/img/authors-cloud-1.png"
                    alt=""
                  />
                </kinesis-element>
              </div>
              <div class="authors-cloud-img">
                <kinesis-element type="translate" :strength="40">
                  <img
                    data-aos="fade-left"
                    src="@/assets/img/authors-cloud-2.png"
                    alt=""
                  />
                </kinesis-element>
              </div>
              <div class="authors-cloud-img">
                <kinesis-element type="translate" :strength="20">
                  <img
                    data-aos="fade-left"
                    src="@/assets/img/authors-cloud-3.png"
                    alt=""
                  />
                </kinesis-element>
              </div>
              <div class="authors-cloud-img">
                <kinesis-element type="translate" :strength="10">
                  <img
                    data-aos="fade-left"
                    src="@/assets/img/authors-cloud-4.png"
                    alt=""
                  />
                </kinesis-element>
              </div>
              <div class="authors-cloud-img">
                <kinesis-element type="translate" :strength="30">
                  <img
                    data-aos="fade-left"
                    src="@/assets/img/authors-cloud-5.png"
                    alt=""
                  />
                </kinesis-element>
              </div>
              <div class="authors-cloud-img">
                <kinesis-element type="translate" :strength="40">
                  <img
                    data-aos="fade-left"
                    src="@/assets/img/authors-cloud-6.png"
                    alt=""
                  />
                </kinesis-element>
              </div>
            </div>
          </div>
        </div>
      </div>
      <square-tile class="square-title-row"></square-tile>
      <!-- <footer>
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
              >Nibh volutpat, aliquam id sagittis elementum. Pellentesque
              laoreet velit, sed egestas in. Id nam semper dolor tellus
              vulputate eget turpis.
            </span>
            <div class="search-input">
              <input placeholder="Newsletter" class="search" type="text" />
            </div>
          </div>
        </div>
      </footer> -->
    </kinesis-container>
  </div>
</template>

<script>
import { del } from 'vue'
import { uid } from 'uid'
import { LoremIpsum } from 'lorem-ipsum'
const lorem = new LoremIpsum()
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  data() {
    return {
      popularNFT: [],
      emitNextSlide: false,
      swiperOneOption: {
        loop: false,
        slidesPerView: 'auto',
        centeredSlides: true,
        centeredSlidesBounds: true,
        spaceBetween: 70,
        simulateTouch: true,
        navigation: {
          nextEl: '.swiper-one-button-next',
        },
      },
      swiperTwoOption: {
        loop: false,
        slidesPerView: 'auto',
        centeredSlides: false,
        // centeredSlidesBounds: true,
        spaceBetween: 24,
        simulateTouch: true,
        navigation: {
          nextEl: '.swiper-two-button-next',
        },
      },
    }
  },

  computed: {
    ...mapState(['nftItems']),
    ...mapGetters(['sortedByPrice']),
  },
  methods: {
    ...mapActions(['updateItem']),
    ...mapMutations(['setCurrentItem']),

    goToDetails(nft) {
      this.setCurrentItem(nft)
      this.$nuxt.$options.router.push('/details')
    },
    refreshList(item) {
      this.updateItem(item)
    },

    theFormat(number) {
      return number.toFixed(1)
    },

    //Functions
    toggleFav(id) {
      let item = this.popularNFT.find((item) => {
        return item.id == id
      })
      item.favorite = !item.favorite
    },
    timer(id) {
      let item = this.popularNFT.find((item) => {
        return item.id == id
      })
      item.timeTillTheEnd -= 1000
    },
    activateCountingState(id) {
      let item = this.popularNFT.find((item) => {
        return item.id == id
      })
      item.countingInAction = true
      if (!item.timeTillTheEnd) {
        item.timeTillTheEnd = item.expireTimestamp
      }
    },

    //Download and updating new nft`s
    async loadNft() {
      for (let i = 0; i < 5; i++) {
        let nft = {}
        nft.id = uid()
        nft.name = lorem.generateWords(4)
        nft.price = 1 + Math.random() * 6
        nft.favorite = false
        nft.timeTillTheEnd = null
        nft.countingInAction = false

        // nft.image = `https://source.unsplash.com/collection/50332754/600x600/?sig=${Math.floor(
        //   1 + Math.random() * 275
        // )}`

        nft.biddingUsers = Math.floor(12 + Math.random() * (150 + 1 - 12))
        nft.expireTimestamp = 10000 * Math.floor(1 + Math.random() * 8)
        // 60000

        this.popularNFT.push(nft)
      }
    },
    async updateItem(id) {
      let updatingNft = this.popularNFT.find((item) => {
        return item.id == id
      })
      updatingNft.name = lorem.generateWords(4)
      updatingNft.price = 1 + Math.random() * 6
      updatingNft.favorite = false
      // updatingNft.image = `https://source.unsplash.com/collection/50332754/600x600/?sig=${Math.floor(
      //   1 + Math.random() * 275
      // )}`

      updatingNft.biddingUsers = Math.floor(12 + Math.random() * (150 + 1 - 12))

      updatingNft.timeTillTheEnd = updatingNft.expireTimestamp

      updatingNft.expireTimestamp = 10000 * Math.floor(1 + Math.random() * 60)
    },
  },
  mounted() {
    this.loadNft()

    let getStartedBlock = document.querySelector('.get-started')
    let getStartedBtn = document.querySelector('.get-started-btn')
    let hand = document.querySelector('.hand')

    getStartedBlock.onmouseenter = () => {
      if (window.innerWidth > 1300) {
        getStartedBlock.classList.add('active')
        hand.classList.add('active')
        getStartedBtn.classList.add('visible')
      }
    }
    getStartedBlock.onmouseleave = () => {
      if (window.innerWidth > 1300) {
        getStartedBlock.classList.remove('active')
        hand.classList.remove('active')
        getStartedBtn.classList.remove('visible')
      }
    }
  },
}
</script>
<style scoped lang="scss">
.swiper-slide {
  width: auto;
}

.main-screen {
  position: relative;
  margin-bottom: 200px;
  @media (max-width: 600px) {
    margin-bottom: 100px;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 250px;
    @media (max-width: 1400px) {
      padding-top: 180px;
    }
    @media (max-width: 600px) {
      padding-top: 140px;
    }
    .label {
      font-family: $inter;
      font-weight: 500;
      font-size: 15px;
      line-height: 120%;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: $grey_100;
      margin-bottom: 32px;
      @media (max-width: 500px) {
        font-size: 12px;
      }
    }
    .h1 {
      .title {
        font-family: 'Sora';
        font-style: normal;
        font-weight: 600;
        font-size: 120px;
        line-height: 100%;
        letter-spacing: 0.2px;
        color: $textBlack;
        @media (max-width: 1400px) {
          font-size: 90px;
        }
        @media (max-width: 800px) {
          font-size: 70px;
        }
        @media (max-width: 500px) {
          font-size: 50px;
        }
      }
    }

    .first-line {
      position: relative;
      left: -80px;
      @media (max-width: 1400px) {
        left: -60px;
        img {
          width: 30px;
        }
      }
      @media (max-width: 600px) {
        position: static;
        img {
          width: 24px;
        }
      }
      @media (max-width: 500px) {
        img {
          width: 18px;
        }
      }
    }
    .second-line {
      position: relative;
      left: 40px;
      margin-bottom: 45px;
      @media (max-width: 1400px) {
        left: 60px;
        margin-bottom: 32px;
        img {
          width: 60px;
        }
      }
      @media (max-width: 600px) {
        position: static;
        img {
          width: 48px;
        }
      }
      @media (max-width: 500px) {
        img {
          width: 32px;
        }
      }
    }

    .subtitle {
      font-family: $inter;
      font-weight: 400;
      font-size: 24px;
      line-height: 150%;
      color: $grey_100;
      letter-spacing: 0.2px;
      margin-bottom: 52px;
      @media (max-width: 1400px) {
        font-size: 20px;
        margin-bottom: 40px;
      }
      @media (max-width: 500px) {
        font-size: 18px;
      }
    }

    .search-input {
      position: relative;
      padding: 0 15px;
      width: 100%;
      max-width: 640px;

      &::before {
        content: url('@/assets/img/search-icon.svg');
        position: absolute;
        right: 40px;
        top: 28px;
        color: black;
        width: 20px;
        height: 20px;
        @media (max-width: 500px) {
          top: 22px;
        }
      }
    }
    .search {
      width: 100%;
      // max-width: 640px;
      // height: 84px;
      border-radius: 16px;
      background-color: #fff;
      box-shadow: 0px 25px 75px rgba(6, 7, 20, 0.1);
      border: none;
      padding: 30px 32px;
      margin-bottom: 222px;
      @media (max-width: 1400px) {
        margin-bottom: 160px;
      }
      @media (max-width: 800px) {
        margin-bottom: 110px;
      }
      @media (max-width: 500px) {
        padding: 24px 26px;
        margin-bottom: 70px;
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
    .partners {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 110px;
      @media (max-width: 700px) {
        gap: 80px;
      }
    }
  }
  .circles {
    width: 100%;
    position: absolute;
    z-index: -1;
    top: -90px;
  }

  .tile {
    position: absolute;
    @media (max-width: 1400px) {
      display: none;
    }

    .tile-img {
      margin-bottom: 8px;
    }
    .blured-copy {
      position: absolute;
      z-index: -1;
      top: 16px;
      left: 0;

      opacity: 0.5;
      filter: blur(50px);
      border-radius: 20px;
    }
    .tile-price {
      font-family: $inter;
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      text-align: center;
      letter-spacing: 0.2px;
      color: $grey_100;
    }
  }
  .tile:nth-of-type(1) {
    left: 135px;
    top: 370px;
  }
  .tile:nth-of-type(2) {
    left: 358px;
    top: 680px;
    @media (max-width: 1600px) {
      left: 200px;
    }
  }
  .tile:nth-of-type(3) {
    left: -10px;
    top: 800px;
  }
  .tile:nth-of-type(4) {
    right: 190px;
    top: 290px;
  }
  .tile:nth-of-type(5) {
    right: 100px;
    top: 564px;
  }
  .tile:nth-of-type(6) {
    right: 260px;
    top: 750px;
  }
}

.nft-slider {
  width: 100%;
  margin-bottom: 100px;
  position: relative;

  .swiper-container {
    padding: 0 15px;
  }

  .swiper-one-button-next {
    width: 120px;
    height: 120px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 100%;
    position: absolute;
    z-index: 2;
    top: 420px;
    right: 100px;

    display: flex;
    justify-content: center;
    align-items: center;

    box-shadow: 0px 25px 75px rgba(6, 7, 20, 0.1);
    backdrop-filter: blur(7px);
    cursor: pointer;

    @media (max-width: 900px) {
      opacity: 0;
    }
    img {
      position: relative;
      left: 4px;
    }
  }

  .section-title {
    margin: 0 auto;
    font-family: $sora;
    font-weight: 600;
    font-size: 36px;
    line-height: 45px;
    text-align: center;
    letter-spacing: 0.2px;
    color: $textBlack;

    margin-bottom: 90px;
    @media (max-width: 500px) {
      font-size: 32px;
      margin-bottom: 64px;
    }
  }
}

.info-block {
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 70px;
  padding: 0 15px;
  margin: 0 auto 130px;

  @media (max-width: 1200px) {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 50px;
  }
  @media (max-width: 900px) {
    gap: 32px;
  }

  .text-part {
    max-width: 590px;
    padding: 105px 0;
    @media (max-width: 1200px) {
      padding: 0;
      max-width: none;
    }
    .info-label {
      font-family: $inter;
      font-weight: 500;
      font-size: 15px;
      line-height: 120%;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: $grey_50;
      margin-bottom: 16px;
    }
    .info-title {
      font-family: $sora;
      font-weight: 600;
      font-size: 64px;
      letter-spacing: 0.2px;
      color: $textBlack;

      margin-bottom: 32px;

      @media (max-width: 900px) {
        font-size: 45px;
      }

      @media (max-width: 600px) {
        font-size: 32px;
      }
      @media (max-width: 500px) {
        margin-bottom: 24px;
      }
    }

    .info-features {
      display: flex;
      justify-content: flex-start;
      gap: 40px;
      margin-bottom: 56px;
      img {
        margin-bottom: 24px;
      }
      .feature-title {
        font-family: $sora;
        font-weight: 600;
        font-size: 20px;
        line-height: 25px;
        letter-spacing: 0.2px;
        color: $textBlack;
      }
      .feature-description {
        font-family: $inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;

        color: $grey_100;
      }
    }

    .info-description {
      font-family: $inter;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;

      letter-spacing: 0.2px;

      color: $grey_100;
      margin-bottom: 48px;
      max-width: 500px;
      @media (max-width: 500px) {
        margin-bottom: 32px;
      }
    }

    .info-btns {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 16px;
    }
  }

  .images {
    width: 50%;
    height: 580px;
    position: relative;
    @media (max-width: 950px) {
      width: 100%;
    }
    @media (max-width: 600px) {
      height: 320px;
    }

    img {
      position: absolute;
      @media (max-width: 600px) {
        transform: scale(0.6);
      }
    }
    .pie {
      top: 16px;
      left: 16px;
      @media (max-width: 600px) {
        left: -50px;
      }
    }
    .bucket {
      top: 200px;
      left: 280px;
      @media (max-width: 1400px) {
        left: 150px;
      }
      @media (max-width: 1200px) {
        left: 100px;
      }
      @media (max-width: 600px) {
        top: -60px;
        left: 80px;
      }
      @media (max-width: 400px) {
        left: -50px;
      }
    }
    .paper-plane {
      top: 30px;
      left: 250px;
      @media (max-width: 1500px) {
        left: 190px;
      }
      @media (max-width: 700px) {
        left: 0px;
      }
      @media (max-width: 600px) {
        top: -90px;
      }
      @media (max-width: 400px) {
        left: -60px;
      }
    }
    .yellow-man {
      top: 230px;
      left: 16px;
      @media (max-width: 600px) {
        top: 20px;
      }
    }
  }
}

.info-block.second {
  margin: 0 auto 60px;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
}

.offers {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  max-width: 1430px;
  margin: 0 auto;
  gap: 24px;
  padding: 0 15px;
  // min-height: 750px;
  @media (max-width: 1300px) {
    flex-wrap: wrap;
  }

  .offers-title {
    font-family: $sora;
    font-weight: 600;
    font-size: 24px;
    line-height: 125%;
    letter-spacing: 0.2px;
    margin-bottom: 56px;

    @media (max-width: 900px) {
      margin-bottom: 32px;
    }
  }

  .hottest {
    width: 33%;
    height: 710px;
    border: 1px solid $grey_20;
    border-radius: 20px;
    padding: 45px 40px 40px 40px;

    @media (max-width: 1300px) {
      width: 48%;
    }
    @media (max-width: 900px) {
      width: 100%;
    }

    .slider {
      position: relative;
      .swiper-slide {
        opacity: 0.4;
      }
      .swiper-slide-active {
        opacity: 1;
      }
      .swiper-two-button-next {
        width: 80px;
        height: 80px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 100%;
        position: absolute;
        z-index: 2;
        top: 120px;
        right: 10px;

        display: flex;
        justify-content: center;
        align-items: center;

        box-shadow: 0px 25px 75px rgba(6, 7, 20, 0.1);
        backdrop-filter: blur(7px);
        cursor: pointer;

        @media (max-width: 800px) {
          opacity: 0;
        }
        img {
          position: relative;
          left: 4px;
        }
      }
    }
  }
  .get-started {
    width: 33%;

    height: 710px;
    color: #fff;
    // background: linear-gradient(
    //     188.08deg,
    //     rgba(255, 255, 255, 0.1) 0%,
    //     rgba(255, 255, 255, 0) 93.79%
    //   ),
    //   #060714;
    background: #1c1d29;
    border-radius: 0px 20px 20px 20px;
    padding: 0px 40px 40px;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;

    transition: 0.5s all;

    @media (max-width: 1300px) {
      order: -1;
      width: 100%;
      padding: 250px 40px 90px;
      height: auto;
    }
    @media (max-width: 800px) {
      padding: 80px 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 24px;
      text-align: center;
    }

    .hand {
      width: 430px;
      position: absolute;
      top: -50px;
      left: 12px;
      transition: 0.4s ease-out;
      @media (max-width: 1300px) {
        top: -100px;
        left: 600px;
        // transform: rotate(50deg);
      }
      @media (max-width: 1200px) {
        top: -150px;
        left: 500px;
        transform: rotate(50deg);
      }
      @media (max-width: 1100px) {
        top: -200px;
        left: 400px;
        transform: rotate(50deg);
      }
      @media (max-width: 1000px) {
        top: -250px;
        left: 200px;
        transform: rotate(50deg);
      }
      @media (max-width: 800px) {
        display: none;
      }
    }
    .hand.active {
      @media (min-width: 1300px) {
        transform: scale(1.1);
        transition: 0.4s ease-out;
      }
    }
    .pleat {
      width: 185px;
      position: absolute;
      top: 1px;
      left: 0;
      transform: translateY(-100%);
    }

    .get-started-text {
      position: absolute;
      top: 556px;
      @media (max-width: 1300px) {
        position: static;
      }
      .get-started-title {
        font-family: $sora;
        font-weight: 600;
        font-size: 24px;
        line-height: 125%;
        letter-spacing: 0.2px;
        margin-bottom: 8px;
      }
      .get-started-description {
        font-family: $inter;
        font-weight: 400;
        font-size: 14px;
        line-height: 150%;
        letter-spacing: 0.2px;

        color: $grey_100;
      }
    }

    .get-started-btn {
      width: 100%;
      margin-top: 32px;

      opacity: 0;
      @media (max-width: 1300px) {
        display: none;
      }
    }
    .get-started-btn.visible {
      opacity: 1 !important;
    }
    .get-started-btn-mobile {
      width: 100%;
      margin-top: 38px;
      display: none;
      @media (max-width: 1300px) {
        display: block;
        width: 30%;
      }
      @media (max-width: 900px) {
        width: 100%;
      }
    }
  }
  .get-started.active {
    height: 780px;
  }
  .lower-price {
    width: 33%;
    height: 710px;
    border: 1px solid $grey_20;
    border-radius: 20px;
    padding: 45px 40px 40px 40px;

    display: flex;
    flex-direction: column;

    margin-bottom: 130px;

    @media (max-width: 1300px) {
      width: 48%;
    }
    @media (max-width: 900px) {
      width: 100%;
      height: auto;
    }
  }
}

.divider {
  width: 100%;
  height: 1px;
  background-color: $grey_20;
  margin-bottom: 120px;
  @media (max-width: 600px) {
    margin-bottom: 90px;
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

.divider-short {
  width: 100%;
  max-width: 1400px;
  padding: 0 15px;
  height: 1px;
  background-color: $grey_20;
  margin: 0 auto 100px;
}

.numbers {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  margin: 0 auto 150px;

  max-width: 1430px;
  padding: 0 15px;
  @media (max-width: 900px) {
    justify-content: center;
    gap: 50px;
    flex-wrap: wrap;
    align-items: center;
  }
  @media (max-width: 600px) {
    margin: 0 auto 90px;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      margin-bottom: 16px;
    }
    .big-number {
      font-family: $sora;
      font-weight: 600;
      font-size: 48px;
      line-height: 115%;
      text-align: center;
      letter-spacing: 0.2px;
      color: $textBlack;
      margin-bottom: 4px;
    }
    .description {
      font-family: $inter;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      text-align: center;
      letter-spacing: 0.2px;

      color: $grey_100;
    }
  }
}

.authors-cloud {
  padding: 0 15px;
  .container {
    position: relative;
    // overflow: hidden;
    width: 100%;
    max-width: 1400px;

    margin: 0 auto 120px;
    background-color: $grey_10;
    border-radius: 0px 20px 20px 20px;
    @media (max-width: 600px) {
      margin: 0 auto 70px;
    }

    .pleat {
      // width: 185px;
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%);
      @media (max-width: 500px) {
        width: 200px;
        transform: translateY(-90%);
      }
    }
    .top-gradient {
      background: linear-gradient(
        270deg,
        #f1f1f6 0%,
        rgba(241, 241, 246, 0) 100%
      );
      z-index: 2;
      position: absolute;
      // width: 100%;
      top: 0;
      left: 900px;
      bottom: 0;
      right: 0;
      border-radius: 0px 20px 20px 20px;
      @media (max-width: 1300px) {
        display: none;
      }
    }
    .wrapper {
      overflow: hidden;
      padding: 0 0 0 120px;
      position: relative;
      @media (max-width: 1300px) {
        padding: 0 15px;
      }
    }
    .text-part {
      max-width: 700px;
      padding: 105px 0;
      @media (max-width: 1300px) {
        padding: 64px 0;
        max-width: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      .info-label {
        font-family: $inter;
        font-weight: 500;
        font-size: 15px;
        line-height: 120%;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: $grey_50;
        margin-bottom: 16px;
      }
      .info-title {
        font-family: $sora;
        font-weight: 600;
        font-size: 64px;
        letter-spacing: 0.2px;
        color: $textBlack;

        margin-bottom: 32px;

        @media (max-width: 900px) {
          font-size: 45px;
        }

        @media (max-width: 600px) {
          font-size: 32px;
        }
        @media (max-width: 500px) {
          margin-bottom: 24px;
        }
      }

      .info-description {
        font-family: $inter;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;

        letter-spacing: 0.2px;

        color: $grey_100;
        margin-bottom: 48px;
        max-width: 500px;
        @media (max-width: 500px) {
          margin-bottom: 32px;
        }
      }

      .info-btns {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 16px;
        @media (max-width: 500px) {
          flex-direction: column;
          width: 100%;
          button {
            width: 100%;
          }
        }
      }
    }

    .cloud {
      @media (max-width: 1300px) {
        display: none;
      }
      .authors-cloud-img {
        position: absolute;
      }
      .authors-cloud-img:nth-of-type(1) {
        top: 270px;
        right: 400px;
      }
      .authors-cloud-img:nth-of-type(2) {
        top: 90px;
        right: 70px;
      }
      .authors-cloud-img:nth-of-type(3) {
        top: 50px;
        right: -280px;
      }
      .authors-cloud-img:nth-of-type(4) {
        top: 230px;
        right: -117px;
      }
      .authors-cloud-img:nth-of-type(5) {
        top: 374px;
        right: 86px;
      }
      .authors-cloud-img:nth-of-type(6) {
        top: 480px;
        right: -284px;
      }
    }
  }
}

.square-title-row {
  margin-bottom: 50px;
}

// footer {
//   width: 100%;
//   padding: 0 15px;
//   margin-bottom: 100px;
//   @media (max-width: 600px) {
//     margin-bottom: 32px;
//   }
//   .footer-wrapper {
//     margin: 0 auto;
//     display: flex;
//     width: 100%;

//     border: 1px solid $grey_20;
//     max-width: 1430px;
//     border-radius: 20px;

//     @media (max-width: 900px) {
//       flex-direction: column;
//     }

//     .left,
//     .mid,
//     .right {
//       padding: 48px 48px 40px 48px;
//       @media (max-width: 1100px) {
//         padding: 24px 24px 20px 24px;
//       }
//     }
//     .left {
//       height: 400px;
//       width: 33.3%;
//       border-right: 1px solid $grey_20;
//       display: flex;
//       flex-direction: column;
//       justify-content: space-between;
//       align-items: flex-start;
//       @media (max-width: 1000px) {
//         width: 25%;
//       }
//       @media (max-width: 900px) {
//         width: 100%;
//         flex-direction: row;
//         border-right: 0px;
//         border-bottom: 1px solid $grey_20;
//         height: 100%;
//         align-items: center;
//       }
//       @media (max-width: 600px) {
//         flex-direction: column;
//         gap: 12px;
//       }
//       .logo {
//         width: 100%;
//         max-width: 220px;
//         display: block;
//       }
//       .useful-links {
//         @media (max-width: 1300px) {
//           display: flex;
//           flex-direction: column;
//           align-items: flex-start;
//           justify-content: flex-start;
//           gap: 24px;
//           @media (max-width: 900px) {
//             flex-direction: row;
//           }
//         }
//         .link {
//           font-family: $inter;
//           font-weight: 400;
//           font-size: 14px;
//           line-height: 150%;
//           text-align: center;
//           letter-spacing: 0.2px;
//           color: $grey_100;
//           cursor: pointer;
//         }
//         .link:not(:first-of-type) {
//           margin-left: 40px;
//           @media (max-width: 1300px) {
//             margin-left: 0;
//           }
//         }
//       }
//     }
//     .mid {
//       height: 400px;
//       width: 33.3%;
//       display: flex;
//       flex-direction: column;
//       justify-content: space-between;
//       align-items: flex-start;
//       @media (max-width: 1000px) {
//         width: 25%;
//       }
//       @media (max-width: 900px) {
//         width: 100%;
//         height: 100%;
//         flex-direction: row;
//         align-items: center;
//       }
//       @media (max-width: 800px) {
//         flex-direction: column;
//         align-items: flex-start;
//         gap: 16px;
//       }
//       @media (max-width: 600px) {
//         align-items: center;
//       }

//       ul {
//         @media (max-width: 900px) {
//           display: flex;
//           justify-content: center;
//           gap: 24px;
//           align-items: center;
//         }
//         @media (max-width: 600px) {
//           flex-wrap: wrap;
//           gap: 12px;
//         }
//         li {
//           font-family: $sora;
//           font-weight: 600;
//           font-size: 16px;
//           line-height: 20px;
//           display: flex;
//           align-items: center;
//           text-align: center;
//           letter-spacing: 0.2px;
//           color: $textBlack;
//           cursor: pointer;
//         }
//         li:not(:last-of-type) {
//           margin-bottom: 16px;
//           @media (max-width: 900px) {
//             margin-bottom: 0px;
//           }
//         }
//       }

//       .solid-btn {
//         @media (max-width: 860px) {
//           display: none;
//         }
//       }

//       .social-links img {
//         cursor: pointer;
//       }
//       .social-links img:not(:first-of-type) {
//         margin-left: 25px;
//         @media (max-width: 1100px) {
//           margin-left: 8px;
//         }
//       }
//     }
//     .right {
//       height: 400px;
//       width: 33.3%;
//       border-left: 1px solid $grey_20;
//       display: flex;
//       flex-direction: column;
//       justify-content: space-between;
//       align-items: flex-start;
//       @media (max-width: 1000px) {
//         width: 50%;
//       }
//       @media (max-width: 900px) {
//         width: 100%;
//         height: 100%;
//         gap: 18px;
//         border-left: 0px;
//         border-top: 1px solid $grey_20;
//       }

//       .footer-info {
//         font-family: $inter;
//         font-weight: 400;
//         font-size: 16px;
//         line-height: 150%;
//         letter-spacing: 0.2px;
//         color: $grey_100;
//         @media (max-width: 900px) {
//           max-width: 600px;
//         }
//       }

//       .search-input {
//         position: relative;
//         // padding: 0 15px;
//         width: 100%;
//         max-width: 600px;

//         &::before {
//           content: 'Sign in';
//           position: absolute;
//           right: 40px;
//           top: 16px;
//           color: $PurpleDark_100;
//           font-family: $sora;
//           font-weight: 600;
//           font-size: 16px;
//           line-height: 20px;
//           text-align: center;
//           letter-spacing: 0.2px;
//           cursor: pointer;
//           @media (max-width: 400px) {
//             right: 20px;
//           }
//         }
//       }
//       .search {
//         width: 100%;
//         border-radius: 16px;
//         background-color: #fff;
//         box-shadow: 0px 25px 75px rgba(6, 7, 20, 0.1);
//         border: none;
//         padding: 16px 24px 16px 32px;
//         @media (max-width: 400px) {
//           padding: 16px 10px 16px 16px;
//         }

//         &::placeholder {
//           color: $grey_50;
//           opacity: 0.7;
//           @media (max-width: 500px) {
//             font-size: 14px;
//           }
//         }
//         &:focus {
//           caret-color: $PurpleDark_100;
//         }
//       }
//     }
//   }
// }

.linear-btn {
  @include linearBtn;
}
.solid-btn {
  @include solidBtn;
}
</style>
