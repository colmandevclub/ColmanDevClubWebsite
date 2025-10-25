import { roles } from 'src/constants/roles';

export const Validators = {
  validateEmail: (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  },
  validatePassword: (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  },
  validateName: (name) => {
    const trimmedName = (name ?? '').trim();
    const nameRegex = /^[A-Za-z]+(?:[ '\-][A-Za-z]+)+$/;
    return nameRegex.test(trimmedName);
  },
  validatePhone: (phone) => {
    const phoneRegex = /^[0-9]{10,}$/;
    return phoneRegex.test(phone);
  },
  validateCardId: (cardId) => {
    const cardIdRegex = /^[0-9]{9,}$/;
    return cardIdRegex.test(cardId);
  },
  validateRole: (role) => {
    return Object.values(roles).includes(role);
  },
};
