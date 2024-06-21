import crypto from "crypto" 

const hashPassword = async (password:string) =>{
  try {
    const passHash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
    return passHash;
  } catch (error) {
    console.error('Ошибка при хешировании пароля:', error);
    return null;
  }
}
export default hashPassword