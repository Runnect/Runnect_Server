# 🏃‍♀️ Runnect_Server

[32st SOPT APPJAM] Server team repository of Runnect
### 점과 점으로, 코스와 코스로 연결되는 너와 나의 러닝 경험
![표지](https://user-images.githubusercontent.com/88873302/212262655-0f14bae8-79d9-4aff-b52a-993694727a6a.jpg)
</br>
![A333](https://user-images.githubusercontent.com/88873302/212286726-608ec06a-5631-4aaf-ae7f-bf711a4ef234.jpg)

</aside>
<hr>
</br>

# ☝ 서비스 핵심 기능
### 1. 코스 그리기
> 코스 그리기로 달리기 전 목표를 설정하고 실시간 트래킹으로 코스르 따라 잘 달리고 있는지 확인합니다.
### 2. 코스 발견
> 코스 발견을 통해 나에게 맞는 코스를 추천 받거나 다른 유저가 공유한 코스를 검색하고 스크랩합니다. 코스를 직접 업로드할 수 도 있습니다.
### 3. 코스 보관함
> 코스 보관함에서 내가 그린 코스와 스크랩 코스를 관리합니다.
### 4. 마이페이지
> 마이페이지에서 프로필과 활동 기록, 업로드한 코스를 확인하고 목표 보상으로 동기를 강화합니다.

</aside>
<hr>
</br>

# 🔨 Dependencies Module ( package.json )
```json
{
  "name": "Runnect_Server",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/Runnect/Runnect_Server.git",
  "author": "YuSuhwa-ve <dhfhfkzjxms@sookmyung.ac.kr>",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon",
    "build": "tsc && node dist",
    "db:pull": "npx prisma db pull",
    "db:push": "npx prisma db push",
    "generate": "npx prisma generate",
    "prepare": "chmod ug+x .husky/* && husky install",
    "greet": "hello husky!",
    "test": "mocha ./test/ -r ts-node/register"
  },
  "dependencies": {
    "@prisma/client": "^4.8.0",
    "aws-sdk": "^2.1281.0",
    "bcryptjs": "^2.4.3",
    "dayjs": "^1.11.7",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-validator": "^6.14.2",
    "jsonwebtoken": "^9.0.0",
    "multer": "^1.4.5-lts.1",
    "multer-s3": "^3.0.1",
    "prisma": "^4.8.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.2",
    "@types/chai": "^4.3.4",
    "@types/express": "^4.17.15",
    "@types/express-validator": "^3.0.0",
    "@types/jsonwebtoken": "^8.5.9",
    "@types/mocha": "^10.0.1",
    "@types/multer": "^1.4.7",
    "@types/multer-s3": "^3.0.0",
    "@types/node": "^18.11.17",
    "@types/supertest": "^2.0.12",
    "chai": "^4.3.7",
    "commitizen": "^4.2.6",
    "cz-conventional-changelog": "3.3.0",
    "cz-emoji-conventional": "^1.0.1",
    "husky": "^8.0.0",
    "mocha": "^10.2.0",
    "nodemon": "^2.0.20",
    "supertest": "^6.3.3",
    "ts-node": "^10.9.1",
    "typescript": "^4.9.4"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-emoji-conventional"
    }
  }
}

```

</aside>
<hr>
</br>

# 🏠 server architecture

![서버아키텍쳐](https://user-images.githubusercontent.com/88873302/212261508-c8a41c73-fb9a-4694-8c65-24cee545f311.jpg)
</aside>
<hr>
</br>

# 📁 Folder 구조

```jsx
📁 src
|_ 📁 config
|_ 📁 constant
|_ 📁 controller
|_ 📁 interface
|_ 📁 middleware
|_ 📁 module
|_ 📁 prisma
|_ 📁 router
|_ 📁 service
|_ index.ts

📁 test
```



</aside>
<hr>
</br>

# 💽 DB ERD



![image](https://user-images.githubusercontent.com/65851554/210541836-a70d8853-46e3-4103-81c1-258006343b7e.png)


</aside>
<hr>
</br>

# 📄 API(+ Non - API) Docs

![image](https://user-images.githubusercontent.com/88873302/212285411-c1f1aae2-78c7-4a92-bd7b-907a9c31ac03.png)
</aside>
<hr>
</br>


# 🙆‍♀️ 역할분담 & 구현 진척도

|담당자|담당 내용|구현 진척도|
|:---|:---|:---|
|유수화|EC2, publicCourse & stamp 관련 api|100%|
|전선희|RDS, course & user 관련 api|100%|
|박수린|S3, record & scrap 관련 api|100%|

</aside>
<hr>
</br>

# 🗣️️ 컨벤션

> 💡 **동료들과 말투를 통일하기 위해 컨벤션을 지정합니다.**
> 오합지졸의 코드가 아닌, **한 사람이 짠 것같은 코드**를 작성하는 것이 추후 유지보수나 협업에서 도움이 됩니다. 내가 코드를 생각하면서 짤 수 있도록 해주는 룰이라고 생각해도 좋습니다!

## 👩‍💻 Coding Conventions

<details>
<summary>명명규칙(Naming Conventions)</summary>
<div markdown="1">

1. 이름으로부터 의도가 읽혀질 수 있게 쓴다.

- ex)

  ```jsx
  // bad
  function q() {
    // ...stuff...
  }

  // good
  function query() {
    // ..stuff..
  }
  ```

2. 오브젝트, 함수, 그리고 인스턴스에는 `camelCase`를 사용한다.

- ex)

  ```jsx
  // bad
  const OBJEcttsssss = {};
  const this_is_my_object = {};
  function c() {}

  // good
  const thisIsMyObject = {};
  function thisIsMyFunction() {}
  ```

3. 클래스나 constructor에는 `PascalCase`를 사용한다.

- ex)

  ```jsx
  // bad
  function user(options) {
    this.name = options.name;
  }

  const bad = new user({
    name: "nope",
  });

  // good
  class User {
    constructor(options) {
      this.name = options.name;
    }
  }

  const good = new User({
    name: "yup",
  });
  ```

4. 함수 이름은 동사 + 명사 형태로 작성한다.
   ex) `postUserInformation( )`
5. 약어 사용은 최대한 지양한다.
6. 이름에 네 단어 이상이 들어가면 팀원과 상의를 거친 후 사용한다
   </div>
   </details>

<details>
<summary>블록(Blocks)</summary>
<div markdown="1">

1. 복수행의 블록에는 중괄호({})를 사용한다.

- ex)

  ```jsx
  // bad
  if (test)
    return false;

  // good
  if (test) return false;

  // good
  if (test) {
    return false;
  }

  // bad
  function() { return false; }

  // good
  function() {
    return false;
  }

  ```

