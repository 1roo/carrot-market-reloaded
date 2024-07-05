"user server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/constants";
import { z } from "zod";

const checkUserName = (username: string) => !username.includes("patato");

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username??",
      })
      .toLowerCase()
      .trim()
      .transform((username) => `👀 ${username}`)
      .refine(checkUserName, "No potatoes allowed"),
    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX),
    confirm_password: z.string().min(10),
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  //parse는 에러를 던지고 //safeParse는 에러를 던지지 않는다. 그래서 parse를 쓸 때는 try catch를 써야해
  //   try{
  //     formSchema.parse(data);
  //   } catch (e) {
  //     console.log(e);

  //   }
  const result = formSchema.safeParse(data);
  console.log(result);
  if (!result.success) {
    console.log(result.error.flatten());

    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
