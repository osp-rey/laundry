export default function videoPlayer() {
  const players = document.querySelectorAll(".video-player");

  if (players.length) {
    players.forEach((player) => {
      const btn = player.querySelector(".video-player__btn");
      const video = player.querySelector(".video-player__video");

      player.addEventListener("click", () => {
        if (player.classList.contains("_playing")) {
          player.classList.remove("_playing");
          video.pause();
        } else {
          if (!video.src) {
            const srcVideo = video.dataset.src;
            video.src = srcVideo;
          }
          player.classList.add("_playing");
          video.play();
        }
      });

      video.addEventListener("ended", () => {
        console.log("end");
        player.classList.remove("_playing");
      });
    });
  }
}
