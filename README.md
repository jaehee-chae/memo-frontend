# 채재희의 자기소개와 러닝 메모장

클라우드 컴퓨팅 과제로 제작한 개인 소개 페이지입니다.
프론트엔드는 Vercel, FastAPI 백엔드는 Render에 배포했습니다.

## 자기소개

- 이름: 채재희
- 직장: KB국민카드
- 취미: 러닝
- 2026년 풀마라톤 완주
- 닮은 동물: 쿼카
- 새로운 것을 배우기, 코딩 추가

소개 페이지에 AI로 생성한 러닝 쿼카 이미지를 사용했습니다.


## 주요 기능

- 개인 소개와 쿼카 이미지 표시
- FastAPI를 통한 메모 조회, 추가, 삭제
- API 요청 실패 시 오류 메시지 표시로 변경

## 주요 구성

- 프론트엔드: React, Vite, HTML, CSS, JavaScript
- 백엔드: Python, FastAPI, Uvicorn
- 배포: Vercel, Render
- 코드 관리: GitHub

프론트엔드의 src/App.jsx에서 fetch로 Render API를 호출합니다.
백엔드는 main.py에서 요청을 처리하고 JSON으로 응답합니다.
CORS 설정으로 Vercel 홈페이지의 API 접근을 허용했습니다.

## 배포 주소

- 홈페이지: https://memo-frontend-orpin.vercel.app
- 백엔드: https://memo-backend-tlq1.onrender.com
- Swagger UI: https://memo-backend-tlq1.onrender.com/docs

## 소스 코드

프론트엔드와 백엔드는 별도 저장소에서 관리합니다.

- 프론트엔드: https://github.com/jaehee-chae/memo-frontend
- 백엔드: https://github.com/jaehee-chae/memo-backend

## API

| 요청 방식 | 경로 | 기능 |
| --- | --- | --- |
| GET | /memos | 메모 목록 조회 |
| POST | /memos | 메모 추가 |
| DELETE | /memos/{memo_id} | 메모 삭제 |

## 실행 방법

프론트엔드 폴더에서:
npm install
npm run dev

백엔드 폴더에서:
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload

현재 프론트엔드의 API_URL은 Render 서버 주소로 설정되어 있습니다.
로컬 백엔드를 사용하려면 http://localhost:8000으로 변경합니다.

## 참고 사항

메모는 서버 메모리에 저장됩니다.
서버가 재시작되면 기존 메모는 사라집니다.