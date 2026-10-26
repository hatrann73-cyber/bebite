/* Bébite - Product listing + filters + address picker */
const PRODUCTS = [

  /* =====================================================
     1. SỮA BỘT (Nhóm sua-bot)
  ===================================================== */
  {
    category: 'Sữa bột',
    name: 'Sữa bột cho bé từ 6 tháng +',
    sku: 'SBMILK6MONTH',
    groupId: 'sua-bot',
    variantLabel: 'Từ 6 tháng',
    size: '900g',
    age: '>= 6 tháng',
    price: 149000,
    rating: 4.8,
    reviews: 24,
    flavor: 'Thanh nhạt tự nhiên, dịu nhẹ như sữa mẹ',
    nutrition: 'Giàu Canxi, Vitamin D3, Sắt, Kẽm, Vitamin nhóm B và chất xơ FOS/Inulin hỗ trợ tiêu hóa',
    origin: 'Việt Nam (Nguyên liệu nhập khẩu New Zealand)',
    description: 'Chắt lọc từ nguồn nguyên liệu chọn lọc thanh khiết, sữa bột là nguồn dinh dưỡng chuẩn cân bằng cho bé từ 6 tháng tuổi. Giàu Canxi và Vitamin D thiết yếu, sữa sở hữu hương vị thanh nhạt mát lành tự nhiên. Vỗ về tiêu hóa, vững bước đầu đời.',
    ingredients: 'Bột ngũ cốc thủy phân 75% (gạo tẻ, yến mạch), chất xơ hòa tan (FOS/Inulin), khoáng chất (Canxi cacbonat, Sắt fumarate, Kẽm gluconate), các vitamin (Vitamin C, Vitamin B1, Vitamin B6, Vitamin A, Vitamin D3), bột chuối tự nhiên. Sản phẩm không sử dụng đường bổ sung và chất bảo quản.',
    usage: 'Dùng sữa mẹ hoặc sữa công thức ấm (khoảng 40°C – 45°C).<br>Pha bình (uống dạng sánh): Cho 1 – 2 muỗng gạt vào 150 – 180ml sữa ấm, lắc đều tay cho tan mịn.<br>Pha bát (ăn dặm dạng sệt): Cho 3 – 4 muỗng gạt vào 120 – 150ml sữa ấm, khuấy đều theo một chiều cho mịn.'
  },
  {
    category: 'Sữa bột',
    name: 'Sữa bột cho bé từ 1 tuổi +',
    sku: 'SBMILK1YEAR',
    groupId: 'sua-bot',
    variantLabel: 'Từ 1 tuổi',
    size: '900g',
    age: '>= 1 tuổi',
    price: 149000,
    rating: 4.8,
    reviews: 30,
    flavor: 'Vị thơm béo, sữa ngọt vừa',
    nutrition: 'Vitamin C, Vitamin B1, Vitamin B6, Vitamin A, Vitamin D3',
    origin: 'Việt Nam (Nguyên liệu nhập khẩu New Zealand)',
    description: 'Đồng hành cùng giai đoạn bé hiếu động khám phá thế giới, sữa công thức tiếp thêm năng lượng dồi dào với hàm lượng Canxi, D3 và K2 tối ưu. Hương vị thơm lành ngọt dịu, nâng bước tầm vóc và chắp cánh trí tuệ vượt trội.',
    ingredients: 'Sữa nguyên kem, canxi hữu cơ, vitamin D3, K2, kẽm, DHA, chất xơ FOS. Các vitamin (Vitamin C, Vitamin B1, Vitamin B6, Vitamin A, Vitamin D3). Sản phẩm không sử dụng đường bổ sung và chất bảo quản.',
    usage: 'Pha bình (uống dạng sánh): Cho 1 – 2 muỗng gạt vào 150 – 180ml sữa ấm, lắc đều tay cho tan mịn.<br>Pha bát (ăn dặm dạng sệt): Cho 3 – 4 muỗng gạt vào 120 – 150ml sữa ấm, khuấy đều theo một chiều cho mịn.'
  },

  /* =====================================================
     2. CÁC LOẠI HẠT (Không có biến thể hoặc đứng độc lập)
  ===================================================== */
  {
    category: 'Các loại hạt',
    name: 'Hạt yến mạch',
    sku: 'HYENMACH70G',
    size: '70g',
    age: '>= 6 tháng',
    price: 59000,
    rating: 4.7,
    reviews: 18,
    flavor: "Bùi béo, thơm dịu hương yến mạch tự nhiên",
    nutrition: "Dồi dào chất xơ hòa tan Beta-Glucan, Vitamin nhóm B, Phốt pho và Magie",
    origin: "Việt Nam",
    description: 'Thu trọn tinh túy từ những cánh đồng yến mạch ngập nắng, từng hạt cán dẹt giữ vẹn nguyên lớp cám giàu chất xơ beta-glucan và vitamin nhóm B.',
    ingredients: '100% yến mạch cán dẹt nguyên chất',
    usage: 'Nấu cháo cùng rau củ, thịt cá (5–10 phút) hoặc ngâm sữa chua, sữa tươi ăn liền.'
  },
  {
    category: 'Các loại hạt',
    name: 'Đậu Hà Lan',
    sku: 'DHALAN70G',
    size: '70g',
    age: '>= 6 tháng',
    price: 69000,
    rating: 4.9,
    reviews: 44,
    flavor: "Ngọt thanh tự nhiên, bùi nhẹ",
    nutrition: "Giàu đạm thực vật, chất xơ êm dịu đường ruột, Axit Folic và Vitamin A, C",
    origin: "Việt Nam",
    description: 'Món quà thuần khiết từ thiên nhiên với vị ngọt thanh tự nhiên và màu xanh mướt mát lành.',
    ingredients: '100% đậu Hà Lan tách đôi/sấy khô',
    usage: 'Rửa sạch, ngâm nước 2–4 tiếng rồi nấu nhừ làm súp ngô đậu, cháo hoặc xay nhuyễn.'
  },
  {
    category: 'Các loại hạt',
    name: 'Hạt Kê Nếp',
    sku: 'HKENEP70G',
    size: '70g',
    age: '>= 6 tháng',
    price: 59000,
    rating: 4.8,
    reviews: 30,
    flavor: "Thơm dẻo bùi đặc trưng, ngậy nhẹ",
    nutrition: "Hàm lượng Sắt cao, Canxi, Magie và vi khoáng hỗ trợ giấc ngủ và ngừa thiếu máu",
    origin: "Việt Nam",
    description: 'Mang trọn sắc vàng óng ả và hương thơm dẻo bùi đặc trưng, từng hạt kê nếp được chắt lọc kỹ lưỡng, giàu vi khoáng tự nhiên.',
    ingredients: '100% hạt kê nếp hữu cơ xát vỏ',
    usage: 'Vo sạch hạt kê với nước lạnh. Nấu chung với gạo theo tỉ lệ 1:4 hoặc nấu cháo nguyên chất.'
  },
  {
    category: 'Các loại hạt',
    name: 'Đậu gà Argentina',
    sku: 'DGAARGENTINA70G',
    size: '70g',
    age: '>= 6 tháng',
    price: 69000,
    rating: 4.7,
    reviews: 34,
    flavor: "Bùi béo tự nhiên, mềm mịn khi nấu chín",
    nutrition: "Giàu protein thực vật, chất xơ, sắt, magie và folate, hỗ trợ tiêu hóa và bổ sung dưỡng chất",
    origin: "Argentina",
    description: 'Đậu gà Argentina giàu dinh dưỡng, có vị bùi béo tự nhiên, phù hợp để chế biến các món ăn dặm thơm ngon và đa dạng cho bé.',
    ingredients: '100% đậu gà Argentina nguyên chất',
    usage: 'Vo sạch đậu gà với nước lạnh. Nên ngâ qua đếm trước khi chế biến. Nấu chung với gạo theo tỉ lệ 1:4 hoặc nấu cháo nguyên chất. Có thể xay hoặc rây mịn trước khi cho bé ăn.'
  },
  {
    category: 'Các loại hạt',
    name: 'Hạt diêm mạch',
    sku: 'HDIEMMACH70G',
    size: '70g',
    age: '>= 6 tháng',
    price: 69000,
    rating: 4.7,
    reviews: 22,
    flavor: "Thơm dẻo bùi đặc trưng, ngậy nhẹ",
    nutrition: "Chứa trọn vẹn 9 loại Axit Amin thiết yếu, giàu chất xơ, Sắt, Kẽm và không chứa Gluten",
    origin: "Việt Nam (Nguyên liệu nhập khẩu từ Peru)",
    description: 'Được mệnh danh là "hạt vàng" của mẹ thiên nhiên, diêm mạch hữu cơ mang trọn bộ 9 axit amin thiết yếu mà không chứa gluten.',
    ingredients: '100% hạt diêm mạch (Quinoa) hữu cơ',
    usage: 'Vo kỹ để loại bỏ lớp vỏ đắng. Nấu cùng gạo tỉ lệ 1:4 hoặc nấu riêng làm salad, cháo.'
  },

  /* =====================================================
     3. BÁNH ĂN DẶM (Nhóm bánh theo vị)
  ===================================================== */
  {
    category: 'Bánh ăn dặm',
    name: 'Bánh ăn dặm vị trái cây - Vị Dâu',
    sku: 'BADQUEDAU40G',
    groupId: 'banh-an-dam-trai-cay',
    variantLabel: 'Vị Dâu',
    size: '6 túi - 30g / 1 túi',
    age: '>= 6 tháng',
    price: 180000,
    rating: 5.0,
    reviews: 54,
    flavor: "Chua ngọt dịu mát, thơm lừng hương dâu tây",
    nutrition: "Bổ sung Canxi Carbonat giúp chắc răng khỏe xương và Vitamin C tăng cường đề kháng",
    origin: "Việt Nam",
    description: 'Sắc hồng ngọt ngào cùng hương dâu tây căng mọng hòa quyện trên nền bánh que giòn xốp tan nhanh.',
    ingredients: 'Bột gạo, dâu sấy nhuyễn (6%), nước ép táo cô đặc (5%), canxi carbonat, vitamin C',
    usage: 'Dùng trực tiếp cho bé từ 6–7 tháng tuổi bắt đầu làm quen đồ ăn dặm cầm tay.'
  },
  {
    category: 'Bánh ăn dặm',
    name: 'Bánh ăn dặm vị trái cây - Vị Xoài',
    sku: 'BADVXOAI40G',
    groupId: 'banh-an-dam-trai-cay',
    variantLabel: 'Vị Xoài',
    size: '6 túi - 30g / 1 túi',
    age: '>= 6 tháng',
    price: 180000,
    rating: 4.8,
    reviews: 33,
    flavor: "Ngọt thanh nhiệt đới, thơm thơm vị xoài chín",
    nutrition: "Bổ sung Vitamin E chống oxy hóa, Canxi và năng lượng từ gạo hữu cơ",
    origin: "Việt Nam",
    description: 'Mang trọn vị ngọt ngào và năng lượng ấm áp từ vùng xoài nhiệt đới, bánh ăn dặm xốp nhẹ tan ngay trên đầu lưỡi.',
    ingredients: 'Bột gạo hữu cơ, tinh bột ngô, bột xoài tự nhiên (5%), vitamin E, canxi',
    usage: 'Dùng trực tiếp cho bé từ 6–7 tháng tuổi bắt đầu làm quen đồ ăn dặm cầm tay.'
  },
  {
    category: 'Bánh ăn dặm',
    name: 'Bánh ăn dặm vị trái cây - Vị Chuối',
    sku: 'BADVTRAICAY40G',
    groupId: 'banh-an-dam-trai-cay',
    variantLabel: 'Vị Chuối',
    size: '6 túi - 30g / 1 túi',
    age: '>= 6 tháng',
    price: 180000,
    rating: 4.8,
    reviews: 28,
    flavor: "Ngọt dịu, thơm ngậy nức vị chuối chín",
    nutrition: "Cung cấp Kali, Canxi, chất xơ tự nhiên giúp hệ tiêu hóa của bé nhẹ tênh",
    origin: "Việt Nam",
    description: 'Vị chuối chín thơm ngậy hòa cùng bột gạo hữu cơ mềm xốp, dịu dàng tan biến trong khoang miệng non nớt.',
    ingredients: 'Bột gạo hữu cơ, chuối sấy nhuyễn (6%), dầu hướng dương, canxi',
    usage: 'Dùng trực tiếp cho bé từ 6–7 tháng tuổi bắt đầu làm quen đồ ăn dặm cầm tay.'
  },

  /* =====================================================
     4. BÁNH HŨ
  ===================================================== */
  {
    category: 'Bánh hũ',
    name: 'Bánh hũ vị việt quất',
    sku: 'BHADVVQ50G',
    groupId: 'banh-hu',
    variantLabel: 'Việt quất',
    size: '50g',
    age: '>= 8 tháng',
    price: 89000,
    rating: 4.8,
    reviews: 32,
    flavor: "Chua thanh nhẹ, ngọt thơm hương việt quất tự nhiên",
    nutrition: "Giàu chất chống oxy hóa Anthocyanin tốt cho mắt, Vitamin B2 và chất xơ từ gạo lứt",
    origin: "Việt Nam",
    description: 'Sắc tím và vị chua ngọt tinh tế của việt quất tự nhiên đọng lại trong từng miếng bánh giòn tan.',
    ingredients: 'Bột mì, bơ, đường mía, việt quất sấy, sữa bột, canxi',
    usage: 'Cho bé ăn trực tiếp như bữa phụ. Có thể dùng kèm sữa hoặc trái cây.'
  },
  {
    category: 'Bánh hũ',
    name: 'Bánh hũ vị chuối',
    sku: 'BHADVC50G',
    groupId: 'banh-hu',
    variantLabel: 'Vị Chuối',
    size: '50g',
    age: '>= 8 tháng',
    price: 89000,
    rating: 4.9,
    reviews: 36,
    flavor: "Thơm lừng mùi chuối chín, bùi béo tự nhiên",
    nutrition: "Cung cấp năng lượng lành mạnh, bổ sung Canxi và Kali hỗ trợ cơ bắp",
    origin: "Việt Nam",
    description: 'Thơm lừng hương chuối ngọt ngào quen thuộc, từng mẩu bánh xốp mịn tan chảy dịu êm chạm vào nướu nhỏ.',
    ingredients: 'Bột mì, bơ, đường mía, chuối sấy, sữa bột, canxi',
    usage: 'Cho bé ăn trực tiếp như bữa phụ. Có thể dùng kèm sữa hoặc trái cây.'
  },

  /* =====================================================
     5. BÁNH QUY ĂN DẶM
  ===================================================== */
  {
    category: 'Bánh quy ăn dặm',
    name: 'Bánh quy vị việt quất',
    sku: 'BQVVQ50G',
    groupId: 'banh-quy',
    variantLabel: 'Việt quất',
    size: '50g',
    age: '>= 8 tháng',
    price: 59000,
    rating: 4.8,
    reviews: 30,
    flavor: "Béo ngậy hương bơ lạt quyện nốt chua ngọt việt quất",
    nutrition: "Cung cấp đạm, chất béo tốt từ lòng đỏ trứng gà, bơ tươi và vi chất từ việt quất",
    origin: "Việt Nam",
    description: 'Hương bơ lạt thơm lừng quyện cùng những nốt chua thanh rạng rỡ của việt quất.',
    ingredients: 'Bột mì, bơ lạt, đường, bột việt quất, sữa bột',
    usage: 'Cho bé ăn trực tiếp như bữa phụ.'
  },
  {
    category: 'Bánh quy ăn dặm',
    name: 'Bánh quy vị khoai lang',
    sku: 'BQVKL50G',
    groupId: 'banh-quy',
    variantLabel: 'Khoai lang',
    size: '50g',
    age: '>= 8 tháng',
    price: 59000,
    rating: 4.9,
    reviews: 40,
    flavor: "Ngọt bùi đậm đà, thơm dịu mùi khoai lang mật",
    nutrition: "Giàu tinh bột tiêu hóa chậm, Beta-Carotene và chất xơ êm bụng",
    origin: "Việt Nam",
    description: 'Vị ngọt bùi từ những củ khoai lang vàng ruộm đất mẹ, chiếc bánh quy giòn xốp là bữa phụ êm bụng.',
    ingredients: 'Bột mì, khoai lang sấy, bơ, đường, sữa bột',
    usage: 'Cho bé ăn trực tiếp như bữa phụ.Không thay thế bữa chính. Sử dụng trong vòng 7 ngày từ khi mở túi.'
  },
  {
    category: 'Bánh quy ăn dặm',
    name: 'Bánh quy vị kiwi',
    sku: 'BQVKIWI35G',
    groupId: 'banh-quy',
    variantLabel: 'Kiwi',
    size: '35g',
    age: '>= 8 tháng',
    price: 59000,
    rating: 4.8,
    reviews: 23,
    flavor: "Chua thanh dịu ngọt tự nhiên từ quả kiwi tươi mát",
    nutrition: "Giàu Vitamin C, chất xơ và chất chống oxy hóa tự nhiên giúp tăng cường sức đề kháng và hỗ trợ tiêu hóa",
    origin: "Việt Nam",
    description: 'Sự kết hợp thơm ngon giòn xốp cùng vị chua ngọt thanh mát từ quả kiwi, giúp kích thích vị giác bé ăn ngon miệng.',
    ingredients: 'Bột mì, bột kiwi sấy lạnh, bơ thực vật, đường, canxi',
    usage: 'Cho bé ăn trực tiếp như bữa phụ.Không thay thế bữa chính. Sử dụng trong vòng 7 ngày từ khi mở túi.'
  },

  /* =====================================================
     6. DẦU ĂN DẶM (Nhóm Dầu Olive, Cá hồi, Gấc theo dung tích)
  ===================================================== */
  {
    category: 'Dầu ăn dặm',
    name: 'Dầu ăn dặm Olive 50ml',
    sku: 'DADOLIVE50ML',
    groupId: 'dau-olive',
    variantLabel: 'Chai 50ml',
    size: '50ml',
    age: '>= 6 tháng',
    price: 49000,
    rating: 4.9,
    reviews: 52,
    flavor: "Thanh mát nguyên bản, thơm nhẹ mùi olive tươi",
    nutrition: "Giàu Omega-9 và Vitamin E tự nhiên",
    origin: "Việt Nam (Nguyên liệu nhập khẩu từ Ý)",
    description: 'Tinh hoa olive nguyên chất gói trọn trong chai nhỏ 50ml xinh xắn.',
    ingredients: '100% dầu olive nguyên chất ép nguội (Extra Virgin)',
    usage: 'Trộn trực tiếp 5ml vào chén thức ăn dặm đã nấu chín còn ấm.'
  },
  {
    category: 'Dầu ăn dặm',
    name: 'Dầu ăn dặm olive 150ml',
    sku: 'DADOLIVE150ML',
    groupId: 'dau-olive',
    variantLabel: 'Chai 150ml',
    size: '150ml',
    age: '>= 6 tháng',
    price: 139000,
    rating: 4.9,
    reviews: 50,
    flavor: "Thanh nhẹ, thơm dịu mùi trái olive tươi ép nguội",
    nutrition: "Giàu chất béo không bão hòa đơn (Omega-9), Vitamin E",
    origin: "Việt Nam (Nguyên liệu nhập khẩu từ Ý)",
    description: 'Thanh mát nguyên bản, thơm nhẹ mùi olive tươi.',
    ingredients: '100% dầu olive nguyên chất ép nguội (Extra Virgin).',
    usage: 'Dùng trực tiếp trong bữa ăn dặm của bé.'
  },
  {
    category: 'Dầu ăn dặm',
    name: 'Dầu ăn dặm Cá hồi 50ml',
    sku: 'DADCAHOI50ML',
    groupId: 'dau-ca-hoi',
    variantLabel: 'Chai 50ml',
    size: '50ml',
    age: '>= 6 tháng',
    price: 49000,
    rating: 4.9,
    reviews: 58,
    flavor: "Béo dịu, hương thơm nhẹ nhàng không tanh",
    nutrition: "Bổ sung dồi dào Omega-3 (DHA, EPA) tinh khiết",
    origin: "Việt Nam (Nguyên liệu nhập khẩu từ Na Uy)",
    description: 'Chai mini 50ml tiện lợi bảo toàn tuyệt đối độ tươi mới và hàm lượng DHA tinh khiết.',
    ingredients: 'Dầu cá hồi biển sâu tinh khiết, vitamin E tự nhiên',
    usage: 'Nhỏ vài giọt đến 1 thìa cà phê vào bát cháo nóng của bé.'
  },
  {
    category: 'Dầu ăn dặm',
    name: 'Dầu ăn dặm Cá hồi 150ml',
    sku: 'DADCAHOI150ML',
    groupId: 'dau-ca-hoi',
    variantLabel: 'Chai 150ml',
    size: '150ml',
    age: '>= 6 tháng',
    price: 139000,
    rating: 4.9,
    reviews: 53,
    flavor: "Ngậy béo tự nhiên, đã khử mùi tanh gắt, dễ chịu cho bé",
    nutrition: "Hàm lượng đậm đặc Omega-3, DHA, EPA và Vitamin E tự nhiên",
    origin: "Việt Nam (Nguyên liệu nhập khẩu từ Na Uy)",
    description: 'Chiết xuất tinh khiết từ cá hồi biển sâu, từng giọt dầu đậm đặc Omega-3.',
    ingredients: 'Dầu cá hồi biển sâu tinh khiết, vitamin E tự nhiên',
    usage: 'Cho 1 thìa nhỏ (khoảng 5ml) vào thức ăn dặm của trẻ khi còn ấm nóng.'
  },
  {
    category: 'Dầu ăn dặm',
    name: 'Dầu ăn dặm Gấc 50ml',
    sku: 'DADGAC50ML',
    groupId: 'dau-gac',
    variantLabel: 'Chai 50ml',
    size: '50ml',
    age: '>= 6 tháng',
    price: 49000,
    rating: 4.9,
    reviews: 50,
    flavor: "Thơm mùi màng gấc chín, béo ngậy dịu",
    nutrition: "Giàu tiền Vitamin A (Beta-Carotene) và Vitamin E",
    origin: "Việt Nam",
    description: 'Dung tích 50ml nhỏ gọn lưu giữ tinh chất gấc tươi nguyên bản.',
    ingredients: 'Tinh dầu màng quả gấc nguyên chất ép tự nhiên',
    usage: 'Trộn trực tiếp 1 muỗng cà phê nhỏ vào cháo/bột ăn dặm của bé.'
  },
  {
    category: 'Dầu ăn dặm',
    name: 'Dầu ăn dặm Gấc 150ml',
    sku: 'DADGAC150ML',
    groupId: 'dau-gac',
    variantLabel: 'Chai 150ml',
    size: '150ml',
    age: '>= 6 tháng',
    price: 139000,
    rating: 4.9,
    reviews: 50,
    flavor: "Thơm dịu mộc mạc, ngậy nhẹ tự nhiên",
    nutrition: "Hàm lượng Beta-Carotene và Lycopene tự nhiên cực cao",
    origin: "Việt Nam",
    description: 'Sắc đỏ thắm từ màng quả gấc tự nhiên, mang theo nguồn Beta-Caroten và Lycopene dồi dào.',
    ingredients: 'Tinh dầu màng quả gấc nguyên chất ép tự nhiên',
    usage: 'Cho 1 thìa nhỏ (khoảng 5ml) vào thức ăn dặm của trẻ khi còn ấm nóng.'
  },

  /* =====================================================
     7. TRÁI CÂY NGHIỀN
===================================================== */
  {
    category: 'Trái cây nghiền',
    name: 'Bơ Chuối Nghiền Mịn',
    sku: 'TCNAVOBANA90G',
    groupId: 'trai-cay-nghien',
    variantLabel: 'Bơ Chuối',
    size: '90g',
    age: '>= 6 tháng',
    price: 59000,
    rating: 4.9,
    reviews: 45,
    flavor: "Béo ngậy mịn mượt của quả bơ hòa cùng vị ngọt thơm của chuối",
    nutrition: "Dồi dào chất béo tốt lành tính, Kali, Axit Folic và chất xơ hòa tan",
    origin: "Việt Nam",
    description: 'Hòa quyện sánh mịn giữa bơ sáp béo ngậy và chuối ngọt thơm lừng.',
    ingredients: 'Chuối tiêu chín tự nhiên (55%), Bơ sáp tươi chín mềm (44.9%), Vitamin C (0.1%)',
    usage: 'Ăn trực tiếp vào bữa phụ.'
  },
  {
    category: 'Trái cây nghiền',
    name: 'Xoài Chín Cát Chu Nghiền Mịn',
    sku: 'TCNXOAI90G',
    groupId: 'trai-cay-nghien',
    variantLabel: 'Xoài Cát Chu',
    size: '90g',
    age: '>= 6 tháng',
    price: 59000,
    rating: 4.8,
    reviews: 33,
    flavor: "Ngọt lịm đậm đà, chua nhẹ tự nhiên, thơm nức mùi xoài chín",
    nutrition: "Giàu Vitamin C, Vitamin A, chất xơ tự nhiên",
    origin: "Việt Nam",
    description: 'Chắt chiu vị ngọt lành tự nhiên từ những quả xoài chín mọng thơm lừng.',
    ingredients: 'Xoài chín cây tự nhiên (99.9%), Vitamin C từ sơ ri (0.1%).',
    usage: 'Ăn trực tiếp vào bữa phụ.'
  },

  /* =====================================================
     8. SỮA CHUA UỐNG
  ===================================================== */
  {
    category: 'Sữa chua uống',
    name: 'Sữa chua uống',
    sku: 'SCU200ML',
    size: '200ml',
    age: '>= 6 tháng',
    price: 79000,
    rating: 4.7,
    reviews: 33,
    flavor: "Chua ngọt thanh mát, sánh mịn dễ uống",
    nutrition: "Cung cấp hàng tỷ lợi khuẩn Probiotics, Canxi và Kẽm",
    origin: "Việt Nam",
    description: 'Hương vị chua ngọt thanh mát lên men từ dòng sữa tươi lành, mang theo hàng tỷ lợi khuẩn sống Probiotics.',
    ingredients: 'Sữa bò tươi lên men tự nhiên, men sống probiotics, đường phèn',
    usage: 'Lắc đều trước khi dùng. Uống trực tiếp 1–2 hộp/ngày sau bữa ăn chính 30 phút.'
  },

  /* =====================================================
     9. BÁNH GẠO
  ===================================================== */
  {
    category: 'Bánh gạo',
    name: 'Bánh gạo ngô phô mai',
    sku: 'BGPMNGO50G',
    groupId: 'banh-gao',
    variantLabel: 'Ngô ngọt',
    size: '60g',
    age: '> 8 tháng',
    price: 150000,
    rating: 4.8,
    reviews: 35,
    flavor: "Vị ngọt thanh tự nhiên từ ngô ngọt hòa quyện cùng vị phô mai béo ngậy",
    nutrition: "Bổ sung Canxi từ phô mai, Vitamin A, B và chất xơ tự nhiên từ ngô ngọt hỗ trợ tiêu hóa",
    origin: "Việt Nam",
    description: 'Sự kết hợp thơm ngon giữa ngô ngọt tự nhiên và phô mai béo ngậy, kích thích vị giác của bé.',
    ingredients: 'Gạo tẻ (70%), phô mai (5%), bột phô (3%), dầu thực vật, đường, bột gạo, chất điều chỉnh độ chua (acid citric)',
    usage: 'Cho bé tự cầm ăn trực tiếp, rèn luyện cơ hàm và phản xạ nhón tay.'
  },
  {
    category: 'Bánh gạo',
    name: 'Bánh gạo phô mai việt quất',
    sku: 'BGPMVQ50G',
    groupId: 'banh-gao',
    variantLabel: 'Việt quất',
    size: '60g',
    age: '> 8 tháng',
    price: 150000,
    rating: 4.8,
    reviews: 33,
    flavor: "Chua ngọt mát lành của việt quất hòa quyện vị ngậy phô mai",
    nutrition: "Bổ sung Canxi, Anthocyanin tốt cho mắt và chất xơ dịu nhẹ",
    origin: "Việt Nam",
    description: 'Màu sắc tự nhiên quyện cùng vị thanh dịu ngọt lành của việt quất và phô mai thơm ngậy.',
    ingredients: 'Gạo organic, phô mai bột (4%), bột quả việt quất (3%), canxi',
    usage: 'Cho bé ăn trực tiếp như bữa xế; cho uống thêm ngụm nước sau khi ăn xong.'
  },

  /* =====================================================
     10. CHÁO ĂN DẶM
  ===================================================== */
  {
    category: 'Cháo ăn dặm',
    name: 'Cháo ăn dặm cá hồi',
    sku: 'CADCAHOI170G',
    groupId: 'chao-an-dam',
    variantLabel: 'Cá hồi',
    size: '120g',
    age: '>= 6 tháng',
    price: 129000,
    rating: 4.5,
    reviews: 37,
    flavor: "Thơm ngọt thịt cá hồi, sánh mịn đậm đà dinh dưỡng",
    nutrition: "Cung cấp Protein hoàn chỉnh, Axit béo Omega-3 (DHA/EPA), Sắt và Kẽm",
    origin: "Việt Nam",
    description: 'Hạt gạo nở mềm sánh mịn hòa cùng vị ngọt thơm béo tự nhiên từ từng thớ cá hồi bổ dưỡng.',
    ingredients: 'Nước hầm xương, gạo thơm, thịt cá hồi (10%), cà rốt, dầu mè',
    usage: 'Ngâm cả túi cháo vào bát nước sôi 3–5 phút hoặc đổ ra bát quay vi sóng 30–60 giây.'
  },
  {
    category: 'Cháo ăn dặm',
    name: 'Cháo ăn dặm yến mạch',
    sku: 'CADYENMACH170G',
    groupId: 'chao-an-dam',
    variantLabel: 'Yến mạch',
    size: '120g',
    age: '>= 6 tháng',
    price: 129000,
    rating: 4.5,
    reviews: 37,
    flavor: "Thơm nức mùi yến mạch, ngọt hậu, sánh dẻo êm bụng",
    nutrition: "Giàu chất xơ Beta-Glucan, Vitamin nhóm B và khoáng chất hỗ trợ tiêu hóa",
    origin: "Việt Nam",
    description: 'Hương vị thanh đạm dịu mát nhẹ tênh, giúp xoa dịu đường ruột.',
    ingredients: 'Yến mạch nguyên cám nghiền vỡ, dầu thực vật (4%)',
    usage: 'Làm nóng bằng nước sôi hoặc vi sóng, kiểm tra nhiệt độ vừa ấm rồi cho bé ăn.'
  },

  /* =====================================================
     11. DẦU MASSAGE
  ===================================================== */
  {
    category: 'Dầu massage',
    name: 'Dầu massage cho bé',
    sku: 'DMASSAGE148ML',
    size: '148ml',
    age: 'Sơ sinh',
    price: 89000,
    rating: 4.8,
    reviews: 43,
    flavor: "Hương hoa cúc / thảo mộc dịu nhẹ thư giãn, không mùi hóa học",
    nutrition: "Giàu Vitamin E tự nhiên, Axit béo dưỡng ẩm sâu, làm mềm dịu làn da",
    origin: "Việt Nam",
    description: 'Lớp màng khóa ẩm dịu nhẹ từ thực vật giúp bảo vệ tối ưu hàng rào da mỏng manh của bé.',
    ingredients: 'Dầu hướng dương tự nhiên, Vitamin E, dưỡng chất làm mềm da',
    usage: 'Làm ấm 2-3 giọt dầu vào lòng bàn tay rồi massage nhẹ nhàng toàn thân cho bé.'
  }
];


