import rawExamData from "@/data/final-exams-full.json";
import type { Question } from "@/data/course";

type RawQuestion = Omit<Question, "id"> & {
  number: number;
  sourcePage: number;
  detectedBy: string;
};

type RawExam = {
  id: string;
  sourceQuestionCount: number;
  questions: RawQuestion[];
};

type ExamMetadata = {
  title: string;
  subtitle: string;
  year: number;
  minutes: number;
  sourcePages: string;
};

const metadata: Record<string, ExamMetadata> = {
  "review-2017": { title: "Bộ ôn tập CLC 2017", subtitle: "Hệ đếm · Assembly · Cờ CPU", year: 2017, minutes: 30, sourcePages: "2–8" },
  "final-2019-even": { title: "Cuối kỳ 2019 – Nhóm chẵn", subtitle: "CPU · Bộ nhớ · Hiệu năng · I/O", year: 2019, minutes: 70, sourcePages: "10–21" },
  "final-2019-odd": { title: "Cuối kỳ 2019 – Nhóm lẻ", subtitle: "Chu kỳ lệnh · Cache · Assembly", year: 2019, minutes: 70, sourcePages: "22–34" },
  "final-2017-set-1a": { title: "Cuối kỳ 2017 – Đề 1A", subtitle: "Assembly · Địa chỉ · Chuỗi lệnh", year: 2017, minutes: 70, sourcePages: "35–52" },
  "final-2017-set-2": { title: "Cuối kỳ 2017 – Đề 2", subtitle: "Số thực · CPU · Bộ nhớ · Assembly", year: 2017, minutes: 70, sourcePages: "53–70" },
  "final-2017-set-1b": { title: "Cuối kỳ 2017 – Đề 1B", subtitle: "Cờ CPU · Stack · Tổ chức máy tính", year: 2017, minutes: 70, sourcePages: "71–88" },
  "final-2018-common": { title: "Cuối kỳ 2018 – Đề chung", subtitle: "Assembly · Hiệu năng · Bộ nhớ", year: 2018, minutes: 65, sourcePages: "89–100" },
  "comprehensive-2017": { title: "Ngân hàng tổng hợp CLC 2017", subtitle: "Kiến trúc máy tính và hợp ngữ", year: 2017, minutes: 80, sourcePages: "101–114" },
  "online-2017-a": { title: "Cuối kỳ trực tuyến 2017 – Ca A", subtitle: "Assembly · Stack · Cờ và bit", year: 2017, minutes: 70, sourcePages: "117–135" },
  "online-2017-b": { title: "Cuối kỳ trực tuyến 2017 – Ca B", subtitle: "Bộ nhớ · CPU · Hệ đếm", year: 2017, minutes: 70, sourcePages: "136–152" },
  "final-2019-07clc": { title: "Cuối kỳ 2019 – Nhóm 07CLC", subtitle: "Đề tổng hợp có tính toán", year: 2019, minutes: 55, sourcePages: "153–166" },
};

export type FinalExam = ExamMetadata & {
  id: string;
  sourceQuestionCount: number;
  questions: Question[];
};

export const finalExams: FinalExam[] = (rawExamData as RawExam[]).map(
  (rawExam, examIndex) => {
    const examMetadata = metadata[rawExam.id];
    if (!examMetadata) throw new Error(`Missing metadata for ${rawExam.id}`);
    if (rawExam.questions.length !== rawExam.sourceQuestionCount) {
      throw new Error(`${rawExam.id} has ${rawExam.questions.length}/${rawExam.sourceQuestionCount} questions`);
    }

    return {
      id: rawExam.id,
      ...examMetadata,
      sourceQuestionCount: rawExam.sourceQuestionCount,
      questions: rawExam.questions.map((question, questionIndex) => {
        const reviewOnly = question.options.some((option) =>
          option.includes("Đáp án được trình bày trong đề gốc"),
        );
        const shift = (examIndex + questionIndex) % question.options.length;
        const options = [...question.options.slice(shift), ...question.options.slice(0, shift)];
        return {
          chapterId: question.chapterId,
          id: (examIndex + 1) * 1000 + question.number,
          prompt: question.prompt,
          options,
          answer: reviewOnly
            ? -1
            : (question.answer - shift + question.options.length) % question.options.length,
          difficulty: question.difficulty,
          tags: reviewOnly ? [...question.tags, "Câu tham khảo"] : question.tags,
          explanation: question.explanation,
        };
      }),
    };
  },
);
