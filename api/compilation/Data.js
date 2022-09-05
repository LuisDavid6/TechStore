"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//production
var idVJ = "64de5016-d95a-4a25-bc43-cbda90cd8dc3";
var idPC = "31784bfe-9bb2-4f50-b321-b1f15cfb0258";
var idCelu = "5575d2d9-d5ca-4f22-a4cc-71553b3fb905";
//local
// var idVJ = "a5eb44d8-ae20-44a5-b641-584d39c14e2a"
// var idPC = "fd33d495-7359-4b9a-9238-c5be03f09783"
// var idCelu = "d7dda341-efc8-4b01-be49-1fcef1c0d77c"
const GtaV = {
    name: "Grand Theft Auto V",
    price: 99900,
    totalPrice: 89910,
    discount: 10,
    type: "PS4",
    stock: 1,
    image: "https://m.media-amazon.com/images/I/61+s8HfeFoL._SX342_.jpg",
    categoryId: idVJ
};
const GodOfWar = {
    name: "God Of War",
    price: 99900,
    totalPrice: 89910,
    discount: 10,
    type: "PS4",
    stock: 1,
    image: "https://www.gamereactor.es/media/62/godwar_2126213b.png",
    categoryId: idVJ
};
const Horizon = {
    name: "Horizon Zero Dawn",
    price: 119900,
    totalPrice: 95920,
    discount: 20,
    type: "PS4",
    stock: 3,
    image: "https://media.vandal.net/m/26118/horizon-zero-dawn-20173114177_1.jpg",
    categoryId: idVJ
};
const Uncharted4 = {
    name: "Uncharted 4",
    price: 79900,
    totalPrice: 79900,
    discount: 0,
    type: "PS4",
    stock: 5,
    image: "https://i.3djuegos.com/juegos/8184/uncharted_4/fotos/ficha/uncharted_4-4946892.jpg",
    categoryId: idVJ
};
const Spiderman = {
    name: "Spiderman",
    price: 130900,
    totalPrice: 104720,
    discount: 20,
    type: "PS4",
    stock: 7,
    image: "https://m.media-amazon.com/images/I/61FUm20x-OS._SX342_.jpg",
    categoryId: idVJ
};
const Halo5 = {
    name: "Halo 5",
    price: 115900,
    totalPrice: 92720,
    discount: 20,
    type: "Xbox One",
    stock: 1,
    image: "https://areajugones.sport.es/wp-content/uploads/2019/08/Halo_Infinite_cover.jpg",
    categoryId: idVJ
};
const Destiny = {
    name: "Destiny",
    price: 115900,
    totalPrice: 92720,
    discount: 10,
    type: "Xbox One",
    stock: 5,
    image: "https://m.media-amazon.com/images/I/91y6A6dyzxL._SX385_.jpg",
    categoryId: idVJ
};
const pc = {
    name: "Portatil Asus",
    price: 1609900,
    totalPrice: 1126930,
    discount: 30,
    type: "Asus",
    stock: 4,
    image: "https://www.alianzaparacrecer.com/wp-content/uploads/2019/05/22-23.jpg",
    categoryId: idPC
};
const pc2 = {
    name: "Pc Portatil Gamer Asus",
    price: 2590900,
    totalPrice: 2331810,
    discount: 10,
    type: "Asus",
    stock: 3,
    image: "https://www.elespectador.com/resizer/j9NoeYdt_fYoKLlsXx6G_H9EBNQ=/631x420/filters:format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/B6UMTSSJ7VE6DFPWW4TXL6DCUY.jpg",
    categoryId: idPC
};
const pc3 = {
    name: "Computador Dell Inspiron",
    price: 2199900,
    totalPrice: 1539930,
    discount: 30,
    type: "Dell",
    stock: 6,
    image: "https://i.dell.com/das/dih.ashx/547w/sites/imagecontent/consumer/merchandizing/en/PublishingImages/Franchise-category/desktop-inspiron-polaris-pdp-design-1.jpg",
    categoryId: idPC
};
const pcMesa = {
    name: "Computador de escritorio Acer",
    price: 2599900,
    totalPrice: 1819930,
    discount: 30,
    type: "Acer",
    stock: 8,
    image: "https://liquimarcas.co/wp-content/uploads/2021/06/computador-barato-powergroup-j4040-1.jpg",
    categoryId: idPC
};
const MotoG22 = {
    name: "Motorola G 22",
    price: 990900,
    totalPrice: 792720,
    discount: 20,
    type: "Motorola",
    stock: 8,
    image: "https://cdn.shopify.com/s/files/1/0074/2290/2323/products/Celular-Motorola-G22-128Gb-4Gb-RAM_420x.png?v=1655543008",
    categoryId: idCelu
};
const SamsungA12 = {
    name: "Samsung Galaxy A12",
    price: 849900,
    totalPrice: 896720,
    discount: 20,
    type: "Samsung",
    stock: 8,
    image: "https://compras.tigo.com.co/arquivos/ids/159151-1000-1000/Samsung-Galaxy-A12-Azul.1.png?v=637546331653900000",
    categoryId: idCelu
};
const Games = [GtaV, GodOfWar, Horizon, Uncharted4, Spiderman, Halo5, Destiny, pc, pc2, pc3, pcMesa, MotoG22, SamsungA12];
exports.default = Games;
//# sourceMappingURL=Data.js.map