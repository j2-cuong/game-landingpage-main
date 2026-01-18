import navigation from "../data/navigation.json";

// TopBar renders the slim utility bar with quick account links.
export default function TopBar() {
  return (
    <div className="bg-gray-100 border-b border-gray-200 min-w-[1890px] max-w-[1890px] mx-auto">
      <div className="mx-auto px-8">
        <div className="flex justify-between items-center h-10">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/xiaoyao-logo.png"
              alt="Cổng game Tiêu Dao"
              className="h-6 w-auto"
            />
          </div>

          {/* Right side links */}
          <div className="flex items-center space-x-6">
            {navigation.topBar.links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className={`${
                  link.highlight
                    ? "text-red-600 hover:text-red-700 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                } text-sm transition-colors flex items-center`}
              >
                {link.label}
                {link.hasDropdown && (
                  <svg
                    className="ml-1 w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
