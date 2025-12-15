import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

export interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low';
  label?: string;
}

export function PriorityBadge({ priority, label }: PriorityBadgeProps) {
  const config = {
    high: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      border: 'border-red-300',
      icon: AlertTriangle,
      defaultLabel: '높음'
    },
    medium: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      border: 'border-yellow-300',
      icon: AlertCircle,
      defaultLabel: '중간'
    },
    low: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      border: 'border-green-300',
      icon: CheckCircle,
      defaultLabel: '낮음'
    }
  };

  const { bg, text, border, icon: Icon, defaultLabel } = config[priority];
  const displayLabel = label || defaultLabel;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${bg} ${text} ${border}`}>
      <Icon className="w-3 h-3" />
      {displayLabel}
    </span>
  );
}
