<template>
  <div class="wrapper header">
    <NuxtLink to="/">
      <img src="@/assets/img/logo.svg" alt="" />
    </NuxtLink>
    <ul class="menu">
      <li>Auctions</li>
      <li>Roadmap</li>
      <li>Discover</li>
      <li>Community</li>
    </ul>
    <div class="buttons">
      <button class="linear-btn">Contact</button>
      <button class="solid-btn">My account</button>
    </div>
    <div @click="toggleMenu" class="burger">
      <img v-if="mobileMenuOpened" src="@/assets/img/close-mobile.svg" alt="" />
      <img v-else src="@/assets/img/burger.svg" alt="" />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  methods: {
    ...mapMutations(['toggleMobileMenu']),
    toggleMenu() {
      this.toggleMobileMenu()
      let body = document.querySelector('body')
      if (body.classList.contains('no-scroll')) {
        body.classList.remove('no-scroll')
      } else {
        body.classList.add('no-scroll')
      }
    },
  },
  computed: {
    ...mapState(['mobileMenuOpened']),
  },
  mounted() {
    let header = document.querySelector('.header')
    window.onscroll = function () {
      if (window.pageYOffset >= 2) {
        header.classList.add('header-solid')
      } else {
        header.classList.remove('header-solid')
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0px 40px 0px 48px;

  width: 100%;
  height: 90px;
  @media (max-width: 700px) {
    padding: 0 15px;
  }

  .menu {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 64px;

    font-family: $sora;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 0.2px;
    color: $grey_100;
    @media (max-width: 1200px) {
      display: none;
    }
  }
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;

    @media (max-width: 700px) {
      display: none;
    }

    .linear-btn {
      @include linearBtn;
    }
    .solid-btn {
      @include solidBtn;
    }
  }
  .burger {
    display: none;
    @media (max-width: 700px) {
      display: block;
    }
  }
}

.header-solid {
  background-color: #fff;
  box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.04);
}
</style>
