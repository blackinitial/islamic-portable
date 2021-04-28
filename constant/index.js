export const AppConstant = {
  TITLE: "Islamic Portable",
  QURAN_TITLE: "Al Qur'an",
  BOOKMARK: "Penanda",
  FAVORITE: "Favorit",
  ABOUT: "Tentang"
}

export const ApiPath = {
  SURAH_INFO: '/data/surah-info.json',
  SURAH_BY_ID: (id) => `/data/surah/${id}.json`
}

export const storageKey = {
  ALL_SURAH: 'ALL_SURAH',
  SURAH_BY_ID: (id) => `SURAH_${id}`,
  FAVORITE_SURAH: 'FAV_SURAH',
  LAST_READ_AYAH: 'LAST_READ_AYAH'
}