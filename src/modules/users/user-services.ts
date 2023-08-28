import UserRepository from "./user-repository";
import ResponseBuilder, { IResponseBody } from "../../common/app.error";
import { Iuser } from "./user-types";
import userPassword from "../../utils/userPassword";
class UserService extends ResponseBuilder {
  private repo: UserRepository;
  constructor() {
    super();
    this.repo = new UserRepository();
  }
  async createUser(user: Iuser): Promise<IResponseBody> {
    const isUser = await this.repo.getUserByEmail(user?.user_email);
    if (isUser) {
      return this.conflictError("user already exists");
    }
    user.user_password = await userPassword.hashPassword(user?.user_password);
    const userInfo = await this.repo.createUser(user);
    return this.createdSuccess("user created successfully", userInfo);
  }
}

export default UserService;
