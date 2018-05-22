<template>
 
    <div class="goods">
     <div class="menu-wapper" ref="menuWrapper">
     	<ul>
     		<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
     			<span class="text">
     				<classmap v-show="item.type>0" :index="item.type"></classmap>
     				{{item.name}}</span>
     			
     		</li>
     	</ul>
     </div>
     <div class="foods-wapper" ref="foodsWrapper">
     	<ul>
     		<li v-for="items in goods" class="food-list" ref="foodlist">
     			<h1 class="title">{{items.name}}</h1>
     			<ul>
     			<li v-for="food in items.foods" class="food-item border-1px" @click="selectFood(food,$event)">
     				<div class="icon">
     					<img :src="food.icon">
     				</div>
     				<div class="content">
     					<h2 class="name">{{food.name}}</h2>
     					<p class="desc">{{food.description}}</p>
     					<div class="extra">
     						<span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>

     					</div>
     					<div class="price">
     						<div class="now">￥{{food.price}}</div><div class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</div>
     					</div>
              <div class="cartwapper">
              <cartcontrol :food="food" @add="addFood"></cartcontrol>
              </div>
     				</div>
     			</li>
     			</ul>
     		</li>
     	</ul>
     </div>
     <shopcart :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :selectFoods="selectFoods" ref="shopcart"></shopcart>
     <Food ref="food" :food="selectedFood"></Food>
	</div>
   
  
</template>

<script>
import classmap from '../classmap/classmap'
import 	BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import Food from '../food/food'
const err_ok=0
export default {
	props:{
		seller:{
			type:Object
		}
	},
	components:{
		classmap,
		shopcart,
    cartcontrol,
	Food
	},
   data(){
  	return{
  		goods:[],
  		scrollY:0,
  		listHeight:[],
		selectedFood:{}
  	}
  },
  computed:{
  	currentIndex(){
  		for(let i=0;i<this.listHeight.length;i++){
  			if(!this.listHeight[i+1]||(this.scrollY>=this.listHeight[i]&&this.scrollY<this.listHeight[i+1])){

  					return i;
  			}

  		}
  		 return 0;
  	},
    selectFoods(){
      let foods=[];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
           if(food.count){
          foods.push(food)
        }
        })
      })
      return foods;
    }
  },
  created(){
     evenBus.$on('seller',this.setseller)
  	this.$http.get('/api/goods').then((response)=>{
  		response=response.body
  		//console.log(this)
  		if(response.errno===err_ok){

  			this.goods=response.data
  			this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
  		}
  	})
    
  },
  methods:{
  	_initScroll(){
  		this.menuScroll= new BScroll(this.$refs.menuWrapper,{
  			click:true
  		});
  		this.foodScroll= new BScroll(this.$refs.foodsWrapper,{
        click:true,
  			probeType: 3
  		});
  		this.foodScroll.on('scroll',(pos)=>{  //pos.y获取当前滚动的坐标，向上滚动为负值
		 // console.log(pos.y);
  			if(pos.y<=0){
  				this.scrollY=Math.abs(Math.round(pos.y));
				
  			}
  		})
  	},
  	_calculateHeight() {
  		let foodList=this.$refs.foodlist;
  		let height=0
  		this.listHeight.push(height)
  		for(let i=0;i<foodList.length;i++){
  			let fooditem=foodList[i]
  			height+=fooditem.clientHeight
  			this.listHeight.push(height)

  		}
  		
  	},
	selectFood(food,event){
		if(!event._constructed){  //针对bscrooll,当$event._constructed存在时,则为自己派发的属性。pc端的点击事件会执行两次，有一次是浏览器的默认事件，因此我们要通过该方法阻止默认事件。
  			return;
  		}
		this.selectedFood=food;
		console.log(this.$refs.food);
		this.$refs.food.show();
	},
  	selectMenu(index,event){
  		
  		if(!event._constructed){  //针对bscrooll,当$event._constructed存在时,则为自己派发的属性。pc端的点击事件会执行两次，有一次是浏览器的默认事件，因此我们要通过该方法阻止默认事件。
  			return;
  		}
  		let foodlist=this.$refs.foodlist
  		let el=foodlist[index]
  		this.foodScroll.scrollToElement(el, 300)
  	},
    // setseller(seller){
    //   console.log(seller);
    //   this.seller=seller;

    // },
    addFood(target){
        this._drop(target);
    },
    _drop(el){
      this.$refs.shopcart.drop(el);
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.cartwapper
  display:inline-block
  position:absolute
  right:0
  bottom:12px

.goods
	display:flex
	position:absolute
	top:174px
	bottom:46px
	width:100%
	overflow:hidden
	.menu-wapper
		flex:0 0 80px
		width: 80px
		background: #f3f5f7
		.menu-item
			display:table
			width: 54px
			height:56px
			line-height:14px
			padding:0 12px
			&.current
				position:relative
				margin-top:-1px
				z-index:10
				background:#fff
				font-weight:700
				.text
					border-none()
			.text
				display:table-cell
				width:56px
				vertical-align:middle
				font-size:12px
				text-align:center
				border-1px(rgba(7,17,27,0.1))
	.foods-wapper
		flex:1
		.title
			height:26px
			line-height:26px
			padding-left:14px
			border-left:2px solid #d9dde1
			background:#f3f5f7
			font-size:12px
			color:rgb(147,153,159)
		.food-item
			display:flex
			margin:18px
			padding-bottom:18px
			border-1px(rgba(7,17,27,0.1))
			&:last-child
				border-none()
				margin-bottom: 0
			.icon
				flex:0 0 57px
				margin-right:10px
			.content
				flex:1
				.name
					font-size:14px
					color:rgb(7,17,27)
					line-height:14px
					margin:2px 0 8px 0
					
				.desc,.extra
					font-size:10px
					line-height:10px
					color:rgb(147,153,159)
				.desc
					margin-bottom:8px	
					line-height:12px
				.extra
					.count
						margin-right:12px
				.price
					font-weight:700
					line-height:24px
          display:inline-block
					.now
						font-size:14px
						color:rgb(240,20,20)
						margin-right:8px
					.old
						text-decoration: line-through
						font-size:10px
						color:rgb(147,153,159)
  </style>
