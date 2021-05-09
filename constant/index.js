export const AppConstant = {
  TITLE: "Islamic Portable",
  QURAN_TITLE: "Al Qur'an",
  DOA_TITLE: "Do'a",
  BOOKMARK: "Penanda",
  FAVORITE: "Favorit",
  ABOUT: "Tentang"
}

export const ApiPath = {
  SURAH_INFO: '/data/surah-info.json',
  DOA_INFO: '/data/hisnul-muslim.json',
  SURAH_BY_ID: (id) => `/data/surah/${id}.json`
}

export const storageKey = {
  ALL_SURAH: 'ALL_SURAH',
  SURAH_BY_ID: (id) => `SURAH_${id}`,
  FAVORITE_SURAH: 'FAV_SURAH',
  LAST_READ_AYAH: 'LAST_READ_AYAH',
  ALL_DOA: 'ALL_DOA',
  FAVORITE_DOA: 'FAV_DOA',
  LAST_READ_DOA: 'LAST_READ_DOA'
}