import { notFound } from "next/navigation";
import { ToolLab } from "@/components/tool-lab";
const valid=["base-converter","twos-complement","ieee754","cpu-performance"];
export function generateStaticParams(){return valid.map(tool=>({tool}))}
export default async function ToolPage({params}:{params:Promise<{tool:string}>}){const{tool}=await params;if(!valid.includes(tool))notFound();return <ToolLab tool={tool}/>}
