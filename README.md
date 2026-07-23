# Movie-SPA-Demo

Vue.js 를 활용한 학습용 SPA 프로젝트 입니다.

## Documents

- [개발 일지](https://ambitious-brie-8fc.notion.site/1302402acafd807d8833e3c418324f90?pvs=4)
- [배포 URL](https://tkddnr1022.github.io/Movie-SPA-Demo/)

## Stacks

- [Vue.js](https://ko.vuejs.org/), [Vite](https://vite.dev/)
- GitHub Pages
- TypeScript

## Packages

- [axios](https://www.npmjs.com/package/axios)
- [heroicons v1](https://v1.heroicons.com/)
- [crypto-js](https://github.com/brix/crypto-js)
- [lodash-es](https://www.npmjs.com/package/lodash-es)
- [vue-toast-notification](https://www.npmjs.com/package/vue-toast-notification)

## Features

### Authentication

- 비밀번호 해싱(SHA-256)
- 자동 로그인
- 세션 검사

### Movie

- [TMDB API](https://developer.themoviedb.org/reference/movie-now-playing-list)
  - 현재 상영작
  - 인기 작품
  - 최고 평점
  - 개봉 예정작
- 영화 상세정보
  - 제목
  - 포스터 및 배경
  - 개봉 날짜
  - 제작 국가
  - 평점
  - 설명
- API 응답 캐싱

### Future

- 더 많은 요구사항 구현

## Installation

```
$ npm install
```

## Configuration

### TMDB API KEY

- TMDB API 사용을 위해 API KEY 가 필요합니다. [TMDB 개발자 문서](https://developer.themoviedb.org/docs/getting-started) 혹은 [yoonezi.log](https://velog.io/@yoonezi/TMDB-API-key-%EB%B0%9C%EA%B8%89%EB%B0%9B%EA%B8%B0) 를 참고하세요.
  > 발급 받은 API KEY 를 이 애플리케이션에서 회원 가입 시 사용합니다.

### Environmental Variables

- 루트 디렉토리에 `.env` 생성 후 다음과 같이 작성합니다.

  ```
  VITE_REGION = KR
  VITE_LANGUAGE = ko-KR
  VITE_CACHE_EXPIRES_IN = 3600000
  ```

  - `VITE_REGION`: TMDB API 요청 시 사용할 국가 코드입니다. [ISO-3166-1](https://ko.wikipedia.org/wiki/ISO_3166-1) 코드로 입력합니다.
  - `VITE_LANGUAGE`: TMDB API 요청 시 사용할 언어 코드입니다. [ISO-639-1](https://ko.wikipedia.org/wiki/ISO_639-1_%EC%BD%94%EB%93%9C_%EB%AA%A9%EB%A1%9D) 혹은 [TMDB Languages Configuration](https://developer.themoviedb.org/reference/configuration-languages) 을 참고하세요.
  - `VITE_CACHE_EXPIRES_IN`: 캐시된 API 응답의 보관 기간입니다. 밀리초 단위로 입력합니다.

## Build and run

### 개발 환경에서 실행

```
$ npm run dev
```

### 프로덕션 빌드

```
$ npm run build
$ npm run preview
```

### File Structure

```
📦Movie-SPA-Demo
 ┣ 📂.github
 ┃ ┣ 📂ISSUE_TEMPLATE
 ┃ ┃ ┣ 📜bug_report.md
 ┃ ┃ ┗ 📜feature.md
 ┃ ┣ 📂workflows
 ┃ ┃ ┣ 📜deploy.yml             # Github-Pages 배포 workflow
 ┃ ┃ ┗ 📜integration.yml        # 빌드 workflow
 ┃ ┗ 📜pull_request_template.md
 ┣ 📂public
 ┃ ┗ 📜favicon.ico              # favicon
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📜base.css
 ┃ ┃ ┣ 📜logo.png               # main logo
 ┃ ┃ ┗ 📜main.css               # main css
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜Checkbox.vue           # Custom Checkbox
 ┃ ┃ ┣ 📜Footer.vue             # Footer
 ┃ ┃ ┣ 📜Landing.vue            # Landing Page
 ┃ ┃ ┣ 📜MovieDialog.vue        # Movie Detail Dialog
 ┃ ┃ ┣ 📜MovieItem.vue          # Movie Item(Container)
 ┃ ┃ ┣ 📜Navbar.vue             # Custom Navbar
 ┃ ┃ ┣ 📜SignIn.vue             # SignIn/SignUp Card
 ┃ ┃ ┗ 📜Slider.vue             # Movie Slider
 ┃ ┣ 📂router
 ┃ ┃ ┗ 📜index.ts               # router
 ┃ ┣ 📂scripts
 ┃ ┃ ┣ 📂api                    # TMDB API 요청 스크립트
 ┃ ┃ ┃ ┣ 📜get-genre-list.ts
 ┃ ┃ ┃ ┗ 📜get-movie-list.ts
 ┃ ┃ ┣ 📂enums                  # API 요청 관련 상수
 ┃ ┃ ┃ ┣ 📜api-base-urls.ts
 ┃ ┃ ┃ ┗ 📜movie-list-query.ts
 ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┣ 📜cache.ts
 ┃ ┃ ┃ ┣ 📜genre.ts
 ┃ ┃ ┃ ┣ 📜movie.ts
 ┃ ┃ ┃ ┗ 📜user.ts
 ┃ ┃ ┗ 📂utils
 ┃ ┃ ┃ ┗ 📜storage.ts           # LocalStorage 관리 스크립트
 ┃ ┣ 📂test
 ┃ ┃ ┗ 📜test-movies.ts         # 테스트 데이터
 ┃ ┣ 📂views
 ┃ ┃ ┣ 📜HomeView.vue           # 메인 페이지(/)
 ┃ ┃ ┗ 📜SignInView.vue         # 로그인/회원가입 페이지(/signin)
 ┃ ┣ 📂__test__
 ┃ ┃ ┗ 📜storage.spec.ts        # unit test
 ┃ ┣ 📜App.vue                  # 최상위 컴포넌트
 ┃ ┗ 📜main.ts                  # app main
 ┣ 📜.editorconfig
 ┣ 📜.gitignore
 ┣ 📜.prettierrc.json
 ┣ 📜env.d.ts
 ┣ 📜eslint.config.js
 ┣ 📜index.html                 # index(meta, title 등)
 ┣ 📜LICENSE
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜shims-vue.d.ts
 ┣ 📜tsconfig.app.json
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.node.json
 ┣ 📜tsconfig.vitest.json
 ┣ 📜vite.config.ts
 ┗ 📜vitest.config.ts
```
