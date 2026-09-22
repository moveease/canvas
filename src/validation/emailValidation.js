const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Email is required";
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return "Enter a valid email address";
  }

  return "";
}