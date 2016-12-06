var utils=require('../../utils/news.js');
Page({
  data:{
     datas:''
  },
  onLoad:function(e){
    this.setData({
      title: e.title,
      id: e.id
    })
  },
  onReady:function(){
    var self=this;
    wx.setNavigationBarTitle({
      title:this.data.title
    });
    wx.showToast({
      title:'加载中...',
      icon:'loading',
      duration:5000
    });
    wx.request({
      url:'http://news-at.zhihu.com/api/4/theme/'+ this.data.id,
      success:function(r){
        wx.hideToast();
        r.data.background=utils.format(r.data.background);
        r.data.stories=utils.formatArr(r.data.stories);
        r.data.editors=utils.formatArr(r.data.editors);
        self.setData({
          datas: r.data
        });
        console.log(self.data.datas)
      }
    });
  },
  onShow:function(){

  },
  onHide:function(){

  },
  onUnload:function(){

  }
})