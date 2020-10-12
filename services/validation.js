const emailValidator = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
const nameValidator = /\w{3,}/;

const isValid = ({ name, email, text }) => {
  if (!nameValidator.test(name)) {
    return {
      status: 'Not Valid',
      message:
        'Nome inválido. Digite um nome com apenas caracteres e com no minímo 3 letras',
    };
  }
  if (!emailValidator.test(email)) {
    return {
      status: 'Not Valid',
      message: 'Email inválido. Digite um email no formato email@examplo.com',
    };
  }
  if (text.length < 100) {
    return {
      status: 'Not Valid',
      message: 'Mensagem inválida. Digite uma mensagem com no minímo 100 caracteres',
    };
  }
  return { status: 'Valid' };
};

module.exports = isValid;
