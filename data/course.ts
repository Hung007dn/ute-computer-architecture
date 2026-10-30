export type Chapter = {
  id: number;
  slug: string;
  title: string;
  description: string;
  lessons: number;
  exercises: number;
  quizzes: number;
  progress: number;
  icon: string;
};

export const chapters: Chapter[] = [
  { id: 1, slug: "tong-quan", title: "Tổng quan kiến trúc máy tính", description: "Phân biệt kiến trúc và tổ chức, mô hình Von Neumann, chu kỳ lệnh và các tầng của hệ thống.", lessons: 4, exercises: 8, quizzes: 5, progress: 100, icon: "⌘" },
  { id: 2, slug: "he-dem", title: "Hệ đếm và chuyển đổi cơ số", description: "Giá trị theo vị trí, chuyển đổi BIN–OCT–DEC–HEX và phép toán nhị phân.", lessons: 4, exercises: 18, quizzes: 8, progress: 86, icon: "01" },
  { id: 3, slug: "bieu-dien-du-lieu", title: "Biểu diễn dữ liệu", description: "Số nguyên, ký tự Unicode, thứ tự byte và số thực IEEE 754.", lessons: 4, exercises: 16, quizzes: 8, progress: 72, icon: "Fx" },
  { id: 4, slug: "so-co-dau", title: "Số có dấu · Bù 1 · Bù 2", description: "Biểu diễn số âm, mở rộng dấu, miền giá trị và phát hiện overflow.", lessons: 4, exercises: 22, quizzes: 10, progress: 68, icon: "±" },
  { id: 5, slug: "cpu-tap-lenh", title: "CPU và tập lệnh", description: "Chu kỳ Fetch–Decode–Execute, ISA, định dạng lệnh và các kiểu định địa chỉ.", lessons: 4, exercises: 20, quizzes: 9, progress: 55, icon: "CPU" },
  { id: 6, slug: "datapath", title: "ALU · Registers · Datapath", description: "Đường đi dữ liệu, register file, ALU, multiplexer và tín hiệu điều khiển.", lessons: 4, exercises: 14, quizzes: 7, progress: 40, icon: "ALU" },
  { id: 7, slug: "bo-nho-cache", title: "Bộ nhớ · RAM · ROM · Cache", description: "Phân cấp bộ nhớ, locality, tag/index/offset, ánh xạ cache và AMAT.", lessons: 4, exercises: 25, quizzes: 12, progress: 32, icon: "MEM" },
  { id: 8, slug: "bus-io", title: "Bus · I/O · Interrupt", description: "Bus hệ thống, memory-mapped I/O, polling, interrupt, DMA và băng thông.", lessons: 4, exercises: 12, quizzes: 6, progress: 20, icon: "I/O" },
  { id: 9, slug: "hieu-nang", title: "Performance · CPI · Clock Cycle", description: "Latency, throughput, CPU time, speedup và giới hạn theo định luật Amdahl.", lessons: 4, exercises: 18, quizzes: 8, progress: 10, icon: "CPI" },
  { id: 10, slug: "assembly", title: "Assembly · x86 · x86-64", description: "Thanh ghi, cờ trạng thái, lệnh cơ bản, stack, calling convention và lời gọi hàm.", lessons: 4, exercises: 24, quizzes: 10, progress: 0, icon: "ASM" },
];

export type Question = {
  id: number;
  chapterId: number;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  tags: string[];
};

