import { useEffect, useMemo, useState } from 'react';
import Filters from '../../components/Filters';
import SkillCard from '../../components/SkillCard';
import { useI18n } from '../../i18n/i18n';
import { inferTopLevelCategory } from '../../lib/categorize';
import { getLocalizedDescription, getLocalizedRisk } from '../../lib/skillLocalization';
import { getFilteredSkills, getRiskValues, loadSkills } from '../../lib/skills';
import type { SkillIndexItem, TopLevelCategory } from '../../types/skill';

export default function CatalogPage() {
  const { t, lang } = useI18n();

  const [skills, setSkills] = useState<SkillIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<TopLevelCategory | 'All'>('All');
  const [risk, setRisk] = useState<string | 'All'>('All');

  useEffect(() => {
    let isMounted = true;

    async function fetchSkills() {
      try {
        setLoading(true);
        const data = await loadSkills();
        if (!isMounted) {
          return;
        }
        setSkills(data);
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

    fetchSkills();

    return () => {
      isMounted = false;
    };
  }, [t]);

  const riskOptions = useMemo(() => getRiskValues(skills), [skills]);

  const filteredSkills = useMemo(
    () =>
      getFilteredSkills({
        skills,
        query,
        category,
        risk,
        lang
      }),
    [skills, query, category, risk, lang]
  );

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <header className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-10 shadow-2xl sm:px-12 sm:py-14">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-indigo-600/20" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('app.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300 sm:text-xl">
            {t('app.subtitle')}
          </p>
        </div>
      </header>

      <Filters
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        risk={risk}
        onRiskChange={setRisk}
        riskOptions={riskOptions}
        getRiskLabel={(value) => getLocalizedRisk(value, lang)}
      />

      {loading ? <p className="text-sm text-slate-600">{t('catalog.loading')}</p> : null}
      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

      {!loading && !error ? (
        <>
          <p className="text-sm text-slate-600">{t('catalog.results', { count: filteredSkills.length })}</p>

          {filteredSkills.length === 0 ? (
            <p className="card-surface p-5 text-sm text-slate-600">{t('catalog.empty')}</p>
          ) : (
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSkills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  topCategory={inferTopLevelCategory(skill)}
                  description={getLocalizedDescription(skill.description, lang)}
                  localizedRisk={getLocalizedRisk(skill.risk, lang)}
                />
              ))}
            </section>
          )}
        </>
      ) : null}
    </main>
  );
}
