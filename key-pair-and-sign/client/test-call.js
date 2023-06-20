const jwt = require('jsonwebtoken');
const request = require('request');

// サーバーから秘密鍵を取得
request('http://localhost:19080/private_key', (error, response, privateKey) => {
  if (error) {
    console.error('秘密鍵の取得に失敗しました:', error);
    return;
  }

  const kid = response.headers["key-id"];
  console.log(`秘密鍵の取得に成功しました: ${kid}`);

  console.log(privateKey);

  // ペイロードの作成
  const payload = {
    user: 'john_doe',
    role: 'admin'
  };

  // JWTの生成
  const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', header: { kid }});

  // JWTをGoサーバーに送信
  request.post('http://localhost:19080/verify_token', { form: { token } }, (error, response, body) => {
    if (error) {
      console.error('トークンの送信に失敗しました:', error);
      return;
    }
    console.log('検証結果:', body);
  });
});
