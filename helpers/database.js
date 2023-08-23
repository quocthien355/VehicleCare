const con = require('./config');

// Tạo bảng users
let users = `create table if not exists user(
    id_user int primary key auto_increment,
    number_phone varchar(12) unique not null,
    name nvarchar(255) not null,
    gender nvarchar(10) not null,
    password varchar(255) not null,
    image varchar(255)
)`;

// Bảng trung tâm bảo dưỡng
let centre = `create table if not exists centre(
    id_centre int primary key auto_increment,
    name nvarchar(255) not null,
    locate varchar(255) not null,
    status nvarchar(255) not null,
    note nvarchar(500)
)`;



// Bảng loại xe
let vehicle_category = `create table if not exists vehicle_category(
    id_vehicle_category int primary key auto_increment,
    brand varchar(255) not null,
    type nvarchar(20) not null,
    name varchar(100) not null,
    image varchar(255) not null
)`;

// Bảng nhân viên
let employee = `create table if not exists employee(
    id_employee int primary key auto_increment,
    name nvarchar(255) not null,
    number_phone varchar(12) unique not null,
    password varchar(255) not null,
    position nvarchar(255) not null,
    token varchar(255) unique,
    id_centre int not null,
    foreign key (id_centre) references centre(id_centre)
)`;
// Bảng loại sản phẩm
let product_category = `create table if not exists product_category(
    id_product_category int primary key auto_increment,
    name nvarchar(255) not null
)`;

// Bảng thương hiệu sản phẩm
let product_brand = `create table if not exists product_brand (
    id_product_brand int primary key auto_increment,
    name nvarchar(255) not null
)`;

// Bảng sản phẩm
let products = `create table if not exists product(
    id_product int primary key auto_increment,
    name nvarchar(255) not null,
    id_brand int not null,
    mfg date not null,
    exp date not null,
    useble_km int not null,
    price int not null,
    quantity int not null,
    description longtext,
    id_product_category int not null,
    foreign key (id_product_category) references product_category(id_product_category)
)`;
let image_products = `create table if not exists image_products (
    id_image INT  PRIMARY KEY AUTO_INCREMENT NOT NULL,
    url VARCHAR(255) NOT NULL,
    id_product INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key (id_product)  references product(id_product)
);`

// Bảng xe
let vehicle = `create table if not exists vehicle(
    id_vehicle int primary key auto_increment,
    lisence_plate varchar(20) unique not null,
    km_one_day int,
    id_user int not null,
    id_vehicle_category int not null,
    foreign key (id_user) references user(id_user),
    foreign key (id_vehicle_category) references vehicle_category(id_vehicle_category)
)`;
// Bảng chi tiết sản phẩm
let product_detail = `create table if not exists product_detail(
    id_product int not null,
    id_vehicle_category int not null,
    foreign key(id_product) references product(id_product),
    foreign key(id_vehicle_category) references vehicle_category(id_vehicle_category)
)`;



// Bảng giỏ hàng
let cart = `create table if not exists cart(
    id_cart int primary key auto_increment,
    current_km int not null,
    useable_km int not null,
    customer_locate varchar(255),
    status nvarchar(255) not null,
    rate int,
    feedback nvarchar(1000),
    id_centre int not null,
    id_user int,
    id_employee int not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_delete TIMESTAMP ,
    foreign key (id_centre) references centre(id_centre),
    foreign key (id_user) references user(id_user),
    foreign key (id_employee) references employee(id_employee)
)`;


// Bảng chi tiết giỏ hàng
let cart_detail = `create table if not exists cart_detail(
    id_cart int not null,
    id_product int not null,
    quantity int not null,
    foreign key (id_cart) references cart(id_cart),
    foreign key (id_product) references product(id_product)
)`;

let message = `create table if not exists message(
    id_message int primary key auto_increment,
    message nvarchar(1000) not null,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_chat int not null,
    foreign key (id_chat) references chat(id_chat)
)`;
let chat = `create table if not exists chat(
    id_chat int primary key auto_increment,
    id_user int,
    id_employee int,
    foreign key (id_user) references user(id_user),
    foreign key (id_employee) references employee(id_employee)
)`;
const tables = [users, centre, vehicle_category, employee, product_category, product_brand, products,image_products, vehicle, product_detail, cart, cart_detail, chat, message];

tables.forEach((table) => {
    con.query(table, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
        // console.log('Create table success');
    });
})


