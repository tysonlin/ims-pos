require('extend-error');

const AppError = Error.extend('AppError', 500);
const ClientError = Error.extend('ClientError', 400);

module.exports = {
    AppError: AppError,
    ClientError: ClientError,
    HttpNotFound: ClientError.extend('HttpNotFoundError', 404),
    HttpUnauthorized: ClientError.extend('HttpUnauthorized', 401)
}