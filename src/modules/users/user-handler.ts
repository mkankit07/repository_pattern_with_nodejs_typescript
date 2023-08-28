import { Request, Response } from "express";
import UserService from "./user-services";
class UserHandlers {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async createUser(req: Request, res: Response) {
    const response = await this.userService.createUser(req.body);
    res.status(response.code).json(response);
  }
}

export default new UserHandlers();
