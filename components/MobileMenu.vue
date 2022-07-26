<template>
  <div class="mobile-menu-wrapper">
    <div class="mobile-menu">
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
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.mobile-menu-wrapper {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;
  .mobile-menu {
    padding-top: 160px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 24px;
  }
  .menu {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    margin-bottom: 32px;

    li {
      font-family: $sora;
      font-weight: 600;
      font-size: 20px;
      line-height: 20px;
      display: flex;
      align-items: center;
      text-align: center;
      letter-spacing: 0.2px;
      color: $textBlack;
    }
  }
}
.buttons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  button {
    display: block;
    width: 200px;
  }
}
.linear-btn {
  @include linearBtn;
}
.solid-btn {
  @include solidBtn;
}
</style>
