<template>
  <div class="svg-wrapper">
    <svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g id="circle" class="g-circles g-circles--v1">
        <circle id="1" cx="60" cy="10" r="10"></circle>
        <circle id="2" cx="85" cy="16.6987298" r="10"></circle>
        <circle id="3" cx="103.30127" cy="35" r="10"></circle>
        <circle id="4" cx="110" cy="60" r="10"></circle>
        <circle id="5" cx="103.30127" cy="85" r="10"></circle>
        <circle id="6" cx="85" cy="103.30127" r="10"></circle>
        <circle id="7" cx="60" cy="110" r="10"></circle>
        <circle id="8" cx="35" cy="103.30127" r="10"></circle>
        <circle id="9" cx="16.6987298" cy="85" r="10"></circle>
        <circle id="10" cx="10" cy="60" r="10"></circle>
        <circle id="11" cx="16.6987298" cy="35" r="10"></circle>
        <circle id="12" cx="35" cy="16.6987298" r="10"></circle>
      </g>
      <use xlink:href="#circle" class="use"/>
    </svg>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
	  name: 'edSpinner',
		data() {
			return {};
		}
	};
</script>

<style lang="scss" scoped>
  .svg-wrapper {
    width:100%;
    height: 100%;
    .g-circles {
      -webkit-transform: scale(0.9) translate(7px, 7px);
      -ms-transform: scale(0.9) translate(7px, 7px);
      transform: scale(0.9) translate(7px, 7px);
    }
    .g-circles circle {
      fill: #ccc;
      fill-opacity: 0;
      -webkit-animation: opacity 1.2s linear infinite;
      animation: opacity 1.2s linear infinite;
    }
    circle:nth-child(12n + 12) {
      -webkit-animation-delay: -0.1s;
      animation-delay: -0.1s;
    }
    circle:nth-child(12n + 11) {
      -webkit-animation-delay: -0.2s;
      animation-delay: -0.2s;
    }
    circle:nth-child(12n + 10) {
      -webkit-animation-delay: -0.3s;
      animation-delay: -0.3s;
    }
    circle:nth-child(12n + 9) {
      -webkit-animation-delay: -0.4s;
      animation-delay: -0.4s;
    }
    circle:nth-child(12n + 8) {
      -webkit-animation-delay: -0.5s;
      animation-delay: -0.5s;
    }
    circle:nth-child(12n + 7) {
      -webkit-animation-delay: -0.6s;
      animation-delay: -0.6s;
    }
    circle:nth-child(12n + 6) {
      -webkit-animation-delay: -0.7s;
      animation-delay: -0.7s;
    }
    circle:nth-child(12n + 5) {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }
    circle:nth-child(12n + 4) {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }
    circle:nth-child(12n + 3) {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }
    circle:nth-child(12n + 2) {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }
    circle:nth-child(12n + 1) {
      -webkit-animation-delay: -1.2s;
      animation-delay: -1.2s;
    }
    @-webkit-keyframes opacity {
      3% {
        fill-opacity: 1;
      }

      75% {
        fill-opacity: 0;
      }
    }

    @keyframes opacity {
      3% {
        fill-opacity: 1;
      }

      75% {
        fill-opacity: 0;
      }
    }
  }
</style>
