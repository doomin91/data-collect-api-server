# Node.js 데이터 수집기 From DataServer, Csv File

### 실행 방법
가장 중요한 실행방법입니다.
1) npm run dev 실행 or npm run build 후 npm run start
2) http://localhost:3000/api-docs 로 접속합니다.

### 프로젝트 구조와 설계 전반
확장성 측면에서는 MSA 개발 방식이 도움이 된다고 판단하였습니다.

위 설명과 같이 전체적인 설계는 각 api 폴더 내에 모듈을 추가하는 방식으로 서버를 추가 할 수 있습니다.
기본적인 트랜잭션 정보에 대한 RestAPI는 `transaction` 모듈
CSV 파일을 Database로 저장하는 모듈은 `csv` 모듈
MockupServer(4001, 4002)로부터 JSON 데이터를 받아 Database에 저장하는 모듈은 `server` 모듈
총 3가지로 구분지어 모듈을 생성하였습니다.

api 모듈의 구성은 아래와 같습니다. 
component.ts - MVC패턴 방식 기준 controller 역할을 합니다. 기본적인 로직 구현을 해당 파일에서 진행합니다.
service.ts - Database Qurey 진행 전 데이터를 정제하는 로직이 구현되는 파일입니다.
dao.ts - Database의 직접적인 생성 및 쿼리 등을 구현합니다.
route.ts - api 경로를 설정해줄 수 있습니다.
interface/*.ts - 데이터 모델을 저장하는 폴더입니다.
schema.yaml - swagger와 연동되며, 각 모듈마다 존재합니다. 각 모듈별로 저장 시 메인 API 게이트웨이를 통해 노출됩니다.

libs 폴더 내의 구성은 아래와 같습니다.
databse.ts - sqlite3와 연동하는 부분입니다.
scheduler.ts - node-scheduler를 통해 스케쥴러 로직이 구현되는 부분입니다.
success.ts - 모든 response form을 통일된 데이터로 전달하기 위해 구현된 부분입니다.
swagger.ts - swagger 관련된 설정을 모아둔 파일입니다.

시작 파일은 server.ts입니다.

### API Specifications
http(s)://{server_ip}/api-docs 에서 API 명세서를 확인 할 수 있습니다.
예) http://localhost/api-docs

API 명세서는 Postman과 같은 강력한 툴을 사용하더라도 매 번 수동으로 갱신한다는 일이 쉽지 않습니다.

이에 Swagger와 같은 자동 문서화가 되는 라이브러리를 사용하여 매 번 최신화된 명세서를 전달하려고 합니다.
현재 프로젝트는 MSA 개발 방식을 따르고 있어, schema와 route를 하나의 폴더에 넣고 개발하는 것보다는
api 내의 각 모듈별로 schema를 가지는게 좋겠다고 판단하였습니다.

모듈 내에 schema.ymal를 swagger 형식에 맞게 입력하면 자동으로 문서화가 되는 개념으로 진행했습니다.
