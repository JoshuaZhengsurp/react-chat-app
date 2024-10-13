import { create } from 'zustand';
// import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
    userInfo: User;
    setUserInfo: (data: User) => void;
}

const DEFAULT_USER_INFO: User = {
    id: -1,
    role: -1,
    avatar: '',
    username: '',
    email: '',
};

// export const useUserStore = create(
//   persist<UserState>(
//     (set) => ({
//       userInfo: DEFAULT_USER_INFO,
//       setUserInfo: (data: User) => set(() => ({ userInfo: data })),
//     }),
//     {
//       name: "user-info",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

export const useUserStore = create<UserState>(set => ({
    userInfo: DEFAULT_USER_INFO,
    setUserInfo: (data: User) => set(() => ({ userInfo: data })),
}));
