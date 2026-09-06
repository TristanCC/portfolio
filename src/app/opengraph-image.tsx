import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tristan Johnston — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "hsl(38, 33%, 90%)",
          backgroundImage:
            "radial-gradient(hsl(38, 33%, 70%) 2px, transparent 2px)",
          backgroundSize: "36px 36px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "64px 96px",
            border: "2px dashed rgba(0,0,0,0.35)",
            backgroundColor: "hsl(38, 33%, 90%)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              lineHeight: 0.9,
              letterSpacing: -2,
            }}
          >
            <div style={{ fontSize: 130, fontWeight: 800, color: "#1a1a1a" }}>
              TRISTAN
            </div>
            <div style={{ fontSize: 130, fontWeight: 800, color: "#1a1a1a" }}>
              JOHNSTON
            </div>
          </div>
          <div
            style={{
              fontSize: 32,
              marginTop: 28,
              color: "#1a1a1a",
            }}
          >
            Software Engineer · Full-Stack Developer
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 40,
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#f97316",
            }}
          >
            <div>/ About</div>
            <div>/ Experience</div>
            <div>/ Work</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
