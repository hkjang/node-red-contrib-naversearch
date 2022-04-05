node-red-contrib-naversearch
================

Node-RED node for naversearch



## Install

To install the stable version use the `Menu - Manage palette - Install`
option and search for node-red-contrib-naversearch, or run the following
command in your Node-RED user directory, typically `~/.node-red`

    npm install node-red-contrib-naversearch

## Wrapper naver search  API  
- https://developers.naver.com/docs/serviceapi/search/blog/blog.md

## Sample parameters
```js

msg.url = 'https://openapi.naver.com/v1/search/search.json';

msg.params = {};
msg.params.query = '테스트'; //#검색어
msg.params.display = "10" // #출력 검색 수
msg.params.sort = 'date' //#결과값의 정렬기준 시간순 date, 관련도 순 sim
msg.params.start = "1" //# 출력 위치

return msg;

```
## Sample flows
```json

```