/* =========================
   CẤU HÌNH ẢNH
========================= */

const IMAGE_BASE = '../assets/images/products/';

const PRODUCT_IMAGES = {

  SBMILK6MONTH: [
    'SBMILK6MONTH_01'
  ],

  SBMILK1YEAR: [
    'SBMILK1YEAR_01'
  ],

  HYENMACH70G: [
    'HYENMACH70G_01',
    'HYENMACH70G_02'
  ],

  DHALAN70G: [
    'HDAUHALAN70G_01',
    'HDAUHALAN70G_02'
  ],
  DGAARGENTINA70G: [
  'DGAARGENTINA70G_01',
  'DGAARGENTINA70G_02'
],
  HKENEP70G: [
    'HKETNEP70G_01',
    'HKETNEP70G_02'
  ],

  HDIEMMACH70G: [
    'HDIEMMACH70G_01',
    'HDIEMMACH70G_02'
  ],

  BADQUEDAU40G: [
    'BADDAU_01',
    'BADDAU_02'
  ],

  BADVXOAI40G: [
    'BADXOAI_01',
    'BADXOAI_02'
  ],

  BADVTRAICAY40G: [
    'BADCHUOI_01',
    'BADCHUOI_02'
  ],

  BHADVVQ50G: [
    'BANHHUVIETQUAT_01'
  ],

  BHADVC50G: [
    'BANHHUCHUOI_01'
  ],

  BQVVQ50G: [
    'BANHQUYVIETQUAT_01',
    'BANHQUYVIETQUAT_02'
  ],

  BQVKL50G: [
    'BANHQUYKHOAILANG_01',
    'BANHQUYKHOAILANG_02'
  ],

  BQVKIWI35G: [
    'BQKIWI35G_01',
    'BQKIWI35G_02'
  ],

  DADOLIVE150ML: [
    'DADOLIVE150ML_01',
    'DADOLIVE150ML_02',
    'DADOLIVE150ML_03'
  ],

  DADCAHOI150ML: [
    'DADCAHOI150_01',
    'DADCAHOI150_02',
    'DADCAHOI150_03'
  ],

  DADGAC150ML: [
    'DADGAC150_01',
    'DADGAC150_02',
    'DADGAC150_03'
  ],

  DADOLIVE50ML: [
    'DADOLIVE50_01',
    'DADOLIVE50_03',
    'DADOLIVE50_04'
  ],

  DADCAHOI50ML: [
    'DADCAHOI50_01',
    'DADCAHOI50_03',
  ],

  DADGAC50ML: [
    'DADGAC50_01',
    'DADGAC50_03'
  ],

  TCNAVOBANA90G: [
    'TRAICAYNGHIENVICHUOIBO_01',
    'TRAICAYNGHIENVICHUOIBO_02'
  ],

  TCNXOAI90G: [
    'TRAICAYNGHIENVIXOAI_01',
    'TRAICAYNGHIENVIXOAI_02'
  ],

  SCU200ML: [
    'SUACHUAUONG_01',
    'SUACHUAUONG_02'
  ],

  BGPMNGO50G: [
    'BANHGAONGOPM_01',
    'BANHGAONGOPM_02'
  ],

  BGPMVQ50G: [
    'BANHGAOVIETQUAT_01',
    'BANHGAOVIETQUAT_02'
  ],

  CADCAHOI170G: [
    'CHAOCAHOI_01'
  ],

  CADYENMACH170G: [
    'CHAOYENMACH_01',
    'CHAOYENMACH_02'
  ],

  DMASSAGE148ML: [
    'DAUMASSAGE_01',
    'DAUMASSAGE_02'
  ]

};


