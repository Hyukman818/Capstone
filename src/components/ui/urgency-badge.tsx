import { Urgency } from '../../data/hospitalRecommendations';

export interface UrgencyBadgeProps {
  urgency: Urgency;
  label: string;
}

export function UrgencyBadge({ urgency, label }: UrgencyBadgeProps) {
  const getUrgencyStyle = () => {
    switch (urgency) {
      case 'immediate':
        return 'bg-red-100 text-red-700 border-red-300';
      case '1week':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'monthly':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'annual':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getUrgencyIcon = () => {
    switch (urgency) {
      case 'immediate':
        return '🚨';
      case '1week':
        return '⚠️';
      case 'monthly':
        return '📅';
      case 'annual':
        return '✅';
      default:
        return '📋';
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getUrgencyStyle()}`}>
      <span>{getUrgencyIcon()}</span>
      <span>{label}</span>
    </div>
  );
}
