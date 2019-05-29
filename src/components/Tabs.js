import React from "react";

export default function Tabs({ action, tabs, style }) {
  return (
    <nav className="tabs">
      <div className="button-group">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => action(`${tab}`)}
            className={`tab ${tab}`}
            style={style}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
