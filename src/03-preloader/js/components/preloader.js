/*
 * A smart preloader that increments a load percentage
 * based off the progress of large assets loaded
 * */
export function initPreloader() {
  // Select preloader elements to update
  const preloaderElement = document.querySelector(".preloader");
  const progressElement = preloaderElement.querySelector(
    ".preloader__progress"
  );

  // Update query selector for elements you want to add (ex: 'video, img')
  const assetsToLoad = document.querySelectorAll("video");

  // Calculate the total amount of assets to load and amount currently loaded
  const totalAssets = assetsToLoad.length;
  let numberOfLoadedAssets = 0;

  // Create a conditional statement to add different logic for different asset types
  assetsToLoad.forEach((asset, index) => {
    switch (asset.tagName.toLowerCase()) {
      case "video":
        // Get the placeholder "data-src" attribute and change it to the "src"
        // You want to have this effect so that you can run a callback
        // when the asset loads
        const srcValue = asset.getAttribute("data-src");
        asset.setAttribute("src", srcValue);

        // Run a preloader update once the asset has been loaded
        asset.addEventListener("loadeddata", () => {
          if (asset.readyState >= 3) {
            numberOfLoadedAssets += 1;
            updatePreloader(
              preloaderElement,
              progressElement,
              totalAssets,
              numberOfLoadedAssets
            );
          }
        });

      /*
       * Example logic for preloading images as well
       * case 'img':
       *   console.log('logic for an image')
       */
      default:
        break;
    }
  });
}

function updatePreloader(preloaderEl, progressEl, total, loaded) {
  // Create a percentage value based off the ratio of
  // currently loaded assets and total amount to load
  const percentage = (loaded / total) * 100;

  // Update the progress value in preloader
  progressEl.innerText = `${percentage}%`;

  // Once all assets have been loaded then remove the preloader
  if (percentage === 100) {
    preloaderEl.classList.add("preloader--loaded");
  }
}
