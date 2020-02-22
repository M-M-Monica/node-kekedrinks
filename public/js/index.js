$(function(){
	//初始化数据列表
	function initList(){
		$.ajax({
      url: '/drinks/1',
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
        var page = 1;
        //var url = '/drinks/';
        $('#drinks').click(function(url){
          clickFood('/drinks/',page); 
          clickPage('/drinks/',page)         
        });
        $('#desert').click(function(){
          clickFood('/desert/',page);  
          clickPage('/desert/',page)           
        });
        // $('#p_1').click(function(){
        //   if (page>1) {
        //     page--;
        //     console.log(page)
        //     clickFood('/drinks/',page);
        //   }
        // });
        // $('#p_2').click(function(){
        //   page++;
        //   console.log(page)
        //   clickFood('/desert/',page);
        // });
      }
    })
	}
	function clickFood(url,page){
    $.ajax({
      url: url + page,
      type: 'get',
      dataType: 'json',
      success: function (data) {
        var html = '';
        for(var i = 0; i < data.length; i++){
          html += '<li><div class="col-md-3"><div class="list"><img src='+data[i].img+'><div class="detail"><p>'+data[i].name+'</p><p>￥：'+data[i].price+'</p></div><button id="add">Add to cart</button></div></div></li>';
        }
        $('#food').html(html);
      }
    })
  }
  function clickPage(url,page){
    //var page = 1;
    $('#p_1').click(function(){
      if (page>1) {
        page--;
        clickFood(url,page);
      }
    }); 
    $('#p_2').click(function(){
      page++;
      console.log(page)
      clickFood(url,page);
    }); 
  }
  function addToCart(id){
    console.log(id)
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
	initList();
});	