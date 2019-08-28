// page/order/order.js
let wx_comm = require("../../comm/comm.js")
var Moment = require("../../comm/moment.js");
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear()
var DATE_MONTH = new Date().getMonth() + 1
var DATE_DAY = new Date().getDate()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [{
        icon: `https://hj.nbymwl.com/image/home/order.png`,

      },
      {
        icon: `https://hj.nbymwl.com/image/home/order.png`,

      },
      {
        icon: `https://hj.nbymwl.com/image/home/order.png`
      }
    ],

    //选择
    car: {
      index: 0,
      content: ['小型车（13~20人）', '大型车（30~40人）'],
      pri: [7000, 10000]
    },

    list1: [{
      id: 0,
      name: '天 数',
      content: ['三天二晚', '三天三晚', '三天四晚'],
      index: 0,
      mode: 'selector',
      days: [200, 300, 400]
    }],

    allprices:7200,
    list2: [{
        id: 0,
        name: '接站地',
        content: ['机场', '高铁站', '地铁站'],
        index: 0,
        mode: 'selector'
      },
      {
        id: 1,
        name: '送站地',
        content: ['机场', '高铁站', '地铁站'],
        index: 0,
        mode: 'selector'
      }
    ],
    list3: {
      id: 3,
      content: ['纯购物', '纯购物2'],
      index: 0,
      mode: 'selector',
      pri: [900, 700]
    },
    list4: {
      id: 4,
      content: ['宁波', '上海'],
      index: 0,
      mode: 'selector',
      pri: [700, 600]
    },

    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 800,
    index: 0,
    urls: 'https://hj.nbymwl.com/image/home/',
    items: [{
        id: 0,
        name: '香舍丽榭',
        value: '香舍丽榭',
        money: 50,
        checked: false,
        color: '',
        disabled: false
      },
      {
        id: 1,
        name: '伊人飘影',
        value: '伊人飘影',
        money: 50,
        checked: false,
        color: '',
        disabled: false
      },
      {
        id: 2,
        name: '时尚美人',
        value: '时尚美人',
        money: 50,
        checked: false,
        color: '',
        disabled: false
      },
      {
        id: 3,
        name: '咖啡服装',
        value: '咖啡服装',
        money: 50,
        checked: false,
        color: '',
        disabled: false
      },
      {
        id: 4,
        name: '衫舞飞扬',
        value: '衫舞飞扬',
        money: 50,
        checked: false,
        color: '',
        disabled: false
      },
      {
        id: 5,
        name: '纯色心情',
        value: '纯色心情',
        money: 50,
        checked: false,
        color: '',
        disabled: false
      },
      {
        id: 6,
        name: '时尚美人',
        value: '时尚美人',
        money: 50,
        checked: false,
        color: '',
        disabled: false
      },
      {
        id: 7,
        name: '咖啡服装',
        value: '咖啡服装',
        money: 50,
        checked: false,
        color: '',
        disabled: false
      },
      {
        id: 8,
        name: '衫舞飞扬',
        value: '衫舞飞扬',
        money: 50,
        checked: false,
        color: '',
        disabled: false
      },
      {
        id: 9,
        name: '衫舞飞扬',
        value: '衫舞飞扬',
        money: 50,
        checked: false,
        color: '',
        disabled: false
      }
    ],
    bzs: 0,
    shoplists: {
      content: ['请选择购物店哦！'],
      //暂存区
      shoplist_money:0,
      money: 0,
      colors: 0
    },
    disabled: false,
    //上传图片
    imgs: '',
    number: 0,
    meum: {
      small: '',
      shop: '',
    },
    // momey: 14000,
    allfh: 1600,
    renshu:0,
    hash:0,
    checkInDate: "",
    checkOutDate: "",

  },

  //上传
  my: function(e) {
    console.log(e)
    this.setData({
      imgs: e.detail.imgs,
      number: e.detail.number
    })
  },


  //方法
  changed: function(e, number, stauts) {
    let indexs = parseInt(e.detail.value);
    let em = e.currentTarget.id;
    let ens = '';
    if (stauts === 0) {
      ens = `list${number}[${em}].index`;
    } else {
      ens = `list${em}.index`;
    }
    return this.setData({
      [ens]: indexs
    })
  },


