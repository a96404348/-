# Daily English Challenge 🌱

매일의 생활 목표를 영어로 기록하며 AI 피드백을 통해 영어 실력 향상과 자기 성장을 동시에 이루는 AI 챌린지 앱입니다.

## 주요 기능

### 1. 데일리 목표 설정
- 운동, 독서, 식단, 기타 등 다양한 목표 설정
- 목표 상세 설명 작성 가능

### 2. 영어 일기 작성
- 목표 달성 과정을 영어로 작성
- AI가 실시간으로 교정 및 피드백 제공

### 3. AI 피드백 & 학습
- 문법과 표현 자동 교정
- 핵심 어휘·표현 추출
- 발음, 예문, 유의어 제공

### 4. 표현 학습 퀴즈
- 배운 표현을 복습하는 퀴즈
- 80% 이상 정답률로 통과
- 퀴즈 통과 후 다음날 목표 설정 가능

### 5. 성장 시각화 (나무 시스템)
- 연속 달성일이 늘어날수록 나무가 성장
- 연속 달성일과 총 완료일 추적

### 6. 크루 챌린지
- 친구나 가족과 함께 크루 형성
- 같은 기간 동안 목표 공유 및 경쟁
- 응원 메시지 및 공동 나무 성장 기능

### 7. 학습 캘린더
- 월별 캘린더로 진행 상황을 한눈에 확인
- 상태별 컬러 뱃지로 목표 설정부터 퀴즈 통과까지 추적
- 일자를 클릭해 상세 기록과 피드백, 퀴즈 현황 확인

## 기술 스택

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (GPT-3.5-turbo)
- **Storage**: LocalStorage (로컬 개발용)

## 설치 및 실행

### 로컬 개발 환경

#### 1. 의존성 설치

```bash
npm install
```

#### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 OpenAI API 키를 추가하세요:

```
OPENAI_API_KEY=your_openai_api_key_here
```

> **참고**: OpenAI API 키가 없어도 Mock 데이터로 앱을 실행할 수 있습니다.

#### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 앱을 확인하세요.

### 온라인 배포 (브라우저에서 접속 가능한 링크 만들기)

**가장 쉬운 방법**: `QUICK_START.md` 파일을 참고하세요!

1. **GitHub에 코드 업로드**
2. **Vercel에 배포** (무료, 2-3분 소요)
3. **제공된 링크로 앱 접속**

자세한 내용은 [QUICK_START.md](./QUICK_START.md)를 참고하세요.

### 정적 HTML 버전 실행

설치 없이 빠르게 살펴보고 싶다면 `index.html` 파일을 브라우저로 열면 됩니다. 모든 기능은 브라우저 내 `localStorage`를 활용해 동작하도록 구성되어 있습니다.

## 사용 방법

1. **목표 설정**: 오늘의 목표를 선택하고 설정합니다
2. **일기 작성**: 목표 달성 후 영어로 일기를 작성합니다
3. **피드백 확인**: AI가 교정한 일기와 학습 자료를 확인합니다
4. **표현 학습**: 추출된 핵심 표현을 학습합니다
5. **퀴즈 통과**: 배운 표현에 대한 퀴즈를 풀고 통과합니다
6. **나무 성장**: 퀴즈 통과 시 나무가 성장합니다!

## 프로젝트 구조

```
daily-english-challenge/
├── app/
│   ├── api/
│   │   ├── feedback/route.ts    # AI 피드백 API
│   │   └── quiz/route.ts         # 퀴즈 생성 API
│   ├── crew/
│   │   └── page.tsx              # 크루 챌린지 페이지
│   ├── layout.tsx
│   ├── page.tsx                  # 메인 페이지
│   └── globals.css
├── components/
│   ├── Dashboard.tsx             # 대시보드 (나무 시각화)
│   ├── GoalSetting.tsx          # 목표 설정
│   ├── DiaryWriting.tsx         # 일기 작성
│   ├── FeedbackView.tsx         # 피드백 보기
│   ├── QuizView.tsx             # 퀴즈
│   └── CrewChallenge.tsx       # 크루 챌린지
├── lib/
│   ├── api.ts                   # API 호출 함수
│   └── utils.ts                 # 유틸리티 함수
└── package.json
```

## 향후 개선 사항

- [ ] 실제 데이터베이스 연동 (현재는 LocalStorage 사용)
- [ ] 사용자 인증 시스템
- [ ] 실시간 크루 채팅 기능
- [ ] 더 다양한 나무 스타일 및 애니메이션
- [ ] 통계 및 분석 대시보드
- [ ] 모바일 앱 버전

## 라이선스

MIT License

## 기여

이슈나 풀 리퀘스트를 환영합니다!

---

**만든이**: Daily English Challenge Team 🌱