export const questions: Question[] = [
  { id: 1, chapterId: 2, prompt: "101101₂ bằng bao nhiêu trong hệ thập phân?", options: ["41", "43", "45", "47"], answer: 2, explanation: "1×2⁵ + 1×2³ + 1×2² + 1×2⁰ = 32 + 8 + 4 + 1 = 45.", difficulty: "Dễ", tags: ["hệ đếm", "nhị phân"] },
  { id: 2, chapterId: 4, prompt: "Số bù 2 của −15 trong hệ 8 bit là?", options: ["00001111", "11110000", "11110001", "10001111"], answer: 2, explanation: "15 = 00001111. Đảo bit được 11110000, cộng 1 được 11110001.", difficulty: "Trung bình", tags: ["bù hai"] },
  { id: 3, chapterId: 5, prompt: "Giai đoạn nào giải mã opcode và toán hạng?", options: ["Fetch", "Decode", "Execute", "Write-back"], answer: 1, explanation: "Decode sử dụng Control Unit để xác định thao tác và nguồn toán hạng.", difficulty: "Dễ", tags: ["chu kỳ lệnh"] },
  { id: 4, chapterId: 7, prompt: "Cache có hit time 2 ns, miss rate 5%, miss penalty 80 ns. AMAT bằng?", options: ["4 ns", "6 ns", "8 ns", "82 ns"], answer: 1, explanation: "AMAT = Hit time + Miss rate × Miss penalty = 2 + 0,05 × 80 = 6 ns.", difficulty: "Trung bình", tags: ["cache", "AMAT"] },
  { id: 5, chapterId: 9, prompt: "CPU chạy 10⁹ lệnh, CPI 2, clock rate 2 GHz. CPU time là?", options: ["0,5 s", "1 s", "2 s", "4 s"], answer: 1, explanation: "CPU time = IC × CPI / Clock rate = 10⁹ × 2 / (2×10⁹) = 1 giây.", difficulty: "Trung bình", tags: ["performance", "CPI"] },
  { id: 6, chapterId: 3, prompt: "IEEE 754 single precision có bao nhiêu bit exponent?", options: ["7", "8", "10", "11"], answer: 1, explanation: "Single precision gồm 1 bit dấu, 8 bit exponent và 23 bit fraction.", difficulty: "Dễ", tags: ["IEEE 754"] },
  { id: 7, chapterId: 6, prompt: "Thanh ghi nào giữ địa chỉ lệnh kế tiếp?", options: ["IR", "MDR", "PC", "MAR"], answer: 2, explanation: "Program Counter (PC) giữ địa chỉ của lệnh sẽ được nạp tiếp theo.", difficulty: "Dễ", tags: ["register"] },
  { id: 8, chapterId: 8, prompt: "DMA giúp hệ thống làm gì?", options: ["CPU truy cập cache nhanh hơn", "Thiết bị truyền dữ liệu trực tiếp với bộ nhớ", "Tăng xung nhịp CPU", "Mã hóa dữ liệu trên bus"], answer: 1, explanation: "DMA controller chuyển khối dữ liệu giữa thiết bị và RAM mà không cần CPU xử lý từng byte.", difficulty: "Trung bình", tags: ["I/O", "DMA"] },
  { id: 9, chapterId: 10, prompt: "Trong x86-64, RSP thường trỏ tới đâu?", options: ["Đầu heap", "Đỉnh stack", "Instruction pointer", "Bảng trang"], answer: 1, explanation: "RSP là stack pointer, trỏ tới đỉnh ngăn xếp hiện tại.", difficulty: "Dễ", tags: ["assembly", "stack"] },
  { id: 10, chapterId: 7, prompt: "Cache direct-mapped đặt một block bộ nhớ vào đâu?", options: ["Bất kỳ dòng nào", "Một dòng xác định bởi index", "Hai dòng bất kỳ", "Chỉ trong L2"], answer: 1, explanation: "Direct-mapped dùng index để xác định duy nhất một cache line cho mỗi block.", difficulty: "Trung bình", tags: ["cache", "mapping"] },
  { id: 11, chapterId: 1, prompt: "Đặc trưng cốt lõi của kiến trúc Von Neumann là gì?", options: ["Tách riêng bộ nhớ lệnh và dữ liệu", "Lệnh và dữ liệu dùng chung bộ nhớ", "Không có thanh ghi", "Chỉ chạy song song"], answer: 1, explanation: "Mô hình Von Neumann lưu lệnh và dữ liệu trong cùng một không gian bộ nhớ.", difficulty: "Dễ", tags: ["Von Neumann"] },
  { id: 12, chapterId: 2, prompt: "Giá trị thập lục phân 7F bằng bao nhiêu trong hệ thập phân?", options: ["117", "125", "127", "129"], answer: 2, explanation: "7F₁₆ = 7×16 + 15 = 127.", difficulty: "Dễ", tags: ["hệ đếm"] },
  { id: 13, chapterId: 2, prompt: "Số nhị phân 11001010₂ tương ứng hệ 16 là?", options: ["CA", "C8", "DA", "BA"], answer: 0, explanation: "Nhóm 1100 và 1010 lần lượt là C và A.", difficulty: "Dễ", tags: ["nhị phân", "hex"] },
  { id: 14, chapterId: 3, prompt: "ASCII chuẩn ban đầu sử dụng bao nhiêu bit?", options: ["6", "7", "8", "16"], answer: 1, explanation: "ASCII chuẩn mã hóa 128 ký tự bằng 7 bit.", difficulty: "Dễ", tags: ["ASCII"] },
  { id: 15, chapterId: 3, prompt: "Bias của exponent trong IEEE 754 single precision là?", options: ["63", "127", "255", "1023"], answer: 1, explanation: "Exponent 8 bit dùng bias 2⁷−1 = 127.", difficulty: "Trung bình", tags: ["IEEE 754"] },
  { id: 16, chapterId: 4, prompt: "Miền giá trị số bù 2 8 bit là?", options: ["−127 đến 127", "−128 đến 127", "−128 đến 128", "−255 đến 255"], answer: 1, explanation: "Với n bit, miền bù 2 là −2ⁿ⁻¹ đến 2ⁿ⁻¹−1.", difficulty: "Dễ", tags: ["bù hai"] },
  { id: 17, chapterId: 4, prompt: "Cộng hai số cùng dấu cho kết quả khác dấu báo hiệu điều gì?", options: ["Carry", "Underflow", "Overflow", "Cache miss"], answer: 2, explanation: "Đây là dấu hiệu overflow trong phép cộng số bù 2.", difficulty: "Trung bình", tags: ["overflow"] },
  { id: 18, chapterId: 5, prompt: "ISA mô tả giao diện giữa những thành phần nào?", options: ["CPU và lập trình viên/phần mềm", "RAM và ổ cứng", "GPU và màn hình", "Cache L1 và L2"], answer: 0, explanation: "ISA định nghĩa lệnh, thanh ghi và kiểu dữ liệu mà phần mềm nhìn thấy.", difficulty: "Dễ", tags: ["ISA"] },
  { id: 19, chapterId: 5, prompt: "Định địa chỉ immediate lấy toán hạng từ đâu?", options: ["Bộ nhớ", "Trong chính lệnh", "Stack", "Thiết bị I/O"], answer: 1, explanation: "Giá trị toán hạng được mã hóa trực tiếp trong lệnh.", difficulty: "Dễ", tags: ["addressing"] },
  { id: 20, chapterId: 6, prompt: "ALU chủ yếu thực hiện nhiệm vụ nào?", options: ["Lưu chương trình", "Phép toán số học và logic", "Điều khiển ổ cứng", "Dịch địa chỉ ảo"], answer: 1, explanation: "ALU thực hiện các phép cộng, trừ, AND, OR, so sánh và dịch bit.", difficulty: "Dễ", tags: ["ALU"] },
  { id: 21, chapterId: 6, prompt: "MAR lưu thông tin gì?", options: ["Dữ liệu đọc", "Địa chỉ ô nhớ đang truy cập", "Lệnh hiện tại", "Kết quả ALU"], answer: 1, explanation: "Memory Address Register giữ địa chỉ dùng cho thao tác đọc hoặc ghi bộ nhớ.", difficulty: "Dễ", tags: ["register"] },
  { id: 22, chapterId: 7, prompt: "Nguyên lý locality nào nói dữ liệu vừa dùng có khả năng sớm được dùng lại?", options: ["Spatial locality", "Temporal locality", "Sequential consistency", "Virtual locality"], answer: 1, explanation: "Temporal locality là tính cục bộ theo thời gian.", difficulty: "Dễ", tags: ["cache", "locality"] },
  { id: 23, chapterId: 7, prompt: "Cache 4-way set associative có bao nhiêu line trong mỗi set?", options: ["1", "2", "4", "8"], answer: 2, explanation: "Số way chính là số cache line trong mỗi set.", difficulty: "Dễ", tags: ["cache"] },
  { id: 24, chapterId: 8, prompt: "Polling khác interrupt ở điểm nào?", options: ["CPU chủ động kiểm tra trạng thái thiết bị", "Không dùng CPU", "Chỉ dùng cho RAM", "Luôn nhanh hơn DMA"], answer: 0, explanation: "Polling khiến CPU lặp lại việc đọc trạng thái thiết bị thay vì được thiết bị báo ngắt.", difficulty: "Trung bình", tags: ["I/O", "interrupt"] },
  { id: 25, chapterId: 8, prompt: "Ưu điểm chính của interrupt so với busy waiting là?", options: ["Giảm dung lượng RAM", "CPU làm việc khác trong lúc chờ", "Tăng kích thước bus", "Loại bỏ cache"], answer: 1, explanation: "CPU chỉ xử lý thiết bị khi có yêu cầu ngắt nên không phải chờ liên tục.", difficulty: "Dễ", tags: ["interrupt"] },
  { id: 26, chapterId: 9, prompt: "Nếu clock rate giữ nguyên và CPI giảm 20%, CPU time thay đổi thế nào?", options: ["Tăng 20%", "Giảm 20%", "Không đổi", "Giảm 50%"], answer: 1, explanation: "CPU time tỉ lệ thuận với CPI khi instruction count và clock rate không đổi.", difficulty: "Trung bình", tags: ["CPI"] },
  { id: 27, chapterId: 9, prompt: "Theo định luật Amdahl, speedup bị giới hạn bởi yếu tố nào?", options: ["Phần chương trình không được cải tiến", "Dung lượng ổ cứng", "Số thanh ghi", "Độ rộng opcode"], answer: 0, explanation: "Phần không thể tăng tốc sẽ giới hạn speedup tổng thể.", difficulty: "Khó", tags: ["Amdahl"] },
  { id: 28, chapterId: 10, prompt: "Lệnh CALL trong x86 thường làm gì trước khi chuyển điều khiển?", options: ["Xóa stack", "Đẩy địa chỉ trở về lên stack", "Đặt RAX về 0", "Tắt interrupt"], answer: 1, explanation: "CALL lưu return address trên stack để RET quay lại đúng vị trí.", difficulty: "Trung bình", tags: ["assembly", "stack"] },
  { id: 29, chapterId: 10, prompt: "Thanh ghi RAX thường được dùng cho mục đích nào trong x86-64?", options: ["Stack pointer", "Giá trị trả về và tích lũy", "Instruction pointer", "Frame pointer"], answer: 1, explanation: "Theo ABI phổ biến, RAX chứa giá trị trả về của hàm.", difficulty: "Dễ", tags: ["assembly"] },
  { id: 30, chapterId: 1, prompt: "Firmware thường được lưu trong loại bộ nhớ nào?", options: ["SRAM cache", "ROM/Flash", "Thanh ghi CPU", "Virtual memory"], answer: 1, explanation: "Firmware cần tồn tại khi mất điện nên thường nằm trong ROM hoặc Flash.", difficulty: "Dễ", tags: ["firmware", "ROM"] },
];

