export const translations = {
  ja: {
    nav: {
      home: 'ホーム',
      features: '機能',
      docs: 'ドキュメント',
      download: 'ダウンロード',
    },
    hero: {
      title: 'すべてのAIエージェントを',
      gradient: 'この一箇所で司る',
      subtitle: 'ローカルサーバーがホストする環境へ、あらゆるデバイスからアクセス',
      cta: 'ダウンロード',
    },
    features: {
      title: '主要機能',
      subtitle: 'AI開発を加速するパワフルな機能',
    },
    cta: {
      title: '今すぐ始めましょう',
      description: 'S-IDEでAI開発の新しい体験を',
      button: '無料でダウンロード',
    },
    download: {
      title: 'ダウンロード',
      subtitle: 'お使いのOSを選択してください',
      latest: '最新版',
      windows: 'Windows',
      macos: 'macOS',
      linux: 'Linux',
      size: 'サイズ',
    },
  },
  en: {
    nav: {
      home: 'Home',
      features: 'Features',
      docs: 'Docs',
      download: 'Download',
    },
    hero: {
      title: 'Next-Gen IDE for',
      gradient: 'AI Agents',
      subtitle: 'S-IDE is an intelligent dev environment optimized for AI workflows',
      cta: 'Download Now',
    },
    features: {
      title: 'Features',
      subtitle: 'Powerful features to accelerate AI development',
    },
    cta: {
      title: 'Get Started Today',
      description: 'Experience a new way of AI development',
      button: 'Download Free',
    },
    download: {
      title: 'Download',
      subtitle: 'Select your operating system',
      latest: 'Latest Release',
      windows: 'Windows',
      macos: 'macOS',
      linux: 'Linux',
      size: 'Size',
    },
  },
} as const;

export type Locale = keyof typeof translations;

// Type guard for locale validation
export function isValidLocale(locale: string | null | undefined): locale is Locale {
  return locale != null && locale in translations;
}

// Get translations with type safety
export function getTranslations(locale: string | null | undefined) {
  const validLocale = isValidLocale(locale) ? locale : 'ja';
  return translations[validLocale];
}
