"use client"; // Wajib di Next.js App Router jika menggunakan hooks/interaktivitas
import { useState } from "react";

export default function ProfilBenar() {
  // nama = nilai saat ini (read-only)
  // setNama = fungsi "pemicu alarm" untuk mengubah nilai sekaligus menyuruh React menggambar ulang UI
  const [nama, setNama] = useState("Rafiar");
  const [flag, setFlag] = useState(false);
  function ubahNama() {
    if(flag) {
      setNama("Budi"); // 1. Mengubah nilai di memori React, 2. Memicu siklus Re-render
    } else {
      setNama("Rafiar"); // 1. Mengubah nilai di memori React, 2. Memicu siklus Re-render
    }

    setFlag(!flag); // Membalik nilai flag setiap kali tombol diklik
  }

  return <button onClick={ubahNama}>Halo, {nama}</button>;
}