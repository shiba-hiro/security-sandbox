package main

import (
	"crypto/rand"
	"crypto/rsa"

	// "crypto/sha256"
	"crypto/x509"
	"encoding/pem"
	"fmt"
	"os"
)

func main() {
	// 鍵の生成
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		fmt.Println("秘密鍵の生成に失敗しました:", err)
		return
	}

	// 公開鍵の取得
	publicKey := &privateKey.PublicKey

	// 秘密鍵のPEM形式でのエンコード
	privateKeyPem := &pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(privateKey),
	}

	// 秘密鍵をファイルに保存
	privateKeyFile, err := os.Create("private_key.pem")
	if err != nil {
		fmt.Println("秘密鍵のファイル保存に失敗しました:", err)
		return
	}
	defer privateKeyFile.Close()
	err = pem.Encode(privateKeyFile, privateKeyPem)
	if err != nil {
		fmt.Println("秘密鍵のエンコードに失敗しました:", err)
		return
	}

	// 公開鍵のPEM形式でのエンコード
	publicKeyDer, err := x509.MarshalPKIXPublicKey(publicKey)
	if err != nil {
		fmt.Println("公開鍵のエンコードに失敗しました:", err)
		return
	}
	publicKeyPem := &pem.Block{
		Type:  "PUBLIC KEY",
		Bytes: publicKeyDer,
	}

	// 公開鍵をファイルに保存
	publicKeyFile, err := os.Create("public_key.pem")
	if err != nil {
		fmt.Println("公開鍵のファイル保存に失敗しました:", err)
		return
	}
	defer publicKeyFile.Close()
	err = pem.Encode(publicKeyFile, publicKeyPem)
	if err != nil {
		fmt.Println("公開鍵のエンコードに失敗しました:", err)
		return
	}

	fmt.Println("公開鍵と秘密鍵のペアを作成しました")
}