/* =========================
   BIẾN CHUNG
========================= */

const $ = (selector) =>
  document.querySelector(selector);

const money = (value) => {
  if (value == null) {
    return 'Đang cập nhật';
  }

  return value.toLocaleString('vi-VN') + 'đ';
};

const IMAGE_EXTENSIONS = ['png'];

function loadProductImage(img) {
  const baseName = img.dataset.imageBase;

  if (!baseName) {
    img.style.display = 'none';
    return;
  }

  img.src = `${IMAGE_BASE}${baseName}.png`;
}

function bindProductImages() {
  document
    .querySelectorAll('.product-image img[data-image-base]')
    .forEach(loadProductImage);
}

let currentPage = 1;

const PAGE_SIZE = 9;


/* =========================
   HIỂN THỊ SẢN PHẨM
========================= */

function productCard(product) {

  const displayName =
    product.name ||
    `Tên sản phẩm — ${product.sku}`;

  return `
    <article
      class="product-card"
      data-category="${product.category}"
      data-price="${product.price ?? 999999999}"
    >

      <div class="product-badge">
        ${product.age}
      </div>

      <a
        class="product-image"
        href="product-detail.html?sku=${encodeURIComponent(product.sku)}"
        aria-label="${displayName}"
      >

<img
  src=""
  alt="${displayName}"
  data-image-base="${(PRODUCT_IMAGES[product.sku] || [])[0] || ''}"
>

      </a>

      <div class="product-category">
        ${product.category} · ${product.sku}
      </div>

      <h3 class="product-name">
        ${displayName}
      </h3>

      <p class="product-description">
        ${product.description}
      </p>

      <div class="product-bottom">

        <span class="product-age">
          ${product.size}
        </span>

        <span class="product-price">
          ${money(product.price)}
        </span>

      </div>

      <button
        class="add-cart-btn"
        type="button"
        data-sku="${product.sku}"
      >
        <i class="fa-solid fa-cart-plus"></i>
        Thêm vào giỏ
      </button>

    </article>
  `;
}


