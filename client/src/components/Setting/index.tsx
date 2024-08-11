import React, { memo, useMemo, useState } from "react";
import style from "./setting.module.scss";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store";

interface ProfileProps {
  userInfo?: User;
  click: ()=>void;
}
interface SettingListProps {
  settingList: SettingItem[];
}

const Profile: React.FC<ProfileProps> = memo(({ userInfo, click }) => {
  return (
    <div className={style["user-info"]} onClick={()=>click()}>
      <img src={userInfo?.avatar} alt="avatar" />
      <span>{userInfo?.username}</span>
    </div>
  );
});

const SettingList: React.FC<SettingListProps> = memo(({ settingList }) => {
  return (
    <div className={style["setting-list"]}>
      {settingList.map((item) => (
        <div
          className={style["setting-list-item"]}
          key={item.id}
          onClick={() => item.handle && item.handle()}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
});

export const Setting: React.FC = () => {
  const userInfo = useUserStore((state)=>state.userInfo);
  const [showSettingList, setShowSettingList] = useState(false);
  const naviagete = useNavigate();

  const handlelLogout = () => {
    naviagete("/login");
    // TODO: clear login data
  };

  const settingList = useMemo(() => {
    const list: SettingItem[] = [
      { role: 0, id: 0, name: "setting", handle: () => {} },
      { role: 0, id: 1, name: "profile", handle: () => {} },
      { role: 0, id: 2, name: "theme", handle: () => {} },
      { role: 0, id: 3, name: "logout", handle: handlelLogout },
    ];
    return list;
  }, []);

  const changeShowList = (flag?:boolean) => {
    setShowSettingList(flag || !showSettingList);
  };

  return (
    <div
      className={style["setting"]}
      style={{
        height: showSettingList ? "30%" : "15%",
        maxHeight: showSettingList ? "30%" : "15%",
      }}
      onBlur={()=>changeShowList(false)}
    >
      <Profile userInfo={userInfo} click={() => changeShowList()}/>
      {showSettingList && <SettingList settingList={settingList} />}
    </div>
  );
};
