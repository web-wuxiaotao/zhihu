Page({
  data:{
    zan:''
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
      title:'加载中',
      icon:'loading',
      duration:5000
    });
    wx.request({
      url:'http://news-at.zhihu.com/api/4/news/'+this.data.id,
      success:function(r){
        wx.hideToast();
        var c=r.data.body.replace(/<div[^>]+>|<\/div>|<h2[^>]+>|<\/h2>|<span[^>]+>|<\/span>|<img[^>]+>|<\/img>|<h2[^>]+>|<\/h2>|<a[^>]+>|<\/a>|<h1[^>]+>|<\/h1>|<h5[^>]+>|<\/h5>|<h6[^>]+>|<\/h6>|<p[^>]+>|<\/p>|<strong[^>]+>|<\/strong>|<h4[^>]+>|<\/h4>|<h3[^>]+>|<\/h3>|<ul[^>]+>|<\/ul>|<li[^>]+>|<\/li>/g,"")
        self.setData({
          content: c
        })
      }
    });
    wx.request({
      url:'http://news-at.zhihu.com/api/4/story-extra/'+this.data.id,
          success:function(r){
            wx.hideToast();
            self.setData({
              zan: r.data.popularity
            })
          }
    })
  }
})