/* =========================
   LỌC SẢN PHẨM
========================= */

const ALLERGY_COW_MILK_FREE_SKUS = new Set([
  'HYENMACH70G',
  'HKENEP70G',
  'DHALAN70G',
  'HDIEMMACH70G',
  'BHADVVQ50G',
  'BHADVT50G',
  'BHADVC50G',
  'BADQUEDAU40G',
  'BADVXOAI40G',
  'BADVTRAICAY40G',
  'DADOLIVE150ML',
  'DADCAHOI150ML',
  'DADGAC150ML',
  'DADOLIVE50ML',
  'DADCAHOI50ML',
  'DADGAC50ML',
  'TCNAVOBANA90G',
  'TCNXOAI90G',
  'CADCAHOI170G',
  'CADYENMACH170G',
  'DMASSAGE148ML',
  'BQVKL50G',
  'BQVVQ50G',
  'BQVKIWI35G'
]);


function getFilteredProducts() {

  const checked = [
    ...document.querySelectorAll(
      '.filter-sidebar input[type="checkbox"]:checked'
    )
  ];

  const categoryFilters = checked
    .filter(input => input.dataset.filter === 'category')
    .map(input => input.value);

  const allergyFilter = checked
    .some(
      input =>
        input.dataset.filter === 'allergy' &&
        input.value === 'cow-milk-protein-free'
    );

  return PRODUCTS.filter(product => {

    const categoryOk =
      !categoryFilters.length ||
      categoryFilters.includes(product.category);

    const allergyOk =
      !allergyFilter ||
      ALLERGY_COW_MILK_FREE_SKUS.has(product.sku);

    return categoryOk && allergyOk;
  });
}


