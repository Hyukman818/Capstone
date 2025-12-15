import { HospitalRecommendation } from '../../data/hospitalRecommendations';
import { UrgencyBadge } from '../ui/urgency-badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Stethoscope, FlaskConical, DollarSign, Calendar, Info, MapPin } from 'lucide-react';

interface HospitalCardProps {
  recommendation: HospitalRecommendation;
  onShowMap?: () => void;
}

export function HospitalCard({ recommendation, onShowMap }: HospitalCardProps) {

  return (
    <div className="bg-white rounded-xl border border-red-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-gray-900 font-semibold text-base flex-1">{recommendation.condition}</h3>
          <UrgencyBadge urgency={recommendation.urgency} label={recommendation.urgencyLabel} />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-red-600" strokeWidth={2} />
          <span className="font-semibold whitespace-nowrap">{recommendation.timeline}</span>
        </div>
      </div>

      {/* Quick Info */}
      <div className="p-4 space-y-3">
        {/* Departments */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Stethoscope className="w-4 h-4 text-red-600" strokeWidth={2} />
            <h4 className="text-sm font-semibold text-gray-900">추천 진료과</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendation.departments.map((dept, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-red-50 text-red-700 text-xs rounded-full border border-red-200 font-semibold whitespace-nowrap"
              >
                {dept}
              </span>
            ))}
          </div>
        </div>

        {/* Tests */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FlaskConical className="w-4 h-4 text-red-600" strokeWidth={2} />
            <h4 className="text-sm font-semibold text-gray-900">필요 검사</h4>
          </div>
          <ul className="space-y-1.5">
            {recommendation.tests.map((test, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <span className="text-red-500 mr-2 mt-0.5">•</span>
                <span className="leading-relaxed">{test}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cost */}
        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-red-600" />
            <h4 className="text-sm font-semibold text-gray-900">예상 비용</h4>
          </div>
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-red-700">
              {recommendation.estimatedCost.min}~{recommendation.estimatedCost.max}만원
            </span>
            <span className="text-xs text-gray-600 ml-2">(검사 항목에 따라 차이 있음)</span>
          </p>
        </div>
      </div>

      {/* Details Accordion */}
      <Accordion type="single" collapsible className="px-4 pb-4">
        <AccordionItem value="details" className="border-none">
          <AccordionTrigger className="text-sm text-red-700 hover:text-red-800 py-3">
            상세 안내 보기
          </AccordionTrigger>
          <AccordionContent>
            {/* Notes */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-red-600" />
                <h4 className="text-sm font-semibold text-gray-900">안내 사항</h4>
              </div>
              <ul className="space-y-2">
                {recommendation.notes.map((note, index) => (
                  <li key={index} className="text-xs text-gray-700 flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hospital Recommendation Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={onShowMap}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-white transition-all active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #00D2A0 0%, #00B894 100%)',
                  minHeight: '44px'
                }}
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">병원 추천</span>
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
