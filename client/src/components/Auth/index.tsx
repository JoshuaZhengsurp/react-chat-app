import { getUserInfo } from "@/api/module/user";
import { CHAT_APP_USER } from "@/config/constant";
import { ROUTER_WHITE_LIST } from "@/router/config";
import { useUserStore } from "@/store";
import { toToastInfo } from "@/utils/toast";
import { Loading } from "@/components/Loading";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * @description && @todo 身份验证
 */

interface AuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useUserStore((state) => [
    state.userInfo,
    state.setUserInfo,
  ]);
  const [isLoading, setLoadingStatus] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isIncludeWhiteList = (pathName: string): boolean => {
    for (const key in ROUTER_WHITE_LIST) {
      if (
        ROUTER_WHITE_LIST[key]?.pathName === pathName &&
        ROUTER_WHITE_LIST[key]?.role <= userInfo.role
      ) {
        return true;
      }
    }
    return false;
  };

  /**
   * @todo axios响应拦截器判断身份有效期
   */
  const initUserInfo = async () => {
    try {
      // const res = await getUserInfo();
      // if (res.result === 1) {
      //   setUserInfo(res.data!);
      // } else {
      //   throw new Error("");
      // }
      const tmpUserInfo: User = JSON.parse(
        localStorage.getItem(CHAT_APP_USER)!
      ) as User;
      setUserInfo(tmpUserInfo);
      console.log("hello", tmpUserInfo);
    } catch {
      navigate("/login");
      toToastInfo("Please, login again!");
    }
  };

  /**
   * @description 验证用户权限啊
   */
  const authUserRole = async () => {
    if (!isIncludeWhiteList(location.pathname)) {
      if (userInfo.id === -1) {
        await initUserInfo();
      } else {
        // todo 回退到上一历史页面。
        navigate("/");
      }
    }
    setLoadingStatus(false);
  };

  useEffect(() => {
    console.log(isIncludeWhiteList(location.pathname), userInfo);
    authUserRole();
  }, [location.pathname]);
  // useEffect(()=>{
  //   console.log(location.pathname);
  // }, [location.pathname]);
  return <Loading isLoading={isLoading}>{children}</Loading>;
};

export default Auth;
