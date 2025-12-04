const state = {
  currentPage: 'home',
  selectedGoalType: null,
  currentChallenge: null,
  challengeStatus: 'no_goal',
  crewMode: null,
  calendarDate: new Date(),
  selectedCalendarDate: null,
}

const goalOptions = [
  {
    type: 'exercise',
    label: '운동',
    icon: '💪',
    examples: ['30분 러닝', '헬스장 가기', '요가하기'],
  },
  {
    type: 'reading',
    label: '독서',
    icon: '📚',
    examples: ['책 1챕터 읽기', '영문 기사 읽기', '독서록 작성'],
  },
  {
    type: 'diet',
    label: '식단',
    icon: '🥗',
    examples: ['건강한 식사', '물 2L 마시기', '간식 자제'],
  },
  {
    type: 'other',
    label: '기타',
    icon: '✨',
    examples: ['새로운 취미 시작', '명상하기', '일기 쓰기'],
  },
]

const STATUS_META = {
  completed: {
    label: '완료',
    description: '목표부터 퀴즈까지 모두 완료했어요!',
    badgeClass: 'bg-green-100 text-green-700',
    dotClass: 'bg-green-500',
  },
  quiz_pending: {
    label: '퀴즈 진행중',
    description: '퀴즈를 완료하면 다음 목표를 설정할 수 있어요.',
    badgeClass: 'bg-pink-100 text-pink-700',
    dotClass: 'bg-pink-500',
  },
  feedback_viewed: {
    label: '피드백 확인',
    description: 'AI 피드백을 확인했어요. 표현 학습으로 넘어가세요.',
    badgeClass: 'bg-indigo-100 text-indigo-700',
    dotClass: 'bg-indigo-500',
  },
  expressions_viewed: {
    label: '표현 학습',
    description: '표현을 학습했어요. 퀴즈로 복습해보세요.',
    badgeClass: 'bg-purple-100 text-purple-700',
    dotClass: 'bg-purple-500',
  },
  diary_written: {
    label: '일기 작성',
    description: '일기를 작성했어요. AI 피드백을 받아보세요.',
    badgeClass: 'bg-blue-100 text-blue-700',
    dotClass: 'bg-blue-500',
  },
  goal_set: {
    label: '목표 설정',
    description: '목표만 설정된 상태예요. 일기를 작성해보세요.',
    badgeClass: 'bg-purple-100 text-purple-700',
    dotClass: 'bg-purple-500',
  },
  no_goal: {
    label: '목표 없음',
    description: '아직 오늘의 목표가 없어요.',
    badgeClass: 'bg-gray-100 text-gray-500',
    dotClass: 'bg-gray-300',
  },
  none: {
    label: '기록 없음',
    description: '아직 기록이 없어요. 오늘 목표를 세워보세요.',
    badgeClass: 'bg-gray-100 text-gray-500',
    dotClass: 'bg-gray-300',
  },
}

const STATUS_ORDER = ['completed', 'quiz_pending', 'expressions_viewed', 'feedback_viewed', 'diary_written', 'goal_set', 'none']

const STATUS_MESSAGES = {
  no_goal: {
    title: '새로운 목표를 정해볼까요?',
    message: '오늘의 작은 목표를 세우고 꾸준한 루틴을 시작해보세요.',
    cardClass: 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-500 text-white',
    pillClass: 'bg-white/25 text-white',
    icon: '✨',
  },
  goal_set: {
    title: '목표가 준비됐어요!',
    message: '이제 경험을 영어로 기록하면서 학습을 시작해볼까요?',
    cardClass: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 text-white',
    pillClass: 'bg-white/20 text-white',
    icon: '📝',
  },
  diary_written: {
    title: 'AI 피드백을 확인해보세요',
    message: '교정된 문장을 비교하고 핵심 표현을 익히면 실력이 쑥쑥!',
    cardClass: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-white',
    pillClass: 'bg-white/20 text-white',
    icon: '🤖',
  },
  feedback_viewed: {
    title: '표현 학습으로 넘어가요',
    message: 'AI가 추출한 핵심 표현들을 자세히 살펴보고 학습해보세요.',
    cardClass: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-white',
    pillClass: 'bg-white/20 text-white',
    icon: '📚',
  },
  expressions_viewed: {
    title: '표현 학습으로 마무리해요',
    message: '표현 카드를 복습하고 퀴즈로 기억을 확실히 다져보세요.',
    cardClass: 'bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 text-white',
    pillClass: 'bg-white/20 text-white',
    icon: '🧠',
  },
  quiz_pending: {
    title: '이제 퀴즈만 남았어요!',
    message: '80% 이상 맞추면 다음 챌린지로 넘어갈 수 있어요.',
    cardClass: 'bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-500 text-white',
    pillClass: 'bg-white/20 text-white',
    icon: '✅',
  },
  completed: {
    title: '오늘의 목표 달성! 👏',
    message: '훌륭해요. 연속 달성을 이어가며 나무를 더욱 키워보세요.',
    cardClass: 'bg-gradient-to-br from-green-600 via-emerald-600 to-lime-500 text-white',
    pillClass: 'bg-white/25 text-white',
    icon: '🌳',
  },
}

const STEP_CONFIG = [
  {
    id: 'no_goal',
    label: '목표 설정',
    description: '오늘의 챌린지 정하기',
    icon: '🎯',
  },
  {
    id: 'goal_set',
    label: '일기 작성',
    description: '경험을 영어로 작성',
    icon: '📝',
  },
  {
    id: 'diary_written',
    label: 'AI 피드백',
    description: '교정 및 피드백 확인',
    icon: '🤖',
  },
  {
    id: 'feedback_viewed',
    label: '표현 학습',
    description: '핵심 표현 상세 학습 및 퀴즈 준비',
    icon: '📚',
  },
  {
    id: 'quiz_pending',
    label: '퀴즈',
    description: '복습 퀴즈 통과',
    icon: '✅',
  },
  {
    id: 'completed',
    label: '완료',
    description: '나무 성장 확인',
    icon: '🌳',
  },
]

function init() {
  state.calendarDate = new Date()
  state.selectedCalendarDate = getTodayDateString()
  setupNavigation()
  ensureHomeShortcut()
  showPage('home')
}

document.addEventListener('DOMContentLoaded', init)

function showPage(page) {
  state.currentPage = page
  highlightNav(page)
  ensureHomeShortcut()
  
  const contentEl = document.getElementById('content')
  
  // 페이지 전환 애니메이션
  if (contentEl) {
    // 페이드 아웃
    contentEl.style.opacity = '0'
    contentEl.style.transform = 'translateY(20px) scale(0.98)'
    contentEl.style.transition = 'opacity 0.25s ease-out, transform 0.25s ease-out'
    
    setTimeout(() => {
      // 페이지 렌더링
      if (page === 'home') {
        renderHome(true) // 홈 버튼을 누르면 항상 목표 설정 화면으로
      } else if (page === 'crew') {
        renderCrew()
      } else if (page === 'calendar') {
        renderCalendarPage()
      } else if (page === 'tree') {
        const treeHTML = renderTreePage()
        contentEl.innerHTML = treeHTML
      } else {
        renderHome(true) // 기본값도 목표 설정 화면으로
      }
      
      // 나무 페이지는 특별한 줌인 효과
      if (page === 'tree') {
        contentEl.style.transform = 'translateY(0) scale(0.9)'
        contentEl.style.transition = 'opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        setTimeout(() => {
          contentEl.style.opacity = '1'
          contentEl.style.transform = 'translateY(0) scale(1)'
        }, 10)
      } else {
        // 일반 페이지는 부드러운 페이드인
        contentEl.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
        setTimeout(() => {
          contentEl.style.opacity = '1'
          contentEl.style.transform = 'translateY(0) scale(1)'
        }, 10)
      }
    }, 250)
  } else {
    // content 요소가 없으면 바로 렌더링
    if (page === 'home') {
      renderHome(true) // 홈 버튼을 누르면 항상 목표 설정 화면으로
    } else if (page === 'crew') {
      renderCrew()
    } else if (page === 'calendar') {
      renderCalendarPage()
    } else if (page === 'tree') {
      const treeHTML = renderTreePage()
      if (contentEl) {
        contentEl.innerHTML = treeHTML
      }
    } else {
      renderHome(true) // 기본값도 목표 설정 화면으로
    }
  }
}

function highlightNav(page) {
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    const target = btn.dataset.page
    btn.classList.remove('bg-green-100', 'text-green-700', 'text-blue-700', 'bg-blue-100', 'text-gray-600')
    if (target === page) {
      btn.classList.add('bg-green-100', 'text-green-700')
    } else {
      btn.classList.add('text-gray-600')
    }
  })
}

function setupNavigation() {
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.page
      if (!target || state.currentPage === target) return
      showPage(target)
    })
  })
}

function normalizeStatus(status) {
  if (status === 'quiz_passed') {
    return 'completed'
  }
  if (status === 'completed') {
    return 'completed'
  }
  if (status === 'quiz_pending') {
    return 'quiz_pending'
  }
  // expressions_viewed도 feedback_viewed로 통합하여 표시
  if (status === 'expressions_viewed' || status === 'feedback_viewed') {
    return 'feedback_viewed'
  }
  if (status === 'diary_written') {
    return 'diary_written'
  }
  if (status === 'goal_set') {
    return 'goal_set'
  }
  return 'no_goal'
}

function renderDailySummary(status) {
  const todayKey = getTodayDateString()
  const dateLabel = formatKoreanDate(todayKey)
  const challenge = state.currentChallenge
  const goalText = challenge?.goal ? escapeHtml(challenge.goal) : '아직 목표가 설정되지 않았어요.'
  const goalDesc = challenge?.goalDescription ? escapeHtml(challenge.goalDescription) : '오늘 이루고 싶은 목표를 구체적으로 적어보세요.'
  const streak = getStreakDays()
  const challenges = getAllChallenges()
  const totalCompleted = Object.values(challenges).filter((c) => c.quizPassed).length
  const normalized = normalizeStatus(status)
  const statusMessage = STATUS_MESSAGES[normalized] || STATUS_MESSAGES.no_goal
  const currentStepIndex = Math.max(
    STEP_CONFIG.findIndex((step) => step.id === normalized),
    0,
  )
  const displayStepCount = normalized === 'completed' ? STEP_CONFIG.length : Math.min(currentStepIndex + 1, STEP_CONFIG.length)
  const progressLabel = `${displayStepCount} / ${STEP_CONFIG.length}`

  return `
    <section class="grid gap-4 lg:grid-cols-3">
      <article class="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4">
        <header class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">오늘의 날짜</p>
            <h2 class="text-xl font-semibold text-gray-900">${dateLabel}</h2>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">${STEP_CONFIG[currentStepIndex]?.label || '시작 전'}</span>
        </header>
        <div class="space-y-2">
          <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">오늘의 목표</p>
          <p class="text-lg font-semibold text-gray-800 leading-tight">${goalText}</p>
          <p class="text-sm text-gray-500 leading-relaxed">${goalDesc}</p>
        </div>
      </article>
      <article class="rounded-2xl shadow-xl p-6 flex flex-col gap-4 ${statusMessage.cardClass}">
        <header class="flex items-center gap-3">
          <span class="text-3xl">${statusMessage.icon}</span>
          <div class="space-y-1">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusMessage.pillClass}">현재 단계 안내</span>
            <h2 class="text-xl font-semibold text-white">${statusMessage.title}</h2>
          </div>
        </header>
        <p class="text-sm leading-relaxed text-white/90">${statusMessage.message}</p>
        <div class="flex items-center gap-2 text-sm">
          <span class="px-3 py-1 rounded-full text-xs font-semibold ${statusMessage.pillClass}">${progressLabel}</span>
          <span class="text-white/80">현재 진행 단계</span>
        </div>
      </article>
      <article class="bg-white rounded-2xl shadow-xl p-6">
        <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">나의 성장 지표</h2>
        <dl class="grid grid-cols-2 gap-4">
          <div>
            <dt class="text-xs text-gray-500">연속 달성</dt>
            <dd class="text-2xl font-bold text-emerald-600">${streak}<span class="text-lg font-medium text-gray-500">일</span></dd>
          </div>
          <div>
            <dt class="text-xs text-gray-500">총 완료</dt>
            <dd class="text-2xl font-bold text-blue-600">${totalCompleted}<span class="text-lg font-medium text-gray-500">일</span></dd>
          </div>
          <div>
            <dt class="text-xs text-gray-500">오늘의 상태</dt>
            <dd class="mt-1 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
              STATUS_META[normalized]?.badgeClass || 'bg-gray-100 text-gray-600'
            }">
              <span class="w-2 h-2 rounded-full ${STATUS_META[normalized]?.dotClass || 'bg-gray-300'}"></span>
              ${STATUS_META[normalized]?.label || '미진행'}
            </dd>
          </div>
          <div>
            <dt class="text-xs text-gray-500">오늘의 기록</dt>
            <dd class="text-sm text-gray-600 mt-1">${challenge?.diary ? '일기 작성 완료' : '일기 작성 준비'}</dd>
          </div>
        </dl>
      </article>
    </section>
  `
}

function renderProgressStepper(status) {
  const normalized = normalizeStatus(status)
  const currentIndex = Math.max(
    STEP_CONFIG.findIndex((step) => step.id === normalized),
    0,
  )
  const progressPercent = Math.min(100, Math.max(0, (currentIndex / (STEP_CONFIG.length - 1)) * 100))

  const stepsHtml = STEP_CONFIG.map((step, idx) => {
    const stepState = idx < currentIndex ? 'complete' : idx === currentIndex ? 'current' : 'upcoming'
    const isClickable = stepState === 'complete' || stepState === 'current'
    const circleBase = 'w-12 h-12 rounded-full flex items-center justify-center border-2 text-lg font-semibold transition-all'
    const circleClass =
      stepState === 'complete'
        ? `${circleBase} bg-emerald-500 border-emerald-500 text-white shadow`
        : stepState === 'current'
        ? `${circleBase} bg-white border-emerald-500 text-emerald-600 shadow`
        : `${circleBase} bg-white border-gray-200 text-gray-400`
    const labelClass =
      stepState === 'complete' || stepState === 'current'
        ? 'text-sm font-semibold text-emerald-600'
        : 'text-sm font-semibold text-gray-400'
    const descClass = 'text-xs text-gray-500 leading-snug'
    const clickableClass = isClickable ? 'cursor-pointer hover:scale-105 transition-transform' : 'cursor-not-allowed'

    return `
      <div class="step-item flex flex-col items-center text-center gap-2 ${clickableClass}" data-step-id="${step.id}" data-step-index="${idx}">
        <div class="${circleClass}">${step.icon}</div>
        <div class="space-y-1">
          <p class="${labelClass}">${step.label}</p>
          <p class="${descClass}">${step.description}</p>
        </div>
      </div>
    `
  }).join('')

  return `
    <section class="bg-white rounded-2xl shadow-xl p-6 space-y-4">
      <header class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-lg font-semibold text-gray-800">오늘의 진행 단계</h2>
        <div class="w-full sm:w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div class="h-2 bg-emerald-400" style="width: ${progressPercent}%"></div>
        </div>
      </header>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        ${stepsHtml}
      </div>
    </section>
  `
}

function renderHome(forceGoalSetting = false, skipStatusCheck = false) {
  // 홈 버튼을 눌러서 강제로 목표 설정 화면으로 가는 경우
  if (forceGoalSetting) {
    // 강제로 목표 설정 화면으로 가는 경우, 진행 과정은 저장된 상태로 유지
    state.challengeStatus = 'no_goal'
    state.currentChallenge = null
  } else if (!skipStatusCheck) {
    // 상태 확인을 건너뛰지 않는 경우에만 오늘 날짜 확인
    checkTodayStatus()
  }
  // skipStatusCheck가 true이면 이미 설정된 state.currentChallenge와 state.challengeStatus를 사용
  
  const rawStatus = state.challengeStatus
  const normalizedStatus = normalizeStatus(rawStatus)
  let mainContent = ''

  switch (rawStatus) {
    case 'no_goal':
      mainContent = renderGoalSetting()
      break
    case 'goal_set':
      mainContent = renderDiaryWriting()
      break
    case 'diary_written':
      mainContent = renderFeedbackView()
      break
    case 'feedback_viewed':
      mainContent = renderFeedbackView()
      break
    case 'expressions_viewed':
      mainContent = renderExpressionsView()
      break
    case 'quiz_pending':
      mainContent = renderQuizView()
      break
    case 'quiz_passed':
    case 'completed':
    default:
      mainContent = renderDashboard()
      break
  }

  const layout = `
    <div class="space-y-6">
      ${renderDailySummary(normalizedStatus)}
      ${renderProgressStepper(normalizedStatus)}
      <div class="main-view">${mainContent}</div>
    </div>
  `

  document.getElementById('content').innerHTML = layout
  attachHomeHandlers(rawStatus)
}

function attachHomeHandlers(status) {
  // 진행 단계 클릭 핸들러
  document.querySelectorAll('.step-item').forEach((stepEl) => {
    stepEl.addEventListener('click', () => {
      const stepId = stepEl.dataset.stepId
      const stepIndex = parseInt(stepEl.dataset.stepIndex)
      const normalized = normalizeStatus(status)
      const currentIndex = Math.max(
        STEP_CONFIG.findIndex((step) => step.id === normalized),
        0,
      )
      
      // 완료된 단계나 현재 단계만 클릭 가능
      if (stepIndex <= currentIndex) {
        navigateToStep(stepId)
      } else {
        alert('아직 도달하지 않은 단계입니다.')
      }
    })
  })

  switch (status) {
    case 'no_goal':
      setupGoalSettingHandlers()
      break
    case 'goal_set':
      setupDiaryHandlers()
      break
    case 'diary_written':
      setupFeedbackHandlers()
      break
    case 'feedback_viewed':
      setupFeedbackHandlers()
      break
    case 'expressions_viewed':
      setupExpressionsHandlers()
      break
    case 'quiz_pending':
      setupQuizHandlers()
      break
    case 'quiz_passed':
    case 'completed':
      setupDashboardHandlers()
      break
    default:
      break
  }
}

function navigateToStep(stepId) {
  const challenge = state.currentChallenge
  
  switch (stepId) {
    case 'no_goal':
      state.challengeStatus = 'no_goal'
      state.currentChallenge = null
      renderHome(false, true)
      break
    case 'goal_set':
      if (challenge && challenge.goal) {
        state.challengeStatus = 'goal_set'
        renderHome(false, true)
      } else {
        alert('먼저 목표를 설정해주세요.')
      }
      break
    case 'diary_written':
      if (challenge && challenge.diary) {
        state.challengeStatus = 'diary_written'
        renderHome(false, true)
      } else {
        alert('먼저 일기를 작성해주세요.')
      }
      break
    case 'feedback_viewed':
      if (challenge && challenge.feedback) {
        state.challengeStatus = 'feedback_viewed'
        renderHome(false, true)
      } else {
        alert('먼저 일기를 작성하고 AI 피드백을 받아주세요.')
      }
      break
    case 'expressions_viewed':
      if (challenge && challenge.feedback && challenge.feedback.expressions) {
        state.challengeStatus = 'expressions_viewed'
        renderHome(false, true)
      } else {
        alert('먼저 AI 피드백을 확인하고 표현을 학습해주세요.')
      }
      break
    case 'quiz_pending':
      if (challenge && challenge.quizData) {
        state.challengeStatus = 'quiz_pending'
        renderHome(false, true)
      } else {
        alert('먼저 AI 피드백을 확인하고 퀴즈를 생성해주세요.')
      }
      break
    case 'completed':
      if (challenge && challenge.quizPassed) {
        state.challengeStatus = 'completed'
        renderHome(false, true)
      } else {
        alert('먼저 퀴즈를 완료해주세요.')
      }
      break
    default:
      break
  }
}

function renderGoalSetting() {
  return `
    <div class="max-w-5xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <header class="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-xs font-semibold text-emerald-500 uppercase tracking-widest">Step 1</p>
            <h1 class="text-3xl font-bold text-gray-900 mt-1">오늘의 목표를 선택하세요</h1>
            <p class="text-sm text-gray-500 mt-2">꾸준한 루틴을 위해 오늘 달성하고 싶은 목표를 골라보세요. 필요하면 직접 작성할 수도 있어요.</p>
          </div>
          <div class="px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-semibold flex items-center gap-2">
            <span class="text-lg">🎯</span>
            <span>목표 설정 단계</span>
          </div>
        </header>
        <div class="grid gap-6 lg:grid-cols-3">
          <aside class="rounded-2xl bg-gray-50/70 p-6 space-y-4">
            <h2 class="text-lg font-semibold text-gray-800">목표 선택 팁</h2>
            <ul class="space-y-3 text-sm text-gray-600">
              <li class="flex items-start gap-2">
                <span class="mt-1 text-emerald-500">•</span>
                <span>하루 안에 실천할 수 있는 작은 목표부터 시작해보세요.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 text-emerald-500">•</span>
                <span>목표를 구체적으로 적을수록 영어 일기가 쓰기 쉬워져요.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="mt-1 text-emerald-500">•</span>
                <span>루틴을 만들고 싶다면 전날과 연결되는 목표를 선택해보세요.</span>
              </li>
            </ul>
            <div class="rounded-xl bg-white p-4 shadow-sm border border-emerald-100">
              <p class="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Tip</p>
              <p class="text-sm text-gray-600 mt-2">직접 목표를 입력하면 나만의 챌린지를 만들 수 있어요. 팀과 공유하고 싶다면 크루 챌린지를 활용하세요.</p>
            </div>
          </aside>
          <div class="lg:col-span-2 space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${goalOptions
                .map(
                  (option) => `
                  <button
                    class="goal-option group relative overflow-hidden p-6 rounded-2xl border-2 border-gray-100 bg-white transition-all hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg"
                    data-type="${option.type}"
                  >
                    <div class="flex items-center justify-between">
                      <span class="text-4xl">${option.icon}</span>
                      <span class="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-600">추천</span>
                    </div>
                    <h3 class="mt-4 text-xl font-semibold text-gray-800">${option.label}</h3>
                    <p class="mt-2 text-sm text-gray-500">${option.examples.join(', ')}</p>
                  </button>
                `,
                )
                .join('')}
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              <div id="custom-goal-container" style="display:none;" class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">
                  커스텀 목표
                </label>
                <input
                  type="text"
                  id="custom-goal-input"
                  placeholder="예: 15분 명상하고 느낀 점 정리하기"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                />
              </div>
              <div class="space-y-2 md:col-span-2">
                <label class="block text-sm font-semibold text-gray-700">
                  목표 상세 설명 (선택)
                </label>
                <textarea
                  id="goal-description"
                  placeholder="예: 점심 식사 후 30분간 조깅을 하고 간단한 스트레칭을 할 예정입니다."
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent h-28 resize-none transition"
                ></textarea>
              </div>
            </div>
            <button
              id="submit-goal"
              class="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              ✅ 목표 설정 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  `
}

