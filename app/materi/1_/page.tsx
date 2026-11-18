"use client"; // Wajib di Next.js App Router jika menggunakan hooks/interaktivitas
import { useState } from "react";

export default function ProfilBenar() {
  // nama = nilai saat ini (read-only)
  // setNama = fungsi "pemicu alarm" untuk mengubah nilai sekaligus menyuruh React menggambar ulang UI
  const [nama, setNama] = useState("Rafiar");
  function ubahNama() {
    setNama(nama === "Rafiar" ? "Budi" : "Rafiar");
  }

  return <button onClick={ubahNama}>Halo, {nama}</button>;
}