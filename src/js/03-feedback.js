import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
let formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(event) {
  event.preventDefault();
  if (!event.currentTarget.email.value) {
    return;
  }
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
  formData = {};
}

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (savedFormData) {
  const keys = Object.keys(savedFormData);
  for (const key of keys) {
    form[key].value = savedFormData[key];
    formData[key] = savedFormData[key];
  }
}
