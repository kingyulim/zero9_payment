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

function parseJwt(token) {
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

function getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
}