/* =========================
   SẮP XẾP
========================= */

function sortProducts(products) {

  const sortSelect =
    $('#sortSelect');

  if (!sortSelect) {
    return products;
  }

  const value =
    sortSelect.value;

  const sorted =
    [...products];

  if (value === 'asc') {

    sorted.sort(
      (a, b) =>
        (a.price ?? Infinity) -
        (b.price ?? Infinity)
    );

  }

  if (value === 'desc') {

    sorted.sort(
      (a, b) =>
        (b.price ?? -1) -
        (a.price ?? -1)
    );

  }

  if (value === 'newest') {
    sorted.reverse();
  }

  return sorted;
}
/* =========================
   RENDER SẢN PHẨM
========================= */

function renderProducts() {

  const productGrid =
    $('#productGrid');

  if (!productGrid) {
    return;
  }

  const products =
    sortProducts(
      getFilteredProducts()
    );

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        products.length / PAGE_SIZE
      )
    );

  currentPage =
    Math.min(
      currentPage,
      totalPages
    );

  const start =
    (currentPage - 1) *
    PAGE_SIZE;

  const currentProducts =
    products.slice(
      start,
      start + PAGE_SIZE
    );

  productGrid.innerHTML =
    currentProducts
      .map(productCard)
      .join('') ||
    `
      <p class="empty-products">
        Chưa có sản phẩm phù hợp.
      </p>
    `;

  renderPagination(totalPages);

  bindCartButtons();

  bindProductImages();

  renderPersonalized();
}


/* =========================
   PHÂN TRANG
========================= */

function renderPagination(totalPages) {

  const pagination =
    $('#pagination');

  if (!pagination) {
    return;
  }

  pagination.innerHTML =
    Array.from(
      {
        length: totalPages
      },
      (_, index) => {

        const page =
          index + 1;

        return `
          <button
            type="button"
            class="${page === currentPage ? 'active' : ''}"
            data-page="${page}"
          >
            ${page}
          </button>
        `;
      }
    ).join('');

  pagination
    .querySelectorAll('button')
    .forEach(button => {

      button.addEventListener(
        'click',
        () => {

          currentPage =
            Number(
              button.dataset.page
            );

          renderProducts();

          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

        }
      );

    });
}


/* =========================
   CÁ NHÂN HÓA SẢN PHẨM
========================= */

function getBabyProfile() {

  try {

    const currentUser =
      JSON.parse(
        localStorage.getItem('bebiteCurrentUser') || 'null'
      );

    if (
      currentUser &&
      currentUser.babyProfile
    ) {
      return currentUser.babyProfile;
    }

  } catch (error) {

    console.error(
      'Không đọc được hồ sơ bé:',
      error
    );

  }

  return null;
}


/* =========================
   CHUYỂN TUỔI THÀNH SỐ
========================= */

function getBabyAgeNumber(ageText) {

  const text =
    String(ageText || '')
      .toLowerCase()
      .trim();

  if (text.includes('6–8') || text.includes('6-8')) {
    return 7;
  }

  if (text.includes('9–12') || text.includes('9-12')) {
    return 10;
  }

  if (text.includes('12–24') || text.includes('12-24')) {
    return 18;
  }

  if (text.includes('trên 24')) {
    return 25;
  }

  return 7;
}


/* =========================
   KIỂM TRA TUỔI SẢN PHẨM
========================= */

function getProductMinAge(product) {

  const age =
    String(product.age || '')
      .toLowerCase();

  if (age.includes('sơ sinh')) {
    return 0;
  }

  const match =
    age.match(/(\d+)/);

  if (!match) {
    return 0;
  }

  return Number(match[1]);
}


/* =========================
   KIỂM TRA DỊ ỨNG
========================= */

function isProductExcludedByAllergy(
  product,
  allergy
) {

  if (!allergy) {
    return false;
  }

  if (
    allergy === 'Không có' ||
    allergy === 'Chưa cập nhật'
  ) {
    return false;
  }

  const text = (
    `${product.name || ''} ${product.description || ''}`
  ).toLowerCase();

  /* SỮA BÒ */

  if (allergy === 'Sữa bò') {

    const milkKeywords = [
      'sữa',
      'phô mai',
      'cheddar',
      'bơ tươi',
      'bơ lạt',
      'whey',
      'milk'
    ];

    return milkKeywords.some(
      keyword =>
        text.includes(keyword)
    );
  }


  /* TRỨNG */

  if (allergy === 'Trứng') {

    const eggKeywords = [
      'trứng',
      'lòng đỏ',
      'egg'
    ];

    return eggKeywords.some(
      keyword =>
        text.includes(keyword)
    );
  }


  /* HẢI SẢN */

  if (allergy === 'Hải sản') {

    const seafoodKeywords = [
      'cá hồi',
      'hải sản',
      'tôm',
      'cua',
      'fish',
      'salmon'
    ];

    return seafoodKeywords.some(
      keyword =>
        text.includes(keyword)
    );
  }

  return false;
}


