<template>
<div class="cmp-v-video">
    <div v-show="!showPlayer" class="cmp-v-video__overlay" @click="this.playCurrentVideo">
        <img class="cmp-v-video__image" :src="overlayImage" :alt="imageAltText" />
        <div class="cmp-v-video__parent" :class="title ? 'cmp-v-video__parent-background' : ''">
            <h3 v-if="title" class="cmp-v-video__title" v-html="title"></h3>
            <div class="cmp-v-video__icon-wrapper">
                <div class="cmp-v-video__icon-play"></div>
                <div class="cmp-v-video__icon-circle" tabIndex='0' role="button" aria-label="play"></div>
            </div>
        </div>
    </div>
    <div class="cmp-v-video__underlay">
        <img class="cmp-v-video__image" :src="overlayImage" :alt="imageAltText" />
    </div>
    <div class="cmp-v-video__player">
        <YoutubeVideo ref="youtube" tabIndex="-1" :videoid="videoId" :loop="loop ? 1 : 0" :autoplay="autoplay ? 1 : 0" :start="parseInt(startTime)" :end="parseInt(stopTime)" @ended="onEnded" @paused="onPaused" @played="onPlayed" @buffering="onBuffering" />
    </div>
    <div :style="{ visibility: !showPlayer ? 'visible' : 'hidden' }" class="cmp-v-video__disclaimer">
        <p class="cmp-v-video__disclaimer-text">{{ disclaimerText }}</p>
    </div>
    <div class="cmp-v-video__chapter" v-if="showTimestamp">
        <div class="cmp-v-video__timestamp-wrapper" v-for="(timestamp, index) in timestamps" :key="index">
            <button class="cmp-v-video__timestamp-time" v-on:click="handleTimestampClick(timestamp.chapterTime)" :aria-labelledby="'cmp-v-video__timestamp-description-' + index">
                {{ ("0" + timestamp.chapterMinute).slice(-2) }}:{{
            ("0" + timestamp.chapterSecond).slice(-2)
          }}
            </button>
            <p class="cmp-v-video__timestamp-description" :id="'cmp-v-video__timestamp-description-' + index">
                {{ timestamp.chapterDescription }}
            </p>
        </div>
    </div>
</div>
</template>

<script>
import YoutubeVideo from "../YoutubeVideo/YoutubeVideo";

const STATUS = {
    STOPPED: "stopped",
    PLAYING: "playing",
    PAUSED: "paused",
    BUFFERING: "bufferring",
};

const QUERY = {
    VIDEO: ".cmp-v-video",
    IMAGE: "cmp-v-video__image",
    OVERLAY: "cmp-v-video__parent-background",
    VIDEO_PLAYER: "cmp-v-video__player",
    VIDEO_OVERLAY: "cmp-v-video__overlay",
    RECIPE_OVERVIEW_VIDEO: ".cmp-recipeoverview__video",
    RECIPE_VIDEO: ".cmp-recipeinstruction__video",
    ICON: ".cmp-v-video__icon-circle",
    VIDEO_OVERLAY_CLASS: ".cmp-v-video__overlay",
    VIDEO_PLAYER_CLASS: ".cmp-v-video__player",
};

