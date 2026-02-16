import { useI18n } from '../i18n/i18n';

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();

  return (
    <div className="flex h-9 items-center rounded-xl bg-slate-100 p-1 shadow-inner ring-1 ring-slate-200" aria-label={t('language.label')}>
      <button
        type="button"
        className={`flex-1 rounded-lg px-3 py-1 text-xs font-bold transition-all duration-200 ${lang === 'en'
            ? 'bg-white text-brand-600 shadow-sm ring-1 ring-slate-200'
            : 'text-slate-500 hover:text-slate-700'
          }`}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={`flex-1 rounded-lg px-3 py-1 text-xs font-bold transition-all duration-200 ${lang === 'fr'
            ? 'bg-white text-brand-600 shadow-sm ring-1 ring-slate-200'
            : 'text-slate-500 hover:text-slate-700'
          }`}
        onClick={() => setLang('fr')}
      >
        FR
      </button>
    </div>
  );
}
