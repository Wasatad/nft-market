<template>
  <div class="bid-wrapper">
    <div class="label">Enter your bid:</div>
    <div class="input-container">
      <img
        class="plus"
        src="@/assets/img/step-up.svg"
        alt=""
        onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
      />
      <input
        @input="validate"
        @change="validate"
        @blur="validate"
        ref="bid"
        onkeydown="return event.keyCode !== 69 && event.keyCode !== 187 && event.keyCode !== 189"
        type="number"
        :step="0.01"
        :placeholder="'min ' + parsedPrice"
        :min="parsedPrice"
        max="100"
      />
      <img
        class="minus"
        src="@/assets/img/step-down.svg"
        alt=""
        onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
      />
    </div>
    <div class="alerts">
      <div v-if="moreThenHundred">Max bid - 100 ETH</div>
      <div v-if="lowerThenCurrent">
        Min bid - {{ currentPrice.toFixed(2) }} ETH
      </div>
    </div>

    <div class="buttons">
      <button @click="close" class="linear-btn">Cancel</button>
      <button
        @click="setNewPrice"
        :class="[timeIsUp ? disabledButton : '', activeButton]"
      >
        Place a bid
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      moreThenHundred: false,
      lowerThenCurrent: false,
      newPrice: null,
      currentPrice: 0,
      //CSS
      activeButton: 'solid-btn',
      disabledButton: 'disabled',
    }
  },
  methods: {
    close() {
      this.$emit('closeInput')
    },
    setNewPrice() {
      if (this.$refs.bid.value && !this.timeIsUp) {
        if (
          Number.parseFloat(this.$refs.bid.value) >=
          this.currentPrice.toFixed(2)
        ) {
          this.newPrice = Number.parseFloat(this.$refs.bid.value)
          this.$emit('addBid', this.newPrice)
          this.close()
        } else {
          this.lowerThenCurrent = true
        }
      }
    },
    validate(e) {
      if (e.target.value >= 100) {
        this.moreThenHundred = true
      } else {
        this.moreThenHundred = false
      }

      // Check if value < initial value
      if (e.type == 'blur') {
        if (+e.target.value < this.parsedPrice) {
          this.lowerThenCurrent = true
        } else {
          this.lowerThenCurrent = false
        }
      }

      //Check if value <= 100
      if (this.moreThenHundred == true) {
        e.target.value = e.target.value.split('').slice(0, -1).join('')
      }

      //Check if more than two simbols after digit
      if (e.target.value.split('.')[1]) {
        if (e.target.value.split('.')[1].length > 2) {
          e.target.value = e.target.value.split('').slice(0, -1).join('')
        }
      }
    },
  },
  computed: {
    ...mapState(['currentNFT']),
    parsedPrice() {
      return (Number.parseFloat(this.currentNFT.price) + 0.01).toFixed(2)
    },
    timeIsUp() {
      if (this.currentNFT.timeTillTheEnd >= 1000) {
        return false
      } else {
        return true
      }
    },
  },
  mounted() {
    this.currentPrice = parseFloat(this.currentNFT.price) + 0.01
  },
}
</script>

<style scoped lang="scss">
.bid-wrapper {
  position: absolute;
  top: 130px;
  left: 40px;
  width: calc(100% - 80px);
  max-width: 800px;
  background-color: #fff;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.09);
  border-radius: 17px;

  padding: 25px 33px 33px 33px;

  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;

  @media (max-width: 500px) {
    width: 100%;
    left: 0;
  }
  .label {
    font-family: $inter;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.2px;
    color: $grey_100;
    margin-bottom: 16px;
  }
  .input-container {
    height: 92px;
    width: 220px;
    margin-bottom: 12px;
    position: relative;
    input {
      font-size: 42px;
      font-weight: 600;
      width: 100%;
      border: 1px solid $grey_20;
      border-radius: 17px;
      padding: 15px 15px;
      text-align: center;
      &::placeholder {
        font-size: 32px;
        opacity: 0.2;
        text-align: center;
      }

      &:focus::placeholder {
        color: transparent;
      }
    }

    .plus {
      position: absolute;
      top: 12px;
      right: 8px;
      cursor: pointer;
    }
    .minus {
      position: absolute;
      bottom: 20px;
      right: 8px;
      cursor: pointer;
    }
  }

  .alerts div {
    font-family: $inter;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.2px;
    color: #e22525;

    margin-bottom: 18px;
  }
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin: 0 auto;

    @media (max-width: 1200px) {
      flex-direction: column-reverse;
    }

    button {
      @media (max-width: 1200px) {
        width: 100%;
      }
    }

    .linear-btn {
      @include linearBtn;
    }
    .solid-btn {
      padding: 16px 50px !important;
      @include solidBtn;
    }
    .disabled {
      @include solidBtn;
      background-color: #b3b3b3 !important;
      background: none;
      cursor: default;
    }
  }
}
</style>
