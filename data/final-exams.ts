import type { Question } from "@/data/course";

const bank: Question[] = [
  { id: 5001, chapterId: 1, prompt: "Đặc trưng cốt lõi của mô hình Von Neumann là gì?", options: ["Lệnh và dữ liệu dùng chung bộ nhớ", "Lệnh và dữ liệu luôn nằm ở hai bộ nhớ riêng", "CPU không sử dụng thanh ghi", "Mọi lệnh được thực hiện song song"], answer: 0, explanation: "Trong mô hình Von Neumann, lệnh và dữ liệu cùng nằm trong một không gian bộ nhớ và dùng chung đường truyền.", difficulty: "Dễ", tags: ["Von Neumann"] },
  { id: 5002, chapterId: 5, prompt: "Thứ tự đúng của chu kỳ lệnh cơ bản là gì?", options: ["Fetch opcode → Decode → Tính địa chỉ toán hạng → Fetch toán hạng → Execute → Store", "Decode → Fetch opcode → Execute → Store → Fetch toán hạng", "Fetch toán hạng → Decode → Fetch opcode → Execute", "Execute → Decode → Fetch opcode → Store"], answer: 0, explanation: "CPU lấy mã lệnh, giải mã, xác định/lấy toán hạng, thực thi rồi lưu kết quả.", difficulty: "Trung bình", tags: ["chu kỳ lệnh"] },
  { id: 5003, chapterId: 1, prompt: "Nhóm nào mô tả đúng các chức năng cơ bản của máy tính?", options: ["Xử lý dữ liệu, lưu trữ, di chuyển dữ liệu và điều khiển", "Chỉ tính toán và hiển thị", "Chỉ lưu trữ và kết nối mạng", "Biên dịch, nén và mã hóa"], answer: 0, explanation: "Bốn chức năng nền tảng là xử lý, lưu trữ, di chuyển dữ liệu và điều khiển.", difficulty: "Dễ", tags: ["tổ chức máy tính"] },
  { id: 5004, chapterId: 7, prompt: "Khi đi xuống tháp phân cấp bộ nhớ, xu hướng nào thường đúng?", options: ["Dung lượng tăng, giá mỗi bit giảm, tần suất CPU truy cập giảm", "Dung lượng giảm, tốc độ tăng", "Giá mỗi bit tăng và dung lượng giảm", "Tần suất truy cập của CPU tăng"], answer: 0, explanation: "Các tầng thấp hơn thường lớn hơn, rẻ hơn mỗi bit nhưng chậm hơn và ít được CPU truy cập trực tiếp.", difficulty: "Trung bình", tags: ["phân cấp bộ nhớ"] },
  { id: 5005, chapterId: 10, prompt: "Không gian địa chỉ vật lý tối đa của 8086 với bus địa chỉ 20 bit là bao nhiêu?", options: ["1 MB", "64 KB", "16 MB", "4 GB"], answer: 0, explanation: "2^20 byte = 1.048.576 byte = 1 MB.", difficulty: "Dễ", tags: ["8086"] },
  { id: 5006, chapterId: 7, prompt: "Một chip nhớ có 12 đường địa chỉ. Chip có thể chọn tối đa bao nhiêu ô nhớ?", options: ["4096", "2048", "8192", "1200"], answer: 0, explanation: "12 đường địa chỉ chọn được 2^12 = 4096 ô nhớ.", difficulty: "Dễ", tags: ["bộ nhớ"] },
  { id: 5007, chapterId: 7, prompt: "So sánh nào đúng giữa SRAM và DRAM?", options: ["SRAM nhanh và đắt hơn; DRAM chậm, rẻ và có mật độ cao hơn", "SRAM cần refresh còn DRAM không cần", "DRAM nhanh hơn SRAM", "SRAM luôn có dung lượng lớn hơn DRAM"], answer: 0, explanation: "SRAM dùng mạch chốt nên nhanh nhưng tốn diện tích; DRAM dùng tụ điện nên rẻ và cần refresh.", difficulty: "Dễ", tags: ["SRAM DRAM"] },
  { id: 5008, chapterId: 7, prompt: "Vì sao DRAM phải được làm tươi (refresh) định kỳ?", options: ["Điện tích trong tụ nhớ bị rò theo thời gian", "Để tăng xung nhịp CPU", "Để xóa cache", "Vì DRAM dùng đĩa từ"], answer: 0, explanation: "Mỗi bit DRAM được lưu bằng điện tích trong tụ và điện tích sẽ suy giảm theo thời gian.", difficulty: "Dễ", tags: ["DRAM"] },
  { id: 5009, chapterId: 7, prompt: "Cache hit ratio là gì?", options: ["Tỷ lệ số lần CPU tìm thấy dữ liệu trong cache trên tổng số lần truy cập", "Tỷ lệ cache miss trên dung lượng RAM", "Số byte cache chia cho số byte ổ đĩa", "Thời gian truy cập RAM"], answer: 0, explanation: "Hit ratio đo phần truy cập được phục vụ ngay bởi cache.", difficulty: "Dễ", tags: ["cache"] },
  { id: 5010, chapterId: 7, prompt: "Spatial locality mô tả hiện tượng nào?", options: ["Các địa chỉ gần địa chỉ vừa truy cập có khả năng sớm được dùng", "Dữ liệu vừa dùng chắc chắn không dùng lại", "CPU chỉ truy cập một địa chỉ", "Cache luôn ghi xuyên"], answer: 0, explanation: "Tính cục bộ không gian nói rằng các vị trí lân cận thường được truy cập gần nhau.", difficulty: "Dễ", tags: ["locality"] },
  { id: 5011, chapterId: 7, prompt: "Temporal locality mô tả hiện tượng nào?", options: ["Dữ liệu vừa truy cập có khả năng được truy cập lại sớm", "Các địa chỉ liền kề luôn được đọc cùng lúc", "Dữ liệu chỉ dùng một lần", "Bộ nhớ được truy cập ngẫu nhiên"], answer: 0, explanation: "Tính cục bộ thời gian khai thác khả năng tái sử dụng dữ liệu/lệnh trong thời gian gần.", difficulty: "Dễ", tags: ["locality"] },
  { id: 5012, chapterId: 7, prompt: "Cặp chính sách cache nào thường đi cùng nhau?", options: ["Write-back và write-allocate", "Write-back và no-write-allocate là cặp bắt buộc", "Write-through và không bao giờ ghi RAM", "Write-allocate và bỏ qua cache"], answer: 0, explanation: "Write-back thường kết hợp write-allocate để đưa block vào cache rồi cập nhật tại cache.", difficulty: "Trung bình", tags: ["cache write"] },
  { id: 5013, chapterId: 8, prompt: "CPU có bus dữ liệu 16 bit, clock 10 MHz và một chu kỳ bus mất 4 clock. Tốc độ truyền cực đại là bao nhiêu?", options: ["5 MB/s", "2.5 MB/s", "10 MB/s", "20 MB/s"], answer: 0, explanation: "10 triệu/4 = 2,5 triệu lần truyền mỗi giây; mỗi lần 2 byte nên đạt 5 MB/s.", difficulty: "Trung bình", tags: ["bus"] },
  { id: 5014, chapterId: 9, prompt: "Công thức tính MIPS phù hợp là gì?", options: ["Instruction count / (Execution time × 10^6)", "Execution time / Instruction count", "Clock rate × CPI", "CPI / Clock rate"], answer: 0, explanation: "MIPS là số triệu lệnh thực hiện trong một giây.", difficulty: "Trung bình", tags: ["MIPS"] },
  { id: 5015, chapterId: 9, prompt: "Công thức CPU time là gì?", options: ["Instruction count × CPI / Clock rate", "Clock rate / (Instruction count × CPI)", "Instruction count + CPI", "CPI × Clock rate"], answer: 0, explanation: "Tổng chu kỳ bằng IC × CPI; chia cho số chu kỳ mỗi giây để ra thời gian.", difficulty: "Dễ", tags: ["CPU time"] },
  { id: 5016, chapterId: 9, prompt: "CPI biểu diễn đại lượng nào?", options: ["Số chu kỳ trung bình cho mỗi lệnh", "Số lệnh mỗi byte", "Dung lượng cache", "Số bit của opcode"], answer: 0, explanation: "CPI là Cycles Per Instruction.", difficulty: "Dễ", tags: ["CPI"] },
  { id: 5017, chapterId: 9, prompt: "Kỹ thuật nào thường được dùng để tăng hiệu năng CPU?", options: ["Pipelining, branch prediction và speculative execution", "Giảm số thanh ghi", "Tắt cache", "Giảm độ rộng bus nội bộ"], answer: 0, explanation: "Các kỹ thuật này tăng mức song song và giảm thời gian chờ do nhánh.", difficulty: "Dễ", tags: ["hiệu năng"] },
  { id: 5018, chapterId: 9, prompt: "Theo định luật Amdahl, yếu tố nào giới hạn speedup tổng thể?", options: ["Phần chương trình không được tăng tốc", "Dung lượng ổ đĩa", "Số cổng USB", "Kích thước màn hình"], answer: 0, explanation: "Dù phần được cải tiến nhanh đến đâu, phần tuần tự/không cải tiến vẫn giới hạn speedup.", difficulty: "Trung bình", tags: ["Amdahl"] },
  { id: 5019, chapterId: 8, prompt: "Thời gian truy cập đĩa từ thường gồm các thành phần nào?", options: ["Seek time + rotational delay + transfer time", "CPI + clock cycle", "Hit time + miss rate", "Fetch + decode"], answer: 0, explanation: "Đầu đọc phải tìm track, chờ sector quay tới rồi mới truyền dữ liệu.", difficulty: "Dễ", tags: ["HDD"] },
  { id: 5020, chapterId: 8, prompt: "Đĩa có 8 mặt, 512 track/mặt, 64 sector/track và 1 KB/sector. Dung lượng là bao nhiêu?", options: ["256 MB", "4 MB", "32 MB", "512 MB"], answer: 0, explanation: "8 × 512 × 64 × 1 KB = 262.144 KB = 256 MB.", difficulty: "Trung bình", tags: ["lưu trữ"] },
  { id: 5021, chapterId: 3, prompt: "Theo định dạng float 8 bit gồm 1 bit dấu, 3 bit mũ và 4 bit trị, giá trị 57h tương ứng số nào?", options: ["5,75", "-5,75", "11,5", "2,875"], answer: 0, explanation: "Theo quy ước của đề nguồn, 57h được giải mã thành 5,75.", difficulty: "Khó", tags: ["floating point"] },
  { id: 5022, chapterId: 3, prompt: "Theo định dạng float 8 bit gồm 1 bit dấu, 3 bit mũ và 4 bit trị, giá trị E7h tương ứng số nào?", options: ["-11,5", "11,5", "-5,75", "7,25"], answer: 0, explanation: "Bit dấu bằng 1 và phần mũ/trị theo quy ước của đề cho kết quả -11,5.", difficulty: "Khó", tags: ["floating point"] },
  { id: 5023, chapterId: 3, prompt: "Mẫu IEEE 754 single precision C4361000h có giá trị thập phân nào?", options: ["-728,25", "728,25", "-364,125", "-1144"], answer: 0, explanation: "Giải mã bit dấu, exponent và fraction của C4361000h cho kết quả -728,25.", difficulty: "Khó", tags: ["IEEE 754"] },
  { id: 5024, chapterId: 4, prompt: "Mở rộng dấu số nhị phân 8 bit 10110101 lên 16 bit cho kết quả nào?", options: ["1111111110110101", "0000000010110101", "1111111101001010", "0000000001001011"], answer: 0, explanation: "Số có bit dấu 1 nên tám bit cao được điền bằng 1.", difficulty: "Dễ", tags: ["mở rộng dấu"] },
  { id: 5025, chapterId: 4, prompt: "Mặt nạ AND nào xóa 4 bit thấp của một byte?", options: ["F0h", "0Fh", "FFh", "00h"], answer: 0, explanation: "AND với 11110000b giữ nibble cao và xóa nibble thấp.", difficulty: "Dễ", tags: ["bit mask"] },
  { id: 5026, chapterId: 4, prompt: "Lệnh nào phù hợp để cô lập một hoặc nhiều bit trong toán hạng?", options: ["AND", "OR", "NOT", "NEG"], answer: 0, explanation: "AND với mặt nạ giữ các bit cần kiểm tra và xóa các bit còn lại.", difficulty: "Dễ", tags: ["logic"] },
  { id: 5027, chapterId: 4, prompt: "Lệnh nào kiểm tra bit mà không làm thay đổi toán hạng?", options: ["TEST", "AND", "OR", "NOT"], answer: 0, explanation: "TEST thực hiện AND để cập nhật cờ nhưng không ghi kết quả về toán hạng.", difficulty: "Dễ", tags: ["TEST"] },
  { id: 5028, chapterId: 10, prompt: "EAX chứa IPv4 và netID dài 20 bit cao. Lệnh nào lấy đúng netID?", options: ["AND EAX, FFFFF000h", "OR EAX, 00000FFFh", "XOR EAX, FFFFFFFFh", "AND EAX, 000FFFFFh"], answer: 0, explanation: "Mặt nạ FFFFF000h giữ 20 bit cao và xóa 12 bit host.", difficulty: "Trung bình", tags: ["AND"] },
  { id: 5029, chapterId: 10, prompt: "Chia có dấu -6247 cho 300 bằng IDIV 16 bit cho thương và dư nào?", options: ["AX=FFECh, DX=FF09h", "AX=0014h, DX=00F7h", "AX=FFEBh, DX=0009h", "AX=012Ch, DX=E799h"], answer: 0, explanation: "-6247 = (-20)×300 + (-247); -20 = FFECh và -247 = FF09h trong 16 bit.", difficulty: "Khó", tags: ["IDIV"] },
  { id: 5030, chapterId: 10, prompt: "Với SS=1DAEh và SP=FFAEh, địa chỉ vật lý đỉnh stack là bao nhiêu?", options: ["2DA8Eh", "1DAEFh", "2DABEh", "0FFAEh"], answer: 0, explanation: "Địa chỉ vật lý = SS×10h + SP = 1DAE0h + FFAEh = 2DA8Eh.", difficulty: "Trung bình", tags: ["segment offset"] },
  { id: 5031, chapterId: 10, prompt: "Bộ nhớ từ địa chỉ 121h chứa 96 D0 E0 D0. Sau MOV DX,[121h] và MOV CX,[123h], giá trị là gì?", options: ["DX=D096h, CX=D0E0h", "DX=96D0h, CX=E0D0h", "DX=0096h, CX=00E0h", "DX=D0E0h, CX=D096h"], answer: 0, explanation: "x86 lưu little-endian nên byte thấp nằm ở địa chỉ thấp hơn.", difficulty: "Trung bình", tags: ["little endian"] },
  { id: 5032, chapterId: 10, prompt: "Trong chế độ địa chỉ 16 bit của 8086, dạng nào không hợp lệ?", options: ["[BX+SP]", "[BX+SI]", "[BP+DI]", "[SI]"], answer: 0, explanation: "SP không được dùng trong các tổ hợp địa chỉ hiệu dụng 16 bit thông thường của 8086.", difficulty: "Trung bình", tags: ["định địa chỉ"] },
  { id: 5033, chapterId: 10, prompt: "Lệnh nào thực hiện phép cộng có kèm carry?", options: ["ADC", "ADD", "SBB", "DEC"], answer: 0, explanation: "ADC cộng hai toán hạng và cộng thêm cờ CF.", difficulty: "Dễ", tags: ["ADC"] },
  { id: 5034, chapterId: 10, prompt: "Lệnh nào trừ 1 khỏi thanh ghi hoặc ô nhớ?", options: ["DEC", "SUB", "SBB", "INC"], answer: 0, explanation: "DEC giảm toán hạng đi 1.", difficulty: "Dễ", tags: ["DEC"] },
  { id: 5035, chapterId: 10, prompt: "XLAT dùng thanh ghi nào làm chỉ số tra bảng mặc định?", options: ["AL", "DL", "AX", "SI"], answer: 0, explanation: "XLAT tra byte tại DS:[BX+AL] và ghi kết quả về AL.", difficulty: "Trung bình", tags: ["XLAT"] },
  { id: 5036, chapterId: 10, prompt: "Trong chế độ 16 bit, PUSH một word làm SP thay đổi thế nào?", options: ["SP giảm 2", "SP tăng 2", "SP giảm 1", "SP không đổi"], answer: 0, explanation: "Stack tăng về địa chỉ thấp và một word chiếm 2 byte.", difficulty: "Dễ", tags: ["stack"] },
  { id: 5037, chapterId: 10, prompt: "LODSB thực hiện thao tác nào?", options: ["Nạp byte DS:[SI] vào AL rồi cập nhật SI", "Ghi AL vào ES:[DI]", "Nạp word vào AX mà không đổi SI", "Đẩy AL lên stack"], answer: 0, explanation: "LODSB tải một byte nguồn vào AL và SI tăng/giảm theo DF.", difficulty: "Trung bình", tags: ["string instruction"] },
  { id: 5038, chapterId: 10, prompt: "STOSB thực hiện thao tác nào?", options: ["Ghi AL vào ES:[DI] rồi cập nhật DI", "Nạp DS:[SI] vào AL", "So sánh hai chuỗi", "Đổi chỗ AX và BX"], answer: 0, explanation: "STOSB lưu byte trong AL đến vùng đích ES:[DI].", difficulty: "Trung bình", tags: ["string instruction"] },
  { id: 5039, chapterId: 10, prompt: "REP MOVSB sử dụng thanh ghi nào làm bộ đếm số byte sao chép?", options: ["CX", "AX", "DX", "BP"], answer: 0, explanation: "Tiền tố REP lặp MOVSB cho đến khi CX về 0.", difficulty: "Dễ", tags: ["REP MOVSB"] },
  { id: 5040, chapterId: 10, prompt: "Với AL=7Eh và BL=8Ch, ADD AL,BL cho kết quả nào?", options: ["AL=0Ah, CF=1, OF=0", "AL=0Ah, CF=0, OF=1", "AL=FAh, CF=0, OF=0", "AL=10Ah, CF=0, OF=0"], answer: 0, explanation: "7Eh+8Ch=10Ah nên AL=0Ah và có carry; hai toán hạng khác dấu nên không overflow có dấu.", difficulty: "Trung bình", tags: ["cờ CPU"] },
  { id: 5041, chapterId: 10, prompt: "EAX=12AEh rồi SUB EAX,12AFh. Trạng thái cờ phù hợp là gì?", options: ["SF=1, CF=1, ZF=0, OF=0", "SF=0, CF=0, ZF=1, OF=1", "SF=1, CF=0, ZF=1, OF=1", "SF=0, CF=1, ZF=0, OF=1"], answer: 0, explanation: "Kết quả là -1; phép trừ không dấu cần mượn nên CF=1, không có signed overflow.", difficulty: "Trung bình", tags: ["cờ CPU"] },
  { id: 5042, chapterId: 2, prompt: "Giá trị 7Fh bằng bao nhiêu trong hệ thập phân?", options: ["127", "126", "128", "255"], answer: 0, explanation: "7×16+15=127.", difficulty: "Dễ", tags: ["hệ 16"] },
  { id: 5043, chapterId: 2, prompt: "Số nhị phân 10101001₂ tương ứng số hexa nào?", options: ["A9h", "9Ah", "A8h", "B9h"], answer: 0, explanation: "Nhóm 1010 là A và 1001 là 9.", difficulty: "Dễ", tags: ["chuyển đổi cơ số"] },
  { id: 5044, chapterId: 2, prompt: "Số E7h tương ứng số bát phân nào?", options: ["347₈", "367₈", "327₈", "227₈"], answer: 0, explanation: "E7h=231₁₀=347₈.", difficulty: "Trung bình", tags: ["chuyển đổi cơ số"] },
  { id: 5045, chapterId: 3, prompt: "IEEE 754 single precision dành bao nhiêu bit cho exponent?", options: ["8 bit", "7 bit", "11 bit", "23 bit"], answer: 0, explanation: "Single precision gồm 1 bit dấu, 8 bit exponent và 23 bit fraction.", difficulty: "Dễ", tags: ["IEEE 754"] },
  { id: 5046, chapterId: 7, prompt: "Trong cache direct-mapped, một block bộ nhớ chính có thể vào đâu?", options: ["Một cache line duy nhất do index xác định", "Bất kỳ cache line nào", "Hai line bất kỳ", "Chỉ cache L2"], answer: 0, explanation: "Direct-mapped ánh xạ mỗi block đến đúng một line.", difficulty: "Dễ", tags: ["cache mapping"] },
  { id: 5047, chapterId: 8, prompt: "Các tham số cơ học chính ảnh hưởng thời gian truy cập HDD là gì?", options: ["Seek time, rotational delay và transfer time", "CPI, IPC và MIPS", "Tag, index và offset", "Opcode và operand"], answer: 0, explanation: "Truy cập HDD cần di chuyển đầu đọc, chờ quay và truyền dữ liệu.", difficulty: "Dễ", tags: ["HDD"] },
  { id: 5048, chapterId: 8, prompt: "Trong cơ chế ưu tiên ngắt, phát biểu nào đúng?", options: ["Thiết bị có mức ưu tiên cao hơn được phục vụ trước", "CPU không thể che ngắt", "Mọi thiết bị luôn được phục vụ đồng thời", "Thiết bị ưu tiên thấp luôn được phục vụ trước"], answer: 0, explanation: "Bộ điều khiển ngắt phân xử để phục vụ yêu cầu ưu tiên cao trước.", difficulty: "Dễ", tags: ["interrupt"] },
  { id: 5049, chapterId: 10, prompt: "Trong lệnh nhân 16 bit MUL r/m16, toán hạng nguồn được nhân với thanh ghi nào?", options: ["AX", "AL", "EAX", "BX"], answer: 0, explanation: "MUL 16 bit nhân AX với toán hạng nguồn và trả kết quả trong DX:AX.", difficulty: "Trung bình", tags: ["MUL"] },
  { id: 5050, chapterId: 10, prompt: "Lệnh CMP cập nhật cờ bằng cách thực hiện thao tác nào mà không lưu kết quả?", options: ["Phép trừ", "Phép cộng", "Phép chia", "Phép nhân"], answer: 0, explanation: "CMP thực hiện phép trừ logic để đặt cờ nhưng không ghi kết quả.", difficulty: "Dễ", tags: ["CMP"] },
];

