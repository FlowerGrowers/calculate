// 结点获取
const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


// 实现虚拟数据的存储
// const dummyTranction = [{
// 	id: 1,
// 	text: '鲜花',
// 	amount: -20
// }, {
// 	id: 2,
// 	text: '薪酬',
// 	amount: 300
// }, {
// 	id: 3,
// 	text: '书籍',
// 	amount: -10
// }, {
// 	id: 4,
// 	text: '相机',
// 	amount: 150
// }];


// 
const localStroageTranction = JSON.parse(localStorage.getItem('transactions'));



let transactions = localStroageTranction!==null?localStroageTranction:[];

// 添加transactionDOM结点
function addTransactionDOM(transaction) {
	// 判断是支出还是收入
	const sign = transaction.amount < 0 ? '-' : '+';
	// 创建li标签
	const li = document.createElement('li');

	// 基于金额正负添加类名
	li.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

	li.innerHTML =
		`
	${transaction.text}<span>
		${sign}${Math.abs(transaction.amount)}
	</span>
	<button type="button" class="del-btn" onclick="deleteTranction(${transaction.id})">X</button>
	`;
	list.appendChild(li);

}

// 更新余额 收入 支出
function updateValues() {
	const amounts = transactions.map(transaction => transaction.amount);
	const plusTotal = amounts.filter(item => {
		if (item > 0) {
			return item;
		}
	}).reduce((pre,cur)=>(pre += cur),0).toFixed(2);
	const minusTotal = amounts.filter(item => {
		if (item < 0) {
			return item;
		}
	}).reduce((pre,cur)=>(pre += cur),0).toFixed(2);
	const blance = transactions.reduce((pre, current) => {
		pre = pre + current.amount;
		return pre;
	}, 0).toFixed(2);
	moneyPlus.innerHTML = `
		+${plusTotal}
	`;
	moneyMinus.innerHTML = `
		${minusTotal}
	`;
	balance.innerHTML = `
		$ ${blance}
	`
}

// addNewTrade 增加新纪录
function addNewTrade(e){
	e.preventDefault();
	// 验证输入框为空
	if(!text.value.trim()||!amount.value.trim()){
		alert('请输入事件');
	}else{
		let length = transactions.length;
		const transaction = {
		id: length+1,
		text: text.value,
		amount: +amount.value
	};
	transactions.push(transaction);
	addTransactionDOM(transaction);
	updateValues();
	updateLocalStroage(transactions);
	amount.value = '';
	text.value = '';
	}
	
}

// deleteTranction 删除(历史记录)
function deleteTranction(id){
	 transactions = transactions.filter(transaction=>transaction.id !== id);
	 updateLocalStroage(transactions);
	init();
}


// updateLocalStroage 更新本地数据
function updateLocalStroage(transactions){
	localStorage.setItem('transactions',JSON.stringify(transactions))
}



// 初始化应用 
function init() {
	list.innerHTML = '';
	transactions.forEach(addTransactionDOM);
	updateValues();
}

init();

form.addEventListener('submit',addNewTrade);

