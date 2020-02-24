$(function(){
	//初始化数据列表
	function initList(){
    var page = 1;
    //showFood('/drinks/',page);
    //$('#rowList').css('display','none');
    //$('#cartList').css('display','none');
    $('#drinks').unbind('click').click(function(){
      showFood('/drinks/',page); 
      clickPage('/drinks/',page);        
    });
    $('#desert').unbind('click').click(function(){
      showFood('/desert/',page);  
      clickPage('/desert/',page);           
    });
    $('#cart').unbind('click').click(function(){
      goToCart();
    })
	}
	function showFood(url,page){
		$('#cartList').css('display','none');
    $('#rowList').css('display','block');
    $('.background').css('height','100%');
    $.ajax({
      url: url + page,
      type: 'get',
      dataType: 'json',
      success: function (data) {
        var html = '';
        for(var i = 0; i < data.length; i++){
          html += '<li><p hidden>'+data[i]._id+'</p><div class="col-md-3"><div class="list"><img src='+data[i].img+'><div class="detail"><p>'+data[i].name+'</p><p>￥：'+data[i].price+'</p></div><button id="add">Add to cart</button></div></div></li>';
        }
        $('#food').html(html);
        $('#food').find('li').each(function(index,element){
          var bt = $(element).find('button');
          var id = $(element).find('p:eq(0)').text();
          bt.click(function(){
            addToCart(id);
          }); 
        });
      }
    })
  }
  function clickPage(url,page){
  	//$('#cartList').css('display','none');
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
        console.log('success')
      }
    })
  }
  function goToCart(){
  	$('#rowList').css('display','none');
  	$('#cartList').css('display','block');
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
          html += '<li><p class="hide">'+data[i]._id+'</p><img src='+data[i].img+'><p>'+data[i].name+'</p><p>数量：'+num+'</p><p>单价：'+price+'</p><p>￥：'+sum+'</p><button>×</button></li>';
          total += sum;
        }
        html += '<li id="sum"><p>合计￥：'+total+'</p><a href="javascript:;" class="btn btn-danger navbar-btn">结算</a></li>'
        $('#cartList>ul').html(html);
        $('#cartList>ul').find('li').each(function(index,element){
          var id = $(element).find('p:eq(0)').text();
          var bt = $(element).find('button');
          bt.click(function(){
	        	deleteGood(id);
	        }) 
        });
        var cart_height = $('#cartList').height();
        if (cart_height>474) {
        	$('.background').css('height',cart_height+140+'px');
        }else{
        	$('.background').css('height','100%');
        }
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
	initList();
});	