2. 복수행 블록의 `if` 와 `else` 를 이용하는 경우 `else` 는 `if` 블록 끝의 중괄호( } )와 같은 행에 위치시킨다.

- ex)
  `java // bad if (test) { thing1(); thing2(); } else { thing3(); } // good if (test) { thing1(); thing2(); } else { thing3(); }`
  </div>
  </details>

<details>
<summary>코멘트(Comments)</summary>
<div markdown="1">

1. 복수형의 코멘트는 `/** ... */` 를 사용한다.

- ex)

  ```jsx
  // good
  /**
   * @param {String} tag
   * @return {Element} element
   */
  function make(tag) {
    // ...stuff...

    return element;
  }
  ```

2. 단일 행의 코멘트에는 `//` 을 사용하고 코멘트를 추가하고 싶은 코드의 상부에 배치한다. 그리고 코멘트의 앞에 빈 행을 넣는다.

- ex)
  `jsx // bad const active = true; // is current tab // good // is current tab const active = true; // good function getType() { console.log('fetching type...'); // set the default type to 'no type' const type = this._type || 'no type'; return type; }`
  </div>
  </details>

<details>
<summary>문자열(Strings)</summary>
<div markdown="1">

1. 문자열에는 싱크쿼트 `''` 를 사용한다.