function setupGoalSettingHandlers() {
  const buttons = document.querySelectorAll('.goal-option')
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedGoalType = btn.dataset.type
      buttons.forEach((b) => {
        b.classList.remove('ring-2', 'ring-emerald-400', 'bg-emerald-50', 'border-emerald-400')
        b.classList.add('border-gray-100')
      })
      btn.classList.remove('border-gray-100')
      btn.classList.add('ring-2', 'ring-emerald-400', 'bg-emerald-50', 'border-emerald-400')
      const customContainer = document.getElementById('custom-goal-container')
      if (state.selectedGoalType === 'other') {
        customContainer.style.display = 'block'
      } else {
        customContainer.style.display = 'none'
      }
    })
  })

  const submitGoal = () => {
    const description = document.getElementById('goal-description').value.trim()
    let goalText = ''

    if (!state.selectedGoalType) {
      alert('목표를 선택해주세요')
      return
    }

    if (state.selectedGoalType === 'other') {
      goalText = document.getElementById('custom-goal-input').value.trim()
      if (!goalText) {
        alert('커스텀 목표를 입력해주세요')
        return
      }
    } else {
      const option = goalOptions.find((g) => g.type === state.selectedGoalType)
      goalText = option ? option.label : ''
    }

    // 오늘 날짜에 완료된 챌린지가 있는지 확인
    const today = getTodayDateString()
    const todayChallenge = getTodayChallenge(today)
    let targetDate = today
    
    // 오늘 완료된 챌린지가 있으면 다음 날짜로 저장
    if (todayChallenge && todayChallenge.quizPassed) {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      targetDate = toDateKey(tomorrow)
    }

    const challenge = {
      date: targetDate,
      goal: goalText,
      goalType: state.selectedGoalType,
      goalDescription: description,
      diary: '',
      feedback: null,
      quizData: null,
      quizPassed: false,
      quizScore: 0,
    }

    saveChallenge(challenge.date, challenge)
    state.selectedGoalType = null
    state.currentChallenge = challenge
    renderHome()
  }

  document.getElementById('submit-goal').addEventListener('click', submitGoal)
  
  // 엔터키로 제출
  const goalDescription = document.getElementById('goal-description')
  const customGoalInput = document.getElementById('custom-goal-input')
  
  if (goalDescription) {
    goalDescription.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        submitGoal()
      }
    })
  }
  
  if (customGoalInput) {
    customGoalInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        submitGoal()
      }
    })
  }
}

function renderDiaryWriting() {
  const challenge = state.currentChallenge
  return `
    <div class="max-w-5xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <header class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div class="flex items-center gap-4">
            <span class="text-4xl">📘</span>
            <div>
              <p class="text-xs font-semibold text-blue-500 uppercase tracking-widest">Step 2</p>
              <h1 class="text-3xl font-bold text-gray-900">오늘의 경험을 영어로 적어보세요</h1>
              <p class="text-sm text-gray-500 mt-1">문장을 길게 쓰지 않아도 괜찮아요. 중요한 순간과 느낌을 영어로 표현해보세요.</p>
            </div>
          </div>
          <div class="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold flex items-center gap-2">
            <span class="text-lg">📝</span>
            <span>일기 작성 단계</span>
          </div>
        </header>
        <div class="grid gap-6 lg:grid-cols-5">
          <aside class="lg:col-span-2 space-y-4">
            <div class="rounded-2xl border border-blue-100 bg-blue-50/40 p-5 space-y-3">
              <p class="text-xs font-semibold text-blue-500 uppercase tracking-wide">오늘의 목표</p>
              <p class="text-lg font-semibold text-gray-800 leading-snug">${escapeHtml(challenge?.goal || '아직 목표가 설정되지 않았어요.')}</p>
              <p class="text-sm text-gray-500">목표 달성 과정을 중심으로, 무엇을 했고 어떤 느낌을 받았는지 적어보세요.</p>
            </div>
            <div class="rounded-2xl bg-gray-50 p-5 space-y-3">
              <h2 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">작성 가이드</h2>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex gap-2"><span class="text-blue-500">•</span><span>시간, 장소, 감정을 한 문장씩 넣어보세요.</span></li>
                <li class="flex gap-2"><span class="text-blue-500">•</span><span>어려운 문장은 간단한 표현으로 바꿔도 괜찮아요.</span></li>
                <li class="flex gap-2"><span class="text-blue-500">•</span><span>마지막에는 오늘 배운 점이나 느낀 점을 한 줄로 정리해보세요.</span></li>
              </ul>
            </div>
          </aside>
          <div class="lg:col-span-3 space-y-4">
            <label class="block text-sm font-semibold text-gray-700">영어 일기</label>
            <textarea
              id="diary-input"
              placeholder="예: Today I went for a 30-minute run in the park. The weather was perfect and I felt proud of myself..."
              class="w-full min-h-[260px] px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-gray-50 transition resize-none"
            >${challenge?.diary || ''}</textarea>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-500">
              <span>Tip: 영어로 떠오르는 문장을 먼저 적고, 나중에 AI가 자연스럽게 다듬어줄 거예요.</span>
              <span>최소 50자 이상 작성해주세요.</span>
            </div>
            <button
              id="submit-diary"
              class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              📤 일기 제출 및 AI 피드백 받기
            </button>
          </div>
        </div>
      </div>
    </div>
  `
}

function setupDiaryHandlers() {
  const submitDiary = async () => {
    const diary = document.getElementById('diary-input').value.trim()
    if (diary.length < 10) {
      alert('일기를 조금 더 자세히 작성해주세요')
      return
    }
    const feedback = await getAIFeedback(diary)
    const updated = {
      ...state.currentChallenge,
      diary,
      feedback,
    }
    saveChallenge(updated.date, updated)
    renderHome()
  }

  document.getElementById('submit-diary').addEventListener('click', submitDiary)
  
  // 엔터키로 제출 (Shift+Enter는 줄바꿈)
  const diaryInput = document.getElementById('diary-input')
  if (diaryInput) {
    diaryInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        submitDiary()
      }
    })
  }
}

function renderFeedbackView() {
  const feedback = state.currentChallenge.feedback
  if (!feedback) {
    return `<div class="bg-white rounded-2xl shadow-xl p-8">피드백을 불러올 수 없습니다.</div>`
  }

  const originalDiary = escapeHtml(state.currentChallenge.diary || '')
  const correctedText = escapeHtml(feedback.corrected)
  const feedbackMessage = escapeHtml(feedback.feedback)

  // 교정된 부분 하이라이트를 위한 비교 (간단한 버전)
  const originalSentences = originalDiary.split(/[.!?]+/).filter(s => s.trim())
  const correctedSentences = correctedText.split(/[.!?]+/).filter(s => s.trim())

  return `
    <div class="max-w-6xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <header class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div class="flex items-center gap-4">
            <span class="text-4xl">💬</span>
            <div>
              <p class="text-xs font-semibold text-purple-500 uppercase tracking-widest">Step 3</p>
              <h1 class="text-3xl font-bold text-gray-900">AI 피드백으로 글을 다듬어보세요</h1>
              <p class="text-sm text-gray-500 mt-1">교정된 문장을 비교하고, AI의 피드백을 확인해보세요.</p>
            </div>
          </div>
          <div class="px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-semibold flex items-center gap-2">
            <span class="text-lg">🤖</span>
            <span>AI 피드백 단계</span>
          </div>
        </header>

        <div class="space-y-6">
          <section class="grid gap-4 md:grid-cols-2">
            <div class="rounded-2xl border-2 border-gray-200 bg-gray-50/50 p-6 space-y-4">
              <div class="flex items-center gap-2 text-gray-700 text-base font-bold">
                <span class="text-2xl">📝</span>
                <span>내가 작성한 일기</span>
              </div>
              <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">${originalDiary}</p>
              </div>
            </div>
            <div class="rounded-2xl border-2 border-green-200 bg-green-50/40 p-6 space-y-4">
              <div class="flex items-center gap-2 text-green-700 text-base font-bold">
                <span class="text-2xl">✅</span>
                <span>AI가 교정한 일기</span>
              </div>
              <div class="bg-white rounded-xl p-5 shadow-sm border border-green-200">
                <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">${correctedText}</p>
              </div>
            </div>
          </section>
          
          <div class="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 space-y-4 border-2 border-blue-200">
            <div class="flex items-center gap-2 text-blue-700 text-base font-bold">
              <span class="text-2xl">🗒️</span>
              <span>AI 피드백 메시지</span>
            </div>
            <div class="bg-white rounded-xl p-5 shadow-sm border border-blue-200">
              <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">${feedbackMessage}</p>
            </div>
          </div>

          <div class="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 border-2 border-purple-200">
            <div class="flex items-center gap-2 text-purple-700 text-base font-bold mb-4">
              <span class="text-2xl">📊</span>
              <span>교정 통계</span>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div class="bg-white rounded-xl p-4 text-center border border-purple-200 shadow-sm">
                <div class="text-2xl font-bold text-purple-600">${feedback.expressions?.length || 0}</div>
                <div class="text-xs text-gray-600 mt-1">추출된 표현</div>
              </div>
              <div class="bg-white rounded-xl p-4 text-center border border-blue-200 shadow-sm">
                <div class="text-2xl font-bold text-blue-600">${originalSentences.length}</div>
                <div class="text-xs text-gray-600 mt-1">원본 문장</div>
              </div>
              <div class="bg-white rounded-xl p-4 text-center border border-green-200 shadow-sm">
                <div class="text-2xl font-bold text-green-600">${correctedSentences.length}</div>
                <div class="text-xs text-gray-600 mt-1">교정 문장</div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button
            id="view-expressions"
            class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>📚</span>
            <span>표현 학습하러 가기 →</span>
          </button>
        </div>
       </div>
     </div>
   `
 }

function renderExpressionsView() {
  const feedback = state.currentChallenge.feedback
  if (!feedback || !feedback.expressions || feedback.expressions.length === 0) {
    return `<div class="bg-white rounded-2xl shadow-xl p-8">표현 정보를 불러올 수 없습니다.</div>`
  }

  return `
    <div class="max-w-6xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <header class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div class="flex items-center gap-4">
            <span class="text-4xl">📚</span>
            <div>
              <p class="text-xs font-semibold text-purple-500 uppercase tracking-widest">Step 4</p>
              <h1 class="text-3xl font-bold text-gray-900">핵심 표현 상세 학습</h1>
              <p class="text-sm text-gray-500 mt-1">일기에서 추출한 표현들을 자세히 학습하고 퀴즈로 복습해보세요.</p>
            </div>
          </div>
          <div class="px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-semibold flex items-center gap-2">
            <span class="text-lg">📚</span>
            <span>표현 학습 단계</span>
          </div>
        </header>

        <div class="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 border-2 border-purple-200 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-gray-800 mb-2">총 ${feedback.expressions.length}개의 표현을 발견했어요!</h2>
              <p class="text-sm text-gray-600">각 표현의 의미, 예문, 유의어를 확인하고 자연스럽게 사용해보세요.</p>
            </div>
            <div class="text-4xl">✨</div>
          </div>
        </div>

        <section class="space-y-4">
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            ${feedback.expressions
              .map(
                (expr, idx) => `
                <article class="relative overflow-hidden rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <div class="absolute top-3 right-3">
                    <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-white/80 text-purple-600 border border-purple-200">#${idx + 1}</span>
                  </div>
                  
                  <div class="mb-4">
                    <div class="flex items-start justify-between mb-2">
                      <div class="flex-1">
                        <h3 class="text-3xl font-bold text-purple-700 mb-1">${escapeHtml(expr.word)}</h3>
                        ${expr.pronunciation ? `<p class="text-sm text-gray-500 font-medium">${escapeHtml(expr.pronunciation)}</p>` : ''}
                      </div>
                    </div>
                    <div class="bg-white/70 rounded-lg p-3 border border-purple-200 mt-3">
                      <p class="text-base font-semibold text-gray-800">${escapeHtml(expr.meaning)}</p>
                    </div>
                  </div>

                  ${expr.example ? `
                  <div class="mb-4">
                    <p class="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <span>💡</span>
                      <span>예문</span>
                    </p>
                    <div class="rounded-xl bg-white/80 p-4 border-2 border-purple-200 shadow-sm">
                      <p class="text-sm text-gray-700 italic leading-relaxed">"${escapeHtml(expr.example)}"</p>
                    </div>
                  </div>
                  ` : ''}

                  ${expr.synonyms && expr.synonyms.length > 0 ? `
                  <div class="mb-4">
                    <p class="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <span>🔗</span>
                      <span>유의어</span>
                    </p>
                    <div class="flex flex-wrap gap-2">
                      ${expr.synonyms
                        .map(
                          (syn) => `
                          <span class="px-3 py-1.5 rounded-full bg-white text-sm font-medium text-purple-600 border-2 border-purple-200 hover:bg-purple-100 transition-colors">${escapeHtml(syn)}</span>
                        `,
                        )
                        .join('')}
                    </div>
                  </div>
                  ` : ''}

                  <div class="pt-3 border-t border-purple-200">
                    <p class="text-xs text-gray-500 text-center">이 표현을 퀴즈에서 만나볼 수 있어요!</p>
                  </div>
                </article>
              `,
              )
              .join('')}
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              id="start-quiz"
              class="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg flex items-center justify-center gap-2 text-lg"
            >
              <span>✨</span>
              <span>표현 학습 퀴즈 시작하기</span>
            </button>
            <button
              id="back-to-feedback"
              class="px-6 py-4 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              <span>←</span>
              <span>피드백 다시 보기</span>
            </button>
          </div>
        </section>
       </div>
     </div>
   `
 }

function setupFeedbackHandlers() {
  const viewExpressionsBtn = document.getElementById('view-expressions')
  if (viewExpressionsBtn) {
    viewExpressionsBtn.addEventListener('click', () => {
      state.challengeStatus = 'expressions_viewed'
      renderHome(false, true)
    })
    
    // 엔터키로 표현 학습으로 이동
    document.addEventListener('keypress', function handleEnter(e) {
      if (e.key === 'Enter' && document.getElementById('view-expressions')) {
        state.challengeStatus = 'expressions_viewed'
        renderHome(false, true)
        document.removeEventListener('keypress', handleEnter)
      }
    })
  }
}

function setupExpressionsHandlers() {
  const startQuiz = () => {
    const feedback = state.currentChallenge.feedback
    if (!feedback || !feedback.expressions) {
      alert('표현 정보가 없습니다')
      return
    }
    const quizData = generateMockQuiz(feedback.expressions)
    const updated = {
      ...state.currentChallenge,
      quizData,
    }
    saveChallenge(updated.date, updated)
    renderHome()
  }

  const startQuizBtn = document.getElementById('start-quiz')
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', startQuiz)
    
    // 엔터키로 퀴즈 시작
    document.addEventListener('keypress', function handleEnter(e) {
      if (e.key === 'Enter' && document.getElementById('start-quiz')) {
        startQuiz()
        document.removeEventListener('keypress', handleEnter)
      }
    })
  }

  const backToFeedbackBtn = document.getElementById('back-to-feedback')
  if (backToFeedbackBtn) {
    backToFeedbackBtn.addEventListener('click', () => {
      state.challengeStatus = 'feedback_viewed'
      renderHome(false, true)
    })
  }
}

function renderQuestionContent(question, progress, selected) {
  const questionType = question.type || 'meaning'
  const typeLabels = {
    meaning: '단어 의미',
    fillBlank: '빈칸 채우기',
    sentence: '문장 완성',
    synonym: '동의어 찾기',
    context: '문맥 이해',
  }

  switch (questionType) {
    case 'fillBlank':
      return `
        <article class="rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <p class="text-xs font-semibold text-pink-500 uppercase tracking-wide">Question ${progress + 1}</p>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-600">${typeLabels.fillBlank}</span>
          </div>
          <h2 class="text-lg font-bold text-gray-900 mb-4">${escapeHtml(question.question)}</h2>
          <div class="bg-white rounded-xl p-4 border-2 border-dashed border-pink-200">
            <p class="text-base text-gray-800 leading-relaxed">
              ${escapeHtml(question.sentence || '').replace('______', '<span class="px-2 py-1 bg-pink-100 rounded font-semibold text-pink-600">______</span>')}
            </p>
          </div>
        </article>
      `
    case 'sentence':
      return `
        <article class="rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <p class="text-xs font-semibold text-pink-500 uppercase tracking-wide">Question ${progress + 1}</p>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-600">${typeLabels.sentence}</span>
          </div>
          <h2 class="text-lg font-bold text-gray-900 mb-2">${escapeHtml(question.question)}</h2>
          <p class="text-sm text-gray-600 mb-4">다음 중 올바른 문장을 선택하세요.</p>
        </article>
      `
    case 'synonym':
      return `
        <article class="rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <p class="text-xs font-semibold text-pink-500 uppercase tracking-wide">Question ${progress + 1}</p>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-600">${typeLabels.synonym}</span>
          </div>
          <h2 class="text-lg font-bold text-gray-900 mb-2">${escapeHtml(question.question)}</h2>
          <p class="text-sm text-gray-600">비슷한 의미의 단어를 찾아보세요.</p>
        </article>
      `
    case 'context':
      return `
        <article class="rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <p class="text-xs font-semibold text-pink-500 uppercase tracking-wide">Question ${progress + 1}</p>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-600">${typeLabels.context}</span>
          </div>
          <h2 class="text-lg font-bold text-gray-900 mb-2">${escapeHtml(question.question)}</h2>
          <p class="text-sm text-pink-600 font-medium mb-2">💡 ${escapeHtml(question.contextHint || '')}</p>
          <p class="text-sm text-gray-600">문맥에 가장 적절한 표현을 선택하세요.</p>
        </article>
      `
    default:
      return `
        <article class="rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <p class="text-xs font-semibold text-pink-500 uppercase tracking-wide">Question ${progress + 1}</p>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-600">${typeLabels.meaning}</span>
          </div>
          <h2 class="text-lg font-bold text-gray-900 leading-snug mb-2">${escapeHtml(question.question)}</h2>
          <p class="mt-2 text-base font-semibold text-pink-600">"${escapeHtml(question.word)}"</p>
        </article>
      `
  }
}

function renderQuizView() {
  const quizData = state.currentChallenge.quizData
  if (!quizData || !quizData.questions) {
    return `<div class="bg-white rounded-2xl shadow-xl p-8">퀴즈 데이터를 불러올 수 없습니다.</div>`
  }

  const progress = Math.min(state.currentChallenge.currentQuestionIndex || 0, quizData.questions.length - 1)
  const question = quizData.questions[progress]
  const selected = state.currentChallenge.selectedAnswers || {}
  const total = quizData.questions.length
  const percent = Math.round(((progress + 1) / total) * 100)
  const passThreshold = Math.ceil(total * 0.8)

  return `
    <div class="max-w-5xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <header class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div class="flex items-center gap-4">
            <span class="text-4xl">🧠</span>
            <div>
              <p class="text-xs font-semibold text-pink-500 uppercase tracking-widest">Step 4</p>
              <h1 class="text-3xl font-bold text-gray-900">표현 학습 퀴즈로 복습해요</h1>
              <p class="text-sm text-gray-500 mt-1">5문제 중 ${passThreshold}문제 이상 맞추면 오늘의 챌린지가 완료됩니다.</p>
            </div>
          </div>
          <div class="px-4 py-2 rounded-full bg-pink-50 text-pink-600 text-sm font-semibold flex items-center gap-2">
            <span class="text-lg">✅</span>
            <span>퀴즈 단계</span>
          </div>
        </header>

        <div class="grid gap-6 xl:grid-cols-5">
          <aside class="xl:col-span-2 space-y-4">
            <div class="rounded-2xl border border-pink-100 bg-pink-50/40 p-5 space-y-3">
              <div class="flex items-center justify-between text-sm text-pink-600 font-semibold">
                <span>진행률</span>
                <span>${progress + 1} / ${total}</span>
              </div>
              <div class="w-full h-2 bg-white/70 rounded-full overflow-hidden">
                <div class="h-2 bg-gradient-to-r from-pink-500 to-pink-600" style="width: ${percent}%;"></div>
              </div>
              <p class="text-xs text-gray-600">정답을 선택한 뒤 다음 문제 버튼을 누르면 자동으로 저장됩니다.</p>
            </div>
            <div class="rounded-2xl bg-gray-50 p-5 space-y-3 border border-gray-100">
              <h2 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">퀴즈 팁</h2>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex gap-2"><span class="text-pink-500">•</span><span>뜻을 모를 때는 오늘의 표현 카드를 다시 확인해보세요.</span></li>
                <li class="flex gap-2"><span class="text-pink-500">•</span><span>틀려도 괜찮아요. 다시 시도할 수 있어요.</span></li>
                <li class="flex gap-2"><span class="text-pink-500">•</span><span>정답을 선택하면 카드 색이 바뀝니다.</span></li>
              </ul>
            </div>
          </aside>

          <section class="xl:col-span-3 space-y-6">
            ${renderQuestionContent(question, progress, selected)}
            <div class="space-y-3">
              ${question.options
                .map(
                  (option, idx) => {
                    const isSentenceType = question.type === 'sentence'
                    return `
                  <button
                    class="quiz-option w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selected[progress] === option ? 'border-pink-500 bg-pink-50 shadow-sm' : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50/60'
                    }"
                    data-option-index="${idx}"
                   >
                     <div class="flex items-start gap-3">
                       <div class="w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                         selected[progress] === option ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'
                       }">
                         ${String.fromCharCode(65 + idx)}
                       </div>
                       <span class="text-sm text-gray-800 ${isSentenceType ? 'leading-relaxed italic' : ''}">${escapeHtml(option)}</span>
                     </div>
                   </button>
                 `
                  },
                 )
                 .join('')}
            </div>
            <button
              id="next-question"
              class="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              ${progress + 1 === total ? '✅ 퀴즈 완료하기' : '다음 문제로 이동'}
            </button>
          </section>
        </div>
      </div>
    </div>
  `
}

function setupQuizHandlers() {
  const quizData = state.currentChallenge.quizData
  if (!quizData) return

  const total = quizData.questions.length
  const currentIndex = state.currentChallenge.currentQuestionIndex || 0
  const isLast = currentIndex === total - 1

  document.querySelectorAll('.quiz-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const optionIndex = Number(btn.dataset.optionIndex)
      if (Number.isNaN(optionIndex)) {
        return
      }
      const questionOptions = quizData.questions[currentIndex]?.options || []
      const answer = questionOptions[optionIndex]
      if (answer === undefined) {
        return
      }
      const selected = state.currentChallenge.selectedAnswers || {}
      selected[currentIndex] = answer
      const updated = {
        ...state.currentChallenge,
        selectedAnswers: selected,
      }
      saveChallenge(updated.date, updated)
      // 상태 업데이트
      state.currentChallenge = updated
      renderHome()
    })
  })

  const goToNext = () => {
    const selected = state.currentChallenge.selectedAnswers || {}
    if (!selected[currentIndex]) {
      alert('답을 선택해주세요')
      return
    }
    if (isLast) {
      finishQuiz()
    } else {
      const updated = {
        ...state.currentChallenge,
        currentQuestionIndex: currentIndex + 1,
      }
      saveChallenge(updated.date, updated)
      // 상태 업데이트
      state.currentChallenge = updated
      renderHome()
    }
  }

  const nextBtn = document.getElementById('next-question')
  if (nextBtn) {
    nextBtn.addEventListener('click', goToNext)
    
    // 엔터키로 다음 문제로 이동
    document.addEventListener('keypress', function handleEnter(e) {
      if (e.key === 'Enter' && document.getElementById('next-question')) {
        goToNext()
        document.removeEventListener('keypress', handleEnter)
      }
    })
  }
}

function finishQuiz() {
  const quizData = state.currentChallenge.quizData
  const selected = state.currentChallenge.selectedAnswers || {}
  let correct = 0
  quizData.questions.forEach((q, idx) => {
    if (selected[idx] === q.correctAnswer) correct++
  })
  const passThreshold = Math.ceil(quizData.questions.length * 0.8)
  const passed = correct >= passThreshold

  const updated = {
    ...state.currentChallenge,
    quizPassed: passed,
    quizScore: correct,
    completedAt: new Date().toISOString(),
  }
  saveChallenge(updated.date, updated)
  // 상태 업데이트
  state.currentChallenge = updated
  renderQuizResult(passed, correct, quizData.questions.length, passThreshold)
}

