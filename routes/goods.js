var express = require('express');
var router = express.Router();
var PrductModel = require("../model/prduct");

router.get("/add",(req,res,next)=>{
    PrductModel.count({ judge:1},(err,cont)=>{
        // siip跳过多少数据 
        // limit 一页显示多少数据
        var Page = parseInt(req.query.Page);
        var PageCont = parseInt(req.query.PageCont)
        
       var list =  PrductModel.find({ judge: 1 }).skip((Page - 1) * PageCont).limit(PageCont)
        list.exec((err,data)=>{
            var reslut = {
                cont: Math.ceil(cont / PageCont) ,
                data: data,
                Page:Page
            }
            if(err){
                console.log(err)
            }else{
                res.json(reslut)
            }
        })
    })
})





module.exports = router;
