export type LessonSection = {
  title: string;
  body: string;
  points?: string[];
};

export type FormulaItem = {
  label: string;
  expression: string;
  explanation: string;
};

export type ChapterLessonContent = {
  objectives: string[];
  diagram: { label: string; detail: string }[];
  sections: LessonSection[];
  takeaway: string;
  mistakes: string[];
  formulas: FormulaItem[];
  example: { problem: string; steps: string[]; result: string };
};

export const chapterContents: Record<string, ChapterLessonContent> = {
  "tong-quan": {
    objectives: ["Phân biệt kiến trúc và tổ chức máy tính", "Mô tả mô hình Von Neumann", "Theo dõi hành trình của một lệnh"],
    diagram: [
      { label: "CPU", detail: "Điều khiển + xử lý" },
      { label: "BUS", detail: "Địa chỉ · dữ liệu · điều khiển" },
      { label: "MEM/I/O", detail: "Lưu trữ và giao tiếp" },
    ],
    sections: [
      { title: "Kiến trúc và tổ chức máy tính", body: "Kiến trúc máy tính là phần mà người lập trình nhìn thấy: tập lệnh, thanh ghi, kiểu dữ liệu và cách định địa chỉ. Tổ chức máy tính là cách phần cứng hiện thực kiến trúc đó bằng ALU, bus, bộ nhớ, tín hiệu điều khiển và công nghệ mạch.", points: ["Cùng một ISA có thể được hiện thực bởi nhiều CPU khác nhau.", "Thay đổi cache hoặc pipeline thường thuộc tổ chức; thêm lệnh mới thuộc kiến trúc."] },
      { title: "Mô hình chương trình lưu trữ", body: "Trong mô hình Von Neumann, lệnh và dữ liệu cùng nằm trong bộ nhớ và đi qua một đường truyền chung. CPU đọc lệnh tại địa chỉ do PC chỉ ra, giải mã opcode, lấy toán hạng, thực thi rồi ghi kết quả.", points: ["PC giữ địa chỉ lệnh kế tiếp; IR giữ lệnh đang xử lý.", "Nút thắt Von Neumann xuất hiện khi CPU phải chờ đường truyền bộ nhớ."] },
      { title: "Các tầng của một hệ thống", body: "Một chương trình đi qua nhiều tầng: mã nguồn → trình biên dịch → hợp ngữ/mã máy → ISA → vi kiến trúc → mạch số. Hiểu từng tầng giúp xác định lỗi và lý giải vì sao cùng một chương trình có thể chạy nhanh chậm khác nhau." },
    ],
    takeaway: "Hãy luôn nhìn máy tính như một hệ thống phối hợp: CPU thực thi, bộ nhớ cung cấp lệnh/dữ liệu, I/O giao tiếp bên ngoài và bus nối các khối.",
    mistakes: ["Đồng nhất kiến trúc với cấu tạo vật lý của CPU", "Cho rằng dữ liệu luôn nằm sẵn trong CPU", "Nhầm PC chứa lệnh thay vì địa chỉ lệnh"],
    formulas: [
      { label: "Chu kỳ lệnh", expression: "Fetch → Decode → Execute → Memory → Write-back", explanation: "Không phải lệnh nào cũng dùng đủ năm bước, nhưng đây là khung suy luận phổ biến." },
      { label: "Thông lượng", expression: "Throughput = Số công việc / Thời gian", explanation: "Thông lượng mô tả số tác vụ hoàn thành trong một đơn vị thời gian." },
    ],
    example: { problem: "CPU đang có PC = 1000 và lệnh dài 4 byte. Điều gì xảy ra khi nạp lệnh tuần tự?", steps: ["Đặt địa chỉ 1000 lên bus địa chỉ và đọc lệnh từ bộ nhớ.", "Đưa lệnh vào IR để Control Unit giải mã.", "Cập nhật PC = 1000 + 4 = 1004 trước khi thực thi lệnh hiện tại."], result: "Nếu lệnh không rẽ nhánh, lần nạp tiếp theo bắt đầu tại địa chỉ 1004." },
  },
  "he-dem": {
    objectives: ["Hiểu giá trị theo vị trí của một chữ số", "Chuyển đổi giữa BIN, OCT, DEC, HEX", "Thực hiện phép toán nhị phân cơ bản"],
    diagram: [
      { label: "BIN", detail: "Cơ số 2 · 0–1" },
      { label: "OCT/DEC", detail: "Cơ số 8 và 10" },
      { label: "HEX", detail: "Cơ số 16 · 0–F" },
    ],
    sections: [
      { title: "Giá trị theo vị trí", body: "Trong hệ cơ số b, mỗi chữ số có trọng số là một lũy thừa của b. Bên trái dấu chấm dùng b⁰, b¹, b²…; bên phải dùng b⁻¹, b⁻²… Vì vậy cùng chuỗi chữ số nhưng khác cơ số sẽ có giá trị khác nhau." },
      { title: "Chuyển đổi có hệ thống", body: "Từ cơ số bất kỳ sang thập phân, nhân từng chữ số với trọng số rồi cộng. Từ thập phân sang cơ số b, chia liên tiếp phần nguyên cho b và đọc số dư từ dưới lên; phần lẻ được nhân liên tiếp với b.", points: ["Nhị phân ↔ bát phân: nhóm 3 bit.", "Nhị phân ↔ thập lục phân: nhóm 4 bit.", "Thêm số 0 ở phía ngoài cùng khi nhóm chưa đủ bit."] },
      { title: "Phép toán nhị phân", body: "Cộng nhị phân tuân theo các quy tắc 0+0=0, 0+1=1, 1+1=10 và 1+1+1=11. Phép trừ có thể mượn hoặc chuyển thành phép cộng số bù hai ở chương sau." },
    ],
    takeaway: "Hex là cách viết gọn của nhị phân: mỗi chữ số hex tương ứng đúng 4 bit, nên rất hữu ích khi đọc địa chỉ và mã máy.",
    mistakes: ["Đọc số dư theo thứ tự từ trên xuống", "Quên ghi cơ số của kết quả", "Nhóm bit từ bên trái thay vì bắt đầu tại dấu chấm"],
    formulas: [
      { label: "Giá trị hệ cơ số b", expression: "N = Σ(dᵢ × bⁱ)", explanation: "dᵢ là chữ số tại vị trí i và phải nhỏ hơn b." },
      { label: "Đổi nhanh BIN → HEX", expression: "0000…1111 ↔ 0…F", explanation: "Tách chuỗi nhị phân thành các nhóm 4 bit từ phải sang trái." },
    ],
    example: { problem: "Đổi 101101.01₂ sang hệ thập phân và thập lục phân.", steps: ["Phần nguyên: 1×2⁵ + 1×2³ + 1×2² + 1×2⁰ = 45.", "Phần lẻ: 0×2⁻¹ + 1×2⁻² = 0,25.", "Nhóm 4 bit: 0010 1101 . 0100 tương ứng 2D.4₁₆."], result: "101101.01₂ = 45,25₁₀ = 2D.4₁₆." },
  },
  "bieu-dien-du-lieu": {
    objectives: ["Phân biệt bit, byte và word", "Biểu diễn số nguyên, ký tự và số thực", "Giải mã IEEE 754 cơ bản"],
    diagram: [
      { label: "INTEGER", detail: "Unsigned / signed" },
      { label: "TEXT", detail: "ASCII / Unicode" },
      { label: "FLOAT", detail: "Sign · exponent · fraction" },
    ],
    sections: [
      { title: "Bit không tự mang ý nghĩa", body: "Cùng một chuỗi bit có thể là số nguyên, ký tự, lệnh máy hoặc màu sắc. Kiểu dữ liệu và quy ước giải mã quyết định ý nghĩa. Một byte gồm 8 bit; word là kích thước dữ liệu tự nhiên mà CPU xử lý." },
      { title: "Số nguyên và ký tự", body: "Số nguyên không dấu dùng toàn bộ bit cho độ lớn. Ký tự được ánh xạ sang mã số: ASCII chuẩn dùng 7 bit, còn Unicode định nghĩa code point và các cách mã hóa như UTF-8.", points: ["n bit không dấu biểu diễn 0 đến 2ⁿ−1.", "UTF-8 dùng 1 đến 4 byte và tương thích ASCII ở 128 ký tự đầu."] },
      { title: "Số thực IEEE 754", body: "Single precision 32 bit gồm 1 bit dấu, 8 bit số mũ có bias 127 và 23 bit fraction. Số chuẩn hóa có dạng (−1)ˢ × 1.fraction × 2^(exponent−bias). Một số thập phân không thể biểu diễn chính xác bằng nhị phân nên phát sinh sai số làm tròn." },
    ],
    takeaway: "Luôn hỏi ba điều khi đọc một vùng nhớ: độ dài bao nhiêu bit, kiểu dữ liệu gì và thứ tự byte nào.",
    mistakes: ["Cho rằng mọi ký tự đều chiếm đúng 1 byte", "Quên phần 1 ẩn trong số IEEE 754 chuẩn hóa", "So sánh số thực bằng dấu bằng tuyệt đối"],
    formulas: [
      { label: "Unsigned n bit", expression: "0 ≤ N ≤ 2ⁿ − 1", explanation: "Mỗi bit bổ sung làm số lượng mẫu bit tăng gấp đôi." },
      { label: "IEEE 754 chuẩn hóa", expression: "x = (−1)ˢ × 1.f × 2^(E−Bias)", explanation: "Bias là 127 với float 32 bit và 1023 với double 64 bit." },
    ],
    example: { problem: "Giải mã mẫu IEEE 754: s=0, E=10000001₂, fraction=010000…", steps: ["Bit dấu 0 nên số dương.", "E = 129, số mũ thực = 129 − 127 = 2.", "Significand = 1.01₂ = 1,25₁₀."], result: "Giá trị = 1,25 × 2² = 5,0." },
  },
  "so-co-dau": {
    objectives: ["Biểu diễn số âm bằng bù hai", "Tính miền giá trị n bit", "Nhận biết carry và overflow"],
    diagram: [
      { label: "SIGN", detail: "Bit cao nhất" },
      { label: "TWO'S COMP", detail: "Đảo bit + 1" },
      { label: "OVERFLOW", detail: "Kết quả vượt miền" },
    ],
    sections: [
      { title: "Ba cách biểu diễn số có dấu", body: "Sign-magnitude dùng một bit dấu; bù một đảo toàn bộ bit; bù hai đảo bit rồi cộng 1. Máy tính hiện đại ưu tiên bù hai vì chỉ có một số 0 và phép cộng/trừ dùng chung mạch cộng." },
      { title: "Cách đọc số bù hai", body: "Nếu bit cao nhất bằng 0, đọc như số không dấu. Nếu bằng 1, có thể lấy trọng số bit cao nhất là −2ⁿ⁻¹ rồi cộng các bit còn lại, hoặc đảo bit, cộng 1 để tìm độ lớn rồi đặt dấu âm." },
      { title: "Carry khác overflow", body: "Carry phản ánh bit nhớ ra ngoài độ rộng và hữu ích cho số không dấu. Overflow có dấu xảy ra khi cộng hai số cùng dấu nhưng kết quả lại mang dấu ngược. Hai khái niệm này không thể thay thế nhau." },
    ],
    takeaway: "Trong bù hai n bit, −2ⁿ⁻¹ có biểu diễn nhưng +2ⁿ⁻¹ thì không; miền âm nhiều hơn miền dương một giá trị.",
    mistakes: ["Đảo bit nhưng quên cộng 1", "Dùng carry để kết luận overflow có dấu", "Mở rộng số âm bằng cách thêm bit 0 thay vì lặp bit dấu"],
    formulas: [
      { label: "Miền bù hai n bit", expression: "−2ⁿ⁻¹ ≤ N ≤ 2ⁿ⁻¹ − 1", explanation: "Với 8 bit, miền giá trị là −128 đến 127." },
      { label: "Tạo số đối", expression: "−x = NOT(x) + 1", explanation: "Kết quả chỉ giữ lại n bit trong độ rộng đã chọn." },
    ],
    example: { problem: "Biểu diễn −18 bằng bù hai 8 bit và kiểm tra 100 + 50.", steps: ["18 = 00010010₂; đảo bit → 11101101₂; cộng 1 → 11101110₂.", "100 = 01100100₂ và 50 = 00110010₂.", "Cộng được 10010110₂: hai số dương nhưng kết quả có bit dấu 1."], result: "−18 = 11101110₂; phép cộng 100 + 50 bị overflow trong miền 8 bit có dấu." },
  },
  "cpu-tap-lenh": {
    objectives: ["Mô tả chu kỳ thực thi lệnh", "Hiểu vai trò của ISA", "Phân biệt các kiểu định địa chỉ"],
    diagram: [
      { label: "FETCH", detail: "PC → IR" },
      { label: "DECODE", detail: "Opcode + operands" },
      { label: "EXECUTE", detail: "ALU · MEM · branch" },
    ],
    sections: [
      { title: "CPU nhìn thấy một lệnh như thế nào", body: "Lệnh máy gồm opcode xác định thao tác và các trường toán hạng xác định dữ liệu nguồn/đích. Control Unit giải mã lệnh rồi phát tín hiệu điều khiển để di chuyển dữ liệu qua datapath." },
      { title: "ISA là hợp đồng phần cứng–phần mềm", body: "Instruction Set Architecture quy định tập lệnh, thanh ghi, kiểu dữ liệu, chế độ đặc quyền và mô hình bộ nhớ. Trình biên dịch sinh mã theo ISA; CPU phải thực thi đúng hành vi đó dù vi kiến trúc bên trong khác nhau." },
      { title: "Các kiểu định địa chỉ", body: "Immediate chứa giá trị trong lệnh; register lấy từ thanh ghi; direct dùng địa chỉ bộ nhớ; indirect lấy địa chỉ qua thanh ghi/bộ nhớ; base+offset cộng thanh ghi nền với độ dời.", points: ["Immediate nhanh nhưng độ lớn bị giới hạn bởi độ dài trường lệnh.", "Base+offset phù hợp truy cập mảng, struct và biến cục bộ."] },
    ],
    takeaway: "Khi phân tích lệnh, hãy xác định lần lượt: opcode, nguồn dữ liệu, đích dữ liệu, cách tính địa chỉ và ảnh hưởng lên cờ trạng thái.",
    mistakes: ["Nhầm ISA với một mẫu CPU cụ thể", "Cho rằng mọi lệnh đều truy cập bộ nhớ", "Bỏ qua việc PC thay đổi khi rẽ nhánh"],
    formulas: [
      { label: "Địa chỉ hiệu dụng", expression: "EA = Base + Index × Scale + Displacement", explanation: "Dạng tổng quát thường gặp khi truy cập mảng trong x86." },
      { label: "Số bit opcode", expression: "k bit → tối đa 2ᵏ mã opcode", explanation: "Thực tế định dạng lệnh còn phải chia bit cho thanh ghi và toán hạng." },
    ],
    example: { problem: "Phân tích lệnh LOAD R1, 12(R2) khi R2 = 1000 và Mem[1012] = 25.", steps: ["Opcode LOAD yêu cầu đọc một word từ bộ nhớ.", "Tính địa chỉ hiệu dụng EA = R2 + 12 = 1012.", "Đọc Mem[1012] rồi ghi dữ liệu vào thanh ghi R1."], result: "Sau lệnh, R1 = 25; R2 và ô nhớ không thay đổi." },
  },
  "datapath": {
    objectives: ["Nhận diện các thanh ghi quan trọng", "Theo dõi dữ liệu qua datapath", "Hiểu tín hiệu điều khiển cho một lệnh"],
    diagram: [
      { label: "REG FILE", detail: "Đọc 2 · ghi 1" },
      { label: "ALU", detail: "Số học · logic" },
      { label: "CONTROL", detail: "Chọn đường dữ liệu" },
    ],
    sections: [
      { title: "Các khối của datapath", body: "Datapath gồm PC, bộ thanh ghi, ALU, bộ nhớ lệnh/dữ liệu, các bộ cộng và multiplexer. Dữ liệu đi qua các khối này theo đường được Control Unit lựa chọn." },
      { title: "Thanh ghi chuyên dụng", body: "PC giữ địa chỉ lệnh kế tiếp; IR giữ lệnh hiện tại; MAR giữ địa chỉ bộ nhớ đang truy cập; MDR giữ dữ liệu đọc/ghi. Thanh ghi đa dụng lưu toán hạng và kết quả tạm.", points: ["Register file thường có nhiều cổng đọc và ít nhất một cổng ghi.", "MUX chọn một trong nhiều nguồn dữ liệu dựa trên tín hiệu điều khiển."] },
      { title: "Control Unit điều phối", body: "Opcode được ánh xạ thành các tín hiệu như RegWrite, MemRead, MemWrite, ALUSrc và Branch. Với điều khiển hardwired, tín hiệu sinh trực tiếp từ logic; với microprogrammed, chúng đến từ vi lệnh trong control memory." },
    ],
    takeaway: "Để hiểu datapath, đừng học thuộc sơ đồ; hãy lần theo một lệnh cụ thể từ PC đến nơi ghi kết quả và ghi lại tín hiệu nào phải bật.",
    mistakes: ["Nhầm MAR chứa dữ liệu thay vì địa chỉ", "Cho rằng ALU chỉ thực hiện cộng trừ", "Bật đồng thời MemRead và MemWrite cho cùng một thao tác"],
    formulas: [
      { label: "Chu kỳ single-cycle", expression: "Tclock ≥ Tđường dài nhất", explanation: "Lệnh chậm nhất quyết định chu kỳ cho mọi lệnh trong thiết kế single-cycle." },
      { label: "Giá trị PC tuần tự", expression: "PCnext = PC + độ dài lệnh", explanation: "Lệnh branch/jump sẽ chọn một nguồn PCnext khác qua multiplexer." },
    ],
    example: { problem: "Theo dõi lệnh ADD R3, R1, R2 trong datapath.", steps: ["Đọc R1 và R2 từ hai cổng của register file.", "Chọn phép ADD tại ALU; không cần truy cập data memory.", "Chọn đầu ra ALU qua MUX và bật RegWrite để ghi vào R3."], result: "Tín hiệu chính: ALUSrc=register, ALUOp=ADD, MemRead=0, MemWrite=0, RegWrite=1." },
  },
  "bo-nho-cache": {
    objectives: ["Giải thích phân cấp bộ nhớ", "Tách địa chỉ thành tag/index/offset", "Tính hit rate và AMAT"],
    diagram: [
      { label: "L1/L2/L3", detail: "Nhanh · nhỏ" },
      { label: "RAM", detail: "Bộ nhớ chính" },
      { label: "SSD/HDD", detail: "Lớn · chậm" },
    ],
    sections: [
      { title: "Tại sao cần phân cấp bộ nhớ", body: "Bộ nhớ càng nhanh thường càng đắt và nhỏ. Hệ thống kết hợp thanh ghi, cache, RAM và lưu trữ thứ cấp để tạo cảm giác vừa nhanh vừa có dung lượng lớn." },
      { title: "Locality và cache", body: "Temporal locality: dữ liệu vừa dùng có khả năng sớm được dùng lại. Spatial locality: dữ liệu gần địa chỉ vừa dùng có khả năng được dùng. Cache đưa cả block dữ liệu từ RAM lên để tận dụng hai tính chất này." },
      { title: "Ánh xạ và thay thế", body: "Direct-mapped chỉ cho mỗi block vào một line; fully associative cho vào bất kỳ line; set-associative là phương án trung gian. Khi set đầy, chính sách LRU hoặc gần đúng LRU chọn block bị thay.", points: ["Offset chọn byte trong block; index chọn set; tag xác nhận đúng block.", "Write-through ghi đồng thời xuống mức dưới; write-back chỉ ghi khi block bẩn bị đẩy ra."] },
    ],
    takeaway: "Mọi bài cache đều bắt đầu bằng ba số: dung lượng cache, kích thước block và số way; từ đó suy ra số set và số bit địa chỉ.",
    mistakes: ["Dùng miss rate dạng phần trăm mà quên đổi sang số thập phân", "Nhầm số line với số set", "Không tính bit offset theo kích thước block"],
    formulas: [
      { label: "Số set", expression: "Sets = Cache size / (Block size × Ways)", explanation: "Direct-mapped có Ways=1; fully associative chỉ có một set." },
      { label: "Thời gian truy cập trung bình", expression: "AMAT = Hit time + Miss rate × Miss penalty", explanation: "Nếu có nhiều cấp cache, miss penalty của cấp trên bao gồm thời gian truy cập cấp dưới." },
    ],
    example: { problem: "Cache 32 KiB, block 64 B, 4-way, địa chỉ 32 bit. Tìm số bit offset, index và tag.", steps: ["Số set = 32768 / (64 × 4) = 128 set.", "Offset = log₂64 = 6 bit; index = log₂128 = 7 bit.", "Tag = 32 − 6 − 7 = 19 bit."], result: "Địa chỉ được chia thành Tag 19 bit | Index 7 bit | Offset 6 bit." },
  },
  "bus-io": {
    objectives: ["Phân biệt bus địa chỉ, dữ liệu, điều khiển", "So sánh polling, interrupt và DMA", "Tính băng thông truyền dữ liệu"],
    diagram: [
      { label: "CPU", detail: "Phát yêu cầu" },
      { label: "I/O CTRL", detail: "Status · data · control" },
      { label: "DEVICE", detail: "Ngoại vi" },
    ],
    sections: [
      { title: "Cấu trúc bus", body: "Bus địa chỉ xác định nơi cần truy cập; bus dữ liệu mang giá trị; bus điều khiển mang tín hiệu đọc/ghi, ngắt và đồng bộ. Độ rộng bus dữ liệu ảnh hưởng lượng dữ liệu mỗi lần truyền, còn độ rộng bus địa chỉ giới hạn không gian địa chỉ." },
      { title: "Ba cách phục vụ thiết bị", body: "Polling khiến CPU liên tục hỏi trạng thái thiết bị. Interrupt cho phép CPU làm việc khác và chỉ xử lý khi thiết bị báo. DMA chuyển cả khối dữ liệu giữa thiết bị và RAM với ít can thiệp của CPU.", points: ["Polling đơn giản, phù hợp sự kiện nhanh và dự đoán được.", "Interrupt có chi phí lưu/khôi phục ngữ cảnh.", "DMA hiệu quả cho khối dữ liệu lớn như ổ đĩa hoặc mạng."] },
      { title: "Memory-mapped I/O", body: "Các thanh ghi của thiết bị được gán vào không gian địa chỉ bộ nhớ. CPU dùng lệnh load/store thông thường để đọc status register, ghi control register hoặc trao đổi qua data register." },
    ],
    takeaway: "Chọn cơ chế I/O theo tần suất sự kiện và kích thước dữ liệu: polling cho đơn giản, interrupt cho sự kiện rời rạc, DMA cho truyền khối lớn.",
    mistakes: ["Cho rằng interrupt làm CPU không tốn thời gian", "Nhầm độ rộng bus địa chỉ với bus dữ liệu", "Dùng DMA cho từng byte nhỏ và bỏ qua chi phí thiết lập"],
    formulas: [
      { label: "Băng thông lý thuyết", expression: "Bandwidth = Transfers/s × Bytes/transfer", explanation: "Băng thông thực tế thấp hơn vì overhead và thời gian chờ." },
      { label: "Thời gian truyền", expression: "T = Data size / Bandwidth", explanation: "Đảm bảo hai đại lượng dùng cùng đơn vị byte hoặc bit." },
    ],
    example: { problem: "Bus 64 bit chạy 200 MHz, truyền một lần mỗi chu kỳ. Băng thông lý thuyết là bao nhiêu?", steps: ["64 bit = 8 byte mỗi lần truyền.", "200 MHz = 200 triệu lần truyền mỗi giây.", "Bandwidth = 8 × 200×10⁶ byte/s."], result: "Băng thông lý thuyết = 1,6 GB/s (theo hệ thập phân)." },
  },
  "hieu-nang": {
    objectives: ["Phân biệt latency và throughput", "Tính CPU time từ IC, CPI, clock", "Áp dụng speedup và định luật Amdahl"],
    diagram: [
      { label: "IC", detail: "Số lệnh" },
      { label: "CPI", detail: "Chu kỳ/lệnh" },
      { label: "CLOCK", detail: "Chu kỳ/giây" },
    ],
    sections: [
      { title: "Đo hiệu năng đúng cách", body: "Latency là thời gian hoàn thành một tác vụ; throughput là số tác vụ hoàn thành trong một khoảng thời gian. Máy có throughput cao chưa chắc latency của từng tác vụ thấp. Chỉ số benchmark phải đại diện cho tải thực tế." },
      { title: "Ba yếu tố của CPU time", body: "Instruction Count phụ thuộc thuật toán, trình biên dịch và ISA. CPI phụ thuộc loại lệnh và vi kiến trúc. Clock rate là số chu kỳ mỗi giây. Tối ưu một yếu tố có thể làm yếu tố khác xấu đi nên phải đánh giá tổng thể." },
      { title: "Speedup và giới hạn cải tiến", body: "Speedup so sánh thời gian cũ với thời gian mới. Định luật Amdahl chỉ ra rằng phần chương trình không được cải tiến sẽ giới hạn lợi ích tổng thể, dù phần còn lại được tăng tốc rất nhiều." },
    ],
    takeaway: "Máy nhanh hơn là máy hoàn thành cùng công việc trong ít thời gian hơn; không thể kết luận chỉ dựa vào GHz, CPI hoặc số core riêng lẻ.",
    mistakes: ["Cho rằng GHz cao hơn luôn nhanh hơn", "Đảo ngược tử và mẫu của speedup", "Áp dụng phần trăm cải tiến cho toàn chương trình thay vì phần được tối ưu"],
    formulas: [
      { label: "CPU time", expression: "Tcpu = IC × CPI / Clock rate", explanation: "Cũng có thể viết Tcpu = IC × CPI × Clock cycle time." },
      { label: "Định luật Amdahl", expression: "Speedup = 1 / ((1−p) + p/s)", explanation: "p là tỉ lệ được cải tiến, s là hệ số tăng tốc của phần đó." },
    ],
    example: { problem: "Chương trình có 2×10⁹ lệnh, CPI=1,5, CPU 3 GHz. 40% thời gian được tăng tốc 4 lần.", steps: ["CPU time ban đầu = 2×10⁹ × 1,5 / 3×10⁹ = 1 giây.", "Theo Amdahl: thời gian mới tương đối = 0,6 + 0,4/4 = 0,7.", "Speedup = 1/0,7 ≈ 1,43."], result: "Thời gian mới ≈ 0,7 giây; toàn chương trình nhanh hơn khoảng 1,43 lần." },
  },
  "assembly": {
    objectives: ["Đọc cú pháp Assembly cơ bản", "Theo dõi thanh ghi và cờ", "Hiểu stack, CALL và RET"],
    diagram: [
      { label: "REGISTERS", detail: "RAX · RBX · RSP · RIP" },
      { label: "ALU/FLAGS", detail: "ZF · CF · SF · OF" },
      { label: "STACK", detail: "CALL · PUSH · POP · RET" },
    ],
    sections: [
      { title: "Assembly là biểu diễn gần mã máy", body: "Mỗi lệnh Assembly thường ánh xạ gần với một lệnh máy. Lệnh gồm mnemonic và toán hạng. Cú pháp Intel thường viết đích trước nguồn; cú pháp AT&T viết nguồn trước đích và có ký hiệu khác." },
      { title: "Thanh ghi và cờ", body: "RAX thường chứa giá trị trả về; RSP trỏ đỉnh stack; RBP có thể làm frame pointer; RIP giữ địa chỉ lệnh. CMP thực hiện phép trừ nhưng chỉ cập nhật các cờ như ZF, SF, CF và OF để lệnh nhảy có điều kiện sử dụng." },
      { title: "Stack và lời gọi hàm", body: "Stack thường tăng về phía địa chỉ thấp. CALL đẩy địa chỉ trở về rồi chuyển điều khiển; RET lấy địa chỉ đó từ stack. Hàm có thể tạo stack frame để lưu biến cục bộ và các thanh ghi cần bảo toàn.", points: ["PUSH giảm RSP rồi ghi dữ liệu; POP đọc dữ liệu rồi tăng RSP.", "Phải tuân thủ calling convention để các hàm tương tác đúng."] },
    ],
    takeaway: "Khi đọc Assembly, lập bảng trạng thái thanh ghi/stack sau từng lệnh thay vì cố dịch cả đoạn mã sang ngôn ngữ bậc cao ngay lập tức.",
    mistakes: ["Nhầm thứ tự nguồn–đích giữa Intel và AT&T", "Quên kích thước toán hạng byte/word/dword/qword", "Làm lệch RSP khiến RET lấy sai địa chỉ"],
    formulas: [
      { label: "Địa chỉ mảng", expression: "Address = Base + Index × ElementSize", explanation: "Một phần tử int 32 bit có ElementSize = 4 byte." },
      { label: "Cân bằng stack", expression: "Tổng byte PUSH/SUB = tổng byte POP/ADD trước RET", explanation: "Ngoài ra ABI có thể yêu cầu stack alignment 16 byte." },
    ],
    example: { problem: "Theo dõi đoạn: MOV RAX,5; ADD RAX,3; CMP RAX,8; JE equal.", steps: ["MOV đặt RAX = 5.", "ADD cập nhật RAX = 8.", "CMP tính 8−8 mà không lưu kết quả, nên ZF=1.", "JE kiểm tra ZF=1 và thực hiện nhảy."], result: "Nhánh equal được chọn và RAX vẫn bằng 8." },
  },
};
