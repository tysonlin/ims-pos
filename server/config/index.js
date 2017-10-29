const secret = process.env.SECRET;

module.exports = {
    secret: secret || '0xshhh',
    passportHeaderType: 'jwt',
    passportAuthOpts: {session: false, failureRedirect: '/unauthorized'}
}