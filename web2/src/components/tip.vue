// 提示框
<style lang="stylus" scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;

    .modal-dialog {
        display: table-cell;
        text-align: center;
        padding-top: 200px;
        animation: movein 0.5s ease-in-out;

        @keyframes movein {
            from {
                padding-top: 150px;
            }

            to {
                padding-top: 200px;
            }
        }

        .modal-content {
            min-width: 400px;
            display: inline-block;
            background-color: #fff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
            transition: all 0.3s ease;
            font-family: Helvetica, Arial, sans-serif;
            border-radius: 0;

            .modal-header {
                min-height: 16.42857143px;
                padding: 15px;
                border-bottom: 1px solid #e5e5e5;
                text-align: left;

                h4 {
                    font-size: 14px;
                    color: #333333;
                    font-weight: bold;
                    margin: 0;
                    line-height: 1.42857143;
                }

                .close {
                    float: right;
                    font-size: 22px;
                    font-weight: bold;
                    line-height: 1;
                    color: #000;
                    text-shadow: 0 1px 0 #fff;
                    opacity: 1;
                    -webkit-appearance: none;
                    padding: 0;
                    cursor: pointer;
                    background: transparent;
                    border: 0;
                    margin-top: -24px;
                    outline: none;

                    &:hover, &:focus {
                        color: #000;
                        text-decoration: none;
                        cursor: pointer;
                        opacity: 0.5;
                    }

                    span {
                        font-weight: 900;
                    }
                }
            }

            .modal-body {
                margin: 30px 36px 32px;
                padding: 0;
                text-align: center;
                color: #092638;
                border-radius: 3px;

                .msg-container {
                    min-height: 60px;
                    text-align: center;
                    color: #092638;
                    margin-top: 20px;
                }
            }

            .modal-footer {
                border: none;
                padding: 0 36px 41px;
                text-align: right;
                margin: 0;

                button {
                    border: 0;
                    outline: 0;
                    padding: 1px 6px 1px 6px;
                    cursor: pointer;
                }

                .btn-gray {
                    margin-right: 10px;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    min-width: 120px;
                    height: 32px;
                    font-family: 'microsoft yahei', sans-serif;
                    font-size: 14px;
                    letter-spacing: 2px;
                    background-color: #ffffff;
                    color: #000000;
                    border: 1px solid #dddddd;

                    &:hover {
                        cursor: pointer;
                        border: 1px solid #007aff;
                    }
                }

                .btn-blue {
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    min-width: 120px;
                    height: 32px;
                    font-family: 'microsoft yahei', sans-serif;
                    font-size: 14px;
                    letter-spacing: 2px;
                    background-color: #007aff;
                    color: #ffffff;

                    &:hover {
                        cursor: pointer;
                        background-color: #1786ff;
                    }
                }
            }
        }
    }
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-content, .modal-leave-active .modal-content {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

@media (min-width: 768px) {
    .modal-content {
        width: 500px;
        margin: 30px auto;
        -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    }

    .modal-sm {
        width: 300px;
    }

    .modal-content-w600 {
        width: 600px;
        margin: 30px auto;
    }
}

@media (min-width: 992px) {
    .modal-lg {
        width: 900px;
    }
}
</style>

<template>
    <transition name="model">
        <div class="modal-mask" v-show="tip.show">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 v-text="tip.head"></h4>
                        <button type="button" class="close" @click="tip.show=false" data-dismiss="modal"><span>×</span></button>
                    </div>
                    <div class="modal-body">
                        <div class="msg-container">
                            <div>
                                <span style="word-break: break-all;" v-html="tip.body"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: "tip",
  data() {
    return {};
  },
  props: {
    tip: {
      type: Object,
      default: {
        show: false,
        head: "标题",
        body: "提示内容",
        cancelBtn: "取消"
      }
    }
  }
};
</script>