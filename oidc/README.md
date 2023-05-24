

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

update `Access Type` to `confidential` in the client

node client secret key from `Credentials` tab in the client
e.g. 04GQ8IVcjAiFwOGSjorTje6TrTgH9Y67

create `sample` user and set password as `sample` in the realm


open http://localhost:11080/auth/realms/sample-realm/protocol/openid-connect/auth?client_id=sample-app-client&response_type=code&redirect_uri=http://localhost:11030&scope=openid


note `code`
e.g. b6077f2b-8ee9-4f7a-a423-0014586eca21.11bbd7b8-1338-44ab-8b78-8a78c4f47a97.7af01101-851c-4311-955a-492dbef5c499


```sh
curl -d "grant_type=authorization_code&client_id=sample-app-client&client_secret=04GQ8IVcjAiFwOGSjorTje6TrTgH9Y67&code=b6077f2b-8ee9-4f7a-a423-0014586eca21.11bbd7b8-1338-44ab-8b78-8a78c4f47a97.7af01101-851c-4311-955a-492dbef5c499&redirect_uri=http://localhost:11030" http://localhost:11080/auth/realms/sample-realm/protocol/openid-connect/token
```
response is like this;

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJNU0ZUdXFicGdyZENZRzhmVnhlVmcyYmZWa01DSngzZkdCbXZ4Z0Y1ejBZIn0.eyJleHAiOjE2ODQzMzU0MjAsImlhdCI6MTY4NDMzNTEyMCwiYXV0aF90aW1lIjoxNjg0MzM0OTIwLCJqdGkiOiJlMWJlYzUxNS1lYzU1LTQzYTktYTljZi1kNWJhN2I3MGZkMjgiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjExMDgwL2F1dGgvcmVhbG1zL3NhbXBsZS1yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJkZTIyOWE2Yy0zZGIwLTQ2OTktYWJkNS02YWM2YjQxOWVkMTgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzYW1wbGUtYXBwLWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiIxMWJiZDdiOC0xMzM4LTQ0YWItOGI3OC04YTc4YzRmNDdhOTciLCJhY3IiOiIwIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtc2FtcGxlLXJlYWxtIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiIxMWJiZDdiOC0xMzM4LTQ0YWItOGI3OC04YTc4YzRmNDdhOTciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6InNhbXBsZSJ9.Tuor1s9kED4uGVzb5WAuQ8K6EbP_B2N-K9GEPGFRuaPfQhsc7E0E1LhlywBfIHAWFJSPJ3ZheCA4uP75J5Er-rsCf4JLPSSreqBCQML3ZAHUjoGQezNXH9oRMx-7SIKhvuolaeuY1OeH-NMhRtje6wR-Bo7KGl1DbpyKGlEPEWPeI4nzAJgltl6zxZjFZfuavmvh0eoJEYSSN7ty-OdejdtqMeeHg4LizyvV4t0Mqmx3uuoIdNEtOlNOmm7W4ScCOS2u6rKupyScB4emvZULGbLqkYmgRkTuuJ0KfdDkczigTDJLOhxx_R4Rjph11exA2SOlUGMmZKlC7k4CYIeP9g",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhMTg0MjYzMS0yMzNkLTQ1YTEtOGRiMi0yZDhmYzFiMjg1OWYifQ.eyJleHAiOjE2ODQzMzY5MjAsImlhdCI6MTY4NDMzNTEyMCwianRpIjoiZWUxM2RlMTgtYWRlMi00YzBjLWE0NjAtYzBmMTM0MDVmNDY4IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoxMTA4MC9hdXRoL3JlYWxtcy9zYW1wbGUtcmVhbG0iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjExMDgwL2F1dGgvcmVhbG1zL3NhbXBsZS1yZWFsbSIsInN1YiI6ImRlMjI5YTZjLTNkYjAtNDY5OS1hYmQ1LTZhYzZiNDE5ZWQxOCIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJzYW1wbGUtYXBwLWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiIxMWJiZDdiOC0xMzM4LTQ0YWItOGI3OC04YTc4YzRmNDdhOTciLCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwic2lkIjoiMTFiYmQ3YjgtMTMzOC00NGFiLThiNzgtOGE3OGM0ZjQ3YTk3In0.D8jJ3a9WLmgAmmhjJW6l2Qm2RFkh1K-gpvrcFRUIhyA",
  "token_type": "Bearer",
  "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJNU0ZUdXFicGdyZENZRzhmVnhlVmcyYmZWa01DSngzZkdCbXZ4Z0Y1ejBZIn0.eyJleHAiOjE2ODQzMzU0MjAsImlhdCI6MTY4NDMzNTEyMCwiYXV0aF90aW1lIjoxNjg0MzM0OTIwLCJqdGkiOiI1Njk0ZGRmZC1jMDc2LTQwOTMtOWU0Yy04MDU0YTBjNjBjZmIiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjExMDgwL2F1dGgvcmVhbG1zL3NhbXBsZS1yZWFsbSIsImF1ZCI6InNhbXBsZS1hcHAtY2xpZW50Iiwic3ViIjoiZGUyMjlhNmMtM2RiMC00Njk5LWFiZDUtNmFjNmI0MTllZDE4IiwidHlwIjoiSUQiLCJhenAiOiJzYW1wbGUtYXBwLWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiIxMWJiZDdiOC0xMzM4LTQ0YWItOGI3OC04YTc4YzRmNDdhOTciLCJhdF9oYXNoIjoiaHY0X3dqWlhQcDhseEhKT21PbmppQSIsImFjciI6IjAiLCJzaWQiOiIxMWJiZDdiOC0xMzM4LTQ0YWItOGI3OC04YTc4YzRmNDdhOTciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6InNhbXBsZSJ9.FnUeTj7PWc0lWYQo1pVyjyPwgFcK3jet_sj_xpfMg52gDtcabLxVMr0Z6reM_kxcj8_uujsjyYK4T-X65DNxz04rHg7_ZaIHmkCiyl_x0atj-C3HoibU8CnYZjSIEcT_7rhAF5Bq9RyCjsUbnqjrurFRZGr3DQMUg0RwgheHZ9EmNUdiLj9-z2es7lS0rUgHU9iF7oS2lPZD0xVc4Mrl-zDQKV3t7qWh_mfyuCgnQf46y-4t_KNC67QlwIaibeclVig0prsTxLU_ct7qiirolgNA6RMQ1d5996rR1l96iyObYPqT12RHkD0JKICpacPxnZneRw12hiMvAJbH6-tSjQ",
  "not-before-policy": 0,
  "session_state": "11bbd7b8-1338-44ab-8b78-8a78c4f47a97",
  "scope": "openid email profile"
}
```

Use access token

```sh
curl -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJNU0ZUdXFicGdyZENZRzhmVnhlVmcyYmZWa01DSngzZkdCbXZ4Z0Y1ejBZIn0.eyJleHAiOjE2ODQzMzU0MjAsImlhdCI6MTY4NDMzNTEyMCwiYXV0aF90aW1lIjoxNjg0MzM0OTIwLCJqdGkiOiJlMWJlYzUxNS1lYzU1LTQzYTktYTljZi1kNWJhN2I3MGZkMjgiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjExMDgwL2F1dGgvcmVhbG1zL3NhbXBsZS1yZWFsbSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJkZTIyOWE2Yy0zZGIwLTQ2OTktYWJkNS02YWM2YjQxOWVkMTgiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJzYW1wbGUtYXBwLWNsaWVudCIsInNlc3Npb25fc3RhdGUiOiIxMWJiZDdiOC0xMzM4LTQ0YWItOGI3OC04YTc4YzRmNDdhOTciLCJhY3IiOiIwIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtc2FtcGxlLXJlYWxtIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiIxMWJiZDdiOC0xMzM4LTQ0YWItOGI3OC04YTc4YzRmNDdhOTciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6InNhbXBsZSJ9.Tuor1s9kED4uGVzb5WAuQ8K6EbP_B2N-K9GEPGFRuaPfQhsc7E0E1LhlywBfIHAWFJSPJ3ZheCA4uP75J5Er-rsCf4JLPSSreqBCQML3ZAHUjoGQezNXH9oRMx-7SIKhvuolaeuY1OeH-NMhRtje6wR-Bo7KGl1DbpyKGlEPEWPeI4nzAJgltl6zxZjFZfuavmvh0eoJEYSSN7ty-OdejdtqMeeHg4LizyvV4t0Mqmx3uuoIdNEtOlNOmm7W4ScCOS2u6rKupyScB4emvZULGbLqkYmgRkTuuJ0KfdDkczigTDJLOhxx_R4Rjph11exA2SOlUGMmZKlC7k4CYIeP9g" http://localhost:11080/auth/realms/sample-realm/protocol/openid-connect/userinfo
```

Response should be like this;

```json
{"sub":"de229a6c-3db0-4699-abd5-6ac6b419ed18","email_verified":false,"preferred_username":"sample"}
```

To confirm the access token is valid or not, token introspection endpoint can be used;

```sh
curl -X POST -d "client_id={client_id}&client_secret={client_secret}&token={access_token}" http://localhost:11080/auth/realms/sample-realm/protocol/openid-connect/token/introspect

