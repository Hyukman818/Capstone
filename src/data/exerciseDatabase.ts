export interface Exercise {
  id: string;
  name: string;
  description: string;
  type: 'cardio' | 'strength' | 'flexibility';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sets?: number;
  reps?: number;
  duration?: number; // minutes for cardio
  rest: number; // seconds between sets
  calories: number; // estimated calories burned
  targetMuscles: string[];
  instructions: string[];
  videoUrl?: string;
  imageUrl?: string;
  precautions: string[];
  tags: string[];
}

export interface WorkoutRoutine {
  id: string;
  name: string;
  description: string;
  totalDuration: number; // minutes
  exercises: Exercise[];
  frequency: string;
}

export const exercises: Exercise[] = [
  // 초급 유산소 운동
  {
    id: 'cardio-beginner-1',
    name: '걷기',
    description: '가장 기본적인 유산소 운동으로 누구나 쉽게 시작할 수 있습니다',
    type: 'cardio',
    difficulty: 'beginner',
    duration: 30,
    rest: 0,
    calories: 150,
    targetMuscles: ['하체 전반', '심혈관계'],
    instructions: [
      '편안한 운동화를 착용하세요',
      '허리를 곧게 펴고 시선은 전방을 향합니다',
      '팔을 자연스럽게 흔들며 걷습니다',
      '처음에는 평지에서 시작하고 익숙해지면 경사로를 추가합니다',
      '30분 동안 꾸준한 속도를 유지합니다'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example-walking',
    precautions: [
      '발에 통증이 느껴지면 즉시 중단하세요',
      '충분한 수분을 섭취하세요',
      '무리하지 말고 자신의 페이스를 유지하세요'
    ],
    tags: ['초급', '유산소', '실외', '저강도']
  },
  {
    id: 'cardio-beginner-2',
    name: '제자리 걷기',
    description: '실내에서 할 수 있는 간단한 유산소 운동',
    type: 'cardio',
    difficulty: 'beginner',
    duration: 20,
    rest: 0,
    calories: 100,
    targetMuscles: ['하체', '심혈관계'],
    instructions: [
      '발을 어깨 너비로 벌립니다',
      '제자리에서 무릎을 들어올리며 걷기 동작을 합니다',
      '팔을 자연스럽게 흔들어줍니다',
      '호흡을 규칙적으로 유지합니다',
      '20분 동안 일정한 리듬을 유지합니다'
    ],
    precautions: [
      '딱딱한 바닥은 피하고 매트를 사용하세요',
      '무릎에 무리가 가지 않도록 주의하세요'
    ],
    tags: ['초급', '유산소', '실내', '저강도']
  },

  // 중급 유산소 운동
  {
    id: 'cardio-intermediate-1',
    name: '조깅',
    description: '중강도 유산소 운동으로 심폐 기능을 향상시킵니다',
    type: 'cardio',
    difficulty: 'intermediate',
    duration: 30,
    rest: 0,
    calories: 300,
    targetMuscles: ['하체', '심혈관계', '코어'],
    instructions: [
      '5분간 가벼운 걷기로 워밍업합니다',
      '발뒤꿈치부터 착지하고 발끝으로 밀어냅니다',
      '팔꿈치를 90도로 구부려 자연스럽게 흔듭니다',
      '호흡은 코로 들이마시고 입으로 내쉽니다',
      '마지막 5분은 속도를 줄여 쿨다운합니다'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example-jogging',
    precautions: [
      '관절에 무리가 가지 않도록 충격 흡수가 좋은 신발을 착용하세요',
      '무릎이나 발목에 통증이 있으면 중단하세요',
      '아스팔트보다는 흙길이나 트랙에서 하는 것이 좋습니다'
    ],
    tags: ['중급', '유산소', '실외', '중강도']
  },
  {
    id: 'cardio-intermediate-2',
    name: '자전거 타기',
    description: '관절에 부담이 적은 유산소 운동',
    type: 'cardio',
    difficulty: 'intermediate',
    duration: 40,
    rest: 0,
    calories: 350,
    targetMuscles: ['대퇴사두근', '햄스트링', '종아리', '심혈관계'],
    instructions: [
      '안장 높이를 적절하게 조절합니다',
      '페달을 밟을 때 무릎이 완전히 펴지지 않도록 합니다',
      '상체는 약간 숙이고 핸들을 가볍게 잡습니다',
      '처음 5분은 가볍게 페달링하며 워밍업합니다',
      '일정한 속도를 유지하며 40분간 지속합니다'
    ],
    precautions: [
      '안장이 너무 높거나 낮으면 무릎 부상 위험이 있습니다',
      '장시간 탈 때는 중간에 휴식을 취하세요',
      '교통 안전에 유의하세요'
    ],
    tags: ['중급', '유산소', '실외', '중강도']
  },
  {
    id: 'cardio-intermediate-3',
    name: '수영',
    description: '전신 운동이 가능한 유산소 운동',
    type: 'cardio',
    difficulty: 'intermediate',
    duration: 30,
    rest: 0,
    calories: 400,
    targetMuscles: ['전신', '심혈관계', '코어'],
    instructions: [
      '자유형으로 천천히 워밍업합니다',
      '호흡 타이밍을 일정하게 유지합니다',
      '팔과 다리의 동작을 조화롭게 합니다',
      '25m 수영 후 벽에서 잠깐 휴식합니다',
      '30분 동안 자신의 페이스를 유지합니다'
    ],
    precautions: [
      '수영 전 충분한 스트레칭을 하세요',
      '쥐가 나면 즉시 물 밖으로 나오세요',
      '식사 직후에는 피하세요'
    ],
    tags: ['중급', '유산소', '실내', '중강도', '전신']
  },

  // 고급 유산소 운동
  {
    id: 'cardio-advanced-1',
    name: '달리기',
    description: '고강도 유산소 운동으로 심폐 지구력을 극대화합니다',
    type: 'cardio',
    difficulty: 'advanced',
    duration: 30,
    rest: 0,
    calories: 400,
    targetMuscles: ['하체', '심혈관계', '코어'],
    instructions: [
      '5-10분간 가벼운 조깅으로 워밍업합니다',
      '자신의 목표 페이스를 설정합니다',
      '발의 중간 부분으로 착지합니다',
      '상체는 약간 앞으로 기울입니다',
      '일정한 호흡 패턴을 유지합니다',
      '마지막 5분은 천천히 속도를 줄입니다'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example-running',
    precautions: [
      '부상 방지를 위해 충분한 워밍업이 필수입니다',
      '통증이 느껴지면 즉시 중단하세요',
      '하루 이틀 간격을 두고 휴식을 취하세요'
    ],
    tags: ['고급', '유산소', '실외', '고강도']
  },
  {
    id: 'cardio-advanced-2',
    name: '인터벌 러닝',
    description: '고강도와 저강도를 반복하는 효과적인 운동',
    type: 'cardio',
    difficulty: 'advanced',
    duration: 25,
    rest: 0,
    calories: 450,
    targetMuscles: ['하체', '심혈관계', '코어'],
    instructions: [
      '5분간 가볍게 조깅하며 워밍업합니다',
      '1분간 전력 질주합니다',
      '2분간 가볍게 조깅하며 회복합니다',
      '이 패턴을 5-6회 반복합니다',
      '5분간 걸으며 쿨다운합니다'
    ],
    precautions: [
      '심장에 무리가 갈 수 있으니 건강 상태를 확인하세요',
      '초보자는 시도하지 마세요',
      '충분한 수분 섭취가 필요합니다'
    ],
    tags: ['고급', '유산소', '실외', '고강도', 'HIIT']
  },

  // 초급 근력 운동
  {
    id: 'strength-beginner-1',
    name: '스쿼트',
    description: '하체 전체를 강화하는 기본 운동',
    type: 'strength',
    difficulty: 'beginner',
    sets: 3,
    reps: 15,
    rest: 60,
    calories: 50,
    targetMuscles: ['대퇴사두근', '둔근', '햄스트링'],
    instructions: [
      '발을 어깨 너비로 벌리고 섭니다',
      '발끝은 약간 바깥쪽을 향하게 합니다',
      '무릎이 발끝을 넘지 않도록 주의하며 앉습니다',
      '허벅지가 바닥과 평행할 때까지 내려갑니다',
      '발뒤꿈치로 밀며 일어섭니다'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example-squat',
    precautions: [
      '무릎이 안쪽으로 모이지 않도록 주의하세요',
      '허리를 곧게 유지하세요',
      '무릎에 통증이 있으면 각도를 줄이세요'
    ],
    tags: ['초급', '근력', '하체', '맨몸']
  },
  {
    id: 'strength-beginner-2',
    name: '푸시업 (무릎 대고)',
    description: '상체 근력을 키우는 기본 운동',
    type: 'strength',
    difficulty: 'beginner',
    sets: 3,
    reps: 10,
    rest: 60,
    calories: 40,
    targetMuscles: ['가슴', '삼두근', '어깨'],
    instructions: [
      '무릎을 바닥에 대고 손은 어깨보다 약간 넓게 놓습니다',
      '몸을 일직선으로 유지합니다',
      '팔꿈치를 구부려 가슴이 바닥에 가까워질 때까지 내려갑니다',
      '팔을 펴며 원래 자세로 돌아옵니다',
      '호흡을 규칙적으로 유지합니다'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example-pushup',
    precautions: [
      '어깨가 아프면 손의 위치를 조정하세요',
      '허리가 꺾이지 않도록 코어에 힘을 주세요',
      '목이 과도하게 꺾이지 않도록 주의하세요'
    ],
    tags: ['초급', '근력', '상체', '맨몸']
  },
  {
    id: 'strength-beginner-3',
    name: '플랭크',
    description: '코어 근육을 강화하는 정적 운동',
    type: 'strength',
    difficulty: 'beginner',
    sets: 3,
    duration: 1, // 1분
    rest: 60,
    calories: 30,
    targetMuscles: ['복근', '코어', '어깨'],
    instructions: [
      '팔꿈치를 바닥에 대고 엎드립니다',
      '팔꿈치는 어깨 바로 아래에 위치합니다',
      '발끝으로 몸을 들어올립니다',
      '머리부터 발끝까지 일직선을 유지합니다',
      '30초-1분간 자세를 유지합니다'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example-plank',
    precautions: [
      '허리가 아래로 처지지 않도록 주의하세요',
      '엉덩이가 너무 높이 올라가지 않도록 하세요',
      '호흡을 멈추지 마세요'
    ],
    tags: ['초급', '근력', '코어', '맨몸', '정적']
  },
  {
    id: 'strength-beginner-4',
    name: '런지',
    description: '하체와 균형감각을 향상시키는 운동',
    type: 'strength',
    difficulty: 'beginner',
    sets: 3,
    reps: 10, // 각 다리
    rest: 60,
    calories: 45,
    targetMuscles: ['대퇴사두근', '둔근', '햄스트링'],
    instructions: [
      '발을 어깨 너비로 벌리고 섭니다',
      '한 발을 크게 앞으로 내딛습니다',
      '앞 무릎이 90도가 될 때까지 몸을 낮춥니다',
      '뒷무릎이 바닥에 거의 닿을 정도로 합니다',
      '앞발로 밀어 원래 자세로 돌아옵니다'
    ],
    precautions: [
      '무릎이 발끝을 넘지 않도록 주의하세요',
      '균형을 잃지 않도록 코어에 힘을 주세요',
      '무릎에 통증이 있으면 깊이를 줄이세요'
    ],
    tags: ['초급', '근력', '하체', '맨몸', '균형']
  },
  {
    id: 'strength-beginner-5',
    name: '벽 푸시업',
    description: '일반 푸시업보다 쉬운 상체 운동',
    type: 'strength',
    difficulty: 'beginner',
    sets: 3,
    reps: 15,
    rest: 45,
    calories: 30,
    targetMuscles: ['가슴', '삼두근', '어깨'],
    instructions: [
      '벽에서 팔 길이만큼 떨어져 섭니다',
      '손을 벽에 어깨 높이로 놓습니다',
      '팔꿈치를 구부려 벽 쪽으로 몸을 기울입니다',
      '팔을 펴며 원래 자세로 돌아옵니다',
      '몸을 일직선으로 유지합니다'
    ],
    precautions: [
      '손목에 무리가 가지 않도록 주의하세요',
      '벽에서의 거리를 조절하여 난이도를 조절할 수 있습니다'
    ],
    tags: ['초급', '근력', '상체', '맨몸', '저강도']
  },

  // 중급 근력 운동
  {
    id: 'strength-intermediate-1',
    name: '푸시업',
    description: '상체 전체를 강화하는 운동',
    type: 'strength',
    difficulty: 'intermediate',
    sets: 3,
    reps: 15,
    rest: 60,
    calories: 60,
    targetMuscles: ['가슴', '삼두근', '어깨', '코어'],
    instructions: [
      '손을 어깨 너비보다 약간 넓게 놓습니다',
      '발끝으로 몸을 지탱합니다',
      '머리부터 발끝까지 일직선을 유지합니다',
      '팔꿈치를 구부려 가슴이 바닥에 거의 닿을 때까지 내려갑니다',
      '팔을 펴며 원래 자세로 돌아옵니다'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example-standard-pushup',
    precautions: [
      '허리가 처지지 않도록 코어에 힘을 주세요',
      '팔꿈치가 몸에서 너무 멀리 벌어지지 않도록 하세요',
      '목을 자연스럽게 유지하세요'
    ],
    tags: ['중급', '근력', '상체', '맨몸']
  },
  {
    id: 'strength-intermediate-2',
    name: '버피',
    description: '전신 운동과 유산소를 결합한 고강도 운동',
    type: 'strength',
    difficulty: 'intermediate',
    sets: 3,
    reps: 10,
    rest: 90,
    calories: 80,
    targetMuscles: ['전신', '심혈관계'],
    instructions: [
      '서 있는 자세에서 시작합니다',
      '스쿼트 자세로 앉으며 손을 바닥에 놓습니다',
      '발을 뒤로 차며 푸시업 자세를 만듭니다',
      '푸시업을 1회 실시합니다',
      '발을 다시 앞으로 당기고 점프합니다'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example-burpee',
    precautions: [
      '심장에 무리가 갈 수 있으니 천천히 시작하세요',
      '점프 시 무릎에 충격이 가지 않도록 주의하세요',
      '어지러우면 즉시 중단하세요'
    ],
    tags: ['중급', '근력', '전신', '맨몸', '고강도', 'HIIT']
  },
  {
    id: 'strength-intermediate-3',
    name: '사이드 플랭크',
    description: '옆구리와 코어를 강화하는 운동',
    type: 'strength',
    difficulty: 'intermediate',
    sets: 3,
    duration: 1, // 각 면 1분
    rest: 60,
    calories: 35,
    targetMuscles: ['복사근', '코어', '어깨'],
    instructions: [
      '옆으로 누워 팔꿈치를 바닥에 댑니다',
      '팔꿈치는 어깨 바로 아래에 위치합니다',
      '엉덩이를 들어 올려 몸을 일직선으로 만듭니다',
      '반대쪽 팔은 위로 뻗거나 허리에 올립니다',
      '30초-1분간 자세를 유지한 후 반대쪽도 실시합니다'
    ],
    precautions: [
      '어깨에 무리가 가지 않도록 주의하세요',
      '엉덩이가 아래로 처지지 않도록 합니다',
      '목을 자연스럽게 유지하세요'
    ],
    tags: ['중급', '근력', '코어', '맨몸', '정적']
  },
  {
    id: 'strength-intermediate-4',
    name: '마운틴 클라이머',
    description: '코어와 심폐 지구력을 향상시키는 운동',
    type: 'strength',
    difficulty: 'intermediate',
    sets: 3,
    reps: 20, // 각 다리
    rest: 60,
    calories: 70,
    targetMuscles: ['코어', '어깨', '하체', '심혈관계'],
    instructions: [
      '푸시업 자세에서 시작합니다',
      '한쪽 무릎을 가슴 쪽으로 당깁니다',
      '빠르게 다리를 교체합니다',
      '달리는 것처럼 리듬감 있게 반복합니다',
      '코어에 힘을 주고 엉덩이가 올라가지 않도록 합니다'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example-mountain-climber',
    precautions: [
      '속도보다 정확한 자세가 중요합니다',
      '손목에 무리가 가지 않도록 주의하세요',
      '허리가 처지지 않도록 복근에 힘을 주세요'
    ],
    tags: ['중급', '근력', '코어', '맨몸', 'HIIT']
  },
  {
    id: 'strength-intermediate-5',
    name: '딥스 (의자 이용)',
    description: '삼두근을 집중적으로 강화하는 운동',
    type: 'strength',
    difficulty: 'intermediate',
    sets: 3,
    reps: 12,
    rest: 60,
    calories: 50,
    targetMuscles: ['삼두근', '어깨', '가슴'],
    instructions: [
      '의자 끝에 손을 놓고 엉덩이를 의자 앞으로 빼냅니다',
      '다리는 앞으로 뻗거나 무릎을 구부립니다',
      '팔꿈치를 구부려 몸을 낮춥니다',
      '팔꿈치가 90도 정도 될 때까지 내려갑니다',
      '팔을 펴며 원래 자세로 돌아옵니다'
    ],
    precautions: [
      '어깨에 통증이 있으면 중단하세요',
      '의자가 안정적인지 확인하세요',
      '팔꿈치가 너무 벌어지지 않도록 주의하세요'
    ],
    tags: ['중급', '근력', '상체', '삼두근']
  },

  // 고급 근력 운동
  {
    id: 'strength-advanced-1',
    name: '원암 푸시업',
    description: '한 팔로 하는 고난도 푸시업',
    type: 'strength',
    difficulty: 'advanced',
    sets: 3,
    reps: 8, // 각 팔
    rest: 90,
    calories: 70,
    targetMuscles: ['가슴', '삼두근', '어깨', '코어'],
    instructions: [
      '일반 푸시업 자세에서 시작합니다',
      '한 손을 등 뒤로 올립니다',
      '발을 넓게 벌려 균형을 잡습니다',
      '한 팔로 푸시업을 실시합니다',
      '반대쪽도 동일하게 실시합니다'
    ],
    precautions: [
      '충분한 근력이 없으면 부상 위험이 있습니다',
      '먼저 중급 운동을 완벽히 숙달하세요',
      '손목 보호대 착용을 고려하세요'
    ],
    tags: ['고급', '근력', '상체', '맨몸', '고강도']
  },
  {
    id: 'strength-advanced-2',
    name: '피스톨 스쿼트',
    description: '한 다리로 하는 고난도 스쿼트',
    type: 'strength',
    difficulty: 'advanced',
    sets: 3,
    reps: 8, // 각 다리
    rest: 90,
    calories: 80,
    targetMuscles: ['대퇴사두근', '둔근', '햄스트링', '코어'],
    instructions: [
      '한 발로 서서 반대쪽 다리를 앞으로 뻗습니다',
      '팔은 앞으로 뻗어 균형을 잡습니다',
      '한 발로 스쿼트를 실시합니다',
      '허벅지가 바닥과 평행할 때까지 내려갑니다',
      '천천히 일어섭니다'
    ],
    precautions: [
      '균형을 잃을 수 있으니 벽이나 지지대 근처에서 하세요',
      '무릎에 과도한 부담이 갈 수 있습니다',
      '처음에는 깊이를 줄여 연습하세요'
    ],
    tags: ['고급', '근력', '하체', '맨몸', '균형', '고강도']
  },
  {
    id: 'strength-advanced-3',
    name: '핸드스탠드 푸시업',
    description: '물구나무서서 하는 어깨 운동',
    type: 'strength',
    difficulty: 'advanced',
    sets: 3,
    reps: 5,
    rest: 120,
    calories: 90,
    targetMuscles: ['어깨', '삼두근', '코어'],
    instructions: [
      '벽에 발을 대고 물구나무를 섭니다',
      '손은 어깨 너비로 놓습니다',
      '팔꿈치를 구부려 머리가 바닥에 가까워질 때까지 내려갑니다',
      '팔을 펴며 원래 자세로 돌아옵니다',
      '코어에 힘을 주고 균형을 유지합니다'
    ],
    precautions: [
      '충분한 상체 근력이 필요합니다',
      '목 부상 위험이 있으니 주의하세요',
      '처음에는 보조자와 함께 하세요',
      '어지러움을 느끼면 즉시 중단하세요'
    ],
    tags: ['고급', '근력', '상체', '맨몸', '고강도', '역전']
  },

  // 유연성 운동
  {
    id: 'flexibility-beginner-1',
    name: '목 스트레칭',
    description: '목과 어깨의 긴장을 풀어주는 스트레칭',
    type: 'flexibility',
    difficulty: 'beginner',
    sets: 2,
    duration: 2, // 각 방향 30초
    rest: 30,
    calories: 10,
    targetMuscles: ['목', '어깨'],
    instructions: [
      '편안하게 앉거나 섭니다',
      '머리를 천천히 오른쪽으로 기울입니다',
      '30초간 유지한 후 왼쪽도 실시합니다',
      '머리를 앞뒤로도 천천히 움직입니다',
      '통증이 느껴지지 않는 범위에서 실시합니다'
    ],
    precautions: [
      '급격한 동작은 피하세요',
      '통증이 있으면 즉시 중단하세요',
      '목 디스크가 있으면 의사와 상담하세요'
    ],
    tags: ['초급', '유연성', '스트레칭', '상체']
  },
  {
    id: 'flexibility-beginner-2',
    name: '어깨 스트레칭',
    description: '어깨 관절의 유연성을 향상시키는 스트레칭',
    type: 'flexibility',
    difficulty: 'beginner',
    sets: 2,
    duration: 2,
    rest: 30,
    calories: 10,
    targetMuscles: ['어깨', '등'],
    instructions: [
      '한 팔을 가슴 앞으로 가져옵니다',
      '반대쪽 팔로 당겨줍니다',
      '30초간 유지한 후 반대쪽도 실시합니다',
      '양손을 뒤에서 깍지 끼고 들어올립니다',
      '호흡을 편안하게 유지합니다'
    ],
    precautions: [
      '어깨에 통증이 있으면 중단하세요',
      '무리하게 당기지 마세요'
    ],
    tags: ['초급', '유연성', '스트레칭', '상체']
  },
  {
    id: 'flexibility-beginner-3',
    name: '햄스트링 스트레칭',
    description: '허벅지 뒤쪽 근육을 늘리는 스트레칭',
    type: 'flexibility',
    difficulty: 'beginner',
    sets: 2,
    duration: 2,
    rest: 30,
    calories: 15,
    targetMuscles: ['햄스트링', '허리'],
    instructions: [
      '바닥에 앉아 다리를 앞으로 뻗습니다',
      '상체를 천천히 앞으로 숙입니다',
      '발끝을 잡거나 가능한 범위까지 뻗습니다',
      '30초간 유지합니다',
      '호흡을 멈추지 마세요'
    ],
    precautions: [
      '무릎을 굽히지 않도록 주의하세요',
      '허리에 통증이 있으면 각도를 줄이세요',
      '반동을 주지 마세요'
    ],
    tags: ['초급', '유연성', '스트레칭', '하체']
  },
  {
    id: 'flexibility-intermediate-1',
    name: '고양이-소 자세',
    description: '척추 유연성을 향상시키는 요가 동작',
    type: 'flexibility',
    difficulty: 'intermediate',
    sets: 3,
    reps: 10,
    rest: 30,
    calories: 20,
    targetMuscles: ['척추', '코어', '허리'],
    instructions: [
      '네발 기기 자세에서 시작합니다',
      '숨을 들이마시며 등을 아래로 내리고 고개를 듭니다 (소 자세)',
      '숨을 내쉬며 등을 위로 둥글게 말고 고개를 숙입니다 (고양이 자세)',
      '천천히 10회 반복합니다',
      '호흡과 동작을 조화롭게 합니다'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example-cat-cow',
    precautions: [
      '손목에 무리가 가지 않도록 주의하세요',
      '척추를 부드럽게 움직이세요',
      '임신 중이면 의사와 상담하세요'
    ],
    tags: ['중급', '유연성', '요가', '척추', '코어']
  },
  {
    id: 'flexibility-intermediate-2',
    name: '비둘기 자세',
    description: '고관절 유연성을 향상시키는 요가 동작',
    type: 'flexibility',
    difficulty: 'intermediate',
    sets: 2,
    duration: 2, // 각 다리
    rest: 30,
    calories: 25,
    targetMuscles: ['고관절', '둔근', '허벅지'],
    instructions: [
      '한쪽 무릎을 구부려 앞으로 가져옵니다',
      '반대쪽 다리는 뒤로 쭉 뻗습니다',
      '상체를 앞으로 숙입니다',
      '1-2분간 유지한 후 반대쪽도 실시합니다',
      '호흡을 깊게 유지합니다'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example-pigeon-pose',
    precautions: [
      '무릎에 통증이 있으면 각도를 조절하세요',
      '천천히 자세를 잡으세요',
      '고관절 부상이 있으면 피하세요'
    ],
    tags: ['중급', '유연성', '요가', '고관절', '하체']
  },
  {
    id: 'flexibility-intermediate-3',
    name: '앉아서 척추 비틀기',
    description: '척추와 허리의 유연성을 향상시키는 스트레칭',
    type: 'flexibility',
    difficulty: 'intermediate',
    sets: 2,
    duration: 2, // 각 방향
    rest: 30,
    calories: 20,
    targetMuscles: ['척추', '복사근', '허리'],
    instructions: [
      '바닥에 앉아 다리를 앞으로 뻗습니다',
      '오른쪽 무릎을 구부려 왼쪽 다리 옆에 놓습니다',
      '왼팔 팔꿈치를 오른쪽 무릎 바깥쪽에 놓고 비틉니다',
      '1분간 유지한 후 반대쪽도 실시합니다',
      '호흡을 깊게 유지합니다'
    ],
    precautions: [
      '허리에 통증이 있으면 각도를 줄이세요',
      '급격하게 비틀지 마세요',
      '척추 질환이 있으면 의사와 상담하세요'
    ],
    tags: ['중급', '유연성', '요가', '척추', '비틀기']
  },

  // 추가 전신 운동
  {
    id: 'fullbody-intermediate-1',
    name: '점핑 잭',
    description: '전신 워밍업에 효과적인 유산소 운동',
    type: 'cardio',
    difficulty: 'intermediate',
    sets: 3,
    reps: 30,
    rest: 45,
    calories: 60,
    targetMuscles: ['전신', '심혈관계'],
    instructions: [
      '발을 모으고 팔은 옆에 둡니다',
      '점프하며 다리를 벌리고 팔을 머리 위로 올립니다',
      '다시 점프하며 시작 자세로 돌아옵니다',
      '리듬감 있게 30회 반복합니다',
      '호흡을 규칙적으로 유지합니다'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example-jumping-jack',
    precautions: [
      '충격이 가지 않도록 매트를 사용하세요',
      '무릎에 문제가 있으면 저강도 버전을 하세요',
      '어지러움을 느끼면 중단하세요'
    ],
    tags: ['중급', '유산소', '전신', '맨몸', '워밍업']
  },
  {
    id: 'fullbody-intermediate-2',
    name: '하이니',
    description: '하체와 심폐 기능을 향상시키는 운동',
    type: 'cardio',
    difficulty: 'intermediate',
    sets: 3,
    reps: 20, // 각 다리
    rest: 60,
    calories: 70,
    targetMuscles: ['하체', '심혈관계', '코어'],
    instructions: [
      '제자리에서 무릎을 가슴 높이까지 들어올립니다',
      '빠르게 다리를 교체합니다',
      '팔을 자연스럽게 흔들어줍니다',
      '달리는 것처럼 리듬감 있게 실시합니다',
      '상체는 곧게 유지합니다'
    ],
    precautions: [
      '무릎에 무리가 가지 않도록 주의하세요',
      '매트를 사용하여 충격을 흡수하세요',
      '과호흡에 주의하세요'
    ],
    tags: ['중급', '유산소', '하체', '맨몸', 'HIIT']
  },
  {
    id: 'core-intermediate-1',
    name: '크런치',
    description: '복근을 집중적으로 강화하는 운동',
    type: 'strength',
    difficulty: 'intermediate',
    sets: 3,
    reps: 20,
    rest: 45,
    calories: 40,
    targetMuscles: ['복직근', '코어'],
    instructions: [
      '바닥에 누워 무릎을 구부립니다',
      '손은 머리 뒤 또는 가슴에 놓습니다',
      '복근에 힘을 주며 상체를 들어올립니다',
      '어깨뼈가 바닥에서 떨어질 정도만 올립니다',
      '천천히 내려옵니다'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example-crunch',
    precautions: [
      '목을 손으로 당기지 마세요',
      '허리가 바닥에서 떨어지지 않도록 주의하세요',
      '반동을 이용하지 마세요'
    ],
    tags: ['중급', '근력', '코어', '복근', '맨몸']
  },
  {
    id: 'core-intermediate-2',
    name: '레그 레이즈',
    description: '하복부를 강화하는 운동',
    type: 'strength',
    difficulty: 'intermediate',
    sets: 3,
    reps: 15,
    rest: 60,
    calories: 45,
    targetMuscles: ['하복부', '코어', '고관절 굴곡근'],
    instructions: [
      '바닥에 누워 다리를 쭉 뻗습니다',
      '손은 엉덩이 옆에 놓습니다',
      '다리를 곧게 펴고 들어올립니다',
      '수직이 될 때까지 올립니다',
      '천천히 내려오되 바닥에 닿지 않게 합니다'
    ],
    precautions: [
      '허리가 바닥에서 떨어지면 무릎을 약간 구부리세요',
      '복근에 힘을 주고 실시하세요',
      '허리 통증이 있으면 중단하세요'
    ],
    tags: ['중급', '근력', '코어', '하복부', '맨몸']
  },
  {
    id: 'core-intermediate-3',
    name: '러시안 트위스트',
    description: '복사근을 강화하는 회전 운동',
    type: 'strength',
    difficulty: 'intermediate',
    sets: 3,
    reps: 20, // 각 방향
    rest: 60,
    calories: 50,
    targetMuscles: ['복사근', '코어'],
    instructions: [
      '바닥에 앉아 무릎을 구부립니다',
      '상체를 약간 뒤로 기울입니다',
      '발을 바닥에서 약간 들어올립니다',
      '양손을 모아 좌우로 회전합니다',
      '각 방향마다 가볍게 바닥을 터치합니다'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=example-russian-twist',
    precautions: [
      '허리에 무리가 가지 않도록 주의하세요',
      '회전할 때 복근에 힘을 유지하세요',
      '속도보다 정확한 동작이 중요합니다'
    ],
    tags: ['중급', '근력', '코어', '복사근', '맨몸', '회전']
  },
  {
    id: 'flexibility-beginner-4',
    name: '전신 스트레칭 루틴',
    description: '운동 전후 전신을 풀어주는 스트레칭',
    type: 'flexibility',
    difficulty: 'beginner',
    sets: 1,
    duration: 10,
    rest: 0,
    calories: 30,
    targetMuscles: ['전신'],
    instructions: [
      '목, 어깨, 팔을 천천히 스트레칭합니다',
      '허리를 좌우로 비틀어줍니다',
      '다리를 앞뒤로 스트레칭합니다',
      '각 부위당 30초씩 실시합니다',
      '호흡을 깊게 유지합니다'
    ],
    precautions: [
      '통증이 느껴지는 범위까지만 스트레칭하세요',
      '반동을 주지 마세요',
      '운동 전후 모두 실시하세요'
    ],
    tags: ['초급', '유연성', '스트레칭', '전신', '워밍업', '쿨다운']
  },
  {
    id: 'balance-intermediate-1',
    name: '한 발 서기',
    description: '균형감각을 향상시키는 운동',
    type: 'flexibility',
    difficulty: 'intermediate',
    sets: 3,
    duration: 1, // 각 다리
    rest: 30,
    calories: 20,
    targetMuscles: ['코어', '발목', '균형'],
    instructions: [
      '한 발로 섭니다',
      '반대쪽 무릎을 들어올립니다',
      '팔은 옆으로 벌려 균형을 잡습니다',
      '1분간 자세를 유지합니다',
      '시선은 한 곳을 응시합니다'
    ],
    precautions: [
      '넘어질 수 있으니 벽 근처에서 하세요',
      '발목에 무리가 가지 않도록 주의하세요',
      '어지러움을 느끼면 중단하세요'
    ],
    tags: ['중급', '유연성', '균형', '코어', '발목']
  },
  {
    id: 'lowimpact-beginner-1',
    name: '의자에 앉았다 일어서기',
    description: '하체 근력을 안전하게 키우는 운동',
    type: 'strength',
    difficulty: 'beginner',
    sets: 3,
    reps: 15,
    rest: 60,
    calories: 35,
    targetMuscles: ['대퇴사두근', '둔근'],
    instructions: [
      '의자에 앉습니다',
      '발은 어깨 너비로 벌립니다',
      '손을 가슴에 모으거나 앞으로 뻗습니다',
      '의자에서 일어섭니다',
      '천천히 다시 앉습니다'
    ],
    precautions: [
      '의자가 안정적인지 확인하세요',
      '무릎에 통증이 있으면 중단하세요',
      '균형을 잃지 않도록 주의하세요'
    ],
    tags: ['초급', '근력', '하체', '저강도', '시니어']
  }
];

// 태그별 운동 필터링
export function getExercisesByTags(tags: string[]): Exercise[] {
  return exercises.filter(exercise =>
    tags.some(tag => exercise.tags.includes(tag))
  );
}

// 타입별 운동 필터링
export function getExercisesByType(type: Exercise['type']): Exercise[] {
  return exercises.filter(exercise => exercise.type === type);
}

// 난이도별 운동 필터링
export function getExercisesByDifficulty(difficulty: Exercise['difficulty']): Exercise[] {
  return exercises.filter(exercise => exercise.difficulty === difficulty);
}

// 특정 근육 타겟 운동 필터링
export function getExercisesByTargetMuscle(muscle: string): Exercise[] {
  return exercises.filter(exercise =>
    exercise.targetMuscles.some(m => m.includes(muscle))
  );
}
