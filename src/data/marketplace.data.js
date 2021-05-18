import dm from '../assets/category_thumbnails/digital_marketing.jpg'
import gd from '../assets/category_thumbnails/graphic&design.jpg'
import pt from '../assets/category_thumbnails/programming&tech.png'
import va from '../assets/category_thumbnails/video&animation.jpg'
import wa from '../assets/category_thumbnails/writing&animation.jpg'


const GIG_CATEGORIES = {
  'Graphic & Design': [
    'Logo Design',
    'Brand Style Guides',
    'Business Cards & Stationery',
  ],
  'Digital Marketing': [
    'Marketing Strategy',
    'Social Media Marketing',
    'Social Media Advertising',
    'Search Engine Optimization (SEO)',
    'Local SEO',
  ],
  'Writing & Animation': [
    'Articles & Blog Posts',
    'Translation',
    'Proofreading & Editing',
    'Resume Writing',
  ],
  'Video & Animation': [
    'Whiteboard & Animated Explainers',
    'Video Editing',
    'Short Video Ads',
    'Lyric & Music Videos',
  ],
  'Programming & Tech': [
    'WordPress',
    'Website Builders & CMS',
    'Game Development',
    'Development for StreamersNEW',
    'Web Programming',
  ],
}

const CATEGORY_THUMBNAILS = {
  'Graphic & Design': gd,
  'Digital Marketing': dm,
  'Writing & Animation': wa,
  'Video & Animation': va,
  'Programming & Tech': pt
}

export { GIG_CATEGORIES, CATEGORY_THUMBNAILS }