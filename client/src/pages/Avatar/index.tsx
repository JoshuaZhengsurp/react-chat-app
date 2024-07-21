import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./avatar.module.scss";
import { toToast, toToastError, toToastSuccess } from "@/utils/toast";
import { login } from "@/api/module/user";
import Logo from "@/assets/logov2.png";
import axios from "axios";

export default function Avatar() {
  const api = "https://api.multiavatar.com/";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectAvatar] = useState<number>();
  const [avatarList, setAvatarList] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const generateAvatar = async () => {
      const data = [];
      for (let i = 0; i < 4; ++i) {
        // const image = await axios.get<string>(
        //   `${api}/${Math.round(Math.random() * 100000)}`
        // );
        // const blob = new Blob([image.data], { type: 'image/svg+xml' });
        // data.push(URL.createObjectURL(blob));
        await new Promise((resolve)=>{
          setTimeout(()=>resolve(''), 100);
        });
        data.push(Logo);
      }
      setAvatarList(data);
      setIsLoading(false);
    };
    generateAvatar();
  }, []);

  return (
    <div className={style["content"]}>
      <div className={style["title"]}>
        <h1>Pick an avatar as your profile picture</h1>
      </div>
      <div className={style["avatar-list"]}>
        {avatarList.map((item, index) => (
          <div
            className={`${style["avatar"]} ${
              selectedAvatar === index ? style["selected"] : ""
            }`}
            key={index}
          >
            <img
              src={item}
              alt="avatar"
              onClick={() => setSelectAvatar(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
