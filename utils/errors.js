const serverThrottlingError = 'Превышен лимит запросов к HTTP-серверу, просьба повторить попытку позже.';
const internalServerError = 'Ошибка обработки запроса на сервере.';
const endpointCastError = 'Указанный URI ресурса не найден в базе.';
const endpointAuthError = 'Недостаточно прав для доступа к указанному URI ресурса.';
const movieValidationError = 'В запросе переданы некорректные данные фильма.';
const movieAuthError = 'Недостаточно прав для удаления указанного фильма.';
const movieCastError = 'Указанный ID фильма не найден в базе.';
const userValidationError = 'В запросе переданы некорректные данные пользователя.';
const userAuthError = 'Ошибка в процессе аутентификации пользователя.';
const userCredentialsError = 'В запросе переданы некорректные email или пароль.';
const userCastError = 'Указанный ID пользователя не найден в базе.';
const userConflictError = 'Указанный email уже зарезервирован в базе за другим пользователем.';
const movieUrlError = 'Необходимо указать адрес URL';
const userEmailError = 'Необходимо указать корректный email';

const codeBadRequest = 400;
const codeUnauthorized = 401;
const codeForbidden = 403;
const codeNotFound = 404;
const codeConflict = 409;
const codeServerError = 500;

module.exports = {
  serverThrottlingError,
  internalServerError,
  endpointCastError,
  endpointAuthError,
  movieValidationError,
  movieAuthError,
  movieCastError,
  userValidationError,
  userAuthError,
  userCredentialsError,
  userCastError,
  userConflictError,
  codeBadRequest,
  codeUnauthorized,
  codeForbidden,
  codeNotFound,
  codeConflict,
  codeServerError,
  movieUrlError,
  userEmailError,
};
