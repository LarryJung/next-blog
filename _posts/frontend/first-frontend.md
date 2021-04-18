---
title: '처음하는 frontend'
excerpt: '회사에서 억지로(?) 쓰게 된 nextjs. 프론트환경은 언제나 낯설지만 나름대로 매력을 느껴 시작해보는 공부..'
coverImage: '/assets/blog/dynamic-routing/cover.jpg'
date: '2021-04-18'
author:
  name: 'chaesun'
  picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '/assets/blog/dynamic-routing/cover.jpg'
---

아무리 백엔드 개발자라고 하지만 교만스럽게도 프론트 진영을 많이 좋아하지 않았는데, 회사에서 nextjs를 이용한 프로젝트를 개발하게 된 게기로 이쪽에 흥미를 조금 가지게 된 것 같습니다.

이 참에 사이드 프로젝트를 해보고 싶었는데, 아직 스스로 구축해본 경험이 없기 때문에 기술 블로그를 만들었습니다.

아직은 돌아가게만 만들었기 때문에 대략 90년대 웹 상의 어느 한 구린 웹페이지 같지만, 나름대로 레트로 느낌도 나고 좋네요.

프론트 진영에 관심을 가지게 된 이유는 React, Typescript 때문입니다.

안그래도 FP에 좀 관심이 있는데 React, typescript 를 쓰면 fp 를 문법적으로 쉽게 지원을 해줘서 코드짜는게 재밋게 느껴질 정도라고 해야하나..
nextjs 도 너무 잘 만들어진 프레임워크기 때문에 이거 이용하면 간단한 프로젝트는 쉽게 해볼 수 있겠다 싶어서 도전!

## 마크다운을 로딩하는 블로그 만들기

### 기술스택

- Typescript
- React
- next.js
- M1 mac (?)

m1 맥북이 왜냐고 하면.. node 버전 이슈 때문에 나름 할 말이 있어서 추가해 보았습니다. m1 맥북에서 node 메모리 초과 문제가 있었고, 아주 최근에서야 수정이 있었습니다. 그래서 사용하는 버전은 `v15.9.0` 이고 LTS 버전을 사용하고 싶었지만 방법이 잘 찾아지지 않아서 이대로 진행했습니다. [링크참고](https://github.com/nodejs/node/issues/37061#issuecomment-780499544)

먼저 next js 셋팅을 하는 것으로 시작합니다. 프로젝트 디렉토리에서 아래 입력하면 typescript로 된 예제 프로젝트가 생성됩니다.

```
$ npx create-next-app --example with-typescript [site-name]
```

타입스크립트로 생성된 프로젝트는 tsconfig.json 이란 파일이 있는데요, 아래처럼 생겼으니 참고하시고 나중에 요 설정을 조금 건드려 보겠습니다.

```json
// tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "alwaysStrict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "lib": ["dom", "es2017"],
    "module": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "esnext",
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"],
      "@/assets/*": ["assets/*"],
      "@/lib/*": ["lib/*"]
    }
  },
  "exclude": ["node_modules"],
  "include": ["**/*.ts", "**/*.tsx", "lib/api.js"]
}
```
