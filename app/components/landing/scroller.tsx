import React from "react";
import "./scroller.css";

export default function Scroller() {
  const skills = [
    ".NET",
    "Android",
    "Animations",
    "C",
    "C#",
    "C++",
    "CSS",
    "Expo",
    "Firebase",
    "GraphQL",
    "HTML",
    "IIS",
    "iOS",
    "Java",
    "Javascript",
    "Kotlin",
    "MacOS",
    "MaterialUI",
    "MobileApps",
    "MongoDB",
    "MySQL",
    "Nest.js",
    "Next.js",
    "Node.js",
    "Parse",
    "PHP",
    "PostgreSQL",
    "Python",
    "React",
    "ReactNative",
    "SQL",
    "SQLite",
    "SSMS",
    "Supabase",
    "Swift",
    "SwiftUI",
    "Tailwind",
    "Typescript",
    "UI/UX",
    "VBA",
    "WebApps",
    "Webdev",
    "Websites",
    "Windows",
    "XML",
  ].sort((a, b) => a.localeCompare(b));

  function getRanomizedList(listNumber: number) {
    const tags = [...skills]
      .sort(() => Math.random() - Math.random())
      .map((skill) => (
        <div className="tag" key={`${skill}-${listNumber}`}>
          <span>#</span> {skill}
        </div>
      ));

    return (
      <div className="inner" key={`list-${listNumber}`}>
        {tags}
      </div>
    );
  }

  return (
    <div className="scroller">
      <div className="tag-list">
        <div
          className="loop-slider"
          style={
            {
              "--duration": "25951ms",
              "--direction": "normal",
            } as React.CSSProperties
          }
        >
          {getRanomizedList(1)}
        </div>
        <div
          className="loop-slider"
          style={
            {
              "--duration": "29260ms",
              "--direction": "reverse",
            } as React.CSSProperties
          }
        >
          {getRanomizedList(2)}
        </div>
        <div
          className="loop-slider"
          style={
            {
              "--duration": "30951ms",
              "--direction": "normal",
            } as React.CSSProperties
          }
        >
          {getRanomizedList(3)}
        </div>
        {/* <div
          className="loop-slider"
          style={
            {
              "--duration": "16638ms",
              "--direction": "reverse",
            } as React.CSSProperties
          }
        >
          {getRanomizedList(4)}
        </div> */}
        {/* <div
          className="loop-slider"
          style={
            {
              "--duration": "15936ms",
              "--direction": "normal",
            } as React.CSSProperties
          }
        >
          {getRanomizedList(5)}
        </div> */}
        <div className="fade"></div>
      </div>
    </div>
  );
}
