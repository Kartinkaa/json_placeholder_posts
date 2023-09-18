import { createStore } from 'vuex'
import { postModule } from '../store/postModule.ts'

export default createStore({
  state: {
    isAuth: true,
  },
  modules: {
    post: postModule,
  },
})
