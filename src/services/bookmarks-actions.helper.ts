import * as HTTPService from './index'

export async function addBookmarkService (bookmarkData:any) {
    const response = await HTTPService.httpAddBookmark(bookmarkData)
    const info = response;
    console.log(info)
    return info
}