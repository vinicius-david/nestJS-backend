export default function checkPasswordStrength(password: string): boolean {
  const strongPassword = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
  );

  return strongPassword.test(password);
}
