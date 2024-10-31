<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>문서</template>

    Vue의
    <a href="https://vuejs.org/" target="_blank" rel="noopener">공식 문서</a>
    는 시작하는 데 필요한 모든 정보를 제공합니다.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>도구</template>

    이 프로젝트는
    <a href="https://vite.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>로 제공되고 번들링됩니다. 권장 IDE 설정은
    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>입니다. 컴포넌트와 웹 페이지를 테스트해야 하는
    경우
    <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a>와
    <a href="https://on.cypress.io/component" target="_blank" rel="noopener">Cypress Component Testing</a>를 확인해 보세요.

    <br />

    자세한 지침은 <code>README.md</code>에 있습니다.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>생태계</template>

    프로젝트에 필요한 공식 도구 및 라이브러리를 받으세요:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, 및
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. 더 많은 리소스가 필요하다면
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>를 방문하는 것을 추천합니다.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>커뮤니티</template>

    어려운 점이 있나요? 질문은
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, 우리의 공식 Discord 서버 또는
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener">StackOverflow</a>에 하세요.
    또한
    <a href="https://news.vuejs.org" target="_blank" rel="noopener">우리의 메일링 리스트</a>에 가입하고 공식
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    트위터 계정을 팔로우하여 Vue 세계의 최신 뉴스도 확인하세요.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Vue 지원하기</template>

    독립 프로젝트로서, Vue는 지속 가능성을 위해 커뮤니티의 지원에 의존합니다.
    당신은
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">후원자가 됨으로써</a>
    우리를 도와줄 수 있습니다.
  </WelcomeItem>
</template>
