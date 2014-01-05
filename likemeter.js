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
    			'vk': vk
    		}

    		$.each(options.urls, function(i, url){
    			results[url] = {};
    			$.each(options.networks, function(i, network){
    				results[url][network] = undefined;
    			});
    		});

    		function collect_result(result, network){
    			social_ok.push(network);
    			$.each(result, function(i, res){
					results[res.url][network] = res.likes;
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
		        		results.push({url: res.url, likes: res.share_count})
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
				    		results.push({url: url, likes: data.count})
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

    		function vk(urls, callback){
    			var results = [];
    			VK = {
    				Share: {
    					count: function(idx, value){
    						console.log(urls[idx], value);
    						results.push({url: urls[idx], likes: value})
    						if(Object.keys(results).length >= urls.length){
    							console.log(results)
				    			callback(results, 'vk');
				    		}
    					}
    				}
    			}
    			$.each(urls, function(i, url){
    				$.ajax({
    					type: "GET",
    					dataType: "jsonp",
    					url: "https://vk.com/share.php",
    					data: {'act': 'count', 'index': i, 'url': url}
    				})
    				.fail(function(data, status){
    					if(status != 'parsererror'){
    						results.push({url: url});
    					}
    				})
    			});
    		}
        }
    });
})(jQuery);

$.LikeMeter({urls: ['http://mail.ru', 'http://yandex.ru'], networks: ['facebook', 'twitter', 'vk']});