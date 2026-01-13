// 首字母大写
first_word_upper = function (x) {
    return x.replace(x[0], x[0].toUpperCase());
}
// 关键字每段首字母大写
key_to_upper = function (key_string) {
    return key_string.split('-').map((x) => { return first_word_upper(x) }).join('-');
}
// json转换为字符串
jsonify = function (text_json) {
    if (Object.getOwnPropertyNames(text_json).length==0){
        return '';
    }
    result = '{\n';
    for(key in text_json){
        val = text_json[key];
        sign = val.indexOf("'") >= 0 ? '"' : "'";
        result += `    '${key}': ${sign}${val}${sign},\n`;
    }
    return result + '}';
}
// 解析 Cookie 字符串（支持 -b 参数和 -H 'Cookie:' 格式）
parse_cookie_string = function (cookie_string) {
    var cookies = {};
    if (!cookie_string || cookie_string.trim() === '') {
        return cookies;
    }
    var Cookie = cookie_string.replace("\\'", "'");
    Cookie.split("; ").forEach(element => {
        var elements = element.split('=');
        if (elements.length >= 2) {
            cookies[elements[0]] = elements.slice(1).join('=');
        }
    });
    return cookies;
}

code_model_1 = function(mode,url,method,headers,cookies,data,post_mode){
    text_code = '';
    text_code += 'from requests import session\n';
    text_code += 's = session()\n';
    text_code += `headers = ${headers}\n`;
    if(cookies!=''){
        text_code += `cookies = ${cookies}\n`;
    }
    if(method=='post'){
        text_code += data!='' ? `data = ${data}\n` : '';
    }
    text_code += 's.headers.update(headers)\n';
    if(cookies!=''){
        text_code += 's.cookies.update(cookies)\n';
    }
    if(method=='post'){
        if(data!=''){
            text_code += `res = s.post('${url}', ${post_mode}=data)\n`;
        }else{
            text_code += `res = s.post('${url}')\n`;
        }
    }else{
        text_code += `res = s.get('${url}')\n`;
    }
    text_code += 'print(res.text)\n';
    return text_code;
}
code_model_json_mongo = function(mode,url,method,headers,cookies,data,post_mode){
    text_code = '';
    text_code += 'from requests import session\n';
    text_code += 'from pymongo import MongoClient\n';
    text_code += 'import pandas as pd\n';
    text_code += `client = MongoClient('mongo://localhost:27017')\n`;
    text_code += `col = client['<dbName>']['<colName>']\n`;
    text_code += 's = session()\n';
    text_code += `headers = ${headers}\n`;
    if(cookies!=''){
        text_code += `cookies = ${cookies}\n`;
    }
    if(method=='post'){
        text_code += data!='' ? `data = ${data}\n` : '';
    }
    text_code += 's.headers.update(headers)\n';
    if(cookies!=''){
        text_code += 's.cookies.update(cookies)\n';
    }
    if(method=='post'){
        if(data!=''){
            text_code += `res = s.post('${url}', ${post_mode}=data)\n`;
        }else{
            text_code += `res = s.post('${url}')\n`;
        }
    }else{
        text_code += `res = s.get('${url}')\n`;
    }
    text_code += 'res_json = res.json()\n';
    text_code += 'results = res_json[<data_json_path>]\n';
    text_code += 'col.insert_many(results)\n';
    text_code += 'client.close()\n';
    return text_code;
}
code_model_json_csv = function(mode,url,method,headers,cookies,data,post_mode){
    text_code = '';
    text_code += 'from requests import session\n';
    text_code += 'import pandas as pd\n';
    text_code += 's = session()\n';
    text_code += `headers = ${headers}\n`;
    if(cookies!=''){
        text_code += `cookies = ${cookies}\n`;
    }
    if(method=='post'){
        text_code += data!='' ? `data = ${data}\n` : '';
    }
    text_code += 's.headers.update(headers)\n';
    if(cookies!=''){
        text_code += 's.cookies.update(cookies)\n';
    }
    if(method=='post'){
        if(data!=''){
            text_code += `res = s.post('${url}', ${post_mode}=data)\n`;
        }else{
            text_code += `res = s.post('${url}')\n`;
        }
    }else{
        text_code += `res = s.get('${url}')\n`;
    }
    text_code += 'res_json = res.json()\n';
    text_code += 'results = res_json[<data_json_path>]\n';
    text_code += 'dt = pd.DataFrame(results)\n';
    text_code += `dt.to_csv("./results_${new Date().getTime()}.csv")\n`;
    return text_code;
}

code_model_json_mysql = function(mode,url,method,headers,cookies,data,post_mode){
    return '正在开发中...'
}

