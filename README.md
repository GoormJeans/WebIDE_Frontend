[![Deploy to Firebase Hosting on merge](https://github.com/GoormJeans/WebIDE_Frontend/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/GoormJeans/WebIDE_Frontend/actions/workflows/firebase-hosting-merge.yml)
# WebIDE_Frontend

### 🪄 프로젝트 개요
- Web IDE Frontend

### 📅 개발 기간:
- 2023/12/10 ~ 2023/12/22 

### ⚙️ 개발 환경
- **`React + TypeScript`**
- **`Codemirror`**
- **`MUI`**
- **`Tailwind CSS`**
- **`react-redux + redux-toolkit`**

### 담당 기능
- **김동진** : 마이 페이지 및 관리자 페이지 관련 UI/UX
- **송형근** : 에디터 페이지 및 채팅 관련 UI/UX
- **이강혁** : 홈 페이지 및 알고리즘 페이지 관련 UI/UX

### 커밋 메세지
커밋 메세지 형식은 다음과 같습니다.
> type(타입) : title(제목)<br/>
> body(본문, 생략 가능)<br/>
> Resolves : #issueNo, ...(해결한 이슈 , 생략 가능)<br/>
> See also : #issueNo, ...(참고 이슈, 생략 가능)<br/>

### 타입(Commit Type)

타입은 " 태그(tag) + 제목(subject) " 으로 구성되며, 태그는 영어로 쓰되, 첫 문자는 대문자 로 합니다.
"태그: 제목" 의 형태이며, ":" 뒤에 space 가 있음에 유의합니다.<br/>
```ex) Feat: buy album api (Feat 가 태그이고, buy album api 가 제목입니다.)```

#### 자주 사용하는 태그 종류
- Feat : 새로운 기능을 추가하는 경우
- Fix : 버그를 고친경우
- Docs : 문서를 수정한 경우
- Style : 코드 포맷 변경, 세미콜론 누락, 코드 수정이 없는경우
- Refactor : 코드 리펙토링
- Test : 테스트 코드. 리펙토링 테스트 코드를 추가했을 때
- Chore : 빌드 업무 수정, 패키지 매니저 수정
- Design : CSS 등 사용자가 UI 디자인을 변경했을 때
- Rename : 파일명(or 폴더명) 을 수정한 경우
- Remove : 코드(파일) 의 삭제가 있을 때. "Clean", "Eliminate" 를 사용하기도 함

#### 기타 태그 타입들
- Add : 코드나 테스트, 예제, 문서등의 추가 생성이 있는경우- Improve : 향상이 있는 경우. 호환성, 검증 기능, 접근성 등이 될수 있습니다.
- Implement : 코드가 추가된 정도보다 더 주목할만한 구현체를 완성시켰을 때
- Move : 코드의 이동이 있는경우
- Updated : 계정이나 버전 업데이트가 있을 때 사용. 주로 코드보다는 문서나, 리소스, 라이브러리등에 사용합니다.
- Comment : 필요한 주석 추가 및 변경

### 제목(Subject)

제목은 50자를 넘기지 않고, 대문자로 작성하며 마침표를 붙이지 않습니다.
제목은 과거형을 사용하지 않고, 명령조로 시작합니다.<br/>
```ex) 제목을 Fixed 가 아닌, Fix 로 작성합시다.```<br/>
```( 커밋메시지를 예를들어 Fix : "Modify album buy bug" 로 작성하기 )```

### 본문(Body)
선택사항입니다. (본문은 꼭 작성 안해도 됨)
부연설명이 필요하거나 커밋의 이유를 설명할 경우 작성해주면 됩니다.
본문 내용은 어떻게 변경했는지 보다, 무엇을 변경했는지 또는 왜 변경했는지 를 설명하도록 합시다.
제목과 구분되기 위해 공백 한 줄을 띄워서 작성해줍시다.

### 꼬리말(footer)
선택사항 (꼭 작성할 필요x)
issue tracker id 를 작성할 때 사용합니다.
#### 형식 : 꼬리말은 "유형: #이슈 번호" 형식으로 사용합니다.
issue tracker 유형은 다음 중 하나를 사용합니다.

- Fixes : 이슈 수정중 (아직 해결되지 않은 경우)
- Resolves : 이슈를 해결했을 때 사용
- Ref : 참고할 이슈가 있을 때 사용
- Related to : 해당 커밋에 관련된 이슈번호 (아직 해결되지 않은 경우)<br/>

```ex) Fixes: #45 Related to: #34, #23```
