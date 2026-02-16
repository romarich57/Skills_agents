import { useI18n } from '../i18n/i18n';

type ManualCommand = {
  label: string;
  explanation: string;
  command: string;
};

type ManualSection = {
  title: string;
  description: string;
  commands: ManualCommand[];
};

type ManualContent = {
  title: string;
  intro: string;
  sourceLabel: string;
  disclaimer: string;
  license: string;
  sections: ManualSection[];
};

const CONTENT: Record<'en' | 'fr', ManualContent> = {
  en: {
    title: 'Open-source attribution and skills installation manual',
    intro:
      'This catalog UI is inspired by the open-source project Antigravity Awesome Skills and uses its public skill registry as data source.',
    sourceLabel: 'Source repository:',
    disclaimer:
      'The skill content is not my original creation. Skill names, descriptions and instructions come from the source project and its contributors.',
    license: 'Main upstream license: MIT.',
    sections: [
      {
        title: '1) Recommended install (npx)',
        description:
          'Fastest way to install all skills once. By default, the installer uses ~/.agent/skills and can update existing installs with git pull.',
        commands: [
          {
            label: 'Universal install',
            explanation: 'Installs to ~/.agent/skills (recommended universal path).',
            command: 'npx antigravity-awesome-skills'
          },
          {
            label: 'Show all options',
            explanation: 'Lists all supported flags and paths.',
            command: 'npx antigravity-awesome-skills --help'
          }
        ]
      },
      {
        title: '2) Install to a specific AI tool path',
        description:
          'Use these flags when you want the skills directly installed into your tool-specific directory.',
        commands: [
          {
            label: 'Claude Code path',
            explanation: 'Installs to .claude/skills.',
            command: 'npx antigravity-awesome-skills --claude'
          },
          {
            label: 'Gemini CLI path',
            explanation: 'Installs to .gemini/skills.',
            command: 'npx antigravity-awesome-skills --gemini'
          },
          {
            label: 'Codex CLI path',
            explanation: 'Installs to .codex/skills.',
            command: 'npx antigravity-awesome-skills --codex'
          },
          {
            label: 'Cursor path',
            explanation: 'Installs to .cursor/skills.',
            command: 'npx antigravity-awesome-skills --cursor'
          },
          {
            label: 'Custom path',
            explanation: 'Installs to any folder you define.',
            command: 'npx antigravity-awesome-skills --path ./my-skills'
          }
        ]
      },
      {
        title: '3) If npm package resolution fails (404 fallback)',
        description:
          'Use the GitHub package form if your npm resolver cannot find the package directly.',
        commands: [
          {
            label: 'GitHub fallback',
            explanation: 'Alternative install command.',
            command: 'npx github:sickn33/antigravity-awesome-skills'
          }
        ]
      },
      {
        title: '4) Manual git clone installation',
        description:
          'Use direct cloning if you prefer explicit path control or no npx-based setup.',
        commands: [
          {
            label: 'Universal path clone',
            explanation: 'Works for most agent setups.',
            command:
              'git clone https://github.com/sickn33/antigravity-awesome-skills.git .agent/skills'
          },
          {
            label: 'Claude Code clone path',
            explanation: 'Claude-specific folder.',
            command:
              'git clone https://github.com/sickn33/antigravity-awesome-skills.git .claude/skills'
          },
          {
            label: 'Gemini CLI clone path',
            explanation: 'Gemini-specific folder.',
            command:
              'git clone https://github.com/sickn33/antigravity-awesome-skills.git .gemini/skills'
          },
          {
            label: 'Codex CLI clone path',
            explanation: 'Codex-specific folder.',
            command:
              'git clone https://github.com/sickn33/antigravity-awesome-skills.git .codex/skills'
          },
          {
            label: 'Cursor clone path',
            explanation: 'Cursor-specific folder.',
            command:
              'git clone https://github.com/sickn33/antigravity-awesome-skills.git .cursor/skills'
          }
        ]
      },
      {
        title: '5) Update and maintenance',
        description: 'Keep your local skills folder in sync with the latest upstream changes.',
        commands: [
          {
            label: 'Update existing install',
            explanation: 'Pulls latest changes in the installed directory.',
            command: 'git -C ~/.agent/skills pull'
          },
          {
            label: 'Reinstall from scratch',
            explanation: 'Deletes old install and reinstalls from package.',
            command: 'rm -rf ~/.agent/skills\nnpx antigravity-awesome-skills'
          }
        ]
      },
      {
        title: '6) Windows symlink fix',
        description:
          'The repository uses symlinks for official skills. On Windows, enable Developer Mode or run Git as Administrator.',
        commands: [
          {
            label: 'Clone with symlink support',
            explanation: 'Ensures symlinks are created correctly on Windows.',
            command:
              'git clone -c core.symlinks=true https://github.com/sickn33/antigravity-awesome-skills.git .agent/skills'
          }
        ]
      }
    ]
  },
  fr: {
    title: "Attribution open source et manuel d'installation des skills",
    intro:
      "Cette interface de catalogue s'inspire du projet open source Antigravity Awesome Skills et utilise son registre public de skills comme source de données.",
    sourceLabel: 'Dépôt source :',
    disclaimer:
      "Le contenu des skills n'est pas ma création. Les noms, descriptions et instructions des skills proviennent du projet source et de ses contributeurs.",
    license: 'Licence principale du projet source : MIT.',
    sections: [
      {
        title: '1) Installation recommandée (npx)',
        description:
          "C'est le moyen le plus rapide pour installer tous les skills une seule fois. Par défaut, l'installateur utilise ~/.agent/skills et met à jour via git pull si le dossier existe déjà.",
        commands: [
          {
            label: 'Installation universelle',
            explanation: 'Installe dans ~/.agent/skills (chemin universel recommandé).',
            command: 'npx antigravity-awesome-skills'
          },
          {
            label: 'Voir toutes les options',
            explanation: 'Affiche tous les flags et chemins disponibles.',
            command: 'npx antigravity-awesome-skills --help'
          }
        ]
      },
      {
        title: '2) Installation sur le chemin spécifique de ton outil IA',
        description:
          "Utilise ces flags si tu veux installer directement dans le dossier spécifique à ton outil.",
        commands: [
          {
            label: 'Chemin Claude Code',
            explanation: 'Installe dans .claude/skills.',
            command: 'npx antigravity-awesome-skills --claude'
          },
          {
            label: 'Chemin Gemini CLI',
            explanation: 'Installe dans .gemini/skills.',
            command: 'npx antigravity-awesome-skills --gemini'
          },
          {
            label: 'Chemin Codex CLI',
            explanation: 'Installe dans .codex/skills.',
            command: 'npx antigravity-awesome-skills --codex'
          },
          {
            label: 'Chemin Cursor',
            explanation: 'Installe dans .cursor/skills.',
            command: 'npx antigravity-awesome-skills --cursor'
          },
          {
            label: 'Chemin personnalisé',
            explanation: 'Installe dans le dossier de ton choix.',
            command: 'npx antigravity-awesome-skills --path ./my-skills'
          }
        ]
      },
      {
        title: "3) Si l'installation npm échoue (fallback 404)",
        description:
          "Utilise la forme GitHub du package si ton resolver npm ne trouve pas le package direct.",
        commands: [
          {
            label: 'Fallback GitHub',
            explanation: "Commande alternative d'installation.",
            command: 'npx github:sickn33/antigravity-awesome-skills'
          }
        ]
      },
      {
        title: '4) Installation manuelle via git clone',
        description:
          'Utilise cette méthode si tu veux contrôler précisément le chemin sans passer par npx.',
        commands: [
          {
            label: 'Clone chemin universel',
            explanation: 'Fonctionne pour la plupart des agents.',
            command:
              'git clone https://github.com/sickn33/antigravity-awesome-skills.git .agent/skills'
          },
          {
            label: 'Clone chemin Claude Code',
            explanation: 'Dossier spécifique Claude.',
            command:
              'git clone https://github.com/sickn33/antigravity-awesome-skills.git .claude/skills'
          },
          {
            label: 'Clone chemin Gemini CLI',
            explanation: 'Dossier spécifique Gemini.',
            command:
              'git clone https://github.com/sickn33/antigravity-awesome-skills.git .gemini/skills'
          },
          {
            label: 'Clone chemin Codex CLI',
            explanation: 'Dossier spécifique Codex.',
            command:
              'git clone https://github.com/sickn33/antigravity-awesome-skills.git .codex/skills'
          },
          {
            label: 'Clone chemin Cursor',
            explanation: 'Dossier spécifique Cursor.',
            command:
              'git clone https://github.com/sickn33/antigravity-awesome-skills.git .cursor/skills'
          }
        ]
      },
      {
        title: '5) Mise à jour et maintenance',
        description:
          'Garde ton dossier local synchronisé avec les dernières modifications du dépôt source.',
        commands: [
          {
            label: "Mettre à jour une installation existante",
            explanation: "Récupère les derniers changements dans le dossier d'installation.",
            command: 'git -C ~/.agent/skills pull'
          },
          {
            label: 'Réinstaller proprement',
            explanation: 'Supprime puis réinstalle depuis le package.',
            command: 'rm -rf ~/.agent/skills\nnpx antigravity-awesome-skills'
          }
        ]
      },
      {
        title: '6) Correctif Windows pour les symlinks',
        description:
          'Le repo utilise des symlinks pour des skills officiels. Sur Windows, active le Developer Mode ou lance Git en administrateur.',
        commands: [
          {
            label: 'Cloner avec support symlink',
            explanation: 'Assure la création correcte des symlinks sur Windows.',
            command:
              'git clone -c core.symlinks=true https://github.com/sickn33/antigravity-awesome-skills.git .agent/skills'
          }
        ]
      }
    ]
  }
};

