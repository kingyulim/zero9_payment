$(document).ready(function(){
    const HEADER_LAYER = `
        <header id="header">
            <div class="container">
                <div class="header_top">
                    <div class="left">
                        <a href="${ORIGIN_URL}/main.html">홈</a>
                    </div>
                        
                    <div class="right">
                        
                    </div>
                </div>
            </div>
        </header>
    `;

    $("body").prepend(HEADER_LAYER);

    const HEADER_WRAP = $("header");

    let right_element;

    if(isTokenExpired(ACCESS_TOKEN)){
        right_element = `
            <a href="${ORIGIN_URL}/auth/login.html">로그인</a>
        `;
    }else{
        right_element = `
            <a href="${ORIGIN_URL}/auth/logout.html">로그아웃</a>
        `;
    }

    HEADER_WRAP.find(".header_top .right").append(right_element);
});