import i18n from "i18next";

import { initReactI18next } from "react-i18next";

import settingsEn from "./locales/Settings/en";
import settingsAr from "./locales/Settings/ar";
import profileEn from "./locales/Profile/en";
import profileAr from "./locales/Profile/ar";
import editProfileEn from "./locales/EditProfile/en";
import editProfileAr from "./locales/EditProfile/ar";
import blockedEn from "./locales/Blocked/en";
import blockedAr from "./locales/Blocked/ar";
import friendsEn from "./locales/Friends/en";
import friendsAr from "./locales/Friends/ar";
import homeEn from "./locales/Home/en";
import homeAr from "./locales/Home/ar";
import starredEn from "./locales/Starred/en";
import starredAr from "./locales/Starred/ar";
import chatEn from "./locales/Chat/en";
import chatAr from "./locales/Chat/ar";

const savedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            settings: settingsEn,
            profile: profileEn,
            editProfile: editProfileEn,
            blocked: blockedEn,
            friends: friendsEn,
            home: homeEn,
            starred: starredEn,
            chat: chatEn,
        },

        ar: {
            settings: settingsAr,
            profile: profileAr,
            editProfile: editProfileAr,
            blocked: blockedAr,
            friends: friendsAr,
            home: homeAr,
            starred: starredAr,
            chat: chatAr,
        },
    },

    lng: savedLanguage,

    fallbackLng: "en",

    interpolation: {
        escapeValue: false,
    },
});

document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";

document.documentElement.lang = savedLanguage;

export default i18n;
