# FE 코딩 테스트 v1

## Vanilla JS (기초)

### 1. `구조 분해` 할당에 대해 서술하시오.

`구조 분해 할당(Destructuring assignment)`이란 배열이나 객체의 속성을 해체하여 그 값을 개별적인 변수에 담을 수 있게 하는 JS 표현식입니다.
객체나 배열에 담긴 데이터 전부가 아닌 일부분만 필요할 경우 구조 분해 할당을 사용할 수 있습니다.

**배열 구조 분해 예시**
```javascript
const list = ["Seo","Seung","Kwon"];
const [a, b, c] = list;

console.log(a);
console.log(b);
```
> Seo  
> Seung

**객체 구조 분해 예시**
```javascript
const person = {
    name : "Seo",
    age : 27,
    email : "seoseuo@naver.com"    
};

const { name, age, email } = person;

console.log(name);
console.log(age);
console.log(email);
```
> Seo  
> 27  
>seoseuo@naver.com

---

### 2. `Optional Chaining`에 대해 서술하고 하위 호환을 위해 어떻게 표기해야 하는지 서술하시오.

`Optional Chaining` 이란 객체의 속성에 접근할 때, 해당 속성이 `null` 또는 `undefined`인 경우 에러를 발생시키지 않고 `undefined`를 반환하는 문법입니다.  
즉 객체 체인마다 참조가 유효한지 명시적으로 검증하지 않고 에러 없이 안전하게 호출할 수 있습니다.

**예시**

```javascript
const user = {
  profile: {
    name: "Seo",
    address: "Uijeongbu"
  }
};

console.log(user.profile?.address);
console.log(user.profile?.email);
```

> Uijeongbu  
> undefined

Optional Chaining은 `ES2020`에서 도입되었기 때문에
### 하위 호환을 위한 표기 방법은  

**기존 논리 연산자 `&&` 를 사용하는 것입니다.**
Optional Chaining과 같은 역할을 하도록, 각 단계에서 값이 존재하는지 확인하는 방식을 사용합니다.

```javascript
// Optional Chaining 문법
const city = user?.profile?.address?.city;

// 하위 호환용 논리 연산자 사용
const city = user && user.profile && user.profile.address && user.profile.address.city;
```
---
### 3. 빈 배열에 아래 일련의 과정을 거칠 경우, 배열에 담긴 내용을 작성하시오.
1. `push('a')`
- 배열 끝에 `a` 추가
2. `shift()`
- 배열의 첫 번째 요소 제거 후 반환
3. `unshift('e')`
- 배열 맨 앞에 값 추가

**결과**
> e


### 4. `Promise`에 대해 서술하고, `Promise`를 사용할 때 주의할 점을 2가지 이상 서술하시오.

`Promise`란 JS에서 비동기 작업의 완료 또는 실패와 그 결과 값을 나타내는 객체입니다. 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용합니다.  
비동기 작업을 순차적으로 실행하기 위해서 사용하고 콜백 함수의 가독성을 높이기 위해 Promise를 사용합니다.
비동기 작업이 성공하면 값을 반환하고(`resolve`), 실패하면 에러를 반환합니다.(`reject`).

**3가지의 상태가 있습니다.**
- `대기(pending)` : 이행되거나 거부되지 않은 초기 상태
- `이행(fulfilled)` : 비동기 작업이 성공적으로 완료된 상태`resolve`
- `거부(rejected)` : 비동기 작업이 실패한 상태`reject`

**기본 구조**
```javascript
const promise = new Promise((resolve, reject) => {
  // 비동기 작업
  if (isSuccess) {
    resolve(result); // 성공
  } else {
    reject(error);   // 실패
  }
});

promise
  .then(result => {
    console.log("성공:", result);
  })
  .catch(error => {
    console.error("실패:", error);
  })
  .finally(() => {
    console.log("작업 완료");
  });

```
- `.then()` : 작업이 성공했을 때 실행할 콜백을 지정
- `.catch()` : 작업이 실패했을 때 실행할 콜백을 지정
- `.finally()` : 성공이든 실패든 무조건 실행되는 코드

### `Promise`를 사용할 때의 주의점은
1. 반드시 `resolve`나 `reject` 중 하나는 호출해야 합니다.
- 둘 중 하나라도 호출하지 않으면 대기 상태로 남아 `.then()`이나 `.catch()`가 실행되지 않고, 영원히 대기 상태가 되어 응답이 멈춘 것처럼 보일 수 있습니다.

2. 예외 처리를 반드시 해야 합니다.
- 내부에서 에러가 발생하면 이를 `reject()`로 처리하거나, 예외가 적절히 전달되도록 해야 합니다. 만약 에러가 잡히지 않고 던져지면, 프로그램이 예기치 않게 종료되거나 `.catch()`에서 잡히지 않을 수 있습니다.

3. Promise 체인을 항상 반환(Return)해야 합니다.
- `.then()` 내부에서 또 다른 Promise를 반환해야 할 때, 그 Promise를 반환하지 않으면 체인 연결이 끊겨 예상치 못한 동작이 생길 수 있습니다.
---
  
## React

### 1. 기초

className prop을 항상 제외하는 `BaseTextArea` 컴포넌트를 구현하시오.

- 부모 컴포넌트(Editor)는 `textarea`를 `ref`로 참조해야 한다.
- 부모 컴포넌트는 버튼 2개와 `BaseTextArea`로 구성되어 있으며, React Hook을 사용하지 않는다.
- 버튼 1을 클릭하면 `BaseTextArea`에 입력한 값을 삭제해 주세요.
- 버튼 2를 클릭하면 `BaseTextArea`에 입력한 단어 중에 몇 개의 애너그램이 존재하는지 출력해 주세요.

---

### 2. 라이브러리 활용

마크다운을 파싱하기 위한 대표적인 라이브러리 `marked`(https://www.npmjs.com/package/marked)가 있다.

1. `marked`가 제공하는 `renderer` 옵션을 사용해서 `H1`, `H2`, `H3` `Heading`에 `anchor`를 추가하시오.
2. 인용문을 클릭하면 인용문을 복사하는 기능을 추가하시오.
3. `textarea`에 작성한 마크다운 텍스트를 파싱해서 화면에 출력하시오.

### 심화 (알고리즘)
주어진 `그래프 1` 에서 임의의 노드로부터 시작하여 모든 간선을 한 번만 지나는 경로가 있는
지 확인하고, 경로가 존재한다면 그 경로를 return하는 자바스크립트 함수를 작성하시오.
또한 경로가 존재하기 위한 조건이 무엇인지 설명하시오

- ES6이상 문법으로 작성할 것.
- 함수의 입력은 각 노드의 이웃 노드들을 나열한 인접 리스트 형태의 2차원 배열입니다.
- 모든 노드는 'A'부터 시작하는 문자입니다.

예시 입력 :
> [['A', 'B'], ['B', 'C'], ['B', 'D'], ['C', 'D']]

예시 출력 :
> ['A', 'B', 'C', 'D', 'B']

