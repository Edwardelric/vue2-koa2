<template>
    <div class="canvas-lottery" ref="canvasLottery">
        <canvas id="canvas" class="canvas" ref="canvasDom">您当前的版本不支持canvas功能</canvas>
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import {
        Tween
    } from '../utils/index.js';
    export default {
        name: 'EdLottery',
        props: {
            value: {
                type: Number,
                default: 0
            },
            useCanvas: {
                type: Boolean,
                default: true
            },
            radiusRate: {
                type: Number,
                default: 3
            },
            txtOffset: {
                type: Number,
                default: 40
            },
            textColor: {
                type: String,
                default: '#E5302F'
            },
            oddPlateColor: {
                type: String,
                default: '#fff'
            },
            evenPlateColor: {
                type: String,
                default: '#FFF4D6'
            },
            animateType: {
                type: String,
                default: 'easeOut'
            }
        },
        data() {
            return {
                lotteryList: [],
                lotteryTxt: [],
                canvasDom: null,    // canvas dom节点
                canvasOpts: {
                    ctx: null,
                    canvasWidth: 0, // canvas宽度
                    divideAngle: 0, // 等分角度
                    outerRadius: 0, // 外层园半径
                    innerRadius: 0, // 内层园半径
                    txtRadius: 0,   // 文字半径位置
                    dpiRate: 1,
                    defaultTxtColor: '#E5302F' // 文字默认颜色
                },
                movePlate: {
                    isMoving: false, // 是否在运动
                    durationStep: 0,
                    timer: null,
                    moveTo: 360 * this.roundNum // 移动到什么地方
                },
                curMaxChanceNum: this.maxChanceNum
            };
        },
        mounted() {
            this.$nextTick(() => {
                this.lotteryList = this.$slots.default[0].children.map((item, index) => {
                    return item.elm.innerHTML;
                });
                if (360 % this.lotteryList.length) {
                    console.error('Not divisible by 360');
                    return false;
                }
                this.canvasOpts.divideAngle = 360 / this.lotteryList.length;
                this.tweenFn = Tween.Quad[this.animateType] ? Tween.Quad[this.animateType] : Tween.Quad['easeOut'];
                this.canvasLottery = this.$refs.canvasLottery;
                this.canvasDom = this.$refs.canvasDom;
                this.init();
            });
            // this.indicator = this.$refs.indicator;
        },
        methods: {
            init() {
                let ctx = this.canvasOpts.ctx = this.canvasDom.getContext("2d");
                let devicePixelRatio = window.devicePixelRatio || 1;
                let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                    ctx.mozBackingStorePixelRatio ||
                    ctx.msBackingStorePixelRatio ||
                    ctx.oBackingStorePixelRatio ||
                    ctx.backingStorePixelRatio || 1;
                this.canvasOpts.dpiRate = devicePixelRatio / backingStoreRatio;
                this.setWidth();  
                this.setLotteryTxt();
                this.drawPlate();
            },
            setWidth() {
                let canvasWidth = this.canvasOpts.canvasWidth = this.formatToEven(this.$el.offsetWidth);
                this.canvasDom.width = canvasWidth * this.canvasOpts.dpiRate;
                this.canvasDom.height = canvasWidth * this.canvasOpts.dpiRate;
                this.canvasDom.style.width = canvasWidth + 'px';
                this.canvasDom.style.height = canvasWidth + 'px';
            },
            setLotteryTxt() {
                this.lotteryTxt = this.lotteryList.map((item, index) => {
                    console.log(item);
                    let img = new Image();
                    let svgData = `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='100%' height='100%'><foreignObject width='100%' height='100%'><div>${item}</div></foreignObject> </svg>`;
                    img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgData)));
                    return img;
                });
            },
            drawPlate() {
                let canvasOpts = this.canvasOpts;
                let outerRadius = canvasOpts.outerRadius = canvasOpts.canvasWidth / 2;
                let innerRadius = canvasOpts.innerRadius = Math.floor(outerRadius / this.radiusRate);
                let txtRadius = canvasOpts.txtRadius = outerRadius - this.txtOffset;
                let arc = Math.PI * 2 / this.lotteryList.length;
                let ctx = this.canvasOpts.ctx;
                ctx.scale(this.canvasOpts.dpiRate, this.canvasOpts.dpiRate);
                ctx.translate(canvasOpts.canvasWidth / 2, canvasOpts.canvasWidth / 2);
                ctx.strokeStyle = 'transparent';
                this.lotteryList.forEach((item, index) => {
                    let angle = index * arc;
                    let txt = item.txt;
                    ctx.fillStyle = item.color ? item.color : ((index % 2) ? this.oddPlateColor : this.evenPlateColor);
                    ctx.beginPath();
                    ctx.arc(0, 0, outerRadius, angle, angle + arc, false);
                    ctx.arc(0, 0, innerRadius, angle + arc, angle, true);
                    ctx.fill();
                    ctx.save();
                    ctx.fillStyle = this.textColor ? this.textColor : this.canvasOpts.defaultTxtColor;
                    ctx.translate(Math.cos(angle + arc / 2) * txtRadius, Math.sin(angle + arc / 2) * txtRadius);
                    ctx.rotate(angle + arc / 2 + Math.PI / 2);
                    console.log(this.lotteryTxt[index]);
                    ctx.drawImage(this.lotteryTxt[index], 0, 0);
                    ctx.restore();
                    // 文字位置
                    // ctx.save();
                    // ctx.fillStyle = this.textColor ? this.textColor : this.canvasOpts.defaultTxtColor;
                    // ctx.translate(Math.cos(angle + arc / 2) * txtRadius, Math.sin(angle + arc / 2) * txtRadius);
                    // ctx.rotate(angle + arc / 2 + Math.PI / 2);
                    // if (txt.length > 6) {
                    //     let texts = this.getDivideStr(txt, 6);
                    //     ctx.font = "12px Microsoft YaHei";
                    //     texts.forEach((subItem, subIndex) => {
                    //         ctx.fillText(subItem, -ctx.measureText(subItem).width / 2, subIndex * line_height)
                    //     });
                    // } else {
                    //     ctx.rotate(Math.PI);
                    //     ctx.font = `${this.fontSize}px Microsoft YaHei`;
                    //     ctx.fillText(txt, -ctx.measureText(item.txt).width / 2, 0);
                    // }
                    // ctx.restore();
                    // ctx.save();
                    // ctx.translate(Math.cos(angle + arc / 2) * txtRadius, Math.sin(angle + arc / 2) * txtRadius);
                    // ctx.rotate(angle + arc / 2 + Math.PI / 2);
                    // if (this.recordImg[i]) {
                    //     ctx.drawImage(
                    //         this.recordImg[i], -Math.min(34, this.recordImg[i].width) / 2,
                    //         this.rewardOffset,
                    //         Math.min(34, this.recordImg[i].width),
                    //         Math.min(20, this.recordImg[i].height)
                    //     );
                    // }
                    // ctx.restore();
                });
            },
            formatToEven(width) {            
                // 宽度偶数处理
                if (!(width % 2)) {
                    return Math.floor(width);
                } else {
                    return Math.floor(width + 1);
                }
            }
        },
        computed: {
            style() {
                return {
                    width: `${this.canvasOpts.canvasWidth}px`,
                    height: `${this.canvasOpts.canvasWidth}px`
                }
            }
        },
        watch: {
            value(newVal, oldVal) {
                if (newVal !== oldVal) {
                    let angles = newVal;
                    if (angles > 360) {
                        angles %= 360;
                    }
                    this.movePlate.moveTo = 360 * this.roundNum + angles;
                    this.move();
                }
            },
            data(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.init();
                }
            }
        }
    };
</script>

<style lang="scss">
    .canvas-lottery {
         
    }
</style>
