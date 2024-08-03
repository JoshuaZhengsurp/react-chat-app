import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logov2.png";
import style from "./login.module.scss";
import { toToast, toToastError, toToastSuccess } from "@/utils/toast";
import { login } from "@/api/module/user";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [formInfo, setFormInfo] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (handleValidation()) {
      try{
        const { email, password } = formInfo;
        const res = await login({ password, email });
        if(res.result === 1) {
          toToastSuccess('success create account');
        } else {
          toToastError('create account faild');
        }
      } catch {
        toToastError('create account faild');
      }
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
    }
  };
  const handleValidation = (): boolean => {
    const { password, email } = formInfo;
    if (!email) {
      toToast("error", "Email is required");
      return false;
    }
    if (!password) {
      toToast("error", "password is required");
      return false;
    }
    return true;
  };

  // todo: 需要做路由守卫和重定向
  useEffect(() => {
    if(localStorage.getItem('chat-app-user')) {
      // navigate('/');
    }
  }, [navigate])

  return (
    <div className={style["content"]}>
      <form
        className={style["login-form"]}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className={style["brand"]}>
          <img src={Logo} alt="" />
          <h1>JOSHUA</h1>
        </div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Login</button>
        <span>
          Don't have an account ? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}
