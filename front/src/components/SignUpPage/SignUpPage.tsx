import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { registration } from "../../action/user";
import { s } from './';



interface IFormInput {
  email: string;
  password: string;
  name: string;
}

const SignUpPage = ()=> {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => registration(data.email,data.password,data.name);

  return (
    
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <label>РЕГИСТРАЦИЯ</label>
      <label>Имя</label>
      <input {...register("name")} />
      <label>Email</label>
      <input {...register("email")} />
      <label>Пароль</label>
      <input {...register("password")} />
      <input  type="submit" />
    </form>
  );
}
export default SignUpPage;