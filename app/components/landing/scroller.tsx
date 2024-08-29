import React from "react";
import "./scroller.css";

export default function Scroller() {
  const skills = [
    ".NET",
    "Agile",
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
    "JAMstack",
    "Java",
    "Javascript",
    "Jira",
    "Kanban",
    "Kotlin",
    "MacOS",
    "MaterialUI",
    "MEAN",
    "MERN",
    "MEVN",
    "MobileApps",
    "MongoDB",
    "MySQL",
    "Nest.js",
    "Next.js",
    "Node.js",
    "Parse",
    "PHP",
    "PostgreSQL",
    "PWA",
    "Python",
    "React",
    "ReactNative",
    "Slack",
    "SPA",
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
    "Vue.js",
    "WebApps",
    "Webdev",
    "Websites",
    "Windows",
    "Wordpress",
    "XAMPP",
    "XML",
  ].sort((a, b) => a.localeCompare(b));

  function getRanomizedList(listNumber: number) {
    const tags = [...skills]
      .sort(() => Math.random() - Math.random())
      .map((skill) => (
        <div className="scroller-tag" key={`${skill}-${listNumber}`}>
          <span className="scroller-tag-span">#</span> {skill}
        </div>
      ));

    return (
      <div className="scroller-inner" key={`list-${listNumber}`}>
        {tags}
      </div>
    );
  }

  return (
    <div className="scroller">
      <div className="scroller-tag-list">
        <div
          className="scroller-loop-slider"
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
          className="scroller-loop-slider"
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
          className="scroller-loop-slider"
          style={
            {
              "--duration": "30951ms",
              "--direction": "normal",
            } as React.CSSProperties
          }
        >
          {getRanomizedList(3)}
        </div>
        <div className="scroller-fade"></div>
      </div>
    </div>
  );
}
