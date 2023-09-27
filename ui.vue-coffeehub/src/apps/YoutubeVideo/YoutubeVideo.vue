<template>
    <div ref="player"></div>
</template>

<script>
import YouTubePlayer from 'youtube-player';

export default {
    name : "YoutubeVideo",
    props: {
        videoid : { type:String, required:true },

        /** 
         * This parameter specifies whether the initial video will automatically start to play when the player loads. 
         * (Supported values are 0 or 1. The default value is 0.)
         */
        autoplay: { type:Number, default:0, validator: (v) => Number(v)===0||Number(v)===1 },
        /** 
         * This parameter indicates whether the video player controls are displayed 
         * (Supported values are 0 or 1. The default value is 1.)
         */
        controls: { type:Number, default: 1, validator: (v) => Number(v)===0||Number(v)===1 },
        /** 
         * In the case of a single video player, a setting of 1 causes the player to play the initial video again and again. 
         * (Supported values are 0 or 1. The default value is 1.)
         */
        loop : { type:Number, default:1, validator: (v) => Number(v)===0||Number(v)===1 },
        /**
         * This parameter causes the player to begin playing the video at the given number of seconds from the start of the video.
         * (Supported values above 0. The default value is 0.)
         */
        start : { type:Number, default:0, required:false },
        /**
         * This parameter specifies the time, measured in seconds from the start of the video, when the player should stop playing the video. 
         * (Supported values above 0. The default value is 0.)
         */
        end : { type:Number, default:0, required:false },
    },
    data() {
        return {
            ready : 0,
        };
    },
    mounted() {
        this.player = YouTubePlayer(this.$refs.player, {
            host: "https://www.youtube.com",
            videoId: this.videoid,
            playerVars:  {
                autoplay : this.autoplay,
                controls : this.controls,
                loop : this.loop,
                start : this.start,
                end : this.end
            }
        });
        this.player.on('stateChange', (e) => {
            if (e.data === window.YT.PlayerState.ENDED) {
                this.$emit('ended');
            } else if (e.data === window.YT.PlayerState.PAUSED) {
                this.$emit('paused');
            } else if (e.data === window.YT.PlayerState.PLAYING) {
                this.$emit('played');
            } else if (e.data === window.YT.PlayerState.BUFFERING) {
                this.$emit('buffering');
            }
        });
    },
    destroyed() {
        this.player.destroy()
        delete this.player
    },
    watch : {
        videoid() {
            this.player.loadVideoById(this.videoid);
            this.player.playVideo();
        },
        list() {
            this.player.getPlaylist(this.list)
            this.player.playVideo();
        }
    }
};
</script>
