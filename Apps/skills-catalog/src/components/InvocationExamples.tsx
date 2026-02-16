import { useMemo, useState } from 'react';
import { useI18n } from '../i18n/i18n';
import { buildInvocation } from '../lib/invocations';
import type { InvocationPlatform, InvocationScope } from '../types/skill';

type InvocationExamplesProps = {
  skillId: string;
};

const PLATFORM_OPTIONS: InvocationPlatform[] = [
  'codex',
  'claude',
  'cursor',
  'gemini',
  'antigravity',
  'generic'
];

const SCOPE_OPTIONS: InvocationScope[] = ['repo', 'folder', 'file'];
const PROMPT_LANGUAGE_OPTIONS: Array<'en' | 'fr'> = ['en', 'fr'];

export default function InvocationExamples({ skillId }: InvocationExamplesProps) {
  const { t } = useI18n();
  const [platform, setPlatform] = useState<InvocationPlatform>('codex');
  const [scope, setScope] = useState<InvocationScope>('repo');
  const [promptLanguage, setPromptLanguage] = useState<'en' | 'fr'>('en');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const command = useMemo(
    () => buildInvocation(platform, scope, skillId, promptLanguage),
    [platform, scope, skillId, promptLanguage]
  );

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(command);
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 1800);
    } catch {
      setCopyStatus('error');
      window.setTimeout(() => setCopyStatus('idle'), 1800);
    }
  }

  const copyLabel =
    copyStatus === 'copied'
      ? t('detail.invocations.copied')
      : copyStatus === 'error'
        ? t('detail.invocations.copyError')
        : t('detail.invocations.copy');

  return (
    <section className="card-surface p-4">
      <h2 className="text-lg font-semibold text-slate-900">{t('detail.invocations.title')}</h2>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">{t('detail.invocations.platform')}</span>
          <select
            className="focus-ring rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            value={platform}
            onChange={(event) => setPlatform(event.target.value as InvocationPlatform)}
          >
            {PLATFORM_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t(`platform.${option}`)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">{t('detail.invocations.scope')}</span>
          <select
            className="focus-ring rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            value={scope}
            onChange={(event) => setScope(event.target.value as InvocationScope)}
          >
            {SCOPE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t(`detail.invocations.scope.${option}`)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">
            {t('detail.invocations.promptLanguage')}
          </span>
          <select
            className="focus-ring rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            value={promptLanguage}
            onChange={(event) => setPromptLanguage(event.target.value as 'en' | 'fr')}
          >
            {PROMPT_LANGUAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {t(`detail.invocations.promptLanguage.${option}`)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <pre className="mt-4 overflow-auto rounded-md bg-slate-950 p-4 text-sm text-slate-100">
        <code>{command}</code>
      </pre>

      <button
        type="button"
        className="focus-ring mt-3 rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700"
        onClick={copyToClipboard}
      >
        {copyLabel}
      </button>
    </section>
  );
}
