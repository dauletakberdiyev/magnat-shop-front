import HomePage from '../pages/HomePage.vue'
import CategoryPage from "../pages/CategoryPage.vue";
import BasketPage from "../pages/BasketPage.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/category/:id',
        name: 'category',
        component: CategoryPage,
        props: true
    },
    {
        path: '/category/:id/sub-category/:sub_category_id',
        name: 'sub_category',
        component: CategoryPage,
        props: true
    },
    {
        path: '/basket',
        name: 'basket',
        component: BasketPage,
    }
]

export default routes