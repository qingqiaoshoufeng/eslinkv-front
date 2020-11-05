<template>
	<div class="widget-part pos-r" :style="styles">
		<div class="video-box">
			<div class="left" >
                <!-- <div class="video" 
                    :style="{backgroundImage:'url('+ data&&data.imgList[data.activeIndex].img +')'}">
                    {{data.imgList[data.activeIndex].img}}
                </div> -->
                <img class="video" :src="data&&data.imgList[data.activeIndex].img" alt="">
            </div>
			<div class="right">
				<div class="swiper-box">
					<div class="swiper-container gallery-thumbs getWidth">
						<div class="swiper-wrapper setWidth">
							<div
								class="swiper-slide"
								v-for="(item,index) in data&&data.imgList"
								:key="index"
								:style="{backgroundImage:'url('+item.img+')'}"
							></div>
						</div>
                        <div class="swiper-pagination">

                        </div>
					</div>			
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import mixins from '../../mixins';
const config = { animation: true };
const value = {
	api: {
		data: JSON.stringify({
            // title: '数量',
            
            activeIndex: 0,
			imgList: [
				{
					img: '/static/images/project/01.png',
				},
				{
					img: '/static/images/project/02.jpg',
				},
				{
					img: '/static/images/project/03.jpg',
				},
				{
					img: '/static/images/project/04.jpg',
				},
			],
		}),
	},
};
export default {
	mixins: [mixins],
	methods: {
        
    },
    data(){
        return {
            galleryThumbs:null,
        }
    },
	created() {
		this.configSource = this.parseConfigSource(config);
		this.configValue = this.parseConfigValue(config, value);
	},
	mounted() {
        let _this = this
		this.galleryThumbs = new Swiper('.gallery-thumbs', {
			direction: 'vertical',
			spaceBetween: 24,
			slidesPerView: 4,
			// freeMode: true,
			observer: true,
			observeParents: true,
			loop: true,
            autoplay: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    // console.log(index)
                return '<span class="' + className + '"></span>';
            },
            on:{
                slideChange: function(){
                     console.log('yuuuuuu')
                //    alert('改变了，activeIndex为'+this.activeIndex);
                //    _this.data.activeIndex = this.activeIndex
                //    _this.$forceUpdate()
                },
                slideChangeTransitionEnd: function(){
                    console.log(1111)
                    // alert(this.activeIndex);//切换结束时，告诉我现在是第几个slide
                },
            },
		  },
        });
        console.log(this.galleryThumbs);
        this.$nextTick(()=>{
            // console.log(this.galleryThumbs)
        })
        // console.log(this.galleryThumbs[0].onSlideToWrapperTransitionEnd)
        
        // this.galleryThumbs.onSlideToWrapperTransitionEnd(e,e1,e2){
        //     console.log(e,e1,e2);
        // };
	},
};
</script>
<style lang="scss">
.video-box {
	display: flex;
	.left {
		height: 838px;
		width: 1488px;
        background-image: url('/static/images/project/video-bg.png');
        .video{
            margin-top: 40px;
            width: 1352px;
            height: 760px;
        }
	}
	.right {
		margin-left: 40px;
		height: 835px;
		width: 420px;
		.swiper-box {
			width: 380px;
			height: 100%;
			display: flex;
			.swiper-container {
                height: 100%;
                width: 100%;
				// --swiper-theme-color: #ff6600;
                --swiper-pagination-color: #00ff33; /* 两种都可以 */
                .swiper-slide{
                    width: 341px;
                }
                .swiper-pagination{
                    display: flex;
                    background: #00217D;
                    height: 839px;
                    width: 4px;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    margin-left: 60px;
                    position: absolute;
                    right: 11px;
                    span{
                        height: 20px;
                        width: 20px;
                    }
                    .swiper-pagination-bullet{
                        height: 0;
                        width: 0;
                    }
                    .swiper-pagination-bullet-active{
                        height: 26px;
                        width: 26px;
                        background: #00ddff;
                        border:7px solid #067CAC
                    }
                }
                
			}
        }
        
		.pagination {
			width: 26px;
			height: 100%;
			position: relative;
			.line {
				width: 4px;
				background-color: #00217d;
			}
		}
	}
}
</style>