export default function InstallationManual() {
  const { lang } = useI18n();
  const content = CONTENT[lang];

  return (
    <section className="card-surface p-5">
      <h2 className="text-xl font-bold text-slate-900">{content.title}</h2>
      <p className="mt-2 text-sm text-slate-700">{content.intro}</p>
      <p className="mt-2 text-sm text-slate-700">
        <span className="font-semibold">{content.sourceLabel}</span>{' '}
        <a
          href="https://github.com/sickn33/antigravity-awesome-skills"
          target="_blank"
          rel="noreferrer"
          className="focus-ring rounded-sm text-brand-700 underline underline-offset-2"
        >
          https://github.com/sickn33/antigravity-awesome-skills
        </a>
      </p>
      <p className="mt-2 text-sm text-slate-700">{content.disclaimer}</p>
      <p className="mt-1 text-sm text-slate-600">{content.license}</p>

      <div className="mt-5 space-y-5">
        {content.sections.map((section) => (
          <article key={section.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-base font-semibold text-slate-900">{section.title}</h3>
            <p className="mt-1 text-sm text-slate-700">{section.description}</p>

            <div className="mt-3 space-y-3">
              {section.commands.map((entry) => (
                <div key={`${section.title}-${entry.label}`} className="rounded-md border border-slate-200 bg-white p-3">
                  <p className="text-sm font-semibold text-slate-900">{entry.label}</p>
                  <p className="mt-1 text-sm text-slate-700">{entry.explanation}</p>
                  <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-3 text-sm text-slate-100">
                    <code>{entry.command}</code>
                  </pre>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
