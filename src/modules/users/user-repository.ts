import { Model, Document } from "mongoose";
import { userModels, userSchema } from "./user.models";
import {Iuser} from "./user-types"

class UserRepository {
  private model: Model<typeof userSchema>; // Use typeof to get the schema type

  constructor() {
    this.model = userModels as unknown as Model<typeof userSchema>;
  }

  async getUser(userId: string): Promise<typeof userSchema | null> {
    const user = await this.model.findById(userId);
    return user;
  }

  async createUser(newUser:Iuser): Promise<Document> {
    const user = await this.model.create(newUser);
    return user;
  }

  async updateUser(id: string,updatedUser: typeof userSchema): Promise<Document | null> {
    const updated = await this.model.findByIdAndUpdate({ _id: id },updatedUser,{ new: true });
    return updated;
  }

  async deleteUser(id: string): Promise<Document | null> {
    const user = await this.model.findByIdAndDelete({ _id: id });
    return user;
  }

  async getAllUsers(): Promise<Document[] | null> {
    const users = await this.model.find();
    return users;
  }

  async getUserByEmail(email: string): Promise<Document | null >{
      const user = await this.model.findOne({ email: email });
      return user;
  }
}

export default UserRepository;
