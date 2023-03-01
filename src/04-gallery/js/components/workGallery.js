export function workGallery(element) {
  // Get all links and videos
  const links = element.querySelectorAll("a");
  const videos = element.querySelectorAll("video");

  links.forEach((link, linkIndex) => {
      // Remove active state when mouse is not over link
    link.addEventListener("mouseleave", () => {
      link.removeAttribute("active");
    });

    // When a link is moused over play the video with the same index
    link.addEventListener("mouseover", () => {
      link.setAttribute("active", "");
      videos.forEach((video, videoIndex) => {
        if (videoIndex === linkIndex) {
          video.style.setProperty("--video-height", "100%");
          video.play();
        } else {
          video.style.setProperty("--video-height", "0%");
          video.pause();
        }
      });
    });
  });
}
