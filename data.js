const exchangeRate = {
  "eurToUah": 52.0508,
  "source": "Monobank",
  "updated": "2026-08-03"
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "price": 730,
    "status": "available",
    "dateAdded": "2026-06-24",
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "price": 780,
    "status": "available",
    "dateAdded": "2026-07-01",
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
    "description": "Стильний - вінтажний жіночий годинник Tissot",
    "images": [
      "images/W0013/1.JPG"
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "price": 590,
    "status": "available",
    "dateAdded": "2026-07-02",
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "eraFrom": "",
    "eraTo": "",
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
    "id": "PV-0030",
    "sku": "W0025",
    "category": "Годинники",
    "brand": "Rado",
    "name": "RADO💛WATERSEALED (204.3612.2)",
    "currency": "EUR",
    "price": 490,
    "status": "available",
    "dateAdded": "2026-07-17",
    "eraFrom": "",
    "eraTo": "",
    "description": "Швейцарська елегантність поза часом. Лаконічний циферблат, витончений корпус і розкішний браслет із міланським плетінням створюють образ, який залишається актуальним незалежно від модних тенденцій. Є аксесуари, які привертають увагу. А є ті, що залишають враження",
    "images": [
      "images/W0025/1.jpg",
      "images/W0025/2.jpg"
    ]
  },
  {
    "id": "PV-0031",
    "sku": "W0026",
    "category": "Годинники",
    "brand": "Christian Dior",
    "name": "Christian Dior 3012",
    "currency": "EUR",
    "price": 1300,
    "status": "available",
    "dateAdded": "2026-07-30",
    "eraFrom": "",
    "eraTo": "",
    "description": "Жіночий годинник Christian Dior Paris, орієнтовно 1980–1990-х років. Корпус квадратної форми із золотистим покриттям поєднується зі світлим мінімалістичним циферблатом та тонкими позолоченими стрілками. Годинник оснащений швейцарським кварцовим механізмом, що забезпечує точний та надійний хід. Ремінець Condor Genuine Leather. У 1970–1980-х роках Christian Dior активно розвивав годинниковий напрямок, співпрацюючи зі швейцарськими виробниками. Саме в цей період з'явилися елегантні моделі, що поєднували французький дизайн зі швейцарською точністю.",
    "images": [
      "images/W0026/1.jpg",
      "images/W0026/2.jpg",
      "images/W0026/3.jpg",
      "images/W0026/4.jpg",
      "images/W0026/5.jpg"
    ]
  },
  {
    "id": "PV-0032",
    "sku": "W0027",
    "category": "Годинники",
    "brand": "Christian Dior",
    "name": "Christian Dior D70-100",
    "currency": "EUR",
    "price": 1200,
    "status": "available",
    "dateAdded": "2026-08-02",
    "eraFrom": 1988,
    "eraTo": 1995,
    "description": "Елегантний годинник Christian Dior Paris із витонченим овальним циферблатом та оригінальним сталевим браслетом, що робить модель легко впізнаваною. Годинник виготовлений у Швейцарії та оснащений кварцовим механізмом, який у більшості моделей цієї серії базувався на калібрах ETA. Орієнтовне датування — 1988–1995 роки. Сьогодні такі моделі цінуються за стриманий дизайн, який чудово передає естетику моди кінця ХХ століття.",
    "images": [
      "images/W0027/1.jpg",
      "images/W0027/2.jpg",
      "images/W0027/3.jpg",
      "images/W0027/4.jpg",
      "images/W0027/5.jpg"
    ]
  },
  {
    "id": "PV-0033",
    "sku": "W0028",
    "category": "Годинники",
    "brand": "Christian Dior",
    "name": "Christian Dior Depose",
    "currency": "EUR",
    "price": 800,
    "status": "available",
    "dateAdded": "2026-08-02",
    "eraFrom": 1989,
    "eraTo": 1994,
    "description": "Вінтажний годинник Christian Dior Paris, виготовлений у Швейцарії, поєднує класичну прямокутну форму корпусу з витонченим циферблатом, прикрашеним фірмовою монограмою CD. Позолочений корпус гармонійно доповнює чорний шкіряний ремінець, створюючи стриманий та елегантний образ. Оснащений надійним швейцарським кварцовим механізмом ETA. Орієнтовний період випуску — 1989–1994 роки. У цей час Christian Dior активно розвивав власну лінійку годинників, поєднуючи французький стиль із традиційною швейцарською якістю.",
    "images": [
      "images/W0028/1.jpg",
      "images/W0028/2.jpg",
      "images/W0028/3.jpg",
      "images/W0028/4.jpg",
      "images/W0028/5.jpg",
      "images/W0028/6.jpg"
    ]
  },
  {
    "id": "PV-0034",
    "sku": "W0029",
    "category": "Годинники",
    "brand": "Christian Dior",
    "name": "Christian Dior 3023 Plaqué Or G",
    "currency": "EUR",
    "price": 590,
    "status": "available",
    "dateAdded": "2026-08-02",
    "eraFrom": 1989,
    "eraTo": 1989,
    "description": "Модель Christian Dior Paris Swiss Made виконана у характерній для бренду стриманій манері: тонкий круглий корпус, глибокий чорний циферблат і золотисті стрілки, які підкреслюють контраст без зайвих деталей. Усередині встановлений надійний швейцарський кварцовий механізм ETA, відомий своєю точністю та довговічністю. Орієнтовний період випуску — кінець 1980-х – початок 1990-х років. Саме в цей час модні будинки дедалі частіше відмовлялися від декоративної надмірності на користь елегантного мінімалізму.",
    "images": [
      "images/W0029/1.jpg",
      "images/W0029/2.jpg",
      "images/W0029/3.jpg",
      "images/W0029/4.jpg"
    ]
  },
  {
    "id": "PV-0035",
    "sku": "W0030",
    "category": "Годинники",
    "brand": "Christian Dior",
    "name": "Christian Dior 3005 12R",
    "currency": "EUR",
    "price": 800,
    "status": "available",
    "dateAdded": "2026-08-03",
    "eraFrom": 1987,
    "eraTo": 1992,
    "description": "Christian Dior Paris Swiss Made із витонченим круглим корпусом та класичним білим циферблатом, прикрашеним арабськими цифрами й декоративною внутрішньою шкалою. Позолочений корпус гармонійно поєднується з чорним шкіряним ремінцем, створюючи стриманий образ, характерний для колекцій Dior кінця ХХ століття. Годинник оснащений швейцарським кварцовим механізмом ETA та орієнтовно датується 1987–1992 роками. Цікавий факт: у цей період Christian Dior приділяв особливу увагу дизайну циферблатів, прагнучи зробити їх впізнаваними навіть без великої кількості декоративних елементів.",
    "images": [
      "images/W0030/1.jpg",
      "images/W0030/2.jpg",
      "images/W0030/3.jpg",
      "images/W0030/4.jpg",
      "images/W0030/5.jpg"
    ]
  },
  {
    "id": "PV-0036",
    "sku": "W0031",
    "category": "Годинники",
    "brand": "Karl Lagerfeld",
    "name": "Karl Lagerfeld Montres",
    "currency": "EUR",
    "price": 1400,
    "status": "available",
    "dateAdded": "2026-08-03",
    "eraFrom": 1988,
    "eraTo": 1995,
    "description": "Годинник Karl Lagerfeld Montres Swiss Made поєднує лаконічний круглий корпус із виразними декоративними елементами біля кріплення ремінця — характерною деталлю дизайнерських моделей бренду. Світлий циферблат із римськими цифрами надає годиннику стриманої елегантності, а за точність відповідає надійний швейцарський кварцовий механізм. Орієнтовний період випуску — 1988–1995 роки. Цікавий факт: Карл Лагерфельд вважав аксесуари невід'ємною частиною образу, тому його годинники створювалися не лише як практичний інструмент, а й як елемент дизайнерського стилю.",
    "images": [
      "images/W0031/1.jpg",
      "images/W0031/2.jpg",
      "images/W0031/3.jpg",
      "images/W0031/4.jpg",
      "images/W0031/5.jpg",
      "images/W0031/6.jpg"
    ]
  },
  {
    "id": "PV-0037",
    "sku": "W0032",
    "category": "Годинники",
    "brand": "Yves Saint Laurent",
    "name": "Yves Saint Laurent Heart Swiss Made",
    "currency": "EUR",
    "price": 1700,
    "status": "available",
    "dateAdded": "2026-08-03",
    "eraFrom": "",
    "eraTo": "",
    "description": "Ідеальний, знаковий вінтажний годинник у повному комплекті від ⚜️Yves Saint Laurent⚜️ heart 💛 У кожного модного дому є свої впізнавані символи. Форми, які читаються миттєво — навіть без логотипа. Для Saint Laurent одним із таких символів завжди було серце 💛 Саме тому вінтажні речі з цим мотивом — годинники, прикраси чи аксесуари — майже ніколи не затримуються надовго. І справа не у випадковому ажіотажі, а в сильній асоціації з естетикою та ДНК бренду. Подібні моделі зазвичай випускалися обмеженими тиражами, а з роками їх на ринку стає дедалі менше. Сьогодні heart-моделі Yves Saint Laurent — це вже справжня знахідка для колекціонерів вінтажу. 2200€ (повний комплект) 1700€ (тільки годинник)",
    "images": [
      "images/W0032/1.jpg",
      "images/W0032/2.jpg",
      "images/W0032/3.jpg",
      "images/W0032/4.jpg",
      "images/W0032/5.jpg",
      "images/W0032/6.jpg",
      "images/W0032/7.jpg"
    ]
  },
  {
    "id": "PV-0038",
    "sku": "W0033",
    "category": "Годинники",
    "brand": "Yves Saint Laurent",
    "name": "Yves Saint Laurent 5920 H12115",
    "currency": "EUR",
    "price": 1300,
    "status": "available",
    "dateAdded": "2026-08-03",
    "eraFrom": 1990,
    "eraTo": 1996,
    "description": "Yves Saint Laurent Paris — витончена вінтажна модель швейцарського виробництва з квадратним корпусом і жорстким браслетом, що більше нагадує ювелірну прикрасу, ніж традиційний наручний годинник. Контраст між позолоченим корпусом і насиченим синім циферблатом робить дизайн лаконічним, але впізнаваним. За точність відповідає кварцовий механізм швейцарського виробництва. Орієнтовно модель була випущена у другій половині 1990-х років. Саме в цей період модні будинки дедалі частіше експериментували з кольором циферблатів, роблячи їх важливою частиною дизайну.",
    "images": [
      "images/W0033/1.jpg",
      "images/W0033/2.jpg",
      "images/W0033/3.jpg",
      "images/W0033/4.jpg",
      "images/W0033/5.jpg"
    ]
  },
  {
    "id": "PV-0039",
    "sku": "W0034",
    "category": "Годинники",
    "brand": "Citizen",
    "name": "Citizen Elegens ref. 5431-S24743 TA",
    "currency": "EUR",
    "price": 460,
    "status": "available",
    "dateAdded": "2026-08-03",
    "eraFrom": 1990,
    "eraTo": 2000,
    "description": "⭐ Маленький годинник. Великий характер. Цей вінтажний Citizen не прагне привернути увагу гучним дизайном — він робить це деталями. Вишуканий браслет, делікатні кристали та лаконічний циферблат створюють відчуття прикраси, яка випадково ще й показує час. Усередині — надійний японський кварцовий механізм, а сама модель орієнтовно датується кінцем 1990-х – початком 2000-х років. 💫 Цікавий факт: саме Citizen став одним із перших світових виробників, який зробив кварцові годинники масовими, змінивши всю годинникову індустрію після легендарної «Quartz Revolution».",
    "images": [
      "images/W0034/1.jpg",
      "images/W0034/2.jpg"
    ]
  }
];