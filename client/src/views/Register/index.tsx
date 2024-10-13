import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/logov2.png";
import style from "./Register.module.scss";
import { toToast, toToastError, toToastSuccess } from "@/utils/toast";
import { createAccount } from "@/api/module/auth";

interface RigisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function Register() {
  const [formInfo, setFormInfo] = useState<RigisterForm>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const { email, password, username } = formInfo;
        const res = await createAccount({ password, email, username });
        console.log("res", res);
        if (res.result === 1) {
          toToastSuccess("success create account");
          setTimeout(() => navigate("/login"), 100);
        } else {
          toToastError(res.message);
        }
      } catch {
        toToastError("create account faild");
      }
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
    }
  };
  const handleValidation = (): boolean => {
    const { password, confirmPassword, username, email } = formInfo;
    if (username.length < 3 || username.length > 12) {
      toToast("error", "Username should be between 3 and 12 characters");
      return false;
    }
    if (!email) {
      toToast("error", "Email is required");
      return false;
    }
    if (password !== confirmPassword) {
      toToast("error", "Password and confirm password should be same.");
      return false;
    }
    return true;
  };

  return (
    <div className={style["content"]}>
      <form
        className={style["register-form"]}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className={style["brand"]}>
          <img src={Logo} alt="" />
          <h1>JOSHUA</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Create User</button>
        <span>
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}
