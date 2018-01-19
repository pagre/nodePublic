
$(function(){
    $(".show").click(function (e) {
        if ($(".list").css("display") == "none") {
            $("#lower").removeAttr("class", "iconfont icon-more").attr("class", "iconfont icon-moreunfold")
            $(".list").show()
        } else {
            $("#lower").removeAttr("class", "iconfont icon-moreunfold").attr("class", "iconfont icon-more");
            $(".list").hide();
        }
    })
    // 切换商品分类和商品列表
    $(".show").click(function (e) {
        if ($(".list").css("display") == "none") {
            $("#lower").removeAttr("class", "iconfont icon-more").attr("class", "iconfont icon-moreunfold")
            $(".list").show()
        } else {
            $("#lower").removeAttr("class", "iconfont icon-moreunfold").attr("class", "iconfont icon-more");
            $(".list").hide();
        }
    })
    $(".add-list").click(function () {
        $("#commodity").hide()
        $(".right").show()
    })
    $(".add-class").click(function () {
        $(".right").hide()
        $("#commodity").show()
    })
    // 添加商品分类
    // 商品分类的导航
    $(".add-nav ul li").click(function () {
        var _index = $(this).index()
        // console.log($(this).index())
        $(this).siblings().children("a").removeClass("active")
        // content的显示和隐藏
        $(".bable").hide().eq(_index).show()
        $(this).children("a").attr("class", 'active').siblings().removeClass("active")
    })
    // 问号的点击事件
    $(".add-wenhao").click(function () {
        if ($(this).parent().siblings().children("p").css("display") == "none") {
            $(this).parent().siblings().children("p").show()
        } else {
            $(this).parent().siblings().children("p").hide()
        }
    })
    $(".increase").click(function () {
        var str = `<div class="add-content-left">
                        <div>
                            <a href="javascript:;" class="increaseL" >[-]</a>图片描述
                            <input type="text">
                            上传文件
                            <input type="file">
                        </div>
                        <div class="htps">
                            <input type="text">
                        </div>
                    </div>`
        $(".create").append(str);
    })
    $(".create").on("click", ".increaseL", function () {
        $(this).parents(".add-content-left").remove()
    })
    // 添加商品的ajax请求
})
function subAjax() {
    $.ajax({
        url: '/api/list',
        type: "get",
        data: {
            pName: $(".pName").val(),
            pCode: $(".pCode").val(),
            // pClass:$(".pClass").val(),
            Pclass: "name",
            pBrand: $(".pBrand").val(),
            pPrice: $(".pPrice").val()
        },
        success: function (res) {
            console.log(res)
            if (res.stateCode==1){
                location.href="ifList"
            }else{
                alert("提交代码错误")
            }

        }
    })
}


