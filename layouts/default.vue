<template>
  <div>
    <TheHeader />
    <transition name="mobile-menu">
      <mobile-menu v-if="mobileMenuOpened"></mobile-menu>
    </transition>
    <nuxt />
    <TheFooter />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['mobileMenuOpened']),
  },
}
</script>

<style lang="scss">
html {
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  font-family: $inter;
}

* {
  box-sizing: border-box;
}

//Reset CSS
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

input,
button,
textarea,
select {
  font: inherit;
  outline: none;
  border: none;
}

input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.no-scroll {
  overflow-y: hidden;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.5s;
}
.mobile-menu-enter,
.mobile-menu-leave-to {
  transform: translateX(-100%);
}
</style>
