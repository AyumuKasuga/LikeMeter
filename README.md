LikeMeter
=========
jQuery plugin for create custom like counters

If you want create custom like buttons, you might want to create custom like counters. This plugin will help you.

Example
--------

```javascript
$.LikeMeter(
    {
        urls: ['http://mail.ru', 'http://yandex.ru', 'http://google.com'],
        networks: ['facebook', 'twitter', 'vk', 'myworld', 'linkedin', 'odnoklassniki', 'pinterest'], 
        callback: your_callback_function
    }
);
```
parameters explanation:
* urls - one or more urls (with http:// or https://)
* networks - social networks (add only the ones you will use)
* callback - your callback function (if you do not specify this, result will print into console)

Your function will get structure like this:
```javascript
{
    'http://google.com': 
    {
        facebook: 5112940,
        linkedin: 10977,
        myworld: 491,
        twitter: 7485,
        vk: 4312,
        odnoklassniki: 100500,
        pinterest: 100500
    },
    'http://yandex.ru': 
    {
        facebook: 8476,
        linkedin: 173,
        myworld: 1757,
        twitter: 1053,
        vk: 2458,
        odnoklassniki: 100500,
        pinterest: 100500
    },
    'http://mail.ru': 
    {
        facebook: 10282,
        linkedin: 764,
        myworld: 116579,
        twitter: 120789,
        vk: 58929,
        odnoklassniki: 100500,
        pinterest: 100500
    },
    
}
```

Examples in action
-------------------
* [example 1](http://htmlpreview.github.io/?https://raw.github.com/AyumuKasuga/LikeMeter/master/example.html)
* [example 2](http://htmlpreview.github.io/?https://raw.github.com/AyumuKasuga/LikeMeter/master/example2.html)

Supported social networks
--------------------------

* Facebook
* Linkedin
* Мой мир (http://my.mail.ru/)
* Twitter
* Vkontakte (vk.com)
* Odnoklassniki (http://www.odnoklassniki.ru/) (only over http)
* Pinterest


[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/fc9031cd53134fedfbd6cd22bac81cbb "githalytics.com")](http://githalytics.com/AyumuKasuga/LikeMeter)
