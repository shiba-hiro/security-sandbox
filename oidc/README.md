

```sh
docker compose up -d
```

```sh
cd client-app
yarn dev
```

open http://localhost:11080

login console as admin/admin

create `sample-realm` realm

create `sample-app-client` client in the realm

add `http://localhost:11030` to `Valid Redirect URIs` in the client

switch Capability config > Client authentication to On

note Client Secret in Credentials tab  
e.g. cZdWnBaJufy2EdBu93BrAbXSxDJPqa5F

create `sample` user and set password as `sample`, email as `sample@example.com` in the realm

open http://localhost:11080/realms/sample-realm/protocol/openid-connect/auth?client_id=sample-app-client&response_type=code&redirect_uri=http://localhost:11030&scope=openid

login with sample@example.com / sample

note `code` in the query parameters
e.g. a73a3364-019a-4871-87c1-0feb1bce3f08.77a51f2a-2af0-4816-8d3d-8593400fbca2.9f813127-400a-4860-a135-4462ca92f942


```sh
curl -d "grant_type=authorization_code&client_id=sample-app-client&client_secret=cZdWnBaJufy2EdBu93BrAbXSxDJPqa5F&code=a73a3364-019a-4871-87c1-0feb1bce3f08.77a51f2a-2af0-4816-8d3d-8593400fbca2.9f813127-400a-4860-a135-4462ca92f942&redirect_uri=http://localhost:11030" http://localhost:11080/realms/sample-realm/protocol/openid-connect/token
```
response is like this;

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2WDE3bTJobWhtQk9XMklPRG1ReUc0NllhUm5nRXRqTzVqN1JaUnlCMmJZIn0.eyJleHAiOjE3MTQ0MDEwOTEsImlhdCI6MTcxNDQwMDc5MSwiYXV0aF90aW1lIjoxNzE0NDAwNzM4LCJqdGkiOiJhYThjOGJmNS1hODU1LTQxODItYjg1OC0zMjM0OTdiYzQ5NzIiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjExMDgwL3JlYWxtcy9zYW1wbGUtcmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMTA0ODU4YTAtYjI3OC00NGMyLWFkYTgtMmUwYTRhNzYwOTRlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2FtcGxlLWFwcC1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNzdhNTFmMmEtMmFmMC00ODE2LThkM2QtODU5MzQwMGZiY2EyIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjExMDMwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXNhbXBsZS1yZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiNzdhNTFmMmEtMmFmMC00ODE2LThkM2QtODU5MzQwMGZiY2EyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiRiBMIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2FtcGxlIiwiZ2l2ZW5fbmFtZSI6IkYiLCJmYW1pbHlfbmFtZSI6IkwiLCJlbWFpbCI6InNhbXBsZUBleGFtcGxlLmNvbSJ9.CbDRxXliBx9In5-Mj-Yc_Jhe4l_HHOBfsUH8pNUPY-sxwUfjGqvZQb2DYZc6MVuUKCU7w7UIFSdA8-_LIXAFsZ4j71j6Z5nCO0WhEpgqPUv3or3OHvFWbOaeSEbW1ldLC8fg7Wz1KBGrRZhhK8BTtzPLWed_7fMyeGOTtcIMw5Wcq_FimJsDw-mom4jtxnI8c-Wf8xdhkHi9j2l9EAwW9hvZbGUtZmKSIe242hmWUz1hhFIkvBwD7GRvXet4f5OdyCP9To59VLL1jrrBAiRSymiZdzppyX1ktFdfJ2_7P27VA-7hFiSXU9hrY2b7W1NIdO5UFDBwJg1DZXBSD5FKuA",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzNDEwN2NjOS1jNmQxLTRmZTYtYTU3Ny0wNzQ4ZDk0ZjhkY2MifQ.eyJleHAiOjE3MTQ0MDI1OTEsImlhdCI6MTcxNDQwMDc5MSwianRpIjoiMjgzODY5YTEtMTQxYS00NmUwLWJmNzgtZjVlZGM2Y2M5NTZlIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoxMTA4MC9yZWFsbXMvc2FtcGxlLXJlYWxtIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDoxMTA4MC9yZWFsbXMvc2FtcGxlLXJlYWxtIiwic3ViIjoiMTA0ODU4YTAtYjI3OC00NGMyLWFkYTgtMmUwYTRhNzYwOTRlIiwidHlwIjoiUmVmcmVzaCIsImF6cCI6InNhbXBsZS1hcHAtY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6Ijc3YTUxZjJhLTJhZjAtNDgxNi04ZDNkLTg1OTM0MDBmYmNhMiIsInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI3N2E1MWYyYS0yYWYwLTQ4MTYtOGQzZC04NTkzNDAwZmJjYTIifQ.Cy7N4pTHgR9lIldXd7qphQZN1LYkBgpk5s2jKGg60BmZfw_SzfSNfrsd6sygInzqru_-7AOoHjjdwoK1K7PX_A",
  "token_type": "Bearer",
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2WDE3bTJobWhtQk9XMklPRG1ReUc0NllhUm5nRXRqTzVqN1JaUnlCMmJZIn0.eyJleHAiOjE3MTQ0MDEwOTEsImlhdCI6MTcxNDQwMDc5MSwiYXV0aF90aW1lIjoxNzE0NDAwNzM4LCJqdGkiOiI0MjZkNTNkZS04OTc0LTQ5ODAtODQ5My0yZDg4OTg2MGQxZWEiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjExMDgwL3JlYWxtcy9zYW1wbGUtcmVhbG0iLCJhdWQiOiJzYW1wbGUtYXBwLWNsaWVudCIsInN1YiI6IjEwNDg1OGEwLWIyNzgtNDRjMi1hZGE4LTJlMGE0YTc2MDk0ZSIsInR5cCI6IklEIiwiYXpwIjoic2FtcGxlLWFwcC1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNzdhNTFmMmEtMmFmMC00ODE2LThkM2QtODU5MzQwMGZiY2EyIiwiYXRfaGFzaCI6Ik5hTTF1VHRVUDVzdHhpdm1uajZwZ1EiLCJhY3IiOiIxIiwic2lkIjoiNzdhNTFmMmEtMmFmMC00ODE2LThkM2QtODU5MzQwMGZiY2EyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiRiBMIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2FtcGxlIiwiZ2l2ZW5fbmFtZSI6IkYiLCJmYW1pbHlfbmFtZSI6IkwiLCJlbWFpbCI6InNhbXBsZUBleGFtcGxlLmNvbSJ9.Y6RmX7hvytc58E4ZDTTPJNG90f6lambAjio2pHB3wSJ84lpwempTArJdAxs4UH1ybqoZvfhJW3-kp4ZS4pgYY-KV3VbjWuZ7ZrrpNpBcBy_kQQx8aDJmaW5-eMCMr_hY2YMvyiZAph84VGhPKQLiqXGUAppTS7hZRYFmRsosCgoZ4gl8Yk7L_MSEUtmGxPYg5onfGI7SeivPQFurKXHYziq7YjYNvVlQ9B5sgyGj1iggJ_iplnFH5QzOzKKzMbQBHRs_si9DslRrq3dxh-fTntLUp8dXZm7izIOnLFWJTrxnF1NuwVKHrcbmYN-b98OVwmaZgWCsjkLWtltHPXzbKA",
  "not-before-policy": 0,
  "session_state": "77a51f2a-2af0-4816-8d3d-8593400fbca2",
  "scope": "openid email profile"
}
```

Use access token

```sh
curl -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2WDE3bTJobWhtQk9XMklPRG1ReUc0NllhUm5nRXRqTzVqN1JaUnlCMmJZIn0.eyJleHAiOjE3MTQ0MDEwOTEsImlhdCI6MTcxNDQwMDc5MSwiYXV0aF90aW1lIjoxNzE0NDAwNzM4LCJqdGkiOiJhYThjOGJmNS1hODU1LTQxODItYjg1OC0zMjM0OTdiYzQ5NzIiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjExMDgwL3JlYWxtcy9zYW1wbGUtcmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMTA0ODU4YTAtYjI3OC00NGMyLWFkYTgtMmUwYTRhNzYwOTRlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2FtcGxlLWFwcC1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiNzdhNTFmMmEtMmFmMC00ODE2LThkM2QtODU5MzQwMGZiY2EyIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjExMDMwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXNhbXBsZS1yZWFsbSIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiNzdhNTFmMmEtMmFmMC00ODE2LThkM2QtODU5MzQwMGZiY2EyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiRiBMIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2FtcGxlIiwiZ2l2ZW5fbmFtZSI6IkYiLCJmYW1pbHlfbmFtZSI6IkwiLCJlbWFpbCI6InNhbXBsZUBleGFtcGxlLmNvbSJ9.CbDRxXliBx9In5-Mj-Yc_Jhe4l_HHOBfsUH8pNUPY-sxwUfjGqvZQb2DYZc6MVuUKCU7w7UIFSdA8-_LIXAFsZ4j71j6Z5nCO0WhEpgqPUv3or3OHvFWbOaeSEbW1ldLC8fg7Wz1KBGrRZhhK8BTtzPLWed_7fMyeGOTtcIMw5Wcq_FimJsDw-mom4jtxnI8c-Wf8xdhkHi9j2l9EAwW9hvZbGUtZmKSIe242hmWUz1hhFIkvBwD7GRvXet4f5OdyCP9To59VLL1jrrBAiRSymiZdzppyX1ktFdfJ2_7P27VA-7hFiSXU9hrY2b7W1NIdO5UFDBwJg1DZXBSD5FKuA" http://localhost:11080/realms/sample-realm/protocol/openid-connect/userinfo
```

Response should be like this;

```json
{
  "sub": "104858a0-b278-44c2-ada8-2e0a4a76094e",
  "email_verified": false,
  "name": "F L",
  "preferred_username": "sample",
  "given_name": "F",
  "family_name": "L",
  "email": "sample@example.com"
}
```

To confirm the access token is valid or not, token introspection endpoint can be used;

```sh
curl -X POST -d "client_id={client_id}&client_secret={client_secret}&token={access_token}" http://localhost:11080/realms/sample-realm/protocol/openid-connect/token/introspect
```

sample response;

```js
{
  "exp": 1714401091,
  "iat": 1714400791,
  "auth_time": 1714400738,
  "jti": "aa8c8bf5-a855-4182-b858-323497bc4972",
  "iss": "http://localhost:11080/realms/sample-realm",
  "aud": "account",
  "sub": "104858a0-b278-44c2-ada8-2e0a4a76094e",
  "typ": "Bearer",
  "azp": "sample-app-client",
  "session_state": "77a51f2a-2af0-4816-8d3d-8593400fbca2",
  "acr": "1",
  "allowed-origins": [
    "http://localhost:11030"
  ],
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
  "scope": "openid email profile",
  "sid": "77a51f2a-2af0-4816-8d3d-8593400fbca2",
  "email_verified": false,
  "name": "F L",
  "preferred_username": "sample",
  "given_name": "F",
  "family_name": "L",
  "email": "sample@example.com",
  "client_id": "sample-app-client",
  "username": "sample",
  "token_type": "Bearer",
  "active": true
}
```


There is a sample cmd to get `access_token` by `code` by Deno.

```sh
deno run -A ./utils/issue-token.ts --clientId=sample-app-client --clientSecret=cZdWnBaJufy2EdBu93BrAbXSxDJPqa5F --code=827316f2-1352-4543-b5eb-a667ad27a717.77a51f2a-2af0-4816-8d3d-8593400fbca2.9f813127-400a-4860-a135-4462ca92f942
```

configs.json is from http://localhost:11080/realms/sample-realm/.well-known/openid-configuration


---


TODO: Update client app with backend that use this kind of flow
https://nextjs.org/docs/app/building-your-application/routing/router-handlers

https://qiita.com/t_okkan/items/3478191bbff888a54235

