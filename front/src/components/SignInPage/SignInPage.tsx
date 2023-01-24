import { s } from './';
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { login } from '../../action/user';
interface IFormInput {
  email: string;
  password: string;
  name: string;
}

const SignInPage = () =>{
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data )=> dispatch(login(data.email,data.password,data.name));
   
  return (
    
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <label>ВОЙТИ</label>
      <label>Имя</label>
      <input {...register("name", { required: true, maxLength: 20 })} />
      <label>Email</label>
      <input {...register("email")} />
      <label>Пароль</label>
      <input  {...register("password", { required: true, minLength: 1 })} />
      <input type="submit" />
    </form>
  );
}




 

export default SignInPage;