code_model_json_mongo_page = function(mode,url,method,headers,cookies,data,post_mode){
    text_code = '';
    text_code += 'from requests import session\n';
    text_code += 'from pymongo import MongoClient\n';
    text_code += 'from time import sleep\n';
    text_code += 'import pandas as pd\n';
    text_code += `client = MongoClient('mongodb://localhost:27017')\n`;
    text_code += `col = client['<dbName>']['<colName>']\n`;
    text_code += 's = session()\n';
    text_code += `headers = ${headers}\n`;
    if(cookies!=''){
        text_code += `cookies = ${cookies}\n`;
    }
    if(method=='post'){
        text_code += data!='' ? `data = ${data}\n` : '';
    }
    text_code += 's.headers.update(headers)\n';
    if(cookies!=''){
        text_code += 's.cookies.update(cookies)\n';
    }
    text_code += 'for i in range(1,<page>):\n'
    if(method=='post'){
        if(data!=''){
            text_code += `    data['<pageIndex>'] = str(i)\n`
            text_code += `    res = s.post('${url}', ${post_mode}=data)\n`;
        }else{
            text_code += `    res = s.post('${url}')\n`;
        }
    }else{
        text_code += `    res = s.get(f'${url}')\n`;
    }
    text_code += '    res_json = res.json()\n';
    text_code += '    results = res_json[<data_json_path>]\n';
    text_code += `    print(results)\n`;
    text_code += '    col.insert_many(results)\n';
    text_code += '    sleep(1)\n';
    text_code += `client.close()\n`;
    return text_code;
}

code_model_json_csv_page = function(mode,url,method,headers,cookies,data,post_mode){
    text_code = '';
    text_code += 'from requests import session\n';
    text_code += 'import pandas as pd\n';
    text_code += 'from time import sleep\n';
    text_code += 's = session()\n';
    text_code += `headers = ${headers}\n`;
    if(cookies!=''){
        text_code += `cookies = ${cookies}\n`;
    }
    if(method=='post'){
        text_code += data!='' ? `data = ${data}\n` : '';
    }
    text_code += 's.headers.update(headers)\n';
    if(cookies!=''){
        text_code += 's.cookies.update(cookies)\n';
    }
    text_code += 'results = []\n'
    text_code += 'for i in range(1,<page>):\n'
    if(method=='post'){
        if(data!=''){
            text_code += `    data['<pageIndex>'] = str(i)\n`
            text_code += `    res = s.post('${url}', ${post_mode}=data)\n`;
        }else{
            text_code += `    res = s.post('${url}')\n`;
        }
    }else{
        text_code += `    url = '<pageIndexUrl>'\n`;
        text_code += `    res = s.get(url)\n`;
    }
    text_code += '    res_json = res.json()\n';
    text_code += '    result = res_json[<data_json_path>]\n';
    text_code += '    print(result)\n';
    text_code += '    results.extend(result)\n';
    text_code += '    sleep(1)\n';
    text_code += 'dt = pd.DataFrame(results)\n';
    text_code += `dt.to_csv("./results_${new Date().getTime()}.csv")\n`;
    return text_code;
}
code_model_xpath_mongo = function(mode,url,method,headers,cookies,data,post_mode){
    text_code = '';
    text_code += 'from requests import session\n';
    text_code += 'from pymongo import MongoClient\n';
    text_code += 'from lxml import etree\n';
    text_code += `client = MongoClient('mongodb://localhost:27017')\n`;
    text_code += `col = client['<dbName>']['<colName>']\n`;
    text_code += 's = session()\n';
    text_code += `headers = ${headers}\n`;
    if(cookies!=''){
        text_code += `cookies = ${cookies}\n`;
    }
    if(method=='post'){
        text_code += data!='' ? `data = ${data}\n` : '';
    }
    text_code += 's.headers.update(headers)\n';
    if(cookies!=''){
        text_code += 's.cookies.update(cookies)\n';
    }
    if(method=='post'){
        if(data!=''){
            text_code += `res = s.post('${url}', ${post_mode}=data)\n`;
        }else{
            text_code += `res = s.post('${url}')\n`;
        }
    }else{
        text_code += `res = s.get('${url}')\n`;
    }
    text_code += 'html = etree.HTML(res.text)\n';
    text_code += `nodes = html.xpath('.//<xpath>')\n`;
    text_code += `for node in nodes:\n`;
    text_code += `    dic = {}\n`;
    text_code += `    dic['<name>'] = node.xpath('string(.//<xpath>)')\n`;
    text_code += `    print(dic)\n`;
    text_code += `    col.insert_one(dic)\n`;
    text_code += 'client.close()\n';
    return text_code;
}

code_model_xpath_csv = function(mode,url,method,headers,cookies,data,post_mode){
    text_code = '';
    text_code += 'from requests import session\n';
    text_code += 'import pandas as pd\n';
    text_code += 'from lxml import etree\n';
    text_code += 's = session()\n';
    text_code += `headers = ${headers}\n`;
    if(cookies!=''){
        text_code += `cookies = ${cookies}\n`;
    }
    if(method=='post'){
        text_code += data!='' ? `data = ${data}\n` : '';
    }
    text_code += 's.headers.update(headers)\n';
    if(cookies!=''){
        text_code += 's.cookies.update(cookies)\n';
    }
    if(method=='post'){
        if(data!=''){
            text_code += `res = s.post('${url}', ${post_mode}=data)\n`;
        }else{
            text_code += `res = s.post('${url}')\n`;
        }
    }else{
        text_code += `res = s.get('${url}')\n`;
    }
    text_code += 'results = []\n'
    text_code += 'html = etree.HTML(res.text)\n';
    text_code += `nodes = html.xpath('.//<xpath>')\n`;
    text_code += `for node in nodes:\n`;
    text_code += `    dic = {}\n`;
    text_code += `    dic['<name>'] = node.xpath('string(.//<xpath>)')\n`;
    text_code += `    print(dic)\n`;
    text_code += `    results.append(dic)\n`;
    text_code += 'dt = pd.DataFrame(results)\n';
    text_code += `dt.to_csv("./results_${new Date().getTime()}.csv")\n`;
    return text_code;
}

