export default function validateForm(name,value) {
  const fieldErrors = {};

  if (name === "fullName") {
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      fieldErrors.fullName = "Name can only contain letters";
    }
  }

  if (name === "phone"){
    if (!/^\d{10}$/.test(value)) {
    fieldErrors.phone = "Enter valid phone number";
  }
  }

  if (name === "email"){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value && !emailRegex.test(value)) {
    fieldErrors.email = "Enter a valid email address";
  }
  }
  return fieldErrors;
}