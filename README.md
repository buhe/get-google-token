# getgoogletoken

##获取ClientId

1. 进入 https://console.developers.google.com/project/252254507945/apiui/credential
2. 创建新的用户端Id
3. 选择第一个，浏览器
4. 两个网址填一下 https://www.xxx.com 和 https://www.xxx.com/oauth2callback
5. 浏览器输入：https://accounts.google.com/o/oauth2/auth?scope=email%20profile&state=%2Fprofile&redirect_uri=YOU_REDIRECT_URL&response_type=token&client_id=YOU_CLIENT_ID
6. 点击接受，链接跳转到  YOU_REDIRECT_URL#state=/profile&access_token=YOU_TOKEN&token_type=Bearer&expires_in=3600
7. 于是得到了Token
8. 

