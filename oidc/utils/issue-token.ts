import { $ } from "jsr:@david/dax@0.40.0";
import { parseArgs } from "node:util";

const parsed = parseArgs({
  options: {
    "clientId": {
      type: "string",
      short: "i",
    },
    "clientSecret": {
      type: "string",
      short: "s",
    },
    code: {
      type: "string",
      short: "c",
    },
  },
  allowPositionals: true,
});

const { code, clientSecret, clientId } = parsed.values;
if (!code || !clientId || !clientSecret) {
  console.error("Missing required argument: code, clientId, clientSecret");
  Deno.exit(1);
}

// curl -d "grant_type=authorization_code&client_id=sample-app-client&client_secret=cZdWnBaJufy2EdBu93BrAbXSxDJPqa5F&code=a73a3364-019a-4871-87c1-0feb1bce3f08.77a51f2a-2af0-4816-8d3d-8593400fbca2.9f813127-400a-4860-a135-4462ca92f942&redirect_uri=http://localhost:11030" http://localhost:11080/realms/sample-realm/protocol/openid-connect/token

const formBody: string[] = [];
formBody.push(
  encodeURIComponent("grant_type") + "=" +
    encodeURIComponent("authorization_code"),
);
formBody.push(
  encodeURIComponent("client_id") + "=" + encodeURIComponent(clientId),
);
formBody.push(
  encodeURIComponent("client_secret") + "=" + encodeURIComponent(clientSecret),
);
formBody.push(encodeURIComponent("code") + "=" + encodeURIComponent(code));
formBody.push(
  encodeURIComponent("redirect_uri") + "=" +
    encodeURIComponent("http://localhost:11030"),
);

const res = await fetch(
  "http://localhost:11080/realms/sample-realm/protocol/openid-connect/token",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody.join("&"),
  },
);

const json = await res.json();

await $`echo ${JSON.stringify(json)}`;

if (res.ok) {
  Deno.exit(0);
} else {
  Deno.exit(1);
}
