<template>
  <div>
    <kinesis-container :active="isDesktop">
      <div class="main-screen">
        <img
          class="circles"
          src="@/assets/img/main-screen-background.png"
          alt=""
        />
        <div
          @click.self="
            {
              ;(searchOptionsOpened = false), (searchResultsOpened = false)
            }
          "
          class="content"
        >
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
          <div class="search-container">
            <div
              data-aos="zoom-in"
              data-aos-duration="1000"
              class="search-wrapper"
            >
              <div v-if="searchResultsOpened" class="search-results">
                <div v-if="searchResults.length >= 1">
                  <nft-horizontal
                    v-for="nft in searchResults"
                    :key="nft.id"
                    :nft="nft"
                    class="nft-item"
                  ></nft-horizontal>
                </div>
                <div v-else class="empty-placeholder">
                  <img src="@/assets/img/magnifier-illustration.png" alt="" />
                  <div class="placeholder-title">
                    Sorry, we couldn’t find any matches for ‘<span>{{
                      $refs.searchInput.value
                    }}</span
                    >’
                  </div>
                  <div class="placeholder-tooltip">
                    Please try searching with another term
                  </div>
                </div>
              </div>
              <input
                @click.self="searchOptionsOpened = false"
                placeholder="Items, collections and creators"
                ref="searchInput"
                class="search-input"
                type="text"
              />

              <div @click.self="toggleSearchOptions" class="category-select">
                {{ activeSearchOption }}
                <img
                  @click.self="toggleSearchOptions"
                  :class="searchOptionsOpened ? 'arrow-down' : 'arrow-up'"
                  src="@/assets/img/arrow-down-icon.svg"
                  alt=""
                />
                <ul v-if="searchOptionsOpened" class="categories">
                  <li
                    @click="
                      {
                        ;(activeSearchOption = 'Latest'), searchFilter()
                      }
                    "
                    @click.self="searchOptionsOpened = false"
                  >
                    Latest
                  </li>
                  <li
                    @click="
                      {
                        ;(activeSearchOption = 'Popular'), searchFilter()
                      }
                    "
                    @click.self="searchOptionsOpened = false"
                  >
                    Popular
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="partners">
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

      <div @click="searchResultsOpened = false" class="nft-slider">
        <div data-aos="fade-up" class="section-title">Latest live auctions</div>
        <div class="swiper-one-button-next">
          <img src="@/assets/img/arrow-next.svg" alt="" />
        </div>
        <div class="swiper-one" v-swiper:mySwiperOne="swiperOneOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="nft in latestNFTs" :key="nft.id">
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
            <kinesis-element
              :active="isDesktop"
              type="translate"
              :strength="20"
            >
              <img class="pie" src="@/assets/img/pie.png" alt="" />
            </kinesis-element>
            <kinesis-element
              :active="isDesktop"
              type="translate"
              :strength="50"
            >
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
                <div
                  class="swiper-slide"
                  v-for="nft in latestNFTs"
                  :key="nft.id"
                >
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
            <kinesis-element
              :active="isDesktop"
              type="translate"
              :strength="40"
            >
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
          <div v-for="nft in popularNFTs" :key="nft.id">
            <nft-popular
              :nft="nft"
              :nextSlide="emitNextSlide"
              class="nft-item"
            ></nft-popular>
          </div>
        </div>
        <button data-aos="fade-up" @click="loadNFTs()" class="linear-btn">
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
    </kinesis-container>
  </div>
</template>

