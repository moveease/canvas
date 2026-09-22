const PHONE_REGEX = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

export function validatePhone(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Phone number is required";
  }

  const cleaned = trimmed.replace(/[\s-]/g, "");

  if (!PHONE_REGEX.test(cleaned)) {
    return "Enter a valid 10-digit phone number";
  }

  return "";
}