interface ICategoryItem {
  [key: string]: any;
  vegetables: string[];
  fruit: string[];
  fish: string[];
  meat: string[];
  main: string[];
  salad: string[];
  noodle: string[];
  drink: string[];
  cookie: string[];
  bakery: string[];
  healthy: string[];
  wine: string[];
  traditionalAlcohol: string[];
  living: string[];
  skin: string[];
  hairbody: string[];
  kitchen: string[];
  home: string[];
  animal: string[];
  baby: string[];
}

interface ICategoryItemKey {
  [key: string]: any;
  vegetables: string;
  fruit: string;
  fish: string;
  meat: string;
  main: string;
  salad: string;
  noodle: string;
  drink: string;
  cookie: string;
  bakery: string;
  healthy: string;
  wine: string;
  traditionalAlcohol: string;
  living: string;
  skin: string;
  hairbody: string;
  kitchen: string;
  home: string;
  animal: string;
  baby: string;
}
interface ImainCategoryApiId {
  [key: string]: number;
  vegetables: number;
  fruit: number;
  fish: number;
  meat: number;
  main: number;
  salad: number;
  drink: number;
}

interface IsubCategoryApiId {
  [key: string]: number[];
  vegetables: number[];
  fruit: number[];
  fish: number[];
}

export const mainCategoryApiId: ImainCategoryApiId = {
  vegetables: 1,
  fruit: 2,
  fish: 3,
  meat: 4,
  main: 5,
  salad: 6,
  drink: 7,
};

export const subCategoryApiId: IsubCategoryApiId = {
  vegetables: [14, 12, 13, 15, 19, 20, 21, 22],
  fruit: [16, 25, 17, 18, 26, 27, 29, 30],
  fish: [8, 9, 10, 11],
};

export const categoryIdKey: ICategoryItemKey = {
  vegetables: "채소",
  fruit: "과일•견과•쌀",
  fish: "수산•해산•건어물",
  meat: "정육•계란",
  main: "국•반찬•메인요리",
  salad: "셀러드•간편식",
  noodle: "면•양념•오일",
  drink: "생수•음료•우유•커피",
  cookie: "간식•과자•떡",
  bakery: "베이커리•치즈•델리",
  healthy: "건강식품",
  wine: "와인",
  traditionalAlcohol: "전통주",
  living: "생활용품•리빙•캠프",
  skin: "스킨케어•메이크업",
  hairbody: "헤어•바디•구강",
  kitchen: "주방용품",
  home: "가전제품",
  animal: "반려동물",
  baby: "베이비•키즈•완구",
};

const category: ICategoryItem = {
  vegetables: [
    "친환경",
    "고구마•감자•당근",
    "시금치•쌈채소•나물",
    "브로콜리•파프리카•양배추",
    "양파•대파•마늘•배추",
    "오이•호박•고추",
    "냉동•이색•간편채소",
    "콩나물•버섯",
  ],
  fruit: [
    "친환경",
    "제철과일",
    "국산과일",
    "수입과일",
    "간편과일",
    "냉동•건과일",
    "견과류",
    "쌀•잡곡",
  ],
  fish: [
    "제철수산",
    "생선류",
    "굴비•반건류",
    "오징어•낙지•문어",
    "새우•게•랍스터",
    "해산물•조개류",
    "수산가공품",
    "김•미역•해조류",
  ],
  meat: [
    "국내산 소고기",
    "수입산 소고기",
    "돼지고기",
    "계란류",
    "닭•오리고기",
    "양념육•돈까스",
    "양고기",
  ],
  main: [
    "국•탕•찌개",
    "밀키트•메인요리",
    "밑반찬",
    "김치•젓갈•장류",
    "두부•어묵•부침개",
    "베이컨•햄•통조림",
  ],
  salad: [
    "샐러드•닭가슴살",
    "도시락•밥류",
    "파스타•면류",
    "떡볶이•튀김•순대",
    "피자•핫도그•만두",
    "폭립•떡갈비•안주",
    "죽•스프•카레",
    "선식•시리얼",
  ],
  noodle: [
    "파스타•면류",
    "식초•소스•드레싱",
    "양념•액젓•장류",
    "식용유•참기름•오일",
    "소금•설탕•향신료",
    "밀가루•가루•믹스",
  ],
  drink: ["생수•탄산수", "음료•주스", "우유•두유•요거트", "커피", "차"],
  cookie: ["과자•스낵•쿠키", "초콜릿•젤리•캔디", "떡•한과", "아이스크림"],
  bakery: [
    "식빵•빵류",
    "잼•버터•스프레드",
    "케이크•파이•디저트",
    "치즈",
    "델리",
    "올리브•피클",
  ],
  healthy: [
    "영양제",
    "유산균",
    "홍삼•인삼•꿀",
    "건강즙•건강음료",
    "건강분말•건강환",
    "다이어트•이너뷰티",
    "유아동",
  ],
  wine: ["레드와인", "화이트와인", "샴페인•스파클링"],
  traditionalAlcohol: ["막걸리•약주", "증류주•과실주"],
  living: [
    "휴지•티슈",
    "여성•위생용품",
    "세제•청소용품",
    "화훼•인테리어 소품",
    "의약외품•마스크",
    "생활잡화•문구",
    "캠핑용품",
  ],
  skin: [
    "스킨•미스트•패드",
    "에센스•엠플•로션",
    "크림•오일",
    "클렌징",
    "마스크팩",
    "선케어",
    "메이크업",
    "맨즈케어",
    "뷰티소품•기기",
  ],
  hairbody: [
    "구강•면도",
    "샴푸•컨디셔너",
    "트리트먼트•팩",
    "헤어에센스•염모",
    "바디워시•스크럼",
    "바디로션•크림",
    "핸드•립•데오",
    "향수•디퓨저",
    "헤어•바디소품",
  ],
  kitchen: [
    "주방소모품•잡화",
    "주방•조리도구",
    "냄비•팬•솥",
    "보관용기•텀블러",
    "식기•테이블웨어",
    "컵•잔•커피도구",
  ],
  home: ["주방가전", "생활가전", "계절가전", "디지털•PC", "대형•설치가전"],
  animal: [
    "강아지 간식",
    "강아지 주식",
    "고양이 간식",
    "고양이 주식",
    "반려동물 용품",
    "배변•위생",
  ],
  baby: [
    "분유•간편 이유식",
    "이유식 재료",
    "간식•음식•음료",
    "건강식품",
    "이유•수유용품",
    "기저귀•물티슈",
    "세제•위생용품",
    "스킨•구강케어",
    "완구•잡화류",
  ],
};

export default category;
