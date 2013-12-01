(function ($) {
    $.extend({
        LikeMeter: function (options) {
        	var defaults = { 
			    urls: [],
				networks: [],
				callback: function(res){console.log(res);},
			};
			var options = $.extend({}, defaults, options);
			var results = {};

    		var social = {
    			facebook: facebook,
    		}

    		function collect_result(result){
    			var results = $.extend({}, results, result);
    			Object.keys(results).length >= options.networks.length && options.callback(results);
    		}

    		$.each(options.networks, function(i, network){
    			var func = social[network];
    			func && func(options.urls, collect_result); 
    		});

    		function facebook(urls, callback){
    			$.ajax({
			        type: "GET",
			        dataType: "jsonp",
			        url: 'http://api.facebook.com/restserver.php',
			        data: {'method': 'links.getStats', 'urls': urls, 'format': 'json'}
			    })
			    .done(function (obj){
		        	var results = {};
		        	$.each(obj, function(i, res){
		        		results[res.url] = {likes: res.like_count, shares: res.share_count};
		        	});
		            callback({'facebook': results});
			    })
			    .fail(function(){
		        	callback({'facebook': {}});
			    })
    		}
        }
    });
})(jQuery);

$.LikeMeter({urls: ['http://mail.ru', 'http://yandex.ru'], networks: ['facebook']});