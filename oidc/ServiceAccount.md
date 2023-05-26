# Keycloak ServiceAccount


https://k-ota.dev/keycloak-oidc-guide/

https://wjw465150.gitbooks.io/keycloak-documentation/content/server_admin/topics/clients/oidc/service-accounts.html

Follow README and create `sample-app-client`.

After updating `Access Type` to `confidential`, enable the feature by toggling `Service Account Enabled`.

Check `Service Account User` exists from `Service Account Roles` tab in the client.

Request like this.
`oCSz1fbYYTzhTIn0fr0KypoPWEqWNzwv` is client secret you can see in `Credentials` tab in the client.
```sh
curl -X POST \
  -d "grant_type=client_credentials&client_id=sample-app-client&client_secret=oCSz1fbYYTzhTIn0fr0KypoPWEqWNzwv" \
  http://localhost:11080/auth/realms/sample-realm/protocol/openid-connect/token
```

Response is like;
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJleWNRTEZaUzFHZUtrc3Rzc3VaSGIwYUxDZjU3SVFRbktickNJTTgtaDhVIn0.eyJleHAiOjE2ODUwMDQyMzEsImlhdCI6MTY4NTAwMzkzMSwianRpIjoiNWFmYTUyYzYtODQzOC00YjgzLWIyYzEtNjRlODZhMWZmMTFhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoxMTA4MC9hdXRoL3JlYWxtcy9zYW1wbGUtcmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZWUzODMwNmUtNjNhZi00MzNhLTg3YmMtMzdlYjliZTM4MmIyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2FtcGxlLWFwcC1jbGllbnQiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtc2FtcGxlLXJlYWxtIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjE5Mi4xNjguMTQ0LjEiLCJjbGllbnRJZCI6InNhbXBsZS1hcHAtY2xpZW50IiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LXNhbXBsZS1hcHAtY2xpZW50IiwiY2xpZW50QWRkcmVzcyI6IjE5Mi4xNjguMTQ0LjEifQ.TfXy37F7gscMMBG1MoaRaAFwV1DvXiWJ9b3s4-MyieqSrNyRltXgau3u0xyCdA5mjZccOdVDZBwQciJh1OAY63nV_WXssgjmqSdT3pQYBAX8HTKCPe7luZOkOet8sS8mxtOZw8jNDF1BPGPaG1W7a8CzXEb96IQ2SPThaQ9IeqJk_WyTVlyFSd2Z_o_rvdcI7D9DgJqLJ48GquJ2d3iylBZuk8LWAti1QiQz4J9KkPO9awQPcMYzxrPYP3pENbbhnbdixUXNwwDv2pLNSnzvz1T8cJFFHC8yiHKg9Bt3YlMxoRHQFXolA49-yfdlhT7WeDCwYPNVZUhUbb941rmdmw",
  "expires_in": 300,
  "refresh_expires_in": 0,
  "token_type": "Bearer",
  "not-before-policy": 0,
  "scope": "email profile"
}
```

Use token like this;
```sh
curl -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJleWNRTEZaUzFHZUtrc3Rzc3VaSGIwYUxDZjU3SVFRbktickNJTTgtaDhVIn0.eyJleHAiOjE2ODUwMDQyMzEsImlhdCI6MTY4NTAwMzkzMSwianRpIjoiNWFmYTUyYzYtODQzOC00YjgzLWIyYzEtNjRlODZhMWZmMTFhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoxMTA4MC9hdXRoL3JlYWxtcy9zYW1wbGUtcmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZWUzODMwNmUtNjNhZi00MzNhLTg3YmMtMzdlYjliZTM4MmIyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2FtcGxlLWFwcC1jbGllbnQiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtc2FtcGxlLXJlYWxtIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjE5Mi4xNjguMTQ0LjEiLCJjbGllbnRJZCI6InNhbXBsZS1hcHAtY2xpZW50IiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LXNhbXBsZS1hcHAtY2xpZW50IiwiY2xpZW50QWRkcmVzcyI6IjE5Mi4xNjguMTQ0LjEifQ.TfXy37F7gscMMBG1MoaRaAFwV1DvXiWJ9b3s4-MyieqSrNyRltXgau3u0xyCdA5mjZccOdVDZBwQciJh1OAY63nV_WXssgjmqSdT3pQYBAX8HTKCPe7luZOkOet8sS8mxtOZw8jNDF1BPGPaG1W7a8CzXEb96IQ2SPThaQ9IeqJk_WyTVlyFSd2Z_o_rvdcI7D9DgJqLJ48GquJ2d3iylBZuk8LWAti1QiQz4J9KkPO9awQPcMYzxrPYP3pENbbhnbdixUXNwwDv2pLNSnzvz1T8cJFFHC8yiHKg9Bt3YlMxoRHQFXolA49-yfdlhT7WeDCwYPNVZUhUbb941rmdmw" \
  http://localhost:11080/auth/realms/sample-realm/protocol/openid-connect/userinfo
