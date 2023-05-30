# Ory Hydra

https://github.com/ory/hydra

https://www.ory.sh/hydra/


Quickstart

https://www.ory.sh/docs/hydra/5min-tutorial

```sh
git clone https://github.com/ory/hydra.git

cd hydra

docker compose -f quickstart.yml up --build
```

```sh
client=$(docker compose -f ./quickstart.yml exec hydra hydra create client --endpoint http://127.0.0.1:4445/ --format json --grant-type client_credentials)

echo $client | jq -r '.client_id'
# => 6381877b-7ce1-4c4e-86a2-4cbba0a38dd9

echo $client | jq -r '.client_secret'
# => Ny5~PFF24mMVurxK8nYB71yNfE
```

```sh
docker compose -f ./quickstart.yml exec hydra \
  hydra perform client-credentials \
  --endpoint http://127.0.0.1:4444/ \
  --client-id 6381877b-7ce1-4c4e-86a2-4cbba0a38dd9 \
  --client-secret Ny5~PFF24mMVurxK8nYB71yNfE
```

```
ACCESS TOKEN	ory_at_dCKqcGlAw0pBH4g4YXAt97NRwr7yvta2R042It2M6zM.d2o-99E9BVueOl5N2oAGk56wS90VewTeHKDpzmpsfPU	
REFRESH TOKEN	<empty>												
ID TOKEN	<empty>												
EXPIRY		2023-05-29 09:38:13 +0000 UTC
```

```sh
docker compose -f ./quickstart.yml exec hydra \
  hydra introspect token \
  --format json-pretty \
  --endpoint http://127.0.0.1:4445/ \
  ory_at_dCKqcGlAw0pBH4g4YXAt97NRwr7yvta2R042It2M6zM.d2o-99E9BVueOl5N2oAGk56wS90VewTeHKDpzmpsfPU	
```




```sh
code_client=$(docker compose -f ./quickstart.yml exec hydra \
    hydra create client \
    --endpoint http://127.0.0.1:4445 \
    --grant-type authorization_code,refresh_token \
    --response-type code,id_token \
    --format json \
    --scope openid --scope offline \
    --redirect-uri http://127.0.0.1:5555/callback)

code_client_id=$(echo $code_client | jq -r '.client_id')
code_client_secret=$(echo $code_client | jq -r '.client_secret')
```

```sh
docker compose -f ./quickstart.yml exec hydra \
    hydra perform authorization-code \
    --client-id $code_client_id \
    --client-secret $code_client_secret \
    --endpoint http://127.0.0.1:4444/ \
    --port 5555 \
    --scope openid --scope offline
```

Visit http://127.0.0.1:5555/

Click `Authorize application`

Login as a shown user (`foo@bar.com` / `foobar`)

Allow access

=> Get Access Token etc.


```sh
docker compose -f ./quickstart.yml exec hydra \
  hydra introspect token \
  --format json-pretty \
  --endpoint http://127.0.0.1:4445/ \
  ory_at_9fj0Dlx8T_k7WtqDJhpOWrmrCbqmO_Wi4oDl4VxfKvs.w43WQ9GoP0NBmsUzZVhL6f1LbraHDmoQ2kvxb33PEEs
```

```json
{
  "active": true,
  "client_id": "07b68b6f-2338-4b36-9ceb-adf3770c6bcd",
  "exp": 1685410085,
  "iat": 1685406485,
  "iss": "http://127.0.0.1:4444",
  "nbf": 1685406485,
  "scope": "openid offline",
  "sub": "foo@bar.com",
  "token_type": "Bearer",
  "token_use": "access_token"
}
```

https://github.com/ory/hydra-login-consent-node

https://github.com/ory/hydra-login-consent-node/blob/176314d8f2b5a5a53e37425496ef3c657016c72f/src/routes/login.ts#L107-L108  
ここで subject を API Client 側が指定している。  
`adminAcceptOAuth2LoginRequest`

Ory Hydra の access token はランダムな文字列とのこと。  
かつ、 token ごとに prefix がつく。  
https://www.ory.sh/docs/security-compliance/token-formats  
https://www.ory.sh/docs/oauth2-oidc/jwt-access-token
