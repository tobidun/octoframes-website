"use client";

interface AdminNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadCount: number;
  onSignOut: () => void;
}

const NAV_TABS = [
  { key: "messages", label: "Inbox", icon: "✉️" },
  { key: "portfolio", label: "Portfolio", icon: "🎨" },
];

export default function AdminNav({
  activeTab,
  onTabChange,
  unreadCount,
  onSignOut,
}: AdminNavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-xs font-bold text-white">
          M
        </div>
        <span className="font-semibold text-white text-sm">Admin Dashboard</span>
      </div>

      <div className="flex items-center gap-2">
        {NAV_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => onTabChange(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === t.key
                ? "bg-primary-600/20 border border-primary-500/40 text-primary-300"
                : "text-white/50 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            {t.icon} {t.label}
            {t.key === "messages" && unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-[10px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        ))}

        <button
          onClick={onSignOut}
          className="ml-4 text-white/30 hover:text-white/60 text-xs transition-colors"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
