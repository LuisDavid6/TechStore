var idVJ = "04a9ebf9-e34f-4e37-9718-b772b79065ce"
var idPC = "6cf52ae2-bcd0-4305-b623-9f29bd0890ec"

const GtaV = { 
    name: "Grand Theft Auto V",
    price: 99900,
    discount: 10,
    type: "PS4",
    stock: 1,
    image: "https://m.media-amazon.com/images/I/61+s8HfeFoL._SX342_.jpg",
    categoryId: idVJ
}

const GodOfWar = {
    name: "God Of War",
    price: 99900,
    discount: 0,
    type: "PS4",
    stock: 1,
    image: "https://www.gamereactor.es/media/62/godwar_2126213b.png",
    categoryId: idVJ
}

const Horizon = {
    name: "Horizon Zero Dawn",
    price: 119900,
    discount: 20,
    type: "PS4",
    stock: 3,
    image: "https://media.vandal.net/m/26118/horizon-zero-dawn-20173114177_1.jpg",
    categoryId: idVJ
}

const Uncharted4 = {
    name: "Uncharted 4",
    price: 79900,
    discount: 0,
    type: "PS4",
    stock: 5,
    image: "https://i.3djuegos.com/juegos/8184/uncharted_4/fotos/ficha/uncharted_4-4946892.jpg",
    categoryId: idVJ
}

const Spiderman = {
    name: "Spiderman",
    price: 130900,
    discount: 20,
    type: "PS4",
    stock: 7,
    image: "https://m.media-amazon.com/images/I/61FUm20x-OS._SX342_.jpg",
    categoryId: idVJ
}

const Halo5 = {
    name: "Halo 5",
    price: 115900,
    discount: 20,
    type: "Xbox One",
    stock: 1,
    image: "https://areajugones.sport.es/wp-content/uploads/2019/08/Halo_Infinite_cover.jpg",
    categoryId: idVJ
}

const Destiny = {
    name: "Destiny",
    price: 109900,
    discount: 10,
    type: "Xbox One",
    stock: 5,
    image: "https://m.media-amazon.com/images/I/91y6A6dyzxL._SX385_.jpg",
    categoryId: idVJ
}

const pc = {
    name: "Portatil Asus",
    price: 109900,
    discount: 30,
    type: "Asus",
    stock: 4,
    image: "https://www.alianzaparacrecer.com/wp-content/uploads/2019/05/22-23.jpg",
    categoryId: idPC
}
const pc2 = {
    name: "Pc Portatil Gamer Asus",
    price: 2599900,
    discount: 10,
    type: "Asus",
    stock: 3,
    image: "https://www.elespectador.com/resizer/j9NoeYdt_fYoKLlsXx6G_H9EBNQ=/631x420/filters:format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/B6UMTSSJ7VE6DFPWW4TXL6DCUY.jpg",
    categoryId: idPC
}

const pc3 = {
    name: "Computador Dell Inspiron",
    price: 2199900,
    discount: 30,
    type: "Dell",
    stock: 6,
    image: "https://i.dell.com/das/dih.ashx/547w/sites/imagecontent/consumer/merchandizing/en/PublishingImages/Franchise-category/desktop-inspiron-polaris-pdp-design-1.jpg",
    categoryId: idPC
}

const pcMesa = {
    name: "Computador de escritorio",
    price: 1599900,
    discount: 40,
    type: "Acer",
    stock: 8,
    image: "https://liquimarcas.co/wp-content/uploads/2021/06/computador-barato-powergroup-j4040-1.jpg",
    categoryId: idPC
}





const Games = [GtaV, GodOfWar, Horizon, Uncharted4, Spiderman, Halo5, Destiny, pc, pc2, pc3, pcMesa]

export default Games