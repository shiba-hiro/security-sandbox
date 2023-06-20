package main

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"fmt"
	"net/http"

	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
)

var keysMap map[string][]byte

func main() {
	keysMap = map[string][]byte{}

	// トークンの検証
	http.HandleFunc("/verify_token", func(w http.ResponseWriter, r *http.Request) {
		token := r.FormValue("token")

		result, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
			keyID := token.Header["kid"].(string)
			publicKeyBytes := keysMap[keyID]
			publicKeyPem, _ := pem.Decode(publicKeyBytes)
			publicKey, err := x509.ParsePKCS1PublicKey(publicKeyPem.Bytes)
			return publicKey, err
		})

		if err != nil {
			fmt.Fprintln(w, "トークンの検証に失敗しました:", err)
			return
		}

		fmt.Fprintln(w, "トークンの検証に成功しました")
		fmt.Printf("%#v\n", result)
	})

	// クライアントへ秘密鍵を返却
	http.HandleFunc("/private_key", func(w http.ResponseWriter, r *http.Request) {
		keyID, privateKeyPemBytes := generateKey()
		w.Header().Set("Content-Type", "application/x-pem-file")
		w.Header().Set("Content-Disposition", "attachment; filename=private_key.pem")
		w.Header().Set("Key-ID", keyID)
		w.Write(privateKeyPemBytes)
	})

	// サーバーの起動
	http.ListenAndServe(":19080", nil)
}

func generateKey() (string, []byte) {
	keyID := uuid.New().String()

	// 鍵の生成
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		fmt.Println("秘密鍵の生成に失敗しました:", err)
		return "", nil
	}

	// 公開鍵の取得
	publicKey := &privateKey.PublicKey
	pemkey := &pem.Block{
		Type:  "RSA PUBLIC KEY",
		Bytes: x509.MarshalPKCS1PublicKey(publicKey),
	}
	pubKeyBytes := pem.EncodeToMemory(pemkey)
	keysMap[keyID] = pubKeyBytes

	// 秘密鍵のPEM形式でのエンコード
	privateKeyPem := &pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(privateKey),
	}
	privateKeyPemBytes := pem.EncodeToMemory(privateKeyPem)

	return keyID, privateKeyPemBytes
}
