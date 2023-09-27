export const checkCookie = cookieName => {
    return document.cookie.split(';').filter(item => item.trim().startsWith(`${cookieName}=`)).length > 0;
};
/**
 * Util to set cookie
 *
 * @param {String} name  - name of the cookie
 * @param {String} value  - value of the cookie
 * @param {number} age  - expire of the cookie
 */
export const setCookieValue = (cookieName,value, age) => {
    const cookieSettings = `path=/; domain=${window.location.hostname};Max-Age=${age !== undefined ? age : 3600}`;
    document.cookie = `${cookieName}=${value};${cookieSettings}`;
};
