<h1>Magento 2 Slick</h1>
<p>Compatible with magento 2.0.0 - 2.4.1</p>

<h2>Installation</h2>
<ol>
	<li>Create Elite/SlickCarousel inside your app/code folder to your magento installtion</li>
	<li><pre>git clone https://github.com/Emil1997/magento2-slick.git</pre></li>
	<li><pre>php bin/magento module:enable Elite_SlickCarousel</pre></li>
	<li><pre>php bin/magento setup:upgrade</pre></li>
	<li><pre>php bin/magento setup:di:compile</pre></li>
</ol>

<h2>How to use ?</h2>
<pre>
    require([
	'jquery',
	'slick'
    ]), function($) {
        $(document).ready(function(){
            // initialize slick here
            $('#your_element_selector').slick();
        });
    }
</pre>
