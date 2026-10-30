import { StudentAccessGate } from "@/components/student-access-gate";
export default function Layout({children}:{children:React.ReactNode}){return <StudentAccessGate returnTo="/study-plan">{children}</StudentAccessGate>}
