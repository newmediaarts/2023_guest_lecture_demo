
import { lerp } from "./utils/lerp.js";

class App {
  constructor() {
    // Smooth scroll properties
    this.scrollElement = document.querySelector("[smooth-scroll]");
    this.currentScrollPos = 0;
    this.targetScrollPos = 0;
    // Slow down or speed up smooth scroll
    this.scrollEase = 0.1;

    this._initSmoothScroll();
    this._handleResize();
    this._update();
  }

  /*
   * RAF loop for animation callback
   */
  _update() {
    this._smoothScroll();

    this.frame = requestAnimationFrame(this._update.bind(this));
  }

  _initSmoothScroll() {
    // Calcluate the total scrollable height
    document.body.style.height = `${
      this.scrollElement.getBoundingClientRect().height
    }px`;
  }

  _handleResize() {
    window.addEventListener("resize", () => {
      // Debounce
      setTimeout(() => {
        this._initSmoothScroll();
      }, 500);
    });
  }

  _smoothScroll() {
    // Capture the position the sceen would be at with native scroll
    this.targetScrollPos = window.scrollY;

    // Calcluate a value that "eases" to the targetScrollPos
    this.currentScrollPos = lerp(
      this.currentScrollPos,
      this.targetScrollPos,
      this.scrollEase
    );

    this.currentScrollPos = parseFloat(this.currentScrollPos.toFixed(2));

    // Transform the scroll container to the lerp value
    const transformProperty = `translate3d(0, ${
      this.currentScrollPos * -1
    }px, 0)`;

    // Set the transform property to the scroll element container
    this.scrollElement.style.transform = transformProperty;
  }
}

new App();
