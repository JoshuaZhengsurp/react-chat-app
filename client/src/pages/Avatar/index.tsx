import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./avatar.module.scss";
import { toToastError } from "@/utils/toast";
import { setAvatar } from "@/api/module/user";
import Logo from "@/assets/logov2.png";
import { Loading } from "@/components/Loading";
import { AxiosError } from "axios";

export default function Avatar() {
  // const api = "https://api.multiavatar.com/";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectAvatar] = useState<number>();
  const [avatarList, setAvatarList] = useState<string[]>([]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toToastError("Please select an avatar");
    } else {
      const user = JSON.parse(localStorage.getItem("chat-app-user") || "{}");
      try {
        const res = await setAvatar({ img: avatarList[selectedAvatar] });
        if (res.result === 1) {
          user.isAvatarImageSet = true;
          user.avatarImage = res.data!.image;
          localStorage.setItem("chat-app-user", JSON.stringify(user));
          navigate("/");
        } else {
          throw Error("");
        }
      } catch (err) {
        console.log("hello", (err as string) || "set avatar success");
        toToastError(
          (err as AxiosError)?.message ||
            (err as string) ||
            "set avatar success"
        );
      }
    }
  };

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
        await new Promise((resolve) => {
          setTimeout(() => resolve(""), 100);
        });
        data.push(Logo);
      }
      console.log('data', data);
      setAvatarList(data);
      setIsLoading(false);
    };
    generateAvatar();
  }, []);

  return (
    <Loading isLoading={isLoading}>
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
        <button className={style["submit-btn"]} onClick={setProfilePicture}>
          Set as Profile Picture
        </button>
      </div>
    </Loading>
  );
}
