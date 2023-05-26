const getPem = require('rsa-pem-from-mod-exp');
const jwt = require('jsonwebtoken');

// 公開鍵のモジュラスと指数（Base64エンコードされているもの）
const modulusBase64 = 'ivgr_6uTTdhJZv7m8VG525a48sfl0XxBBcHq9dkNGUyoiZrD-AWTJACYYjEl7iYITImOln3VlpX2brg2cddScVbJhT4c5x2IW9WE5QkuBFieOHTsQZrh0geXiusjD3TNo_AnlK7opcxAcKTAv8aWnuqgF7c26fWa_x-_kcOIhe0jiiPzWNvvFrIxdGtb0u0GJtMVGakpxJh-FYNJnfMZQj1_P90FUCVg2ZEvw3lX9zlFGjO36v-Qhv6wfeTffoAuX93A14HCQ7Rfu5eUlMqfeWOCjWDC4hUr61dgFzLJfelW5NWzmxtH6mOpi5Q0ukWPCxcniqlYEU99d1HjMlA3Pw';
const exponentBase64 = 'AQAB';

const pem = getPem(modulusBase64, exponentBase64);
console.log(pem);


// const wrongPem = getPem(
//   "kzx5d5miFEYCi1Zj7nVz6-bgu75t4NpSwjjcYdKUI0BlRvxPWYweSF-IFUHJLPd796AFeTIEu_D2LpIFndVVwvbLNXvE1N5NjfhbhukgqxmpgjdMExowplFXaeUYE26sFMok0fl_Gzur69WjljiRjyS2wpOyQEbFinXWYuVJhcVNu6LOVkKcSzIINkBjFXd1bBA49glZQqx7t6RY5W54grO3GXa9ud6iSKjhf3Cek2FAKS6DQXif53qlDVPyzwo1drdODw3LGK9F3Ub-Cx27TU1LDLuvPPWn1CLMUk2NPo7whfNvq5BRhgqZSVqDj8YZbloPsM3VcVxiQplRYJDSCw",
//   "AQAB"
// );

const token = process.env.TOKEN;

if (typeof token === "string" && token.length > 0) {
  jwt.verify(
    token,
    pem,
    (err, decoded) => {
        console.log(err);
        console.log(decoded);
    }
  );
}
