var express = require('express');
var router = express.Router();
var UserModel = require("../model/Users")
var PrductModel = require("../model/prduct")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/login', {});
});
router.post("/api/login",(req,res,next)=>{
  var username = req.body.username;
  var psw = req.body.psw;
  var code = req.body.code;
  console.log(req.body)
  var result = {
    stateCode:1,
    massage:"登录成功"
  }
  UserModel.find({username:username,psw:psw},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
    if(data.length == 0){
      result.stateCode = 0;
      result.massage = "登录失败"
      res.json(result)
    }else{
      req.session.username = username
      res.json(result)
    }
  }) 
})
// 首页

router.get("/home", (req, res, next) => {
  res.render("home/home", { title: "这是home页面" })
})
router.get("/list",(req,res,next)=>{
  res.render("list/list",{})
})

router.get("/api/list",(req,res,next)=>{
// 商品名
  var pName = req.query.pName
  // 商品货号
  var pCode = req.query.pCode;
  // 商品分类
  var Pclass = req.query.Pclass;
  // 商品品牌
  var pBrand = req.query.pBrand;
  // 商品售价
  var pPrice = req.query.pPrice;
  var result = {
    stateCode:1,
    massage:"成功"
  }
  var pm = new PrductModel()
  PrductModel.find({},(err,data)=>{
    if(data!=[]){
      pm.pId = data.length      
    }
  })
  PrductModel.find({ pName: pName},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
    if(data.length>0){
      result.stateCode = 0
      result.massage ="商品添加失败"
      res.json(result)
      return
    }
    pm.pName = pName;
    pm.pCode = pCode;
    pm.Pclass = Pclass;
    pm.pBrand = pBrand;
    pm.pPrice = pPrice
    pm.judge = 1
    pm.save(function(err){
      if(err){
        console.log(err);
        result.stateCode = 0
        result.massage = "商品添加失败"
        res.json(result)
      }else{
        res.json(result)
      }
    })
  })

})
// 删除数据
router.post("/api/remove",(req,res,next)=>{
  var pname = req.body.pName;
  console.log("获取的数据"+pname)
  var result = {
    stateCode: 1,
    massage: "删除成功"
  }
  PrductModel.update({ pName: pname }, {$set:{ judge:0}},(err,data)=>{
          console.log(data)
      if(err){
        result.stateCode = 0;
        result.massage = "删除失败";
        // console.log(err)
        res.json(result)
        
      }else{
        // console.log(data)
        res.json(result)
      }
  })
})


// 获取list列表数据
router.get("/api/getList",(req,res,next)=>{
  var pName = req.query.pName
  var result = {
    stateCode: 1,
    massage: "成功"
  }
  PrductModel.find({judge:1},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
    res.json(data)
  })
})




// if渲染
router.get("/ifList",(req,res,next)=>{
  res.render("list/list",{})
})

router.get("/hol",(req,res,next)=>{
  res.render("class/classList",{})
})





// 编辑回参
router.post("/edit",(req,res,next)=>{
  var pId = req.body.pId;
  var result = {
    stateCode: 1,
    massage: "成功"
  }
  PrductModel.find({ pId: pId, judge:1},(err,data)=>{
    console.log("编辑"+data)
    if(err){
      result.stateCode = 0;
      result.massage = "编辑失败"
      console.log(err)
      res.json(result)
    }else{
      res.json(data)
    }
  })
})

// 编辑改值
router.post("/api/eit",(req,res,next)=>{
  var pName = req.body.pName
  var pId = req.body.pId
  // 商品货号
  var pCode = req.body.pCode;
  // 商品分类
  var Pclass = req.body.Pclass;
  // 商品品牌
  var pBrand = req.body.pBrand;
  // 商品售价
  var pPrice = req.body.pPrice;
  var result = {
    stateCode: 1,
    massage: "成功"
  }
  PrductModel.update({ pId: pId }, { $set: { pName: pName, pCode: pCode, Pclass: Pclass, pBrand: pBrand, pPrice: pPrice}},(err,data)=>{
    if(err){
      console.log(err)
    }else{
      res.json(data)
    }
  })
})

// 模糊查询
router.post("/api/vague",(req,res,next)=>{
  var pName = req.body.pName
  PrductModel.find({ pName: { $regex: pName }, judge:1}, function (err, data) {
    if (err) {
      console.log(err)
      res.json(err)
    } else {
      console.log(data)
      res.json(data)
    }
  }) 
})

module.exports = router;
