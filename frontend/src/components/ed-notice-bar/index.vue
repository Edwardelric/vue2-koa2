<template>
    <div class="ed-notice-bar">
        <div class="ed-notice-bar-content ed-notice-bar-play-infinite" :style="{animationDuration: animationDuration + 's'}">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
    	props: {
		    animationDuration: {
		    	type: Number,
                default: 16
            }
        },
        name: 'edNoticeBar',
        data() {
            return {};
		    }
	  };
</script>

<style lang="scss">
    .ed-notice-bar {
        overflow: hidden;
        position: relative;
        margin: 0 15px;
        height: 14px;
        color: #fff;
        line-height: 14px;
        .ed-notice-bar-content {
            padding-left: 100%;
            position: absolute;
            white-space: nowrap;
        }
        .ed-notice-bar-play {
            animation: ed-notice-bar-play linear;
        }
        .ed-notice-bar-play-infinite {
            animation: ed-notice-bar-play-infinite 16s 0s linear infinite;
        }
        @keyframes ed-notice-bar-play {
            to {
                transform: translate3d(-100%, 0, 0);
            }
        }
        @keyframes ed-notice-bar-play-infinite {
            to {
                transform: translate3d(-100%, 0, 0);
            }
        }
    }
</style>