```

Response is like;
```json
{
  "sub": "ee38306e-63af-433a-87bc-37eb9be382b2",
  "email_verified": false,
  "preferred_username": "service-account-sample-app-client"
}
```

`http://localhost:11080/auth/realms/sample-realm/protocol/openid-connect/token` は Token 発行のための URL で、 README においても grant_type=code で利用した。  
Keycloak においては、 Client が何であるか？という点だけで認証できてしまう。かつ、 Service Account も、 Client にひとつしか持てないのかな。  
`Sessions` tab も、何も表示されないが、これは仕様らしい。設定で変えられる見込み。  
https://github.com/keycloak/keycloak/discussions/10537  
https://groups.google.com/g/keycloak-user/c/XDB6VTHGAuQ/m/_84pimx7CwAJ?pli=1

```
yes this is expected, as this was changed in Keycloak 11.0.x. As the OAuth 2.0 RFC6749 section 4.4. Client Credentials Grant sub section 4.4.3 states that a refresh_token should not be generated when client_credentials grant is used. 
If this is off then no refresh_token will be generated and the associated user session will be removed."

In earlier Keycloak releases a token request with grant_type=client_credentials always created a user-session and a corresponding Refresh-Token, 
which could lead to excessive user-session creation if the refresh-token was not used properly.

You can enable the old behaviour via:
Admin-Console -> Clients -> Client Configuration -> OpenID Connect Compatibility Modes
"Use Refresh Tokens For Client Credentials Grant": on (default off)

The tooltip says: "If this is on, a refresh_token will be created and added to the token response if the client_credentials grant is used.
```

「サーバー間アプリケーションに OAuth 2.0 を使用する  |  Authorization  |  Google for Developers」
https://developers.google.com/identity/protocols/oauth2/service-account?hl=ja
「承認済み API 呼び出しの準備」の HTTP/REST がわかりやすい。これが OAuth に則った token の交換と利用。
ServiceAccount に紐付けた公開鍵秘密鍵のペアを作成し、 API ユーザー側は秘密鍵を用いて署名付き JWT (header に署名方法、claim に scope などを記述)を作成して token と交換する。
「追加条項: OAuth を使用しないサービス アカウントの承認」では、 token 交換を経由せずに、署名付き JWT を直接 Authorization: Bearer の値に指定する方法も紹介されている。これはフローがシンプルになるなぁ。




