import { useI18n } from '../i18n/i18n';
import type { TopLevelCategory } from '../types/skill';

type FiltersProps = {
  query: string;
  onQueryChange: (value: string) => void;
  category: TopLevelCategory | 'All';
  onCategoryChange: (value: TopLevelCategory | 'All') => void;
  risk: string | 'All';
  onRiskChange: (value: string | 'All') => void;
  riskOptions: string[];
  getRiskLabel: (risk: string) => string;
};

const CATEGORY_OPTIONS: Array<TopLevelCategory | 'All'> = [
  'All',
  'Frontend',
  'Backend',
  'Security',
  'Review',
  'Mobile',
  'Research',
  'DevOps',
  'Other'
];

export default function Filters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  risk,
  onRiskChange,
  riskOptions,
  getRiskLabel
}: FiltersProps) {
  const { t } = useI18n();

  return (
    <section className="glass-panel rounded-2xl p-6" aria-label="filters">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="search" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
            {t('catalog.search.label')}
          </label>
          <div className="relative group">
            <input
              id="search"
              className="w-full focus-ring rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 transition-all placeholder:text-slate-400 group-hover:bg-white group-hover:border-slate-300"
              placeholder={t('catalog.search.placeholder')}
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
            {t('catalog.filter.category')}
          </label>
          <select
            id="category"
            className="focus-ring rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 transition-all hover:bg-white hover:border-slate-300 appearance-none"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value as TopLevelCategory | 'All')}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === 'All' ? t('catalog.filter.all') : t(`category.${option}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="risk" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
            {t('catalog.filter.risk')}
          </label>
          <select
            id="risk"
            className="focus-ring rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 transition-all hover:bg-white hover:border-slate-300 appearance-none"
            value={risk}
            onChange={(event) => onRiskChange(event.target.value as string | 'All')}
          >
            <option value="All">{t('catalog.filter.all')}</option>
            {riskOptions.map((value) => (
              <option key={value} value={value}>
                {getRiskLabel(value)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="sort" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
            {t('catalog.filter.sort')}
          </label>
          <select
            id="sort"
            className="focus-ring rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-400 transition-all cursor-not-allowed appearance-none opacity-60"
            value="id_asc"
            disabled
          >
            <option value="id_asc">{t('catalog.filter.sort.az')}</option>
          </select>
        </div>
      </div>
    </section>
  );
}
