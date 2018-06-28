/*Create by laiyao on 2018/6/20/020.*/
(function(){
    var swiper = new Swiper('.swiper-container',{
        loop : true,
        effect : 'fade',
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
        }
    });

    /*登录验证*/
    $('.submitBtn').click(function () {
        var name = $('#userName').val();
        var password = $('#password').val();
        if(!name && !password){
            alert('用户名和密码不能为空');
            return false;
        }
        $.ajax({
            url: '/user/login.json',
            type: 'POST',
            data: {
                name: name,
                password: password
            },
            success: function(data){
                if(data.httpCode === 200){
                    window.location.href = "/"
                } else {
                    console.log(data.message);
                }
            },
            error: function (e) {
                console.log(e);
            }
        });

    })

})();