code_model_xpath_mysql = function(mode,url,method,headers,cookies,data,post_mode){
    return '正在开发中...'
}
code_model_xpath_csv_page = function(mode,url,method,headers,cookies,data,post_mode){
    text_code = '';
    text_code += 'from requests import session\n';
    text_code += 'import pandas as pd\n';
    text_code += 'from time import sleep\n';
    text_code += 'from lxml import etree\n';
    text_code += 's = session()\n';
    text_code += `headers = ${headers}\n`;
    if(cookies!=''){
        text_code += `cookies = ${cookies}\n`;
    }
    if(method=='post'){
        text_code += data!='' ? `data = ${data}\n` : '';
    }
    text_code += 's.headers.update(headers)\n';
    if(cookies!=''){
        text_code += 's.cookies.update(cookies)\n';
    }
    text_code += 'results = []\n'
    text_code += 'for i in range(1,<page>):\n'
    if(method=='post'){
        if(data!=''){
            text_code += `    data['<pageIndex>'] = str(i)\n`
            text_code += `    res = s.post('${url}', ${post_mode}=data)\n`;
        }else{
            text_code += `    res = s.post('${url}')\n`;
        }
    }else{
        text_code += `    url = '<pageIndexUrl>'\n`;
        text_code += `    res = s.get(url)\n`;
    }
    text_code += '    html = etree.HTML(res.text)\n';
    text_code += `    nodes = html.xpath('.//<xpath>')\n`;
    text_code += `    for node in nodes:\n`;
    text_code += `        dic = {}\n`;
    text_code += `        dic['<name>'] = node.xpath('string(.//<xpath>)')\n`;
    text_code += `        print(dic)\n`;
    text_code += `        results.append(dic)\n`;
    text_code += '    sleep(1)\n';
    text_code += 'dt = pd.DataFrame(results)\n';
    text_code += `dt.to_csv("./results_${new Date().getTime()}.csv")\n`;
    return text_code;
}
code_model_xpath_mysql_page = function(mode,url,method,headers,cookies,data,post_mode){
    return `正在开发中...`
}
code_generate = function(mode,url,method,headers,cookies,data,post_mode){
    switch (mode) {
        case "json & mongo":
            return code_model_json_mongo(mode,url,method,headers,cookies,data,post_mode);
        case "json & csv":
            return code_model_json_csv(mode,url,method,headers,cookies,data,post_mode);
        case "json & mysql":
            return code_model_json_mysql(mode,url,method,headers,cookies,data,post_mode);
        case "json & mongo & 翻页":
            return code_model_json_mongo_page(mode,url,method,headers,cookies,data,post_mode);
        case "json & csv & 翻页":
            return code_model_json_csv_page(mode,url,method,headers,cookies,data,post_mode);
        case "xpath & mongo":
            return code_model_xpath_mongo(mode,url,method,headers,cookies,data,post_mode);
        case "xpath & csv":
            return code_model_xpath_csv(mode,url,method,headers,cookies,data,post_mode);
        case "xpath & mysql":
            return code_model_xpath_mysql(mode,url,method,headers,cookies,data,post_mode);
        case "xpath & csv & 翻页":
            return code_model_xpath_csv_page(mode,url,method,headers,cookies,data,post_mode);
        case "xpath & mysql & 翻页":
            return code_model_xpath_mysql_page(mode,url,method,headers,cookies,data,post_mode);
        default:
            return code_model_1(mode,url,method,headers,cookies,data,post_mode);
    }
}

const user_agent_list = [
    {
        name: 'chrome_windows',
        name_show: 'Windows Chrome',
        ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
    },
    {
        name: 'firefox_windows',
        name_show: 'Windows Firefox',
        ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0'
    },
    {
        name: 'wechat_android',
        name_show: 'Android Wechat',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B329 MicroMessenger/5.0.1'
    },
    {
        name: 'Safari',
        name_show: 'iPhone Safari',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
    },
    {
        name: 'Safari',
        name_show: 'Mac Safari',
        ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
    }
]
const code_mode_list = [
    {
        name: 'json & mongo'
    },
    {
        name: 'json & csv'
    },
    {
        name: 'json & mysql'
    },
    {
        name: 'json & mongo & 翻页'
    },
    {
        name: 'json & csv & 翻页'
    },
    {
        name: 'xpath & mongo'
    },
    {
        name: 'xpath & csv'
    },
    {
        name: 'xpath & mysql'
    },
    {
        name: 'xpath & csv & 翻页'
    },
    {
        name: 'xpath & mysql & 翻页'
    },
]

 

