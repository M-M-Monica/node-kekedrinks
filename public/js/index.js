$(function(){
	//初始化数据列表
	function initList(){
		$.ajax({
      url: '/drinks',
      type: 'get',
      dataType: 'json',
      success: function (data) {
        var html = '';
        for(var i = 0; i < data.length; i++){
          html += '<li><div class="col-md-3"><div class="list"><img src='+data[i].img+'><div class="detail"><p>'+data[i].name+'</p><p>￥：'+data[i].price+'</p></div><button class="add">Add to cart</button></div></div></li>';
        }
        $('#food').html(html);
      }
    })
    clickDrinks();
    clickDesert();
	}
	function clickDrinks(){
		$('#drinks').click(function () {
      $.ajax({
        url: '/drinks',
        type: 'get',
        dataType: 'json',
        success: function (data) {
          var html = '';
          for(var i = 0; i < data.length; i++){
            html += '<li><div class="col-md-3"><div class="list"><img src='+data[i].img+'><div class="detail"><p>'+data[i].name+'</p><p>￥：'+data[i].price+'</p></div><button class="add">Add to cart</button></div></div></li>';
          }
          $('#food').html(html);
        }
      })
    })
  }
  function clickDesert(){
    $('#desert').click(function () {
      $.ajax({
        url: '/desert',
        type: 'get',
        dataType: 'json',
        success: function (data) {
          var html = '';
          for(var i = 0; i < data.length; i++){
            html += '<li><div class="col-md-3"><div class="list"><img src='+data[i].img+'><div class="detail"><p>'+data[i].name+'</p><p>￥：'+data[i].price+'</p></div><button class="add">Add to cart</button></div></div></li>';
          }
          $('#food').html(html);
        }
      })
    })
	}
	initList();
});	