Confirm access token.
```sh
npm install -g jwt-cli

/home/shiba-hiro/.nvm/versions/node/v18.16.0/bin/jwt eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJleWNRTEZaUzFHZUtrc3Rzc3VaSGIwYUxDZjU3SVFRbktickNJTTgtaDhVIn0.eyJleHAiOjE2ODUwMDQyMzEsImlhdCI6MTY4NTAwMzkzMSwianRpIjoiNWFmYTUyYzYtODQzOC00YjgzLWIyYzEtNjRlODZhMWZmMTFhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoxMTA4MC9hdXRoL3JlYWxtcy9zYW1wbGUtcmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZWUzODMwNmUtNjNhZi00MzNhLTg3YmMtMzdlYjliZTM4MmIyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2FtcGxlLWFwcC1jbGllbnQiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtc2FtcGxlLXJlYWxtIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjE5Mi4xNjguMTQ0LjEiLCJjbGllbnRJZCI6InNhbXBsZS1hcHAtY2xpZW50IiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LXNhbXBsZS1hcHAtY2xpZW50IiwiY2xpZW50QWRkcmVzcyI6IjE5Mi4xNjguMTQ0LjEifQ.TfXy37F7gscMMBG1MoaRaAFwV1DvXiWJ9b3s4-MyieqSrNyRltXgau3u0xyCdA5mjZccOdVDZBwQciJh1OAY63nV_WXssgjmqSdT3pQYBAX8HTKCPe7luZOkOet8sS8mxtOZw8jNDF1BPGPaG1W7a8CzXEb96IQ2SPThaQ9IeqJk_WyTVlyFSd2Z_o_rvdcI7D9DgJqLJ48GquJ2d3iylBZuk8LWAti1QiQz4J9KkPO9awQPcMYzxrPYP3pENbbhnbdixUXNwwDv2pLNSnzvz1T8cJFFHC8yiHKg9Bt3YlMxoRHQFXolA49-yfdlhT7WeDCwYPNVZUhUbb941rmdmw --output=json

```

```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT",
    "kid": "eycQLFZS1GeKkstssuZHb0aLCf57IQQnKbrCIM8-h8U"
  },
  "payload": {
    "exp": 1685004231,
    "iat": 1685003931,
    "jti": "5afa52c6-8438-4b83-b2c1-64e86a1ff11a",
    "iss": "http://localhost:11080/auth/realms/sample-realm",
    "aud": "account",
    "sub": "ee38306e-63af-433a-87bc-37eb9be382b2",
    "typ": "Bearer",
    "azp": "sample-app-client",
    "acr": "1",
    "realm_access": {
      "roles": [
        "default-roles-sample-realm",
        "offline_access",
        "uma_authorization"
      ]
    },
    "resource_access": {
      "account": {
        "roles": [
          "manage-account",
          "manage-account-links",
          "view-profile"
        ]
      }
    },
    "scope": "email profile",
    "email_verified": false,
    "clientHost": "192.168.144.1",
    "clientId": "sample-app-client",
    "preferred_username": "service-account-sample-app-client",
    "clientAddress": "192.168.144.1"
  },
  "signature": "TfXy37F7gscMMBG1MoaRaAFwV1DvXiWJ9b3s4-MyieqSrNyRltXgau3u0xyCdA5mjZccOdVDZBwQciJh1OAY63nV_WXssgjmqSdT3pQYBAX8HTKCPe7luZOkOet8sS8mxtOZw8jNDF1BPGPaG1W7a8CzXEb96IQ2SPThaQ9IeqJk_WyTVlyFSd2Z_o_rvdcI7D9DgJqLJ48GquJ2d3iylBZuk8LWAti1QiQz4J9KkPO9awQPcMYzxrPYP3pENbbhnbdixUXNwwDv2pLNSnzvz1T8cJFFHC8yiHKg9Bt3YlMxoRHQFXolA49-yfdlhT7WeDCwYPNVZUhUbb941rmdmw",
  "input": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJleWNRTEZaUzFHZUtrc3Rzc3VaSGIwYUxDZjU3SVFRbktickNJTTgtaDhVIn0.eyJleHAiOjE2ODUwMDQyMzEsImlhdCI6MTY4NTAwMzkzMSwianRpIjoiNWFmYTUyYzYtODQzOC00YjgzLWIyYzEtNjRlODZhMWZmMTFhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoxMTA4MC9hdXRoL3JlYWxtcy9zYW1wbGUtcmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZWUzODMwNmUtNjNhZi00MzNhLTg3YmMtMzdlYjliZTM4MmIyIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2FtcGxlLWFwcC1jbGllbnQiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtc2FtcGxlLXJlYWxtIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SG9zdCI6IjE5Mi4xNjguMTQ0LjEiLCJjbGllbnRJZCI6InNhbXBsZS1hcHAtY2xpZW50IiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LXNhbXBsZS1hcHAtY2xpZW50IiwiY2xpZW50QWRkcmVzcyI6IjE5Mi4xNjguMTQ0LjEifQ"
}
```

