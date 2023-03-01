import { lerp } from "./utils/lerp";
import { initPreloader } from "./components/preloader";
import {workGallery} from './components/workGallery'

class App {
  constructor() {
    // Smooth scroll properties
    this.scrollElement = document.querySelector("[smooth-scroll]");
    this.currentScrollPos = 0;
    this.targetScrollPos = 0;
    this.scrollEase = 0.1;

    this.workGalleryElements = document.querySelectorAll(".work");

    this._initSmoothScroll();
    // RequestAnimationFrame timestamp
    this._update();

    this._createPage();
  }

  /** @method update
   * RequestAnimationFrame loop, animation callbacks
   * can be run here
   */
  _update() {
    // Run smooth scroll for every frame
    this._smoothScroll();
    this.frame = requestAnimationFrame(this._update.bind(this));
  }

  _createPage() {
    initPreloader();

      if(this.workGalleryElements.length > 0){

          this.workGalleryElements.forEach((gallery) => workGallery(gallery))
      }
  }

  _initSmoothScroll() {
    // Calculate total scrollable height
    document.body.style.height = `${
      this.scrollElement.getBoundingClientRect().height
    }px`;
  }

  _smoothScroll() {
    // Capture the position the screen would be at with native scroll
    this.targetScrollPos = window.scrollY;
    // Calculate a value that "eases" to the targetScrollPosition
    this.currentScrollPos = lerp(
      this.currentScrollPos,
      this.targetScrollPos,
      this.scrollEase
    );

    // Transform the scroll container to the lerp value
    const transformProperty = `translate3d(0, ${
      this.currentScrollPos * -1
    }px, 0)`;

    this.scrollElement.style.transform = transformProperty;
  }
}

new App();
