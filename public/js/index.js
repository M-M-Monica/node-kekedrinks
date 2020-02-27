$(function(){
	function initList(){
    var drinks = $('#drinks');
    var desert = $('#desert');
    var cart = $('#cart');
    drinks.click(function(){
      showFood('/drinks/',1); 
      clickPage('/drinks/',1);        
    });
    desert.click(function(){
      showFood('/desert/',1);  
      clickPage('/desert/',1);           
    });
    cart.click(function(){
      goToCart();
    })
	}
	function showFood(url,page){
		$('#cartList').hide();
    $('.background').css('height','100%');
    $('.container>img').hide();
    $.ajax({
      url: url + page,
      type: 'get',
      dataType: 'json',
      success: function (data) {
        var html = '';
        for(var i = 0; i < data.length; i++){
          html += '<li><p hidden>'+data[i]._id+
          '</p><div class="col-md-3"><div class="list"><img src='+data[i].img+
          '><div class="detail"><p>'+data[i].name+'</p><p>￥：'+data[i].price+
          '</p></div><img src="/img/add.png" id="add"></div></div></li>';
        }
        $('#rowList').show();
        $('#food').html(html);
        $('#food').find('li').each(function(index,element){
          var bt = $(element).find('img:eq(1)');
          var id = $(element).find('p:eq(0)').text();     
          bt.click(function(){
            addToCart(id);
            bt.before('<div class="ball">+1</div>');
            bt.prev().animate({top:'260px'},500);
            setTimeout(function(){
              bt.prev().hide();
            },500);
          }); 
        });
      }
    })
  }
  function clickPage(url,page){
    var page = 1;
    $('#p_1').unbind('click').click(function(){
      if (page>1) {
        page--;
        showFood(url,page);
      }
    }); 
    $('#p_2').unbind('click').click(function(){
      if (page<2) {
        page++;
        showFood(url,page);
      }
    }); 
  }
  function addToCart(id){
    $.ajax({
      url: '/cart',
      type: 'post',
      data: id,
      dataType: 'json',
      success: function () {
        //ball.hide();
      }
    })
  }
  function goToCart(){
  	$('#rowList').hide();
  	$('#cartList').fadeIn(1000);
    $('.container>img').hide();
    $.ajax({
      url: '/cart',
      type: 'get',
      dataType: 'json',
      success: function (data) {
        var html = '';
        var total = 0;
        for(var i = 0; i < data.length; i++){
        	var num = parseInt(data[i].num);
        	var price = parseInt(data[i].price);
        	var sum = num*price;       	
          html += '<li><p class="hide">'+data[i]._id+
          '</p><img src='+data[i].img+'><p>'+data[i].name+
          '</p><p>数量：'+num+'</p><p>单价：'+price+'</p><p>￥：'+sum+
          '</p><a href="javascript:;"><img src="/img/trash.png" class="bt"/></a></li>';
          total += sum;
        }
        html += '<li id="sum"><p>合计￥：'+total+
        '</p><button id="pay" class="btn btn-danger navbar-btn" data-toggle="modal" disabled="disabled" data-target="#myModal">结算</button></li>';
        $('#cartList>ul').html(html);
        if (total>0) {
          $('#pay').removeAttr('disabled');
        }
        $('#cartList>ul').find('li').each(function(index,element){
          var id = $(element).find('p:eq(0)').text();
          var trash = $(element).find('a');
          trash.click(function(){
	        	deleteGood(id);
	        }) 
          //<div class="num">+</div>
          //<div class="num">-</div>
        });
        var cart_height = $('#cartList').height();
        var back_height = $(window).height()-100;
        if (cart_height > back_height) {
          $('.background').css('height',cart_height+130+'px');
        }else{
          $('.background').css('height','100%');
        }
        submitOrder(total);
      }
    })
  }
  function deleteGood(id){
  	$.ajax({
      url: '/cart/'+id,
      type: 'delete',
      dataType: 'json',
      success: function (data) {
        if(data.flag == '1'){
		      goToCart()
		    }
      }
    })
  }
  function submitOrder(total){
    $('#pay').click(function(){
      var form = $('#addGoodForm');
      form.find('input[type=hidden]').val(total);
      form.find('input[type=button]').unbind('click').click(function(){
        $.ajax({
          url:'/pay',
          type:'post',         
          data:form.serialize(),
          dataType:'json',
          success:function(data){
            if(data.flag == '1'){
              $('#myModal').modal('hide')
              $('#success .modal-body').text('你一共花了'+data.total+'元哦');
              $('#myModal1').modal('show')
              goToCart();
            }
          }
        })
      });
    })
  }
	initList();
});	