公開鍵の居場所のたどり方。
まずは OpenID Provider の情報を取得して、 `jwks_uri` を探す。
http://localhost:11080/auth/realms/sample-realm/.well-known/openid-configuration

ヒットした URL （たとえば下記）へアクセスする。
http://localhost:11080/auth/realms/sample-realm/protocol/openid-connect/certs

```json
{
    "keys": [
        {
            "alg": "RS256",
            "e": "AQAB",
            "kid": "eycQLFZS1GeKkstssuZHb0aLCf57IQQnKbrCIM8-h8U",
            "kty": "RSA",
            "n": "ivgr_6uTTdhJZv7m8VG525a48sfl0XxBBcHq9dkNGUyoiZrD-AWTJACYYjEl7iYITImOln3VlpX2brg2cddScVbJhT4c5x2IW9WE5QkuBFieOHTsQZrh0geXiusjD3TNo_AnlK7opcxAcKTAv8aWnuqgF7c26fWa_x-_kcOIhe0jiiPzWNvvFrIxdGtb0u0GJtMVGakpxJh-FYNJnfMZQj1_P90FUCVg2ZEvw3lX9zlFGjO36v-Qhv6wfeTffoAuX93A14HCQ7Rfu5eUlMqfeWOCjWDC4hUr61dgFzLJfelW5NWzmxtH6mOpi5Q0ukWPCxcniqlYEU99d1HjMlA3Pw",
            "use": "sig",
            "x5c": [
                "MIICpzCCAY8CBgGIUfyVtzANBgkqhkiG9w0BAQsFADAXMRUwEwYDVQQDDAxzYW1wbGUtcmVhbG0wHhcNMjMwNTI1MDgxNjI3WhcNMzMwNTI1MDgxODA3WjAXMRUwEwYDVQQDDAxzYW1wbGUtcmVhbG0wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCK+Cv/q5NN2Elm/ubxUbnblrjyx+XRfEEFwer12Q0ZTKiJmsP4BZMkAJhiMSXuJghMiY6WfdWWlfZuuDZx11JxVsmFPhznHYhb1YTlCS4EWJ44dOxBmuHSB5eK6yMPdM2j8CeUruilzEBwpMC/xpae6qAXtzbp9Zr/H7+Rw4iF7SOKI/NY2+8WsjF0a1vS7QYm0xUZqSnEmH4Vg0md8xlCPX8/3QVQJWDZkS/DeVf3OUUaM7fq/5CG/rB95N9+gC5f3cDXgcJDtF+7l5SUyp95Y4KNYMLiFSvrV2AXMsl96Vbk1bObG0fqY6mLlDS6RY8LFyeKqVgRT313UeMyUDc/AgMBAAEwDQYJKoZIhvcNAQELBQADggEBACIL+dvkvdzXbvtNElAtlbpDHRvKX2NGga8ZARFMF8ZLnnvkyC+5oWJrMKyBFzNdPQzXigzcV72dCF56MnoVmRmTjGnxAGN5ZJiCUoRuqqi1+b0xB6E0I7BU9X03IiUrfqeBdLgQ4lZeMnkAJZ/P4MZ2nkAZBCgRkc5pofC4CN4M9lG2VxWVbmpq0y5ZJ7aMiQGV5Bg9I1ZNEw2ExoHhz0xriL7Ebb3/rQHS1IIZ9mYJQcPsj15uMdoUrik2AmWedsxitQKBVogw2bzzyglaKo6vIKSi2oYWQWyJnIVIm2Ro9fRCBmE/xY35N6Kfj78XrJauHLGfXmuWNoUGSnhvtGs="
            ],
            "x5t": "ho9njKlrFb8qJuLw30Ovjs0xVss",
            "x5t#S256": "LVmmeciEx48eBgpAwmmGfanTHmyyo9nWoAp5_G44TR0"
        },
        {
            "alg": "RSA-OAEP",
            "e": "AQAB",
            "kid": "jyNvLuw2-OwvsiZwTKwkpu2Yu3ypZeL03e3lEXmvlEY",
            "kty": "RSA",
            "n": "kzx5d5miFEYCi1Zj7nVz6-bgu75t4NpSwjjcYdKUI0BlRvxPWYweSF-IFUHJLPd796AFeTIEu_D2LpIFndVVwvbLNXvE1N5NjfhbhukgqxmpgjdMExowplFXaeUYE26sFMok0fl_Gzur69WjljiRjyS2wpOyQEbFinXWYuVJhcVNu6LOVkKcSzIINkBjFXd1bBA49glZQqx7t6RY5W54grO3GXa9ud6iSKjhf3Cek2FAKS6DQXif53qlDVPyzwo1drdODw3LGK9F3Ub-Cx27TU1LDLuvPPWn1CLMUk2NPo7whfNvq5BRhgqZSVqDj8YZbloPsM3VcVxiQplRYJDSCw",
            "use": "enc",
            "x5c": [
                "MIICpzCCAY8CBgGIUfyWLjANBgkqhkiG9w0BAQsFADAXMRUwEwYDVQQDDAxzYW1wbGUtcmVhbG0wHhcNMjMwNTI1MDgxNjI4WhcNMzMwNTI1MDgxODA4WjAXMRUwEwYDVQQDDAxzYW1wbGUtcmVhbG0wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCTPHl3maIURgKLVmPudXPr5uC7vm3g2lLCONxh0pQjQGVG/E9ZjB5IX4gVQcks93v3oAV5MgS78PYukgWd1VXC9ss1e8TU3k2N+FuG6SCrGamCN0wTGjCmUVdp5RgTbqwUyiTR+X8bO6vr1aOWOJGPJLbCk7JARsWKddZi5UmFxU27os5WQpxLMgg2QGMVd3VsEDj2CVlCrHu3pFjlbniCs7cZdr253qJIqOF/cJ6TYUApLoNBeJ/neqUNU/LPCjV2t04PDcsYr0XdRv4LHbtNTUsMu6889afUIsxSTY0+jvCF82+rkFGGCplJWoOPxhluWg+wzdVxXGJCmVFgkNILAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAGlQQoA32cKvzGrtgwfYgP+u2383OyDuY0L79oIaHsxmUxx5xGo3aMCsloF5mfcq1dgpDlzQjsFFtt/+RwQ341jZYbSoI49Sm6ocJWE5pFIJkpnvjihA4Bkl1NHXOISokyq1T6u3RyzTj3YBiGoPgcd35uBDQF1wlg2PwY3gSuXQrZNd80C+ai6bfxCcg7NiIml+Xr0FY900kdKO9HOmi7jDCHTQ5GP93B5k1KWx8yO3jk7dkUY79lIpWW4pmIuTLVJw8WTjD396uEjKa/3qpKMLAtXvBKuOQmrKwNYB29EEIYJxuMZnz2CUoFSOOg6JYUF0xx9cMMy4WzYQ1Ky7bZQ="
            ],
            "x5t": "3VYFidfAsvHBgTRM7OWxD0E9tuM",
            "x5t#S256": "_anav1OlmroG3clSkQnmHMG0_ptf9O2BxP3qwx4xAgg"
        }
    ]
}
```

