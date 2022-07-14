![](https://i.imgur.com/0ars5kf.png)

`error-handler.ts` : capture errors from `../errors`
`validate-request.ts` : check if the request is valid.
`current-user.ts` : middleware to extract the JWT payload and set it on 'req.currentUser'
`require-auth.ts` : middleware to reject the request if the user is not logged in
