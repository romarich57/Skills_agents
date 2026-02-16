import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import InvocationExamples from '../../components/InvocationExamples';
import { useI18n } from '../../i18n/i18n';
import { extractPathGroup, inferTopLevelCategory } from '../../lib/categorize';
import { getLocalizedDescription, getLocalizedRisk, getLocalizedSource } from '../../lib/skillLocalization';
import { loadSkills } from '../../lib/skills';
import type { SkillIndexItem } from '../../types/skill';

export default function SkillDetailPage() {
  const { t, lang } = useI18n();
  const { id } = useParams();
  const decodedId = decodeURIComponent(id ?? '');

  const [skill, setSkill] = useState<SkillIndexItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchSkill() {
      try {
        setLoading(true);
        const data = await loadSkills();
        if (!isMounted) {
          return;
        }
        const found = data.find((entry) => entry.id === decodedId) ?? null;
        setSkill(found);
        setError(null);
      } catch {
        if (!isMounted) {
          return;
        }
        setError(t('error.load'));
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchSkill();

    return () => {
      isMounted = false;
    };
  }, [decodedId, t]);

  const topCategory = useMemo(() => (skill ? inferTopLevelCategory(skill) : null), [skill]);
  const pathGroup = useMemo(() => (skill ? extractPathGroup(skill.path) : null), [skill]);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="focus-ring group inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200 hover:text-brand-600 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        {t('detail.back')}
      </Link>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl bg-red-50 p-6 text-sm font-medium text-red-600 ring-1 ring-red-200">
          {error}
        </div>
      ) : null}

      {!loading && !error && !skill ? (
        <div className="card-surface p-12 text-center text-slate-600">
          {t('detail.notFound')}
        </div>
      ) : null}

      {!loading && !error && skill ? (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <header className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-10 shadow-xl sm:px-12 sm:py-12">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-brand-500/20 px-3 py-1 text-xs font-bold text-brand-400 ring-1 ring-inset ring-brand-500/30">
                  {topCategory ? t(`category.${topCategory}`) : null}
                </span>
                <span className="text-xs font-medium text-slate-500">{skill.id}</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white mb-4 sm:text-4xl capitalize">
                {skill.name}
              </h1>
              <p className="text-lg leading-relaxed text-slate-400 max-w-3xl">
                {getLocalizedDescription(skill.description, lang)}
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 flex flex-col gap-8">
              <InvocationExamples skillId={skill.id} />
            </div>

            <aside className="flex flex-col gap-6">
              <section className="glass-panel rounded-2xl p-6">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                  <span className="h-4 w-1 rounded-full bg-brand-500" />
                  {t('detail.title')}
                </h2>
                <dl className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{t('detail.meta.risk')}</dt>
                    <dd className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${skill.risk === 'low' ? 'bg-emerald-500' : skill.risk === 'medium' ? 'bg-amber-500' : 'bg-red-500'}`} />
                      {getLocalizedRisk(skill.risk, lang)}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{t('detail.meta.source')}</dt>
                    <dd className="text-sm font-semibold text-slate-700 truncate">{getLocalizedSource(skill.source, lang)}</dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{t('detail.meta.pathGroup')}</dt>
                    <dd className="text-sm font-semibold text-slate-700">{pathGroup ?? t('detail.meta.pathGroupNA')}</dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{t('detail.meta.path')}</dt>
                    <dd className="text-[10px] font-mono font-medium text-slate-500 break-all p-2 bg-slate-50 rounded-lg ring-1 ring-inset ring-slate-100">{skill.path}</dd>
                  </div>
                </dl>
              </section>
            </aside>
          </div>
        </div>
      ) : null}
    </main>
  );
}
