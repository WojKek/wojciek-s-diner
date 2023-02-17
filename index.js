import {menuArray} from './data.js' 

let isAnything = false
let customer = ""

// initail render
render()

// event listeners
document.addEventListener('click', function(e){
    if (e.target.dataset.id && e.target.innerHTML === "+") {
        handleAddItemBtn(findItem(e))
    }
    else if (e.target.dataset.id && e.target.innerHTML === "remove") {
        handleRemoveItemBtn(findItem(e))
    } else if (e.target.id === "order-btn"){
        document.getElementById('pop-up').style.display = "block"
    }
})

document.addEventListener('submit', function(e){
        handlePayBtn(e)
})
// renders
function render() {
    document.getElementById('items').innerHTML = getItemsHtml()
    document.getElementById('order').innerHTML = getOrder()
    document.getElementById('thanks').innerHTML = getThanks()     
}    

function getItemsHtml() {
    let itemHtml=''
    menuArray.forEach(function(item){
        itemHtml+=`
                <div class="item-container">
                    <ul>
                        <li>
                            <img class="item-img" src=${item.img}>
                        </li>
                        <li>
                            <p class="item">${item.name}</p>
                            <p class="ingredients">${item.ingredients.toString()}</p>
                            <p class="price">$${item.price}</p>
                        </li>
                        <li class="align-right">
                            <button class="add-btn" id="add-btn" data-id=${item.id}>+</button>
                        </li>
                    </ul>
                </div>`    
    })
    return itemHtml
}

function getOrder() {
    if (!isAnything){
        return null
    }
    let orderHtml = `
                <div class="center-text">
                    <p class="item">Your order</p>
                </div>
                <div class="cart">`
    menuArray.forEach(function(item){
        if (item.count !== 0) {
            orderHtml += `
            <div class="order-item-container">
                <p class="item">${item.name} x ${item.count}</p>
                <button class="remove-btn" data-id=${item.id}>remove</button>
                <p class="item align-right">$${item.price*item.count}</p>
            </div>`
        }
    })
    orderHtml += `
            <div class="total-line order-item-container">
                <p class="item">Total price:</p>
                <p class="item align-right">$${getSum()}</p>
            </div>
                </div>
                <div class="center-text margin-bottom">
                    <button id="order-btn">Complete order</button>
                </div>`
    return orderHtml
}

function getThanks() {
    if(customer){
        return `Thanks, ${customer}! Your order is on its way!`   
    } else return null
}

// functions
function findItem(e){
    const chosenItem = menuArray.filter(function(item){
            return item.id.toString() === e.target.dataset.id
        })[0]
    return chosenItem
}

function handleAddItemBtn(chosenItem){
    menuArray.forEach(function(menuItem){
        if (chosenItem.id === menuItem.id){
            menuItem.count++
        }
    })
    isAnything = true
    render()
}

function handleRemoveItemBtn(chosenItem) {
    chosenItem.count--
    checkIsAnything()
    render()
}

function checkIsAnything(){
    let check = false
    menuArray.forEach(function(item){
        if(item.count>0){
            check = true
        }
    })
    isAnything = check
}

function handlePayBtn(e) {
    e.preventDefault()
    const payFormData = new FormData(e.target)
    customer = payFormData.get('name')
    e.target.parentElement.style.display = "none"
    render()
}

function getSum() {
    let sum = 0
    menuArray.forEach(function(item){
        sum += item.price * item.count
    })
    return sum
}

