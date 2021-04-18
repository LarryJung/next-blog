---
title: 'Kotlin lambda'
excerpt: '코틀린의 람다식은 자바랑 비교하면 진짜 진짜 편리하게 잘 되어있다만.. 커링을 사용해야할지 말지 고민이 되는 수준으로 아쉬운 점도 있습니다.'
coverImage: '/assets/blog/dynamic-routing/cover.jpg'
date: '2021-04-18'
author:
  name: chaesun
  picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '/assets/blog/dynamic-routing/cover.jpg'
---

코틀린의 람다식은 자바랑 비교하면 진짜 진짜 편리하게 잘 되어있다만..

커링을 사용해야할지 말지 고민이 되는 수준으로 아쉬운 점도 있습니다.

## 코틀린 람다식

가장 간단한 예제로 숫자 두개를 함수를 만들어봅니다.

```kotlin
val plus: (Int, Int) => Int = { a, b -> a + b}
```

모던한 언어들은 많이 지원을 해 주는데.. 함수를 부분만 적용하면 재사용에 이점이 있는데요 위 같이 짜버리면 부분적용은 커녕 그게 무슨 이야기인지도 모르져.. 개념 자체가 없으니

```
val plus10: (Int) -> (Int) = { i + 10 }
val plus6: (Int) -> (Int) = { i + 6 }
val plus3: (Int) -> (Int) = { i + 3 }
```

위 3가지 함수를 부분적용 함수라는 개념(=커링)을 이용하면 좀 더 코드를 줄여볼 수 있습니다.

```
val plus: (Int) -> (Int) -> Int = {a -> { b -> { a + b}}}
val plus10 = plus(10)
val plus6: plus(6)
val plus3: plus(3)
```

커링된 plus 함수에서 타입을 알고 있으니 plus10 등을 정의할 때는 타입을 따로 지정하지 않고 저렇게 짧게 써서 사용할 수 있습니다.

다 좋은데!! 개인적으로 불만인 점은 코틀린에서는 커링을 3겹을 쓰면 겹쳐진 중괄호가 너무 많이 나온다는 점입니다.. ㅠㅠ 이것 때문에 코드 가독성을 많이 떨어뜨립니다. 기존 함수 개념에 익숙치 않은 자바진영의 개발자분들은 비슷하게 오버로드 식으로 개발을 하면 되긴 해서..ㅎㅎ 아쉬운 부분이긴 합니다..

그래도 코틀린은 좋으니깐.. 써야지..
