// Gallery items. Images are bundled from src/assets/images/gallery/ —
// replace each file with a real project photo of the same name.
import shopWorkshop from "../assets/images/gallery/shop-workshop.svg";
import androidStereoInstall from "../assets/images/gallery/android-stereo-install.svg";
import headlightUpgrade from "../assets/images/gallery/headlight-upgrade.svg";
import reverseCameraSetup from "../assets/images/gallery/reverse-camera-setup.svg";
import seatCoverFitting from "../assets/images/gallery/seat-cover-fitting.svg";
import alloyWheelFitment from "../assets/images/gallery/alloy-wheel-fitment.svg";
import ceramicCoating from "../assets/images/gallery/ceramic-coating.svg";
import fullCustomization from "../assets/images/gallery/full-customization.svg";
import accessoriesDisplay from "../assets/images/gallery/accessories-display.svg";

export const gallery = [
  { id: 1, category: "Accessories", title: "Car Accessories Display", image: accessoriesDisplay },
  { id: 2, category: "Android Systems", title: "Android Stereo Install", image: androidStereoInstall },
  { id: 3, category: "Exterior", title: "Alloy Wheel Fitment", image: alloyWheelFitment },
  { id: 4, category: "Detailing", title: "Ceramic Coating", image: ceramicCoating },
  { id: 5, category: "Shop", title: "Our Workshop", image: shopWorkshop },
  { id: 6, category: "LED & Electrical", title: "Headlight Upgrade", image: headlightUpgrade },
  { id: 7, category: "Camera & Safety", title: "Reverse Camera Setup", image: reverseCameraSetup },
  { id: 8, category: "Interior", title: "Seat Cover Fitting", image: seatCoverFitting },
  { id: 9, category: "Completed Projects", title: "Full Customization", image: fullCustomization },
];

export const galleryCategories = [
  "All",
  ...Array.from(new Set(gallery.map((g) => g.category))),
];
