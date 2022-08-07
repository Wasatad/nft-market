<template>
  <div>
    <div class="message-wrapper">
      <img class="success-icon" src="@/assets/img/icon-success.svg" alt="" />
      <div class="message-container">
        <img
          @click="close"
          class="close-icon"
          src="@/assets/img/close-flash.svg"
          alt=""
        />
        <div class="title">Well done!</div>
        <div class="description">
          You have successfully placed<br />a
          <span>{{ currentNFT.price.toFixed(2) }} ETH</span> bid
        </div>
        <img class="bubbles" src="@/assets/img/bubbles.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['currentNFT', 'isCongratsAlertVisible']),
  },
  methods: {
    ...mapMutations(['closeCongratsAlert']),
    close() {
      let flashAlert = document.querySelector('.message-wrapper')
      flashAlert.classList.remove('show')
      let that = this
      setTimeout(() => {
        that.closeCongratsAlert()
      }, 1000)
    },
  },

  mounted() {
    let flashAlert = document.querySelector('.message-wrapper')
    setTimeout(() => {
      flashAlert.classList.add('show')
    }, 500)

    let that = this
    setTimeout(() => {
      if (flashAlert.classList.contains('show')) {
        flashAlert.classList.remove('show')
      }
      setTimeout(() => {
        that.closeCongratsAlert()
      }, 1000)
    }, 6000)
  },
}
</script>

<style scoped lang="scss">
.message-wrapper {
  position: fixed;
  max-width: 380px;
  width: calc(100% - 30px);
  z-index: 1001;
  top: 0;
  left: 50%;
  transform: translate(-50%, -200px);
  background-color: #5f5dc6;
  color: #fff;
  border-radius: 26px;
  box-shadow: 0px 14px 29px -3px rgba(104, 69, 169, 0.25);
  transition: all 0.3s ease-in-out;
  &.show {
    transition: all 0.3s ease-in-out;
    transform: translate(-50%, 124px);
  }
  .message-container {
    overflow: hidden;
    position: relative;
    border-radius: 26px;
    padding: 24px 0 24px 100px;
  }

  .close-icon {
    position: absolute;
    top: 20px;
    right: 32px;
    cursor: pointer;
  }

  .bubbles {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .success-icon {
    position: absolute;
    left: 20px;
    top: -30px;
  }

  .title {
    font-family: $sora;
    font-weight: 600;
    font-size: 26px;
    margin-bottom: 4px;
  }
  .description {
    font-family: $inter;
    line-height: 140%;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.02em;

    span {
      font-weight: 600;
    }
  }
}
</style>
