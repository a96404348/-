@echo off
echo ========================================
echo Daily English Challenge 배포 스크립트
echo ========================================
echo.

echo 1단계: Vercel CLI 설치 확인...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI가 설치되어 있지 않습니다.
    echo 설치 중...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo Vercel CLI 설치에 실패했습니다.
        echo 수동으로 설치하세요: npm install -g vercel
        pause
        exit /b 1
    )
)

echo.
echo 2단계: Vercel 로그인...
vercel login

echo.
echo 3단계: 프로젝트 배포 중...
vercel

echo.
echo 4단계: 프로덕션 배포 중...
vercel --prod

echo.
echo ========================================
echo 배포 완료!
echo ========================================
echo.
echo 위에 표시된 URL로 앱에 접속할 수 있습니다.
pause

