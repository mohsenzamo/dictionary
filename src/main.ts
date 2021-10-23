import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBook, faPlayCircle, faAlignJustify, faBookmark, faVolumeOff, faSearch, faBookReader, faUsers, faGlobe, faTools, faClock, faCouch, faPalette, faBriefcaseMedical, faUserNurse, faQuestionCircle, faCloudSun, faLock, faArrowRight, faSpellCheck, faTimes, faPencilAlt, faCheckCircle, faTimesCircle, faUserTie, faWallet, faAddressCard, faFrown, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { faTelegram, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'
library.add(faBook, faPlayCircle, faTelegram, faInstagram, faFrown, faAlignJustify, faVolumeUp, faBookmark, faArrowRight, faVolumeOff, faSearch, faBookReader, faUsers, faGlobe, faTools, faClock, faCouch, faPalette, faBriefcaseMedical, faUserNurse, faQuestionCircle, faCloudSun, faLock, faArrowRight, faTimes, faSpellCheck, faPencilAlt, faCheckCircle, faTimesCircle, faUserTie, faWallet, faAddressCard)

createApp(App).component('fa', FontAwesomeIcon).use(createPinia()).use(router).mount('#app')
