"use client";
import { useState } from "react";

type FormCutiTahunanProps = {
  tglMulai: string;
  tglAkhir: string;
  onUbahMulai: (value: string) => void;
  onUbahAkhir: (value: string) => void;
  error?: string;
};

// ==========================================
// 1. KOMPONEN ANAK: Form Cuti Tahunan
// ==========================================
function FormCutiTahunan({ tglMulai, tglAkhir, onUbahMulai, onUbahAkhir, error }: FormCutiTahunanProps) {
  return (
    <div>
      <div>
        <label>Tanggal Mulai: </label>
        <input type="date" value={tglMulai} onChange={(e) => onUbahMulai(e.target.value)} />
      </div>
      <div>
        <label>Tanggal Berakhir: </label>
        <input type="date" value={tglAkhir} onChange={(e) => onUbahAkhir(e.target.value)} />
      </div>
      {/* Menampilkan pesan validasi yang dikirim dari Induk */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

// ==========================================
// 2. KOMPONEN ANAK: Form Cuti Haji (Dinamis)
// ==========================================
type FormCutiHajiProps = {
  tglBerangkat: string;
  onUbahBerangkat: (value: string) => void;
};

function FormCutiHaji({ tglBerangkat, onUbahBerangkat }: FormCutiHajiProps) {
  // DERIVED STATE: Dihitung langsung saat render, tidak perlu useState terpisah!
  let estimasiMulai = "-";
  let estimasiAkhir = "-";

  if (tglBerangkat) {
    const baseDate = new Date(tglBerangkat);
    
    const mulai = new Date(baseDate);
    mulai.setDate(baseDate.getDate() - 15); // H-15 keberangkatan
    estimasiMulai = mulai.toISOString().split("T")[0];

    const akhir = new Date(baseDate);
    akhir.setDate(baseDate.getDate() + 45); // H+45 keberangkatan
    estimasiAkhir = akhir.toISOString().split("T")[0];
  }

  return (
    <div>
      <div>
        <label>Tanggal Keberangkatan Haji: </label>
        <input type="date" value={tglBerangkat} onChange={(e) => onUbahBerangkat(e.target.value)} />
      </div>
      {/* 3 Tampilan Informasi Dinamis */}
      <div style={{ marginTop: "10px", background: "#222", padding: "10px" }}>
        <p>Tanggal Mulai Cuti (H-15): <strong>{estimasiMulai}</strong></p>
        <p>Tanggal Keberangkatan: <strong>{tglBerangkat || "-"}</strong></p>
        <p>Tanggal Akhir Cuti (H+45): <strong>{estimasiAkhir}</strong></p>
      </div>
    </div>
  );
}

// ==========================================
// 3. KOMPONEN INDUK: Pengelola State & Validasi
// ==========================================
export default function HalamanPengajuanCuti() {
  const [tipeCuti, setTipeCuti] = useState("tahunan");
  
  // State untuk Cuti Tahunan
  const [tglMulai, setTglMulai] = useState("");
  const [tglAkhir, setTglAkhir] = useState("");
  
  // State untuk Cuti Haji
  const [tglBerangkat, setTglBerangkat] = useState("");

  // VALIDASI DINAMIS (Derived Validation)
  let pesanError = "";
  if (tipeCuti === "tahunan" && tglMulai && tglAkhir && tglAkhir < tglMulai) {
    pesanError = "Tanggal berakhir tidak boleh lebih awal dari tanggal mulai!";
  }

  return (
    <main style={{ padding: "20px" }}>
      <h2>Form Pengajuan Cuti</h2>
      
      {/* Kontrol Pemilih Tipe Cuti */}
      <select value={tipeCuti} onChange={(e) => setTipeCuti(e.target.value)}>
        <option value="tahunan">Cuti Tahunan</option>
        <option value="haji">Cuti Haji</option>
      </select>

      <hr style={{ margin: "16px 0" }} />

      {/* Conditional Rendering + Melempar Data & Fungsi ke Anak via Props */}
      {tipeCuti === "tahunan" ? (
        <FormCutiTahunan 
          tglMulai={tglMulai}
          tglAkhir={tglAkhir}
          onUbahMulai={setTglMulai}
          onUbahAkhir={setTglAkhir}
          error={pesanError}
        />
      ) : (
        <FormCutiHaji 
          tglBerangkat={tglBerangkat}
          onUbahBerangkat={setTglBerangkat}
        />
      )}
    </main>
  );
}