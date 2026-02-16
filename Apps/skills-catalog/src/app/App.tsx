import { Link, NavLink, Route, Routes } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useI18n } from '../i18n/i18n';
import CatalogPage from './routes/CatalogPage';
import InstallationPage from './routes/InstallationPage';
import SkillDetailPage from './routes/SkillDetailPage';

export default function App() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 glass-panel">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="focus-ring flex items-center gap-2 rounded-md text-base font-extrabold tracking-tight text-slate-900 sm:text-lg"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-sm ring-1 ring-brand-700/20">
              S
            </span>
            {t('app.title')}
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden items-center gap-1 sm:flex">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `focus-ring rounded-full px-4 py-1.5 text-sm transition-all duration-200 ${isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold border border-brand-100 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {t('nav.catalog')}
              </NavLink>
              <NavLink
                to="/installation"
                className={({ isActive }) =>
                  `focus-ring rounded-full px-4 py-1.5 text-sm transition-all duration-200 ${isActive
                    ? 'bg-brand-50 text-brand-700 font-semibold border border-brand-100 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                {t('nav.installation')}
              </NavLink>
            </nav>

            <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-y border-amber-500/20 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-2.5 text-sm text-amber-900 sm:px-6 lg:px-8">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold ring-1 ring-amber-200">!</span>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <p className="font-semibold">{t('oss.banner.title')}</p>
            <a
              href="https://github.com/sickn33/antigravity-awesome-skills"
              target="_blank"
              rel="noreferrer noopener"
              className="focus-ring font-medium text-amber-700 hover:text-amber-800 underline decoration-amber-500/30 underline-offset-4 transition-colors"
            >
              {t('oss.banner.link')}
            </a>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/installation" element={<InstallationPage />} />
        <Route path="/skills/:id" element={<SkillDetailPage />} />
        <Route
          path="*"
          element={
            <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center">
              <div className="card-surface inline-block p-12 mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">404</h2>
                <p className="text-slate-600">{t('detail.notFound')}</p>
                <Link to="/" className="mt-6 inline-flex rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-ring">
                  Go Home
                </Link>
              </div>
            </main>
          }
        />
      </Routes>
    </div>
  );
}