/* =========================
   NHÓM SẢN PHẨM THEO
   SỞ THÍCH CỦA BÉ
========================= */

function getInterestCategories(
  interest
) {

  switch (interest) {

    case 'Cháo ăn dặm':

      return [
        'Cháo ăn dặm',
        'Các loại hạt'
      ];


    case 'Bánh ăn dặm':

      return [
        'Bánh ăn dặm',
        'Bánh hũ',
        'Bánh quy ăn dặm',
        'Bánh gạo'
      ];


    case 'Dầu ăn dặm':

      return [
        'Dầu ăn dặm'
      ];


    case 'Trái cây & rau củ nghiền':

      return [
        'Trái cây nghiền'
      ];


    default:

      return [];
  }
}


/* =========================
   CHẤM ĐIỂM SẢN PHẨM
========================= */

function getPersonalizedScore(
  product,
  profile
) {

  let score = 0;

  const babyAge =
    getBabyAgeNumber(profile.age);

  const productMinAge =
    getProductMinAge(product);


  /* -------------------------
     1. ĐỘ TUỔI
  ------------------------- */

  if (
    productMinAge <= babyAge
  ) {

    score += 20;

  } else {

    return -999;

  }


  /* -------------------------
     2. SẢN PHẨM QUAN TÂM
  ------------------------- */

  const interestCategories =
    getInterestCategories(
      profile.interest
    );

  if (
    interestCategories.includes(
      product.category
    )
  ) {

    score += 50;

  }


  /* -------------------------
     3. GIAI ĐOẠN ĂN DẶM
  ------------------------- */

  if (
    profile.stage ===
    'Mới bắt đầu ăn dặm'
  ) {

    if (
      product.category ===
        'Cháo ăn dặm' ||
      product.category ===
        'Các loại hạt' ||
      product.category ===
        'Trái cây nghiền'
    ) {

      score += 15;

    }

  }


  if (
    profile.stage ===
    'Đang làm quen với ăn dặm'
  ) {

    if (
      product.category ===
        'Cháo ăn dặm' ||
      product.category ===
        'Bánh ăn dặm' ||
      product.category ===
        'Trái cây nghiền' ||
      product.category ===
        'Dầu ăn dặm'
    ) {

      score += 15;

    }

  }


  if (
    profile.stage ===
    'Ăn dặm ổn định'
  ) {

    if (
      product.category ===
        'Bánh ăn dặm' ||
      product.category ===
        'Bánh hũ' ||
      product.category ===
        'Bánh quy ăn dặm' ||
      product.category ===
        'Bánh gạo'
    ) {

      score += 10;

    }

  }


  /* -------------------------
     4. LỌC DỊ ỨNG
  ------------------------- */

  if (
    isProductExcludedByAllergy(
      product,
      profile.allergy
    )
  ) {

    return -999;

  }


  return score;
}


/* =========================
   LẤY SẢN PHẨM CÁ NHÂN HÓA
========================= */

function getPersonalizedProducts() {

  const profile =
    getBabyProfile();

  /*
   * Chưa có hồ sơ bé
   * → hiển thị 4 sản phẩm mặc định
   */

  if (!profile) {

    return PRODUCTS.slice(0, 4);

  }


  const scoredProducts =
    PRODUCTS
      .map(product => ({

        product,

        score:
          getPersonalizedScore(
            product,
            profile
          )

      }))
      .filter(item =>
        item.score > -999
      )
      .sort(
        (a, b) =>
          b.score - a.score
      );


  /*
   * Nếu không tìm được sản phẩm
   * phù hợp thì dùng sản phẩm mặc định
   */

  if (!scoredProducts.length) {

    return PRODUCTS.slice(0, 4);

  }


  return scoredProducts
    .slice(0, 4)
    .map(item => item.product);
}

/* =========================
   CÁ NHÂN HÓA SẢN PHẨM
========================= */

function getBabyProfile() {

  try {

    const currentUser =
      JSON.parse(
        localStorage.getItem("bebiteCurrentUser") || "null"
      );

    if (!currentUser) {
      return null;
    }

    return currentUser.babyProfile || null;

  } catch (error) {

    console.error(
      "Không đọc được hồ sơ bé:",
      error
    );

    return null;
  }
}


/* =========================
   KIỂM TRA DỊ ỨNG
========================= */

function isExcludedByCowMilkAllergy(product, allergy) {

  if (
    String(allergy || "").trim() !== "Sữa bò"
  ) {
    return false;
  }

  /*
   * Các SKU chắc chắn KHÔNG chứa
   * thành phần sữa bò theo dữ liệu sản phẩm
   */
  if (
    ALLERGY_COW_MILK_FREE_SKUS.has(product.sku)
  ) {
    return false;
  }

  /*
   * Nếu không nằm trong danh sách an toàn
   * thì kiểm tra thêm tên + thành phần.
   */
  const text = `
    ${product.name || ""}
    ${product.description || ""}
    ${product.ingredients || ""}
  `.toLowerCase();

  const cowMilkKeywords = [
    "sữa",
    "sữa bò",
    "sữa bột",
    "sữa nguyên kem",
    "phô mai",
    "cheddar",
    "bơ",
    "whey",
    "milk",
    "cheese"
  ];

  return cowMilkKeywords.some(function(keyword) {

    return text.includes(keyword);

  });
}


/* =========================
   LẤY TUỔI TỪ HỒ SƠ
========================= */

function getBabyAgeNumber(ageText) {

  const value =
    String(ageText || "")
      .trim()
      .toLowerCase();

  if (value.includes("6–8") || value.includes("6-8")) {
    return 7;
  }

  if (value.includes("9–12") || value.includes("9-12")) {
    return 10;
  }

  if (value.includes("12–24") || value.includes("12-24")) {
    return 18;
  }

  if (value.includes("trên 24")) {
    return 25;
  }

  return 7;
}


/* =========================
   LẤY TUỔI TỐI THIỂU SP
========================= */

function getProductMinAge(product) {

  const age =
    String(product.age || "")
      .toLowerCase();

  if (age.includes("sơ sinh")) {
    return 0;
  }

  const match =
    age.match(/(\d+)/);

  if (!match) {
    return 0;
  }

  return Number(match[1]);
}


/* =========================
   NHÓM SẢN PHẨM THEO SỞ THÍCH
========================= */

function getInterestCategories(interest) {

  switch (
    String(interest || "").trim()
  ) {

    case "Bánh ăn dặm":

      return [
        "Bánh ăn dặm",
        "Bánh hũ",
        "Bánh quy ăn dặm",
        "Bánh gạo"
      ];


    case "Dầu ăn dặm":

      return [
        "Dầu ăn dặm"
      ];


    case "Trái cây & rau củ nghiền":

      return [
        "Trái cây nghiền"
      ];


    case "Cháo ăn dặm":

      return [
        "Cháo ăn dặm",
        "Các loại hạt"
      ];


    default:

      return [];

  }
}


/* =========================
   CHẤM ĐIỂM SẢN PHẨM
========================= */

function getPersonalizedScore(
  product,
  profile
) {

  if (!profile) {
    return -999;
  }


  /* =====================
     1. KIỂM TRA DỊ ỨNG
  ===================== */

  if (
    isExcludedByCowMilkAllergy(
      product,
      profile.allergy
    )
  ) {

    return -999;
  }


  /* =====================
     2. KIỂM TRA ĐỘ TUỔI
  ===================== */

  const babyAge =
    getBabyAgeNumber(
      profile.age
    );

  const productMinAge =
    getProductMinAge(
      product
    );

  if (
    productMinAge > babyAge
  ) {

    return -999;
  }


  let score = 0;


  /*
   * Đúng độ tuổi
   */
  score += 20;


  /* =====================
     3. SỞ THÍCH
  ===================== */

  const interestCategories =
    getInterestCategories(
      profile.interest
    );

  if (
    interestCategories.includes(
      product.category
    )
  ) {

    score += 50;
  }


  /* =====================
     4. GIAI ĐOẠN ĂN DẶM
  ===================== */

  const stage =
    String(profile.stage || "")
      .trim();


  if (
    stage === "Mới bắt đầu ăn dặm"
  ) {

    if (
      [
        "Cháo ăn dặm",
        "Các loại hạt",
        "Trái cây nghiền"
      ].includes(product.category)
    ) {

      score += 15;
    }
  }


  if (
    stage === "Đang làm quen với ăn dặm"
  ) {

    if (
      [
        "Cháo ăn dặm",
        "Bánh ăn dặm",
        "Bánh hũ",
        "Trái cây nghiền",
        "Dầu ăn dặm"
      ].includes(product.category)
    ) {

      score += 15;
    }
  }


  if (
    stage === "Ăn dặm ổn định"
  ) {

    if (
      [
        "Bánh ăn dặm",
        "Bánh hũ",
        "Bánh quy ăn dặm",
        "Bánh gạo"
      ].includes(product.category)
    ) {

      score += 15;
    }
  }


  return score;
}


