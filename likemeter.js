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
			var social_ok = [];

    		var social = {
    			'facebook': facebook,
    			'twitter': twitter,
    		}

    		$.each(options.urls, function(i, url){
    			results[url] = {};
    			$.each(options.networks, function(i, network){
    				results[url][network] = {}
    			});
    		});

    		function collect_result(result, network){
    			social_ok.push(network);
    			$.each(result, function(i, res){
    				if(res.likes){
    					results[res.url][network]['likes'] = res.likes;
    				}
    				if(res.shares){
    					results[res.url][network]['shares'] = res.shares;
    				}
    			});

    			if(social_ok.length >= options.networks.length){    				
    				options.callback(results);
    			}
    		}

    		$.each(options.networks, function(i, network){
    			var func = social[network];
    			func && func(options.urls, collect_result); 
    		});

    		function facebook(urls, callback){
    			$.ajax({
			        type: "GET",
			        dataType: "jsonp",
			        url: 'https://api.facebook.com/restserver.php',
			        data: {'method': 'links.getStats', 'urls': urls, 'format': 'json'}
			    })
			    .done(function (obj){
	    			var results = [];
		        	$.each(obj, function(i, res){
		        		results.push({url: res.url, likes: res.like_count, shares: res.share_count})
		        	});
		            callback(results, 'facebook');
			    })
			    .fail(function(){
			    	callback([], 'facebook');
			    })
    		}

    		function twitter(urls, callback){
    			var results = [];
    			$.each(urls, function(i, url){
					$.ajax({
				        type : "GET",
	        			dataType : "jsonp",
	        			url : 'https://cdn.api.twitter.com/1/urls/count.json',
	        			data : {'url': url},
				    })
				    .always(function(data, status){
				    	if(status == 'success'){
				    		results.push({url: url, shares: data.count})
				    	}
				    	else{
				    		results.push({url: url})
				    	}
				    	if(Object.keys(results).length >= urls.length){
				    		callback(results, 'twitter');
				    	}
				    })
    			});
    		}
        }
    });
})(jQuery);

$.LikeMeter({urls: ['http://mail.ru', 'http://yandex.ru'], networks: ['facebook', 'twitter']});