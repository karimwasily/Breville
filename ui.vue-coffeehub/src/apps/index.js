import Button from "./Button/Button";
import Teaser from "./Teaser/Teaser";
import BlogListing from "./BlogListing/BlogListing";
import Video from "./Video/Video";
import YoutubeVideo from "./YoutubeVideo/YoutubeVideo";

const VueComponents = {
  [Button.name]: Button,
  [Teaser.name]: Teaser,
  [BlogListing.name]: BlogListing,
  [Video.name]: Video,
  [YoutubeVideo.name]: YoutubeVideo
};

export { VueComponents };
