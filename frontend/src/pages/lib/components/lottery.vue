<template>
    <div class="lottery-wrapper">
        <Lottery v-model="angle">
            <ul>
                <li v-for="(item, index) in rewardData" :key="index">
                    <p>{{item.txt}}</p>
                    <!-- <img :src="item.rewardUrl" /> -->
                </li>
            </ul>
        </Lottery>
        <p style="height:1px;background:red;"></p>
    </div>
</template>

<script type="text/ecmascript-6">
    import Lottery from "@/components/ed-lottery/index.vue";
    export default {
        data() {
            return {
                rewardData: [
                    {
                        id: 0,
                        txt: "new0一等奖一等奖一等奖一等奖一等奖",
                        rewardUrl: 'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1663490295.jpg'
                    }, {
                        id: 1,
                        txt: "new1猫币",
                        rewardUrl: 'https://images2018.cnblogs.com/blog/1328957/201802/1328957-20180224202017104-1842421338.png'
                    }, {
                        id: 2,
                        txt: "2谢谢参与",
                        rewardUrl: 'https://images2018.cnblogs.com/blog/1328957/201802/1328957-20180224202017104-1842421338.png'
                    }, {
                        id: 3,
                        txt: "3猫币",
                        rewardUrl: 'https://images2018.cnblogs.com/blog/1328957/201802/1328957-20180224202017104-1842421338.png'
                    }, {
                        id: 4,
                        txt: "4元免费流量包",
                        rewardUrl: 'https://images2018.cnblogs.com/blog/1328957/201802/1328957-20180224202017104-1842421338.png'
                    }, {
                        id: 5,
                        txt: "5元免费流量包"
                    }, {
                        id: 6,
                        txt: "6猫币"
                    }, {
                        id: 7,
                        txt: "7元免费流量&lt;br\/&gt;包",
                        rewardUrl: 'https://images2018.cnblogs.com/blog/1328957/201802/1328957-20180224202017104-1842421338.png'
                    }
                ],
                rotateNum: 0,
                angle: 36,
                options: {
                    useCanvasDraw: true,
                    data: [{
                            id: 0,
                            txt: "new0一等奖一等奖一等奖一等奖一等奖",
                            rewardUrl: 'https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1663490295.jpg'
                        },
                        {
                            id: 1,
                            txt: "new1猫币",
                            rewardUrl: 'https://images2018.cnblogs.com/blog/1328957/201802/1328957-20180224202017104-1842421338.png'
                        },
                        {
                            id: 2,
                            txt: "2谢谢参与",
                            rewardUrl: 'https://images2018.cnblogs.com/blog/1328957/201802/1328957-20180224202017104-1842421338.png'
                        },
                        {
                            id: 3,
                            txt: "3猫币",
                            rewardUrl: 'https://images2018.cnblogs.com/blog/1328957/201802/1328957-20180224202017104-1842421338.png'
                        },
                        {
                            id: 4,
                            txt: "4元免费流量包",
                            rewardUrl: 'https://images2018.cnblogs.com/blog/1328957/201802/1328957-20180224202017104-1842421338.png'
                        },
                        {
                            id: 5,
                            txt: "5元免费流量包"
                        },
                        {
                            id: 6,
                            txt: "6猫币"
                        },
                        {
                            id: 7,
                            txt: "7元免费流量&lt;br\/&gt;包",
                            rewardUrl: 'https://images2018.cnblogs.com/blog/1328957/201802/1328957-20180224202017104-1842421338.png'
                        }
                    ],
                    fontSize: 20,
                    textColor: '#E5302F',
                    maxChanceNum: 4,
                    animateType: 'easeOut',
                    duration: 1000,
                    durationStep: 20, // 旋转递增时间步数
                    roundNum: 1, // 旋转的圈数
                    txtOffset: 30,
                    rewardOffset: 30,
                    canvasWrapClassName: 'canvasWrap',
                    indicatorClassName: 'indicator',
                    indicatorDisabled: 'indicatorDisabled'
                }
            };
        },
        mounted() {
            //      this.$ajax.post('https://www.easy-mock.com/mock/592e626b91470c0ac1fed9b6/products_1496212075258/moneylist#!method=post').then(res => {
            //
            //      }).catch(err => {
            //
            //      }).finally(() => {
            //        setTimeout(() => {
            //
            //
            //        this.options.data = [
            //          {
            //            id: 0,
            //            txt: "new0一等奖一等奖一等奖一等奖一等奖"
            //          },
            //          {
            //            id: 1,
            //            txt: "new1猫币"
            //          },
            //          {
            //            id: 2,
            //            txt: "2谢谢参与"
            //          },
            //          {
            //            id: 3,
            //            txt: "3猫币"
            //          },
            //          {
            //            id: 4,
            //            txt: "4元免费流量包"
            //          },
            //          {
            //            id: 5,
            //            txt: "5元免费流量包"
            //          },
            //          {
            //            id: 6,
            //            txt: "6猫币"
            //          },
            //          {
            //            id: 7,
            //            txt: "7元免费流量包"
            //          },
            //          {
            //            id: 8,
            //            txt: "6猫币"
            //          },
            //          {
            //            id: 9,
            //            txt: "7元免费流量包"
            //          }
            //        ]
            //        }, 4000);
            //      })
        },
        components: {
            Lottery
        },
        methods: {
            changeValueHandler(data) {
                this.options.maxChanceNum -= 1;
                this.rotateNum += 1;
                this.angle = this.angle + (this.rotateNum * 360) + 36;
                console.log(this.angle);
            },
            animateFinishedHandler(index) {
                console.log(index);
            }
        }
    };
</script>

<style lang="scss">
    .canvasWrap {
        margin: 0 20px;
    }
    .indicator {
        width: 92px;
        height: 92px;
    }
    .reward-img {
        position: relative;
        width: 100%;
        img {
            width: 100%;
        }
        .txt-desc {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 999;
            width: 60px;
            transform: translate(-50%, -50%);
            background: #ccc;
            line-height: 20px;
        }
    }
</style>