<script>
import { LoremIpsum } from 'lorem-ipsum'
const lorem = new LoremIpsum()
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
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
        spaceBetween: 24,
        simulateTouch: true,
        navigation: {
          nextEl: '.swiper-two-button-next',
        },
      },
      searchOptionsOpened: false,
      searchResultsOpened: false,
      searchResults: [],
      activeSearchOption: 'Latest',
      isDesktop: null,
    }
  },

  computed: {
    ...mapState(['latestNFTs', 'popularNFTs']),
    ...mapGetters(['sortedByPrice']),
  },
  methods: {
    searchFilter() {
      let searchInput = document.querySelector('.search-input')
      let targetArray = []
      if (this.activeSearchOption == 'Latest') {
        targetArray = this.latestNFTs
      } else if (this.activeSearchOption == 'Popular') {
        targetArray = this.popularNFTs
      }

      let userInput = searchInput.value

      function filterFunc(nft) {
        let isEqual = true
        for (let i = 0; i < userInput.length; i++) {
          if (userInput[i].toUpperCase() != nft.name[i].toUpperCase()) {
            isEqual = false
          }
        }
        return isEqual
      }

      if (userInput.length < 1) {
        this.searchResults = targetArray
      } else {
        this.searchResults = targetArray.filter(filterFunc)
      }
    },
    toggleSearchOptions() {
      this.searchOptionsOpened = !this.searchOptionsOpened
    },
    theFormat(number) {
      return number.toFixed(1)
    },

    loadNFTs() {
      this.$store.dispatch('loadNFTs', { category: 'popularNFTs', qty: 5 })
    },
  },
  mounted() {
    let swiper = document.querySelector('.swiper-one').swiper
    console.log(44344)
    setTimeout(() => {
      swiper.init()
    }, 7000)
    setTimeout(() => {
      swiper.slideNext()
    }, 3000)
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

    let searchInput = document.querySelector('.search-input')
    searchInput.onfocus = () => {
      this.searchResultsOpened = true
      this.searchFilter()
    }

    searchInput.oninput = () => {
      this.searchFilter()
    }

    if (window.innerWidth < 1000) {
      this.isDesktop = false
    } else {
      this.isDesktop = true
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth < 1000) {
        this.isDesktop = false
      } else {
        this.isDesktop = true
      }
    })
  },
  unmounted() {
    window.removeEventListener('resize', () => {
      if (window.innerWidth < 1000) {
        this.isDesktop = false
      }
    })
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

    .search-container {
      width: 100%;
      max-width: 540px;
      padding: 0 15px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .search-wrapper {
      position: relative;
      padding: 0 24px;
      width: 100%;

      margin-bottom: 222px;

      background-color: #fff;
      box-shadow: 0px 25px 75px rgba(6, 7, 20, 0.1);
      border-radius: 16px;

      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: center;

      @media (max-width: 1400px) {
        margin-bottom: 160px;
      }
      @media (max-width: 800px) {
        margin-bottom: 110px;
      }
      @media (max-width: 500px) {
        margin-bottom: 70px;
      }
    }
    .search-results {
      width: 100%;
      position: absolute;
      left: 0;
      top: 100px;
      background-color: #fff;
      box-shadow: 0px 25px 75px rgba(6, 7, 20, 0.1);
      border-radius: 16px;
      height: 300px;
      overflow: scroll;
      padding: 28px 28px 10px 28px;
    }

    .category-select {
      width: 30%;
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 16px;

      font-family: $inter;
      font-weight: 400;
      font-size: 16px;
      user-select: none;

      color: $textBlack;
      letter-spacing: 0.2px;

      cursor: pointer;

      @media (max-width: 500px) {
        width: 40%;
      }
      &::before {
        display: block;
        content: '';
        width: 1px;
        height: 28px;
        background-color: #1f2a47;
        opacity: 0.25;
      }
      .arrow-down {
        margin-left: auto;
        transform: scale(-1);
      }
      .arrow-up {
        margin-left: auto;
      }

      .categories {
        position: absolute;
        left: 0;
        bottom: -110px;
        width: 120px;
        border-radius: 12px;

        background-color: #fff;
        box-shadow: 0px 25px 75px rgba(6, 7, 20, 0.1);
        padding: 22px 0 22px 32px;
        cursor: auto;
        li {
          cursor: pointer;
          &:hover {
            color: $PurpleDark_100;
          }
        }
        li:first-of-type {
          margin-bottom: 18px;
        }
      }
    }
    .search-input {
      width: 70%;
      height: 84px;
      border-radius: 16px;
      background-color: #fff;

      border: none;

      @media (max-width: 500px) {
        width: 60%;
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

  .empty-placeholder {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    text-align: center;
    letter-spacing: 0.2px;
    font-family: $inter;
    img {
      width: 135px;
      height: auto;
      margin: 20px 0 24px;
      @media (max-width: 500px) {
        margin: 8px 0 24px;
      }
    }

    .placeholder-title {
      font-weight: 400;
      font-size: 18px;
      margin-bottom: 12px;
      span {
        font-weight: 700;
      }
    }
    .placeholder-tooltip {
      font-weight: 400;
      font-size: 16px;

      color: $grey_50;

      opacity: 0.8;
    }
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
    width: 60%;
    max-width: 590px;
    padding: 105px 0;
    @media (max-width: 1200px) {
      padding: 0;
      width: 100%;
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
    width: 40%;
    height: 580px;
    position: relative;
    @media (max-width: 950px) {
      width: auto;
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
      left: 170px;
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
    width: 100%;
    max-width: 1400px;

    margin: 0 auto 120px;
    background-color: $grey_10;
    border-radius: 0px 20px 20px 20px;
    @media (max-width: 600px) {
      margin: 0 auto 70px;
    }

    .pleat {
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

.linear-btn {
  @include linearBtn;
}
.solid-btn {
  @include solidBtn;
}
</style>
