$(function(){
	//初始化数据列表
	function initList(){
    var page = 1;
    $('#rowList').css('display','none');
    $('#drinks').click(function(){
      clickFood('/drinks/',page); 
      clickPage('/drinks/',page);        
    });
    $('#desert').click(function(){
      clickFood('/desert/',page);  
      clickPage('/desert/',page);           
    });
    $('#cart').click(function(){
      runToCart();
    })
	}
	function clickFood(url,page){
    $('#rowList').css('display','block');
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
        // $('.row').css('display','block');
      }
    })
  }
  function clickPage(url,page){
    $('#p_1').unbind('click').click(function(){
      if (page>1) {
        page--;
        clickFood(url,page);
      }
    }); 
    $('#p_2').unbind('click').click(function(){
      if (page<2) {
        page++;
        clickFood(url,page);
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
  function runToCart(){
    $.ajax({
      url: '/cart',
      type: 'get',
      dataType: 'json',
      success: function (data) {
        //console.log(data)
        var html = '';
        var total;
        for(var i = 0; i < data.length; i++){
          html += '<li><img src='+data[i].img+'><p>'+data[i].name+'</p><p>￥：'+data[i].price+'</p><button id="delete">×</button></li>';
          total += parseInt(data[i].price);
          console.log(total)
        }
        //console.log(JSON.parse(total));
        //console.log(parseInt(total));
        html += '<li id="sum"><p>合计￥：'+total+'</p><a href="javascript:;" class="btn btn-danger navbar-btn">结算</a></li>'
        $('#cartList>ul').html(html);
      }
    })
  }
	initList();
});	