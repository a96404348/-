# 빠른 배포 가이드 🚀

브라우저에서 접속할 수 있는 링크를 만드는 가장 쉬운 방법입니다!

## 가장 쉬운 방법: Vercel 웹 UI 사용

### 1단계: GitHub에 코드 업로드

1. [GitHub](https://github.com)에 로그인 (계정이 없으면 가입)
2. 오른쪽 상단 **+** 버튼 클릭 → **New repository**
3. Repository name: `daily-english-challenge`
4. **Create repository** 클릭

### 2단계: 코드 업로드

GitHub에서 제공하는 명령어를 사용하거나, 웹에서 직접 파일을 업로드할 수 있습니다.

**방법 A: GitHub Desktop 사용 (가장 쉬움)**
1. [GitHub Desktop](https://desktop.github.com) 다운로드 및 설치
2. GitHub Desktop 실행 → File → Add Local Repository
3. 이 프로젝트 폴더 선택
4. Commit & Push

**방법 B: 웹에서 직접 업로드**
1. GitHub 저장소 페이지에서 **uploading an existing file** 클릭
2. 프로젝트의 모든 파일을 드래그 앤 드롭
3. **Commit changes** 클릭

### 3단계: Vercel에 배포

1. [vercel.com](https://vercel.com) 접속
2. **Sign Up** → GitHub 계정으로 로그인
3. **Add New Project** 클릭
4. 생성한 GitHub 저장소 선택
5. **Deploy** 클릭 (설정은 기본값으로 두면 됩니다)

### 완료! 🎉

배포가 완료되면 (약 2-3분) 다음과 같은 URL이 제공됩니다:
- `https://daily-english-challenge.vercel.app`

이 링크를 브라우저에서 열면 앱을 사용할 수 있습니다!

---

## 대안: Vercel CLI 사용 (고급)

### PowerShell 관리자 권한으로 실행

1. PowerShell을 **관리자 권한**으로 실행
2. 실행 정책 변경:
```powershell
Set-ExecutionPolicy RemoteSigned
```
3. `deploy.bat` 파일 실행 또는 다음 명령어 실행:

```powershell
npm install -g vercel
vercel login
vercel
vercel --prod
```

---

## 환경 변수 설정 (OpenAI API 사용 시)

1. Vercel 대시보드에서 프로젝트 선택
2. **Settings** → **Environment Variables**
3. **Add New**:
   - Name: `OPENAI_API_KEY`
   - Value: (OpenAI API 키)
4. **Save**
5. **Deployments** → 최신 배포의 **...** → **Redeploy**

---

## 문제 해결

### 빌드 오류가 발생하면:

로컬에서 먼저 테스트:
```powershell
npm install
npm run build
```

오류를 수정한 후 다시 배포하세요.

### 링크가 작동하지 않으면:

1. Vercel 대시보드에서 배포 상태 확인
2. 배포 로그 확인
3. 필요시 재배포

---

**팁**: Vercel은 무료로 사용할 수 있고, 자동 HTTPS를 제공합니다!

