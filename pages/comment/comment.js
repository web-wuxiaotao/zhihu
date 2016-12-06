var utils=require('../../utils/news.js');
Page({
  data:{
    
  },
  onLoad:function(options){
    this.setData({
      id:options.id
    })
  },
  onReady:function(){
    var self=this;
    wx.request({
      url:"http://news-at.zhihu.com/api/4/story/"+this.data.id+"/long-comments",
      success:function(r){
        self.setData({
          long:utils.formatArr(r.data.comments)
        })
      }
    });
    wx.request({
      url:"http://news-at.zhihu.com/api/4/story/"+this.data.id+"/short-comments",
      success:function(r){
        self.setData({
          short:utils.formatArr(r.data.comments)
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