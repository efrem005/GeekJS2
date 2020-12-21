const URL = 'https://raw.githubusercontent.com/efrem005/json/master/responses/jsonProduct.json'
const cartDiv = document.querySelector('.cart__menu-block')
const price = document.getElementById('cartCent')
const div = document.getElementById('product')
const bas = document.querySelector('.fetured__block')
const countLength = document.getElementById('countLength')

let store = []
let cart = []
let count = 0

function countIn() {
  return count++
}

function renderBasket() {
  countLength.innerHTML = cart.length
  if (cart.length === 0) {
    cartDiv.innerHTML = `<h4>Корзина пуста</h4>`
  } else {
    cartDiv.innerHTML = cart.map((el) => cartHtml(el)).join('')
  }
}

const product = ({id, img, title = 'MANGO PEOPLE T-SHIRT', price}) => `
    <div class="fetured__item">
      <div class="fetured__item-header">
        <img src=${img} alt="123" />
      </div>
      <div class="fetured__item-main">
        <div class="fetured__item-title">${title}</div>
        <div class="fetured__item-price">$ ${price}</div>
      </div>
      <div class="fetured__item-hover" >
        <div class="fetured__item-cart" id="${id}">
          <img src="img/cart-1.png" alt="" id="${id}"/>
          <span id="${id}">Add to Cart</span>
        </div>
      </div>
    </div>`

const cartHtml = ({img, title = 'MANGO PEOPLE T-SHIRT', price}) => `
  <div class="cart__menu_items">
    <img src=${img} alt="carts" />
    <div class="cart__menu_items-content">
      <h2>${title}</h2>
      <span>S</span>
      <p>1 x $ ${price}</p>
    </div>
    <button>
      <i class="fas fa-times-circle"></i>
    </button>
  </div>`

fetch(URL)
  .then((response) => response.json())
  .then((json) => { store = json; renderHtml(json) })
  .catch((err) => console.log(err))

const renderHtml = (prod) => (div.innerHTML = render(prod).join(''))

const render = (prod) => prod.map((el) => product(el))

const summCart = () => cart.reduce((acc, el) => acc + el.price, 0)

bas.addEventListener('click', (e) => {
  const id = parseInt(e.target.getAttribute('id'))
  if (id) {
    cart.push({idCount: countIn(), ...store.find((el) => el.id === id)})
    renderBasket()
    price.innerHTML = summCart()
  }
})

renderBasket()