```


```js
const issueToken = ({code, clientSecret}) => {
  const formBody = [];
  formBody.push(encodeURIComponent("grant_type") + "=" + encodeURIComponent("authorization_code"));
  formBody.push(encodeURIComponent("code") + "=" + encodeURIComponent(code));
  formBody.push(encodeURIComponent("client_id") + "=" + encodeURIComponent("sample-app-client"));
  formBody.push(encodeURIComponent("client_secret") + "=" + encodeURIComponent(clientSecret))
  formBody.push(encodeURIComponent("redirect_uri") + "=" + encodeURIComponent("http://localhost:11030"))
  fetch("http://localhost:11080/auth/realms/sample-realm/protocol/openid-connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formBody.join("&"),
  })
    .then(res => res.json())
    .then(json => { console.log(json); })
    .catch(error => { console.log(error); });
};

issueToken({
  code: "b6077f2b-8ee9-4f7a-a423-0014586eca21.11bbd7b8-1338-44ab-8b78-8a78c4f47a97.7af01101-851c-4311-955a-492dbef5c499",
  clientSecret: "04GQ8IVcjAiFwOGSjorTje6TrTgH9Y67"
});
```

configs.json is from http://localhost:11080/auth/realms/sample-realm/.well-known/openid-configuration


---


TODO: Update client app with backend that use this kind of flow
https://nextjs.org/docs/app/building-your-application/routing/router-handlers

https://qiita.com/t_okkan/items/3478191bbff888a54235

