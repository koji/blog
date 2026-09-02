/**
 * Translation dictionary for i18n.
 * Keys use dot-notation like `nav.tags`, `page.index.title`, etc.
 * `en` values are extracted verbatim from existing Astro pages/components.
 * `ja` values are natural Japanese translations.
 */
export const ui = {
  en: {
    // Navigation - src/layouts/components/Header.astro
    'nav.home': 'Home',
    'nav.home.aria': 'Home',
    'nav.tags': 'Tags',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.aria.themeToggle': 'Theme mode',

    // Page: index - src/pages/index.astro
    'page.index.title': 'All posts on the blog',
    'page.index.description': 'Articles, guides, tutorials',

    // Page: tags index - src/pages/tags/index.astro
    'page.tags.title': 'All Tags',
    'page.tags.description':
      'Post tags: concise keywords categorizing content for easy navigation and improved searchability',

    // Page: tag [tag] - src/pages/tags/[tag]/index.astro
    // Used as prefix: `All Posts Tagged with ${tag}`
    'page.tag.titlePrefix': 'All Posts Tagged with',
    // With placeholder for i18n-aware rendering: t('page.tag.title', { tag })
    'page.tag.title': 'All Posts Tagged with {tag}',
    'page.tag.description': 'All Posts Tagged with {tag}',

    // Page: projects - src/pages/projects/index.astro
    'page.projects.title': 'All My Projects',
    'page.projects.description':
      'All my project portfolio from real projects to open source projects.',

    // Page: about - src/pages/about.astro
    'page.about.title': 'About Me',
    'page.about.description': 'Lorem ipsum dolor sit amet',
    'page.about.greeting': 'Hello 👋, Koji Here!',

    // About - detailed paragraphs
    'page.about.intro':
      'I am a software engineer from Japan. I love sharing what i know. I\'m also active on {devto}, {twitter}, and {bluesky}.',
    'page.about.heading.role':
      'Experienced Software Engineer | Machine Learning & IoT Enthusiast | Passionate About Building Products That Make a Difference',
    'page.about.paragraph.roleIntro':
      "I'm Koji, a dedicated software engineer with a knack for creating cutting-edge solutions that positively impact people's lives. With a degree from New York University and a diverse skill set including TypeScript, React, and Python, I thrive in fast-paced environments where I can tackle complex challenges and drive innovative product development.",
    'page.about.paragraph.journey1':
      'A bit about my journey: At Opentrons, I am developing desktop applications using Electron and touch panel applications for our new robot, Flex. Our main tech stack is React.js and TypeScript.',
    'page.about.paragraph.journey2':
      "At Ubiquiti, I played a key role in developing a sophisticated web application using React.js, TypeScript, Redux, Node.js, and PostgreSQL. I also explored the exciting intersection of hardware and software, training machine learning models in Python while researching 3D camera possibilities. As a Resident Researcher at NYU ITP (2018-2019), I combined Raspberry Pi and machine learning to prototype creative solutions. I even built a generative art application with openFrameworks and Python, blending my technical expertise with a love for creative expression. Prior to that, I co-founded NGEMS, a web application development company recognized by NYC Media Lab's Combine 2018 cohort. As the lead engineer, I guided the team through the development of innovative applications, earning several awards along the way. Beyond these roles, I've always been passionate about blending machine learning, IoT, and art to push boundaries in tech.",
    'page.about.heading.next': "What's next?",
    'page.about.paragraph.next':
      "I'm actively seeking my next challenge in software engineering, where I can continue to fuse creativity and technology. If you're looking for someone who brings a unique mix of technical proficiency, creative problem-solving, and a drive to make meaningful impact, let's connect!",
    'page.about.paragraph.contact':
      "Feel free to reach out to me here on {linkedin}—I'm always open to new opportunities and collaborations!",

    // Post - src/pages/[...slug].astro
    'post.publishedOn': 'Published on',
    'post.updatedOn': 'Updated on',

    // Widgets
    'widget.toc.title': 'On This Page',
    'widget.aboutAuthor.title': 'About the Author',
    'widget.aboutAuthor.body1':
      'Koji is a software engineer with experiences building IoT system, Desktop application, and On-Device application. He is actively writing on {topics}.',
    'widget.aboutAuthor.topics': 'new tech(mostly GenAI) and frontend stuff',
    'widget.aboutAuthor.body2':
      'He will be happy to work and collaborate in any project as a software engineer. His main stacks are React, TypeScript, Nodejs, and Python.',
    'widget.author.role': 'Software Engineer',

    // Footer - src/layouts/components/Footer.astro
    'footer.copyright': 'Copyright © {year} koji.',
    'footer.template': 'Template created by {author}',
    'footer.template.author': 'Syakir @ Devaradise',
  },
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.home.aria': 'ホーム',
    'nav.tags': 'タグ',
    'nav.about': '私について',
    'nav.projects': 'プロジェクト',
    'nav.aria.themeToggle': 'テーマ切り替え',

    // Page: index
    'page.index.title': 'ブログのすべての投稿',
    'page.index.description': '記事、ガイド、チュートリアル',

    // Page: tags index
    'page.tags.title': 'すべてのタグ',
    'page.tags.description':
      '投稿タグ：コンテンツを分類し、ナビゲーションと検索性を向上させる簡潔なキーワード',

    // Page: tag [tag]
    'page.tag.titlePrefix': 'タグ',
    'page.tag.title': 'タグ「{tag}」の投稿一覧',
    'page.tag.description': 'タグ「{tag}」が付いたすべての投稿',

    // Page: projects
    'page.projects.title': 'すべてのプロジェクト',
    'page.projects.description':
      '実務プロジェクトからオープンソースまで、私のプロジェクトポートフォリオ一覧です。',

    // Page: about
    'page.about.title': '私について',
    'page.about.description': 'ソフトウェアエンジニア Koji のプロフィール',
    'page.about.greeting': 'こんにちは 👋、Koji です！',

    // About - detailed paragraphs (natural Japanese)
    'page.about.intro':
      '日本出身のソフトウェアエンジニアです。学んだことを共有するのが好きで、{devto} や {twitter}、{bluesky} でも発信しています。',
    'page.about.heading.role':
      '経験豊富なソフトウェアエンジニア | 機械学習 & IoT 愛好家 | 人々の役に立つプロダクトを作ることに情熱を注いでいます',
    'page.about.paragraph.roleIntro':
      'ニューヨーク大学を卒業し、TypeScript、React、Python などを駆使して、人々の生活にポジティブな影響を与える最先端のソリューションを作ることに情熱を注いでいるソフトウェアエンジニア、Koji です。スピード感のある環境で複雑な課題に取り組み、革新的なプロダクト開発を推進することにやりがいを感じています。',
    'page.about.paragraph.journey1':
      'これまでの歩みについて少し：Opentrons では、Electron を用いたデスクトップアプリケーションや、新しいロボット Flex 向けのタッチパネルアプリケーションを開発しています。メインの技術スタックは React.js と TypeScript です。',
    'page.about.paragraph.journey2':
      'Ubiquiti では、React.js、TypeScript、Redux、Node.js、PostgreSQL を用いた高度なウェブアプリケーションの開発で中心的な役割を担いました。また、Python で機械学習モデルを学習させながら 3D カメラの可能性を研究するなど、ハードウェアとソフトウェアの交差点にも取り組みました。NYU ITP では 2018〜2019 年に Resident Researcher として、Raspberry Pi と機械学習を組み合わせて創造的なソリューションのプロトタイプを作成しました。openFrameworks と Python でジェネラティブアートのアプリケーションを制作するなど、技術的な専門性と創造的な表現への愛を融合させてきました。それ以前には、NYC Media Lab の Combine 2018 に採択されたウェブアプリケーション開発会社 NGEMS を共同創業し、リードエンジニアとして革新的なアプリケーションの開発を牽引し、いくつかの賞を受賞しました。これらの役割を超えて、機械学習、IoT、アートを融合させて技術の境界を押し広げることに常に情熱を注いでいます。',
    'page.about.heading.next': '今後について',
    'page.about.paragraph.next':
      '現在、創造性とテクノロジーを融合させ続けられるソフトウェアエンジニアリングの次の挑戦を探しています。技術的な熟練、創造的な問題解決、そして意味のあるインパクトを生み出す意欲を兼ね備えた人材をお探しでしたら、ぜひご連絡ください！',
    'page.about.paragraph.contact':
      '{linkedin} からお気軽にご連絡ください — 新たな機会やコラボレーションを常に歓迎しています！',

    // Post
    'post.publishedOn': '公開日',
    'post.updatedOn': '更新日',

    // Widgets
    'widget.toc.title': '目次',
    'widget.aboutAuthor.title': '著者について',
    'widget.aboutAuthor.body1':
      'Koji は IoT システム、デスクトップアプリケーション、オンデバイスアプリケーションの開発経験を持つソフトウェアエンジニアです。{topics} について積極的に発信しています。',
    'widget.aboutAuthor.topics': '最新技術（特に生成AI）とフロントエンド',
    'widget.aboutAuthor.body2':
      'ソフトウェアエンジニアとして、あらゆるプロジェクトでの協業を歓迎します。主な技術スタックは React、TypeScript、Node.js、Python です。',
    'widget.author.role': 'ソフトウェアエンジニア',

    // Footer
    'footer.copyright': 'Copyright © {year} koji.',
    'footer.template': 'テンプレート作成: {author}',
    'footer.template.author': 'Syakir @ Devaradise',
  },
} as const;

export type UiLang = keyof typeof ui;
export type UiKey = keyof (typeof ui)['en'];