- ex)

  ```jsx
  // bad
  const name = "Capt. Janeway";

  // good
  const name = "Capt. Janeway";
  ```

2. 프로그램에서 문자열을 생성하는 경우는 문자열 연결이 아닌 `template strings`를 이용한다.

- ex)
  `` jsx // bad function sayHi(name) { return 'How are you, ' + name + '?'; } // bad function sayHi(name) { return ['How are you, ', name, '?'].join(); } // good function sayHi(name) { return `How are you, ${name}?`; } ``
  </div>
  </details>

<details>
<summary>함수(Functions)</summary>
<div markdown="1">

1. 화살표 함수를 사용한다.

- ex)

  ```jsx
  var arr1 = [1, 2, 3];
  var pow1 = arr.map(function(x) {
    // ES5 Not Good
    return x * x;
  });

  const arr2 = [1, 2, 3];
  const pow2 = arr.map((x) => x * x); // ES6 Good
  ```

</div>
</details>

<details>
<summary>조건식과 등가식(Comparison Operators & Equality)</summary>
<div markdown="1">

1. `==` 이나 `!=` 보다 `===` 와 `!==` 을 사용한다.
2. 단축형을 사용한다.

- ex)

  ```jsx
  // bad
  if (name !== "") {
    // ...stuff...
  }

  // good
  if (name) {
    // ...stuff...
  }
  ```

3. 비동기 함수를 사용할 때 `Promise`함수의 사용은 지양하고 `async`, `await`를 쓰도록 한다
   </div>
   </details>

<hr>
</br>

## 🌳 Branch

🌱 git branch 전략

`main branch` : 배포 단위 branch

`dev branch` : 주요 개발 branch, main merge 전 거치는 branch

`feat branch`: 각자 개발 branch

- 할 일 issue 등록 후 issue 번호와 isuue 이름으로 branch 생성 후 작업
  - ex) feat/#`issue num`-`isuue name(기능요약)`
- 해당 branch 작업 완료 후 PR 보내기
  - 항상 local에서 충돌 해결 후 → remote에 올리기
  - reviewer에 서로 tag후 code-review
  - comment 전 merge 불가!
  - review반영 후, 본인이 merge.

### branch 구조

```jsx
- main
- dev
- feat
   ├── #1-isuue name1
   └── #2-isuue name2
```

</aside>
<hr>
</br>

## 🧵 Commit Convention

<aside>
📍  git commit message convention

`ex) feat(변경한 파일) : 변경 내용 (/#issue num)`

```plain
- ✨ feat:      새로운 기능 구현
- 🐛 fix:       버그, 오류 해결
- 🧹 chore:     src 또는 test 파일을 수정하지 않는 기타 변경 사항 ( 새로운 파일 생성, 파일 이동, 이름 변경 등 )
- ♻️ refactor:  버그 수정이나 기능 추가가 없는 코드 변경 ( 코드 구조 변경 등의 리팩토링 )
- 💎 style:     코드의 의미에 영향을 미치지 않는 변경 사항 ( 코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음 )
- 🏗️ build:    빌드 시스템 또는 외부에 영향을 미치는 변경 사항 종속성 ( 라이브러리 추가 등 )
- 📈 perf:      성능을 향상 시키기 위한 코드 변경
- 🧪 test:      테스트 추가 또는 이전 테스트 수정
- 📝 docs:      README나 WIKI 등의 문서 개정
- ⏪️ revert:    이전 커밋을 되돌리는 경우
- 📦 ci:      CI 구성 파일 및 스크립트 변경
- Merge: 다른브렌치를 merge하는 경우
- Init : Initial commit을 하는 경우
```
