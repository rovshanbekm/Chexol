// import WebApp from "@twa-dev/sdk";

// export function getTelegramUserDataID(): number | null {
//   const tg = WebApp.initDataUnsafe;
//   if (tg && tg.user) {
//     return tg?.user.id
//   }
//   return null;
// }

export const getTelegramUserDataID = () => {
  if (import.meta.env.DEV) {
    return null; 
  }

  try {
    const telegram = (window as any)?.Telegram?.WebApp;
    return telegram?.initDataUnsafe?.user?.id || null;
  } catch (e) {
    return null;
  }
};
