"use client";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
export function LessonActions({slug}:{slug:string}){const[done,setDone]=useState(false);useEffect(()=>setDone(localStorage.getItem(`lesson:${slug}`)==="done"),[slug]);const toggle=()=>{const next=!done;setDone(next);localStorage.setItem(`lesson:${slug}`,next?"done":"")};return <button onClick={toggle} className={done?"secondary-button":"primary-button"}><CheckCircle2 size={16}/>{done?"Đã hoàn thành":"Đánh dấu đã học"}</button>}
