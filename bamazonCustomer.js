var mysql = require('mysql');
var inquirer = require('inquirer');
var input = process.stdin;
input.setEncoding('utf-8');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'bamazon',
    port: 8889
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
function returnProducts() {
    connection.query("SELECT * FROM product", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < 10; i++) {
            console.log("Item ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: $" + res[i].price);
            query1 = 'SELECT * FROM product';
        }
    }
    )
};
function start() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "What is the ID of the product you'd like to purchase?"
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like?"
        }
    ])
        .then(function (input) {
            var purchase = input.item_id;
            var amount = input.amount;
            var query1 = 'SELECT * FROM product WHERE ?';

            connection.query(query1, { item_id: purchase }, function (err, data) {
                var userInput = data[0];
                if (err) throw err;
                if (data.length === null) {
                    console.log("You need to enter an ID");
                }

                else if (amount <= userInput.stock_quantity) {

                    var updateQuantity = (userInput.stock_quantity - amount);
                    console.log("Your item has been purchased. The new quantity count for this item is " + updateQuantity +
                        " and the item identification number is " + purchase + ". Thank you, come again.");

                }
                else {
                    console.log("Unfortunately, we do not have enough of the selected item(s) in stock. Your order did not go through. There are/is only " +
                        userInput.stock_quantity + " left in stock.");
                }
                process.exit()
            }
            )
        }
        )
}

returnProducts();
start();