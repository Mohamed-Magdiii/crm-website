export const emailCheck = (value, ctx, input, cb, checkEmailFunction) => {
  checkEmailFunction({ email: value }).then((emailChk) => {
    if (!emailChk.isSuccess){
      return cb(emailChk.message);
    }
    return cb(true);
  }).catch((err) => {
    return cb(err.message);
  });
};