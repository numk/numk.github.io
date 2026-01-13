# cp.github.io


Curl To Python

Curl 代码 转换成 Python 爬虫代码

新版本：Cookie 的 Header 字段， 改成 -b 参数

```bash

curl 'https://www.jianshu.com/' \
  -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'accept-language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6' \
  -H 'cache-control: max-age=0' \
  -b '_ga=GA1.2.946451841.1766997037; _ga_Y1EKTCT110=GS2.2.s1766997017$o1$g0$t1766997037$j60$l0$h0; Hm_lvt_0c0e9d9b1e7d617b3e6842e85b9fb068=1766997037,1768275063; HMACCOUNT=E94E13A64B927582; locale=zh-CN; signin_redirect=https%3A%2F%2Fwww.jianshu.com%2F; read_mode=day; default_font=font2; Hm_lpvt_0c0e9d9b1e7d617b3e6842e85b9fb068=1768275066; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2219b693b0f801218-077b638813122-26061a51-1440000-19b693b0f8116fe%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2219b693b0f801218-077b6388233122-26061a51-1440000-19b693b0f8116fe%22%7D' \
  -H 'if-none-match: W/"79398029d680ae855c3e5174ecf80dea"' \
  -H 'priority: u=0, i' \
  -H 'sec-ch-ua: "Microsoft Edge";v="143", "Chromium";v="143", "Not A(Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: document' \
  -H 'sec-fetch-mode: navigate' \
  -H 'sec-fetch-site: none' \
  -H 'sec-fetch-user: ?1' \
  -H 'upgrade-insecure-requests: 1' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'

  ```

旧版本

  ```bash

curl 'https://www.jianshu.com/' \
  -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'accept-language: zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6' \
  -H 'cache-control: max-age=0' \
  -H 'Cookie: _ga=GA1.2.946451841.1766997037; _ga_Y1EKTCT110=GS2.2.s1766997017$o1$g0$t1766997037$j60$l0$h0; Hm_lvt_0c0e9d9b1e7d617b3e6842e85b9fb068=1766997037,1768275063; HMACCOUNT=E94E13A64B927582; locale=zh-CN; signin_redirect=https%3A%2F%2Fwww.jianshu.com%2F; read_mode=day; default_font=font2; Hm_lpvt_0c0e9d9b1e7d617b3e6842e85b9fb068=1768275066; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2219b693b0f801218-077b638813122-26061a51-1440000-19b693b0f8116fe%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2219b693b0f801218-077b6388233122-26061a51-1440000-19b693b0f8116fe%22%7D' \
  -H 'if-none-match: W/"79398029d680ae855c3e5174ecf80dea"' \
  -H 'priority: u=0, i' \
  -H 'sec-ch-ua: "Microsoft Edge";v="143", "Chromium";v="143", "Not A(Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: document' \
  -H 'sec-fetch-mode: navigate' \
  -H 'sec-fetch-site: none' \
  -H 'sec-fetch-user: ?1' \
  -H 'upgrade-insecure-requests: 1' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'

  ```

