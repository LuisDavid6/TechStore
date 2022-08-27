"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var idVJ = "123e13d8-8f3a-4b83-b3b5-f05b8b186b5d";
var idPC = "e5fbc5d4-16f0-4e74-a35f-216e91604f72";
var idCelu = "ff18b18d-7ca6-40f3-a273-79867802f609";
const GtaV = {
    name: "Grand Theft Auto V",
    price: 99900,
    totalPrice: 89990,
    discount: 10,
    type: "PS4",
    stock: 1,
    image: "https://m.media-amazon.com/images/I/61+s8HfeFoL._SX342_.jpg",
    categoryId: idVJ
};
const GodOfWar = {
    name: "God Of War",
    price: 99900,
    totalPrice: 89990,
    discount: 0,
    type: "PS4",
    stock: 1,
    image: "https://www.gamereactor.es/media/62/godwar_2126213b.png",
    categoryId: idVJ
};
const Horizon = {
    name: "Horizon Zero Dawn",
    price: 119900,
    totalPrice: 99990,
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
    totalPrice: 119990,
    discount: 20,
    type: "PS4",
    stock: 7,
    image: "https://m.media-amazon.com/images/I/61FUm20x-OS._SX342_.jpg",
    categoryId: idVJ
};
const Halo5 = {
    name: "Halo 5",
    price: 115900,
    totalPrice: 89990,
    discount: 20,
    type: "Xbox One",
    stock: 1,
    image: "https://areajugones.sport.es/wp-content/uploads/2019/08/Halo_Infinite_cover.jpg",
    categoryId: idVJ
};
const Destiny = {
    name: "Destiny",
    price: 109900,
    totalPrice: 89990,
    discount: 10,
    type: "Xbox One",
    stock: 5,
    image: "https://m.media-amazon.com/images/I/91y6A6dyzxL._SX385_.jpg",
    categoryId: idVJ
};
const pc = {
    name: "Portatil Asus",
    price: 1609900,
    totalPrice: 1489990,
    discount: 30,
    type: "Asus",
    stock: 4,
    image: "https://www.alianzaparacrecer.com/wp-content/uploads/2019/05/22-23.jpg",
    categoryId: idPC
};
const pc2 = {
    name: "Pc Portatil Gamer Asus",
    price: 2599900,
    totalPrice: 2449990,
    discount: 10,
    type: "Asus",
    stock: 3,
    image: "https://www.elespectador.com/resizer/j9NoeYdt_fYoKLlsXx6G_H9EBNQ=/631x420/filters:format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/B6UMTSSJ7VE6DFPWW4TXL6DCUY.jpg",
    categoryId: idPC
};
const pc3 = {
    name: "Computador Dell Inspiron",
    price: 2199900,
    totalPrice: 2009990,
    discount: 30,
    type: "Dell",
    stock: 6,
    image: "https://i.dell.com/das/dih.ashx/547w/sites/imagecontent/consumer/merchandizing/en/PublishingImages/Franchise-category/desktop-inspiron-polaris-pdp-design-1.jpg",
    categoryId: idPC
};
const pcMesa = {
    name: "Computador de escritorio",
    price: 1599900,
    totalPrice: 1129990,
    discount: 40,
    type: "Acer",
    stock: 8,
    image: "https://liquimarcas.co/wp-content/uploads/2021/06/computador-barato-powergroup-j4040-1.jpg",
    categoryId: idPC
};
const MotoG22 = {
    name: "Motorola G 22",
    price: 899900,
    totalPrice: 699900,
    discount: 20,
    type: "Motorola",
    stock: 8,
    image: "https://cdn.shopify.com/s/files/1/0074/2290/2323/products/Celular-Motorola-G22-128Gb-4Gb-RAM_420x.png?v=1655543008",
    categoryId: idCelu
};
const SamsungA12 = {
    name: "Samsung Galaxy A12",
    price: 849900,
    totalPrice: 649900,
    discount: 20,
    type: "Samsung",
    stock: 8,
    image: "https://compras.tigo.com.co/arquivos/ids/159151-1000-1000/Samsung-Galaxy-A12-Azul.1.png?v=637546331653900000",
    categoryId: idCelu
};
const Games = [GtaV, GodOfWar, Horizon, Uncharted4, Spiderman, Halo5, Destiny, pc, pc2, pc3, pcMesa, MotoG22, SamsungA12];
exports.default = Games;
//# sourceMappingURL=Data.js.map