export default {
    name: "v-video",
    props: {
        autoplay: {
            type: Boolean,
            default: false,
        },
        videoId: {
            type: String,
            required: false,
        },
        title: {
            type: String,
            required: false,
        },
        overlayImage: {
            type: String,
            required: false,
        },
        imageAltText: {
            type: String,
            required: false,
        },
        loop: {
            type: Boolean,
            default: false,
        },
        startTime: {
            type: String,
            default: '0',
        },
        stopTime: {
            type: String,
            default: '0',
        },
        chapters: {
            type: String,
            required: false,
        },
        showTimestamp: {
            type: Boolean,
            default: false,
        },
        disclaimerText: {
            type: String,
            default: false,
        },
    },
    data() {
        return {
            timestamps: [],
            status: STATUS.STOPPED,
        };
    },
    components: {
        YoutubeVideo,
    },
    computed: {
        isPlaying: function () {
            return this.status === STATUS.PLAYING || this.status === STATUS.BUFFERING;
        },
        showPlayer: function () {
            return !this.hasOverlay() || this.isPlaying;
        },
    },
    methods: {
        hasOverlay() {
            return !!this.overlayImage;
        },
        changeImageHeight(videoComponents) {
            videoComponents.forEach((videoComponent) => {
                if (videoComponent.getElementsByClassName(QUERY.OVERLAY).item(0)) {
                    const imageElement = videoComponent.getElementsByClassName(QUERY.IMAGE).item(0);
                    const overlayElement = videoComponent.getElementsByClassName(QUERY.OVERLAY).item(0);
                    const videoElement = videoComponent.getElementsByClassName(QUERY.VIDEO_PLAYER).item(0);
                    const videoOverLay = videoComponent.getElementsByClassName(QUERY.VIDEO_OVERLAY).item(0);
                    if (overlayElement.offsetHeight >= imageElement.offsetHeight) {
                        imageElement.style.height = overlayElement.offsetHeight + "px";
                        videoElement.style.height = overlayElement.offsetHeight + "px";
                        videoOverLay.style.height = overlayElement.offsetHeight + "px";
                    } else {
                        imageElement.style.height = "100%";
                        videoElement.style.height = "100%";
                        videoOverLay.style.height = "0px";
                    }
                }
            });
        },
        playCurrentVideo() {
            this.setTabIndexNVDA();
            this.status = STATUS.PLAYING;
            this.$nextTick(() => {
                this.$refs.youtube.player.playVideo();
            });
        },
        stopCurrentVideo() {
            this.$refs.youtube.player.stopVideo();
            this.status = STATUS.STOPPED;
            this.resetVideosTabIndex();
        },
        pauseCurrentVideo() {
            this.$refs.youtube.player.pauseVideo();
            this.resetVideosTabIndex();
        },
        seekTo(time) {
            this.$refs.youtube.player.seekTo(time);
        },
        handleTimestampClick(time) {
            this.seekTo(time);
            this.playCurrentVideo();
        },
        onEnded() {
            this.pauseCurrentVideo();
            this.seekTo(parseInt(this.startTime));
            this.status = STATUS.STOPPED;
            this.resetVideosTabIndex();
        },
        onPaused() {
            this.status = STATUS.PAUSED;
            this.resetVideosTabIndex();
        },
        onPlayed() {
            this.status = STATUS.PLAYING;
        },
        onBuffering() {
            this.status = STATUS.BUFFERING;
        },
        // Needed this function for NVDA screen reader as it is not listening to keypress eventlistner 
        setTabIndexNVDA() {
            const circleIcons = document.querySelectorAll(QUERY.VIDEO);
            if (circleIcons) {
                circleIcons.forEach(element => {
                    if (element.querySelector(QUERY.ICON) == document.activeElement) {
                        element.querySelector(QUERY.VIDEO_PLAYER_CLASS)["firstElementChild"].tabIndex = "0";
                    }
                });
            }
        },
        // Needed below two functions for WCAG accessibility
        resetVideosTabIndex() {
            const circleIcons = document.querySelectorAll(QUERY.VIDEO);
            if (circleIcons) {
                circleIcons.forEach(element => {
                    const videoOverlayElement = element.querySelector(QUERY.VIDEO_OVERLAY_CLASS);
                    if (videoOverlayElement) {
                        const videoIFrame = element.querySelector(QUERY.VIDEO_PLAYER_CLASS)["firstElementChild"];
                        if (videoIFrame == document.activeElement) {
                            videoIFrame.tabIndex = "-1";
                            videoIFrame.blur();
                        }
                    }
                });
            }
        },
        setTabIndex() {
            const circleIcons = document.querySelectorAll(QUERY.VIDEO);
            if (circleIcons) {
                circleIcons.forEach(element => {
                    element.addEventListener('keypress', function (e) {
                        if (e.key === 'Enter') {
                            const videoOverlayElement = element.querySelector(QUERY.VIDEO_OVERLAY_CLASS);
                            if (videoOverlayElement) {
                                videoOverlayElement.click();
                                element.querySelector(QUERY.VIDEO_PLAYER_CLASS)["firstElementChild"].tabIndex = "0";
                            }
                        }
                    });
                    element.addEventListener('click', function (e) {
                        const videoOverlayElement = element.querySelector(QUERY.VIDEO_OVERLAY_CLASS);
                        if (videoOverlayElement) {
                            element.querySelector(QUERY.VIDEO_PLAYER_CLASS)["firstElementChild"].tabIndex = "0";
                        }
                    });
                });
            }
        },
        onDocumentReady() {
            // Needed for Zoom accessibility
            const videoComponents = document.querySelectorAll(QUERY.VIDEO);
            if (videoComponents) {
                this.changeImageHeight(videoComponents);
                window.addEventListener("resize", () => {this.changeImageHeight(videoComponents);}); 
            }
            const recipevideos = document.querySelectorAll(QUERY.RECIPE_VIDEO);
            if (recipevideos) {
                this.changeImageHeight(recipevideos);
                window.addEventListener("resize", () => {this.changeImageHeight(recipevideos);}); 
            }
            const recipeOverViewVideo = document.querySelectorAll(QUERY.RECIPE_OVERVIEW_VIDEO);
            if (recipeOverViewVideo) {
                this.changeImageHeight(recipeOverViewVideo);
                window.addEventListener("resize", () => {this.changeImageHeight(recipeOverViewVideo);}); 
            }
            // Needed for WCAG accessibility
            this.setTabIndex();
        },
    },
    mounted() {
        if (this.showTimestamp && this.chapters) {
            this.timestamps = JSON.parse(this.chapters);
        }
        window.onload = (event) => {
            this.onDocumentReady();
        };
    },
};
</script>
