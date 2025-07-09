
import type { RouteRecordRaw } from 'vue-router';
import FeedbackForm from '../../presentation/pages/FeedbackForm.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'feedback',
    path: '/feedback',
    component: FeedbackForm,
  },
];

export default routes;