(by Chat GPT)
```
Keycloakの`/protocol/openid-connect/certs`エンドポイントから取得できる情報は、JSON Web Key Set (JWKS) フォーマットで提供されます。JWKSは、公開鍵のセットを表すために使用される標準的な形式です。

各パラメータの意味は以下の通りです:

- "alg" (Algorithm): JWTの署名アルゴリズムを示します。例えば、"RS256"はRSA-SHA256を表します。
- "e" (Exponent): RSA公開鍵の指数を表します。
- "kid" (Key ID): 公開鍵を一意に識別するためのキーIDです。キーの管理や特定の鍵を使用する場合に利用されます。
- "kty" (Key Type): 使用されている公開鍵のタイプを示します。一般的な値は"RSA"や"EC"です。
- "n" (Modulus): RSA公開鍵のモジュラスを表します。
- "use" (Key Use): 公開鍵の使用目的を示します。一般的な値は"sig" (signature)や"enc" (encryption)です。
- "x5c" (X.509 Certificate Chain): X.509証明書のチェーンを表します。公開鍵の形式がX.509証明書である場合に提供されます。
- "x5t" (X.509 Certificate Thumbprint): X.509証明書のサムプリントを表します。公開鍵の識別や一意性のために使用されます。
- "x5t#S256" (X.509 Certificate SHA-256 Thumbprint): X.509証明書のSHA-256ハッシュ値を表します。公開鍵の識別や一意性のために使用されます。

これらの情報は、JWTの署名の検証やJWTの生成時に使用する公開鍵を特定するために利用されます。公開鍵の詳細情報を取得し、適切な形式に変換して使用することで、JWTの検証や署名の生成が可能となります。
```