function renderQuizResult(passed, score, total, threshold) {
  const quizData = state.currentChallenge.quizData
  const selected = state.currentChallenge.selectedAnswers || {}
  
  // 오답 확인을 위한 문제 리스트 생성
  const reviewItems = quizData.questions.map((q, idx) => {
    const userAnswer = selected[idx]
    const isCorrect = userAnswer === q.correctAnswer
    return {
      question: q,
      userAnswer,
      isCorrect,
      index: idx
    }
  })
  
  const resultHTML = `
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center mb-8">
          ${
            passed
              ? `
                <div class="mx-auto text-yellow-500 mb-4 text-6xl">🏆</div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">축하합니다! 🎉</h1>
                <p class="text-xl text-gray-600 mb-4">퀴즈를 통과했습니다!</p>
                <div class="bg-green-50 p-6 rounded-xl mb-6">
                  <p class="text-2xl font-bold text-green-600">${score} / ${total}</p>
                  <p class="text-gray-600 mt-2">정답률</p>
                </div>
              `
              : `
                <div class="mx-auto text-red-500 mb-4 text-6xl">❌</div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">아쉽네요 😔</h1>
                <p class="text-xl text-gray-600 mb-4">${threshold}개 이상 맞춰야 통과합니다</p>
                <div class="bg-red-50 p-6 rounded-xl mb-6">
                  <p class="text-2xl font-bold text-red-600">${score} / ${total}</p>
                  <p class="text-gray-600 mt-2">정답률</p>
                </div>
              `
          }
        </div>
        
        <!-- 오답 확인 섹션 -->
        <div class="border-t border-gray-200 pt-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>📝</span>
            <span>문제별 정답 확인</span>
          </h2>
          <div class="space-y-4">
            ${reviewItems.map((item, idx) => {
              const q = item.question
              const questionText = q.type === 'fillBlank' 
                ? `${q.question}<br><span class="text-gray-600 italic">${q.sentence}</span>`
                : q.type === 'sentence'
                ? `${q.question}`
                : q.type === 'context'
                ? `${q.question}<br><span class="text-sm text-gray-500">${q.contextHint}</span>`
                : q.question
              
              return `
                <div class="border-2 rounded-xl p-5 ${item.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center gap-3">
                      <span class="text-lg font-bold text-gray-700">문제 ${idx + 1}</span>
                      ${item.isCorrect 
                        ? '<span class="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">정답</span>'
                        : '<span class="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">오답</span>'
                      }
                    </div>
                  </div>
                  <div class="mb-4">
                    <p class="text-gray-800 font-semibold mb-2">${questionText}</p>
                    ${q.type === 'fillBlank' || q.type === 'sentence' || q.type === 'context' 
                      ? `<p class="text-sm text-gray-600 mb-2"><strong>단어:</strong> ${q.word}</p>`
                      : ''
                    }
                  </div>
                  <div class="space-y-2">
                    <div class="flex items-start gap-2">
                      <span class="text-sm font-semibold text-gray-600 min-w-[80px]">정답:</span>
                      <span class="text-sm text-green-700 font-semibold bg-green-100 px-3 py-1 rounded">${escapeHtml(q.correctAnswer)}</span>
                    </div>
                    ${!item.isCorrect ? `
                      <div class="flex items-start gap-2">
                        <span class="text-sm font-semibold text-gray-600 min-w-[80px]">내 답:</span>
                        <span class="text-sm text-red-700 font-semibold bg-red-100 px-3 py-1 rounded">${escapeHtml(item.userAnswer || '미선택')}</span>
                      </div>
                    ` : ''}
                  </div>
                </div>
              `
            }).join('')}
          </div>
        </div>
        
        <div class="mt-8 flex justify-center gap-4">
          ${
            passed
              ? `
                <button
                  id="go-dashboard"
                  class="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
                >
                  나무 보러가기 🌳
                </button>
              `
              : `
                <button
                  id="retry-quiz"
                  class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
                >
                  다시 시도하기 🔁
                </button>
              `
          }
        </div>
      </div>
    </div>
  `

  document.getElementById('content').innerHTML = resultHTML

  if (passed) {
    document.getElementById('go-dashboard').addEventListener('click', () => {
      // 상태를 다시 확인하여 최신 상태로 업데이트
      checkTodayStatus()
      renderHome()
    })
  } else {
    document.getElementById('retry-quiz').addEventListener('click', () => {
      const reset = {
        ...state.currentChallenge,
        currentQuestionIndex: 0,
        selectedAnswers: {},
        quizPassed: false,
        quizScore: 0,
      }
      saveChallenge(reset.date, reset)
      // 상태 업데이트
      state.currentChallenge = reset
      checkTodayStatus()
      renderHome()
    })
  }
}

function getTreeStage(streak) {
  // 한 달(30일) 기준으로 나무 성장 단계 설정
  if (streak === 0) return { emoji: '🌱', name: '0일', size: 'text-6xl', color: 'text-green-400' }
  if (streak < 8) return { emoji: '🌿', name: '1-7일', size: 'text-7xl', color: 'text-green-500' }
  if (streak < 16) return { emoji: '🌳', name: '8-15일', size: 'text-8xl', color: 'text-green-600' }
  if (streak < 24) return { emoji: '🌲', name: '16-23일', size: 'text-9xl', color: 'text-green-700' }
  if (streak < 30) return { emoji: '🌳', name: '24-29일', size: 'text-9xl', color: 'text-green-800' }
  return { emoji: '🌳🍎', name: '30일', size: 'text-9xl', color: 'text-green-900', fruit: true }
}

function renderTreePage() {
  const challenges = getAllChallenges()
  const totalDays = Object.values(challenges).filter((c) => c.quizPassed).length
  // 현재 달의 총 완료 일수 사용 (연속 달성일 아님)
  const completedDays = getCurrentMonthCompletedDays()
  const treeInfo = getTreeStage(completedDays)
  const treeSize = Math.min(completedDays * 10 + 80, 350)
  
  // 현재 달 정보
  const today = new Date()
  const currentMonth = today.getMonth() + 1
  const currentYear = today.getFullYear()
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
  
  // 한 달(30일) 기준으로 다음 단계 계산
  let nextStage, progressPercent
  if (completedDays < 8) {
    nextStage = 8
    progressPercent = (completedDays / 8) * 100
  } else if (completedDays < 16) {
    nextStage = 16
    progressPercent = ((completedDays - 8) / 8) * 100
  } else if (completedDays < 24) {
    nextStage = 24
    progressPercent = ((completedDays - 16) / 8) * 100
  } else if (completedDays < 30) {
    nextStage = 30
    progressPercent = ((completedDays - 24) / 6) * 100
  } else {
    nextStage = 30
    progressPercent = 100
  }
  const daysToNext = Math.max(0, nextStage - completedDays)

  // 현재 달의 완료한 날짜들만 (성장 타임라인)
  const monthStart = new Date(currentYear, currentMonth - 1, 1)
  const allCompletedDates = Object.keys(challenges)
    .filter(key => {
      const date = new Date(key + 'T00:00:00')
      return date >= monthStart && challenges[key].quizPassed
    })
    .sort()
  
  // 나무 성장 단계별 통계 (한 달 기준) - 총 완료 일수 기준
  const getCompletedDaysForDate = (dateKey) => {
    const monthStart = new Date(currentYear, currentMonth - 1, 1)
    const date = new Date(dateKey + 'T00:00:00')
    if (date < monthStart) return 0
    
    let count = 0
    let checkDate = new Date(monthStart)
    const targetDate = new Date(dateKey + 'T00:00:00')
    
    while (checkDate <= targetDate) {
      const checkKey = toDateKey(checkDate)
      const challenge = challenges[checkKey]
      if (challenge && challenge.quizPassed) {
        count++
      }
      checkDate.setDate(checkDate.getDate() + 1)
    }
    return count
  }
  
  const stageStats = {
    seedling: allCompletedDates.filter(d => {
      const s = getCompletedDaysForDate(d)
      return s === 0
    }).length,
    sapling: allCompletedDates.filter(d => {
      const s = getCompletedDaysForDate(d)
      return s >= 1 && s < 8
    }).length,
    young: allCompletedDates.filter(d => {
      const s = getCompletedDaysForDate(d)
      return s >= 8 && s < 16
    }).length,
    mature: allCompletedDates.filter(d => {
      const s = getCompletedDaysForDate(d)
      return s >= 16 && s < 24
    }).length,
    giant: allCompletedDates.filter(d => {
      const s = getCompletedDaysForDate(d)
      return s >= 24 && s < 30
    }).length,
    fruit: allCompletedDates.filter(d => {
      const s = getCompletedDaysForDate(d)
      return s >= 30
    }).length,
  }

  // 나무 성장 단계별 정보 (한 달 기준)
  const growthStages = [
    { emoji: '🌱', name: '0일', min: 0, max: 0, color: 'text-green-400' },
    { emoji: '🌿', name: '1-7일', min: 1, max: 7, color: 'text-green-500' },
    { emoji: '🌳', name: '8-15일', min: 8, max: 15, color: 'text-green-600' },
    { emoji: '🌲', name: '16-23일', min: 16, max: 23, color: 'text-green-700' },
    { emoji: '🌳', name: '24-29일', min: 24, max: 29, color: 'text-green-800' },
    { emoji: '🌳🍎', name: '30일', min: 30, max: 30, color: 'text-green-900', fruit: true },
  ]

  return `
    <div class="max-w-5xl mx-auto">
      <div class="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl shadow-xl p-8 mb-6 overflow-hidden relative">
        <!-- 배경 장식 -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div class="relative z-10">
          <h1 class="text-4xl font-bold text-center mb-2 text-gray-800">🌳 나무가 자라고 있어요!</h1>
          <p class="text-center text-gray-600 mb-8">이번 달 연속 달성일에 따라 나무가 자라요! (한 달마다 리셋)</p>
          
          <!-- 현재 나무 (성장 애니메이션) -->
          <div class="flex flex-col items-center justify-center mb-8 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-2 border-green-100">
            <div class="relative flex items-end justify-center mb-6 tree-container" style="height:${Math.max(treeSize, 250)}px; min-height:250px;">
              <div class="tree-growing ${treeInfo.size} ${treeInfo.color} relative" data-streak="${completedDays}">
                ${treeInfo.emoji}
                ${treeInfo.fruit ? `
                  <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <span class="text-4xl">🍎</span>
                  </div>
                  <div class="absolute -top-6 -left-4 animate-bounce" style="animation-delay: 0.2s">
                    <span class="text-3xl">🍊</span>
                  </div>
                  <div class="absolute -top-6 -right-4 animate-bounce" style="animation-delay: 0.4s">
                    <span class="text-3xl">🍇</span>
                  </div>
                ` : ''}
              </div>
              <!-- 성장 파티클 효과 -->
              <div class="absolute inset-0 particles"></div>
            </div>
            <div class="text-center">
              <p class="text-4xl font-bold ${treeInfo.color} mb-2 animate-pulse">${treeInfo.name}</p>
              <p class="text-3xl font-bold text-green-600 mb-1">이번 달 ${completedDays}일 완료</p>
              <p class="text-gray-600">총 ${totalDays}일 완료 · ${currentYear}년 ${currentMonth}월</p>
            </div>
            
            <!-- 성장 진행도 (애니메이션) -->
            <div class="w-full max-w-md mt-6">
              <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span class="font-semibold">다음 단계까지</span>
                <span class="font-bold text-green-600">${daysToNext}일 남음</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner relative">
                <div class="progress-bar bg-gradient-to-r from-green-400 via-green-500 to-green-600 h-6 rounded-full flex items-center justify-end pr-2" style="width: ${progressPercent}%">
                  <span class="text-xs font-bold text-white">${Math.round(progressPercent)}%</span>
                </div>
                <div class="absolute inset-0 shimmer"></div>
              </div>
              <div class="text-sm text-gray-500 mt-2 text-center">
                ${completedDays}일 / ${nextStage}일
              </div>
            </div>
          </div>
          
          <!-- 성장 단계 표시 -->
          <div class="grid grid-cols-6 gap-2 mb-6">
            ${growthStages.map((stage, idx) => {
              const isCurrent = completedDays >= stage.min && completedDays <= stage.max
              const isPast = completedDays > stage.max
              return `
                <div class="bg-white/80 backdrop-blur-sm rounded-xl p-3 text-center border-2 transition-all ${
                  isCurrent ? 'border-green-500 shadow-lg scale-105' : isPast ? 'border-green-300' : 'border-gray-200'
                }">
                  <div class="text-2xl mb-1 ${isCurrent ? 'animate-bounce' : ''}">${stage.emoji}</div>
                  <p class="text-xs font-semibold ${isCurrent ? 'text-green-600' : isPast ? 'text-green-500' : 'text-gray-400'}">${stage.name}</p>
                  ${isCurrent ? '<div class="mt-1 w-full bg-green-200 rounded-full h-1"><div class="bg-green-500 h-1 rounded-full animate-pulse" style="width: ${((completedDays - stage.min) / (stage.max - stage.min + 1)) * 100}%"></div></div>' : ''}
                </div>
              `
            }).join('')}
          </div>
        </div>
      </div>

      <!-- 성장 타임라인 -->
      ${allCompletedDates.length > 0 ? `
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <span class="text-green-500 text-3xl">📈</span>
          성장 타임라인
        </h2>
        <div class="space-y-4">
          ${allCompletedDates.reverse().map((dateKey, idx) => {
            const challenge = challenges[dateKey]
            const dateStr = formatKoreanDate(dateKey)
            // 해당 날짜까지의 총 완료 일수 계산
            const monthStart = new Date(currentYear, currentMonth - 1, 1)
            const date = new Date(dateKey + 'T00:00:00')
            let completedCount = 0
            let checkDate = new Date(monthStart)
            const targetDate = new Date(dateKey + 'T00:00:00')
            
            while (checkDate <= targetDate) {
              const checkKey = toDateKey(checkDate)
              const checkChallenge = challenges[checkKey]
              if (checkChallenge && checkChallenge.quizPassed) {
                completedCount++
              }
              checkDate.setDate(checkDate.getDate() + 1)
            }
            const stage = getTreeStage(completedCount)
            const isLatest = idx === 0
            
            return `
              <div class="flex items-start gap-4 p-4 rounded-xl border-2 transition-all ${
                isLatest 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-md' 
                  : 'bg-gray-50 border-gray-200 hover:border-green-200'
              }">
                <div class="flex-shrink-0">
                  <div class="text-5xl ${isLatest ? 'animate-pulse' : ''}">${stage.emoji}</div>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <p class="font-bold text-gray-800 text-lg">${dateStr}</p>
                    ${isLatest ? '<span class="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full">최신</span>' : ''}
                  </div>
                  <p class="text-sm text-gray-600 mb-2">${stage.name} · ${completedCount}일 완료</p>
                  ${challenge.goal ? `<p class="text-xs text-gray-500">목표: ${escapeHtml(challenge.goal)}</p>` : ''}
                </div>
                <div class="flex-shrink-0 text-right">
                  <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">완료</span>
                </div>
              </div>
            `
          }).join('')}
        </div>
      </div>
      ` : `
      <div class="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div class="text-6xl mb-4">🌱</div>
        <p class="text-xl font-semibold text-gray-600 mb-2">아직 나무가 자라지 않았어요</p>
        <p class="text-gray-500">퀴즈를 완료하면 나무가 자라기 시작합니다!</p>
      </div>
      `}
    </div>
    
    <style>
      /* 나무 성장 애니메이션 */
      .tree-growing {
        animation: treeGrow 3s ease-in-out infinite;
        transform-origin: bottom center;
      }
      
      @keyframes treeGrow {
        0%, 100% { 
          transform: scale(1) translateY(0);
          filter: brightness(1);
        }
        25% { 
          transform: scale(1.08) translateY(-5px);
          filter: brightness(1.1);
        }
        50% { 
          transform: scale(1.12) translateY(-8px);
          filter: brightness(1.15);
        }
        75% { 
          transform: scale(1.08) translateY(-5px);
          filter: brightness(1.1);
        }
      }
      
      /* 파티클 효과 */
      .particles::before,
      .particles::after {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        background: #10b981;
        border-radius: 50%;
        animation: float 4s ease-in-out infinite;
      }
      
      .particles::before {
        top: 20%;
        left: 30%;
        animation-delay: 0s;
      }
      
      .particles::after {
        top: 40%;
        right: 25%;
        animation-delay: 2s;
        background: #059669;
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0) scale(1);
          opacity: 0.6;
        }
        50% {
          transform: translateY(-20px) scale(1.2);
          opacity: 1;
        }
      }
      
      /* 진행도 바 애니메이션 */
      .progress-bar {
        animation: progressGrow 2s ease-out;
        position: relative;
        overflow: hidden;
      }
      
      @keyframes progressGrow {
        from {
          width: 0% !important;
        }
      }
      
      /* 반짝이는 효과 */
      .shimmer {
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.3),
          transparent
        );
        animation: shimmer 2s infinite;
      }
      
      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }
      
      /* 나무 컨테이너 */
      .tree-container {
        position: relative;
      }
      
      /* 성장 단계 하이라이트 */
      @keyframes pulse-glow {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
        }
        50% {
          box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
        }
      }
    </style>
    
    <script>
      // 페이지 로드 시 나무 성장 애니메이션 시작
      setTimeout(() => {
        const treeEl = document.querySelector('.tree-growing')
        if (treeEl) {
          treeEl.style.animation = 'none'
          setTimeout(() => {
            treeEl.style.animation = 'treeGrow 3s ease-in-out infinite'
          }, 10)
        }
        
        // 진행도 바 애니메이션
        const progressBar = document.querySelector('.progress-bar')
        if (progressBar) {
          const width = progressBar.style.width
          progressBar.style.width = '0%'
          setTimeout(() => {
            progressBar.style.width = width
          }, 100)
        }
      }, 100)
    </script>
  `
}

function getStreakForDate(dateKey, challenges) {
  let streak = 0
  let checkDate = new Date(dateKey + 'T00:00:00')
  
  // 해당 날짜가 속한 달의 첫 번째 날
  const monthStart = new Date(checkDate.getFullYear(), checkDate.getMonth(), 1)
  monthStart.setHours(0, 0, 0, 0)
  
  while (true) {
    // 현재 달을 벗어나면 중단
    if (checkDate < monthStart) {
      break
    }
    
    const checkKey = toDateKey(checkDate)
    const checkChallenge = challenges[checkKey]
    if (checkChallenge && checkChallenge.quizPassed) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}

function renderDashboard() {
  const challenges = getAllChallenges()
  const totalDays = Object.values(challenges).filter((c) => c.quizPassed).length
  // 현재 달의 총 완료 일수 사용 (연속 달성일 아님)
  const completedDays = getCurrentMonthCompletedDays()
  const treeInfo = getTreeStage(completedDays)
  const treeSize = Math.min(completedDays * 10 + 80, 350)
  
  // 현재 달 정보
  const today = new Date()
  const currentMonth = today.getMonth() + 1
  const currentYear = today.getFullYear()
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
  
  // 한 달(30일) 기준으로 다음 단계 계산
  let nextStage, progressPercent
  if (completedDays < 8) {
    nextStage = 8
    progressPercent = (completedDays / 8) * 100
  } else if (completedDays < 16) {
    nextStage = 16
    progressPercent = ((completedDays - 8) / 8) * 100
  } else if (completedDays < 24) {
    nextStage = 24
    progressPercent = ((completedDays - 16) / 8) * 100
  } else if (completedDays < 30) {
    nextStage = 30
    progressPercent = ((completedDays - 24) / 6) * 100
  } else {
    nextStage = 30
    progressPercent = 100
  }
  const daysToNext = Math.max(0, nextStage - completedDays)

  // 나무 성장 히스토리 (최근 완료한 날짜들)
  const sortedDates = Object.keys(challenges)
    .filter(key => challenges[key].quizPassed)
    .sort()
    .slice(-7) // 최근 7일

  return `
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-6">
        <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">🌱 My English Growth Tree</h1>
        <div class="flex flex-col items-center justify-center mb-8">
          <div class="relative flex items-end justify-center mb-4" style="height:${treeSize}px; min-height:200px;">
            <div class="${treeInfo.size} ${treeInfo.color} transition-all duration-500 animate-pulse relative">
              ${treeInfo.emoji}
              ${treeInfo.fruit ? `
                <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                  <span class="text-4xl">🍎</span>
                </div>
                <div class="absolute -top-6 -left-4 animate-bounce" style="animation-delay: 0.2s">
                  <span class="text-3xl">🍊</span>
                </div>
                <div class="absolute -top-6 -right-4 animate-bounce" style="animation-delay: 0.4s">
                  <span class="text-3xl">🍇</span>
                </div>
              ` : ''}
            </div>
          </div>
          <div class="mt-4 text-center">
            <p class="text-3xl font-bold ${treeInfo.color}">${treeInfo.name}</p>
            <p class="text-2xl font-bold text-green-600 mt-2">이번 달 ${completedDays}일 완료</p>
            <p class="text-gray-600 mt-2">이번 달 완료한 일수가 늘어날수록 나무가 자라요! (한 달마다 리셋)</p>
          </div>
          
          <!-- 성장 진행도 -->
          <div class="w-full max-w-md mt-6">
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>다음 단계까지</span>
              <span>${daysToNext}일 남음</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div class="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500" style="width: ${progressPercent}%"></div>
            </div>
            <div class="text-xs text-gray-500 mt-1 text-center">
              ${streak}일 / ${nextStage}일 (${Math.round(progressPercent)}%)
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
            <div class="flex items-center gap-3 mb-2">
              <span class="text-yellow-500 text-2xl">🏆</span>
              <h3 class="font-semibold text-gray-700">이번 달 완료</h3>
            </div>
            <p class="text-3xl font-bold text-green-600">${completedDays}일</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
            <div class="flex items-center gap-3 mb-2">
              <span class="text-blue-500 text-2xl">📅</span>
              <h3 class="font-semibold text-gray-700">총 완료</h3>
            </div>
            <p class="text-3xl font-bold text-blue-600">${totalDays}일</p>
          </div>
        </div>
        <div class="text-center space-y-3">
          <button id="start-today" class="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg">
            다음 챌린지 시작하기
          </button>
          <div>
            <button id="go-crew" class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">
              크루 챌린지 참여하기 👥
            </button>
          </div>
          <div>
            <button id="open-calendar" class="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all">
              캘린더에서 확인하기 📆
            </button>
          </div>
        </div>
      </div>
      
      <!-- 나무 성장 히스토리 -->
      ${sortedDates.length > 0 ? `
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <h2 class="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <span class="text-green-500 text-2xl">📈</span>
          나무 성장 기록
        </h2>
        <div class="space-y-3">
          ${sortedDates.reverse().map((dateKey) => {
            const challenge = challenges[dateKey]
            const dateStr = formatKoreanDate(dateKey)
            // 해당 날짜가 속한 달의 첫 번째 날
            const date = new Date(dateKey + 'T00:00:00')
            const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
            monthStart.setHours(0, 0, 0, 0)
            
            // 해당 날짜까지의 총 완료 일수 계산 (현재 달 내에서만)
            let completedCount = 0
            let checkDate = new Date(monthStart)
            const targetDate = new Date(dateKey + 'T00:00:00')
            
            while (checkDate <= targetDate) {
              const checkKey = toDateKey(checkDate)
              const checkChallenge = challenges[checkKey]
              if (checkChallenge && checkChallenge.quizPassed) {
                completedCount++
              }
              checkDate.setDate(checkDate.getDate() + 1)
            }
            const stage = getTreeStage(completedCount)
            return `
              <div class="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div class="text-4xl">${stage.emoji}</div>
                <div class="flex-1">
                  <p class="font-semibold text-gray-800">${dateStr}</p>
                  <p class="text-sm text-gray-600">${stage.name} · ${completedCount}일 완료</p>
                </div>
                <div class="text-right">
                  <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">완료</span>
                </div>
              </div>
            `
          }).join('')}
        </div>
      </div>
      ` : ''}
      
      <div class="bg-white rounded-2xl shadow-xl p-6">
        <h2 class="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <span class="text-green-500 text-2xl">🎯</span>
          오늘의 목표
        </h2>
        <p class="text-gray-600">
          오늘도 영어로 목표를 달성하고 성장하는 하루를 만들어보세요!
        </p>
      </div>
    </div>
  `
}

function setupDashboardHandlers() {
  const startBtn = document.getElementById('start-today')
  const crewBtn = document.getElementById('go-crew')
  const calendarBtn = document.getElementById('open-calendar')
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      const today = getTodayDateString()
      const challenge = getTodayChallenge(today)
      
      // 오늘 챌린지가 완료된 경우, 목표 설정 화면으로 이동
      if (challenge && challenge.quizPassed) {
        state.challengeStatus = 'no_goal'
        state.currentChallenge = null
        renderHome()
        return
      }
      
      // 오늘 챌린지가 완료되지 않은 경우
      if (!challenge) {
        state.challengeStatus = 'no_goal'
      } else {
        const status = determineChallengeStatus(challenge)
        state.challengeStatus = status === 'none' ? 'no_goal' : status
      }
      renderHome()
    })
  }
  if (crewBtn) {
    crewBtn.addEventListener('click', () => showPage('crew'))
  }
  if (calendarBtn) {
    calendarBtn.addEventListener('click', () => showPage('calendar'))
  }
}

