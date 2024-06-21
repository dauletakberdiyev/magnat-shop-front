<template>
  <Header/>

  <Search/>

  <section class="banner py-4 px-3 rounded">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
      <div class="carousel-indicators">
        <button v-for="(n,i) in banners.length" type="button" data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="i" :class="(i === 0) ? 'active' : ''" :aria-label="'Slide ' + i" :aria-current="(i === 0)"></button>
      </div>
      <div class="carousel-inner">
        <div v-for="banner in banners" class="carousel-item" :class="(banner.id === 1) ? 'active': ''">
          <img :src="banner.path" class="d-block w-100" alt="banner">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>

  <main class="main py-2 px-3">
    <div class="catalog mb-4" v-for="catalog in categories">
      <router-link :to="{name: 'category', params: {id: parseInt(catalog.id)}}" class="catalog-title f-20 fw-bold mb-3 d-flex text-dark">{{catalog.title}} ></router-link>
      <Carousel v-bind="settings">
        <Slide v-for="product in catalog.products" :key="product.id">
          <div class="carousel__item me-2">
            <div class="d-flex flex-column text-start">
              <img :src="product.image_url" class="card-img-top" alt="product">
              <div class="card-body">
                <span class="card-title f-14 fw-bold">{{product.title}}</span>
                <p class="card-text text-muted f-14">{{product.real_price}} T/шт</p>
                <div class="price d-flex justify-content-between">
                  <span class="card-text fw-bold f-14 fw-bold">{{product.real_price}} T</span>
                  <span v-if="product.discount_price" class="text-decoration-line-through f-14">{{product.discount_price}} Т/шт</span>
                </div>

                <div @click="changeAddButton(product, $event)" class="btn w-100 mt-2 bg-gray-light fw-bold f-14" :id="'addBtn-' + product.id">Добавить
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.18524 16.5169C6.53691 16.5169 6.82274 16.8027 6.82274 17.1544C6.82274 17.5061 6.53691 17.7911 6.18524 17.7911C5.83358 17.7911 5.54858 17.5061 5.54858 17.1544C5.54858 16.8027 5.83358 16.5169 6.18524 16.5169Z" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5622 16.5169C15.9139 16.5169 16.1997 16.8027 16.1997 17.1544C16.1997 17.5061 15.9139 17.7911 15.5622 17.7911C15.2106 17.7911 14.9247 17.5061 14.9247 17.1544C14.9247 16.8027 15.2106 16.5169 15.5622 16.5169Z" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2.29158 2.70831L4.02491 3.00831L4.82741 12.5691C4.89241 13.3483 5.54325 13.9466 6.32491 13.9466H15.4182C16.1649 13.9466 16.7982 13.3983 16.9057 12.6583L17.6966 7.19331C17.7941 6.51915 17.2716 5.91581 16.5907 5.91581H4.30325" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.7712 8.99583H14.082" stroke="#4F4F4F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="btn bg-green-light w-100 mt-2 fw-bold f-14 text-white d-flex justify-content-between d-none" :id="'countBtn-' + product.id">
                  <div @click="removeProductFromBasket(product)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.3249 9.4682C19.3249 9.4682 18.7819 16.2032 18.4669 19.0402C18.3169 20.3952 17.4799 21.1892 16.1089 21.2142C13.4999 21.2612 10.8879 21.2642 8.2799 21.2092C6.9609 21.1822 6.1379 20.3782 5.9909 19.0472C5.6739 16.1852 5.1339 9.4682 5.1339 9.4682" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M20.7082 6.23972H3.7502" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M17.4406 6.2397C16.6556 6.2397 15.9796 5.6847 15.8256 4.9157L15.5826 3.6997C15.4326 3.1387 14.9246 2.7507 14.3456 2.7507H10.1126C9.53359 2.7507 9.02559 3.1387 8.87559 3.6997L8.63259 4.9157C8.47859 5.6847 7.80259 6.2397 7.01759 6.2397" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <span :id="'product-count-' + product.id">1шт</span>
                  <div @click="addCountProduct(product)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8.3273V15.6537" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M15.6667 11.9905H8.33334" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>

<!--        <template #addons>-->
<!--          <Navigation />-->
<!--        </template>-->
      </Carousel>
    </div>

    <button class="btn bg-green-light-opacity text-green w-100 f-16 fw-bold py-3 mt-3 opacity-75">Показать еще</button>

    <paginate
        class="d-flex justify-content-between mt-4"
        :page-count="20"
        :page-range="5"
        :margin-pages="2"
        :click-handler="paginateHandler"
        :prev-text="'<-'"
        :next-text="'->'"
        :containerClass="'pagination'"
        :page-class="'page-item'"
    >
    </paginate>
  </main>
  <Footer/>
</template>

