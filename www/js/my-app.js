// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;



// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});



if (localDB){
    tokenkey = localStorage.getItem('token');
    if (tokenkey!== 'undefined' && tokenkey !== null){
        /*
        $$.ajax({url:api_url + 'valid'
            ,method:'post'
            ,dataType:'json'
            ,data:{token:tokenkey}

            ,headers:{'apikey':api_key}
            ,success:function(data){
                if ('error' in data){ $$('#login-status').html('Invalid username/password.'); }
                console.log(data);
            }
        });
        */
    }
}

mainView.router.loadPage('pages/login.html');
myApp.onPageInit('login-screen-embedded',function(page){

    $$('#app-login-btn').on('click', function () {
        $$.ajax({url:api_url + 'login'
            ,method:'post'
            ,dataType:'json'
            ,data:{action:'login',username:$$('#app-username').val(),password:$$('#app-password').val()}
            ,headers:{'apikey':api_key}
            ,success:function(data){
                if ('error' in data){ $$('#login-status').html('Invalid username/password.'); }
                console.log(data);
                if (localDB){
                    localStorage.setItem('token',data.token);
                    localStorage.setItem('token_valid',data.token_valid);
                }

            }
        });

    });

})


// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}



