import { StudentAccessGate } from "@/components/student-access-gate";
export default function Layout({children}:{children:React.ReactNode}){return <StudentAccessGate returnTo="/cheatsheet">{children}</StudentAccessGate>}
