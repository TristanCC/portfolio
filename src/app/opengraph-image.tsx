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
          justifyContent: "center",
          padding: "96px",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#666666",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: "#ff3300",
            }}
          />
          Available for work — Birmingham, AL
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 0.92,
            letterSpacing: -3,
          }}
        >
          <div style={{ fontSize: 148, fontWeight: 700, color: "#111111" }}>
            SOFTWARE
          </div>
          <div style={{ fontSize: 148, fontWeight: 700, color: "#111111" }}>
            ENGINEER.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 48,
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#666666",
          }}
        >
          <div>01 About</div>
          <div>02 Experience</div>
          <div>03 Work</div>
          <div>04 Contact</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
