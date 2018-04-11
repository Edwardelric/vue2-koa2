<template>
  <div class="canvas-wrap" :class="canvasWrapClassName" ref="canvasWrap">
    <canvas id="canvas" class="canvas "ref="canvasDom">您当前的版本不支持canvas功能</canvas>
    <div class="indicator" ref="indicator" :class="indicatorClassName" @click="startMove">
      <div class="inner">
        <slot name="txt">
          <p>开始<br/>抽奖</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Array,
        required: true
      },
      width: {
        type: String,
        default: "",
        required: false
      },
      animateType: {
        type: String,
        required: false
      },
      ajaxParams: {
        type: Object,
        required: false
      },
      canvasWrapClassName: {
        type: String,
        required: false
      },
      indicatorClassName: {
        type: String,
        required: false
      },
      textColor: {
        type: String,
        required: false
      },
      initCompleted: {
        type: Function,
        required: false
      },
      startMoveFn: {
        type: Function,
        required: false
      },
      ajaxCompleted: {
        type: Function,
        required: false
      },
      movingFn: {
        type: Function,
        required: false
      },
      endMoveFn: {
        type: Function,
        required: false
      }
    },
    data() {
      return {
        typeFn: null,                   // 运动类型名
        canvasWrap: null,               // canvas 父级节点
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
          angleTo: 0,
          duration: 8000,
          timer: null,
          moveTo: 360 * 10              // 移动到什么地方
        },
        tween: {                        // 运动库对象
          linear(t, b, c, d) {
            return c * t / d + b;
          },
          easeOut(t, b, c, d) {
            return -c *(t /= d)*(t-2) + b;
          },
          easeSlowOut(t, i, e, s, h) {
            return -s * ((i = i / h - 1) * i * i * i - 1) + e;
          }
        },
        pageDebug: true
      };
    },
    created() {
      if (!this.isArray(this.data)) {
        // 数据不是数组类型的则报错停止执行
        this.log("data type should be Array");
        return false;
      } else if (360 % this.data.length) {
        this.log("data can be divided for 360")
        return false;
      }
      this.canvasData.divideAngle = 360 / this.data.length;
      this.typeFn = this.tween[this.animateType] ? this.tween[this.animateType] : this.tween["easeOut"];
    },
    mounted() {
      this.canvasWrap = this.$refs.canvasWrap;
      this.canvasDom = this.$refs.canvasDom;
      this.indicator = this.$refs.indicator;
      this.init();
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
        let winWidth = document.documentElement.clientWidth || document.body.clientWidth;
        let canvasData = this.canvasData;
        let canvasWidth = null;

        if (this.width) {
          canvasWidth = canvasData.canvasWidth = this.formatToEven(this.width);
        } else if (this.className) {
          canvasWidth = canvasData.canvasWidth = this.formatToEven(this.canvasWrap.offsetHeight <= this.canvasWrap.offsetWidth ? this.canvasWrap.offsetHeight : this.canvasWrap.offsetWidth);
        } else {
          canvasWidth = canvasData.canvasWidth = this.formatToEven(winWidth * 0.8);
        }
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
          // 扇形(角度算法)
//          let angle =  i * this.canvasData.divideAngle * Math.PI / 180;
//          let arc = this.canvasData.divideAngle * Math.PI / 180
//          ctx.fillStyle = item.color ? item.color : ((i % 2) ? "#FFFFFF" : "#FFF4D6");
//          ctx.beginPath();
//          ctx.arc(0, 0, outerRadius, angle, angle + arc, false);
//          ctx.arc(0, 0, innerRadius, angle + arc, angle, true);
//          ctx.fill();
//          // 文字位置
//          ctx.save();
//          ctx.translate(Math.cos(angle + arc / 2) * txtRadius, Math.sin(angle + arc / 2) * txtRadius);
//          ctx.fillStyle = this.textColor ? this.textColor : this.canvasData.defaultTxtColor;
//          ctx.rotate(angle + arc / 2 + Math.PI / 2);
//          ctx.fillText(item.txt, -ctx.measureText(item.txt).width / 2, 0);
//          ctx.restore();
        });
        if (this.initCompleted) {
          this.initCompleted.call(this, "");
        } else {
          this.$emit("initCompleted", "");
        }
      },
      startMove() {
        let movePlate = this.movePlate;
        if (movePlate.isMoving) {
          return false;
        }
        if (this.startMoveFn) {
          this.startMoveFn.call(this, "");
        } else {
          this.$emit("startMoveFn", "");
        }
        let ajaxCb = (res, flag) => {
          let random = this.randomIndex(1, this.data.length);
          if (flag) {
            random = this.data.length;
          }
          let angles =  random * this.canvasData.divideAngle - this.canvasData.divideAngle / 2;
          if (angles < 270) {
            angles = 270 - angles;
          } else {
            angles = 360 - (angles - 270);
          }
          this.movePlate.moveTo = this.movePlate.moveTo + angles;
          if (this.ajaxCompleted) {
            this.ajaxCompleted.call(this, angles);
          } else {
            this.$emit("ajaxCompleted", "");
          }
        };
        this.ajaxFn(this.ajaxParams, ajaxCb);
        cancelAnimationFrame(movePlate.timer);
        movePlate.timer = requestAnimationFrame(this.move);
      },
      move() {
        let movePlate = this.movePlate;
        // b为初始值， c 为需要移动到的位置， d 为所需最终时间, t 开始时间
        let b = 0, c = 360 * 10, d = movePlate.duration;
        let t = movePlate.angleTo;
        let val = this.typeFn(t, b, this.movePlate.moveTo > c?this.movePlate.moveTo:c, d);
        let intNum = 0;
        movePlate.isMoving = true;
        movePlate.angleTo += 20;
        if (t <= d) {
          if (val > 360) {
            intNum = Math.floor(val / 360);
            val = Math.floor(val - 360 * intNum);
          } else {
            val = Math.floor(val);
          }
          if (this.movingFn) {
            this.movingFn.call(this, "");
          } else {
            this.$emit("movingFn", "");
          }
          this.canvasDom.style.webkitTransform = `rotate(${val}deg)`;
          movePlate.timer = requestAnimationFrame(this.move);
        } else {
          cancelAnimationFrame(movePlate.timer);
          movePlate.moveTo = 360 * 10;
          movePlate.angleTo = 0;
          movePlate.isMoving = false;
          if (this.endMoveFn) {
            this.endMoveFn.call(this, "");
          } else {
            this.$emit("endMoveFn", "");
          }
        }
      },
      randomIndex(n, m) {
        let c = m - n + 1;
        return Math.floor(Math.random() * c + n);
      },
      ajaxFn(ajaxOptions, fn) {
        let startTime = +new Date();
        let xmlHttp = null;
        let ajaxMethod = ajaxOptions.method;
        let url = ajaxOptions.url;
        if (XMLHttpRequest) {
          xmlHttp = new XMLHttpRequest();
        } else {
          xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlHttp.open(ajaxMethod, ajaxOptions.url, true);
        if (ajaxMethod.toLowerCase() === "post") {
          let params = [];
          for (let key in ajaxOptions.data){
            params.push(key + '=' + ajaxOptions.data[key]);
          }
          xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
          xmlHttp.send(params.join('&'));
        } else {
          xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = () => {
          let endTime = +new Date();
          if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            let spaceTime = Math.floor((endTime - startTime) / 1000);
            if (spaceTime <= this.movePlate.duration / 1000) {
              fn.call(this, xmlHttp.responseText, false);
            } else {
              fn.call(this, xmlHttp.responseText, true);
            }
          } else if (xmlHttp.readyState === 4 && xmlHttp.status != 200){
            fn.call(this, xmlHttp.responseText, true);
            this.movePlate.isMoving = false;
          }
        }
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
      },
      isArray(obj) {
        let _toString = Object.prototype.toString;
        return _toString.call(obj).slice(8, -1) === "Array";
      },
      log(txt) {
        if (this.pageDebug) {
          console.log(txt);
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
