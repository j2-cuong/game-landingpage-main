import gameIntroData from '../data/gameIntro.json';

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  speed: (
    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  multiplayer: (
    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  graphics: (
    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const FEATURE_BG_COLORS: Record<string, string> = {
  speed: 'bg-red-100',
  multiplayer: 'bg-blue-100',
  graphics: 'bg-green-100',
};

// GameIntro giới thiệu tổng quan nội dung và tính năng nổi bật.
export default function GameIntro() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{gameIntroData.title}</h2>
          <p className="text-xl text-gray-600">{gameIntroData.subtitle}</p>
        </div>

        {/* Game Images Grid */}
        <div className="grid grid-cols-2 gap-8 mb-16">
          {gameIntroData.screenshots.map((s, idx) => (
            <div key={idx} className="relative">
              <img
                src={s.src}
                alt={s.alt}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>

        {/* Career Paths Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">{gameIntroData.careerPaths.title}</h3>

          <div className="grid grid-cols-2 gap-8">
            {gameIntroData.careerPaths.paths.map((path) => (
              <div key={path.id} className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{path.title}</h4>
                  <p className="text-gray-600">{path.subtitle}</p>
                </div>
                <img
                  src={path.image}
                  alt={path.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-sm text-gray-700">
                  {path.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-3 gap-8">
          {gameIntroData.features.map((feature) => (
            <div key={feature.id} className="text-center">
              <div className={`${FEATURE_BG_COLORS[feature.iconType] || 'bg-gray-100'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                {FEATURE_ICONS[feature.iconType]}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



