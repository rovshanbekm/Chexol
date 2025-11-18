import WebApp from "@twa-dev/sdk";

export function getTelegramUserDataID(): number | null {
  const tg = WebApp.initDataUnsafe;
  if (tg && tg.user) {
    return tg?.user.id
  }
  return null;
}