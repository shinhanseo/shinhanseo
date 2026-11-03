# 신한서 | Mobile App Developer

**4개의 모바일 앱을 기획부터 개발·스토어 심사·배포까지 직접 진행했습니다.**

Kotlin·Jetpack Compose로 네이티브 Android 앱을,
React Native와 Flutter로 iOS·Android 앱을 개발합니다.
알림, 위치, 카메라, 실시간 채팅 등 모바일 환경의 기능을 사용자 흐름에 맞게 구현해왔습니다.

<p>
  <img src="./profile/badges/released-apps.svg" alt="Released Apps 4" />
  <img src="./profile/badges/app-store.svg" alt="App Store 3" />
  <img src="./profile/badges/google-play.svg" alt="Google Play 4" />
</p>

---

## Selected Work

개인 프로젝트의 기획·UI/UX 디자인·클라이언트 개발을 담당했으며,
서버가 필요한 서비스는 백엔드까지 구현했습니다.

### noti. | 온디바이스 AI 알림 관리

쌓이는 알림에서 중요한 알림을 선별하고,
**판단 이유를 함께 보여주는 Android 앱**입니다.

- **판단 방식:** 설명 가능한 규칙으로 먼저 판단하고, 애매한 구간에만 온디바이스 모델을 적용했습니다.
- **모델 선택:** 모델 크기와 중요 알림 누락을 함께 비교해 KoEn-E5-Tiny INT8을 채택했습니다. 실제 알림 145개를 사용한 개발 평가에서 중요 알림 Recall 92.3%, ONNX 모델 크기 36.5 MiB를 확인했습니다. 최종 블라인드 평가 수치는 아닙니다. ([비교 보고서](https://github.com/shinhanseo/noti/blob/main/ml/reports/compact_mobile_onnx_validation_v2.md))
- **알림 처리:** `NotificationListenerService`로 알림을 수집하고 `Room`에 저장했습니다.
- **검증:** 중요도 판단 로직을 JUnit으로 테스트했습니다.

`Kotlin` `Jetpack Compose` `Room` `Hilt` `ONNX Runtime`

[![Repository](https://img.shields.io/badge/Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/shinhanseo/noti)
[![Google Play](https://img.shields.io/badge/Google_Play-414141?style=flat-square&logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=com.hanseo.noti)
[![Velog Series](https://img.shields.io/badge/Velog_Series-20C997?style=flat-square&logo=velog&logoColor=white)](https://velog.io/@imkara/series/noti.)

---

### 지금이니 | 약속 시간에 맞춘 출발 지원

경로에 따라 출발 시각을 계산하고,
**알림과 신발 사진 인증으로 실제 출발까지 이어지도록 만든 앱**입니다.

- 대중교통 이동 시간과 준비 시간을 반영해 출발 시각을 계산했습니다.
- 출발 전·출발 시각·미인증 상태에 맞춰 로컬 알림을 예약하고 정리했습니다.
- 카메라 판별 결과에 위치·시간 조건을 결합해 출발을 인증했습니다.
- 오프라인 상태를 처리하고 iOS·Android에 배포했습니다.

`React Native` `Expo` `TypeScript` `Zustand` `Node.js`

[![Frontend Repo](https://img.shields.io/badge/Frontend_Repo-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/shinhanseo/meet_alarm)
[![Backend Repo](https://img.shields.io/badge/Backend_Repo-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/shinhanseo/meet_alarm_backend)
[![App Store](https://img.shields.io/badge/App_Store-0D96F6?style=flat-square&logo=appstore&logoColor=white)](https://apps.apple.com/kr/app/id6759585246)
[![Google Play](https://img.shields.io/badge/Google_Play-414141?style=flat-square&logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=com.imkara1.meetalarm)
[![Velog Series](https://img.shields.io/badge/Velog_Series-20C997?style=flat-square&logo=velog&logoColor=white)](https://velog.io/@imkara/series/%EC%A7%80%EA%B8%88%EC%9D%B4%EB%8B%88)

---

### 모행 | 제주 여행 동행 매칭

조건에 맞는 동행을 모집하고 참여한 뒤,
실시간 채팅으로 일정을 조율하는 여행 커뮤니티 앱입니다.

- Socket.IO 실시간 채팅과 Drift 기반 로컬 메시지 관리를 구현했습니다.
- JWT 인증·FCM 푸시·S3 이미지 업로드를 포함한 백엔드를 개발했습니다.
- EULA·신고·차단·사용자 숨김 기능을 구현하고 iOS·Android에 배포했습니다.

`Flutter` `Dart` `Node.js` `Socket.IO` `Drift` `PostgreSQL` `FCM`

[![Repository](https://img.shields.io/badge/Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/shinhanseo/trip_mate)
[![App Store](https://img.shields.io/badge/App_Store-0D96F6?style=flat-square&logo=appstore&logoColor=white)](https://apps.apple.com/kr/app/id6771613106)
[![Google Play](https://img.shields.io/badge/Google_Play-414141?style=flat-square&logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=com.hanseo.mohaeng)
[![Velog Series](https://img.shields.io/badge/Velog_Series-20C997?style=flat-square&logo=velog&logoColor=white)](https://velog.io/@imkara/series/%EB%AA%A8%ED%96%89)

---

### 머문 | 장소에 남기는 감정 기록

장소·사진·감정을 함께 기록하고,
지도와 통계로 감정의 흐름을 돌아보는 앱입니다.

- 네이버 지도 기반 감정 지도와 월별·감정별·장소별 보관함을 구현했습니다.
- TanStack Query로 서버 상태를, Zustand로 클라이언트 상태를 분리했습니다.
- 카카오·Apple 로그인과 JWT 인증을 구현하고 iOS·Android에 배포했습니다.

`React Native` `Expo` `TypeScript` `TanStack Query` `Zustand` `PostgreSQL`

[![Repository](https://img.shields.io/badge/Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/shinhanseo/meomun)
[![App Store](https://img.shields.io/badge/App_Store-0D96F6?style=flat-square&logo=appstore&logoColor=white)](https://apps.apple.com/kr/app/id6787008881)
[![Google Play](https://img.shields.io/badge/Google_Play-414141?style=flat-square&logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=com.hanseo.meomun&hl=ko)
[![Velog Series](https://img.shields.io/badge/Velog_Series-20C997?style=flat-square&logo=velog&logoColor=white)](https://velog.io/@imkara/series/%EB%A8%B8%EB%AC%B8)

---

## Team Experience

### PAUZE | HSP를 위한 감정 안정 서비스

4인 Android 팀에서 **큐레이션(발견)과 시각 안정 기능**을 담당했습니다.

- Jetpack Compose로 담당 화면을 구현하고, 큐레이션 카테고리 칩을 팀 공통 컴포넌트로 교체했습니다. ([PR #137](https://github.com/UMC-PAUZE/PAUZE-Android/pull/137))
- 보관함 검색은 API 제공 전 클라이언트 필터링으로 구현한 뒤, 서버의 `keyword` 파라미터 추가에 맞춰 검색과 페이지네이션을 연동했습니다. ([PR #142](https://github.com/UMC-PAUZE/PAUZE-Android/pull/142), [PR #162](https://github.com/UMC-PAUZE/PAUZE-Android/pull/162))
- Issue 단위로 작업을 분리하고 기능별 브랜치에서 개발했습니다.
- PR 코드 리뷰와 Squash & Merge 방식으로 협업했습니다.

`Kotlin` `Jetpack Compose` `MVVM` `Hilt` `Retrofit`

[![Team Repository](https://img.shields.io/badge/Team_Repository-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/UMC-PAUZE/PAUZE-Android)

---

## Writing

앱을 개발하며 마주친 문제와 기술적 선택을 기록합니다.

[![Velog](https://img.shields.io/badge/Velog-개발_기록-20C997?style=flat-square&logo=velog&logoColor=white)](https://velog.io/@imkara/posts)