function renderCrew() {
  const crewData = getCrewData()
  const hasCrew = crewData && crewData.name

  const content = hasCrew ? renderCrewDashboard(crewData) : renderCrewSetup()
  document.getElementById('content').innerHTML = content
  setupCrewHandlers(hasCrew)
}

function renderCrewSetup() {
  return `
    <div class="max-w-5xl mx-auto">
      <!-- 메인 헤더 -->
      <div class="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl shadow-xl p-8 mb-6 overflow-hidden relative">
        <!-- 배경 장식 -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-emerald-200 rounded-full opacity-20 blur-3xl"></div>
        
        <div class="relative z-10 text-center">
          <div class="text-7xl mb-6 animate-bounce">👥</div>
          <h1 class="text-4xl font-bold text-gray-800 mb-3">크루 챌린지</h1>
          <p class="text-lg text-gray-600 mb-2">친구들과 함께 목표를 공유하고 응원하세요</p>
          <p class="text-sm text-gray-500">함께 성장하는 즐거움을 경험해보세요! 🌱</p>
        </div>
      </div>

      <!-- 액션 카드 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- 크루 만들기 카드 -->
        <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all border-2 border-green-100 hover:border-green-300">
          <div class="text-center mb-6">
            <div class="text-6xl mb-4">🌳</div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">크루 만들기</h2>
            <p class="text-gray-600 text-sm">새로운 크루를 만들어 친구들을 초대하세요</p>
          </div>
          <ul class="space-y-2 mb-6 text-sm text-gray-600">
            <li class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              <span>나만의 크루 이름 정하기</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              <span>친구들에게 공유할 코드 생성</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-green-500">✓</span>
              <span>함께 성장하는 여정 시작</span>
            </li>
          </ul>
          <button id="create-crew" class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center gap-2 text-lg">
            <span class="text-2xl">➕</span>
            <span>크루 만들기</span>
          </button>
        </div>

        <!-- 크루 참여하기 카드 -->
        <div class="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all border-2 border-emerald-100 hover:border-emerald-300">
          <div class="text-center mb-6">
            <div class="text-6xl mb-4">🔑</div>
            <h2 class="text-2xl font-bold text-gray-800 mb-2">크루 참여하기</h2>
            <p class="text-gray-600 text-sm">친구가 공유한 코드로 크루에 합류하세요</p>
          </div>
          <ul class="space-y-2 mb-6 text-sm text-gray-600">
            <li class="flex items-center gap-2">
              <span class="text-emerald-500">✓</span>
              <span>크루 코드 입력하기</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-emerald-500">✓</span>
              <span>멤버들과 함께 챌린지</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="text-emerald-500">✓</span>
              <span>서로 응원하며 성장</span>
            </li>
          </ul>
          <button id="join-crew" class="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg flex items-center justify-center gap-2 text-lg">
            <span class="text-2xl">🔑</span>
            <span>크루 참여하기</span>
          </button>
        </div>
      </div>

      <!-- 크루의 장점 소개 -->
      <div class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-xl p-8 border-2 border-blue-100">
        <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
          <span class="text-3xl">✨</span>
          <span>크루 챌린지의 장점</span>
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl p-6 text-center shadow-md">
            <div class="text-4xl mb-3">🤝</div>
            <h4 class="font-semibold text-gray-800 mb-2">함께 성장</h4>
            <p class="text-sm text-gray-600">멤버들과 함께 목표를 달성하며 동기부여를 받아요</p>
          </div>
          <div class="bg-white rounded-xl p-6 text-center shadow-md">
            <div class="text-4xl mb-3">📊</div>
            <h4 class="font-semibold text-gray-800 mb-2">진행상황 공유</h4>
            <p class="text-sm text-gray-600">크루 멤버들의 진행상황을 한눈에 확인할 수 있어요</p>
          </div>
          <div class="bg-white rounded-xl p-6 text-center shadow-md">
            <div class="text-4xl mb-3">🏆</div>
            <h4 class="font-semibold text-gray-800 mb-2">랭킹 시스템</h4>
            <p class="text-sm text-gray-600">다른 크루들과 비교하며 더 높은 목표를 향해 도전해요</p>
          </div>
        </div>
      </div>

      <!-- 폼 영역 -->
      <div id="crew-form" class="mt-6"></div>
    </div>
  `
}

function renderCrewDashboard(crew) {
  const totalStreak = crew.members.reduce((sum, member) => sum + (member.streak || 0), 0)
  const totalDays = crew.members.reduce((sum, member) => sum + (member.totalDays || 0), 0)
  const avgStreak = crew.members.length > 0 ? Math.round(totalStreak / crew.members.length) : 0
  const avgDays = crew.members.length > 0 ? Math.round(totalDays / crew.members.length) : 0
  
  // 멤버를 연속일 순으로 정렬
  const sortedMembers = [...crew.members].sort((a, b) => (b.streak || 0) - (a.streak || 0))
  
  // 다른 크루들 가져오기 (모의 데이터)
  const otherCrews = getAllCrews().filter(c => c.code !== crew.code)
  
  return `
    <div class="max-w-6xl mx-auto space-y-6">
      <!-- 우리 크루 진행상황 -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center mb-6">
          <div class="text-5xl mb-4">🌳</div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">${crew.name}</h1>
          <p class="text-gray-600">크루 코드: <span class="font-mono font-bold">${crew.code}</span></p>
        </div>
        
        <!-- 크루 통계 -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl">
            <div class="text-xs font-semibold text-gray-600 mb-1">총 연속일</div>
            <p class="text-2xl font-bold text-green-600">${totalStreak}일</p>
          </div>
          <div class="bg-gradient-to-br from-emerald-50 to-teal-100 p-5 rounded-xl">
            <div class="text-xs font-semibold text-gray-600 mb-1">총 완료일</div>
            <p class="text-2xl font-bold text-emerald-600">${totalDays}일</p>
          </div>
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl">
            <div class="text-xs font-semibold text-gray-600 mb-1">평균 연속일</div>
            <p class="text-2xl font-bold text-blue-600">${avgStreak}일</p>
          </div>
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl">
            <div class="text-xs font-semibold text-gray-600 mb-1">멤버 수</div>
            <p class="text-2xl font-bold text-purple-600">${crew.members.length}명</p>
          </div>
        </div>
        
        <!-- 멤버별 상세 진행상황 -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-green-500 text-2xl">👥</span>
            크루 멤버 진행상황
          </h2>
          <div class="space-y-3">
            ${sortedMembers
              .map(
                (member, idx) => {
                  const rank = idx + 1
                  const rankEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '🏅'
                  return `
                    <div class="bg-gradient-to-r from-gray-50 to-green-50 p-4 rounded-xl border-2 border-green-100 flex justify-between items-center hover:shadow-md transition-all">
                      <div class="flex items-center gap-4">
                        <div class="text-2xl">${rankEmoji}</div>
                        <div>
                          <p class="font-semibold text-gray-800 text-lg">${member.name}</p>
                          <div class="flex gap-4 mt-1">
                            <span class="text-sm text-gray-600">🔥 연속 <span class="font-bold text-green-600">${member.streak || 0}일</span></span>
                            <span class="text-sm text-gray-600">✅ 총 <span class="font-bold text-emerald-600">${member.totalDays || 0}일</span> 완료</span>
                          </div>
                        </div>
                      </div>
                      <div class="text-right">
                        <div class="text-xs text-gray-500 mb-1">${rank}위</div>
                        <div class="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div class="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full" style="width: ${Math.min(((member.streak || 0) / Math.max(totalStreak, 1)) * 100, 100)}%"></div>
                        </div>
                      </div>
                    </div>
                  `
                }
              )
              .join('')}
          </div>
        </div>
        
        <!-- 응원 메시지 -->
        <div class="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-6 rounded-xl border-2 border-blue-200 shadow-lg" style="background: linear-gradient(135deg, rgba(240, 249, 255, 0.9), rgba(224, 242, 254, 0.9), rgba(204, 251, 241, 0.9)); position: relative; overflow: hidden;">
          <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(255, 182, 193, 0.2) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
          <div style="position: absolute; bottom: -30px; left: -30px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(173, 216, 230, 0.2) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
          <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2 relative z-10">
            <span class="text-3xl animate-bounce">🫧</span>
            <span>크루 응원 메시지</span>
          </h3>
          
          <!-- 메시지 입력 폼 -->
          <div class="mb-4">
            <div class="flex gap-2">
              <input
                type="text"
                id="crew-message-input"
                placeholder="멤버들에게 응원 메시지를 남겨보세요! 💬"
                class="flex-1 px-4 py-2 border-2 border-blue-300 rounded-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 bg-white/80 backdrop-blur-sm"
                maxlength="100"
              />
              <button
                id="send-crew-message"
                class="px-6 py-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-full font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                💬 전송
              </button>
            </div>
          </div>
          
          <!-- 메시지 목록 -->
          <div id="crew-messages" class="space-y-4 max-h-96 overflow-y-auto px-4 py-5" style="background: linear-gradient(135deg, rgba(240, 249, 255, 0.5) 0%, rgba(224, 242, 254, 0.5) 50%, rgba(240, 253, 250, 0.5) 100%); border-radius: 1.5rem; position: relative; overflow-x: hidden; min-height: 200px;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: 
              radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 40%), 
              radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 50% 50%, rgba(255, 182, 193, 0.05) 0%, transparent 60%);
              pointer-events: none; z-index: 0;"></div>
            ${renderCrewMessages(crew.messages || [])}
          </div>
        </div>
      </div>
      
      <!-- 다른 크루 구경하기 -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span class="text-3xl">🏆</span>
          다른 크루 구경하기
        </h2>
        ${otherCrews.length > 0 ? `
          <div class="space-y-4">
            ${otherCrews
              .map((otherCrew, idx) => {
                const otherTotalStreak = otherCrew.members.reduce((sum, m) => sum + (m.streak || 0), 0)
                const otherTotalDays = otherCrew.members.reduce((sum, m) => sum + (m.totalDays || 0), 0)
                return `
                  <div class="bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-xl border-2 border-blue-100 hover:shadow-lg transition-all">
                    <div class="flex justify-between items-start">
                      <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                          <span class="text-3xl">🌳</span>
                          <div>
                            <h3 class="text-xl font-bold text-gray-800">${otherCrew.name}</h3>
                            <p class="text-xs text-gray-500">코드: <span class="font-mono">${otherCrew.code}</span></p>
                          </div>
                        </div>
                        <div class="grid grid-cols-3 gap-3 mt-3">
                          <div class="text-center">
                            <div class="text-xs text-gray-600 mb-1">멤버</div>
                            <div class="text-lg font-bold text-blue-600">${otherCrew.members.length}명</div>
                          </div>
                          <div class="text-center">
                            <div class="text-xs text-gray-600 mb-1">연속일</div>
                            <div class="text-lg font-bold text-green-600">${otherTotalStreak}일</div>
                          </div>
                          <div class="text-center">
                            <div class="text-xs text-gray-600 mb-1">완료일</div>
                            <div class="text-lg font-bold text-emerald-600">${otherTotalDays}일</div>
                          </div>
                        </div>
                      </div>
                      <div class="text-right ml-4">
                        <div class="text-2xl mb-1">${idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '🏅'}</div>
                        <div class="text-xs text-gray-500">${idx + 1}위</div>
                      </div>
                    </div>
                  </div>
                `
              })
              .join('')}
          </div>
        ` : `
          <div class="text-center py-12 bg-gray-50 rounded-xl">
            <div class="text-5xl mb-4">🔍</div>
            <p class="text-gray-600 mb-2">아직 다른 크루가 없어요</p>
            <p class="text-sm text-gray-500">친구들에게 크루 코드를 공유해보세요!</p>
          </div>
        `}
      </div>
      
      <button id="leave-crew" class="w-full bg-red-100 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-200 transition-all">
        ❌ 크루 나가기
      </button>
    </div>
  `
}

function renderCrewMessages(messages) {
  if (!messages || messages.length === 0) {
    return `
      <div class="text-center py-12 text-gray-500 text-sm relative">
        <div class="inline-block animate-bounce text-5xl mb-3">🫧</div>
        <p class="text-base">아직 응원 메시지가 없어요</p>
        <p class="text-sm mt-1">첫 메시지를 남겨보세요! 💬</p>
      </div>
    `
  }
  
  // 최신 메시지가 위로 오도록 정렬
  const sortedMessages = [...messages].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  
  // 비눗방울 색상 팔레트 (귀여운 반투명 파스텔 톤)
  const bubbleColors = [
    { border: 'rgba(147, 197, 253, 0.3)', text: 'text-blue-700', tail: 'rgba(191, 219, 254, 0.4)', emoji: '💙' },
    { border: 'rgba(252, 165, 165, 0.3)', text: 'text-pink-600', tail: 'rgba(254, 202, 202, 0.4)', emoji: '💗' },
    { border: 'rgba(167, 139, 250, 0.3)', text: 'text-purple-600', tail: 'rgba(196, 181, 253, 0.4)', emoji: '💜' },
    { border: 'rgba(134, 239, 172, 0.3)', text: 'text-green-600', tail: 'rgba(187, 247, 208, 0.4)', emoji: '💚' },
    { border: 'rgba(250, 204, 21, 0.3)', text: 'text-yellow-600', tail: 'rgba(254, 240, 138, 0.4)', emoji: '💛' },
    { border: 'rgba(251, 191, 36, 0.3)', text: 'text-amber-600', tail: 'rgba(253, 224, 71, 0.4)', emoji: '🧡' },
  ]
  
  return sortedMessages.map((msg, idx) => {
    const time = formatMessageTime(msg.timestamp)
    const color = bubbleColors[idx % bubbleColors.length]
    const isMine = msg.author === '나'
    const delay = idx * 0.2
    
    return `
      <div class="bubble-message bubble-rainbow ${isMine ? 'mine ml-auto' : 'mr-auto'}" 
           style="animation-delay: ${delay}s, ${delay + 0.4}s, ${delay + 0.8}s; border-color: ${color.border}; max-width: 80%;">
        <div class="bubble-content">
          <div class="flex justify-between items-start mb-2 gap-2">
            <div class="flex items-center gap-2">
              <span class="text-3xl animate-pulse">${color.emoji}</span>
              <span class="font-bold ${color.text} text-sm drop-shadow-lg" style="text-shadow: 0 1px 3px rgba(0,0,0,0.15);">${escapeHtml(msg.author)}</span>
            </div>
            <span class="text-xs ${color.text} opacity-85 whitespace-nowrap font-semibold" style="text-shadow: 0 1px 2px rgba(0,0,0,0.1);">${time}</span>
          </div>
          <p class="${color.text} text-base leading-relaxed break-words font-medium drop-shadow-lg" style="text-shadow: 0 1px 4px rgba(0,0,0,0.2);">${escapeHtml(msg.text)}</p>
        </div>
        <div class="bubble-decoration" style="top: 10px; right: 15px; width: 10px; height: 10px; animation-delay: ${delay + 0.6}s, ${delay + 1}s, ${delay + 0.3}s;"></div>
        <div class="bubble-decoration" style="bottom: 25px; left: 20px; width: 8px; height: 8px; animation-delay: ${delay + 1.2}s, ${delay + 1.6}s, ${delay + 0.9}s;"></div>
        <div class="bubble-decoration" style="top: 50%; right: 10px; width: 6px; height: 6px; animation-delay: ${delay + 1.8}s, ${delay + 2.2}s, ${delay + 1.5}s;"></div>
        <div class="bubble-decoration" style="top: 30%; left: 12px; width: 7px; height: 7px; animation-delay: ${delay + 2.4}s, ${delay + 2.8}s, ${delay + 2.1}s;"></div>
        <style>
          .bubble-message:nth-child(${idx + 1})::after {
            border-top-color: ${color.tail};
          }
        </style>
      </div>
    `
  }).join('')
}

function formatMessageTime(timestamp) {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return '방금 전'
  if (minutes < 60) return `${minutes}분 전`
  if (hours < 24) return `${hours}시간 전`
  if (days < 7) return `${days}일 전`
  return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
}

function setupCrewHandlers(hasCrew) {
  if (hasCrew) {
    document.getElementById('leave-crew').addEventListener('click', () => {
      localStorage.removeItem('crewData')
      renderCrew()
    })
    
    // 응원 메시지 전송 핸들러
    const sendBtn = document.getElementById('send-crew-message')
    const messageInput = document.getElementById('crew-message-input')
    
    if (sendBtn && messageInput) {
      const sendMessage = () => {
        const text = messageInput.value.trim()
        if (!text) {
          alert('메시지를 입력해주세요')
          return
        }
        
        const crewData = getCrewData()
        if (!crewData) return
        
        // 현재 사용자 이름 찾기 (첫 번째 멤버가 '나'인 경우)
        const currentUser = crewData.members.find(m => m.name === '나') || crewData.members[0]
        const author = currentUser ? currentUser.name : '나'
        
        // 메시지 추가
        if (!crewData.messages) {
          crewData.messages = []
        }
        
        crewData.messages.push({
          id: 'msg-' + Date.now(),
          author: author,
          text: text,
          timestamp: new Date().toISOString()
        })
        
        // 최대 50개 메시지만 유지
        if (crewData.messages.length > 50) {
          crewData.messages = crewData.messages.slice(-50)
        }
        
        localStorage.setItem('crewData', JSON.stringify(crewData))
        messageInput.value = ''
        renderCrew()
      }
      
      sendBtn.addEventListener('click', sendMessage)
      messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          sendMessage()
        }
      })
    }
    
    return
  }

  const formContainer = document.getElementById('crew-form')

  document.getElementById('create-crew').addEventListener('click', () => {
    formContainer.innerHTML = `
      <div class="bg-green-50 p-6 rounded-xl mt-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">크루 만들기</h3>
        <input
          type="text"
          id="crew-name"
          placeholder="크루 이름"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
        />
        <div class="flex gap-2">
          <button id="confirm-create" class="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold">생성하기</button>
          <button id="cancel-crew" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold">취소</button>
        </div>
      </div>
    `
    attachCrewCreate()
  })

  document.getElementById('join-crew').addEventListener('click', () => {
    formContainer.innerHTML = `
      <div class="bg-emerald-50 p-6 rounded-xl mt-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">크루 참여하기</h3>
        <input
          type="text"
          id="crew-code"
          placeholder="크루 코드"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
        />
        <div class="flex gap-2">
          <button id="confirm-join" class="flex-1 bg-emerald-500 text-white py-2 rounded-lg font-semibold">참여하기</button>
          <button id="cancel-crew" class="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold">취소</button>
        </div>
      </div>
    `
    attachCrewJoin()
  })
}

function attachCrewCreate() {
  document.getElementById('cancel-crew').addEventListener('click', () => {
    document.getElementById('crew-form').innerHTML = ''
  })
  document.getElementById('confirm-create').addEventListener('click', () => {
    const name = document.getElementById('crew-name').value.trim()
    if (!name) {
      alert('크루 이름을 입력해주세요')
      return
    }
    const code = generateCrewCode()
    const member = buildCurrentUser()
    const crewData = {
      name,
      code,
      members: [member],
      messages: [],
    }
    localStorage.setItem('crewData', JSON.stringify(crewData))
    
    // 크루 생성 후 코드 표시
    showCrewCodeModal(code, name)
    renderCrew()
  })
}

function attachCrewJoin() {
  document.getElementById('cancel-crew').addEventListener('click', () => {
    document.getElementById('crew-form').innerHTML = ''
  })
  document.getElementById('confirm-join').addEventListener('click', () => {
    const code = document.getElementById('crew-code').value.trim().toUpperCase()
    if (!code) {
      alert('크루 코드를 입력해주세요')
      return
    }
    const crewData = getCrewData()
    if (!crewData || crewData.code !== code) {
      alert('크루를 찾을 수 없습니다')
      return
    }
    const member = buildCurrentUser('새 멤버')
    crewData.members.push(member)
    localStorage.setItem('crewData', JSON.stringify(crewData))
    renderCrew()
  })
}

function buildCurrentUser(name = '나') {
  const streak = getStreakDays()
  const totalDays = Object.values(getAllChallenges()).filter((c) => c.quizPassed).length
  return {
    id: 'user-' + Date.now(),
    name,
    streak,
    totalDays,
  }
}

function checkTodayStatus() {
  const today = getTodayDateString()
  let challenge = getTodayChallenge(today)
  
  // 오늘 완료된 챌린지가 있고, 다음 날짜의 챌린지가 있으면 다음 날짜 챌린지를 사용
  if (challenge && challenge.quizPassed) {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowKey = toDateKey(tomorrow)
    const tomorrowChallenge = getTodayChallenge(tomorrowKey)
    if (tomorrowChallenge) {
      challenge = tomorrowChallenge
    } else if (state.challengeStatus === 'no_goal') {
      // 사용자가 명시적으로 다음 챌린지를 시작하려는 경우 상태를 유지
      state.currentChallenge = null
      return
    }
  }
  
  state.currentChallenge = challenge

  if (!challenge) {
    state.challengeStatus = 'no_goal'
    return
  }

  const status = determineChallengeStatus(challenge)
  state.challengeStatus = status === 'none' ? 'no_goal' : status
}

function getTodayDateString() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getTodayChallenge(date) {
  const stored = localStorage.getItem('challenges')
  if (!stored) return null
  const challenges = JSON.parse(stored)
  return challenges[date] || null
}

function saveChallenge(date, challenge) {
  const stored = localStorage.getItem('challenges')
  const challenges = stored ? JSON.parse(stored) : {}
  challenges[date] = challenge
  localStorage.setItem('challenges', JSON.stringify(challenges))
  state.currentChallenge = challenge
  checkTodayStatus()
}

function getAllChallenges() {
  const stored = localStorage.getItem('challenges')
  return stored ? JSON.parse(stored) : {}
}

// 현재 달의 총 완료 일수 계산 (연속 달성일 아님)
function getCurrentMonthCompletedDays() {
  const challenges = getAllChallenges()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // 현재 달의 첫 번째 날
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
  monthStart.setHours(0, 0, 0, 0)
  
  // 현재 달의 마지막 날
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  monthEnd.setHours(23, 59, 59, 999)
  
  // 현재 달의 모든 완료한 날짜 개수
  let completedDays = 0
  let currentDate = new Date(monthStart)
  
  while (currentDate <= monthEnd) {
    const dateKey = toDateKey(currentDate)
    const challenge = challenges[dateKey]
    
    if (challenge && challenge.quizPassed) {
      completedDays++
    }
    
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return completedDays
}

function getStreakDays() {
  const challenges = getAllChallenges()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // 현재 달의 첫 번째 날
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
  monthStart.setHours(0, 0, 0, 0)
  
  let streak = 0
  let currentDate = new Date(today)
  
  // 오늘부터 역순으로 연속된 날짜 확인 (현재 달 내에서만)
  while (true) {
    // 현재 달을 벗어나면 중단
    if (currentDate < monthStart) {
      break
    }
    
    const dateKey = toDateKey(currentDate)
    const challenge = challenges[dateKey]
    
    // 퀴즈를 통과한 챌린지가 있으면 연속 달성일 증가
    if (challenge && challenge.quizPassed) {
      streak++
      // 하루 전으로 이동
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      // 오늘이면 퀴즈 통과 여부와 관계없이 중단하지 않음 (아직 진행 중일 수 있음)
      if (dateKey === toDateKey(today)) {
        // 오늘 챌린지가 없거나 아직 완료하지 않았으면 streak는 0
        break
      } else {
        // 어제 이전 날짜에서 중단되면 연속이 끊긴 것
        break
      }
    }
  }
  
  return streak
}

function getAIFeedback(diary) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockFeedback(diary))
    }, 600)
  })
}

