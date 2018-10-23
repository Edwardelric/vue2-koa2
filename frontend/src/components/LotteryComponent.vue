<template>
  <div class="canvas-wrap" :class="canvasWrapClassName">
    <div v-if="useCanvasDraw">
      <canvas id="canvas" class="canvas "ref="canvasDom">您当前的版本不支持canvas功能</canvas>
      <div class="indicator" ref="indicator" :class="indicatorClassName" @click="startMove">
        <div class="inner">
          <slot name="txt">
            <p>开始<br/>抽奖</p>
          </slot>
        </div>
      </div>
    </div>
    <div v-if="!useCanvasDraw">
      <slot name="lotteryBg"></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      value: {
        type: Number,
        default: 0
      },
      data: {
        type: Array,
        default: []
      },
      useCanvasDraw: {
        type: Boolean,
        default: true
      },
      textColor: {
        type: String,
        default: '#E5302F'
      },
      animateType: {
        type: String,
        default: 'easeOut'
      },
      duration: {
        type: Number,
        default: 2000
      },
      durationStep: {
        type: Number,
        default: 20
      },
      roundNum: {
        type: Number,
        default: 10
      },
      canvasWrapClassName: {
        type: String,
        default: ''
      },
      indicatorClassName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        canvasDom: null,                // canvas dom节点
        canvasData: {
          ctx: null,
          canvasWidth: 0,               // canvas宽度
          divideAngle: 0,               // 等分角度
          outerRadius: 0,               // 外层园半径
          innerRadius: 0,               // 内层园半径
          radiusRate: 3,                // 内外层半径比例
          txtRadius: 0,                 // 文字半径位置
          dpiRate: 1,
          defaultTxtColor: "#E5302F"    // 文字默认颜色
        },
        movePlate: {
          isMoving: false,              // 是否在运动
          durationStep: 0,
          timer: null,
          moveTo: 360 * this.roundNum   // 移动到什么地方
        },
        angleVal: this.value
      };
    },
    created() {
      this.tween = {                        // 运动库对象
        linear(t, b, c, d) {
          return c * t / d + b;
        },
        easeOut(t, b, c, d) {
          return -c *(t /= d)*(t-2) + b;
        },
        easeSlowOut(t, i, e, s, h) {
          return -s * ((i = i / h - 1) * i * i * i - 1) + e;
        }
      };
      if (!Array.isArray(this.data)) {
        // 数据不是数组类型的则报错停止执行
        console.error("data type should be Array");
        return false;
      } else if (360 % this.data.length) {
        console.error("data can be divided for 360")
        return false;
      }
      this.canvasData.divideAngle = 360 / this.data.length;
      this.tweenFn = this.tween[this.animateType] ? this.tween[this.animateType] : this.tween["easeOut"];
    },
    mounted() {
      this.canvasDom = this.$refs.canvasDom;
      this.indicator = this.$refs.indicator;
      if (this.useCanvasDraw) {
        this.init();
      }
    },
    methods: {
      init() {
        let ctx = this.canvasData.ctx = this.canvasDom.getContext("2d");
        let devicePixelRatio = window.devicePixelRatio || 1;
        let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio || 1;
        this.canvasData.dpiRate = devicePixelRatio / backingStoreRatio;
        this.setWidth();
        this.drawPlate();
      },
      setWidth() {
        let canvasWidth = this.canvasData.canvasWidth = this.formatToEven(this.$el.offsetWidth);
        this.canvasDom.width = canvasWidth * this.canvasData.dpiRate;
        this.canvasDom.height = canvasWidth * this.canvasData.dpiRate;
        this.canvasDom.style.width = canvasWidth + "px";
        this.canvasDom.style.height = canvasWidth + "px";
      },
      drawPlate() {
        let ctx = this.canvasData.ctx;
        let canvasData = this.canvasData;
        let outerRadius = canvasData.outerRadius = canvasData.canvasWidth / 2;
        let innerRadius = canvasData.innerRadius = Math.floor(outerRadius / canvasData.radiusRate);
        let txtRadius = canvasData.txtRadius = outerRadius - 40;
        let arc = Math.PI * 2 / this.data.length;
        let line_height = 17;

        this.indicator.style.cssText = `width: ${innerRadius * 2}px; height: ${innerRadius * 2}px`;
        ctx.scale(this.canvasData.dpiRate, this.canvasData.dpiRate);
        ctx.translate(canvasData.canvasWidth / 2, canvasData.canvasWidth / 2);
        ctx.strokeStyle = "transparent";
        this.data.forEach((item, i) => {
          let angle =  i * arc;
          let txt = item.txt;
          ctx.fillStyle = item.color ? item.color : ((i % 2) ? "#FFFFFF" : "#FFF4D6");
          ctx.beginPath();
          ctx.arc(0, 0, outerRadius, angle, angle + arc, false);
          ctx.arc(0, 0, innerRadius, angle + arc, angle, true);
          ctx.fill();
          // 文字位置
          ctx.save();
          ctx.fillStyle = this.textColor ? this.textColor : this.canvasData.defaultTxtColor;
          ctx.translate(Math.cos(angle + arc / 2) * txtRadius, Math.sin(angle + arc / 2) * txtRadius);
          ctx.rotate(angle + arc / 2 + Math.PI / 2);
          if (txt.length > 6) {
            let tests = this.getDivideStr(txt, 6);
            ctx.font = "12px Microsoft YaHei";
            tests.forEach((subItem, subIndex) => {
              ctx.fillText(subItem, -ctx.measureText(subItem).width / 2, subIndex * line_height)
            });
          } else {
            ctx.font = "16px Microsoft YaHei";
            ctx.fillText(txt, -ctx.measureText(item.txt).width / 2, 0);
          }
          ctx.restore();
        });
        this.$emit("drawPlateComplete");
      },
      move() {
        let movePlate = this.movePlate;
        // t: current time（当前时间） b: beginning value（初始值）
        // c: change in value（变化量） d: duration（持续时间）
        let t = movePlate.durationStep, b = 0,
            c = this.movePlate.moveTo, d = this.duration;
        let dest = this.tweenFn(t, b, c, d);
        movePlate.isMoving = true;
        movePlate.durationStep += this.durationStep;
        if (t <= d) {
          if (dest > 360) {
            dest = dest % 360;
          } else {
            dest = Math.floor(dest);
          }
          this.canvasDom.style.webkitTransform = `rotate(${dest}deg)`;
          movePlate.timer = requestAnimationFrame(this.move);
        } else {
          cancelAnimationFrame(movePlate.timer);
          movePlate.moveTo = 360 * this.roundNum;
          movePlate.durationStep = 0;
          movePlate.isMoving = false;
        }
      },
      startMove() {
        let movePlate = this.movePlate;
        if (movePlate.isMoving) {return false;}
        let angles = this.angleVal;
        if (angles > 360) {
          angles %= 360;
        }
        this.movePlate.moveTo = this.movePlate.moveTo + angles;
        this.$emit('changeValueHandler');
      },
      formatToEven(data) {
        if (!(data % 2)) {
          return Math.floor(data);
        } else {
          return Math.floor(data + 1);
        }
      },
      getDivideStr(str, step) {
        let strArr = [];
        for (let i = 0; i < str.length; i += step) {
          let curStr = str.slice(i, i + step);
          if (curStr) {
            strArr.push(curStr);
          }
        }
        return strArr;
      }
    },
    watch: {
      value(newValue, oldValue) {
        if (newValue !== oldValue) {
          let angles = newValue;
          if (angles > 360) {
            angles %= 360;
          }
          this.movePlate.moveTo = 360 * this.roundNum + angles;
          this.move();
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .canvas-wrap {
    position: relative;
    text-align: center;
    .indicator {
      :before {
        content: "";
        position: absolute;
        left: 50%;
        top: -8px;
        transform: translate(-50%, -50%);
        border-top: 1px solid transparent;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-bottom: 30px solid rgba(221, 21, 24, 1);
      }
      position: absolute;
      top: 50%;
      left: 50%;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: rgba(221, 21, 24, 1);
      .inner {
        flex: 0 0 80%;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        height: 80%;
        border-radius: 50%;
        background: rgba(188, 0, 20, 1);
        p {
          color: rgba(252, 176, 12, 1);
          font-size: 16px;
          font-weight: bolder;
          line-height: 24px;
        }
      }
    }
  }
</style>
