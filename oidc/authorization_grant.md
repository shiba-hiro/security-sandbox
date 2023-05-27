# 認可フローいろいろ


基本の基本
https://www.rfc-editor.org/rfc/rfc6749.html

- Authorization Code
- Implicit
- Resource Owner Password Credentials
- Client Credentials

https://www.authlete.com/resources/videos/oauth2-flows/


JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication and Authorization Grants
https://www.rfc-editor.org/rfc/rfc7523.html

https://www.rfc-editor.org/rfc/rfc7522.html
https://www.rfc-editor.org/rfc/rfc7521.html

## OAuth

OAuth 2.0では、以下のような認可フローが定義されています。

1. Authorization Code Flow (認可コードフロー): ウェブアプリケーションやモバイルアプリケーション向けの主要な認可フローです。クライアントアプリケーションがサーバーサイドで動作し、認可コードを取得して、それを使ってアクセストークンを取得します。

2. Implicit Flow (インプリシットフロー): クライアントが直接トークンを取得するためのフローです。ウェブブラウザを使用したシングルページアプリケーション（SPA）やモバイルアプリケーション向けに設計されています。

3. Resource Owner Password Credentials Flow (パスワードフロー): クライアントが直接リソースオーナーの資格情報（ユーザー名とパスワード）を使用してアクセストークンを取得するフローです。セキュリティ上の理由から推奨されていない場合があります。

4. Client Credentials Flow (クライアントクレデンシャルフロー): クライアント自体がリソースオーナーではなく、自身の資格情報を使用してアクセストークンを取得するフローです。主にバックエンドサービス間の通信に使用されます。

5. Device Authorization Flow (デバイス認証フロー): 制限されたデバイス上での認証フローです。特に入力機能の限られたデバイス（テレビ、IoTデバイスなど）で使用されます。

これらの認可フローは、異なるシナリオやクライアントタイプに応じて使用され、セキュリティとユーザーエクスペリエンスのバランスを取るために適切なフローを選択することが重要です。



## OpenID Connect

OpenID Connectでは、OAuth 2.0の認可フローに加えて、以下の認可フローが追加されています。

1. Authorization Code Flow (認可コードフロー): OAuth 2.0のAuthorization Code Flowと同様のフローで、認可コードを取得し、トークンエンドポイントを介してアクセストークンとIDトークンを取得します。

2. Implicit Flow (インプリシットフロー): OAuth 2.0のImplicit Flowと同様のフローで、リソースオーナーに対して認可コードを発行せずに、直接アクセストークンとIDトークンを取得します。

3. Hybrid Flow (ハイブリッドフロー): 認可コードフローとインプリシットフローを組み合わせたフローで、アクセストークンとIDトークンの両方を取得することができます。

4. Client Credentials Flow (クライアントクレデンシャルフロー): クライアントが自身のクレデンシャルを使用してアクセストークンを取得するフローで、ユーザーの関与なしに行われます。主にクライアントがバックエンドリソースにアクセスするために使用されます。

これらの認可フローは、OpenID Connectにおける認証と認可の要件に対応するために使用されます。それぞれのフローは、セキュリティ要件やクライアントの性質に基づいて選択されるべきです。



## Memo

README.md で試したのが、 Authorization Code Flow で、一番知れ渡っているやり方。  
ServiceAccount のくだりで試したのが、 Client Credentials Flow 。

### Google API で使っている方法 ~ JWT Authorization Grant

https://developers.google.com/identity/protocols/oauth2/service-account?hl=ja
「承認済み API 呼び出しの準備」の HTTP/REST がわかりやすい。これが OAuth に則った token の交換と利用。  
ServiceAccount に紐付けた公開鍵秘密鍵のペアを作成し、 API ユーザー側は秘密鍵を用いて署名付き JWT (header に署名方法、claim に scope などを記述)を作成して token と交換する。  
「追加条項: OAuth を使用しないサービス アカウントの承認」では、 token 交換を経由せずに、署名付き JWT を直接 Authorization: Bearer の値に指定する方法も紹介されている。これはフローがシンプルになるなぁ。


「grant_type	必要に応じて、URL エンコードされた文字列 urn:ietf:params:oauth:grant-type:jwt-bearer を使用します。」


GCP のやつ、これだ・・・
https://www.authlete.com/ja/developers/jwt_authorization_grant/
「認可グラントとしての JWT は、認可コードフロー (RFC 6749 Section 4.1) の認可コードと同じ概念です。」

「認可グラントとしての JWT が誰によってどのように生成されるかに関する詳細を RFC 7523 では定義していません。従って、JWT の署名を検証するのに用いる鍵の入手方法が仕様では定義されていません。」


Authlete や GCP のは、 2.1 Using JWTs as Authorization Grants に従っていて、 Keycloak は 2.2.  Using JWTs for Client Authentication に従っているのか。
すっきりした。。。

https://www.rfc-editor.org/rfc/rfc7523.html


keycloak での話はこちら
https://qiita.com/rawr/items/5fde71da850c1f65373a#resource-owner-password-credentials%E7%B7%A8
https://qiita.com/t-mogi/items/2728586959f16849443f
https://www.keycloak.org/docs/latest/securing_apps/#client-authentication-with-signed-jwt



