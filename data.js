const exchangeRate = {
  "eurToUah": 51.5358,
  "source": "Monobank",
  "updated": "2026-07-18"
};

const products = [
  {
    "id": "PV-0001",
    "sku": "J0001",
    "category": "Прикраси",
    "brand": "Swarovski",
    "name": "Підвіска з синім каменем",
    "currency": "EUR",
    "price": 110,
    "status": "available",
    "dateAdded": "2026-06-24",
    "description": "Синє кільце кулон стильна підвіска у формі об'ємного синього кола з яскравим блиском маленьким камінням на срібному ланцюжку.\nЯскрава, сучасна ефектна прикраса в подарунковій синій коробочці чудовий варіант для тих, хто любить незвичайні акценти",
    "images": [
      "images/J0001/1.jpg"
    ]
  },
  {
    "id": "PV-0002",
    "sku": "J0002",
    "category": "Прикраси",
    "brand": "Swarovski",
    "name": "Кришталеве серце",
    "currency": "EUR",
    "price": 140,
    "status": "available",
    "dateAdded": "2026-06-24",
    "description": "Елегантне кришталеве серце Swarovski...",
    "images": [
      "images/J0002/1.jpg",
      "images/J0002/2.jpg",
      "images/J0002/3.jpg"
    ]
  },
  {
    "id": "PV-0003",
    "sku": "J0003",
    "category": "Прикраси",
    "brand": "Swarovski",
    "name": "Серце з шармами",
    "currency": "EUR",
    "price": 110,
    "status": "available",
    "dateAdded": "2026-06-24",
    "description": "Срібне серце з шармами - витончений кулон у вигляді великого відкритого серця, прикрашеного блискучим камінням, з підвісками у вигляді рожевого серця, ключа і ще одного серця на тонкій срібній ланцюжку.\nРомантична ніжна прикраса, яка ідеально передає настрій кохання та стане чудовим подарунком",
    "images": [
      "images/J0003/1.jpg",
      "images/J0003/2.jpg",
      "images/J0003/3.jpg"
    ]
  },
  {
    "id": "PV-0004",
    "sku": "W0004",
    "category": "Годинники",
    "brand": "Nina Ricci Paris",
    "name": "Nina Ricci",
    "currency": "EUR",
    "price": 700,
    "status": "available",
    "dateAdded": "2026-06-24",
    "description": "Елегантний золотий годинник Nina Ricci Paris - прямокутний корпус з білим циферблатом римськими цифрами, на широкому золотому браслеті в комплекті зі змінними ремінцями (червоний крокодил, чорний)",
    "images": [
      "images/W0004/1.jpg",
      "images/W0004/2.jpg",
      "images/W0004/3.jpg"
    ]
  },
  {
    "id": "PV-0005",
    "sku": "J0005",
    "category": "Прикраси",
    "brand": "Two Sisters",
    "name": "Сережки в зеленому кольорі",
    "currency": "EUR",
    "price": 100,
    "status": "available",
    "dateAdded": "2026-06-24",
    "description": "Сережки в ніжно зеленому кольорі з матовою поверхнею, бренду Two Sisters",
    "images": [
      "images/J0005/1.jpg",
      "images/J0005/2.jpg",
      "images/J0005/3.jpg"
    ]
  },
  {
    "id": "PV-0006",
    "sku": "W0006",
    "category": "Годинники",
    "brand": "Gucci",
    "name": "Gucci 1400 L",
    "currency": "EUR",
    "price": 440,
    "status": "available",
    "dateAdded": "2026-06-24",
    "description": "Елегантний годинник. Престижне та лаконічне жіноче прикраса відомого бренду - чудовий вибір для щоденного носіння та елегантного образу. Круглий корпус із полірованої нержавіючої сталі, швейцарського виробництва, з водозахистом 3 АТМ, на стильному металевому браслеті.",
    "images": [
      "images/W0006/1.jpg",
      "images/W0006/2.jpg",
      "images/W0006/3.jpg"
    ]
  },
  {
    "id": "PV-0007",
    "sku": "J0007",
    "category": "Прикраси",
    "brand": "Elizabeth Taylor",
    "name": "Елегантні вінтажні кліпси",
    "currency": "EUR",
    "price": 160,
    "status": "available",
    "dateAdded": "2026-06-28",
    "description": "Вінтажні кліпси у вигляді золотих троянд, оздоблені сяючими кристалами. Вишуканий дизайн із романтичним характером, що стане яскравим акцентом як для вечірнього образу, або для особливих подій.",
    "images": [
      "images/J0007/1.jpg",
      "images/J0007/2.jpg"
    ]
  },
  {
    "id": "PV-0008",
    "sku": "W0008",
    "category": "Годинники",
    "brand": "Lancel Paris",
    "name": "Lancel",
    "currency": "EUR",
    "price": 550,
    "status": "available",
    "dateAdded": "2026-06-28",
    "description": "Вінтажний годинник із витонченим прямокутним корпусом, римськими цифрами та браслетом золотистого відтінку. Елегантна французька класика, що підкреслює бездоганний смак та позачасовий стиль.",
    "images": [
      "images/W0008/1.jpg",
      "images/W0008/2.jpg",
      "images/W0008/3.jpg",
      "images/W0008/4.jpg",
      "images/W0008/5.jpg"
    ]
  },
  {
    "id": "PV-0009",
    "sku": "W0009",
    "category": "Годинники",
    "brand": "Raymond Weil Genève",
    "name": "Raymond Weil",
    "currency": "EUR",
    "price": 450,
    "status": "available",
    "dateAdded": "2026-06-28",
    "description": "Raymond Weil Genève Поєднання швейцарської майстерності та витонченого дизайну. Елегантний силует, золотистий браслет, кристали на циферблаті створюють образ стриманої розкоші.",
    "images": [
      "images/W0009/1.jpg",
      "images/W0009/2.jpg"
    ]
  },
  {
    "id": "PV-0010",
    "sku": "W0010",
    "category": "Годинники",
    "brand": "Bulova",
    "name": "Елегантні жіночі годинники Bulova",
    "currency": "EUR",
    "price": 420,
    "status": "available",
    "dateAdded": "2026-07-01",
    "description": "Вінтажні, у золотистому кольорі.Прямокутний корпус, білий циферблат з маркерами, стильний браслет-бангл. Класичний дизайн 80-90-х років. Ідеально для колекціонерів та поціновувачів ретро-стилю.",
    "images": [
      "images/W0010/1.JPG",
      "images/W0010/2.JPG"
    ]
  },
  {
    "id": "PV-0011",
    "sku": "W0011",
    "category": "Годинники",
    "brand": "Raymond Weil Genève",
    "name": "Royal London",
    "currency": "EUR",
    "price": 650,
    "status": "available",
    "dateAdded": "2026-07-01",
    "description": "Стильний жіночий годинник Royal London у золотому корпусі. Прямокутний «танк» дизайн, білий циферблат з римськими цифрами та якісний ремінець під крокодил.\nІзюминка: Ця модель натхненна легендарними Cartier Tank — одним з найвпізнаваніших дизайнів XX століття. Британський бренд Royal London поєднує елегантність Лондона з доступною розкішшю 18K gold electroplated.",
    "images": [
      "images/W0011/1.jpg",
      "images/W0011/2.jpg",
      "images/W0011/3.jpg",
      "images/W0011/4.jpg",
      "images/W0011/5.jpg"
    ]
  },
  {
    "id": "PV-0012",
    "sku": "W0012",
    "category": "Годинники",
    "brand": "Anna Klein",
    "name": "Anna Klein",
    "currency": "EUR",
    "price": 140,
    "status": "available",
    "dateAdded": "2026-07-02",
    "description": "Вінтажний годинник Anna Klein",
    "images": [
      "images/W0012/1.jpg",
      "images/W0012/2.jpg"
    ]
  },
  {
    "id": "PV-0013",
    "sku": "W0013",
    "category": "Годинники",
    "brand": "Tissot",
    "name": "Tissot 101",
    "currency": "EUR",
    "price": 250,
    "status": "available",
    "dateAdded": "2026-07-02",
    "description": "Стильний - вінтажний жіночий годинник Tissot",
    "images": [
      "images/W0013/1.JPG"
    ]
  },
  {
    "id": "PV-0014",
    "sku": "W0014",
    "category": "Годинники",
    "brand": "Christian Dior",
    "name": "Christian Dior",
    "currency": "EUR",
    "price": 430,
    "status": "available",
    "dateAdded": "2026-07-02",
    "description": "Витончений вінтажний годинник Christian Dior",
    "images": [
      "images/W0014/1.JPG"
    ]
  },
  {
    "id": "PV-0015",
    "sku": "W0015",
    "category": "Годинники",
    "brand": "Cenere",
    "name": "Cenere USA",
    "currency": "EUR",
    "price": 290,
    "status": "available",
    "dateAdded": "2026-07-02",
    "description": "Стильний витончений жіночий годинник вінтажний годинник Cenere",
    "images": [
      "images/W0015/1.jpg",
      "images/W0015/2.jpg",
      "images/W0015/3.jpg"
    ]
  },
  {
    "id": "PV-0016",
    "sku": "W0016",
    "category": "Годинники",
    "brand": "Tissot",
    "name": "Tissot 1853",
    "currency": "EUR",
    "price": 380,
    "status": "available",
    "dateAdded": "2026-07-02",
    "description": "Елегантний золотий годинник Tissot 1853",
    "images": [
      "images/W0016/1.jpg",
      "images/W0016/2.jpg",
      "images/W0016/3.jpg",
      "images/W0016/4.jpg",
      "images/W0016/5.jpg"
    ]
  },
  {
    "id": "PV-0017",
    "sku": "W0017",
    "category": "Годинники",
    "brand": "Tissot",
    "name": "Tissot T109210A",
    "currency": "EUR",
    "price": 550,
    "status": "available",
    "dateAdded": "2026-07-02",
    "description": "Коли годинник — це не просто аксесуар, а маленький шедевр \nВінтажний Tissot у нашому бутику",
    "images": [
      "images/W0017/1.jpg",
      "images/W0017/2.jpg",
      "images/W0017/3.jpg",
      "images/W0017/4.jpg"
    ]
  },
  {
    "id": "PV-0018",
    "sku": "W0018",
    "category": "Годинники",
    "brand": "Cenere",
    "name": "Cenere USA",
    "currency": "EUR",
    "price": 230,
    "status": "available",
    "dateAdded": "2026-07-02",
    "description": "Елегантний годинник Cenere USA Japan Movt",
    "images": [
      "images/W0018/1.jpg",
      "images/W0018/2.jpg",
      "images/W0018/3.jpg"
    ]
  },
  {
    "id": "PV-0019",
    "sku": "W0019",
    "category": "Годинники",
    "brand": "Seiko",
    "name": "Seiko Bamboo Limited Edition",
    "currency": "EUR",
    "price": 540,
    "status": "available",
    "dateAdded": "2026-07-03",
    "description": "Елегантний Seiko Bamboo. Шедевр Limited Edition ",
    "images": [
      "images/W0019/1.jpg"
    ]
  },
  {
    "id": "PV-0020",
    "sku": "J0008",
    "category": "Прикраси",
    "brand": "Francesca Visconti",
    "name": "Francesca Visconti",
    "currency": "EUR",
    "price": 96,
    "status": "available",
    "dateAdded": "2026-07-03",
    "description": "Італійська ручна робота, яскравий дизайн-багато кольорового каміння, контрастів, великихформ.Натхнення природою. Матеріали-дорогоцінні та напівдорогоцінні камені,діаманти й благородні метали.",
    "images": [
      "images/J0008/1.jpg",
      "images/J0008/2.jpg",
      "images/J0008/3.jpg"
    ]
  },
  {
    "id": "PV-0021",
    "sku": "J0009",
    "category": "Прикраси",
    "brand": "Chanel",
    "name": "CHANEL Clip-On Earrings",
    "currency": "EUR",
    "price": 100,
    "status": "available",
    "dateAdded": "2026-07-03",
    "description": "Легендарний символ французької елегантності — подвійне CC, втілений у вишуканих вінтажних кліпсах Chanel. Золотистий медальйон із культовим логотипом, обрамлений декоративними кріпленнями, створює образ, що не підвладний часу.",
    "images": [
      "images/J0009/1.jpg"
    ]
  },
  {
    "id": "PV-0022",
    "sku": "W0020",
    "category": "Годинники",
    "brand": "Cartier",
    "name": "Cartier Paris VERMEIL",
    "currency": "EUR",
    "price": 2600,
    "status": "reserved",
    "dateAdded": "2026-07-05",
    "description": "Cartier Vermeil — втілення витонченої класики.\nЕлегантний вінтажний годинник з круглим золотим корпусом, швейцарським кварцовим механізмом та делікатним шкіряним ремінцем. Виготовлений у техніці Vermeil — срібло з благородною позолотою 20 мікрон.",
    "images": [
      "images/W0020/1.jpg",
      "images/W0020/2.jpg",
      "images/W0020/3.jpg",
      "images/W0020/4.jpg",
      "images/W0020/5.jpg",
      "images/W0020/6.jpg"
    ]
  },
  {
    "id": "PV-0023",
    "sku": "J0010",
    "category": "Прикраси",
    "brand": "Yves Saint Laurent",
    "name": "Yves Saint Laurent",
    "currency": "EUR",
    "price": 730,
    "status": "available",
    "dateAdded": "2026-07-06",
    "description": "Цей вінтажний браслет Yves Saint Laurent — яскравий приклад французької естетики, де сміливий дизайн поєднується з бездоганною елегантністю. Ланки у формі сердець створюють впізнаваний силует, що символізує жіночність, свободу та любов до прекрасного.",
    "images": [
      "images/J0010/1.jpg",
      "images/J0010/2.jpg",
      "images/J0010/3.jpg",
      "images/J0010/4.jpg"
    ]
  },
  {
    "id": "PV-0024",
    "sku": "W0021",
    "category": "Годинники",
    "brand": "Michel Herbelin Paris",
    "name": "Michel Herbelin Paris",
    "currency": "EUR",
    "price": 540,
    "status": "available",
    "dateAdded": "2026-07-06",
    "description": "Цей витончений вінтажний годинник Michel Herbelin Paris — приклад французької елегантності, де кожна деталь продумана до дрібниць. Лаконічний прямокутний циферблат, золотистий браслет із м'якими округлими ланками та стриманий дизайн створюють прикрасу, яка виглядає актуально незалежно від епохи.",
    "images": [
      "images/W0021/1.jpg",
      "images/W0021/2.jpg",
      "images/W0021/3.jpg",
      "images/W0021/4.jpg",
      "images/W0021/5.jpg",
      "images/W0021/6.jpg"
    ]
  },
  {
    "id": "PV-0025",
    "sku": "W0022",
    "category": "Годинники",
    "brand": "Gucci",
    "name": "Gucci 1500L MOP",
    "currency": "EUR",
    "price": 640,
    "status": "available",
    "dateAdded": "2026-07-06",
    "description": "Цей вінтажний Gucci створений для тих, хто цінує стриману розкіш. Витончений прямокутний циферблат із перламутровим сяйвом гармонійно поєднується з культовим браслетом Horsebit — дизайном, що вже десятиліттями залишається одним із найвпізнаваніших символів модного дому Gucci.",
    "images": [
      "images/W0022/1.jpg",
      "images/W0022/2.jpg",
      "images/W0022/3.jpg",
      "images/W0022/4.jpg",
      "images/W0022/5.jpg",
      "images/W0022/6.jpg"
    ]
  },
  {
    "id": "PV-0026",
    "sku": "W0023",
    "category": "Годинники",
    "brand": "Kolber Genève",
    "name": "Kolber Genève",
    "currency": "EUR",
    "price": 440,
    "status": "available",
    "dateAdded": "2026-07-06",
    "description": "Срібний вінтажних годинник це справжня знахідка Годинник бренду Kolber Genève швейцарський годинниковий бренд, заснований у Женеві у 1983 році!",
    "images": [
      "images/W0023/1.jpg",
      "images/W0023/2.jpg",
      "images/W0023/3.jpg",
      "images/W0023/4.jpg",
      "images/W0023/5.jpg",
      "images/W0023/6.jpg"
    ]
  },
  {
    "id": "PV-0027",
    "sku": "J0011",
    "category": "Прикраси",
    "brand": "Кольє",
    "name": "Panther Necklace",
    "currency": "EUR",
    "price": 180,
    "status": "available",
    "dateAdded": "2026-07-11",
    "description": "Є прикраси, які не потребують гучних слів.\nЛаконічний ланцюг із двома витонченими головами пантери — символом сили, грації та впевненості. Дизайн, натхненний легендарною естетикою французького ювелірного дому, залишається актуальним уже багато десятиліть.",
    "images": [
      "images/J0011/1.jpg",
      "images/J0011/2.jpg",
      "images/J0011/3.jpg",
      "images/J0011/4.jpg"
    ]
  },
  {
    "id": "PV-0028",
    "sku": "J0012",
    "category": "Прикраси",
    "brand": "Seiko",
    "name": "Seiko Pendant Watch",
    "currency": "EUR",
    "price": 300,
    "status": "available",
    "dateAdded": "2026-07-15",
    "description": "Ювелірний годинник-підвіска Seiko. Надійний кварцовий механізм Seiko та дизайн початку 1990-х років створюють річ, яку хочеться носити не лише заради часу, а й заради її характеру.",
    "images": [
      "images/J0012/1.jpg",
      "images/J0012/2.jpg",
      "images/J0012/3.jpg",
      "images/J0012/4.jpg",
      "images/J0012/5.jpg"
    ]
  },
  {
    "id": "PV-0029",
    "sku": "W0024",
    "category": "Годинники",
    "brand": "Seiko",
    "name": "Best of the Best",
    "currency": "EUR",
    "price": 1,
    "status": "sold",
    "dateAdded": "2026-07-15",
    "description": "Вінтаж Вінтажній 😂",
    "images": [
      "images/W0024/1.jpg"
    ]
  },
  {
    "id": "PV-0030",
    "sku": "W0025",
    "category": "Годинники",
    "brand": "Rado",
    "name": "RADO💛WATERSEALED (204.3612.2)",
    "currency": "EUR",
    "price": 490,
    "status": "available",
    "dateAdded": "2026-07-17",
    "description": "Швейцарська елегантність поза часом. Лаконічний циферблат, витончений корпус і розкішний браслет із міланським плетінням створюють образ, який залишається актуальним незалежно від модних тенденцій. Є аксесуари, які привертають увагу. А є ті, що залишають враження",
    "images": [
      "images/W0025/1.jpg",
      "images/W0025/2.jpg"
    ]
  }
];