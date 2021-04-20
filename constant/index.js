export const AppConstant = {
  TITLE: "Islamic Portable"
}

export const ApiPath = {
  SURAH_INFO: '/data/surah-info.json',
  SURAH_BY_ID: (id) => `/data/surah/${id}.json`
}

export const storageKey = {
  ALL_SURAH: 'ALL_SURAH',
  SURAH_BY_ID: (id) => `SURAH_${id}`
}