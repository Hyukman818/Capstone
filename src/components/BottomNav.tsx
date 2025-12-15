import { Home, Activity, BarChart3, MapPin, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'measure' | 'stats' | 'hospital' | 'profile';
  onTabChange: (tab: 'home' | 'measure' | 'stats' | 'hospital' | 'profile') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home' as const, icon: Home, label: '홈' },
    { id: 'measure' as const, icon: Activity, label: '측정' },
    { id: 'stats' as const, icon: BarChart3, label: '통계' },
    { id: 'hospital' as const, icon: MapPin, label: '병원' },
    { id: 'profile' as const, icon: User, label: '프로필' },
  ];

  return (
    <div className="bs-bottom-nav">
      <div className="flex items-center justify-around px-2 pt-3 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-xl transition-all touch-manipulation"
              style={{
                color: isActive ? 'var(--banksalad-primary)' : 'var(--banksalad-text-tertiary)',
                background: isActive ? 'rgba(108, 92, 231, 0.08)' : 'transparent',
                minHeight: '56px'
              }}
            >
              <Icon
                className="w-6 h-6 mb-1"
                style={{
                  strokeWidth: isActive ? '2.5px' : '2px'
                }}
              />
              <span
                className="text-xs"
                style={{
                  fontWeight: isActive ? '600' : '500'
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
