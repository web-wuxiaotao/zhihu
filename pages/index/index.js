var utils=require('../../utils/news.js');
var animation=require('../../utils/animation.js');
var date=new Date();
var flag=true;
Page({
  data:{
    tops:[],
    lists:[],
    themes:[],
    ani:{},
    fade:{},
    active:false,
    interval: 5000,
    duration: 1000,
    autoplay: true
  },
  setFade:function () {
    var fadeout=wx.createAnimation({
      duration:1000,
      timingFunction:"ease",
      delay:2000
    });
    fadeout.opacity(0).scale(0,0).step()
    this.setData({
      fade:fadeout.export()
    })
  },
  tapButton:function(){
    if(!this.data.active){
      this.setData({
        ani:animation.getAni('slideout'),
        active:true
      })
    }else{
      this.setData({
        ani:animation.getAni('slidein'),
        active:false
      })
    }
  },
  mask:function(){
    //slidein.translate3d(-500,0,0).step();
    this.setData({
      ani:animation.getAni('slidein'),
      active:false
    })
  },
  tap:function(e){
    var id= e.currentTarget.dataset.id;
    var title= e.currentTarget.dataset.title;
    wx.showActionSheet({
      itemList:['分享','阅读'],
      success:function(e){
        if(e.tapIndex===0){
          wx.showModal({
            title:'分享',
            content:'..'
          })
        }else if(e.tapIndex===1){
          wx.navigateTo({
            url:'/pages/show/show?id='+id+'&title='+title
          })
        }
      }
    })
  },
  onReachBottom:function(){
    var s=utils.formatDate(date);
    var url="http://news.at.zhihu.com/api/4/news/before/"+s;
    var self=this;
    if(flag){
      flag=false;
      wx.showToast({
        title:'加载中...',
        icon:'loading',
        duration:5000
      });
      wx.request({
        url:url,
        success:function(r){
          flag=true;
          wx.hideToast();
          date=utils.before(date);
          var k=self.data.lists.concat(utils.formatArr(r.data.stories));
          self.setData({
            lists:k
          })
        }
      })
    };
  },
  onLoad:function(options){

  },
  onReady:function(){
    var self=this;
    wx.request({
      url:"http://news-at.zhihu.com/api/4/start-image/1080*1776",
      success:function (r) {
        self.setData({
          startImage:utils.format(r.data.img)
        })
      }
    });
    wx.showToast({
      title:'加载中...',
      icon:'loading',
      duration:5000
    });
    wx.request({
      url:'http://news-at.zhihu.com/api/4/themes',
      success:function(r){
        self.setData({
          themes: r.data.others
        })
      }
    });
    wx.request({
      url:'http://news-at.zhihu.com/api/4/news/latest',
      success:function(r){
        wx.hideToast();
        var t= utils.formatArr(r.data.top_stories);
        var n= utils.formatArr(r.data.stories);
        self.setData({
          tops: t,
          lists: n
        })
      }
    })
  },
  onShow:function(){

  },
  onHide:function(){

  },
  onUnload:function(){

  }


})