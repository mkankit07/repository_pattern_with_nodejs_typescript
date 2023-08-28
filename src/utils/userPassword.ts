import bcrypt from "bcrypt";
class UserPassword {

  hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}

export default  new UserPassword();