export const dashboardStats = {
  progress: 58,
  learned: "6 / 10",
  quizzes: 143,
  accuracy: 78,
  streak: 6,
  weak: [
    { name: "Cache Memory", score: 45 },
    { name: "Datapath", score: 55 },
    { name: "Assembly", score: 63 },
  ],
};

export const exams = [
  { id: "midterm", title: "Thi thử giữa kỳ", subtitle: "Hệ đếm · Dữ liệu · CPU", questions: 20, minutes: 30, color: "cyan" },
  { id: "final", title: "Thi thử cuối kỳ", subtitle: "Toàn bộ 10 chương", questions: 30, minutes: 45, color: "blue" },
];

export const resources = [
  { title: "Slide tổng quan kiến trúc máy tính", type: "Slide", year: 2026, source: "UTE CA", pages: 42 },
  { title: "Bài tập hệ đếm có lời giải", type: "Bài tập", year: 2026, source: "UTE CA", pages: 18 },
  { title: "Cheat sheet CPU & Performance", type: "Tóm tắt", year: 2026, source: "UTE CA", pages: 2 },
  { title: "Đề luyện giữa kỳ số 01", type: "Đề thi", year: 2025, source: "Ngân hàng luyện tập", pages: 8 },
  { title: "Cache mapping practice set", type: "Bài tập", year: 2026, source: "UTE CA", pages: 12 },
];

export const videos = [
  { title: "Chu kỳ lệnh Fetch–Decode–Execute", chapter: "CPU và tập lệnh", duration: "12:48", language: "Tiếng Việt" },
  { title: "Số âm trong máy tính: Bù hai", chapter: "Biểu diễn dữ liệu", duration: "08:12", language: "Tiếng Việt" },
  { title: "Cache hit, miss và AMAT", chapter: "Bộ nhớ & Cache", duration: "15:30", language: "Tiếng Việt" },
  { title: "Reading x86-64 Assembly", chapter: "Assembly", duration: "18:05", language: "English" },
  { title: "CPU Performance Equation", chapter: "Performance", duration: "10:42", language: "English" },
];
