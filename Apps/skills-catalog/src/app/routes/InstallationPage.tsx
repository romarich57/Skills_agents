import InstallationManual from '../../components/InstallationManual';
import { useI18n } from '../../i18n/i18n';

export default function InstallationPage() {
  const { t } = useI18n();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8">
      <header className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-10 shadow-2xl sm:px-12 sm:py-14">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-slate-600/20" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('installation.page.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300 sm:text-xl">
            {t('installation.page.subtitle')}
          </p>
        </div>
      </header>

      <InstallationManual />
    </main>
  );
}
