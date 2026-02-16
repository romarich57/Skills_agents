import { Link } from 'react-router-dom';
import type { SkillIndexItem, TopLevelCategory } from '../types/skill';
import { useI18n } from '../i18n/i18n';

type SkillCardProps = {
  skill: SkillIndexItem;
  topCategory: TopLevelCategory;
  description: string;
  localizedRisk: string;
};

export default function SkillCard({ skill, topCategory, description, localizedRisk }: SkillCardProps) {
  const { t } = useI18n();

  return (
    <article className="card-surface group h-full">
      <Link
        to={`/skills/${encodeURIComponent(skill.id)}`}
        className="focus-ring flex h-full flex-col gap-4 p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          </div>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-200">
            {t(`category.${topCategory}`)}
          </span>
        </div>

        <div>
          <h2 className="line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-brand-600">
            {skill.name}
          </h2>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-500">
            {description || skill.id}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100/60">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {localizedRisk}
            </span>
            <span className="truncate max-w-[120px]">{skill.id}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
