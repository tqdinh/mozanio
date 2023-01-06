import { LoginRepository } from '@path/core/domain/Login/LoginRepository';
import { LoginUsecase } from '@path/core/domain/Login/LoginUsecase';

export class LoginUsecaseImpl implements LoginUsecase {
  loginRepository: LoginRepository;
  constructor(loginRepo: LoginRepository) {
    this.loginRepository = loginRepo;
  }
  login(username: String, password: String) {
    throw new Error('Method not implemented.');
    //this.login;this.loginRepository.
  }
}
