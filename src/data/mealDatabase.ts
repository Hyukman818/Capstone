export interface Meal {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
  sodium: number; // mg
  ingredients: string[];
  instructions: string[];
  prepTime: number; // minutes
  tags: string[];
  imageUrl?: string;
}

export const meals: Meal[] = [
  // ===== 저나트륨식 (Low Sodium) =====
  {
    id: 'low-sodium-breakfast-1',
    name: '무염 닭가슴살 샐러드',
    category: 'breakfast',
    calories: 320,
    protein: 35,
    carbs: 25,
    fat: 8,
    fiber: 6,
    sodium: 180,
    ingredients: [
      '닭가슴살 120g',
      '양상추 50g',
      '방울토마토 8개',
      '오이 1/2개',
      '올리브유 1큰술',
      '레몬즙 1큰술',
      '현미밥 100g'
    ],
    instructions: [
      '1. 닭가슴살을 소금 없이 삶아주세요',
      '2. 채소를 깨끗이 씻어 먹기 좋게 썰어주세요',
      '3. 올리브유와 레몬즙을 섞어 드레싱을 만드세요',
      '4. 닭가슴살을 찢어 채소와 함께 담고 드레싱을 뿌려주세요',
      '5. 현미밥과 함께 드세요'
    ],
    prepTime: 20,
    tags: ['저나트륨', '고단백', '다이어트', '아침식사']
  },
  {
    id: 'low-sodium-lunch-1',
    name: '저염 두부 야채볶음',
    category: 'lunch',
    calories: 380,
    protein: 22,
    carbs: 45,
    fat: 12,
    fiber: 8,
    sodium: 220,
    ingredients: [
      '두부 1/2모',
      '브로콜리 100g',
      '당근 50g',
      '양파 1/4개',
      '마늘 2쪽',
      '올리브유 1큰술',
      '저염간장 1작은술',
      '현미밥 150g'
    ],
    instructions: [
      '1. 두부는 물기를 제거하고 큼직하게 썰어주세요',
      '2. 브로콜리는 한입 크기로, 당근과 양파는 얇게 썰어주세요',
      '3. 팬에 올리브유를 두르고 마늘을 볶다가 두부를 넣어 노릇하게 구워주세요',
      '4. 야채를 넣고 볶다가 저염간장으로 간을 해주세요',
      '5. 현미밥과 함께 담아내세요'
    ],
    prepTime: 25,
    tags: ['저나트륨', '채식', '건강식', '점심식사']
  },
  {
    id: 'low-sodium-dinner-1',
    name: '무염 생선구이 정식',
    category: 'dinner',
    calories: 420,
    protein: 38,
    carbs: 48,
    fat: 10,
    fiber: 7,
    sodium: 250,
    ingredients: [
      '고등어 1토막',
      '시금치 100g',
      '된장 1작은술 (저염)',
      '마늘 2쪽',
      '참기름 약간',
      '현미밥 150g',
      '김 2장'
    ],
    instructions: [
      '1. 고등어는 깨끗이 씻어 물기를 제거하세요',
      '2. 소금 대신 레몬즙을 뿌려 10분간 재워주세요',
      '3. 그릴이나 팬에 기름 없이 고등어를 구워주세요',
      '4. 시금치는 데쳐서 마늘과 참기름으로 무쳐주세요',
      '5. 현미밥, 생선구이, 시금치나물, 김과 함께 상차림하세요'
    ],
    prepTime: 30,
    tags: ['저나트륨', '고단백', '오메가3', '저녁식사']
  },

  // ===== 혈당 관리식 (Low Glycemic) =====
  {
    id: 'low-gi-breakfast-1',
    name: '귀리죽과 견과류',
    category: 'breakfast',
    calories: 350,
    protein: 12,
    carbs: 52,
    fat: 11,
    fiber: 10,
    sodium: 120,
    ingredients: [
      '귀리 50g',
      '우유 200ml (무가당)',
      '아몬드 10알',
      '호두 5알',
      '블루베리 50g',
      '계피가루 약간'
    ],
    instructions: [
      '1. 냄비에 귀리와 우유를 넣고 중불에서 끓여주세요',
      '2. 저어가며 5-7분간 끓여 걸쭉하게 만드세요',
      '3. 그릇에 담고 견과류와 블루베리를 올려주세요',
      '4. 계피가루를 살짝 뿌려 완성하세요'
    ],
    prepTime: 15,
    tags: ['저GI', '고섬유', '혈당관리', '아침식사']
  },
  {
    id: 'low-gi-lunch-1',
    name: '렌틸콩 현미밥',
    category: 'lunch',
    calories: 410,
    protein: 18,
    carbs: 68,
    fat: 6,
    fiber: 15,
    sodium: 280,
    ingredients: [
      '렌틸콩 50g',
      '현미 80g',
      '양파 1/4개',
      '당근 50g',
      '시금치 80g',
      '마늘 2쪽',
      '올리브유 1작은술'
    ],
    instructions: [
      '1. 렌틸콩은 미리 불려주세요 (1-2시간)',
      '2. 현미와 렌틸콩을 함께 밥솥에 넣고 밥을 지어주세요',
      '3. 양파, 당근은 잘게 다져 올리브유에 볶아주세요',
      '4. 시금치는 데쳐서 마늘과 함께 무쳐주세요',
      '5. 렌틸콩 현미밥에 볶은 야채와 시금치를 곁들여 드세요'
    ],
    prepTime: 40,
    tags: ['저GI', '고섬유', '식물성단백질', '점심식사']
  },
  {
    id: 'low-gi-dinner-1',
    name: '닭가슴살 퀴노아 볼',
    category: 'dinner',
    calories: 430,
    protein: 42,
    carbs: 45,
    fat: 10,
    fiber: 8,
    sodium: 320,
    ingredients: [
      '닭가슴살 150g',
      '퀴노아 70g',
      '브로콜리 100g',
      '파프리카 1/2개',
      '아보카도 1/4개',
      '레몬 1/4개',
      '올리브유 1큰술'
    ],
    instructions: [
      '1. 퀴노아는 씻어서 물과 함께 15분간 삶아주세요',
      '2. 닭가슴살은 올리브유로 구워 한입 크기로 썰어주세요',
      '3. 브로콜리는 찌고, 파프리카는 깍둑썰기 하세요',
      '4. 그릇에 퀴노아를 담고 닭가슴살, 채소, 아보카도를 예쁘게 담아주세요',
      '5. 레몬즙을 뿌려 드세요'
    ],
    prepTime: 30,
    tags: ['저GI', '고단백', '슈퍼푸드', '저녁식사']
  },

  // ===== 칼로리 제한식 (Low Calorie) =====
  {
    id: 'low-cal-breakfast-1',
    name: '그릭 요거트 과일 볼',
    category: 'breakfast',
    calories: 280,
    protein: 20,
    carbs: 35,
    fat: 6,
    fiber: 5,
    sodium: 90,
    ingredients: [
      '그릭 요거트 150g (무가당)',
      '딸기 80g',
      '바나나 1/2개',
      '블루베리 30g',
      '치아씨드 1큰술',
      '꿀 1작은술'
    ],
    instructions: [
      '1. 그릭 요거트를 그릇에 담아주세요',
      '2. 딸기와 바나나는 먹기 좋게 썰어주세요',
      '3. 요거트 위에 과일과 블루베리를 올려주세요',
      '4. 치아씨드를 뿌리고 꿀을 살짝 뿌려 완성하세요'
    ],
    prepTime: 10,
    tags: ['저칼로리', '고단백', '다이어트', '아침식사']
  },
  {
    id: 'low-cal-lunch-1',
    name: '곤약 샐러드',
    category: 'lunch',
    calories: 220,
    protein: 15,
    carbs: 28,
    fat: 5,
    fiber: 12,
    sodium: 200,
    ingredients: [
      '곤약면 200g',
      '참치(물) 1캔',
      '양배추 100g',
      '오이 1/2개',
      '방울토마토 10개',
      '올리브유 1작은술',
      '식초 1큰술'
    ],
    instructions: [
      '1. 곤약면은 끓는 물에 데쳐 물기를 빼주세요',
      '2. 양배추와 오이는 채썰고, 방울토마토는 반으로 자르세요',
      '3. 참치는 물기를 빼주세요',
      '4. 모든 재료를 섞고 올리브유와 식초로 드레싱하세요',
      '5. 잘 버무려 드세요'
    ],
    prepTime: 15,
    tags: ['저칼로리', '다이어트', '포만감', '점심식사']
  },
  {
    id: 'low-cal-dinner-1',
    name: '두부 스테이크',
    category: 'dinner',
    calories: 310,
    protein: 28,
    carbs: 25,
    fat: 12,
    fiber: 6,
    sodium: 240,
    ingredients: [
      '두부 1모',
      '양송이버섯 5개',
      '브로콜리 100g',
      '마늘 3쪽',
      '올리브유 1큰술',
      '간장 1작은술',
      '후추 약간'
    ],
    instructions: [
      '1. 두부는 물기를 빼고 2cm 두께로 썰어주세요',
      '2. 팬에 올리브유를 두르고 두부를 노릇하게 구워주세요',
      '3. 버섯과 브로콜리는 찌거나 볶아주세요',
      '4. 마늘은 얇게 슬라이스해서 볶아 두부 위에 올려주세요',
      '5. 간장과 후추로 간을 해서 드세요'
    ],
    prepTime: 20,
    tags: ['저칼로리', '고단백', '채식', '저녁식사']
  },

  // ===== 균형식 (Balanced) =====
  {
    id: 'balanced-breakfast-1',
    name: '한식 정통 아침',
    category: 'breakfast',
    calories: 480,
    protein: 22,
    carbs: 68,
    fat: 12,
    fiber: 8,
    sodium: 450,
    ingredients: [
      '현미밥 150g',
      '된장찌개 1그릇',
      '두부 50g',
      '김 2장',
      '계란 1개',
      '시금치나물 80g',
      '깍두기 30g'
    ],
    instructions: [
      '1. 현미밥을 지어주세요',
      '2. 된장찌개를 끓여주세요 (두부, 애호박, 버섯 넣기)',
      '3. 계란은 반숙으로 삶아주세요',
      '4. 시금치는 데쳐서 참기름과 마늘로 무쳐주세요',
      '5. 밥, 찌개, 반찬을 함께 상차림하세요'
    ],
    prepTime: 30,
    tags: ['균형식', '한식', '전통', '아침식사']
  },
  {
    id: 'balanced-lunch-1',
    name: '잡곡밥 비빔밥',
    category: 'lunch',
    calories: 520,
    protein: 24,
    carbs: 78,
    fat: 14,
    fiber: 10,
    sodium: 480,
    ingredients: [
      '잡곡밥 180g',
      '소고기 80g',
      '시금치 50g',
      '당근 50g',
      '콩나물 80g',
      '고사리 50g',
      '계란 1개',
      '고추장 1큰술',
      '참기름 1작은술'
    ],
    instructions: [
      '1. 잡곡밥을 지어주세요',
      '2. 소고기는 양념해서 볶아주세요',
      '3. 시금치, 당근, 콩나물, 고사리 각각 나물로 무쳐주세요',
      '4. 계란은 노른자만 익혀 지단을 만드세요',
      '5. 그릇에 밥을 담고 나물과 고기, 계란을 올린 후 고추장과 참기름을 넣어 비벼 드세요'
    ],
    prepTime: 40,
    tags: ['균형식', '한식', '영양만점', '점심식사']
  },
  {
    id: 'balanced-dinner-1',
    name: '삼치구이 정식',
    category: 'dinner',
    calories: 500,
    protein: 35,
    carbs: 55,
    fat: 16,
    fiber: 7,
    sodium: 420,
    ingredients: [
      '삼치 1토막',
      '현미밥 150g',
      '미역국 1그릇',
      '깻잎무침 80g',
      '무생채 50g',
      '김치 30g'
    ],
    instructions: [
      '1. 삼치는 소금으로 살짝 간한 후 구워주세요',
      '2. 미역국을 끓여주세요',
      '3. 깻잎은 양념장에 무쳐주세요',
      '4. 무는 채썰어 새콤달콤하게 무쳐주세요',
      '5. 밥, 국, 생선, 반찬을 함께 차려내세요'
    ],
    prepTime: 35,
    tags: ['균형식', '한식', '생선요리', '저녁식사']
  },

  // ===== 추가 메뉴들 =====
  {
    id: 'low-sodium-breakfast-2',
    name: '오트밀 과일 컵',
    category: 'breakfast',
    calories: 290,
    protein: 10,
    carbs: 48,
    fat: 7,
    fiber: 8,
    sodium: 95,
    ingredients: [
      '오트밀 40g',
      '무가당 우유 150ml',
      '바나나 1/2개',
      '사과 1/4개',
      '견과류 10g',
      '계피가루 약간'
    ],
    instructions: [
      '1. 오트밀에 우유를 부어 전날 밤 냉장고에 넣어두세요',
      '2. 아침에 꺼내 바나나와 사과를 썰어 올려주세요',
      '3. 견과류를 부숴서 뿌려주세요',
      '4. 계피가루로 풍미를 더해주세요'
    ],
    prepTime: 10,
    tags: ['저나트륨', '간편식', '오버나잇', '아침식사']
  },
  {
    id: 'low-gi-breakfast-2',
    name: '통밀 토스트 아보카도',
    category: 'breakfast',
    calories: 340,
    protein: 14,
    carbs: 38,
    fat: 16,
    fiber: 12,
    sodium: 220,
    ingredients: [
      '통밀빵 2조각',
      '아보카도 1/2개',
      '삶은 계란 1개',
      '방울토마토 5개',
      '올리브유 약간',
      '후추 약간'
    ],
    instructions: [
      '1. 통밀빵을 살짝 구워주세요',
      '2. 아보카도는 으깨서 빵에 펴 발라주세요',
      '3. 삶은 계란을 슬라이스해서 올려주세요',
      '4. 방울토마토를 반으로 잘라 올리고 후추를 뿌려주세요'
    ],
    prepTime: 10,
    tags: ['저GI', '건강한지방', '간편식', '아침식사']
  },
  {
    id: 'low-cal-breakfast-2',
    name: '채소 오믈렛',
    category: 'breakfast',
    calories: 250,
    protein: 18,
    carbs: 15,
    fat: 14,
    fiber: 4,
    sodium: 280,
    ingredients: [
      '계란 2개',
      '양파 1/4개',
      '파프리카 1/4개',
      '시금치 30g',
      '토마토 1/2개',
      '올리브유 1작은술'
    ],
    instructions: [
      '1. 계란을 풀어 소금 후추로 간해주세요',
      '2. 야채는 잘게 다져주세요',
      '3. 팬에 올리브유를 두르고 야채를 볶아주세요',
      '4. 계란물을 부어 저어가며 익혀주세요',
      '5. 반으로 접어 완성하세요'
    ],
    prepTime: 15,
    tags: ['저칼로리', '고단백', '야채듬뿍', '아침식사']
  },
  {
    id: 'balanced-breakfast-2',
    name: '연어 아보카도 볼',
    category: 'breakfast',
    calories: 450,
    protein: 28,
    carbs: 38,
    fat: 22,
    fiber: 8,
    sodium: 380,
    ingredients: [
      '훈제연어 80g',
      '아보카도 1/2개',
      '현미밥 100g',
      '계란 1개',
      '방울토마토 5개',
      '레몬 1/4개'
    ],
    instructions: [
      '1. 현미밥을 그릇에 담아주세요',
      '2. 훈제연어와 슬라이스한 아보카도를 올려주세요',
      '3. 계란은 반숙으로 삶아 올려주세요',
      '4. 방울토마토를 곁들이고 레몬즙을 뿌려주세요'
    ],
    prepTime: 15,
    tags: ['균형식', '오메가3', '영양만점', '아침식사']
  },
  {
    id: 'low-sodium-lunch-2',
    name: '무염 야채 쌈밥',
    category: 'lunch',
    calories: 390,
    protein: 16,
    carbs: 62,
    fat: 10,
    fiber: 10,
    sodium: 150,
    ingredients: [
      '현미밥 150g',
      '상추 10장',
      '깻잎 10장',
      '오이 1개',
      '당근 1/2개',
      '된장 1작은술 (저염)',
      '고추장 1작은술 (저염)'
    ],
    instructions: [
      '1. 현미밥을 지어주세요',
      '2. 상추와 깻잎은 깨끗이 씻어 물기를 빼주세요',
      '3. 오이와 당근은 채썰어 주세요',
      '4. 된장과 고추장을 섞어 쌈장을 만드세요',
      '5. 쌈채소에 밥과 야채를 싸서 드세요'
    ],
    prepTime: 20,
    tags: ['저나트륨', '채식', '한식', '점심식사']
  },
  {
    id: 'low-gi-lunch-2',
    name: '병아리콩 카레',
    category: 'lunch',
    calories: 420,
    protein: 16,
    carbs: 72,
    fat: 8,
    fiber: 14,
    sodium: 320,
    ingredients: [
      '병아리콩 100g (삶은 것)',
      '현미 80g',
      '양파 1/2개',
      '토마토 1개',
      '카레가루 2큰술',
      '코코넛밀크 100ml',
      '브로콜리 80g'
    ],
    instructions: [
      '1. 현미밥을 지어주세요',
      '2. 양파와 토마토는 잘게 다져 볶아주세요',
      '3. 병아리콩과 카레가루를 넣고 볶다가 코코넛밀크를 부어주세요',
      '4. 브로콜리를 넣고 10분간 끓여주세요',
      '5. 현미밥에 카레를 얹어 드세요'
    ],
    prepTime: 30,
    tags: ['저GI', '식물성단백질', '커리', '점심식사']
  },
  {
    id: 'low-cal-lunch-2',
    name: '새우 야채 볶음',
    category: 'lunch',
    calories: 280,
    protein: 32,
    carbs: 22,
    fat: 7,
    fiber: 6,
    sodium: 380,
    ingredients: [
      '새우 150g',
      '브로콜리 100g',
      '파프리카 1개',
      '양파 1/4개',
      '마늘 3쪽',
      '올리브유 1작은술',
      '레몬 1/4개'
    ],
    instructions: [
      '1. 새우는 깨끗이 손질해주세요',
      '2. 야채는 먹기 좋게 썰어주세요',
      '3. 팬에 올리브유를 두르고 마늘을 볶다가 새우를 넣어주세요',
      '4. 새우가 익으면 야채를 넣고 센 불에서 빠르게 볶아주세요',
      '5. 레몬즙을 뿌려 완성하세요'
    ],
    prepTime: 20,
    tags: ['저칼로리', '고단백', '해산물', '점심식사']
  },
  {
    id: 'balanced-lunch-2',
    name: '제육볶음 정식',
    category: 'lunch',
    calories: 550,
    protein: 32,
    carbs: 70,
    fat: 16,
    fiber: 8,
    sodium: 520,
    ingredients: [
      '돼지고기 100g',
      '양파 1/2개',
      '대파 1대',
      '고추장 1큰술',
      '간장 1작은술',
      '현미밥 150g',
      '상추 5장'
    ],
    instructions: [
      '1. 돼지고기는 고추장 양념에 재워주세요',
      '2. 양파와 대파는 먹기 좋게 썰어주세요',
      '3. 팬에 고기를 볶다가 야채를 넣어 함께 볶아주세요',
      '4. 현미밥과 상추를 준비하세요',
      '5. 상추에 밥과 제육을 싸서 드세요'
    ],
    prepTime: 25,
    tags: ['균형식', '한식', '매콤', '점심식사']
  },
  {
    id: 'low-sodium-dinner-2',
    name: '허브 닭가슴살 스테이크',
    category: 'dinner',
    calories: 380,
    protein: 42,
    carbs: 32,
    fat: 10,
    fiber: 6,
    sodium: 200,
    ingredients: [
      '닭가슴살 150g',
      '로즈마리 약간',
      '타임 약간',
      '마늘 3쪽',
      '올리브유 1큰술',
      '고구마 150g',
      '브로콜리 100g'
    ],
    instructions: [
      '1. 닭가슴살에 허브와 마늘을 문질러 30분간 재워주세요',
      '2. 고구마는 찌고, 브로콜리는 데쳐주세요',
      '3. 팬에 올리브유를 두르고 닭가슴살을 구워주세요',
      '4. 닭가슴살은 슬라이스해주세요',
      '5. 고구마, 브로콜리와 함께 담아내세요'
    ],
    prepTime: 40,
    tags: ['저나트륨', '고단백', '허브', '저녁식사']
  },
  {
    id: 'low-gi-dinner-2',
    name: '연두부 샐러드',
    category: 'dinner',
    calories: 320,
    protein: 18,
    carbs: 38,
    fat: 12,
    fiber: 10,
    sodium: 240,
    ingredients: [
      '연두부 1팩',
      '양상추 100g',
      '오이 1개',
      '방울토마토 10개',
      '견과류 20g',
      '올리브유 1큰술',
      '발사믹 식초 1큰술'
    ],
    instructions: [
      '1. 연두부는 물기를 빼주세요',
      '2. 채소는 깨끗이 씻어 먹기 좋게 썰어주세요',
      '3. 올리브유와 발사믹 식초로 드레싱을 만드세요',
      '4. 그릇에 채소를 담고 연두부를 올려주세요',
      '5. 견과류를 뿌리고 드레싱을 부어 드세요'
    ],
    prepTime: 15,
    tags: ['저GI', '저칼로리', '채식', '저녁식사']
  },
  {
    id: 'low-cal-dinner-2',
    name: '백김치 닭가슴살볶음',
    category: 'dinner',
    calories: 290,
    protein: 38,
    carbs: 20,
    fat: 8,
    fiber: 4,
    sodium: 420,
    ingredients: [
      '닭가슴살 150g',
      '백김치 100g',
      '양파 1/4개',
      '대파 1/2대',
      '참기름 1작은술',
      '깨 약간'
    ],
    instructions: [
      '1. 닭가슴살은 한입 크기로 썰어주세요',
      '2. 백김치는 물기를 짜고, 양파와 대파는 썰어주세요',
      '3. 팬에 닭가슴살을 볶다가 익으면 백김치를 넣어주세요',
      '4. 양파와 대파를 넣고 볶아주세요',
      '5. 참기름과 깨를 뿌려 완성하세요'
    ],
    prepTime: 20,
    tags: ['저칼로리', '고단백', '김치', '저녁식사']
  },
  {
    id: 'balanced-dinner-2',
    name: '소고기 미역국 정식',
    category: 'dinner',
    calories: 490,
    protein: 30,
    carbs: 58,
    fat: 14,
    fiber: 6,
    sodium: 460,
    ingredients: [
      '소고기 80g',
      '미역 20g',
      '마늘 3쪽',
      '참기름 1큰술',
      '간장 1큰술',
      '현미밥 150g',
      '김치 30g'
    ],
    instructions: [
      '1. 미역은 물에 불려 먹기 좋게 썰어주세요',
      '2. 소고기는 참기름에 볶다가 미역을 넣어주세요',
      '3. 물을 붓고 간장과 마늘로 간을 해서 끓여주세요',
      '4. 현미밥을 준비하세요',
      '5. 밥, 미역국, 김치를 함께 상차림하세요'
    ],
    prepTime: 30,
    tags: ['균형식', '한식', '국물요리', '저녁식사']
  },

  // ===== 간식 =====
  {
    id: 'snack-1',
    name: '견과류 믹스',
    category: 'snack',
    calories: 180,
    protein: 6,
    carbs: 12,
    fat: 14,
    fiber: 4,
    sodium: 10,
    ingredients: [
      '아몬드 10알',
      '호두 5알',
      '캐슈넛 8알',
      '건포도 1큰술'
    ],
    instructions: [
      '1. 견과류를 한 줌 정도 덜어주세요',
      '2. 건포도를 섞어주세요',
      '3. 간식으로 즐기세요'
    ],
    prepTime: 2,
    tags: ['간식', '건강한지방', '간편식']
  },
  {
    id: 'snack-2',
    name: '사과 땅콩버터',
    category: 'snack',
    calories: 200,
    protein: 8,
    carbs: 24,
    fat: 10,
    fiber: 5,
    sodium: 80,
    ingredients: [
      '사과 1개',
      '땅콩버터 1큰술 (무가당)',
      '계피가루 약간'
    ],
    instructions: [
      '1. 사과는 깨끗이 씻어 슬라이스하세요',
      '2. 땅콩버터를 발라주세요',
      '3. 계피가루를 살짝 뿌려주세요'
    ],
    prepTime: 5,
    tags: ['간식', '과일', '단백질']
  },
  {
    id: 'snack-3',
    name: '삶은 계란',
    category: 'snack',
    calories: 140,
    protein: 12,
    carbs: 2,
    fat: 10,
    fiber: 0,
    sodium: 140,
    ingredients: [
      '계란 2개',
      '소금 약간'
    ],
    instructions: [
      '1. 계란을 냄비에 넣고 물을 부어주세요',
      '2. 끓으면 중불로 줄여 10분간 삶아주세요',
      '3. 찬물에 식혀 껍질을 벗겨주세요',
      '4. 소금을 살짝 뿌려 드세요'
    ],
    prepTime: 15,
    tags: ['간식', '고단백', '간편식']
  },
  {
    id: 'snack-4',
    name: '당근 스틱',
    category: 'snack',
    calories: 80,
    protein: 2,
    carbs: 18,
    fat: 1,
    fiber: 6,
    sodium: 120,
    ingredients: [
      '당근 1개',
      '후무스 2큰술'
    ],
    instructions: [
      '1. 당근을 깨끗이 씻어 스틱 모양으로 썰어주세요',
      '2. 후무스를 곁들여 드세요'
    ],
    prepTime: 5,
    tags: ['간식', '야채', '저칼로리']
  },
  {
    id: 'snack-5',
    name: '단호박 스낵',
    category: 'snack',
    calories: 120,
    protein: 2,
    carbs: 28,
    fat: 1,
    fiber: 4,
    sodium: 8,
    ingredients: [
      '단호박 150g',
      '계피가루 약간'
    ],
    instructions: [
      '1. 단호박을 한입 크기로 썰어주세요',
      '2. 전자레인지에 5분간 돌려주세요',
      '3. 계피가루를 뿌려 드세요'
    ],
    prepTime: 7,
    tags: ['간식', '자연식', '달콤']
  }
];

/**
 * 태그로 식사 필터링
 */
export function getMealsByTags(tags: string[]): Meal[] {
  return meals.filter(meal =>
    tags.some(tag => meal.tags.includes(tag))
  );
}

/**
 * 카테고리로 식사 필터링
 */
export function getMealsByCategory(category: Meal['category']): Meal[] {
  return meals.filter(meal => meal.category === category);
}

/**
 * ID로 식사 찾기
 */
export function getMealById(id: string): Meal | undefined {
  return meals.find(meal => meal.id === id);
}
