# datalab_backend
<h1> 해당 프로젝트는 라방바닷컴 백엔드 프로젝트입니다.</h1>
<h2> 실행은 다음의 순서로 명령어를 입력해주세요.
(vsc, git bash기준, node.js와 git설치가 필수입니다.) </h2>
  1. 해당 프로젝트 다운로드 : git clone https://github.com/kei781/datalab_backend/new/master?readme=1
  2. 의존성 패키지 설치 : npm i
  3. express서버 실행 : node app.js
  
<h2> 프로젝트 설명 </h2>
  1. 해당프로젝트는 https://datalab.labangba.com/recruit 의 데이터를 크롤링 합니다.
  2. 크롤링한 데이터를 https://github.com/kei781/datalab_front 프로젝트에 적합한 형태로 변환 후, http://localhost:8000/data의 라우팅으로 데이터를 반환합ㄴ디ㅏ.
  3. 반환 데이터(json)의 양식
  [
    {
      index: number,
      title: 'string',
      site: 'string',
      link: 'string',
      category: 'string',
      time: { date: 'string', hour: 'string' },
      views: number,
      sold: number,
      revenue: number,
      products: number
    }
  ]
