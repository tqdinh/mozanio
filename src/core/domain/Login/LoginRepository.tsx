export interface LoginRepository {
  submitPhoneNumber(phoneNumber: String): any;
  submitTextCode(textCode: String): any;
  submitUserAndPassword(user: String, pass: String): any;
}
