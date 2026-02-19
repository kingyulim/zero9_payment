const categoryMap = {
    // 식품
    DESSERT: "디저트",
    INSTANT: "인스턴트",
    BEVERAGE: "음료",
    COFFEE_TEA: "커피/차",
    SNACK: "과자",
    NOODLE: "면류",
    MEAT: "육류",
    SEAFOOD: "해산물",
    FRUIT: "과일",
    HEALTH_FOOD: "건강식품",

    // 생활 / 주방
    KITCHEN: "주방용품",
    HOUSEHOLD: "생활용품",
    CLEANING: "청소용품",
    BATHROOM: "욕실용품",
    STORAGE: "수납/정리",

    // 패션 / 뷰티
    FASHION: "패션",
    SHOES: "신발",
    BAG: "가방",
    ACCESSORY: "액세서리",
    BEAUTY: "뷰티",
    COSMETIC: "화장품",

    // 디지털 / 가전
    DIGITAL: "디지털",
    APPLIANCE: "가전제품",
    MOBILE_ACCESSORY: "모바일 액세서리",

    // 취미 / 기타
    HOBBY: "취미/여가",
    PET: "반려동물",
    BABY: "유아/아동",
    BOOK: "도서",
    ETC: "기타"
};

const ORIGIN_URL = window.location.origin;
const SPRING_BOOT_URL = "http://localhost:8080";
const ACCESS_TOKEN = localStorage.getItem("accessToken");
const PAYLOAD = parseJwt(ACCESS_TOKEN)

function isTokenExpired(token) {
    if (!token) return true; // 토큰 없으면 만료로 처리

    try {
        // JWT payload 디코딩
        const payloadBase64 = token.split('.')[1];
        const payloadJson = atob(payloadBase64); // base64 -> 문자열
        const payload = JSON.parse(payloadJson);

        // 현재 시간과 exp 비교
        const now = Math.floor(Date.now() / 1000); // 초 단위
        return payload.exp < now; // true면 만료
    } catch (err) {
        console.error("JWT 디코딩 실패:", err);
        return true; // 디코딩 오류는 만료로 간주
    }
} 

/*
function parseJwt(token) {
    if(token == ''){
        return;
    }

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );

    return JSON.parse(jsonPayload);
}
*/

function parseJwt(token) {

    if (!token || typeof token !== "string") {
        return null;
    }

    try {
        const parts = token.split(".");

        if (parts.length !== 3) {
            return null;
        }

        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(c =>
                    "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                )
                .join("")
        );

        return JSON.parse(jsonPayload);

    } catch (error) {
        console.error("JWT 파싱 실패:", error);
        return null;
    }
}

function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}

function popupLayer(id = '', close_btn = false) {

    const popupId = id ? `id="${id}"` : '';
    const closeButton = close_btn ? `
        <button type="button" id="popup_close">닫기</button>
        <div class="inner_wrapper"></div>
        ` : '';

    const layer = `
        <div ${popupId} class="popup_layer">
            <div class="wrapper">
                ${closeButton}
            </div>
        </div>
    `;

    const $layer = $(layer);
    $('body').append($layer);

    // 자기 자신만 닫기
    $layer.on("click", "#popup_close", function () {
        $layer.remove();
    });

    //return $layer; // 필요하면 외부에서 제어 가능
}

function myProfile(userId, callback) {
    $.ajax({
        url: `${SPRING_BOOT_URL}/zero9/users/${Number(userId)}/profile`,
        method: "GET",
        contentType: "application/json",
        headers: {
            Authorization: ACCESS_TOKEN
        },
        success: function (res) {
            callback(res.data);
        },
        error: function (jqXHR) {
            console.error("프로필 조회 실패:", jqXHR.responseJSON || jqXHR);

            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                alert(jqXHR.responseJSON.message);
            } else {
                alert("프로필 조회 중 오류가 발생했습니다.");
            }
        }
    });
}