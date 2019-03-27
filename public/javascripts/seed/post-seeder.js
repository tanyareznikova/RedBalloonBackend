var Product = require("../../../models/product");
var mongoose = require("mongoose");

// Connect to Mongoose inside of this file for development stage
mongoose.connect(
  "mongodb://localhost:27017/RedBalloonDB",
  { useNewUrlParser: true }
);

var post = [
  new Product({
    title: "Смартфон Samsung Galaxy S10+ (оникс)",
    productIdOnSite: "5472716",
    price: "76990",
    imgUrl:
      "https://static.svyaznoy.ru/upload/iblock/435/13.jpg/resize/483x483/hq",
    description:
      "НЕ ПРОСТО ОСОБЕННЫЙ СМАРТФОН. ЭТО СМАРТФОН БУДУЩЕГО\n" +
        "\n" +
        "В Samsung создали дизайн заново, чтобы вы испытали невероятный опыт погружения в происходящее на экране вашего смартфона. " +
        "Все внимание на экран. " +
        "Высокоточная лазерная обработка, встроенный ультразвуковой сканер отпечатка пальца и новая технология Dynamic AMOLED, " +
        "обеспечивающая комфортный просмотр, - все это иммерсивный экран, самый инновационный в истории Galaxy.",
    link:
      "https://www.svyaznoy.ru/catalog/phone/224/5472716",
    isSaved: false
  }),
  new Product({
    title: "Смартфон Apple iPhone XS Max 512GB (золотистый)",
    productIdOnSite: "4216292",
    price: "116990",
    imgUrl:
        "https://static.svyaznoy.ru/upload/iblock/97c/13.jpg/resize/483x483/hq",
    description:
        "ГЕРОИ БОЛЬШОГО ЭКРАНА\n" +
        "\n" +
        "Дисплей Super Retina в двух размерах, один из которых стал самым большим в истории iPhone. " +
        "Еще более быстрый Face ID. Самый мощный и умный процессор iPhone. " +
        "И потрясающая двойная камера. В iPhone XS воплощено все, что вы любите в iPhone. На новом уровне.",
    link:
        "https://www.svyaznoy.ru/catalog/phone/224/4216292",
    isSaved: true
  }),
  new Product({
    title: "Смартфон Honor 10 Lite 32GB (сапфировый синий)",
    productIdOnSite: "5435975",
    price: "14990",
    imgUrl:
        "https://static.svyaznoy.ru/upload/iblock/f2a/img_4040.jpg/resize/483x483/hq/",
    description:
        "ШИРОКИЙ ОБЗОР \n" +
        "\n" +
        "Honor 10 Lite оснащен безрамочным экраном, выполненным по ведущей в области инновационной технологии. " +
        "Соотношение экрана к передней панели смартфона составляет 90%. 6,21-дюймовый экран, предоставляющий широкий обзор, " +
        "помещен в традиционный 5,2-дюймовый корпус, который удобно держать в руке. ",
    link:
        "https://www.svyaznoy.ru/catalog/phone/224/5435975",
    isSaved: true
  }),
  new Product({
    title: "Смартфон Honor 10 Lite 32GB (небесно-голубой)",
    productIdOnSite: "5435975",
    price: "14990",
    imgUrl: "https://static.svyaznoy.ru/upload/iblock/9ce/img_3670.jpg/resize/307x224/",
    description:
        "ШИРОКИЙ ОБЗОР \n" +
        "\n" +
        "Honor 10 Lite оснащен безрамочным экраном, выполненным по ведущей в области инновационной технологии. " +
        "Соотношение экрана к передней панели смартфона составляет 90%. 6,21-дюймовый экран, предоставляющий широкий обзор, " +
        "помещен в традиционный 5,2-дюймовый корпус, который удобно держать в руке. ",
    link:
        "https://www.svyaznoy.ru/catalog/phone/224/5435957",
    isSaved: true
  }),
  new Product({
    imgUrl: "https://static.svyaznoy.ru/upload/iblock/fa2/img_3671.jpg/resize/483x483/hq/",
    title: "Смартфон Honor 10 Lite 32GB (черный)",
    price: "14990",
    link: "https://www.svyaznoy.ru/catalog/phone/224/5435930",
    isSaved: true
  })

];

var done = 0;

for (var i = 0; i < post.length; i++) {
  // Mongoose saves the collection to the model
  post[i].save(function(err, result) {
    done++;
    if (done === post.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