<script setup>
  import Header from "../components/Header.vue";
  import Footer from "../components/Footer.vue";
  import Search from "../components/Search.vue";
  import Paginate from "vuejs-paginate-next";
  import {onMounted, ref} from "vue";
  import { Carousel, Navigation, Slide } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'

  onMounted(() => {
    const allPaginate = document.querySelectorAll('.page-link')
    for (let i = 0; i < allPaginate.length; i++) {
      allPaginate[i].classList.add('f-20')
      if (i === 0) {
        allPaginate[i].innerHTML = '<svg width="27" height="12" viewBox="0 0 27 12" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<rect x="26.9997" y="7" width="25" height="1" rx="0.5" transform="rotate(-180 26.9997 7)" fill="#BDBDBD"/>' +
            '<rect x="6.2926" y="12" width="8" height="1" rx="0.5" transform="rotate(-135 6.2926 12)" fill="#BDBDBD"/>' +
            '<rect x="6.99971" y="1.39343" width="8" height="1" rx="0.5" transform="rotate(135 6.99971 1.39343)" fill="#BDBDBD"/>' +
            '</svg>'
      }
      if (i === allPaginate.length - 1) {
        allPaginate[i].innerHTML = '<svg width="25" height="1" viewBox="0 0 25 1" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<rect width="25" height="1" rx="0.5" fill="#BDBDBD"/>' +
            '</svg>'
      }
    }
  })

  const settings = ref({
    itemsToShow: 2,
    snapAlign: 'start',
  })
  const currentPage = ref(1);

  let basket = ref([])

  const changeAddButton = (product, event) => {
    if(basket[product.id]) {
      basket[product.id] += 1
    }
    else {
      basket[product.id] = 1
    }

    const countBtn = document.querySelector('#countBtn-' + product.id)
    countBtn.classList.remove('d-none')

    const addBtn = document.querySelector('#addBtn-' + product.id)
    addBtn.classList.add('d-none')

    const countProduct = document.querySelector('#product-count-' + product.id)
    countProduct.innerHTML = basket[product.id] + 'шт'
  }

  const addCountProduct = (product) => {
    const countProduct = document.querySelector('#product-count-' + product.id)
    if(basket[product.id]) {
      basket[product.id] += 1
    }
    else {
      basket[product.id] = 1
    }

    countProduct.innerHTML = basket[product.id] + 'шт'
  }

  const removeProductFromBasket = (product) => {
    basket[product.id] = 0

    const countBtn = document.querySelector('#countBtn-' + product.id)
    countBtn.classList.add('d-none')

    const addBtn = document.querySelector('#addBtn-' + product.id)
    addBtn.classList.remove('d-none')
  }

  const paginateHandler = (currentPage) => {
    console.log(currentPage)
  }
  // const breakpoints = ref([
  //   // 700px and up
  //   700: {
  //     itemsToShow: 3.5,
  //     snapAlign: 'center',
  //   },
  //   // 1024 and up
  //   1024: {
  //     itemsToShow: 5,
  //     snapAlign: 'start',
  //   },
  // ]

  const banners = ref([
    {
      id: 1,
      path: '/assets/cost.png',
    },
    {
      id: 2,
      path: '/assets/about.png',
    },
    {
      id: 3,
      path: '/assets/delivery.png',
    },
    {
      id: 4,
      path: '/assets/faq.png',
    },
    {
      id: 5,
      path: '/assets/pay.png',
    }
  ])

  const categories = ref([
    {
      id: 1,
      title: "Новинки для вас",
      products: [
        {
          id: 1,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: false,
          real_price: 2000,
          discount_price: 3000,
          image_url: '/assets/product.png',
        },
        {
          id: 2,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 3,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 4,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 5,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: false,
          real_price: 100,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 6,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: false,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 7,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
      ]
    },
    {
      id: 2,
      title: "Напитки",
      products: [
        {
          id: 1,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: false,
          real_price: 2000,
          discount_price: 3000,
          image_url: '/assets/product.png',
        },
        {
          id: 2,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 3,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 4,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 5,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: false,
          real_price: 100,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 6,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: false,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 7,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
      ]
    },
    {
      id: 3,
      title: "Молочные продукты",
      products: [
        {
          id: 1,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: false,
          real_price: 2000,
          discount_price: 3000,
          image_url: '/assets/product.png',
        },
        {
          id: 2,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 3,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 4,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 5,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: false,
          real_price: 100,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 6,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: false,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 7,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
      ]
    },
    {
      id: 4,
      title: "Хоз продукты",
      products: [
        {
          id: 1,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: false,
          real_price: 2000,
          discount_price: 3000,
          image_url: '/assets/product.png',
        },
        {
          id: 2,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 3,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 4,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 5,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: false,
          real_price: 100,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 6,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: false,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
        {
          id: 7,
          title: "Инмарко Золотой Стандат пломбир...",
          is_exist: true,
          real_price: 1999,
          discount_price: null,
          image_url: '/assets/product.png',
        },
      ]
    }
  ])
</script>

<style scoped>
  .bg-green-light{
    background-color: #53C95A;
  }
  .bg-green-light-opacity{
    background-color: rgba(83, 201, 90, 0.5);
  }
  .pagination li.active-pagination a{
    background-color: #53C95A;
    color: #fff;
  }
  .product-carousel-item {
    margin-right: .1em;
    padding-right: .5em;
  }
  .img-wrapper {
    max-width: 100%;
    height: 11em;
  }
  @media screen and (min-width: 576px) {
    .product-carousel-inner {
      display: flex;
    }
    .product-carousel-item {
      display: block;
      flex: 0 0 calc(100%/3);
    }
    .img-wrapper {
      height: 23vw;
    }
  }
  @media screen and (max-width: 575px) {
    .product-carousel-inner {
      display: flex;
    }
    .product-carousel-item {
      display: block;
      flex: 0 0 calc(100%/2);
    }
  }
</style>