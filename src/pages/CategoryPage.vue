<template>
  <Header/>

  <Search/>
  <main class="centered">
    <div>
      <span class="f-12 me-1" :class="props.sub_category_id ? 'text-muted' : 'text-green'">{{category.title}}</span>
      <svg v-if="props.sub_category_id" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.54175 2.08329L6.45841 4.99996L3.54175 7.91663" stroke="#4F4F4F" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="f-12 text-green ms-1" v-if="props.sub_category_id">{{category.sub_categories[props.sub_category_id - 1].title}}</span>
    </div>
    <div class="row row-cols-2 row-cols-sm-3 row-cols-md-6 mt-2">
      <div class="col mb-3 pointer" v-for="sub_category in category.sub_categories">
        <router-link :to="{name: 'sub_category', params: {id: props.id, sub_category_id: sub_category.id}}" class="f-12 rounded bg-gray-light text-dark py-2 px-3">{{sub_category.title}}</router-link>
      </div>
    </div>
    <div class="text-center mt-3">
      <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4">
        <div class="col" v-for="product in category.products">
          <div class="d-flex flex-column text-start mb-4">
            <img :src="product.image_url" class="card-img-top" alt="product">
            <div class="card-body">
              <span class="card-title f-14 fw-bold">{{product.title}}</span>
              <p class="card-text text-muted f-14">{{product.real_price}} &#8376;/шт</p>
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
      </div>
    </div>

    <router-link v-if="totalSum !== 0" :to="{name: 'basket', query: {basket: JSON.stringify(basket.values()), totalSum: totalSum}}" class="w-100 d-flex justify-content-between bg-green-light text-light py-2 px-3 rounded f-14 align-items-center">
      <div>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42245 19.8938C7.84445 19.8938 8.18745 20.2381 8.18745 20.6616C8.18745 21.0852 7.84445 21.4285 7.42245 21.4285C7.00045 21.4285 6.65845 21.0852 6.65845 20.6616C6.65845 20.2381 7.00045 19.8938 7.42245 19.8938Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M18.6749 19.8938C19.0969 19.8938 19.4399 20.2381 19.4399 20.6616C19.4399 21.0852 19.0969 21.4285 18.6749 21.4285C18.2529 21.4285 17.9099 21.0852 17.9099 20.6616C17.9099 20.2381 18.2529 19.8938 18.6749 19.8938Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2.75 3.26196L4.83 3.6233L5.793 15.1389C5.871 16.0774 6.652 16.798 7.59 16.798H18.502C19.398 16.798 20.158 16.1376 20.287 15.2463L21.236 8.66395C21.353 7.85195 20.726 7.12526 19.909 7.12526H5.164" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.1255 10.8349H16.8985" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="ps-2">
          Перейти в корзину
        </span>
      </div>
      <div class="fw-bold">
        {{totalSum}} &#8376;
      </div>
    </router-link>
  </main>
  <Footer/>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import {onMounted, ref} from "vue";
import Search from "../components/Search.vue";

const props = defineProps({
  id: {
    required: true,
    type: Number
  },
  sub_category_id: {
    required: false,
    type: Number
  }
})

const settings = ref({
  itemsToShow: 4,
  snapAlign: 'start',
})

let basket = ref([])
let totalSum = ref(0)

const changeAddButton = (product, event) => {
  if(basket[product.id]) {
    basket[product.id] += 1
    totalSum.value += product.real_price
  }
  else {
    basket[product.id] = 1
    totalSum.value += product.real_price
  }
  console.log(basket)
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
    totalSum.value += product.real_price
  }
  else {
    basket[product.id] = 1
    totalSum.value += product.real_price
  }
  console.log(basket)
  countProduct.innerHTML = basket[product.id] + 'шт'
}

const removeProductFromBasket = (product) => {
  totalSum.value -= (category.value.products[product.id-1].real_price * basket[product.id])
  console.log(totalSum.value)
  basket[product.id] = 0


  const countBtn = document.querySelector('#countBtn-' + product.id)
  countBtn.classList.add('d-none')

  const addBtn = document.querySelector('#addBtn-' + product.id)
  addBtn.classList.remove('d-none')
}

const category = ref({
  id: props.id,
  title: 'Фермерская лавка',
  sub_categories: [
    {
      id: 1,
      title: "Мясо, птица"
    },
    {
      id: 2,
      title: "Молоко, сыр"
    },
    {
      id: 3,
      title: "Мясо, птица"
    },
    {
      id: 4,
      title: "Мясо, птица"
    },
  ],
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
})
onMounted(() => {
  console.log(typeof props.id)
})
</script>
<style scoped>

</style>