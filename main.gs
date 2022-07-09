/** @OnlyCurrentDoc */
var url = 'https://mt-auto-minhon-mlt.ucri.jgn-x.jp';       // 基底URL (https://xxx.jpまでを入力)
var url_oauth = '/oauth2/token.php';
var key = '';                                               // API key
var secret = '';                                            // API secret
var name = '';                                              // ログインID

var api_name  = 'mt';                                       // API名 (https://xxx.jp/api/mt/generalNT_ja_en/ の場合は、"mt")
var api_param = 'minnaPE_en_ja';                            // API値 (https://xxx.jp/api/mt/generalNT_ja_en/ の場合は、"generalNT_ja_en")


// oauth2
var token_data = {
  'grant_type': 'client_credentials',
  'client_id': key,                             // API Key
  'client_secret': secret,                      // API secret
  'urlAccessToken': url + url_oauth   // アクセストークン取得URI
};

var options = {
  'method' : 'post',
  'contentType': 'application/json',
  'payload' : JSON.stringify(token_data)
};

var oauth2 = JSON.parse(UrlFetchApp.fetch(url + url_oauth, options).getContentText())
var access_token = oauth2.access_token;

// 翻訳本体
function minhon(text) {
  var response_data = {
    'key': key,                   // API Key
    'api_name': api_name,
    'api_param': api_param,
    'name': name,                 // ログインID
    'type': 'json',               // レスポンスタイプ
    'text': text
  };
  
  var parameter = 'access_token=' + access_token
  for (key in response_data){parameter += '&' + key + '=' + response_data[key]}

  var options = {
    'method' : 'get',
    'contentType': 'application/json',
  };
  var response = UrlFetchApp.fetch(url + '/api/?' + parameter);
  var json = response.getContentText(); 
  var data = JSON.parse(json); 
  var result = data.resultset.result.text;
  return(result);
}
