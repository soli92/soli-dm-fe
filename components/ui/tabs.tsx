"use client";

import React, { useState } from "react";

interface TabProps {
  label: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: React.ReactElement<TabProps>[];
  defaultTab?: number;
}

export function Tabs({ children, defaultTab = 0 }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 gap-4">
        {children.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === index
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {children[activeTab] && (
          <div>{children[activeTab].props.children}</div>
        )}
      </div>
    </div>
  );
}

export function Tab({ label, children }: TabProps) {
  void label;
  return <>{children}</>;
}
