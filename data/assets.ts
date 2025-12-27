import { Asset, AssetType } from '../types';

const ASSET_ROOT = 'https://www.bkamharic.com/storyplay/assets';
const IMAGES_BASE = `${ASSET_ROOT}/images`;
const STORIES_BASE = `${IMAGES_BASE}/stories`;
const ILLUST_BASE = `${STORIES_BASE}/illustrations`;
const FLASH_AUDIO_BASE = `${ASSET_ROOT}/audio/flashcards`;
const PRINTABLES_BASE = `${IMAGES_BASE}/printables`;

export const assets: Asset[] = [
  // === CHARACTERS ===
  { id: 'char-abebe-idle', type: AssetType.Image, url: `${IMAGES_BASE}/characters/char-abebe-idle.png`, filename: 'char-abebe-idle.png' },
  { id: 'char-almaz-idle', type: AssetType.Image, url: `${IMAGES_BASE}/characters/char-almaz-idle.png`, filename: 'char-almaz-idle.png' },
  { id: 'char-lia-idle', type: AssetType.Image, url: `${IMAGES_BASE}/characters/char-lia-idle.png`, filename: 'char-lia-idle.png' },
  
  // === STORY COVERS ===
  { id: 'cover-abebes-dog', type: AssetType.Image, url: `${STORIES_BASE}/covers/story_cover_abebes-dog.jpg` },
  { id: 'cover-almaz-market', type: AssetType.Image, url: `${STORIES_BASE}/covers/story_cover_almaz-went-to-the-market.jpg` },
  { id: 'cover-school-day', type: AssetType.Image, url: `${STORIES_BASE}/covers/story_cover_my-school-day.jpg` },
  { id: 'cover-playing-together', type: AssetType.Image, url: `${STORIES_BASE}/covers/story_cover_playing-together.jpg` },
  { id: 'cover-helping-mama', type: AssetType.Image, url: `${STORIES_BASE}/covers/story_cover_helping-mama.jpg` },
  { id: 'cover-bedtime', type: AssetType.Image, url: `${STORIES_BASE}/scenes/scene_bedtime_s6-sc1.jpg` },

  // === STORY 1: ABEBE'S DOG (Underscore Standard) ===
  { id: 'ill-dog-s1-p1-abebe-with-dog', type: AssetType.Image, url: `${ILLUST_BASE}/ill_dog_s1_p1_abebe-with-dog.jpg` },
  { id: 'ill-dog-s1-p2-jonny-name-tag', type: AssetType.Image, url: `${ILLUST_BASE}/ill_dog_s1_p2_jonny-name-tag.jpg` },
  { id: 'ill-dog-s1-p3-jonny-is-big', type: AssetType.Image, url: `${ILLUST_BASE}/ill_dog_s1_p3_jonny-is-big.jpg` },
  { id: 'ill-dog-s1-p4-jonny-is-brown', type: AssetType.Image, url: `${ILLUST_BASE}/ill_dog_s1_p4_jonny-is-brown.jpg` },
  { id: 'ill-dog-s1-p5-jonny-runs', type: AssetType.Image, url: `${ILLUST_BASE}/ill_dog_s1_p5_jonny-runs.jpg` },
  { id: 'ill-dog-s1-p6-jonny-plays', type: AssetType.Image, url: `${ILLUST_BASE}/ill_dog_s1_p6_jonny-plays.jpg` },
  { id: 'ill-dog-s1-p7-jonny-eats', type: AssetType.Image, url: `${ILLUST_BASE}/ill_dog_s1_p7_jonny-eats.jpg` },
  { id: 'ill-dog-s1-p8-jonny-drinks', type: AssetType.Image, url: `${ILLUST_BASE}/ill_dog_s1_p8_jonny-drinks.jpg` },
  { id: 'ill-dog-s1-p9-abebe-hugs-jonny', type: AssetType.Image, url: `${ILLUST_BASE}/ill_dog_s1_p9_abebe-hugs-jonny.jpg` },
  { id: 'ill-dog-s1-p10-jonny-happy', type: AssetType.Image, url: `${ILLUST_BASE}/ill_dog_s1_p10_jonny-happy.jpg` },

  // === STORY 2: ALMAZ MARKET (Confirmed Underscores) ===
  { id: 'ill-market-s2-p1-intro-almaz', type: AssetType.Image, url: `${ILLUST_BASE}/ill_market_s2_p1_intro-almaz.jpg` },
  { id: 'ill-market-s2-p2-market-scene', type: AssetType.Image, url: `${ILLUST_BASE}/ill_market_s2_p2_market-scene.jpg` },
  { id: 'ill-market-s2-p3-almaz-walks-to-market', type: AssetType.Image, url: `${ILLUST_BASE}/ill_market_s2_p3_almaz-walks-to-market.jpg` },
  { id: 'ill-market-s2-p4-almaz-holds-basket', type: AssetType.Image, url: `${ILLUST_BASE}/ill_market_s2_p4_almaz-holds-basket.jpg` },
  { id: 'ill-market-s2-p5-almaz-buys-banana', type: AssetType.Image, url: `${ILLUST_BASE}/ill_market_s2_p5_almaz-buys-banana.jpg` },
  { id: 'ill-market-s2-p6-yellow-banana', type: AssetType.Image, url: `${ILLUST_BASE}/ill_market_s2_p6_yellow-banana.jpg` },
  { id: 'ill-market-s2-p7-almaz-buys-tomato', type: AssetType.Image, url: `${ILLUST_BASE}/ill_market_s2_p7_almaz-buys-tomato.jpg` },
  { id: 'ill-market-s2-p8-red-tomato', type: AssetType.Image, url: `${ILLUST_BASE}/ill_market_s2_p8_red-tomato.jpg` },
  { id: 'ill-market-s2-p9-full-basket', type: AssetType.Image, url: `${ILLUST_BASE}/ill_market_s2_p9_full-basket.jpg` },
  { id: 'ill-market-s2-p10-almaz-is-happy', type: AssetType.Image, url: `${ILLUST_BASE}/ill_market_s2_p10_almaz-is-happy.jpg` },

  // === STORY 3: SCHOOL DAY ===
  { id: 'ill-school-s3-p1-lia-goes-to-school', type: AssetType.Image, url: `${ILLUST_BASE}/ill_school_s3_p1_lia-goes-to-school.jpg` },
  { id: 'ill-school-s3-p2-lia-greets-teacher', type: AssetType.Image, url: `${ILLUST_BASE}/ill_school_s3_p2_lia-greets-teacher.jpg` },
  { id: 'ill-school-s3-p3-lia-sits-down', type: AssetType.Image, url: `${ILLUST_BASE}/ill_school_s3_p3_lia-sits-down.jpg` },
  { id: 'ill-school-s3-p4-lia-with-book', type: AssetType.Image, url: `${ILLUST_BASE}/ill_school_s3_p4_lia-with-book.jpg` },
  { id: 'ill-school-s3-p5-lia-learns-numbers', type: AssetType.Image, url: `${ILLUST_BASE}/ill_school_s3_p5_lia-learns-numbers.jpg` },
  { id: 'ill-school-s3-p6-lia-draws-picture', type: AssetType.Image, url: `${ILLUST_BASE}/ill_school_s3_p6_lia-draws-picture.jpg` },
  { id: 'ill-school-s3-p7-red-flower', type: AssetType.Image, url: `${ILLUST_BASE}/ill_school_s3_p7_red-flower.jpg` },
  { id: 'ill-school-s3-p8-lia-likes-school', type: AssetType.Image, url: `${ILLUST_BASE}/ill_school_s3_p8_lia-likes-school.jpg` },
  { id: 'ill-school-s3-p9-school-is-finished', type: AssetType.Image, url: `${ILLUST_BASE}/ill_school_s3_p9_school-is-finished.jpg` },
  { id: 'ill-school-s3-p10-lia-waves-goodbye', type: AssetType.Image, url: `${ILLUST_BASE}/ill_school_s3_p10_lia-waves-goodbye.jpg` },

  // === STORY 4: PLAYING TOGETHER ===
  { id: 'ill-playing-s4-p1-dawit-and-desta', type: AssetType.Image, url: `${ILLUST_BASE}/ill_playing_s4_p1_dawit-and-desta.jpg` },
  { id: 'ill-playing-s4-p2-dawit-has-ball', type: AssetType.Image, url: `${ILLUST_BASE}/ill_playing_s4_p2_dawit-has-ball.jpg` },
  { id: 'ill-playing-s4-p3-big-red-ball', type: AssetType.Image, url: `${ILLUST_BASE}/ill_playing_s4_p3_big-red-ball.jpg` },
  { id: 'ill-playing-s4-p4-desta-wants-to-play', type: AssetType.Image, url: `${ILLUST_BASE}/ill_playing_s4_p4_desta-wants-to-play.jpg` },
  { id: 'ill-playing-s4-p5-desta-asks-to-play', type: AssetType.Image, url: `${ILLUST_BASE}/ill_playing_s4_p5_desta-asks-to-play.jpg` },
  { id: 'ill-playing-s4-p6-dawit-says-yes', type: AssetType.Image, url: `${ILLUST_BASE}/ill_playing_s4_p6_dawit-says-yes.jpg` },
  { id: 'ill-playing-s4-p7-dawit-kicks-ball', type: AssetType.Image, url: `${ILLUST_BASE}/ill_playing_s4_p7_dawit-kicks-ball.jpg` },
  { id: 'ill-playing-s4-p8-desta-catches-ball', type: AssetType.Image, url: `${ILLUST_BASE}/ill_playing_s4_p8_desta-catches-ball.jpg` },
  { id: 'ill-playing-s4-p9-playing-together', type: AssetType.Image, url: `${ILLUST_BASE}/ill_playing_s4_p9_playing-together.jpg` },
  { id: 'ill-playing-s4-p10-they-are-happy', type: AssetType.Image, url: `${ILLUST_BASE}/ill_playing_s4_p10_they-are-happy.jpg` },

  // === STORY 5: HELPING MAMA ===
  { id: 'ill-helping-s5-p1', type: AssetType.Image, url: `${ILLUST_BASE}/ill_helping_s5_p1.jpg` },
  { id: 'ill-helping-s5-p2', type: AssetType.Image, url: `${ILLUST_BASE}/ill_helping_s5_p2.jpg` },
  { id: 'ill-helping-s5-p3', type: AssetType.Image, url: `${ILLUST_BASE}/ill_helping_s5_p3.jpg` },
  { id: 'ill-helping-s5-p4', type: AssetType.Image, url: `${ILLUST_BASE}/ill_helping_s5_p4.jpg` },
  { id: 'ill-helping-s5-p5', type: AssetType.Image, url: `${ILLUST_BASE}/ill_helping_s5_p5.jpg` },
  { id: 'ill-helping-s5-p6', type: AssetType.Image, url: `${ILLUST_BASE}/ill_helping_s5_p6.jpg` },
  { id: 'ill-helping-s5-p7', type: AssetType.Image, url: `${ILLUST_BASE}/ill_helping_s5_p7.jpg` },
  { id: 'ill-helping-s5-p8', type: AssetType.Image, url: `${ILLUST_BASE}/ill_helping_s5_p8.jpg` },
  { id: 'ill-helping-s5-p9', type: AssetType.Image, url: `${ILLUST_BASE}/ill_helping_s5_p9.jpg` },
  { id: 'ill-helping-s5-p10', type: AssetType.Image, url: `${ILLUST_BASE}/ill_helping_s5_p10.jpg` },

  // === STORY 6: BEDTIME ===
  { id: 'ill-bedtime-s6-p1-night-sky', type: AssetType.Image, url: `${ILLUST_BASE}/ill_bedtime_s6_p1_night-sky.jpg` },
  { id: 'ill-bedtime-s6-p2-abel-is-tired', type: AssetType.Image, url: `${ILLUST_BASE}/ill_bedtime_s6_p2_abel-is-tired.jpg` },
  { id: 'ill-bedtime-s6-p3-abel-washes-face', type: AssetType.Image, url: `${ILLUST_BASE}/ill_bedtime_s6_p3_abel-washes-face.jpg` },
  { id: 'ill-bedtime-s6-p4-abel-brushes-teeth', type: AssetType.Image, url: `${ILLUST_BASE}/ill_bedtime_s6_p4_abel-brushes-teeth.jpg` },
  { id: 'ill-bedtime-s6-p5-abel-wears-pajamas', type: AssetType.Image, url: `${ILLUST_BASE}/ill_bedtime_s6_p5_abel-wears-pajamas.jpg` },
  { id: 'ill-bedtime-s6-p6-papa-reads-book', type: AssetType.Image, url: `${ILLUST_BASE}/ill_bedtime_s6_p6_papa-reads-book.jpg` },
  { id: 'ill-bedtime-s6-p7-lion-in-book', type: AssetType.Image, url: `${ILLUST_BASE}/ill_bedtime_s6_p7_lion-in-book.jpg` },
  { id: 'ill-bedtime-s6-p8-abel-in-bed', type: AssetType.Image, url: `${ILLUST_BASE}/ill_bedtime_s6_p8_abel-in-bed.jpg` },
  { id: 'ill-bedtime-s6-p9-abel-says-goodnight', type: AssetType.Image, url: `${ILLUST_BASE}/ill_bedtime_s6_p9_abel-says-goodnight.jpg` },
  { id: 'ill-bedtime-s6-p10-abel-is-sleeping', type: AssetType.Image, url: `${ILLUST_BASE}/ill_bedtime_s6_p10_abel-is-sleeping.jpg` },

  // === AUDIO GREETINGS ===
  { id: 'aud-g-1', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_greetings_hello.mp3` },
  { id: 'aud-g-2', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_greetings_how-are-you-m-.mp3` },
  { id: 'aud-g-3', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_greetings_how-are-you-f-.mp3` },
  { id: 'aud-g-4', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_greetings_thank-you.mp3` },
  { id: 'aud-g-5', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_greetings_please-m-.mp3` },
  { id: 'aud-g-6', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_greetings_yes.mp3` },
  { id: 'aud-g-7', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_greetings_no.mp3` },
  { id: 'aud-g-8', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_greetings_sorry-excuse-me.mp3` },
  { id: 'aud-g-9', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_greetings_goodbye.mp3` },

  // === VOCABULARY AUDIO (EXTENDED) ===
  { id: 'aud-f-1', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_family_mother.mp3` },
  { id: 'aud-a-1', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_animals_dog.mp3` },
  { id: 'aud-fd-11', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_food_banana.mp3` },
  { id: 'aud-fd-3', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_food_tomato.mp3` },
  { id: 'aud-fd-12', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_food_carrot.mp3` },
  { id: 'aud-c-4', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_colors_yellow.mp3` },
  { id: 'aud-c-1', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_colors_red.mp3` },
  { id: 'aud-c-8', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_colors_orange.mp3` },
  { id: 'aud-o-2', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_other_big.mp3` },
  { id: 'aud-o-3', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_other_market.mp3` },
  { id: 'aud-o-4', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_other_day.mp3` },
  { id: 'aud-o-5', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_other_basket.mp3` },
  { id: 'aud-o-8', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_other_kitchen.mp3` },
  { id: 'aud-o-9', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_other_night.mp3` },
  { id: 'aud-s-6', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_school_school.mp3` },
  { id: 'aud-ac-12', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_actions_help.mp3` },
  { id: 'aud-fd-13', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_food_dinner.mp3` },
  { id: 'aud-nt-6', type: AssetType.AudioMp3, url: `${FLASH_AUDIO_BASE}/flashcard_nature_moon.mp3` },
  
  // === PRINTABLES ===
  { id: 'thumb-coloring-abebe', type: AssetType.Image, url: `${PRINTABLES_BASE}/gallery_abebe_colored.jpg` },
  { id: 'thumb-worksheet-numbers', type: AssetType.Image, url: `${PRINTABLES_BASE}/thumb_worksheet_numbers.jpg` },
  { id: 'thumb-worksheet-animals', type: AssetType.Image, url: `${PRINTABLES_BASE}/thumb_worksheet_animals.jpg` },
  { id: 'file-coloring-abebe', type: AssetType.Pdf, url: `${PRINTABLES_BASE}/coloring_abebe.pdf`, filename: 'coloring_abebe.pdf' },
  { id: 'file-worksheet-numbers', type: AssetType.Pdf, url: `${PRINTABLES_BASE}/worksheet_numbers.pdf`, filename: 'worksheet_numbers.pdf' },
  { id: 'file-worksheet-animals', type: AssetType.Pdf, url: `${PRINTABLES_BASE}/worksheet_animals.pdf`, filename: 'worksheet_animals.pdf' },
  
  // === GALLERY ART ===
  { id: 'gallery-abebe-colored', type: AssetType.Image, url: `${PRINTABLES_BASE}/gallery_abebe_colored.jpg` },
  { id: 'gallery-animals-cutout', type: AssetType.Image, url: `${IMAGES_BASE}/community/gallery_animals_cutout.png` },
  { id: 'gallery-numbers-practice', type: AssetType.Image, url: `${PRINTABLES_BASE}/gallery_numbers_practice.jpg` },
  { id: 'gallery-abebe-creative', type: AssetType.Image, url: `${PRINTABLES_BASE}/gallery_abebe_creative.jpg` },
  { id: 'gallery-numbers-colored', type: AssetType.Image, url: `${PRINTABLES_BASE}/gallery_numbers_colored.jpg` },
  { id: 'gallery-animals-family', type: AssetType.Image, url: `${PRINTABLES_BASE}/gallery_animals_family.jpg` },
];

/** 
 * Helper function to retrieve an asset by its ID. 
 */
export const getAsset = (id?: string) => assets.find(a => a.id === id);