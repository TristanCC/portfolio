import Image from "next/image";
import { useState } from "react";

const Phone = () => {

  return (
    <div   className="">
      {/* Phone Frame */}


      <div className=" top-0 visible ">
        <div
          style={{
            display: "flex",
            transition: "transform 0.3s ease",
          }}
          className="overflow-hidden p-4"
        >
          <video
            src="./output.mp4"
            autoPlay
            loop
            muted
            playsInline
            className=" border-2 border-accent-foreground bg-orange-500"
            style={{
              filter: "contrast(90%) brightness(100%)",
            }}
          ></video>
        </div>
      </div>

      {/* Swipeable Content */}
      {/*       <div
        style={{
          position: "absolute",
          top: "12%",
          left: "10%",
          width: "80%",
          height: "76%",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            width: `${images.length * 100}%`,
            height: "100%",
            transform: `translateX(-${(current * 100) / images.length}%)`,
            transition: "transform 0.3s ease",
          }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              style={{
                width: `${100 / images.length}%`,
                height: "100%",
                flexShrink: 0,
                position: "relative",

                filter:
                  "invert(24%) sepia(31%) saturate(10000%) hue-rotate(45deg) brightness(125%) contrast(121%)",
              }}
            >
              <Image
                src={src}
                alt={`slide ${i}`}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Phone;