/* =========================
   LẤY SẢN PHẨM CÁ NHÂN HÓA
========================= */

function getPersonalizedProducts() {

  const profile =
    getBabyProfile();


  /*
   * Chưa có hồ sơ
   */
  if (!profile) {

    return PRODUCTS.slice(0, 4);
  }


  const scoredProducts =
    PRODUCTS
      .map(function(product) {

        return {
          product: product,

          score:
            getPersonalizedScore(
              product,
              profile
            )
        };

      })
      .filter(function(item) {

        return item.score > -999;

      })
      .sort(function(a, b) {

        return b.score - a.score;

      });


  return scoredProducts
    .slice(0, 4)
    .map(function(item) {

      return item.product;

    });
}


/* =========================
   RENDER
========================= */

function renderPersonalized() {

  const personalizedGrid =
    $('#personalizedGrid');

  if (!personalizedGrid) {
    return;
  }


  const products =
    getPersonalizedProducts();


  personalizedGrid.innerHTML =
    products
      .map(productCard)
      .join("");


  bindCartButtons();

  bindProductImages();
}


/* =========================
   GIỎ HÀNG
========================= */


function bindCartButtons() {
  document
    .querySelectorAll('.add-cart-btn')
    .forEach(button => {

      // Tránh gắn sự kiện trùng khi render lại
      if (button.dataset.cartBound === 'true') {
        return;
      }

      button.dataset.cartBound = 'true';

      button.addEventListener('click', () => {
        const product = PRODUCTS.find(
          item => item.sku === button.dataset.sku
        );

        if (!product) return;

        const stock = Number(product.stock ?? 0);

        // Không cho mua nếu hết hàng
        if (stock <= 0) {
          button.innerHTML = 'Hết hàng';
          button.disabled = true;
          return;
        }

        const cart = JSON.parse(
          localStorage.getItem('bebite_cart') || '[]'
        );

        const item = cart.find(
          item => item.sku === product.sku
        );

        const currentQuantity = item
          ? Number(item.quantity || 0)
          : 0;

        // Không cho số lượng trong giỏ vượt tồn kho
        if (currentQuantity >= stock) {
          button.innerHTML = 'Đã đạt số lượng tối đa';
          return;
        }

        if (item) {
          item.quantity = currentQuantity + 1;
        } else {
          cart.push({
            sku: product.sku,
            name: product.name || `Sản phẩm — ${product.sku}`,
            price: Number(product.price || 0),
            quantity: 1
          });
        }

        localStorage.setItem(
          'bebite_cart',
          JSON.stringify(cart)
        );

        button.innerHTML = `
          <i class="fa-solid fa-check"></i>
          Đã thêm
        `;

        setTimeout(() => {
          if (!button.isConnected) return;

          button.innerHTML = `
            <i class="fa-solid fa-cart-plus"></i>
            Thêm vào giỏ
          `;
        }, 1200);
      });
    });
}

/* =========================
   CHỌN ĐỊA CHỈ
========================= */

const ADDRESS_API =
  'https://provinces.open-api.vn/api';

let addressData = {
  province: null,
  district: null,
  ward: null
};


async function loadProvinces() {

  const select =
    $('#provinceSelect');

  if (!select) {
    return;
  }

  try {

    const response =
      await fetch(
        `${ADDRESS_API}/p/`
      );

    const provinces =
      await response.json();

    select.innerHTML =
      `
        <option value="">
          Chọn tỉnh / thành phố
        </option>
      ` +

      provinces
        .map(
          province =>
            `
              <option value="${province.code}">
                ${province.name}
              </option>
            `
        )
        .join('');

  } catch (error) {

    select.innerHTML =
      `
        <option value="">
          Không tải được danh sách
        </option>
      `;

  }
}


async function loadDistricts(code) {

  const district =
    $('#districtSelect');

  const ward =
    $('#wardSelect');

  if (!district || !ward) {
    return;
  }

  district.innerHTML =
    `
      <option value="">
        Đang tải...
      </option>
    `;

  district.disabled = true;

  ward.innerHTML =
    `
      <option value="">
        Chọn quận / huyện trước
      </option>
    `;

  ward.disabled = true;

  if (!code) {
    return;
  }

  try {

    const response =
      await fetch(
        `${ADDRESS_API}/p/${code}?depth=2`
      );

    const data =
      await response.json();

    district.innerHTML =
      `
        <option value="">
          Chọn quận / huyện
        </option>
      ` +

      data.districts
        .map(
          item =>
            `
              <option value="${item.code}">
                ${item.name}
              </option>
            `
        )
        .join('');

    district.disabled = false;

  } catch (error) {

    district.innerHTML =
      `
        <option value="">
          Không tải được danh sách
        </option>
      `;

  }
}


async function loadWards(code) {

  const ward =
    $('#wardSelect');

  if (!ward) {
    return;
  }

  ward.innerHTML =
    `
      <option value="">
        Đang tải...
      </option>
    `;

  ward.disabled = true;

  if (!code) {
    return;
  }

  try {

    const response =
      await fetch(
        `${ADDRESS_API}/d/${code}?depth=2`
      );

    const data =
      await response.json();

    ward.innerHTML =
      `
        <option value="">
          Chọn phường / xã
        </option>
      ` +

      data.wards
        .map(
          item =>
            `
              <option value="${item.code}">
                ${item.name}
              </option>
            `
        )
        .join('');

    ward.disabled = false;

  } catch (error) {

    ward.innerHTML =
      `
        <option value="">
          Không tải được danh sách
        </option>
      `;

  }
}


/* =========================
   MỞ / ĐÓNG ĐỊA CHỈ
========================= */

function openLocation() {

  const modal =
    $('#locationModal');

  if (!modal) {
    return;
  }

  modal.classList.add('show');

  modal.setAttribute(
    'aria-hidden',
    'false'
  );

  document.body.classList.add(
    'modal-open'
  );
}
function closeLocation() {
    const modal = document.getElementById('locationModal');

    if (!modal) return;

    // Chuyển focus ra ngoài popup trước khi ẩn
    const activeElement = document.activeElement;

    if (activeElement && modal.contains(activeElement)) {
        activeElement.blur();
    }

    // Ẩn popup
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}
/* =========================
   PREVIEW ĐỊA CHỈ
========================= */

function updateLocationPreview() {

  const province =
    $('#provinceSelect');

  const district =
    $('#districtSelect');

  const ward =
    $('#wardSelect');

  if (!province || !district || !ward) {
    return;
  }

  const provinceName =
    province.selectedOptions[0]?.text || '';

  const districtName =
    district.selectedOptions[0]?.text || '';

  const wardName =
    ward.selectedOptions[0]?.text || '';

  const ready =
    provinceName &&
    !provinceName.startsWith('Chọn') &&
    districtName &&
    !districtName.startsWith('Chọn') &&
    wardName &&
    !wardName.startsWith('Chọn');

  const preview =
    $('#locationPreview');

  const confirm =
    $('#locationConfirm');

  if (ready) {

    preview.textContent =
      `${wardName}, ${districtName}, ${provinceName}`;

    confirm.disabled = false;

  } else {

    preview.textContent =
      'Vui lòng chọn đầy đủ địa chỉ để tiếp tục.';

    confirm.disabled = true;

  }
}


/* =========================
   KHỞI TẠO ĐỊA CHỈ
========================= */

