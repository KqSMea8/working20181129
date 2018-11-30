<style lang="stylus" scoped>
.modal-mask {
    position: fixed;
    z-index:8888;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: table;
    animation: opac 0.15s linear;
    background-color: rgba(0, 0, 0, 0.5);
    @keyframes opac {
        from {
            background-color: rgba(0, 0, 0, 0);
        }

        to {
            background-color: rgba(0, 0, 0, 0.5);
        }
    }

    .modal-wrapper {
        display: table-cell;
        text-align: center;
        padding-top: 30px;
        animation: moveinD 0.5s ease-out;

        @keyframes moveinD {
            from {
                padding-top: 0px;
            }

            to {
                padding-top: 30px;
            }
        }
        @media (min-width: 768px){
            .modal-content {
                -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
                box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
            }
        }

        .modal-content {
            min-width: 400px;
            display: inline-block;
            background-color: #fff;
            -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
            box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
            transition: all 0.3s ease;
            font-family: Helvetica, Arial, sans-serif;
            border-radius: 3px;
            border: 1px solid rgba(0, 0, 0, .2);
            outline: 0;

            .modal-header {
                min-height: 16.42857143px;
                padding: 15px;
                border-bottom: 1px solid #e5e5e5;
                text-align: left;

                h4 {
                    font-size: 16px;
                    color: #333333;
                    margin: 0;
                    line-height: 1.42857143;
                    font-weight: normal;
                }

                .close {
                    float: right;
                    font-size: 21px;
                    font-weight: bold;
                    line-height: 1;
                    color: #000;
                    text-shadow: 0 1px 0 #fff;
                    -webkit-appearance: none;
                    padding: 0;
                    cursor: pointer;
                    border: 0;
                    background: url('../assets/image/modal_close.png') no-repeat;
                    height: 17px;
                    width: 18px;
                    opacity: 1;
                    margin-top: -19px;
                    outline: 0;
                }
            }

            .modal-body {
                margin: 30px 36px 32px 0;
                padding: 0;
                text-align: left;
                color: #092638;
                border-radius: 3px;
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

                .btn {
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    min-width: 120px;
                    height: 32px;
                    font-family: 'microsoft yahei', sans-serif;
                    font-size: 14px;
                    letter-spacing: 2px;
                    background-color: #007aff;
                    color: #ffffff;

                    &.btn-blue:hover {
                        cursor: pointer;
                        background-color: #1786ff;
                    }
                }

                .btn-disable {
                    background-color: #eeeeee;
                    color: #bbbbbb;
                    cursor: not-allowed;
                }
                .power-submit-btn:disabled {
                    background-color: #eeeeee;
                    color: #bbbbbb;
                    cursor: not-allowed;
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

// 不同宽度
.modal-mask {
    .modal-content.w600 {
        width: 600px;
    }

    .modal-content.w650 {
        width: 650px;
    }

    .modal-content.w700 {
        width: 700px;
    }

    .modal-content.w772 {
        width: 772px;
    }

    .modal-content.w750 {
        width: 750px;
    }

    .modal-content.w900 {
        width: 900px;
    }

    .modal-content.w1000 {
        width: 1000px;
    }

    .modal-content.w464 {
        width: 464px;
    }
    
    .modal-content.mh401 {
        max-height: 401px;
    }

    .modal-content.mh201 {
        max-height: 201px;
    }

    .modal-content.mh202 {
        max-height: 202px;
    }

    .modal-content.mh101 {
        max-height: 101px;
    }
}
</style>

<template>
    <transition name="model">
        <div class="modal-mask" v-if="show"> 
            <div class="modal-wrapper">
                <div class="modal-content" :class="'w'+ width +' h'+height">
                    <div class="modal-header">
                        <h4 v-text="dialog.head"></h4>
                        <button type="button" class="close" @click="$emit('cancel-btn')"></button>
                    </div>
                    <div class="modal-body">
                        <slot name="body">default body</slot>
                    </div>
                    <div class="modal-footer" v-if="dialog.footer"> 
                        <button v-if="dialog.cancelBtnShow" class="btn-gray" @click="$emit('cancel-btn')">{{dialog.cancelBtn}}</button>
                        <button class="btn" :class="confim ? 'btn-disable':'btn-blue'" :disabled="confim" @click="$emit('confirm-btn')">{{dialog.confirmBtn}}</button>
                    </div>
                </div>
            </div> 
        </div>
    </transition>
</template>

<script>
export default {
  name: "model",
  data() {
    return {};
  },
  props: {
    dialog: {
      type: Object,
      default: {
        show: false,
        footer: true,
        head: "title",
        cancelBtn: "取消",
        confirmBtn: "创建",
        cancelBtnShow:true
      }
    },
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 200
    },
    confim: {
      type: Boolean,
      default: true
    }
  }
};
</script>