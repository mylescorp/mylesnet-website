import { ImageResponse } from "next/og";

export const alt = "MylesNet WiFi access and support.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#FFF3E0", color: "#1A395B", display: "flex", height: "100%", width: "100%", padding: "72px", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", fontSize: 74, fontWeight: 800, letterSpacing: -4 }}><span>Myles</span><span style={{ color: "#F57C00" }}>Net</span></div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ color: "#F57C00", fontSize: 30, fontWeight: 700 }}>MYLESNET WIFI</div><div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.1, marginTop: 18 }}>Straightforward WiFi. Clear pricing. Direct support.</div></div>
    </div>,
    size,
  );
}
