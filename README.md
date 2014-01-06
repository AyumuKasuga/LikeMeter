LikeMeter
=========
jQuery plugin for create custom like counters

If you want create custom like buttons, you might want to create custom like counters. This plugin will help you.

Example:
--------

```javascript
$.LikeMeter(
    {
        urls: ['http://mail.ru', 'http://yandex.ru', 'http://google.com'],
        networks: ['facebook', 'twitter', 'vk', 'myworld', 'linkedin'], 
        callback: your_callback_function
    }
);
```
paramaters description:
* urls - one or more urls 
* networks - social networks (add only if you will use their)
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
        vk: 4312
    },
    'http://yandex.ru': 
    {
        facebook: 8476,
        linkedin: 173,
        myworld: 1757,
        twitter: 1053,
        vk: 2458
    },
    'http://mail.ru': 
    {
        facebook: 10282,
        linkedin: 764,
        myworld: 116579,
        twitter: 120789,
        vk: 58929
    },
    
}
```

Supported social networks:
--------------------------

* Facebook
* Linkedin
* Мой мир (http://my.mail.ru/)
* Twitter
* Vkontakte (vk.com)
