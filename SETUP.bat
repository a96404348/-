@echo off
echo ========================================
echo Daily English Challenge 설정
echo ========================================
echo.

echo 1단계: 의존성 패키지 설치 중...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo 설치에 실패했습니다.
    echo.
    echo PowerShell 실행 정책 문제일 수 있습니다.
    echo 다음을 시도해보세요:
    echo.
    echo 1. PowerShell을 관리자 권한으로 실행
    echo 2. 다음 명령어 실행: Set-ExecutionPolicy RemoteSigned
    echo 3. 이 파일을 다시 실행
    echo.
    pause
    exit /b 1
)

echo.
echo 2단계: 개발 서버 시작 중...
echo.
echo 브라우저에서 http://localhost:3000 을 열어주세요.
echo.
echo 서버를 중지하려면 Ctrl+C를 누르세요.
echo.

call npm run dev

pause