function getMockFeedback(diary) {
  if (!diary || diary.trim().length === 0) {
    return {
      corrected: '',
      feedback: '일기를 작성해주세요.',
      expressions: [],
    }
  }

  // 더 정교한 단어 추출 (명사, 동사, 형용사 등)
  const words = extractWords(diary)
  
  // 일기 내용 분석
  const diarySentences = diary.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const hasPastTense = /(went|did|was|were|had|came|felt|got|made|took|saw|thought|decided|started|finished|completed|achieved)/i.test(diary)
  const hasPresentTense = /(am|is|are|do|does|go|goes|feel|feel|get|make|take|see|think|decide|start|finish|complete|achieve)/i.test(diary)
  const hasFutureTense = /(will|going to|plan to|want to|hope to|try to)/i.test(diary)
  
  // 교정된 일기 생성 (문법 교정 포함)
  let corrected = diary.trim()
  
  // 0. 기본 정리 (공백, 줄바꿈 등)
  corrected = corrected
    .replace(/\n+/g, ' ') // 줄바꿈을 공백으로
    .replace(/\s+/g, ' ') // 여러 공백을 하나로
    .trim()
  
  // 1. 문장 분리 및 정리
  let sentences = corrected.split(/[.!?]+/).filter(s => s.trim().length > 0)
  
  // 2. 각 문장 교정
  sentences = sentences.map(sentence => {
    try {
      let s = sentence.trim()
      if (s.length === 0) return ''
      
      // 문장 시작 대문자
      s = s.charAt(0).toUpperCase() + s.slice(1)
      
      // 소문자 'i'를 대문자 'I'로 (단어 경계 확인)
      s = s.replace(/\bi\b/g, 'I')
      
      // 시제 맥락 감지 (가장 먼저 실행 - 다른 교정 로직에서 사용)
      const lowerSentence = s.toLowerCase()
      const pastIndicators = /(yesterday|last\s+(week|month|year|night|day|monday|tuesday|wednesday|thursday|friday|saturday|sunday)|ago|was|were|did|had|this\s+morning|this\s+afternoon|before|earlier|then|at\s+that\s+time|in\s+the\s+past|once|previously|earlier\s+today)/i
      const pastVerbs = /(went|did|was|were|had|came|felt|got|made|took|saw|thought|decided|started|finished|completed|achieved|walked|talked|worked|played|studied|tried|enjoyed|learned|practiced|improved|exercised|jogged|swam|danced|sang|spoke|listened|watched|bought|sold|gave|received|helped|visited|traveled|stayed|left|arrived|returned|opened|closed|turned|moved|sat|stood|ate|drank|slept|ran|wrote|read|met|found|said|told|knew|kept|brought|caught|taught|understood|chose|won|lost)/i
      
      const isPastContext = pastIndicators.test(s) || pastVerbs.test(s)
      const isPresentContext = /(today|now|every\s+(day|morning|evening|week|month)|always|usually|often|everyday|currently|right\s+now|nowadays|these\s+days|at\s+the\s+moment)/i.test(s) && !isPastContext
      const isFutureContext = /(tomorrow|next\s+(week|month|year|day|monday|tuesday|wednesday|thursday|friday|saturday|sunday)|will|going\s+to|plan\s+to|want\s+to|hope\s+to|try\s+to|gonna|shall)/i.test(s) && !isPastContext
      
      // 부정문 주어-동사 일치 교정 (가장 먼저 실행)
      // "I doesn't" -> "I don't" (오타 교정 포함)
      // 더 확실하게 매칭되도록 수정
      s = s.replace(/\bI\s+doesn'?t\b/gi, "I don't")
      s = s.replace(/\bI\s+dosen'?t\b/gi, "I don't")
      s = s.replace(/\bI\s+does\s+not\b/gi, "I don't")
      s = s.replace(/\bI\s+dosen\s+not\b/gi, "I don't")
      s = s.replace(/\b(you|we|they)\s+(doesn'?t|dosen'?t|does\s+not|dosen\s+not)\b/gi, (match, subj) => subj + " don't")
      
      // "he/she/it don't" -> "he/she/it doesn't"
      s = s.replace(/\b(he|she|it)\s+(don'?t|do\s+not)\b/gi, (match, subj) => subj + " doesn't")
      
      // 단수 명사 주어 + don't -> doesn't
      s = s.replace(/\b(the|a|an|my|your|his|her|its|our|their)\s+([a-z]+)\s+(don'?t|do\s+not)\b/gi, (match, article, noun, neg) => {
        // 복수형 명사가 아닌 경우
        const lowerNoun = noun.toLowerCase()
        if (!lowerNoun.endsWith('s') && !lowerNoun.endsWith('es') && !lowerNoun.endsWith('ies') && 
            lowerNoun !== 'children' && lowerNoun !== 'people' && lowerNoun !== 'men' && lowerNoun !== 'women') {
          return article + ' ' + noun + " doesn't"
        }
        return match
      })
      
      // 복수 명사 주어 + doesn't/dosen't -> don't
      s = s.replace(/\b(the|a|an|my|your|his|her|its|our|their)\s+([a-z]+(?:s|es|ies|children|people|men|women))\s+(doesn'?t|dosen'?t|does\s+not|dosen\s+not)\b/gi, (match, article, noun, neg) => {
        // 복수형 명사인 경우
        const lowerNoun = noun.toLowerCase()
        if (lowerNoun.endsWith('s') || lowerNoun.endsWith('es') || lowerNoun.endsWith('ies') || 
            lowerNoun === 'children' || lowerNoun === 'people' || lowerNoun === 'men' || lowerNoun === 'women') {
          return article + ' ' + noun + " don't"
        }
        return match
      })
      
      // 관사 교정: a/an (모음으로 시작하는 단어 앞에 an)
      s = s.replace(/\ba\s+([aeiouAEIOU][a-z]*)\b/g, 'an $1')
      // 자음으로 시작하는 단어 앞에 a (단, hour, honest 등 예외는 제외)
      s = s.replace(/\ban\s+([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ][a-z]*)\b/g, (match, word) => {
        if (!word) return match
        if (/^(hour|honest|honor)/i.test(word)) return match
        return 'a ' + word
      })
      
      // 주어-동사 수 일치 교정 (강화)
      // 1. be 동사 교정
      s = s.replace(/\bI\s+(is|are)\b/gi, 'I am')
      s = s.replace(/\b(you|we|they)\s+(is|am)\b/gi, (match, subj) => subj + ' are')
      s = s.replace(/\b(he|she|it)\s+(am|are)\b/gi, (match, subj) => subj + ' is')
      s = s.replace(/\b(I|he|she|it)\s+were\b/gi, (match, subj) => subj + ' was')
      s = s.replace(/\b(you|we|they)\s+was\b/gi, (match, subj) => subj + ' were')
      
      // 2. 단수 명사 주어 + 복수 동사 -> 단수 동사
      // "the book are" -> "the book is"
      // "my friend are" -> "my friend is"
      s = s.replace(/\b(the|a|an|my|your|his|her|its|our|their)\s+([a-z]+)\s+(are|were)\b/gi, (match, article, noun, verb) => {
        // 복수형 명사가 아닌 경우 (s, es, ies로 끝나지 않는 경우)
        if (!noun.endsWith('s') && !noun.endsWith('es') && !noun.endsWith('ies') && 
            noun !== 'children' && noun !== 'people' && noun !== 'men' && noun !== 'women') {
          if (verb === 'are') return article + ' ' + noun + ' is'
          if (verb === 'were') return article + ' ' + noun + ' was'
        }
        return match
      })
      
      // 3. 복수 명사 주어 + 단수 동사 -> 복수 동사
      // "the books is" -> "the books are"
      // "my friends is" -> "my friends are"
      s = s.replace(/\b(the|a|an|my|your|his|her|its|our|their)\s+([a-z]+(?:s|es|ies|children|people|men|women))\s+(is|was)\b/gi, (match, article, noun, verb) => {
        // 복수형 명사인 경우
        if (noun.endsWith('s') || noun.endsWith('es') || noun.endsWith('ies') || 
            noun === 'children' || noun === 'people' || noun === 'men' || noun === 'women') {
          if (verb === 'is') return article + ' ' + noun + ' are'
          if (verb === 'was') return article + ' ' + noun + ' were'
        }
        return match
      })
      
      // 4. 단수 명사 주어 + 일반 동사 (복수형) -> 단수형
      // "the book go" -> "the book goes" (현재형)
      // "my friend walk" -> "my friend walks"
      // 시제 맥락에 관계없이 주어-동사 수일치 교정 (현재형 맥락에서만)
      if (isPresentContext && !isPastContext && !isFutureContext) {
        const commonVerbs = ['go', 'walk', 'run', 'eat', 'drink', 'sleep', 'read', 'write', 'study', 'work', 'play', 'do', 'have', 'make', 'take', 'get', 'see', 'think', 'feel', 'come', 'become', 'begin', 'break', 'start', 'finish', 'enjoy', 'try', 'learn', 'practice', 'improve', 'achieve', 'exercise', 'jog', 'swim', 'dance', 'sing', 'speak', 'talk', 'listen', 'watch', 'buy', 'sell', 'give', 'receive', 'help', 'meet', 'visit', 'travel', 'stay', 'leave', 'arrive', 'return', 'open', 'close', 'turn', 'move', 'sit', 'stand', 'lie', 'wake', 'sleep']
        
        commonVerbs.forEach(verb => {
          // 단수 명사 주어 패턴
          const regex = new RegExp(`\\b(the|a|an|my|your|his|her|its|our|their)\\s+([a-z]+)\\s+${verb}\\b(?!\\s+(will|can|should|must|may|to|ing|ed|s))`, 'gi')
          s = s.replace(regex, (match, article, noun, offset, string) => {
            // 복수형 명사가 아닌 경우
            if (!noun.endsWith('s') && !noun.endsWith('es') && !noun.endsWith('ies') && 
                noun !== 'children' && noun !== 'people' && noun !== 'men' && noun !== 'women') {
              // 동사를 3인칭 단수형으로 변환
              if (verb === 'do') return article + ' ' + noun + ' does'
              if (verb === 'have') return article + ' ' + noun + ' has'
              if (verb === 'go') return article + ' ' + noun + ' goes'
              if (verb === 'say') return article + ' ' + noun + ' says'
              if (verb === 'try') return article + ' ' + noun + ' tries'
              if (verb === 'study') return article + ' ' + noun + ' studies'
              if (verb.endsWith('y') && !['ay', 'ey', 'oy', 'uy'].some(ending => verb.endsWith(ending))) {
                return article + ' ' + noun + ' ' + verb.slice(0, -1) + 'ies'
              }
              if (verb.endsWith('s') || verb.endsWith('x') || verb.endsWith('z') || verb.endsWith('ch') || verb.endsWith('sh')) {
                return article + ' ' + noun + ' ' + verb + 'es'
              }
              return article + ' ' + noun + ' ' + verb + 's'
            }
            return match
          })
        })
      }
      
      // 5. 복수 명사 주어 + 일반 동사 (단수형) -> 복수형
      // "the books goes" -> "the books go"
      // "my friends walks" -> "my friends walk"
      // 시제 맥락에 관계없이 주어-동사 수일치 교정 (현재형 맥락에서만)
      if (isPresentContext && !isPastContext && !isFutureContext) {
        const verbForms = ['goes', 'walks', 'runs', 'eats', 'drinks', 'sleeps', 'reads', 'writes', 'studies', 'works', 'plays', 'does', 'has', 'makes', 'takes', 'gets', 'sees', 'thinks', 'feels', 'comes', 'becomes', 'begins', 'breaks', 'starts', 'finishes', 'enjoys', 'tries', 'learns', 'practices', 'improves', 'achieves', 'exercises', 'jogs', 'swims', 'dances', 'sings', 'speaks', 'talks', 'listens', 'watches', 'buys', 'sells', 'gives', 'receives', 'helps', 'meets', 'visits', 'travels', 'stays', 'leaves', 'arrives', 'returns', 'opens', 'closes', 'turns', 'moves', 'sits', 'stands', 'lies', 'wakes', 'sleeps']
        
        verbForms.forEach(verbForm => {
          // 복수 명사 주어 패턴
          const regex = new RegExp(`\\b(the|a|an|my|your|his|her|its|our|their)\\s+([a-z]+(?:s|es|ies|children|people|men|women))\\s+${verbForm}\\b(?!\\s+(will|can|should|must|may|to|ing|ed))`, 'gi')
          s = s.replace(regex, (match, article, noun) => {
            // 복수형 명사인 경우 동사를 원형으로 변환
            let baseVerb = verbForm
            if (verbForm.endsWith('ies')) {
              baseVerb = verbForm.slice(0, -3) + 'y'
            } else if (verbForm.endsWith('es') && (verbForm.endsWith('ches') || verbForm.endsWith('shes') || verbForm.endsWith('xes') || verbForm.endsWith('zes'))) {
              baseVerb = verbForm.slice(0, -2)
            } else if (verbForm.endsWith('es')) {
              baseVerb = verbForm.slice(0, -1)
            } else if (verbForm.endsWith('s')) {
              baseVerb = verbForm.slice(0, -1)
            }
            if (verbForm === 'does') baseVerb = 'do'
            if (verbForm === 'has') baseVerb = 'have'
            if (verbForm === 'goes') baseVerb = 'go'
            if (verbForm === 'says') baseVerb = 'say'
            if (verbForm === 'tries') baseVerb = 'try'
            if (verbForm === 'studies') baseVerb = 'study'
            return article + ' ' + noun + ' ' + baseVerb
          })
        })
      }
      
      // 6. 대명사 주어 + 일반 동사 일치 교정 (현재형)
      // I/you/we/they + 동사+s -> 동사 원형
      s = s.replace(/\b(I|you|we|they)\s+(goes|walks|runs|eats|drinks|sleeps|reads|writes|studies|works|plays|does|has|makes|takes|gets|sees|thinks|feels|comes|becomes|begins|breaks|starts|finishes|enjoys|tries|learns|practices|improves|achieves|exercises|jogs|swims|dances|sings|speaks|talks|listens|watches|buys|sells|gives|receives|helps|meets|visits|travels|stays|leaves|arrives|returns|opens|closes|turns|moves|sits|stands|lies|wakes|sleeps)\b/gi, (match, subj, verb) => {
        // 동사에서 -s, -es, -ies 제거
        if (verb === 'does') return subj + ' do'
        if (verb === 'has') return subj + ' have'
        if (verb === 'goes') return subj + ' go'
        if (verb === 'says') return subj + ' say'
        if (verb.endsWith('ies')) return subj + ' ' + verb.slice(0, -3) + 'y'
        if (verb.endsWith('es') && (verb.endsWith('ches') || verb.endsWith('shes') || verb.endsWith('xes') || verb.endsWith('zes'))) return subj + ' ' + verb.slice(0, -2)
        if (verb.endsWith('es')) return subj + ' ' + verb.slice(0, -1)
        if (verb.endsWith('s')) return subj + ' ' + verb.slice(0, -1)
        return match
      })
      
      // 7. he/she/it + 동사 원형 -> 동사+s (현재형 맥락에서만)
      if (isPresentContext && !isPastContext && !isFutureContext) {
        s = s.replace(/\b(he|she|it)\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|try|learn|practice|improve|achieve|exercise|jog|swim|dance|sing|speak|talk|listen|watch|buy|sell|give|receive|help|meet|visit|travel|stay|leave|arrive|return|open|close|turn|move|sit|stand|lie|wake|sleep)\b(?!\s+(will|can|should|must|may|to|ing|ed))/gi, (match, subj, verb) => {
          if (verb === 'do') return subj + ' does'
          if (verb === 'have') return subj + ' has'
          if (verb === 'go') return subj + ' goes'
          if (verb === 'say') return subj + ' says'
          if (verb === 'try') return subj + ' tries'
          if (verb === 'study') return subj + ' studies'
          if (verb.endsWith('y') && !['ay', 'ey', 'oy', 'uy'].some(ending => verb.endsWith(ending))) {
            return subj + ' ' + verb.slice(0, -1) + 'ies'
          }
          if (verb.endsWith('s') || verb.endsWith('x') || verb.endsWith('z') || verb.endsWith('ch') || verb.endsWith('sh')) {
            return subj + ' ' + verb + 'es'
          }
          return subj + ' ' + verb + 's'
        })
      }
      
      // 시제 교정 (과거 시제 맥락에서 현재형 동사 -> 과거형 동사)
      // 1. "I am go" -> "I go" 또는 "I went" (am + 동사 원형 오류)
      s = s.replace(/\bI\s+am\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|try|learn|practice|improve|achieve|exercise|jog|swim|dance|sing|speak|talk|listen|watch|buy|sell|give|receive|help|meet|visit|travel|stay|leave|arrive|return|open|close|turn|move|sit|stand|lie|wake|sleep|wake\s+up|get\s+up|wake\s+up|fall\s+asleep)\b/gi, (match, verb) => {
        return isPastContext ? `I ${getPastTense(verb)}` : `I ${verb}`
      })
      
      // 2. "I is", "I are" -> "I am"
      s = s.replace(/\bI\s+(is|are)\b/gi, 'I am')
      
      // 3. "he go", "she go" -> "he goes", "she goes" (현재형)
      if (isPresentContext && !isPastContext && !isFutureContext) {
        const commonVerbs = ['go', 'walk', 'run', 'eat', 'drink', 'sleep', 'read', 'write', 'study', 'work', 'play', 'do', 'have', 'make', 'take', 'get', 'see', 'think', 'feel', 'come', 'become', 'begin', 'break', 'start', 'finish', 'enjoy', 'try', 'learn', 'practice', 'improve', 'achieve', 'exercise', 'jog', 'swim', 'dance', 'sing', 'speak', 'talk', 'listen', 'watch', 'buy', 'sell', 'give', 'receive', 'help', 'meet', 'visit', 'travel', 'stay', 'leave', 'arrive', 'return', 'open', 'close', 'turn', 'move', 'sit', 'stand', 'lie', 'wake', 'sleep']
        commonVerbs.forEach(verb => {
          const regex = new RegExp(`\\b(he|she|it)\\s+${verb}\\b`, 'gi')
          s = s.replace(regex, (match, subj) => {
            if (verb === 'do') return subj + ' does'
            if (verb === 'have') return subj + ' has'
            if (verb === 'go') return subj + ' goes'
            return subj + ' ' + verb + 's'
          })
        })
      }
      
      // 4. "I go yesterday" -> "I went yesterday" (과거 맥락에서 현재형 동사)
      // 먼저 주어를 찾고, 그 다음 동사를 교정
      if (isPastContext) {
        // 주어 패턴 찾기
        const subjectPattern = /\b(I|you|we|they|he|she|it|my\s+(friend|mom|dad|brother|sister|teacher)|the\s+(boy|girl|man|woman|teacher|student))\s+/gi
        const commonVerbs = ['go', 'walk', 'run', 'eat', 'drink', 'sleep', 'read', 'write', 'study', 'work', 'play', 'do', 'have', 'make', 'take', 'get', 'see', 'think', 'feel', 'come', 'become', 'begin', 'break', 'start', 'finish', 'enjoy', 'try', 'learn', 'practice', 'improve', 'achieve', 'exercise', 'jog', 'swim', 'dance', 'sing', 'speak', 'talk', 'listen', 'watch', 'buy', 'sell', 'give', 'receive', 'help', 'meet', 'visit', 'travel', 'stay', 'leave', 'arrive', 'return', 'open', 'close', 'turn', 'move', 'sit', 'stand', 'lie', 'wake', 'sleep']
        
        // 각 동사에 대해 교정 (과거형이 아닌 경우만)
        commonVerbs.forEach(verb => {
          // 이미 과거형이 아닌 경우만 교정
          const pastTense = getPastTense(verb)
          if (pastTense === verb) return // 이미 과거형인 경우 스킵
          
          // 주어 + 현재형 동사 패턴 찾기
          const regex = new RegExp(`\\b(I|you|we|they|he|she|it)\\s+${verb.replace(/\s+/g, '\\s+')}\\b(?!\\s+(will|can|should|must|may|to|ing|ed))`, 'gi')
          s = s.replace(regex, (match, subj) => {
            // 주어에 따라 동사 형태 결정
            return subj + ' ' + getPastTense(verb)
          })
        })
      }
      
      // 5. "I was go" -> "I went" (was + 동사 원형)
      s = s.replace(/\b(I|he|she|it)\s+was\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|try|learn|practice|improve|achieve|exercise|jog|swim|dance|sing|speak|talk|listen|watch|buy|sell|give|receive|help|meet|visit|travel|stay|leave|arrive|return|open|close|turn|move|sit|stand|lie|wake|sleep)\b/gi, (match, subj, verb) => {
        return subj + ' ' + getPastTense(verb)
      })
      
      // 6. "I were go" -> "I was going" 또는 "I went"
      s = s.replace(/\bI\s+were\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|try|learn|practice|improve|achieve|exercise|jog|swim|dance|sing|speak|talk|listen|watch|buy|sell|give|receive|help|meet|visit|travel|stay|leave|arrive|return|open|close|turn|move|sit|stand|lie|wake|sleep)\b/gi, (match, verb) => {
        return 'I ' + getPastTense(verb)
      })
      
      // 7. "they was" -> "they were"
      s = s.replace(/\b(you|we|they)\s+was\b/gi, (match, subj) => subj + ' were')
      
      // 8. "he were", "she were" -> "he was", "she was"
      s = s.replace(/\b(he|she|it)\s+were\b/gi, (match, subj) => subj + ' was')
      
      // 5. "very good" -> "very good" (유지), "good very" -> "very good" (순서 교정)
      s = s.replace(/\b(good|bad|nice|great|happy|sad|tired|excited|beautiful|wonderful|amazing|terrible|difficult|easy|hard|important|interesting)\s+very\b/gi, (match, adj) => `very ${adj}`)
      
      // 6. "a apple" -> "an apple" (관사 교정)
      s = s.replace(/\ba\s+([aeiouAEIOU][a-z]*)\b/g, 'an $1')
      
      // 7. "an book" -> "a book" (hour, honest 제외)
      s = s.replace(/\ban\s+([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ][a-z]*)\b/g, (match, word) => {
        if (/^(hour|honest|honor)/i.test(word)) return match
        return 'a ' + word
      })
      
      // 8. "I can to go" -> "I can go" (can 뒤에 to 제거)
      s = s.replace(/\bcan\s+to\s+/gi, 'can ')
      s = s.replace(/\bcould\s+to\s+/gi, 'could ')
      s = s.replace(/\bshould\s+to\s+/gi, 'should ')
      s = s.replace(/\bmust\s+to\s+/gi, 'must ')
      s = s.replace(/\bmay\s+to\s+/gi, 'may ')
      
      // 9. "I want go" -> "I want to go" (want 뒤에 to 추가)
      s = s.replace(/\bwant\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|try|learn|practice|improve|achieve)\b/gi, (match, verb) => `want to ${verb}`)
      
      // 10. "I like go" -> "I like to go" 또는 "I like going"
      s = s.replace(/\blike\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|try|learn|practice|improve|achieve)\b/gi, (match, verb) => `like to ${verb}`)
      
      // 11. "I need go" -> "I need to go"
      s = s.replace(/\bneed\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|try|learn|practice|improve|achieve)\b/gi, (match, verb) => `need to ${verb}`)
      
      // 12. "I try go" -> "I try to go"
      s = s.replace(/\btry\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|learn|practice|improve|achieve)\b/gi, (match, verb) => `try to ${verb}`)
      
      // 13. "I decide go" -> "I decide to go"
      s = s.replace(/\bdecide\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|try|learn|practice|improve|achieve)\b/gi, (match, verb) => `decide to ${verb}`)
      
      // 14. "more better" -> "better", "more good" -> "better"
      s = s.replace(/\bmore\s+(better|good)\b/gi, 'better')
      s = s.replace(/\bmore\s+(worse|bad)\b/gi, 'worse')
      
      // 15. "I very like" -> "I like very much" 또는 "I really like"
      s = s.replace(/\bI\s+very\s+(like|love|enjoy|hate|dislike)\b/gi, (match, verb) => `I really ${verb}`)
      
      // 시제 교정을 더 정교하게 수행
      // 주어-동사 패턴을 먼저 찾고, 시제에 맞게 교정
      if (isPastContext) {
        // 주어 + 현재형 동사 -> 주어 + 과거형 동사
        const subjectVerbPatterns = [
          // I + 동사
          { pattern: /\bI\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|try|learn|practice|improve|achieve|exercise|jog|swim|dance|sing|speak|talk|listen|watch|buy|sell|give|receive|help|meet|visit|travel|stay|leave|arrive|return|open|close|turn|move|sit|stand|lie|wake|sleep)\b(?!\s+(will|can|should|must|may|to|ing|ed))/gi, 
            replace: (match, verb) => `I ${getPastTense(verb)}` },
          // you/we/they + 동사
          { pattern: /\b(you|we|they)\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|try|learn|practice|improve|achieve|exercise|jog|swim|dance|sing|speak|talk|listen|watch|buy|sell|give|receive|help|meet|visit|travel|stay|leave|arrive|return|open|close|turn|move|sit|stand|lie|wake|sleep)\b(?!\s+(will|can|should|must|may|to|ing|ed))/gi,
            replace: (match, subj, verb) => `${subj} ${getPastTense(verb)}` },
          // he/she/it + 동사
          { pattern: /\b(he|she|it)\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|try|learn|practice|improve|achieve|exercise|jog|swim|dance|sing|speak|talk|listen|watch|buy|sell|give|receive|help|meet|visit|travel|stay|leave|arrive|return|open|close|turn|move|sit|stand|lie|wake|sleep)\b(?!\s+(will|can|should|must|may|to|ing|ed))/gi,
            replace: (match, subj, verb) => `${subj} ${getPastTense(verb)}` }
        ]
        
        subjectVerbPatterns.forEach(({ pattern, replace }) => {
          s = s.replace(pattern, replace)
        })
      }
      
      // 현재형 교정 (3인칭 단수 -s) - 더 많은 동사 포함
      if (isPresentContext && !isPastContext && !isFutureContext) {
        const presentVerbs = ['walk', 'talk', 'work', 'play', 'study', 'try', 'enjoy', 'finish', 'start', 'stop', 'plan', 'learn', 'practice', 'improve', 'achieve', 'exercise', 'jog', 'swim', 'dance', 'sing', 'speak', 'listen', 'watch', 'buy', 'sell', 'give', 'receive', 'help', 'visit', 'travel', 'stay', 'leave', 'arrive', 'return', 'open', 'close', 'turn', 'move', 'sit', 'stand', 'lie', 'wake', 'sleep', 'go', 'do', 'have', 'make', 'take', 'get', 'see', 'think', 'feel', 'come', 'become', 'begin', 'break', 'eat', 'drink', 'run', 'read', 'write', 'meet', 'find', 'say', 'tell', 'know', 'keep', 'bring', 'catch', 'teach', 'understand', 'choose', 'win', 'lose']
        
        presentVerbs.forEach(verb => {
          // he/she/it + 현재형 동사 (복수형이 아닌 경우)
          const regex = new RegExp(`\\b(he|she|it)\\s+${verb}\\b(?!\\s+(will|can|should|must|may|to|ing|ed|s))`, 'gi')
          s = s.replace(regex, (match, subj) => {
            // 특수 케이스 처리
            if (verb === 'do') return subj + ' does'
            if (verb === 'have') return subj + ' has'
            if (verb === 'go') return subj + ' goes'
            if (verb === 'say') return subj + ' says'
            if (verb === 'try') return subj + ' tries'
            if (verb === 'study') return subj + ' studies'
            if (verb === 'fly') return subj + ' flies'
            if (verb === 'cry') return subj + ' cries'
            if (verb === 'carry') return subj + ' carries'
            // y로 끝나는 동사 (ay, ey, oy, uy 제외)
            if (verb.endsWith('y') && !['ay', 'ey', 'oy', 'uy'].some(ending => verb.endsWith(ending))) {
              return subj + ' ' + verb.slice(0, -1) + 'ies'
            }
            // s, x, z, ch, sh로 끝나는 동사
            if (verb.endsWith('s') || verb.endsWith('x') || verb.endsWith('z') || verb.endsWith('ch') || verb.endsWith('sh')) {
              return subj + ' ' + verb + 'es'
            }
            // 일반적인 경우 -s 추가
            return subj + ' ' + verb + 's'
          })
        })
      }
      
      // 전치사 교정 (더 많은 패턴)
      s = s.replace(/\bat\s+the\s+morning\b/gi, 'in the morning')
      s = s.replace(/\bat\s+the\s+evening\b/gi, 'in the evening')
      s = s.replace(/\bat\s+the\s+afternoon\b/gi, 'in the afternoon')
      s = s.replace(/\bon\s+the\s+morning\b/gi, 'in the morning')
      s = s.replace(/\bon\s+the\s+evening\b/gi, 'in the evening')
      s = s.replace(/\bon\s+the\s+afternoon\b/gi, 'in the afternoon')
      s = s.replace(/\bat\s+home\b/gi, 'at home')
      s = s.replace(/\bin\s+home\b/gi, 'at home')
      s = s.replace(/\bin\s+the\s+home\b/gi, 'at home')
      s = s.replace(/\bon\s+Monday\s+morning\b/gi, 'on Monday morning')
      s = s.replace(/\bin\s+Monday\s+morning\b/gi, 'on Monday morning')
      s = s.replace(/\bat\s+Monday\b/gi, 'on Monday')
      s = s.replace(/\bin\s+Monday\b/gi, 'on Monday')
      s = s.replace(/\bat\s+night\b/gi, 'at night')
      s = s.replace(/\bin\s+night\b/gi, 'at night')
      s = s.replace(/\bon\s+night\b/gi, 'at night')
      
      // "hard/easy/difficult/good/bad + to me" -> "for me"
      // "so hard to me" 같은 패턴도 잡기 위해 더 포괄적으로
      s = s.replace(/\b(so\s+)?(hard|easy|difficult|good|bad|nice|great|important|interesting|boring|fun|useful|helpful|necessary|impossible|possible|simple|complicated|strange|normal|natural|clear|obvious|surprising|disappointing|exciting|amazing|wonderful|terrible|awful|fine|okay|ok)\s+to\s+me\b/gi, (match, so, adj) => {
        const soPart = so ? so.trim() + ' ' : ''
        return `${soPart}${adj} for me`
      })
      
      // "it's + 형용사 + to me" -> "it's + 형용사 + for me"
      s = s.replace(/\b(it'?s|it\s+is)\s+(so\s+)?(hard|easy|difficult|good|bad|nice|great|important|interesting|boring|fun|useful|helpful|necessary|impossible|possible|simple|complicated|strange|normal|natural|clear|obvious|surprising|disappointing|exciting|amazing|wonderful|terrible|awful|fine|okay|ok)\s+to\s+me\b/gi, (match, it, so, adj) => {
        const soPart = so ? so.trim() + ' ' : ''
        return `${it} ${soPart}${adj} for me`
      })
      
      // "seems/looks/feels + 형용사 + to me" -> "for me"
      s = s.replace(/\b(seems|looks|feels|sounds|appears|becomes|gets|turns)\s+(so\s+)?(hard|easy|difficult|good|bad|nice|great|important|interesting|boring|fun|useful|helpful|necessary|impossible|possible|simple|complicated|strange|normal|natural|clear|obvious|surprising|disappointing|exciting|amazing|wonderful|terrible|awful|fine|okay|ok)\s+to\s+me\b/gi, (match, verb, so, adj) => {
        const soPart = so ? so.trim() + ' ' : ''
        return `${verb} ${soPart}${adj} for me`
      })
      
      // 어색한 표현 교정 - 전치사 누락
      // "I go school" -> "I go to school"
      s = s.replace(/\b(go|goes|went|come|comes|came|return|returns|returned|arrive|arrives|arrived|move|moves|moved|travel|travels|traveled|walk|walks|walked|run|runs|ran)\s+(school|home|work|church|hospital|park|store|shop|market|library|restaurant|cafe|cinema|theater|gym|stadium|airport|station|beach|mountain|city|country|university|college)\b/gi, (match, verb, place) => {
        if (place === 'home') return match // "go home"은 올바름
        return `${verb} to ${place}`
      })
      
      // "I listen music" -> "I listen to music"
      s = s.replace(/\b(listen|listens|listened|hear|hears|heard)\s+(music|song|songs|radio|podcast|podcasts|lecture|lectures|story|stories)\b/gi, (match, verb, obj) => {
        return `${verb} to ${obj}`
      })
      
      // "I wait bus" -> "I wait for the bus"
      s = s.replace(/\b(wait|waits|waited)\s+(bus|train|taxi|car|friend|friends|teacher|teachers|mom|dad|parent|parents|brother|sister|siblings)\b/gi, (match, verb, obj) => {
        return `${verb} for ${obj}`
      })
      
      // "I search information" -> "I search for information"
      s = s.replace(/\b(search|searches|searched|look|looks|looked)\s+(information|job|jobs|work|house|apartment|answer|answers|solution|solutions|help|advice)\b/gi, (match, verb, obj) => {
        return `${verb} for ${obj}`
      })
      
      // "I ask help" -> "I ask for help"
      s = s.replace(/\b(ask|asks|asked)\s+(help|permission|advice|favor|favors|question|questions)\b/gi, (match, verb, obj) => {
        return `${verb} for ${obj}`
      })
      
      // 관사 누락 교정 (일반적인 패턴만 - 성능 최적화)
      // "I read book" -> "I read a book" (가장 흔한 패턴만 처리)
      const commonPatterns = [
        { verb: 'read', noun: 'book' },
        { verb: 'write', noun: 'book' },
        { verb: 'buy', noun: 'book' },
        { verb: 'read', noun: 'novel' },
        { verb: 'write', noun: 'letter' },
        { verb: 'write', noun: 'email' },
        { verb: 'write', noun: 'message' },
        { verb: 'write', noun: 'diary' },
        { verb: 'read', noun: 'article' },
        { verb: 'read', noun: 'story' },
        { verb: 'write', noun: 'essay' },
        { verb: 'write', noun: 'report' },
        { verb: 'buy', noun: 'gift' },
        { verb: 'buy', noun: 'present' },
        { verb: 'get', noun: 'job' },
        { verb: 'find', noun: 'job' },
        { verb: 'find', noun: 'answer' },
        { verb: 'find', noun: 'solution' },
        { verb: 'make', noun: 'mistake' },
        { verb: 'make', noun: 'decision' },
        { verb: 'take', noun: 'break' },
        { verb: 'take', noun: 'rest' },
        { verb: 'give', noun: 'present' },
        { verb: 'give', noun: 'gift' },
        { verb: 'send', noun: 'email' },
        { verb: 'send', noun: 'message' },
        { verb: 'receive', noun: 'email' },
        { verb: 'receive', noun: 'message' },
        { verb: 'watch', noun: 'movie' },
        { verb: 'watch', noun: 'film' },
        { verb: 'watch', noun: 'video' },
        { verb: 'see', noun: 'movie' },
        { verb: 'see', noun: 'film' },
        { verb: 'eat', noun: 'meal' },
        { verb: 'eat', noun: 'breakfast' },
        { verb: 'eat', noun: 'lunch' },
        { verb: 'eat', noun: 'dinner' },
        { verb: 'drink', noun: 'coffee' },
        { verb: 'drink', noun: 'tea' },
        { verb: 'drink', noun: 'water' },
        { verb: 'learn', noun: 'language' },
        { verb: 'learn', noun: 'skill' },
        { verb: 'study', noun: 'subject' },
        { verb: 'study', noun: 'lesson' },
        { verb: 'practice', noun: 'skill' },
        { verb: 'teach', noun: 'lesson' },
        { verb: 'help', noun: 'friend' },
        { verb: 'meet', noun: 'friend' },
        { verb: 'visit', noun: 'friend' },
        { verb: 'call', noun: 'friend' },
        { verb: 'play', noun: 'game' },
        { verb: 'play', noun: 'sport' },
        { verb: 'sing', noun: 'song' },
        { verb: 'dance', noun: 'dance' },
        { verb: 'draw', noun: 'picture' },
        { verb: 'paint', noun: 'picture' },
        { verb: 'create', noun: 'art' },
        { verb: 'build', noun: 'house' },
        { verb: 'design', noun: 'website' },
        { verb: 'develop', noun: 'skill' },
        { verb: 'improve', noun: 'skill' },
        { verb: 'change', noun: 'mind' },
        { verb: 'fix', noun: 'problem' },
        { verb: 'solve', noun: 'problem' },
        { verb: 'clean', noun: 'room' },
        { verb: 'wash', noun: 'dish' },
        { verb: 'cook', noun: 'meal' },
        { verb: 'prepare', noun: 'meal' },
        { verb: 'order', noun: 'food' },
        { verb: 'pay', noun: 'bill' },
        { verb: 'spend', noun: 'time' },
        { verb: 'save', noun: 'money' },
        { verb: 'earn', noun: 'money' },
        { verb: 'win', noun: 'prize' },
        { verb: 'lose', noun: 'game' },
        { verb: 'choose', noun: 'option' },
        { verb: 'pick', noun: 'choice' },
        { verb: 'select', noun: 'option' },
        { verb: 'decide', noun: 'plan' },
        { verb: 'plan', noun: 'trip' },
        { verb: 'organize', noun: 'event' },
        { verb: 'arrange', noun: 'meeting' },
        { verb: 'schedule', noun: 'appointment' },
        { verb: 'book', noun: 'hotel' },
        { verb: 'reserve', noun: 'table' },
        { verb: 'cancel', noun: 'plan' },
        { verb: 'confirm', noun: 'reservation' },
        { verb: 'check', noun: 'email' },
        { verb: 'verify', noun: 'information' },
        { verb: 'test', noun: 'skill' },
        { verb: 'examine', noun: 'problem' },
        { verb: 'review', noun: 'lesson' },
        { verb: 'analyze', noun: 'data' },
        { verb: 'research', noun: 'topic' },
        { verb: 'investigate', noun: 'case' },
        { verb: 'discover', noun: 'truth' },
        { verb: 'explore', noun: 'place' },
        { verb: 'travel', noun: 'country' },
        { verb: 'tour', noun: 'city' },
        { verb: 'visit', noun: 'place' },
        { verb: 'stay', noun: 'hotel' },
        { verb: 'live', noun: 'house' },
        { verb: 'move', noun: 'house' },
        { verb: 'arrive', noun: 'destination' },
        { verb: 'leave', noun: 'place' },
        { verb: 'return', noun: 'home' },
        { verb: 'come', noun: 'home' },
        { verb: 'go', noun: 'place' },
        { verb: 'walk', noun: 'distance' },
        { verb: 'run', noun: 'race' },
        { verb: 'jog', noun: 'distance' },
        { verb: 'cycle', noun: 'distance' },
        { verb: 'drive', noun: 'car' },
        { verb: 'ride', noun: 'bike' },
        { verb: 'fly', noun: 'plane' },
        { verb: 'swim', noun: 'distance' },
        { verb: 'climb', noun: 'mountain' },
        { verb: 'hike', noun: 'trail' },
        { verb: 'jump', noun: 'height' },
        { verb: 'search', noun: 'information' },
        { verb: 'look', noun: 'answer' },
        { verb: 'find', noun: 'way' },
        { verb: 'seek', noun: 'help' },
        { verb: 'hunt', noun: 'job' },
        { verb: 'track', noun: 'progress' },
        { verb: 'follow', noun: 'rule' },
        { verb: 'chase', noun: 'dream' },
        { verb: 'pursue', noun: 'goal' },
        { verb: 'catch', noun: 'ball' },
        { verb: 'grab', noun: 'opportunity' },
        { verb: 'grasp', noun: 'concept' },
        { verb: 'hold', noun: 'meeting' },
        { verb: 'grip', noun: 'handle' },
        { verb: 'squeeze', noun: 'lemon' },
        { verb: 'press', noun: 'button' },
        { verb: 'push', noun: 'door' },
        { verb: 'pull', noun: 'rope' },
        { verb: 'drag', noun: 'box' },
        { verb: 'lift', noun: 'weight' },
        { verb: 'raise', noun: 'hand' },
        { verb: 'lower', noun: 'voice' },
        { verb: 'drop', noun: 'ball' },
        { verb: 'fall', noun: 'asleep' },
        { verb: 'trip', noun: 'wire' },
        { verb: 'slip', noun: 'ice' },
        { verb: 'slide', noun: 'door' },
        { verb: 'roll', noun: 'dice' },
        { verb: 'turn', noun: 'corner' },
        { verb: 'rotate', noun: 'wheel' },
        { verb: 'spin', noun: 'wheel' },
        { verb: 'twist', noun: 'knob' },
        { verb: 'bend', noun: 'knee' },
        { verb: 'stretch', noun: 'muscle' },
        { verb: 'extend', noun: 'hand' },
        { verb: 'reach', noun: 'goal' },
        { verb: 'touch', noun: 'screen' },
        { verb: 'feel', noun: 'emotion' },
        { verb: 'sense', noun: 'danger' },
        { verb: 'notice', noun: 'change' },
        { verb: 'observe', noun: 'behavior' },
        { verb: 'watch', noun: 'show' },
        { verb: 'see', noun: 'sight' },
        { verb: 'look', noun: 'direction' },
        { verb: 'glance', noun: 'watch' },
        { verb: 'stare', noun: 'screen' },
        { verb: 'gaze', noun: 'sky' },
        { verb: 'peek', noun: 'window' },
        { verb: 'peep', noun: 'hole' },
        { verb: 'glare', noun: 'light' },
        { verb: 'wink', noun: 'eye' },
        { verb: 'blink', noun: 'eye' },
        { verb: 'squint', noun: 'eye' },
        { verb: 'frown', noun: 'face' },
        { verb: 'smile', noun: 'face' },
        { verb: 'grin', noun: 'face' },
        { verb: 'laugh', noun: 'joke' },
        { verb: 'giggle', noun: 'joke' },
        { verb: 'chuckle', noun: 'joke' },
        { verb: 'snicker', noun: 'joke' },
        { verb: 'snort', noun: 'laugh' },
        { verb: 'sigh', noun: 'relief' },
        { verb: 'gasp', noun: 'air' },
        { verb: 'pant', noun: 'breath' },
        { verb: 'breathe', noun: 'air' },
        { verb: 'inhale', noun: 'air' },
        { verb: 'exhale', noun: 'breath' },
        { verb: 'blow', noun: 'nose' },
        { verb: 'suck', noun: 'thumb' },
        { verb: 'lick', noun: 'ice' },
        { verb: 'taste', noun: 'food' },
        { verb: 'smell', noun: 'flower' },
        { verb: 'sniff', noun: 'air' },
        { verb: 'sip', noun: 'coffee' },
        { verb: 'drink', noun: 'juice' },
        { verb: 'gulp', noun: 'water' },
        { verb: 'swallow', noun: 'pill' },
        { verb: 'chew', noun: 'gum' },
        { verb: 'bite', noun: 'apple' },
        { verb: 'nibble', noun: 'cookie' },
        { verb: 'eat', noun: 'apple' },
        { verb: 'devour', noun: 'book' },
        { verb: 'consume', noun: 'energy' },
        { verb: 'feed', noun: 'baby' }
      ]
      
      // 간단한 패턴으로 관사 누락 교정 (성능 최적화)
      commonPatterns.forEach(({ verb, noun }) => {
        // 단수 명사인 경우만
        if (!noun.endsWith('s') && noun !== 'children' && noun !== 'people' && noun !== 'men' && noun !== 'women') {
          // 이미 관사나 소유격이 있는지 확인
          const regex = new RegExp(`\\b(${verb})\\s+${noun}\\b(?!\\s+(the|a|an|my|your|his|her|its|our|their|this|that|these|those|some|any|many|much|few|little|more|most|all|both|each|every|other|another))`, 'gi')
          s = s.replace(regex, (match, v) => {
            // 모음으로 시작하는 단어 앞에 an
            if (/^[aeiouAEIOU]/.test(noun)) {
              return `${v} an ${noun}`
            }
            return `${v} a ${noun}`
          })
        }
      })
      
      // 명사 복수형 교정
      s = s.replace(/\b(book|goal|challenge|exercise|day|goal|friend|teacher|student|person|child|man|woman)\s+(are|were)\b/gi, (match, noun) => {
        if (!noun.endsWith('s')) {
          if (noun === 'child') return 'children are'
          if (noun === 'person') return 'people are'
          if (noun === 'man') return 'men are'
          if (noun === 'woman') return 'women are'
          if (noun.endsWith('y') && !['ay', 'ey', 'oy', 'uy'].some(ending => noun.endsWith(ending))) {
            return noun.slice(0, -1) + 'ies are'
          }
          if (noun.endsWith('s') || noun.endsWith('x') || noun.endsWith('z') || noun.endsWith('ch') || noun.endsWith('sh')) {
            return noun + 'es are'
          }
          return noun + 's are'
        }
        return match
      })
      
      // 단수 주어 + 복수 동사 교정
      s = s.replace(/\b(a|an|the|my|your|his|her|its|our|their)\s+(book|goal|challenge|exercise|day|friend|teacher|student|person|child|man|woman)\s+(are|were)\b/gi, (match, article, noun, verb) => {
        if (verb === 'are') return article + ' ' + noun + ' is'
        if (verb === 'were') return article + ' ' + noun + ' was'
        return match
      })
      
      // 복수 주어 + 단수 동사 교정
      s = s.replace(/\b(books|goals|challenges|exercises|days|friends|teachers|students|people|children|men|women)\s+(is|was)\b/gi, (match, noun, verb) => {
        if (verb === 'is') return noun + ' are'
        if (verb === 'was') return noun + ' were'
        return match
      })
      
      // 불필요한 중복 제거
      s = s.replace(/\bvery\s+very\b/gi, 'very')
      s = s.replace(/\breally\s+really\b/gi, 'really')
      s = s.replace(/\bso\s+so\b/gi, 'so')
      
      // 문장 부호 앞 공백 제거
      s = s.replace(/\s+([,.!?;:])/g, '$1')
      
      // 문장 부호 뒤 공백 추가 및 대문자
      s = s.replace(/([.!?])\s*([a-z])/g, (match, punct, letter) => punct + ' ' + letter.toUpperCase())
      
      // 공백 정리
      s = s.replace(/\s+/g, ' ').trim()
      
      return s
    } catch (e) {
      // 오류 발생 시 원본 문장 반환
      console.error('Grammar correction error:', e)
      return sentence.trim()
    }
  }).filter(s => s.length > 0)
  
  // 3. 문장 재조합
  corrected = sentences.join('. ')
  if (!corrected.match(/[.!?]$/)) {
    corrected += '.'
  }
  
  // 4. 최종 정리
  corrected = corrected
    .replace(/\s+/g, ' ')
    .replace(/\s+([.!?,])/g, '$1')
    .replace(/([.!?])\s*([a-z])/g, (match, punct, letter) => punct + ' ' + letter.toUpperCase())
    .trim()

  // 의미 있는 표현 추출 및 매핑
  const commonExpressions = {
    'exercise': { meaning: '운동하다', example: 'I exercise every morning to stay healthy.', synonyms: ['workout', 'train', 'practice'] },
    'running': { meaning: '달리기, 조깅', example: 'Running helps me clear my mind.', synonyms: ['jogging', 'sprinting', 'race'] },
    'read': { meaning: '읽다', example: 'I read books to learn new things.', synonyms: ['study', 'learn', 'explore'] },
    'reading': { meaning: '독서', example: 'Reading is my favorite hobby.', synonyms: ['studying', 'learning', 'exploring'] },
    'diet': { meaning: '식단, 다이어트', example: 'A healthy diet is important for well-being.', synonyms: ['nutrition', 'meal plan', 'eating'] },
    'healthy': { meaning: '건강한', example: 'Eating healthy food makes me feel good.', synonyms: ['fit', 'well', 'strong'] },
    'goal': { meaning: '목표', example: 'My goal is to improve my English.', synonyms: ['aim', 'target', 'objective'] },
    'challenge': { meaning: '도전', example: 'This challenge helps me grow.', synonyms: ['task', 'trial', 'test'] },
    'achieve': { meaning: '달성하다', example: 'I want to achieve my goals.', synonyms: ['accomplish', 'complete', 'reach'] },
    'feel': { meaning: '느끼다', example: 'I feel proud of my progress.', synonyms: ['sense', 'experience', 'notice'] },
    'proud': { meaning: '자랑스러운', example: 'I am proud of my achievements.', synonyms: ['satisfied', 'pleased', 'happy'] },
    'improve': { meaning: '개선하다', example: 'I want to improve my skills.', synonyms: ['enhance', 'develop', 'progress'] },
    'practice': { meaning: '연습하다', example: 'Practice makes perfect.', synonyms: ['train', 'exercise', 'rehearse'] },
    'learn': { meaning: '배우다', example: 'I learn something new every day.', synonyms: ['study', 'acquire', 'gain'] },
    'today': { meaning: '오늘', example: 'Today was a great day.', synonyms: ['this day', 'now', 'present'] },
    'morning': { meaning: '아침', example: 'I wake up early in the morning.', synonyms: ['dawn', 'daybreak', 'sunrise'] },
    'evening': { meaning: '저녁', example: 'I relax in the evening.', synonyms: ['night', 'dusk', 'sunset'] },
    'enjoy': { meaning: '즐기다', example: 'I enjoy learning English.', synonyms: ['like', 'love', 'appreciate'] },
    'difficult': { meaning: '어려운', example: 'It was difficult but rewarding.', synonyms: ['hard', 'challenging', 'tough'] },
    'rewarding': { meaning: '보람 있는', example: 'The experience was very rewarding.', synonyms: ['satisfying', 'fulfilling', 'worthwhile'] },
  }

  // 일기에서 추출한 단어들을 의미 있는 표현으로 매핑
  const foundExpressions = []
  const usedWords = new Set()
  
  words.forEach(word => {
    const lowerWord = word.toLowerCase()
    if (usedWords.has(lowerWord)) return
    
    // 직접 매칭
    if (commonExpressions[lowerWord]) {
      foundExpressions.push({
        word: word,
        pronunciation: getPronunciation(lowerWord),
        meaning: commonExpressions[lowerWord].meaning,
        example: commonExpressions[lowerWord].example,
        synonyms: commonExpressions[lowerWord].synonyms,
      })
      usedWords.add(lowerWord)
      return
    }
    
    // 부분 매칭 (예: running -> run)
    const baseWord = lowerWord.replace(/ing$|ed$|s$|er$|est$/, '')
    if (commonExpressions[baseWord] && !usedWords.has(baseWord)) {
      foundExpressions.push({
        word: word,
        pronunciation: getPronunciation(lowerWord),
        meaning: commonExpressions[baseWord].meaning,
        example: commonExpressions[baseWord].example.replace(baseWord, lowerWord),
        synonyms: commonExpressions[baseWord].synonyms,
      })
      usedWords.add(baseWord)
    }
  })

  // 최소 5개, 최대 10개 표현 선택
  let expressions = foundExpressions.slice(0, 10)
  
  // 표현이 부족하면 기본 표현 추가
  if (expressions.length < 10) {
    const defaultExpressions = [
      { word: 'Challenge', pronunciation: '/ˈtʃæl.ɪndʒ/', meaning: '도전, 어려운 일', example: 'This challenge helps me grow every day.', synonyms: ['Task', 'Trial', 'Test'] },
      { word: 'Achieve', pronunciation: '/əˈtʃiːv/', meaning: '달성하다', example: 'I want to achieve my goals.', synonyms: ['Accomplish', 'Complete', 'Reach'] },
      { word: 'Improve', pronunciation: '/ɪmˈpruːv/', meaning: '개선하다', example: 'I want to improve my English.', synonyms: ['Enhance', 'Develop', 'Progress'] },
      { word: 'Success', pronunciation: '/səkˈses/', meaning: '성공', example: 'Success comes from hard work.', synonyms: ['Achievement', 'Victory', 'Triumph'] },
      { word: 'Effort', pronunciation: '/ˈef.ət/', meaning: '노력', example: 'I put a lot of effort into my studies.', synonyms: ['Work', 'Attempt', 'Try'] },
      { word: 'Progress', pronunciation: '/ˈprəʊ.ɡres/', meaning: '진전, 발전', example: 'I can see my progress every day.', synonyms: ['Advancement', 'Development', 'Growth'] },
      { word: 'Motivation', pronunciation: '/ˌməʊ.tɪˈveɪ.ʃən/', meaning: '동기, 의욕', example: 'My motivation keeps me going.', synonyms: ['Drive', 'Inspiration', 'Encouragement'] },
      { word: 'Discipline', pronunciation: '/ˈdɪs.ə.plɪn/', meaning: '규율, 훈련', example: 'Discipline is key to success.', synonyms: ['Self-control', 'Training', 'Order'] },
      { word: 'Consistency', pronunciation: '/kənˈsɪs.tən.si/', meaning: '일관성', example: 'Consistency is important for learning.', synonyms: ['Regularity', 'Steadiness', 'Reliability'] },
      { word: 'Growth', pronunciation: '/ɡrəʊθ/', meaning: '성장', example: 'I focus on personal growth.', synonyms: ['Development', 'Expansion', 'Improvement'] },
    ]
    // 부족한 만큼 기본 표현 추가
    const needed = 10 - expressions.length
    expressions = [...expressions, ...defaultExpressions.slice(0, needed)]
  }

  // 피드백 메시지 생성 (문법 교정 내용 포함)
  let feedback = '일기 작성이 잘 되었습니다! '
  const feedbacks = []
  const grammarTips = []
  
  // 문법 교정 내용 분석
  const originalDiary = diary.trim()
  const correctedDiary = corrected.trim()
  const originalLower = originalDiary.toLowerCase()
  const correctedLower = correctedDiary.toLowerCase()
  
  if (originalDiary !== correctedDiary) {
    grammarTips.push('문법과 표현을 교정했습니다.')
    
    // 구체적인 교정 내용 분석
    if (originalLower !== correctedLower) {
      // 1. 소문자 i 교정
      if (/\bi\b/.test(originalDiary) && !/\bi\b/.test(correctedDiary)) {
        grammarTips.push('소문자 "i"를 대문자 "I"로 수정했습니다.')
      }
      
      // 2. 관사 교정
      if (/a\s+[aeiou]/i.test(originalDiary) || /an\s+[bcdfghjklmnpqrstvwxyz]/i.test(originalDiary)) {
        grammarTips.push('관사(a/an) 사용을 교정했습니다.')
      }
      
      // 3. 주어-동사 일치 교정
      if (/\b(I|you|he|she|it|we|they)\s+(is|are|am|was|were)\b/i.test(originalDiary)) {
        grammarTips.push('주어와 동사의 일치를 확인했습니다.')
      }
      
      // 4. 부정문 주어-동사 일치 교정
      if (/\bI\s+(doesn'?t|dosen'?t|does\s+not|dosen\s+not)\b/i.test(originalDiary)) {
        grammarTips.push('부정문에서 주어와 동사의 일치를 교정했습니다. (I doesn\'t → I don\'t)')
      }
      if (/\b(he|she|it)\s+(don'?t|do\s+not)\b/i.test(originalDiary)) {
        grammarTips.push('부정문에서 주어와 동사의 일치를 교정했습니다. (he/she/it don\'t → doesn\'t)')
      }
      
      // 5. 3인칭 단수 현재형 교정
      if (/\b(he|she|it)\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|try|learn|practice|improve|achieve|exercise|jog|swim|dance|sing|speak|talk|listen|watch|buy|sell|give|receive|help|meet|visit|travel|stay|leave|arrive|return|open|close|turn|move|sit|stand|lie|wake|sleep)\b(?!\s+(will|can|should|must|may|to|ing|ed))/i.test(originalDiary)) {
        grammarTips.push('3인칭 단수 주어의 현재형 동사를 교정했습니다. (he go → he goes)')
      }
      
      // 6. 시제 교정
      if (/(yesterday|last\s+(week|month|year|night|day)|ago|was|were|did|had|this\s+morning|this\s+afternoon|before|earlier|then|at\s+that\s+time)/i.test(originalDiary)) {
        if (/\b(I|you|we|they|he|she|it)\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|try|learn|practice|improve|achieve|exercise|jog|swim|dance|sing|speak|talk|listen|watch|buy|sell|give|receive|help|meet|visit|travel|stay|leave|arrive|return|open|close|turn|move|sit|stand|lie|wake|sleep)\b(?!\s+(will|can|should|must|may|to|ing|ed))/i.test(originalDiary)) {
          grammarTips.push('과거 시제 맥락에 맞게 동사 시제를 교정했습니다.')
        }
      }
      
      // 7. 전치사 교정
      if (/\b(hard|easy|difficult|good|bad|nice|great|important|interesting|boring|fun|useful|helpful|necessary|impossible|possible|simple|complicated|strange|normal|natural|clear|obvious|surprising|disappointing|exciting|amazing|wonderful|terrible|awful|fine|okay|ok)\s+to\s+me\b/i.test(originalDiary)) {
        grammarTips.push('전치사를 교정했습니다. (hard to me → hard for me)')
      }
      if (/\b(it'?s|it\s+is)\s+(hard|easy|difficult|good|bad|nice|great|important|interesting|boring|fun|useful|helpful|necessary|impossible|possible|simple|complicated|strange|normal|natural|clear|obvious|surprising|disappointing|exciting|amazing|wonderful|terrible|awful|fine|okay|ok)\s+to\s+me\b/i.test(originalDiary)) {
        grammarTips.push('전치사를 교정했습니다. (It\'s hard to me → It\'s hard for me)')
      }
      
      // 8. 동사 패턴 교정
      if (/\b(can|could|should|must|may)\s+to\s+/i.test(originalDiary)) {
        grammarTips.push('조동사 뒤의 불필요한 "to"를 제거했습니다.')
      }
      if (/\b(want|like|need|try|decide)\s+(go|walk|run|eat|drink|sleep|read|write|study|work|play|do|have|make|take|get|see|think|feel|come|become|begin|break|start|finish|enjoy|learn|practice|improve|achieve)\b(?!\s+to)/i.test(originalDiary)) {
        grammarTips.push('동사 뒤에 필요한 "to"를 추가했습니다. (want go → want to go)')
      }
    }
  }
  
  // 긍정적 피드백
  if (hasPastTense) {
    feedbacks.push('과거형을 사용하여 경험을 잘 표현하셨습니다.')
  }
  if (hasPresentTense) {
    feedbacks.push('현재형을 적절히 사용하셨습니다.')
  }
  if (hasFutureTense) {
    feedbacks.push('미래 계획을 표현하는 문장이 좋습니다.')
  }
  if (diarySentences.length >= 3) {
    feedbacks.push('여러 문장으로 구성된 완성도 높은 일기입니다.')
  }
  if (words.length >= 10) {
    feedbacks.push('다양한 어휘를 사용하여 표현력이 뛰어납니다.')
  }
  
  // 피드백 메시지 조합
  if (grammarTips.length > 0) {
    feedback += grammarTips.join(' ') + ' '
  }
  feedback += feedbacks.length > 0 ? feedbacks.join(' ') : '계속 연습하시면 더 좋아질 거예요!'
  feedback += ' 아래 표현들을 학습하고 퀴즈로 복습해보세요.'

  return {
    corrected: corrected,
    feedback: feedback,
    expressions: expressions,
  }
}

