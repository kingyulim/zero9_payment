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

                <form id="search_form">
                    <div class="search_wrapper">
                        <div class="search_border">
                            <input id="search_logs" type="text" placeholder="상품게시물 또는 인플루언서 이름으로 검색이 가능합니다.">
                            <button type="submit">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                </form>

                <div class="rank_log_wrapper">
                    <ul>
                        <li>
                            1. 두쫀쿠
                        </li>
                    </ul>
                </div>

                <nav class="header_nav">
                    <a href="#none">상품판매 게시물</a>
                    <a href="#none">공동구매 게시물</a>
                    <a href="#none">범용 게시물</a>
                </nav>
            </div>
        </header>
    `;

    $("body").prepend(HEADER_LAYER);

    const HEADER_WRAP = $("header");

    let right_element;

    if(isTokenExpired(ACCESS_TOKEN)){
        right_element = `
            <a href="${ORIGIN_URL}/auth/login.html">로그인</a>
            <a href="${ORIGIN_URL}/joinpage/user_type.html">회원가입</a>
        `;
    }else{
        if(PAYLOAD.userRole == "ADMIN"){
            right_element = `
                <a href="${ORIGIN_URL}/admin/main.html">관리자</a>
                <a href="${ORIGIN_URL}/auth/logout.html">로그아웃</a>
            `;
        }else{
            const ROLE_TEXT = {
                USER: "user",
                INFLUENCER: "influencer"
            };    

            right_element = `
                <a href="${ORIGIN_URL}/mypage/${ROLE_TEXT[PAYLOAD.userRole]}/home.html">마이페이지</a>
                <a href="${ORIGIN_URL}/auth/logout.html">로그아웃</a>
            `;
        }
    }

    HEADER_WRAP.find(".header_top .right").append(right_element);
});