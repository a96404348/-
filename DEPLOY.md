# 배포 가이드 - Vercel을 사용한 배포

브라우저에서 접속할 수 있는 링크를 만들기 위해 Vercel을 사용합니다. 두 가지 방법이 있습니다:

## 방법 1: Vercel CLI를 사용한 배포 (가장 빠름)

### 1단계: Vercel CLI 설치

PowerShell에서 다음 명령어 실행:

```powershell
npm install -g vercel
```

### 2단계: Vercel 로그인

```powershell
vercel login
```

브라우저가 열리면 GitHub, GitLab, 또는 Bitbucket 계정으로 로그인합니다.

### 3단계: 프로젝트 배포

프로젝트 디렉토리에서:

```powershell
vercel
```

질문에 답변:
- Set up and deploy? **Yes**
- Which scope? (기본 계정 선택)
- Link to existing project? **No**
- What's your project's name? **daily-english-challenge** (또는 원하는 이름)
- In which directory is your code located? **./** (현재 디렉토리)

### 4단계: 프로덕션 배포

```powershell
vercel --prod
```

배포가 완료되면 브라우저에서 접속할 수 있는 링크가 제공됩니다!

---

## 방법 2: GitHub을 통한 자동 배포 (권장)

### 1단계: GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 새 저장소(Repository) 생성
3. 저장소 이름: `daily-english-challenge`

### 2단계: Git 초기화 및 푸시

PowerShell에서:

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/daily-english-challenge.git
git push -u origin main
```

### 3단계: Vercel에 배포

1. [Vercel](https://vercel.com)에 접속
2. "Add New Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정:
   - Framework Preset: **Next.js** (자동 감지됨)
   - Root Directory: `./`
5. "Deploy" 클릭

### 4단계: 환경 변수 설정 (선택사항)

OpenAI API 키를 사용하려면:
1. Vercel 대시보드에서 프로젝트 선택
2. Settings → Environment Variables
3. `OPENAI_API_KEY` 추가

---

## 배포 후

배포가 완료되면 다음과 같은 URL이 제공됩니다:
- 프로덕션: `https://daily-english-challenge.vercel.app`
- 프리뷰: 각 배포마다 고유한 URL

이 링크를 브라우저에서 열어 앱을 사용할 수 있습니다!

---

## 트러블슈팅

### 빌드 오류 발생 시

1. 로컬에서 빌드 테스트:
```powershell
npm run build
```

2. 오류가 있다면 수정 후 다시 배포

### 환경 변수 설정

Vercel 대시보드에서 환경 변수를 설정하면 자동으로 반영됩니다.

---

**참고**: Vercel은 무료 플랜에서도 충분한 기능을 제공합니다!

