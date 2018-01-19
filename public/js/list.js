function listAjax(){
    $.ajax({
        url:"/api/getList",
        type:"get",
        success:function(data){
            console.log(data)      
            addList(data)
        }
    })
}
// 删除
$("#list-div table tbody").on("click",".remove",function(){
    var pName = $(this).parent().siblings().children(".commodityName").html()
    console.log(pName)
    $.ajax({
        url: "/api/remove",
        type: "post",
        data: {
            pName: pName
        },
        success: function (data) {
            console.log(data)
            listAjax()
        }
    })
})
// 编辑
function editAjax(){
    var list = location.search.split("=")
    var pId =list[1]
    if(!pId){   
        return
    }
    console.log(pId)
    $.ajax({
        url: "/edit",
        type: "post",
        data: {
            pId: pId,
        },
        success: function (data) {
            console.log(data)
            console.log(data[0].pName)
            console.log($(".add-list"))
            console.log($(".add-content .pPrice").val())
            // $(".Pclass").val() = data.Pclass;
            $(".pPrice").val(data[0].pPrice)
            $(".pName").val(data[0].pName)
            $(".pCode").val(data[0].pCode)
            var btn =`<button class="btn" onclick="subEdit()">确定</button>
                        <button class="btn">重置</button>`
            $('.btn-box').html(btn)
        }
    })
}
// 更改数据
function subEdit(){
    var list = location.search.split("=")
    var pId = list[1]
    $.ajax({
        url:"/api/eit",
        type:"post",
        data:{
            pName: $(".pName").val(),
            pCode: $(".pCode").val(),
            // pClass:$(".pClass").val(),
            Pclass: "name",
            pBrand: $(".pBrand").val(),
            pPrice: $(".pPrice").val(),
            pId: pId
        },
        success:function(data){
            console.log(data)
            if(data.ok == 1){
                alert("编辑成功 2秒后页面跳转")
                setTimeout(() => {
                    location.href = "/ifList"
                }, 2000);

            }
        }
    })
}
// 模糊查询
function vagueAjax(){
    console.log($(".sousuo-txt").val())
    $.ajax({
        url:"/api/vague",
        type:'post',
        data:{
            pName: $(".sousuo-txt").val()
        },
        success:function(data){
            console.log(data)
            addList(data)
        }
    })
}

// 分页
function FirstPage() {
    var page = 1
    odd(page)
}
function last() {
    //       最后一页
    var page = $(".cont").html()
    odd(page)
}
function Previous() {
    // 上一页
    var page = parseInt($(".page").html()) - 1
    if(page<=0){
        alert("没有上一页了")
    }else{
        odd(page)        
    }
}
function next() {
    //   下一页  //  
    var page = parseInt($(".page").html()) + 1
    odd(page)
}
function odd(a) {
    console.log(a)
    $.ajax({
        url: "/goods/add",
        type: "get",
        data: {
            PageCont: $(".text").val(),
            Page: a
        },
        success: function (data) {
            console.log(data)
            console.log(data.Page)
            if (data.data.length != 0) {
                $(".cont").html(data.cont)
                $(".page").html(data.Page)
                addList(data.data)
            } else {
                alert("没有数据了")
            }

        }
    })
}















//数据的封装
function addList(data){
    var str = ""
    $.each(data, (index, value) => {
        $(".lp").remove()
        str += `<tr class="lp">
                            <td>
                                <input type="checkbox">
                                <a href="javascript:;" class="pId">${value.pId}</a>
                            </td>
                            <td>
                                <span class="commodityName">${value.pName}</span>
                            </td>
                            <td class="">
                                <span>${value.pCode}</span>
                            </td>
                            <td>
                                <span>${value.pPrice}</span>
                            </td>
                            <td>
                                <a href="#">X</a>
                            </td>
                            <td>
                                <a href="#">√</a>
                            </td>
                            <td>
                                <a href="#">√</a>
                            </td>
                            <td>
                                <a href="#">√</a>
                            </td>
                            <td>
                                <span>100</span>
                            </td>
                            <td>
                                <span>1</span>
                            </td>
                            <td>
                                <span>0</span>
                            </td>
                            <td class="bt">
                                <a href="/hol?pid=${value.pId}" class="iconfont icon-79 tubiao edit " title="编辑"></a>
                                <a href="#" class="iconfont icon-qunfengshanchuxian tubiao remove" title="删除" ></a>
                            </td>
                        </tr>`


    })
    $("#list-div table tbody").append(str)
}

