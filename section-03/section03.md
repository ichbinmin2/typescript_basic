## The TypeScript Compiler (and its Configuration)

### 목차

- [Using "Watch Mode"](#Watch-Mode-이용하기)

### Watch Mode 이용하기

- 변경사항이 있을 때마다 `tsc` 커맨드를 실행하는 것은 어쩐지 번거롭다. 변경사항을 자동으로 업데이트하고 컴파일 해주는 `watch mode`를 사용하면 훨씬 편리하다.

```js
tsc app.ts --watch
tsc app.ts -w
```

- 관찰(watch) 모드를 설정하면 컴파일 오류를 실시간으로 받아볼 수 있기 때문에 매번 컴파일 오류를 확인해줄 필요도 없다. 이처럼 관찰 모드는 생산성 향상을 위한 우수한 기능을 가지고 있다. 다만, 관찰 모드를 사용할 때는 해당 파일을 구체적으로 지정해야 한다는 단점이 있고, 이는 큰 규모의 프로젝트에는 적합하지 않을 것이다.

</br>