function initLocation() {

  const locationButton =
    $('#locationButton');

  if (!locationButton) {
    return;
  }

  const modalClose =
    $('#locationModalClose');

  const locationCancel =
    $('#locationCancel');

  const provinceSelect =
    $('#provinceSelect');

  const districtSelect =
    $('#districtSelect');

  const wardSelect =
    $('#wardSelect');

  const locationConfirm =
    $('#locationConfirm');

  loadProvinces();

  locationButton.addEventListener(
    'click',
    openLocation
  );

  if (modalClose) {

    modalClose.addEventListener(
      'click',
      closeLocation
    );

  }

  if (locationCancel) {

    locationCancel.addEventListener(
      'click',
      closeLocation
    );

  }

  document
    .querySelectorAll(
      '[data-close-location]'
    )
    .forEach(element => {

      element.addEventListener(
        'click',
        closeLocation
      );

    });


  if (provinceSelect) {

    provinceSelect.addEventListener(
      'change',
      async event => {

        addressData.province =
          event.target.value;

        addressData.district = null;

        addressData.ward = null;

        await loadDistricts(
          event.target.value
        );

        updateLocationPreview();

      }
    );

  }


  if (districtSelect) {

    districtSelect.addEventListener(
      'change',
      async event => {

        addressData.district =
          event.target.value;

        addressData.ward = null;

        await loadWards(
          event.target.value
        );

        updateLocationPreview();

      }
    );

  }


  if (wardSelect) {

    wardSelect.addEventListener(
      'change',
      event => {

        addressData.ward =
          event.target.value;

        updateLocationPreview();

      }
    );

  }



if (locationConfirm) {
  locationConfirm.addEventListener('click', () => {
    const province = $('#provinceSelect');
    const district = $('#districtSelect');
    const ward = $('#wardSelect');

    if (
      !province?.value ||
      !district?.value ||
      !ward?.value
    ) {
      alert('Vui lòng chọn đầy đủ địa chỉ.');
      return;
    }

    const savedAddress = {
      provinceCode: province.value,
      provinceName: province.selectedOptions[0]?.text || '',
      districtCode: district.value,
      districtName: district.selectedOptions[0]?.text || '',
      wardCode: ward.value,
      wardName: ward.selectedOptions[0]?.text || '',
      fullAddress: $('#locationPreview')?.textContent || ''
    };

    localStorage.setItem(
      'bebite_delivery_address',
      JSON.stringify(savedAddress)
    );

    const selectedText = $('#selectedLocationText');

    if (selectedText) {
      selectedText.textContent = savedAddress.fullAddress;
    }

    updateDeliveryEstimate(savedAddress);
    closeLocation();
  });
}

function updateDeliveryEstimate(address) {
  let estimate = document.getElementById('deliveryEstimate');

  if (!estimate) {
    estimate = document.createElement('p');
    estimate.id = 'deliveryEstimate';
    estimate.className = 'delivery-estimate';

    const bar = document.querySelector('.location-bar');

    if (bar) {
      bar.insertAdjacentElement('afterend', estimate);
    }
  }

  if (estimate) {
    estimate.textContent = address
      ? 'Thời gian giao hàng dự kiến: 2–4 ngày làm việc. Khu vực gần kho có thể nhận trong 1–2 ngày; thời gian thực tế tùy tình trạng đơn hàng và vận chuyển.'
      : '';
  }
}

let savedAddress = null;

try {
  const stored = localStorage.getItem('bebite_delivery_address');

  if (stored) {
    savedAddress = JSON.parse(stored);
  }
} catch (error) {
  console.warn('Địa chỉ đã lưu theo định dạng cũ.');
}

if (savedAddress && typeof savedAddress === 'object') {
  const selectedText = $('#selectedLocationText');

  if (selectedText) {
    selectedText.textContent = savedAddress.fullAddress || '';
  }

  updateDeliveryEstimate(savedAddress);
} else if (savedAddress && typeof savedAddress === 'string') {
  // Hỗ trợ địa chỉ cũ đã lưu trước khi cập nhật.
  const selectedText = $('#selectedLocationText');

  if (selectedText) {
    selectedText.textContent = savedAddress;
  }
}

  document.addEventListener(
    'keydown',
    event => {

      if (event.key === 'Escape') {
        closeLocation();
      }

    }
  );

}


/* =========================
   BỘ LỌC
========================= */

function updateCategoryBar() {

  const checked = [
    ...document.querySelectorAll(
      '.filter-sidebar input[data-filter="category"]:checked'
    )
  ].map(input => input.value);

  document
    .querySelectorAll('.category-filter')
    .forEach(button => {

      const category = button.dataset.category;

      const active =
        category === 'all'
          ? checked.length === 0
          : checked.length === 1 && checked[0] === category;

      button.classList.toggle('active', active);
    });
}
document
  .querySelectorAll('.filter-title')
  .forEach(button => {

    button.addEventListener('click', () => {

      const group = button.closest('.filter-group');

      if (group) {
        group.classList.toggle('open');
      }

      const icon = button.querySelector('i');

      if (icon) {
        icon.classList.toggle('fa-chevron-up');
        icon.classList.toggle('fa-chevron-down');
      }
    });
  });


document
  .querySelectorAll('.filter-sidebar input')
  .forEach(input => {

    input.addEventListener('change', () => {

      currentPage = 1;
      updateCategoryBar();
      renderProducts();

    });

  });


document
  .querySelectorAll('.category-filter')
  .forEach(button => {

    button.addEventListener('click', event => {

      event.preventDefault();

      const category =
        button.dataset.category;

      const categoryInputs =
        document.querySelectorAll(
          '.filter-sidebar input[data-filter="category"]'
        );

      categoryInputs.forEach(input => {

        input.checked =
          category !== 'all' &&
          input.value === category;

      });

      currentPage = 1;

      updateCategoryBar();

      renderProducts();

    });

  });


const sortSelect =
  $('#sortSelect');

if (sortSelect) {

  sortSelect.addEventListener(
    'change',
    () => {

      currentPage = 1;

      renderProducts();

    }
  );

}

/* =========================
   ĐÓNG THANH ĐỊA CHỈ
========================= */

function initLocationBarClose() {

  const locationBar =
    document.querySelector(
      '.location-bar'
    );

  const closeButton =
    $('#closeLocationBar');

  if (!locationBar || !closeButton) {
    return;
  }

  if (
    localStorage.getItem(
      'bebite_location_bar_closed'
    ) === '1'
  ) {

    locationBar.style.display =
      'none';

  }

  closeButton.addEventListener(
    'click',
    () => {

      locationBar.style.display =
        'none';

      localStorage.setItem(
        'bebite_location_bar_closed',
        '1'
      );

    }
  );

}

/* =========================
   ĐỒNG BỘ SẢN PHẨM TỪ MYSQL
========================= */

/* =========================
   ĐỒNG BỘ SẢN PHẨM TỪ MYSQL
========================= */

async function loadProductsFromAPI() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/products"
    );

    if (!response.ok) {
      throw new Error("Không tải được danh sách sản phẩm");
    }

    const data = await response.json();

    if (!data.success || !Array.isArray(data.products)) {
      throw new Error("Dữ liệu API không hợp lệ");
    }

    // Lấy thông tin bổ sung của sản phẩm cũ theo SKU.
    const staticProductsBySku = new Map(
      PRODUCTS
        .filter(product => product.sku)
        .map(product => [String(product.sku), product])
    );

    // Dùng danh sách MySQL làm nguồn dữ liệu chính.
    const syncedProducts = data.products.map(dbProduct => {
      const oldProduct = staticProductsBySku.get(
        String(dbProduct.sku || "")
      ) || {};

     return {
  ...oldProduct,
  ...dbProduct,

  // Chuẩn hóa giá thành số nguyên
  price: Math.round(
    Number(dbProduct.price ?? oldProduct.price ?? 0)
  ),

  groupId: oldProduct.groupId || "",
  variantLabel: oldProduct.variantLabel || "",
  size: oldProduct.size || "",
  rating: oldProduct.rating ?? 0,
  reviews: oldProduct.reviews ?? 0,
  flavor: oldProduct.flavor || "",
  nutrition: oldProduct.nutrition || "",
  origin: oldProduct.origin || "",
  ingredients: oldProduct.ingredients || "",
  usage: oldProduct.usage || ""
};
    });

    // Cập nhật mảng sản phẩm đang dùng trên trang.
    PRODUCTS.splice(
      0,
      PRODUCTS.length,
      ...syncedProducts
    );

    currentPage = 1;
    renderProducts();

  } catch (error) {
    console.error("Lỗi đồng bộ sản phẩm:", error);

    // API lỗi thì vẫn hiển thị dữ liệu tĩnh ban đầu.
    renderProducts();
  }
}

/* =========================
   KHỞI CHẠY
========================= */
initLocation();

initLocationBarClose();

loadProductsFromAPI();
if (typeof module !== "undefined") {
    module.exports = { PRODUCTS, PRODUCT_IMAGES };
}
// Xuất danh sách sản phẩm Bébite ra file JSON để nhập MySQL
if (
    typeof PRODUCTS !== "undefined" &&
    typeof PRODUCT_IMAGES !== "undefined" &&
    new URLSearchParams(window.location.search).has("exportProducts")
) {
    const exportData = PRODUCTS.map(product => {
        const imageName = PRODUCT_IMAGES[product.sku]?.[0] || "";

        return {
            name: product.name,
            category: product.category,
            price: Number(product.price),
            image: imageName
                ? `/assets/images/products/${imageName}.png`
                : null,
            description: product.description || "",
            age: product.age || "",
            stock: 0
        };
    });

    const blob = new Blob(
        [JSON.stringify(exportData, null, 2)],
        { type: "application/json" }
    );

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "products.json";
    link.click();

    URL.revokeObjectURL(link.href);
}