import { LoginRepositoryImp } from '@path/core/data/Login/LoginRepositoryImpl';
import { LoginUsecaseImpl } from '@path/core/data/Login/LoginUsecaseImpl';

let loginRepository = new LoginRepositoryImp();
let loginUsecase = new LoginUsecaseImpl(loginRepository);

function doLoginWithPassword(username: String, password: String) {
  loginUsecase.login(username, password);
}
