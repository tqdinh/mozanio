import { LoginRepository } from '@path/core/domain/Login/LoginRepository';

export class LoginRepositoryImp implements LoginRepository {
  submitPhoneNumber(phoneNumber: String) {
    throw new Error('Method not implemented.');
  }
  submitTextCode(textCode: String) {
    throw new Error('Method not implemented.');
  }
  submitUserAndPassword(user: String, pass: String) {
    throw new Error('Method not implemented.');
  }
}
