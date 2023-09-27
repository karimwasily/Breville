/**
 * get the src of the default youtube url preview image 
 * @param {string} ytUrl youtube url
 * @param {'sd' | 'mq' | 'hq' | 'maxres' } quality image quality
 * @returns {string} yt image src
 */
export const getYoutubePreviewImage = ( ytUrl, quality = 'maxres' ) => {
  const videoId = ytUrl?.match( /(\?|&)v=([^&#]+)/ )?.pop();
  return videoId ? `https://img.youtube.com/vi/${ videoId }/${quality}default.jpg` : '';
}