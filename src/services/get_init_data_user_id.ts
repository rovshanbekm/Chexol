import WebApp from "@twa-dev/sdk";

export function getTelegramUserDataID(): number | null {
  try {
    WebApp.ready(); // telegram to'liq ishlashini kutish

    const tg = WebApp.initDataUnsafe;
    console.log("TG DATA:", tg);

    if (tg?.user?.id) {
      return tg.user.id;
    }
  } catch (err) {
    console.log("Telegram WebApp xatosi:", err);
  }

  return null;
}


// export const getTelegramUserDataID = () => {
//   if (import.meta.env.DEV) {
//     return  1665926394;
//   }

//   try {
//     const telegram = (window as any)?.Telegram?.WebApp;
//     return telegram?.initDataUnsafe?.user?.id || null;
//   } catch (e) {
//     return null;
//   }
// };
