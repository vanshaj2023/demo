/** Company reel videos — loaded via glob to handle special characters in filenames */
const videoModules = import.meta.glob('./assets/videos/*.mp4', { eager: true, query: '?url', import: 'default' });

const videos = Object.values(videoModules);

/** Company reel videos — home grid, HeaderReels, PDP wild strip (12 slots, cycles 6 videos) */
export const SCRAPSHALA_SHOP_VIDEOS = [
  ...videos,
  ...videos,
].slice(0, 12);

/** Floating draggable reel on the product (PDP) page */
export const PDP_DRAGGABLE_VIDEO = SCRAPSHALA_SHOP_VIDEOS[3];