Modulus と Exponent から公開鍵を生成。
```sh
cd playground
node ./pub-key-exporter.js

# TOKEN 環境変数を渡すと、 JWT の検証も可能。
```
```
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAivgr/6uTTdhJZv7m8VG525a48sfl0XxBBcHq9dkNGUyoiZrD+AWT
JACYYjEl7iYITImOln3VlpX2brg2cddScVbJhT4c5x2IW9WE5QkuBFieOHTsQZrh
0geXiusjD3TNo/AnlK7opcxAcKTAv8aWnuqgF7c26fWa/x+/kcOIhe0jiiPzWNvv
FrIxdGtb0u0GJtMVGakpxJh+FYNJnfMZQj1/P90FUCVg2ZEvw3lX9zlFGjO36v+Q
hv6wfeTffoAuX93A14HCQ7Rfu5eUlMqfeWOCjWDC4hUr61dgFzLJfelW5NWzmxtH
6mOpi5Q0ukWPCxcniqlYEU99d1HjMlA3PwIDAQAB
-----END RSA PUBLIC KEY-----
```


JWT の claim VS payload (by ChatGPT)
```
JWT（JSON Web Token）において、claimとpayloadは異なる概念を表しています。

Claimは、JWT内に含まれる情報の要素を表します。Claimはキーと値のペアで構成され、ユーザー情報やトークンの有効期限などの様々な属性を表現します。例えば、ユーザーのID、発行者、有効期限、トークンの用途などがClaimとして表現されます。Claimは、JWTのpayload内に含まれています。

Payloadは、JWTの中に実際のデータを格納する部分を指します。JWTのpayloadはBase64エンコードされたJSON形式の文字列であり、Claimを含む他の任意のデータも格納できます。JWTのpayloadには、ユーザーの属性情報やその他のメタデータなどが含まれます。payloadは、JWTの中で実際のデータを保持する役割を果たしています。

つまり、ClaimはJWT内のデータの要素（キーと値）を表し、payloadは実際のデータ（Claimを含む）を格納する部分を指します。Claimはpayloadの一部であり、JWTの構造化された情報を表現するために使用されます。
```


これで出てくる公開鍵は、何用なんだろう。
=> 見たところ、 access_token に使われた kid の key の modulus および exponent から作成される public key に似ているが、冒頭に `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A` という文字列が余分に入っている。
```
http://localhost:11080/auth/realms/sample-realm
```
```json
{
    "account-service": "http://localhost:11080/auth/realms/sample-realm/account",
    "public_key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAivgr/6uTTdhJZv7m8VG525a48sfl0XxBBcHq9dkNGUyoiZrD+AWTJACYYjEl7iYITImOln3VlpX2brg2cddScVbJhT4c5x2IW9WE5QkuBFieOHTsQZrh0geXiusjD3TNo/AnlK7opcxAcKTAv8aWnuqgF7c26fWa/x+/kcOIhe0jiiPzWNvvFrIxdGtb0u0GJtMVGakpxJh+FYNJnfMZQj1/P90FUCVg2ZEvw3lX9zlFGjO36v+Qhv6wfeTffoAuX93A14HCQ7Rfu5eUlMqfeWOCjWDC4hUr61dgFzLJfelW5NWzmxtH6mOpi5Q0ukWPCxcniqlYEU99d1HjMlA3PwIDAQAB",
    "realm": "sample-realm",
    "token-service": "http://localhost:11080/auth/realms/sample-realm/protocol/openid-connect",
    "tokens-not-before": 0
}
```
