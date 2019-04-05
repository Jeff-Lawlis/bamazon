USE bamazon;

CREATE TABLE product (
	item_id INTEGER(30) 	NOT NULL,
    product_name VARCHAR (30) NOT NULL,
    department_name VARCHAR(30),
    price INTEGER(10),
    stock_quantity INTEGER (100)
    )