import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faChevronRight, faHome, faWifi, faBook, faPlayCircle, faCopyright, faAlignJustify, faBookmark, faVolumeOff, faSearch, faBookReader, faUsers, faGlobe, faTools, faClock, faCouch, faPalette, faBriefcaseMedical, faUserNurse, faQuestionCircle, faCloudSun, faLock, faArrowRight, faSpellCheck, faTimes, faPencilAlt, faCheckCircle, faTimesCircle, faUserTie, faWallet, faAddressCard, faFrown, faVolumeUp, faArrowUp, faArrowDown, faDownload } from '@fortawesome/free-solid-svg-icons'
import { faTelegram, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'
library.add(faChevronLeft, faChevronRight, faHome, faWifi, faDownload, faBook, faTwitter, faCopyright, faPlayCircle, faTelegram, faInstagram, faFrown, faAlignJustify, faArrowUp, faVolumeUp, faBookmark, faArrowRight, faVolumeOff, faSearch, faBookReader, faUsers, faGlobe, faTools, faClock, faCouch, faPalette, faBriefcaseMedical, faUserNurse, faQuestionCircle, faCloudSun, faLock, faArrowRight, faTimes, faSpellCheck, faPencilAlt, faCheckCircle, faTimesCircle, faUserTie, faWallet, faAddressCard, faArrowDown)

createApp(App).component('fa', FontAwesomeIcon).use(createPinia()).use(router).mount('#app')