function getPronunciation(word) {
  const pronunciations = {
    'exercise': '/ˈek.sə.saɪz/',
    'running': '/ˈrʌn.ɪŋ/',
    'read': '/riːd/',
    'reading': '/ˈriː.dɪŋ/',
    'diet': '/ˈdaɪ.ət/',
    'healthy': '/ˈhel.θi/',
    'goal': '/ɡoʊl/',
    'challenge': '/ˈtʃæl.ɪndʒ/',
    'achieve': '/əˈtʃiːv/',
    'feel': '/fiːl/',
    'proud': '/praʊd/',
    'improve': '/ɪmˈpruːv/',
    'practice': '/ˈpræk.tɪs/',
    'learn': '/lɜːrn/',
    'today': '/təˈdeɪ/',
    'morning': '/ˈmɔː.nɪŋ/',
    'evening': '/ˈiːv.nɪŋ/',
    'enjoy': '/ɪnˈdʒɔɪ/',
    'difficult': '/ˈdɪf.ɪ.kəlt/',
    'rewarding': '/rɪˈwɔː.dɪŋ/',
  }
  return pronunciations[word.toLowerCase()] || `/${word.toLowerCase()}/`
}

function getPastTense(verb) {
  const irregular = {
    'go': 'went', 'do': 'did', 'get': 'got', 'make': 'made',
    'take': 'took', 'come': 'came', 'see': 'saw', 'think': 'thought',
    'feel': 'felt', 'become': 'became', 'begin': 'began', 'break': 'broke',
    'eat': 'ate', 'drink': 'drank', 'sleep': 'slept', 'run': 'ran',
    'write': 'wrote', 'read': 'read', 'meet': 'met', 'find': 'found',
    'have': 'had', 'say': 'said', 'tell': 'told', 'know': 'knew',
    'give': 'gave', 'leave': 'left', 'keep': 'kept', 'buy': 'bought',
    'bring': 'brought', 'catch': 'caught', 'teach': 'taught', 'think': 'thought'
  }
  
  const lowerVerb = verb.toLowerCase()
  if (irregular[lowerVerb]) {
    return irregular[lowerVerb]
  }
  
  // 규칙 동사
  if (lowerVerb.endsWith('e')) {
    return lowerVerb + 'd'
  } else if (lowerVerb.endsWith('y') && !/[aeiou]y$/.test(lowerVerb)) {
    return lowerVerb.slice(0, -1) + 'ied'
  } else if (/[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz]$/.test(lowerVerb)) {
    return lowerVerb + lowerVerb.slice(-1) + 'ed'
  } else {
    return lowerVerb + 'ed'
  }
}

