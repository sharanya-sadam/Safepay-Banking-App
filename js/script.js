let generatedOTP;
let currentUser = "";

// users
const users = {
    "admin": "1234",
    "sharanya": "1111",
    "guest": "0000"
};

function validateLogin()
{
let user=document.getElementById("username").value;
let pass=document.getElementById("password").value;

if(users[user] && users[user]===pass)
{
localStorage.setItem("currentUser", user);
window.location="dashboard.html";
return false;
}

else
{
alert("Invalid Login");
return false;
}
}

function getBalance()
{
let user = localStorage.getItem("currentUser");
let key = "balance_" + user;

let balance = localStorage.getItem(key);

if(balance === null)
{
balance = 5000;
localStorage.setItem(key,balance);
}

return parseInt(balance);
}

function updateBalance(newBalance)
{
let user = localStorage.getItem("currentUser");
let key = "balance_" + user;

localStorage.setItem(key,newBalance);
}

function sendOTP()
{
generatedOTP=Math.floor(1000 + Math.random()*9000);

alert("Your OTP is: "+generatedOTP);

document.getElementById("otpSection").style.display="block";

return false;
}

function verifyOTP()
{
let entered=document.getElementById("otpInput").value;
let receiver=document.getElementById("receiver").value;
let amount=parseInt(document.getElementById("amount").value);

let balance = getBalance();

if(entered==generatedOTP)
{

if(amount>balance)
{
document.getElementById("message").innerHTML="Insufficient Balance";
return;
}

balance = balance - amount;

updateBalance(balance);

saveTransaction(receiver,amount);

document.getElementById("message").innerHTML="Transaction Successful";

}

else
{
document.getElementById("message").innerHTML="Invalid OTP";
}
}

function saveTransaction(receiver,amount)
{

let user = localStorage.getItem("currentUser");

let key = "transactions_" + user;

let transactions = JSON.parse(localStorage.getItem(key)) || [];

let newTransaction = {

date:new Date().toLocaleDateString(),
receiver:receiver,
amount:amount

};

transactions.push(newTransaction);

localStorage.setItem(key,JSON.stringify(transactions));

}