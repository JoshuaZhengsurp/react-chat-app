import { getUserInfo } from '@/api/module/user';
import { ROUTER_WHITE_LIST } from '@/router/config';
import { useUserStore } from '@/store';
import { toToastInfo } from '@/utils/toast';
import { Loading } from '@/components/Loading';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * @description && @todo 身份验证
 * 注册事件，如果token过期等原因，重定向到login
 */

interface AuthProps {
    children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
    const [userInfo, setUserInfo] = useUserStore(state => [state.userInfo, state.setUserInfo]);
    const [isLoading, setLoadingStatus] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const isIncludeWhiteList = (pathName: string): boolean => {
        return ROUTER_WHITE_LIST?.[pathName] && ROUTER_WHITE_LIST?.[pathName]?.role <= userInfo.role;
    };

    /**
     * @todo axios响应拦截器判断身份有效期
     */
    const initUserInfo = async () => {
        try {
            const res = await getUserInfo();
            console.log(res, 'initUserInfo');
            if (res.result === 1) {
                setUserInfo(res.data!);
            } else {
                throw new Error();
            }
        } catch {
            navigate('/login');
            toToastInfo('身份信息过期，请重新登录');
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
                navigate('/');
            }
        }
        setLoadingStatus(false);
    };

    useEffect(() => {
        authUserRole();
    }, [location.pathname]);

    return <Loading isLoading={isLoading}>{children}</Loading>;
};

export default Auth;