function extractWords(text) {
  const matches = text.toLowerCase().match(/\b[a-z]{4,}\b/g)
  return matches ? Array.from(new Set(matches)) : []
}

function generateMockQuiz(expressions) {
  const questionTypes = [
    'meaning', // 단어 의미
    'fillBlank', // 빈칸 채우기
    'sentence', // 문장 완성
    'synonym', // 동의어 찾기
    'context', // 문맥에 맞는 표현
  ]

  const questions = expressions.slice(0, 10).map((expr, idx) => {
    const type = questionTypes[idx % questionTypes.length]
    let question = {}

    switch (type) {
      case 'meaning':
        // 기본: 단어 의미 - 비슷하고 헷갈리게, 하지만 너무 어렵지 않게
        const correctMeaning = expr.meaning || `${expr.word}의 의미`
        
        // 다른 표현들의 의미들 (비슷한 의미로 헷갈리게)
        const otherMeanings = expressions
          .filter((_, i) => i !== idx)
          .map((e) => e.meaning || `${e.word}의 의미`)
          .filter((m, i, arr) => arr.indexOf(m) === i) // 중복 제거
        
        // 일반적인 의미들 (완전히 무관한 의미들)
        const commonMeanings = [
          'to eat food',
          'to sleep well',
          'to watch TV',
          'to play games',
          'to read books',
          'to write letters',
          'to listen to music',
          'to cook dinner',
        ]
        
        // 비슷하고 헷갈리게 구성 (다른 표현의 의미 2개 + 무관한 의미 1개)
        const finalWrongOptions = []
        
        // 다른 표현들의 의미 중에서 2개 선택 (비슷해서 헷갈림)
        if (otherMeanings.length > 0) {
          finalWrongOptions.push(...otherMeanings.slice(0, 2))
        }
        
        // 나머지는 완전히 무관한 일반 의미로 채우기 (1개만)
        while (finalWrongOptions.length < 3) {
          const randomMeaning = commonMeanings[Math.floor(Math.random() * commonMeanings.length)]
          if (!finalWrongOptions.includes(randomMeaning) && randomMeaning !== correctMeaning) {
            finalWrongOptions.push(randomMeaning)
          }
        }
        
        const meaningOptions = [correctMeaning, ...finalWrongOptions.slice(0, 3)]
        meaningOptions.sort(() => Math.random() - 0.5)
        
        question = {
          id: idx + 1,
          type: 'meaning',
          word: expr.word,
          question: `"${expr.word}"의 의미는 무엇인가요?`,
          correctAnswer: correctMeaning,
          options: meaningOptions,
        }
        break

      case 'fillBlank':
        // 빈칸 채우기 - 비슷한 의미나 형태의 단어들로 헷갈리게
        const exampleSentences = [
          `I need to ${expr.word} every day to stay healthy.`,
          `She decided to ${expr.word} her goals this year.`,
          `We should ${expr.word} more time for ourselves.`,
          `They want to ${expr.word} a better future.`,
        ]
        const sentence = exampleSentences[idx % exampleSentences.length]
        const blankSentence = sentence.replace(expr.word, '______')
        
        // 다른 표현들의 단어들 (비슷한 의미로 헷갈리게)
        const otherWords = expressions
          .filter((e, i) => i !== idx)
          .slice(0, 2)
          .map((e) => e.word)
        
        // 일반적인 동사들 (완전히 무관한 동사들)
        const commonVerbs = [
          'eat', 'sleep', 'watch', 'play',
          'read', 'write', 'speak', 'listen',
          'cook', 'clean', 'shop', 'meet',
        ]
        
        const wrongWords = []
        
        // 다른 표현의 단어 2개 추가 (비슷해서 헷갈림)
        if (otherWords.length > 0) {
          wrongWords.push(...otherWords.slice(0, 2))
        }
        
        // 나머지는 완전히 무관한 일반 동사들로 채우기 (1개만)
        while (wrongWords.length < 3) {
          const randomVerb = commonVerbs[Math.floor(Math.random() * commonVerbs.length)]
          if (!wrongWords.includes(randomVerb) && randomVerb !== expr.word.toLowerCase()) {
            wrongWords.push(randomVerb)
          }
        }
        
        const fillOptions = [expr.word, ...wrongWords.slice(0, 3)]
        fillOptions.sort(() => Math.random() - 0.5)
        
        question = {
          id: idx + 1,
          type: 'fillBlank',
          word: expr.word,
          question: `다음 문장의 빈칸에 들어갈 가장 적절한 단어는?`,
          sentence: blankSentence,
          correctAnswer: expr.word,
          options: fillOptions,
        }
        break

      case 'sentence':
        // 문장 완성하기 - 비슷한 구조나 의미의 문장들로 헷갈리게
        const correctSentence = expr.example || `I ${expr.word.toLowerCase()} every morning.`
        
        // 다른 표현들의 예문들 (비슷한 구조로 헷갈리게)
        const otherExamples = expressions
          .filter((e, i) => i !== idx)
          .slice(0, 2)
          .map((e) => e.example || `I ${e.word.toLowerCase()} sometimes.`)
        
        // 일반적인 문장들 (완전히 무관한 문장들)
        const commonSentences = [
          `I read books every day.`,
          `I study English regularly.`,
          `I exercise in the morning.`,
          `I cook dinner at home.`,
          `I watch movies on weekends.`,
        ]
        
        const wrongSentences = []
        
        // 다른 표현의 예문 2개 추가 (비슷한 구조로 헷갈림)
        if (otherExamples.length > 0) {
          wrongSentences.push(...otherExamples.slice(0, 2))
        }
        
        // 나머지는 완전히 무관한 일반 문장들로 채우기 (1개만)
        while (wrongSentences.length < 3) {
          const randomSentence = commonSentences[Math.floor(Math.random() * commonSentences.length)]
          if (!wrongSentences.includes(randomSentence) && randomSentence !== correctSentence) {
            wrongSentences.push(randomSentence)
          }
        }
        
        const sentenceOptions = [correctSentence, ...wrongSentences.slice(0, 3)]
        sentenceOptions.sort(() => Math.random() - 0.5)
        
        question = {
          id: idx + 1,
          type: 'sentence',
          word: expr.word,
          question: `"${expr.word}"를 올바르게 사용한 문장은?`,
          correctAnswer: correctSentence,
          options: sentenceOptions,
        }
        break

      case 'synonym':
        // 동의어 찾기 - 실제로 비슷한 의미의 단어들로 헷갈리게
        const synonyms = expr.synonyms || []
        const correctSynonym = synonyms.length > 0 ? synonyms[0] : `${expr.word}와 유사한 표현`
        
        // 다른 표현들의 동의어들 (비슷한 의미로 헷갈리게)
        const otherSynonyms = expressions
          .filter((e, i) => i !== idx && e.synonyms && e.synonyms.length > 0)
          .slice(0, 2)
          .flatMap(e => e.synonyms)
          .filter((s, i, arr) => arr.indexOf(s) === i) // 중복 제거
        
        // 일반적인 단어들 (완전히 무관한 단어들)
        const commonSynonyms = [
          'eat', 'sleep', 'watch', 'play',
          'read', 'write', 'speak', 'listen',
          'cook', 'clean', 'shop', 'meet',
        ]
        
        const wrongSynonyms = []
        
        // 다른 표현의 동의어 2개 추가 (비슷해서 헷갈림)
        if (otherSynonyms.length > 0) {
          wrongSynonyms.push(...otherSynonyms.slice(0, 2))
        }
        
        // 나머지는 완전히 무관한 일반 단어들로 채우기 (1개만)
        while (wrongSynonyms.length < 3) {
          const randomSynonym = commonSynonyms[Math.floor(Math.random() * commonSynonyms.length)]
          if (!wrongSynonyms.includes(randomSynonym) && 
              randomSynonym !== correctSynonym.toLowerCase() &&
              randomSynonym !== expr.word.toLowerCase()) {
            wrongSynonyms.push(randomSynonym)
          }
        }
        
        const synonymOptions = [correctSynonym, ...wrongSynonyms.slice(0, 3)]
        synonymOptions.sort(() => Math.random() - 0.5)
        
        question = {
          id: idx + 1,
          type: 'synonym',
          word: expr.word,
          question: `"${expr.word}"와 의미가 가장 유사한 단어는?`,
          correctAnswer: correctSynonym,
          options: synonymOptions,
        }
        break

      case 'context':
        // 문맥에 맞는 표현 - 비슷한 문맥의 표현들로 헷갈리게
        const contexts = [
          `When you want to improve your health, you should:`,
          `To achieve your goals, it's important to:`,
          `If you want to learn something new, you need to:`,
          `For personal growth, you should:`,
        ]
        const context = contexts[idx % contexts.length]
        
        const correctOption = `${expr.word} regularly`
        
        // 다른 표현들 (비슷한 의미로 헷갈리게)
        const otherExpressions = expressions
          .filter((e, i) => i !== idx)
          .slice(0, 2)
          .map((e) => `${e.word} regularly`)
        
        // 일반적인 표현들 (완전히 무관한 표현들)
        const commonExpressions = [
          `read books regularly`,
          `exercise daily`,
          `study hard`,
          `cook dinner daily`,
          `watch TV often`,
        ]
        
        const contextOptions = [correctOption]
        
        // 다른 표현 2개 추가 (비슷해서 헷갈림)
        if (otherExpressions.length > 0) {
          contextOptions.push(...otherExpressions.slice(0, 2))
        }
        
        // 나머지는 완전히 무관한 일반 표현들로 채우기 (1개만)
        while (contextOptions.length < 4) {
          const randomExpr = commonExpressions[Math.floor(Math.random() * commonExpressions.length)]
          if (!contextOptions.includes(randomExpr)) {
            contextOptions.push(randomExpr)
          }
        }
        
        contextOptions.sort(() => Math.random() - 0.5)
        
        question = {
          id: idx + 1,
          type: 'context',
          word: expr.word,
          question: context,
          contextHint: `"${expr.word}"를 사용한 표현을 선택하세요.`,
          correctAnswer: correctOption,
          options: contextOptions,
        }
        break
    }

    return question
  })

  // 문제 순서 섞기
  questions.sort(() => Math.random() - 0.5)

  return {
    questions,
  }
}

function generateCrewCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

function showCrewCodeModal(code, crewName) {
  // 모달 오버레이 생성
  const overlay = document.createElement('div')
  overlay.id = 'crew-code-modal'
  overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'
  overlay.style.animation = 'fadeIn 0.3s ease-out'
  
  overlay.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 transform transition-all" style="animation: slideUp 0.3s ease-out">
      <div class="text-center">
        <div class="text-6xl mb-4">🎉</div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">크루가 생성되었습니다!</h2>
        <p class="text-gray-600 mb-6">"${escapeHtml(crewName)}" 크루가 만들어졌어요</p>
        
        <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border-2 border-green-200">
          <p class="text-sm text-gray-600 mb-2">크루 참여 코드</p>
          <div class="flex items-center justify-center gap-3 mb-4">
            <code class="text-4xl font-bold text-green-600 font-mono tracking-wider bg-white px-6 py-3 rounded-lg border-2 border-green-300 shadow-lg" id="crew-code-display">${code}</code>
          </div>
          <button 
            id="copy-code-btn" 
            class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            <span>📋</span>
            <span>코드 복사하기</span>
          </button>
        </div>
        
        <div class="bg-green-50 rounded-xl p-4 mb-6">
          <p class="text-sm text-gray-700">
            <span class="font-semibold">💡 팁:</span> 이 코드를 친구들에게 공유하면<br/>
            같은 크루에 참여할 수 있어요!
          </p>
        </div>
        
        <button 
          id="close-code-modal" 
          class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-all"
        >
          확인
        </button>
      </div>
    </div>
    
    <style>
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { 
          transform: translateY(20px) scale(0.95);
          opacity: 0;
        }
        to { 
          transform: translateY(0) scale(1);
          opacity: 1;
        }
      }
    </style>
  `
  
  document.body.appendChild(overlay)
  
  // 코드 복사 버튼
  document.getElementById('copy-code-btn').addEventListener('click', () => {
    const codeDisplay = document.getElementById('crew-code-display')
    const codeText = codeDisplay.textContent
    
    // 클립보드에 복사
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(codeText).then(() => {
        const btn = document.getElementById('copy-code-btn')
        const originalText = btn.innerHTML
        btn.innerHTML = '<span>✅</span><span>복사 완료!</span>'
        btn.classList.remove('bg-green-500', 'hover:bg-green-600')
        btn.classList.add('bg-green-600')
        
        setTimeout(() => {
          btn.innerHTML = originalText
          btn.classList.remove('bg-green-600')
          btn.classList.add('bg-green-500', 'hover:bg-green-600')
        }, 2000)
      }).catch(() => {
        // 폴백: 텍스트 선택
        selectText(codeDisplay)
        alert('코드가 선택되었습니다. Ctrl+C로 복사하세요.')
      })
    } else {
      // 폴백: 텍스트 선택
      selectText(codeDisplay)
      alert('코드가 선택되었습니다. Ctrl+C로 복사하세요.')
    }
  })
  
  // 모달 닫기
  const closeModal = () => {
    overlay.style.animation = 'fadeOut 0.3s ease-out'
    setTimeout(() => {
      document.body.removeChild(overlay)
    }, 300)
  }
  
  document.getElementById('close-code-modal').addEventListener('click', closeModal)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal()
    }
  })
  
  // ESC 키로 닫기
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      closeModal()
      document.removeEventListener('keydown', handleEsc)
    }
  }
  document.addEventListener('keydown', handleEsc)
}

function selectText(element) {
  if (document.selection) {
    const range = document.body.createTextRange()
    range.moveToElementText(element)
    range.select()
  } else if (window.getSelection) {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

function getAllCrews() {
  // 모든 크루 데이터 가져오기 (localStorage에서)
  // 실제로는 서버에서 가져와야 하지만, 여기서는 localStorage의 모든 크루를 가져옴
  const crews = []
  // 현재는 단일 크루만 저장되므로, 다른 크루는 모의 데이터로 생성
  const currentCrew = getCrewData()
  if (currentCrew) {
    crews.push(currentCrew)
  }
  
  // 모의 크루 데이터 추가 (실제 환경에서는 서버에서 가져옴)
  const mockCrews = [
    {
      name: '영어 마스터즈',
      code: 'ENGL01',
      members: [
        { name: '알렉스', streak: 45, totalDays: 50 },
        { name: '사라', streak: 42, totalDays: 48 },
        { name: '제이크', streak: 38, totalDays: 45 },
      ]
    },
    {
      name: '데일리 챌린저',
      code: 'DAILY2',
      members: [
        { name: '민수', streak: 35, totalDays: 42 },
        { name: '지영', streak: 33, totalDays: 40 },
      ]
    },
    {
      name: '그로우 팀',
      code: 'GROW3',
      members: [
        { name: '현우', streak: 28, totalDays: 35 },
        { name: '수진', streak: 25, totalDays: 32 },
        { name: '태호', streak: 22, totalDays: 30 },
        { name: '미래', streak: 20, totalDays: 28 },
      ]
    }
  ]
  
  // 현재 크루를 제외한 모의 크루만 추가
  mockCrews.forEach(crew => {
    if (!currentCrew || crew.code !== currentCrew.code) {
      crews.push(crew)
    }
  })
  
  // 총 연속일 기준으로 정렬
  return crews.sort((a, b) => {
    const aTotal = a.members.reduce((sum, m) => sum + (m.streak || 0), 0)
    const bTotal = b.members.reduce((sum, m) => sum + (m.streak || 0), 0)
    return bTotal - aTotal
  })
}

function getCrewData() {
  const stored = localStorage.getItem('crewData')
  return stored ? JSON.parse(stored) : null
}

function renderCalendarPage() {
  const baseDate = state.calendarDate instanceof Date ? state.calendarDate : new Date(state.calendarDate)
  const monthDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1)
  const monthLabel = `${monthDate.getFullYear()}년 ${monthDate.getMonth() + 1}월`
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']
  const allChallenges = getAllChallenges()
  const days = buildCalendarDays(monthDate, allChallenges)

  if (!state.selectedCalendarDate) {
    state.selectedCalendarDate = getTodayDateString()
  }

  const visibleKeys = days.map((day) => day.key)
  if (!visibleKeys.includes(state.selectedCalendarDate)) {
    const fallback = days.find((day) => day.inCurrentMonth) || days[0]
    if (fallback) {
      state.selectedCalendarDate = fallback.key
    }
  }

  const selectedKey = state.selectedCalendarDate
  const selectedChallenge = allChallenges[selectedKey]
  const selectedStatus = determineChallengeStatus(selectedChallenge)
  const selectedMeta = STATUS_META[selectedStatus] || STATUS_META.none

  const legendHtml = STATUS_ORDER.map((status) => {
    const meta = STATUS_META[status]
    return `
      <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all">
        <span class="w-3 h-3 inline-block rounded-full ${meta.dotClass} shadow-sm"></span>
        <span class="text-xs sm:text-sm font-medium text-gray-600">${meta.label}</span>
      </div>
    `
  }).join('')

  const weekHeaderHtml = weekDays
    .map((day, idx) => {
      const weekendClass = idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : 'text-gray-600'
      const emoji = idx === 0 ? '🌷' : idx === 6 ? '🌙' : ['📅', '💼', '📚', '🎨', '✨'][idx - 1] || '⭐'
      return `<div class="py-3 text-sm font-bold uppercase border-b-2 border-gray-200 bg-gray-50 text-center ${weekendClass} shadow-sm">${emoji} ${day}</div>`
    })
    .join('')

  const daysHtml = days
    .map((day, idx) => {
      const meta = STATUS_META[day.status] || STATUS_META.none
      const isSelected = day.key === selectedKey
      const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6
      const weekendClass = day.date.getDay() === 0 ? 'text-red-500' : day.date.getDay() === 6 ? 'text-blue-500' : 'text-gray-700'
      const isLastColumn = (idx + 1) % 7 === 0
      const baseClasses = [
        'calendar-day',
        'relative',
        'h-24',
        'px-3',
        'pt-2.5',
        'pb-2',
        'border-b-2',
        isLastColumn ? '' : 'border-r-2',
        'border-gray-200',
        'focus:outline-none',
        'transition-all',
        'duration-300',
        'hover:scale-105',
        'hover:z-10',
        day.inCurrentMonth 
          ? 'bg-white hover:bg-emerald-50 hover:shadow-lg' 
          : 'bg-gray-50 text-gray-400 hover:bg-gray-100',
        isSelected ? 'ring-4 ring-emerald-300 ring-offset-2 shadow-xl scale-105 z-20 bg-emerald-50' : '',
        day.isToday ? 'border-2 border-emerald-400 shadow-inner bg-emerald-50' : '',
      ]
      const badge = `
        <span class="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${meta.badgeClass} shadow-sm font-medium">
          <span class="w-2 h-2 inline-block rounded-full ${meta.dotClass} animate-pulse"></span>
          ${meta.label}
        </span>
      `

      const challenge = day.challenge
      const goalSnippet = challenge && challenge.goal ? escapeHtml(truncateText(challenge.goal, 30)) : ''
      // 목표 텍스트만 표시하고, 상태 텍스트는 제거 (색상으로 표시되므로)
      const noteHtml = challenge && goalSnippet
        ? `<p class="text-[11px] text-gray-500 mt-1.5 leading-tight line-clamp-2">${goalSnippet}</p>`
        : ''

      const todayBadge = day.isToday ? '<span class="absolute top-1 right-1 text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500 text-white font-bold shadow-md animate-bounce">✨ 오늘</span>' : ''
      return `
        <button class="${baseClasses.filter(Boolean).join(' ')}" data-date="${day.key}" aria-label="${day.key}">
          <span class="text-base font-bold ${weekendClass} drop-shadow-sm">${day.date.getDate()}</span>
          <div class="mt-1.5">${badge}</div>
          ${noteHtml}
          ${todayBadge}
        </button>
      `
    })
    .join('')

  const calendarGridHtml = `
    <div class="border-2 border-gray-200 rounded-3xl overflow-hidden shadow-2xl bg-white">
      <div class="grid grid-cols-7 bg-gray-50">
        ${weekHeaderHtml}
      </div>
      <div class="grid grid-cols-7 bg-white">
        ${daysHtml}
      </div>
    </div>
  `

  const detailHtml = renderCalendarDetail(selectedKey, selectedChallenge, selectedMeta)

  const content = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-3xl shadow-2xl p-6 border-2 border-gray-200">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <span class="text-4xl">📅</span>
              ${monthLabel}
            </h1>
            <p class="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <span>✨</span>
              한 달 동안의 학습 루프를 한눈에 확인하세요!
            </p>
          </div>
          <div class="flex items-center gap-2">
            <button id="prev-month" class="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-110">◀</button>
            <button id="calendar-today" class="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-sm font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-110">✨ 오늘</button>
            <button id="next-month" class="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-110">▶</button>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 mb-5">
          ${legendHtml}
        </div>
        ${calendarGridHtml}
      </div>
      <div class="lg:sticky lg:top-4 lg:self-start">
        ${detailHtml}
      </div>
    </div>
  `

  document.getElementById('content').innerHTML = content
  setupCalendarHandlers()
}

function setupCalendarHandlers() {
  const prevBtn = document.getElementById('prev-month')
  const nextBtn = document.getElementById('next-month')
  const todayBtn = document.getElementById('calendar-today')

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const current = state.calendarDate instanceof Date ? state.calendarDate : new Date(state.calendarDate)
      state.calendarDate = new Date(current.getFullYear(), current.getMonth() - 1, 1)
      state.selectedCalendarDate = toDateKey(state.calendarDate)
      renderCalendarPage()
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const current = state.calendarDate instanceof Date ? state.calendarDate : new Date(state.calendarDate)
      state.calendarDate = new Date(current.getFullYear(), current.getMonth() + 1, 1)
      state.selectedCalendarDate = toDateKey(state.calendarDate)
      renderCalendarPage()
    })
  }

  if (todayBtn) {
    todayBtn.addEventListener('click', () => {
      const today = new Date()
      state.calendarDate = new Date(today.getFullYear(), today.getMonth(), 1)
      state.selectedCalendarDate = getTodayDateString()
      renderCalendarPage()
    })
  }

  document.querySelectorAll('.calendar-day').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.date
      if (!key) return
      
      // 날짜 선택 업데이트
      state.selectedCalendarDate = key
      const clickedDate = new Date(key + 'T00:00:00')
      state.calendarDate = new Date(clickedDate.getFullYear(), clickedDate.getMonth(), 1)
      
      // 캘린더 페이지 다시 렌더링 (상세 정보 업데이트)
      renderCalendarPage()
    })
  })
  
  // "이어서 진행하기" 버튼 이벤트 리스너
  const continueBtn = document.getElementById('continue-challenge')
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      const selectedKey = state.selectedCalendarDate
      if (!selectedKey) return
      
      // 해당 날짜의 챌린지 가져오기
      const allChallenges = getAllChallenges()
      const challenge = allChallenges[selectedKey]
      const status = determineChallengeStatus(challenge)
      
      // 완료되지 않은 날짜인 경우 해당 단계로 이동
      if (status !== 'completed') {
        // 기록이 없는 경우 (none) 목표 설정 화면으로
        if (status === 'none') {
          state.currentChallenge = null
          state.challengeStatus = 'no_goal'
        } else {
          // 해당 날짜의 챌린지를 현재 챌린지로 설정
          state.currentChallenge = challenge
          state.challengeStatus = status
        }
        
        // 홈 화면으로 이동 (상태 확인 건너뛰기)
        renderHome(false, true)
        highlightNav('home')
      }
    })
  }
}

function buildCalendarDays(monthDate, allChallenges) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const firstWeekday = firstDay.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7
  const todayKey = getTodayDateString()
  const days = []

  for (let i = 0; i < totalCells; i++) {
    const date = new Date(year, month, i - firstWeekday + 1)
    const key = toDateKey(date)
    const challenge = allChallenges[key]
    const status = determineChallengeStatus(challenge)
    days.push({
      date,
      key,
      inCurrentMonth: date.getMonth() === month,
      status,
      challenge,
      isToday: key === todayKey,
    })
  }

  return days
}

function determineChallengeStatus(challenge) {
  if (!challenge) {
    return 'none'
  }
  if (challenge.quizPassed) {
    return 'completed'
  }
  if (challenge.quizData) {
    return 'quiz_pending'
  }
  if (challenge.feedback) {
    return 'feedback_viewed'
  }
  if (challenge.diary) {
    return 'diary_written'
  }
  if (challenge.goal) {
    return 'goal_set'
  }
  return 'none'
}

function renderCalendarDetail(dateKey, challenge, meta) {
  const formattedDate = formatKoreanDate(dateKey)
  const description = meta.description || ''
  const status = determineChallengeStatus(challenge)
  const isCompleted = status === 'completed'
  const hasNoRecord = status === 'none'

  if (!challenge) {
    return `
      <div class="bg-white rounded-3xl shadow-2xl p-6 h-full border-2 border-gray-200">
        <div class="flex flex-wrap items-center gap-3 mb-5">
          <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span class="text-3xl">📆</span>
            ${formattedDate}
          </h2>
          <span class="px-3 py-1 rounded-full text-xs font-bold ${meta.badgeClass} shadow-md">${meta.label}</span>
        </div>
        <p class="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <span>💭</span>
          ${description}
        </p>
        <div class="bg-gray-50 rounded-2xl p-4 mb-5 border border-gray-200">
          <p class="text-sm text-gray-600 flex items-center gap-2">
            <span class="text-xl">✨</span>
            이 날에는 아직 기록이 없습니다.
          </p>
        </div>
        <button id="continue-challenge" class="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 text-base">
          <span class="text-xl">🎯</span>
          <span>목표 설정하기</span>
        </button>
      </div>
    `
  }

  const sections = []
  
  // 목표 섹션
  if (challenge.goal) {
    sections.push(`
      <div class="mb-5">
        <h3 class="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span class="text-xl">🎯</span>
          목표
        </h3>
        <div class="bg-green-50 rounded-2xl p-4 border-2 border-green-200 shadow-md">
          <p class="text-sm text-gray-800 font-medium leading-relaxed">${escapeHtml(challenge.goal)}</p>
          ${challenge.goalDescription ? `<p class="text-xs text-gray-600 mt-3 pt-3 border-t border-green-200">${escapeHtml(challenge.goalDescription)}</p>` : ''}
        </div>
      </div>
    `)
  }

  // 일기 섹션
  if (challenge.diary) {
    const correctedDiary = challenge.feedback?.corrected || challenge.diary
    sections.push(`
      <div class="mb-5">
        <h3 class="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span class="text-xl">📝</span>
          일기
        </h3>
        <div class="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200 shadow-md">
          <p class="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">${escapeHtml(correctedDiary)}</p>
        </div>
      </div>
    `)
  }

  // 표현 학습 섹션
  if (challenge.feedback && Array.isArray(challenge.feedback.expressions) && challenge.feedback.expressions.length > 0) {
    const expressionsList = challenge.feedback.expressions.map((expr, idx) => 
      `<li class="text-xs text-gray-700 py-2.5 px-3 rounded-lg hover:bg-purple-100 transition-colors border-b border-purple-100 last:border-b-0">
        <div class="flex items-start gap-2">
          <span class="text-purple-400 font-bold text-[10px] mt-0.5">${idx + 1}.</span>
          <div class="flex-1">
            <span class="font-bold text-emerald-600 text-sm">${escapeHtml(expr.word)}</span>
            ${expr.meaning ? `<span class="text-gray-600 ml-2">- ${escapeHtml(expr.meaning)}</span>` : ''}
            ${expr.example ? `<div class="text-[11px] text-gray-500 mt-1 italic ml-4">"${escapeHtml(expr.example)}"</div>` : ''}
          </div>
        </div>
      </li>`
    ).join('')
    sections.push(`
      <div class="mb-5">
        <h3 class="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span class="text-xl">💡</span>
          학습한 표현 <span class="text-emerald-600">(${challenge.feedback.expressions.length}개)</span>
        </h3>
        <div class="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200 shadow-md">
          <ul class="space-y-0 max-h-96 overflow-y-auto pr-2">
            ${expressionsList}
          </ul>
        </div>
      </div>
    `)
  }

  // 퀴즈 섹션
  if (challenge.quizPassed) {
    const total = challenge.quizData?.questions?.length || challenge.feedback?.expressions?.length || '-'
    sections.push(`
      <div class="mb-5">
        <h3 class="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span class="text-xl">✅</span>
          퀴즈
        </h3>
        <div class="bg-pink-50 rounded-2xl p-4 border-2 border-pink-200 shadow-md">
          <p class="text-sm text-gray-800 flex items-center gap-2">
            <span class="text-lg">🎉</span>
            <span class="font-bold text-pink-600 text-base">${challenge.quizScore ?? '-'} / ${total}</span>
            <span class="text-xs text-gray-600 bg-green-100 px-2 py-1 rounded-full font-medium">통과 ✓</span>
          </p>
        </div>
      </div>
    `)
  } else if (challenge.quizData) {
    sections.push(`
      <div class="mb-5">
        <h3 class="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span class="text-xl">🧠</span>
          퀴즈
        </h3>
        <div class="bg-pink-50 rounded-2xl p-4 border-2 border-pink-200 shadow-md">
          <p class="text-sm text-gray-800 flex items-center gap-2">
            <span class="text-lg">⏳</span>
            진행 중 (통과 필요)
          </p>
        </div>
      </div>
    `)
  }

  const detailContent = sections.length
    ? sections.join('')
    : '<p class="text-sm text-gray-500">추가 기록이 없습니다.</p>'

  // 완료되지 않은 경우 "이어서 진행하기" 버튼 추가
  let continueButton = ''
  if (!isCompleted) {
    const buttonTexts = {
      'none': '🎯 목표 설정하기',
      'goal_set': '📝 일기 작성하기',
      'diary_written': '🤖 AI 피드백 받기',
      'feedback_viewed': '🧠 퀴즈 풀기',
      'quiz_pending': '✅ 퀴즈 완료하기',
    }
    const buttonText = buttonTexts[status] || '이어서 진행하기'
    continueButton = `
      <div class="mt-6 pt-5 border-t-2 border-gray-200">
        <button id="continue-challenge" class="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3.5 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 text-base">
          <span>${buttonText}</span>
        </button>
      </div>
    `
  }

  return `
    <div class="bg-white rounded-3xl shadow-2xl p-6 h-full overflow-y-auto border-2 border-gray-200">
      <div class="flex flex-wrap items-center gap-3 mb-6 sticky top-0 bg-white pb-4 border-b-2 border-gray-200 rounded-b-2xl">
        <h2 class="text-xl font-bold text-gray-800">${formattedDate}</h2>
        <span class="px-3 py-1 rounded-full text-xs font-semibold ${meta.badgeClass}">${meta.label}</span>
      </div>
      <p class="text-sm text-gray-500 mb-5">${description}</p>
      ${detailContent}
      ${continueButton}
    </div>
  `
}

function formatKoreanDate(key) {
  if (!key) return ''
  const date = new Date(key + 'T00:00:00')
  if (Number.isNaN(date.getTime())) return key
  const weekDays = ['일', '월', '화', '수', '목', '금', '토']
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${weekDays[date.getDay()]})`
}

function toDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function truncateText(text, limit = 80) {
  if (!text) return ''
  return text.length > limit ? `${text.slice(0, limit)}…` : text
}

function escapeHtml(text) {
  if (text === undefined || text === null) {
    return ''
  }
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function ensureHomeShortcut() {
  if (document.getElementById('home-shortcut')) {
    return
  }

  const wrapper = document.createElement('div')
  wrapper.id = 'home-shortcut'
  wrapper.className = 'fixed bottom-6 right-6 z-50'

  const button = document.createElement('button')
  button.type = 'button'
  button.className =
    'shadow-xl transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-3 flex items-center gap-2'
  button.innerHTML = '<span class="text-xl">🏠</span><span class="text-sm font-semibold">홈으로</span>'
  button.addEventListener('click', () => {
    // 진행 과정은 저장된 상태로 두고, 화면만 처음 단계(목표 설정)로 이동
    state.currentPage = 'home'
    highlightNav('home')
    renderHome(true) // 강제로 목표 설정 화면으로
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  wrapper.appendChild(button)
  document.body.appendChild(wrapper)
}
