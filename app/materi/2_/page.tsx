"use client";
import { useState } from "react";

export default function FormInput() {
  const [judulTugas, setJudulTugas] = useState("");

  return (
    <div>
      <input
        type="text"
        value={judulTugas} // 1. Tampilan input dikunci oleh State
        onChange={(e) => setJudulTugas(e.target.value)} // 2. Ketikan user dikirim ke State
        placeholder="Ketik nama tugas..."
      />
      <p>Pratinjau langsung: {judulTugas}</p>
    </div>
  );
}