// Service catalogue for Accessories Land.
// Images are imported from src/assets/images/services/<slug>/ — Vite bundles
// these at build time, so there's no dependency on an external image host.
//
// The generated placeholders (simple labeled panels) are there so the site
// runs out of the box. Replace each file inside that folder with a real
// photo of the same name and everything below keeps working unchanged.

import acCoolingCover from "../assets/images/services/ac-cooling/cover.svg";
import acService from "../assets/images/services/ac-cooling/ac-service.svg";
import gasFilling from "../assets/images/services/ac-cooling/gas-filling.svg";
import coolingSystem from "../assets/images/services/ac-cooling/cooling-system.svg";

import androidCover from "../assets/images/services/android-systems/cover.svg";
import androidStereo from "../assets/images/services/android-systems/android-stereo.svg";
import appleCarplay from "../assets/images/services/android-systems/apple-carplay.svg";
import speakers from "../assets/images/services/android-systems/speakers.svg";

import cameraCover from "../assets/images/services/camera-safety/cover.svg";
import reverseCamera from "../assets/images/services/camera-safety/reverse-camera.svg";
import camera360 from "../assets/images/services/camera-safety/360-camera.svg";
import dashcam from "../assets/images/services/camera-safety/dashcam.svg";

import ledCover from "../assets/images/services/led-electrical/cover.svg";
import ledLights from "../assets/images/services/led-electrical/led-lights.svg";
import fogLamps from "../assets/images/services/led-electrical/fog-lamps.svg";
import horns from "../assets/images/services/led-electrical/horns.svg";
import wiring from "../assets/images/services/led-electrical/wiring.svg";

import securityCover from "../assets/images/services/security-systems/cover.svg";
import centralLocking from "../assets/images/services/security-systems/central-locking.svg";
import carAlarm from "../assets/images/services/security-systems/car-alarm.svg";
import gpsTracking from "../assets/images/services/security-systems/gps-tracking.svg";

import interiorCover from "../assets/images/services/interior-accessories/cover.svg";
import seatCovers from "../assets/images/services/interior-accessories/seat-covers.svg";
import floorMats from "../assets/images/services/interior-accessories/floor-mats.svg";
import armrests from "../assets/images/services/interior-accessories/armrests.svg";

import exteriorCover from "../assets/images/services/exterior-accessories/cover.svg";
import bodyKits from "../assets/images/services/exterior-accessories/body-kits.svg";
import rainVisors from "../assets/images/services/exterior-accessories/rain-visors.svg";
import alloyWheels from "../assets/images/services/exterior-accessories/alloy-wheels.svg";

import detailingCover from "../assets/images/services/car-detailing/cover.svg";
import carPolishing from "../assets/images/services/car-detailing/car-polishing.svg";
import ceramicCoating from "../assets/images/services/car-detailing/ceramic-coating.svg";
import interiorCleaning from "../assets/images/services/car-detailing/interior-cleaning.svg";

export const services = [
  {
    slug: "ac-cooling",
    title: "Car AC & Cooling",
    icon: "Snowflake",
    plate: "SVC-01",
    description:
      "Full air-conditioning care to keep every drive comfortable, from regas to complete cooling-system diagnostics.",
    image: acCoolingCover,
    features: [
      { name: "AC Service", image: acService },
      { name: "Gas Filling", image: gasFilling },
      { name: "Cooling System", image: coolingSystem },
    ],
  },
  {
    slug: "android-systems",
    title: "Android Systems",
    icon: "Monitor",
    plate: "SVC-02",
    description:
      "Modern in-car entertainment — Android touchscreens, wireless CarPlay, and clear, powerful sound.",
    image: androidCover,
    features: [
      { name: "Android Stereo", image: androidStereo },
      { name: "Apple CarPlay", image: appleCarplay },
      { name: "Speakers", image: speakers },
    ],
  },
  {
    slug: "camera-safety",
    title: "Camera & Safety",
    icon: "Camera",
    plate: "SVC-03",
    description:
      "See what you can't. Reverse, 360°, and dashcam systems that add a real layer of confidence on the road.",
    image: cameraCover,
    features: [
      { name: "Reverse Camera", image: reverseCamera },
      { name: "360° Camera", image: camera360 },
      { name: "Dashcam", image: dashcam },
    ],
  },
  {
    slug: "led-electrical",
    title: "LED & Electrical",
    icon: "Zap",
    plate: "SVC-04",
    description:
      "Brighter, sharper, safer — headlight upgrades, fog lamps, horns, and clean wiring work.",
    image: ledCover,
    features: [
      // Headlight-specific service -> headlight-specific image
      { name: "LED Lights", image: ledLights },
      { name: "Fog Lamps", image: fogLamps },
      { name: "Horns", image: horns },
      { name: "Wiring", image: wiring },
    ],
  },
  {
    slug: "security-systems",
    title: "Security Systems",
    icon: "ShieldCheck",
    plate: "SVC-05",
    description:
      "Central locking, alarms, and GPS tracking to keep the vehicle protected around the clock.",
    image: securityCover,
    features: [
      { name: "Central Locking", image: centralLocking },
      { name: "Car Alarm", image: carAlarm },
      { name: "GPS Tracking", image: gpsTracking },
    ],
  },
  {
    slug: "interior-accessories",
    title: "Interior Accessories",
    icon: "Armchair",
    plate: "SVC-06",
    description:
      "Comfort and finish for the cabin — seat covers, floor mats, and armrests fitted to your car.",
    image: interiorCover,
    features: [
      { name: "Seat Covers", image: seatCovers },
      { name: "Floor Mats", image: floorMats },
      { name: "Armrests", image: armrests },
    ],
  },
  {
    slug: "exterior-accessories",
    title: "Exterior Accessories",
    icon: "CarFront",
    plate: "SVC-07",
    description:
      "Body kits, rain visors, and alloy wheels that sharpen the way your car looks and handles.",
    image: exteriorCover,
    features: [
      { name: "Body Kits", image: bodyKits },
      { name: "Rain Visors", image: rainVisors },
      { name: "Alloy Wheels", image: alloyWheels },
    ],
  },
  {
    slug: "car-detailing",
    title: "Car Detailing",
    icon: "Sparkles",
    plate: "SVC-08",
    description:
      "Polishing, ceramic coating, and deep interior cleaning that bring back the showroom finish.",
    image: detailingCover,
    features: [
      { name: "Car Polishing", image: carPolishing },
      { name: "Ceramic Coating", image: ceramicCoating },
      { name: "Interior Cleaning", image: interiorCleaning },
    ],
  },
];
