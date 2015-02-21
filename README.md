# getgoogletoken

##获取Code

1. 进入 https://console.developers.google.com/project/xxxx/apiui/credential
2. 创建新的用户端Id
3. 选择第一个，浏览器
4. 两个网址填一下 https://www.xxx.com 和 https://www.xxx.com/oauth2callback
5. 浏览器输入：https://accounts.google.com/o/oauth2/auth?scope=email%20profile&state=%2Fprofile&redirect_uri=YOU_REDIRECT_URL&response_type=code&client_id=YOU_CLIENT_ID&access_type=offline   (manual,离线必须有) 

##执行Cli 获取 refresh_token 和 access_token
```bash
$ [sudo] npm -g install getgoogletoken
$ getgoogletoken YOU_CODE YOU_CLIENT_ID YOU_CLIENT_SECRET YOU_REDIRECT_URL
```
##实际执行的过程
1. 链接跳转到  YOU_REDIRECT_URL?state=/profile&code=YOU_CODE   (auto)
2. 于是得到了CODE
3. https://accounts.google.com/o/oauth2/token  form 中带上code,client_id.... (auto)
4. 得到了 access_token 和 refresh_token (重要)
5. https://accounts.google.com/o/oauth2/token  form 带上... 可以刷新key了 (auto)

ref: http://stackoverflow.com/questions/12427479/am-i-getting-the-steps-right-for-verifying-a-users-android-in-app-subscription