//天数选择
  bindDateChange1: function(e) {

    let indexs = parseInt(e.detail.value);
    let em = e.currentTarget.id;
    let list = this.data.list1;
    let car = this.data.car;
    this.setData({
      [`list1[${em}].index`]: indexs,
      allprices: (car.pri[car.index] + list[0].days[indexs])
    })
  },
  bindDateChange2: function(e) {
    this.changed(e, 2, 0);
  },
  bindDateChange3: function(e) {

    // this.changed(e, 3, 1);
    let indexs = parseInt(e.detail.value);
    let em = e.currentTarget.id;
    // let value = e.detail.value;
    let list4 = this.data.list4;
    let list3 = this.data.list3;
    let money = this.data.shoplists.money;
    if (em == "3") {
      this.setData({
        [`list${em}.index`]: indexs,
        allfh: (money + list3.pri[indexs] + list4.pri[list4.index])
      })
    } else {
      this.setData({
        [`list${em}.index`]: indexs,
        allfh: (money + list3.pri[list3.index] + list4.pri[indexs])
      })
    }
  },


  //选择车型
  bindDateChange0: function(e) {
    let list = this.data.list1;
    let car = this.data.car;
    let id = parseInt(e.detail.value);
    this.setData({
      [`car.index`]: parseInt(e.detail.value),
      allprices: (car.pri[id] + list[0].days[list[0].index])
    })
  },


  //购物店
  checkboxChange: function(e) {

    let li = this.data.items;
    let values = e.detail.value;
    let len = values.length;
    let renshu = this.data.renshu;
    let leng = [],money = 0;
    let list3 = this.data.list3;
    let list4 = this.data.list4;
    //id
    let n = [],lk = [],mk=[];
    for (let i of values) {
      const matchReg1 = /C(.*)/;
      let m = i.match(matchReg1)[1];
      var matchReg2 = i.split(`C${m}`, 1);
      let no = matchReg2.map((item) => item).join('');
      n.push(m);
      lk.push(no)
      mk.push(m)
    }
    for (let j of lk) {
      let text1 = j.replace(/[0-9]/ig, "");
      //获取价格
      let text2 = Number(j.replace(/[^0-9]/ig, ""));
      leng.push(text1);
      money += text2;
    }
    this.setData({
      [`shoplists.money`]: money * renshu,
      [`shoplists.shoplist_money`]: money,
      [`shoplists.content`]: leng,
      allfh: money * renshu + list3.pri[list3.index] + list4.pri[list4.index]
    })

    if (this.data.bzs == 0) {
      if (len <= 4) {   
        for (let jj of n) {
          this.setData({
            [`items[${jj}].disabled`]: false
          })
        }

      }
      if (len > 3) {
        let pp = [];
        wx_comm.showtoast("已选择4个，多余的无效", 'none')

        let ns = 0;
        let an = JSON.parse(JSON.stringify(li));
        for (let l of n) {
          an[l].id = li.length-1
        }
        for (let as of an) {
          ns = (as.id);
          if (mk.indexOf((li.length-1).toString()) !=-1){
          
            this.setData({
              [`items[${ns}].disabled`]: true,
              [`items[${li.length-1}].disabled`]: false,
              bzs: 1
            })
          }else{
            this.setData({
              [`items[${ns}].disabled`]: true,
              [`items[${li.length - 1}].disabled`]: true,
              bzs: 1
            })
          }

        }
      }
      if(len == 0){
        this.setData({
          [`shoplists.content`]: [],
          bzs: 0
        })
      }
    } else {
      for (let ol of li) {
        // console.log(values)
        this.setData({
          [`items[${ol.id}].disabled`]: false,
           bzs: 0
        })
      }
    }
  },

//人数输入
  renshu: function(e) {
    let shoplist_money = this.data.shoplists.shoplist_money;
    let renshu = e.detail.value;
    let list3 = this.data.list3;
    let list4 = this.data.list4;
    if( !isNaN(renshu) ){
      if( renshu =="" ){
        renshu = 0
      }
      this.setData({
        renshu,
        [`shoplists.money`]: shoplist_money * parseInt(renshu),
        allfh: shoplist_money * parseInt(renshu) + list3.pri[list3.index] + list4.pri[list4.index]
      })
    }else {
      wx_comm.showtoast('请输入合法人数','none')
    }
  },

  //确认
  sure: function() {
    let allfh = this.data.allfh;
    let momey = this.data.momey;
    let renshu = this.data.renshu;
    let imgs = this.data.imgs;
    let number = this.data.number;

    //对象
    let person = {
      allfh,
      momey,
      renshu,
      imgs,
      number
    }

    if (renshu == 0) {
      wx_comm.showtoast('请输入人数哦', 'none')
    } else if (isNaN(renshu)) {
      wx_comm.showtoast('请输入合法人数哦', 'none')
    } else {

      wx.navigateTo({
        url: 'success/success',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setStorage({
      key: 'ROOM_SOURCE_DATE',
      data: {
        checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
        checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD')
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    this.setData({
      checkInDate: getDate.checkInDate,
      checkOutDate: getDate.checkOutDate
    })
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})