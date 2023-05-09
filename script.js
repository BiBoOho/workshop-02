//ເປັນການອ້າງອິງ Element ໃນ HTML
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

//ສ້າງ array ເປົ່າ
let transactions = [];

//ເອື້ນໃຊ້ function init() ເພື່ອ loop ຂໍ້ມູນທັ່ງໝົດອອກມາ
function init() {
    transactions.forEach(addDataToList);
    calculateMoney();
}


//ການກອງຂໍ້ມູນ
function addDataToList(transactions) {
    //ຖ້າໜ້ອຍກ່ວາ 0 ໃຫ້ເປັນເຄື່ອງໝາຍ - 
    //ຖ້າຫຼາຍກ່ວາ 0 ໃຫ້ເປັນເຄື່ອງໝາຍ + 
    const symbol = transactions.amount < 0 ? '-' : '+';
    const status = transactions.amount < 0 ? 'minus' : 'plus';
    const item = document.createElement('li');
    let result = formatNumber(Math.abs(transactions.amount));
    item.classList.add(status);
    // item.innerHTML = 'ຄ່າແປງລົດ <span>- ฿400</span><button class="delete-btn">x</button>';
    item.innerHTML = `${transactions.text} <span>${symbol} ${result}</span><button class="delete-btn" onclick="removeData(${transactions.id})">x</button>`;
    // console.log(item);
    //ເພີ່ມເຂົ້າໄປໃນ LIST ດ້ວຍ appendChild
    list.appendChild(item);
}

//ແປງ format ຂອງຕົວເລກ
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

// ສ້າງໄອດີ
function autoID() {
    return Math.floor(Math.random() * 999999);
}

function calculateMoney() {
    const amonts = transactions.map(transaction => transaction.amount);
    // ຄຳນວນຍອດຄົງເຫຼືອ
    const total = amonts.reduce((result, item) => (result += item), 0).toFixed(2);
    // ຄຳນວນລາຍຮັບ
    const income = amonts.filter(item => item > 0).reduce((result, item) => (result += item), 0).toFixed(2);
    // ຄຳນວນລາຍຈ່າຍ 
    const expanse = (amonts.filter(item => item < 0).reduce((result, item) => (result += item), 0) * -1).toFixed(2);

    //ແປງ format number
    let format_total = formatNumber(total);
    let format_income = formatNumber(income);
    let format_expanse = formatNumber(expanse);
    //ການສະແດງຜົນ
    balance.innerText = `฿${format_total}`;
    money_plus.innerText = `฿${format_income}`;
    money_minus.innerText = `฿${format_expanse}`;
}
//ການລົບຂໍ້ມູນອອກຈາກ array ໂດຍຫານຕັດ id ທີ່ບໍ່ຕ້ອງການອອກ
function removeData(id){
    list.innerHTML = '';
    transactions = transactions.filter(transactions => transactions.id !== id);
    init();
}

//ເພີ່ມຂໍ້ມູນຈາກ form
function addTransaction(e) {
    e.preventDefault(); //ບໍ່ໃຫ້ໜ້າເວັບ Reload
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ');
    } else {
        const data = {
            id: autoID(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(data);
        addDataToList(data);
        calculateMoney();
        text.value='';
        amount.value='';
    }
}

//ເມ່ື່ອກົດບັນທຶກ form
form.addEventListener('submit', addTransaction);

init();