import { path } from 'ramda'
export const selectDisplay = path(['app', 'DISPLAY'])
export const selectTable = path(['app', 'TABLE'])
export const selectProcess = path(['app', 'BUCKET_CODES'])
export const selectForm = path(['app', 'FORM'])
export const selectDashboard = path(['app', 'SUMMARY_CODES'])
export const selectDrawer = path(['app', 'DRAWER'])
export const selectDetail = path(['app', 'DETAIL'])
export const selectDialog = path(['app', 'DIALOG'])
export const selectFilters = path(['app', 'filters'])
export const selectToast = path(['app', 'TOAST'])
export const selectDownloadFile = path(['app', 'DOWNLOAD_FILE'])
