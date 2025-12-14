import { Home, Activity, BarChart3, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'measure' | 'stats' | 'profile';
  onTabChange: (tab: 'home' | 'measure' | 'stats' | 'profile') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: '홈' },
    { id: 'measure' as const, icon: Activity, label: '측정' },
    { id: 'stats' as const, icon: BarChart3, label: '통계' },
    { id: 'profile' as const, icon: User, label: '프로필' },
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)' }}
    >
      <div className="flex items-center justify-around px-2 pt-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
                isActive 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-500'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
              <span className={`text-xs ${isActive ? 'font-semibold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