const byId = new Map(bank.map((question) => [question.id, question]));

type ExamSpec = {
  id: string;
  title: string;
  subtitle: string;
  year: number;
  minutes: number;
  sourcePages: string;
  sourceQuestionCount: number;
  questionIds: number[];
};

const specs: ExamSpec[] = [
  { id: "review-2017", title: "Bộ ôn tập CLC 2017", subtitle: "Hệ đếm · Assembly · Cờ CPU", year: 2017, minutes: 30, sourcePages: "2–8", sourceQuestionCount: 24, questionIds: [5021,5029,5025,5026,5028,5031,5040,5041,5030,5024,5042,5043,5044,5027,5049] },
  { id: "final-2019-even", title: "Cuối kỳ 2019 – Nhóm chẵn", subtitle: "CPU · Bộ nhớ · Hiệu năng · I/O", year: 2019, minutes: 45, sourcePages: "10–21", sourceQuestionCount: 45, questionIds: [5017,5013,5014,5007,5008,5004,5009,5010,5019,5020,5002,5006,5032,5035,5047] },
  { id: "final-2019-odd", title: "Cuối kỳ 2019 – Nhóm lẻ", subtitle: "Chu kỳ lệnh · Cache · Assembly", year: 2019, minutes: 45, sourcePages: "22–34", sourceQuestionCount: 45, questionIds: [5017,5002,5031,5005,5009,5012,5034,5033,5050,5037,5038,5036,5014,5018,5020] },
  { id: "final-2017-set-1a", title: "Cuối kỳ 2017 – Đề 1A", subtitle: "Assembly · Địa chỉ · Chuỗi lệnh", year: 2017, minutes: 45, sourcePages: "35–52", sourceQuestionCount: 45, questionIds: [5040,5041,5032,5025,5024,5029,5031,5033,5049,5035,5037,5038,5036,5030,5048] },
  { id: "final-2017-set-2", title: "Cuối kỳ 2017 – Đề 2", subtitle: "Số thực · CPU · Bộ nhớ · Assembly", year: 2017, minutes: 45, sourcePages: "53–70", sourceQuestionCount: 45, questionIds: [5023,5034,5005,5001,5047,5036,5002,5041,5048,5007,5008,5029,5032,5037,5049] },
  { id: "final-2017-set-1b", title: "Cuối kỳ 2017 – Đề 1B", subtitle: "Cờ CPU · Stack · Tổ chức máy tính", year: 2017, minutes: 45, sourcePages: "71–88", sourceQuestionCount: 45, questionIds: [5041,5029,5036,5031,5040,5024,5048,5001,5003,5025,5017,5037,5038,5035,5032] },
  { id: "final-2018-common", title: "Cuối kỳ 2018 – Đề chung", subtitle: "Assembly · Hiệu năng · Bộ nhớ", year: 2018, minutes: 45, sourcePages: "89–100", sourceQuestionCount: 42, questionIds: [5032,5040,5041,5033,5037,5039,5029,5014,5018,5020,5017,5007,5008,5019,5049] },
  { id: "comprehensive-2017", title: "Ngân hàng tổng hợp CLC 2017", subtitle: "Kiến trúc máy tính và hợp ngữ", year: 2017, minutes: 45, sourcePages: "101–114", sourceQuestionCount: 53, questionIds: [5002,5009,5012,5007,5001,5003,5017,5004,5006,5047,5019,5020,5014,5018,5005] },
  { id: "online-2017-a", title: "Cuối kỳ trực tuyến 2017 – Ca A", subtitle: "Assembly · Stack · Cờ và bit", year: 2017, minutes: 45, sourcePages: "117–135", sourceQuestionCount: 45, questionIds: [5037,5038,5035,5040,5041,5031,5033,5049,5029,5030,5036,5032,5025,5026,5027] },
  { id: "online-2017-b", title: "Cuối kỳ trực tuyến 2017 – Ca B", subtitle: "Bộ nhớ · CPU · Hệ đếm", year: 2017, minutes: 45, sourcePages: "136–152", sourceQuestionCount: 45, questionIds: [5007,5008,5040,5041,5042,5043,5044,5001,5003,5017,5005,5006,5009,5010,5011] },
  { id: "final-2019-07clc", title: "Cuối kỳ 2019 – Nhóm 07CLC", subtitle: "Đề tổng hợp có tính toán", year: 2019, minutes: 45, sourcePages: "153–166", sourceQuestionCount: 36, questionIds: [5042,5049,5029,5026,5006,5014,5019,5039,5020,5017,5023,5018,5007,5008,5035] },
];

export type FinalExam = Omit<ExamSpec, "questionIds"> & {
  questions: Question[];
};

export const finalExams: FinalExam[] = specs.map(({ questionIds, ...exam }, examIndex) => ({
  ...exam,
  questions: questionIds.map((id, questionIndex) => {
    const question = byId.get(id);
    if (!question) throw new Error(`Missing final exam question ${id}`);

    // Xoay vị trí đáp án theo từng đề để đáp án đúng được phân bố đều A/B/C/D.
    const shift = (examIndex + questionIndex) % question.options.length;
    const options = [
      ...question.options.slice(shift),
      ...question.options.slice(0, shift),
    ];

    return {
      ...question,
      id: question.id * 100 + examIndex,
      options,
      answer:
        (question.answer - shift + question.options.length) %
        question.options.length,
    };
  }),
}));
