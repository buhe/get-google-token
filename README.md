# getgoogletoken

##获取ClientId

1. 进入 https://console.developers.google.com/project/xxxx/apiui/credential
2. 创建新的用户端Id
3. 选择第一个，浏览器
4. 两个网址填一下 https://www.xxx.com 和 https://www.xxx.com/oauth2callback
5. 浏览器输入：https://accounts.google.com/o/oauth2/auth?scope=email%20profile&state=%2Fprofile&redirect_uri=YOU_REDIRECT_URL&response_type=code&client_id=YOU_CLIENT_ID&access_type=offline   (manual,离线必须有) 
6. 链接跳转到  YOU_REDIRECT_URL?state=/profile&code=YOU_CODE   (auto)
7. 于是得到了CODE
8. https://accounts.google.com/o/oauth2/token  form 中带上code,client_id.... (auto)
9. 得到了 access_token 和 refresh_token (重要)
10. https://accounts.google.com/o/oauth2/token  form 带上... 可以刷新key了 (auto)
11. 

