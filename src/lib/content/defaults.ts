import heroImg from "@/assets/hero-business.jpg";
import portraitImg from "@/assets/portrait.jpg";
import logoImg from "@/assets/logo.png";

export type SiteContent = {
  header: {
    logo: string;
    logoAlt: string;
    ctaLabel: string;
    ctaHref: string;
    links: { href: string; label: string }[];
  };
  hero: {
    backgroundImage: string;
    eyebrow: string;
    title: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    stats: { v: string; l: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    subtitle: string;
    portrait: string;
    paragraphs: string[];
    facts: string[];
    ctaLabel: string;
    ctaHref: string;
    bottomCtaTitle: string;
    bottomCtaSubtitle: string;
  };
  howIWork: {
    eyebrow: string;
    title: string;
    description: string;
    cards: { title: string; text: string }[];
    ctaTitle: string;
    ctaSubtitle: string;
  };
  companySteps: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { title: string; text: string; linkLabel: string; linkHref: string }[];
    ctaTitle: string;
    ctaSubtitle: string;
  };
  checklist: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    formTitle: string;
    formSubtitle: string;
    submitLabel: string;
    fileUrl: string;
    successTitle: string;
    successDescription: string;
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: { title: string; text: string; result: string }[];
    ctaTitle: string;
    ctaSubtitle: string;
  };
  tools: {
    eyebrow: string;
    title: string;
    items: { title: string; text: string }[];
  };
  cases: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      title: string;
      problem: string;
      cause: string;
      solution: string;
      result: string;
      ctaLabel: string;
      ctaHref: string;
    }[];
  };
  packages: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      name: string;
      sub: string;
      items: string[];
      result: string;
      cta: string;
      ctaHref: string;
      featured: boolean;
    }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    phoneLabel: string;
    phone: string;
    phoneHref: string;
    emailLabel: string;
    email: string;
    emailHref: string;
    badges: string[];
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    phoneFieldLabel: string;
    messageLabel: string;
    submitLabel: string;
    successTitle: string;
    successDescription: string;
  };
  footer: {
    logo: string;
    brand: string;
    copyright: string;
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
  diplomas: {
    eyebrow: string;
    title: string;
    credentials: { title: string; text: string }[];
    items: { src: string; pdf: string; alt: string }[];
  };
};

export const defaultContent: SiteContent = {
  header: {
    logo: logoImg,
    logoAlt: "Семендуев — антикризисный менеджер",
    ctaLabel: "Бесплатная диагностика",
    ctaHref: "#contacts",
    links: [
      { href: "#about", label: "Обо мне" },
      { href: "#how", label: "Как я работаю" },
      { href: "#company-steps", label: "Шаги для компании" },
      { href: "#process", label: "Диагностика" },
      { href: "#cases", label: "Кейсы" },
      { href: "#packages", label: "Пакеты" },
      { href: "#contacts", label: "Контакты" },
    ],
  },
  hero: {
    backgroundImage: heroImg,
    eyebrow: "Антикризисное управление · 20 лет практики",
    title: "Антикризисное управление для вашего бизнеса",
    description:
      "Находим причины убытков и управленческого хаоса. Проводим диагностику финансов, команды и процессов. Формируем конкретный план выхода из кризиса.",
    primaryCtaLabel: "Записаться на экспресс-диагностику",
    primaryCtaHref: "#contacts",
    secondaryCtaLabel: "Получить антикризисный чек-лист",
    secondaryCtaHref: "#checklist",
    stats: [
      { v: "20 лет", l: "практики" },
      { v: "1 млрд ₽", l: "оборот в год" },
      { v: "1 день", l: "экспресс-диагностика" },
      { v: "360°", l: "взгляд на бизнес" },
    ],
  },
  about: {
    eyebrow: "Обо мне",
    title: "Виктор Семендуев",
    subtitle: "Антикризисный менеджер · к.э.н.",
    portrait: portraitImg,
    paragraphs: [
      "Антикризисный менеджер с 20-летним практическим опытом. В 2005 году основал российское подразделение CreditExpress, которое за 12 лет выросло в одного из лидеров рынка с оборотом почти 1 млрд рублей в год и 3 млрд рублей EBITDA",
      "Мой опыт — это не теория, а работа в агрессивной бизнес-среде: долги, падение cash flow, неэффективные команды, управленческие конфликты, внешнее давление и кризисы роста.",
      "Помогаю собственникам увидеть не симптомы, а корневые причины проблем — в процессах и управлении, команде, финансах. После диагностики вы получаете не общие советы, а первичный план работ по выходу из кризиса.",
    ],
    facts: [
      "20 лет практического опыта",
      "Обороты до 1 млрд ₽ в год и 3 млрд рублей EBITDA",
      "Управление в агрессивной среде",
      "Быстрый поиск первопричины: команда, процессы, финансы",
      "Первичная диагностика за один день",
    ],
    ctaLabel: "Получить диагностику бизнеса",
    ctaHref: "#contacts",
    bottomCtaTitle: "Хотите понять, где ваш бизнес теряет деньги?",
    bottomCtaSubtitle: "Бесплатная экспресс-диагностика за 1 день. Конфиденциально.",
  },
  howIWork: {
    eyebrow: "Подход",
    title: "Как я работаю",
    description:
      "Четыре принципа, которые позволяют выводить компании из кризиса быстро и с устойчивым результатом.",
    cards: [
      {
        title: "Ищу источник проблемы, а не её последствия",
        text: "Не борюсь только с убытками, долгами и падением продаж. Сначала определяю, почему они возникли.",
      },
      {
        title: "Анализирую команду и управленческие решения",
        text: "Проверяю, где бизнес тормозят люди, конфликты, сопротивление изменениям или слабое управление.",
      },
      {
        title: "Смотрю на бизнес в формате 360°",
        text: "Оцениваю финансы, продажи, процессы, рынок, конкурентов, поставщиков и внешние риски.",
      },
      {
        title: "Формирую план, который можно внедрить",
        text: "После диагностики вы получаете не теорию, а верхнеуровневый план действий по выходу из кризиса.",
      },
    ],
    ctaTitle: "Хотите понять, где ваш бизнес теряет деньги?",
    ctaSubtitle: "Запишитесь на бесплатную диагностику — разберу вашу ситуацию лично.",
  },
  companySteps: {
    eyebrow: "Шаги для компании",
    title: "Самостоятельные шаги для компании",
    description:
      "Основные предварительные действия перед вызовом антикризисного эксперта. Эти шаги помогут вам подготовиться и понять масштаб ситуации.",
    steps: [
      {
        title: "Диагностика и самоанализ",
        text: "Шаги для верхнеуровневого понимания возможных причин кризиса.",
        linkLabel: "Получить чек-лист по шагу",
        linkHref: "#checklist",
      },
      {
        title: "Анализ работы команды",
        text: "Шаги для оценки точек роста действий команды, определение слабых звеньев оргструктуры.",
        linkLabel: "Получить чек-лист по шагу",
        linkHref: "#checklist",
      },
      {
        title: "Анализ конкурентной среды",
        text: "Дополнительные действия для оценки внешней среды, которые привели компанию к кризису.",
        linkLabel: "Получить чек-лист по шагу",
        linkHref: "#checklist",
      },
      {
        title: "Аудит продуктовой политики",
        text: "Шаги для аудита продуктовой стратегии и её гибкости к изменениям во внешней среде.",
        linkLabel: "Получить чек-лист по шагу",
        linkHref: "#checklist",
      },
    ],
    ctaTitle: "Прошли шаги, но кризис не уходит?",
    ctaSubtitle: "Запишитесь на бесплатную экспресс-диагностику — разберём вашу ситуацию вместе.",
  },
  checklist: {
    eyebrow: "Бесплатный материал",
    title: "Получите чек-лист по выходу из кризиса",
    description:
      "Внутри — список действий, которые помогают собственнику быстро оценить состояние бизнеса, найти зоны потерь и понять, какие решения нужно принимать в первую очередь.",
    bullets: [
      "Финансы и денежный поток",
      "Команда и управление",
      "Продажи и маркетинг",
      "Операционные процессы и риски",
    ],
    formTitle: "Заполните форму",
    formSubtitle: "И мгновенно получите PDF-чек-лист на устройство.",
    submitLabel: "Получить файл",
    fileUrl: "/files/antikrizisnye-mery-2026.pdf",
    successTitle: "Файл скачивается!",
    successDescription: "Если загрузка не началась — скачайте вручную.",
  },
  process: {
    eyebrow: "Этапы работы",
    title: "Как проходит работа с бизнесом",
    description:
      "От быстрой диагностики до внедрения антикризисного плана и контроля результата.",
    steps: [
      {
        title: "Экспресс-диагностика бизнеса",
        text: "Разбираем финансы, команду, продажи, процессы и текущие риски. Определяем, где компания теряет деньги.",
        result: "Вы получаете карту проблем и точек роста.",
      },
      {
        title: "Анализ команды и управления",
        text: "Проверяем, как решения собственника, руководителей и сотрудников влияют на кризис.",
        result: "Становится понятно, где бизнес тормозит человеческий фактор.",
      },
      {
        title: "Финансовая и операционная картина 360°",
        text: "Смотрим не только внутрь компании, но и на рынок, конкурентов, поставщиков и внешние угрозы.",
        result: "Вы видите полную картину, а не отдельные симптомы.",
      },
      {
        title: "План выхода из кризиса",
        text: "Формируем конкретный список действий: что делать сейчас, что отложить, что остановить, что усилить.",
        result: "У вас появляется roadmap с приоритетами и сроками.",
      },
      {
        title: "Внедрение решений",
        text: "Помогаем последовательно внедрять изменения: финансы, команда, продажи, процессы.",
        result: "План превращается в реальные управленческие действия.",
      },
      {
        title: "Контроль результата и корректировка",
        text: "Регулярно отслеживаем показатели, корректируем действия и доводим бизнес до устойчивой модели.",
        result: "Компания выходит из хаоса в управляемую систему.",
      },
    ],
    ctaTitle: "Готовы начать с экспресс-диагностики?",
    ctaSubtitle: "Это бесплатно. Разберём вашу ситуацию за 1 день.",
  },
  tools: {
    eyebrow: "Инструменты",
    title: "Инструменты, которые я использую",
    items: [
      { title: "Финансовая диагностика", text: "Находим, где бизнес теряет деньги: кассовые разрывы, лишние расходы, слабая маржинальность, неэффективная структура затрат." },
      { title: "Аудит команды и управления", text: "Определяем, кто и какие решения тормозят бизнес: собственник, руководители, сотрудники, конфликты или отсутствие ответственности." },
      { title: "Анализ продаж и маркетинга", text: "Проверяем, почему падают заявки, средний чек, повторные продажи и конверсия." },
      { title: "Оценка бизнес-процессов", text: "Находим хаос в операционке: дублирование функций, слабый контроль, неработающие регламенты, потерю времени и денег." },
      { title: "Карта рисков 360°", text: "Оцениваем внутренние и внешние угрозы: рынок, конкурентов, поставщиков, долги, персонал, управленческие ошибки." },
      { title: "Roadmap выхода из кризиса", text: "Формируем пошаговый план действий с приоритетами, сроками и зонами ответственности." },
    ],
  },
  cases: {
    eyebrow: "Кейсы",
    title: "С какими ситуациями я работаю",
    description: "Типовые сценарии из практики. Если узнаёте свою ситуацию — давайте разберём детально.",
    items: [
      {
        title: "Падение прибыли при сохранении выручки",
        problem: "Компания продавала на прежнем уровне, но прибыль снижалась.",
        cause: "Рост расходов, слабый контроль маржинальности, неэффективная структура затрат.",
        solution: "Финансовая диагностика, пересборка расходов, контроль ключевых показателей.",
        result: "Собственник получил прозрачную картину и план восстановления прибыли.",
        ctaLabel: "Разобрать мою ситуацию",
        ctaHref: "#contacts",
      },
      {
        title: "Кассовые разрывы и долги",
        problem: "Бизнес работал, но регулярно не хватало денег на обязательства.",
        cause: "Ошибки в планировании ДДС, неуправляемые расходы, слабый контроль платежей.",
        solution: "Финансовая модель, приоритизация платежей, план стабилизации cash flow.",
        result: "Компания получила систему контроля денежных потоков.",
        ctaLabel: "Разобрать мою ситуацию",
        ctaHref: "#contacts",
      },
      {
        title: "Команда саботирует изменения",
        problem: "Решения собственника не внедрялись, сотрудники работали по-старому.",
        cause: "Размытая ответственность, конфликт интересов, отсутствие управленческого контроля.",
        solution: "Аудит команды, перераспределение ответственности, корректировка структуры.",
        result: "Изменения начали внедряться, управляемость компании выросла.",
        ctaLabel: "Разобрать мою ситуацию",
        ctaHref: "#contacts",
      },
    ],
  },
  packages: {
    eyebrow: "Пакеты",
    title: "Пакеты услуг",
    description:
      "После бесплатной диагностики мы определяем оптимальный формат работы: от разового разбора до полного антикризисного сопровождения.",
    items: [
      {
        name: "Базовый пакет",
        sub: "Антикризисная диагностика",
        items: [
          "анализ текущей ситуации",
          "разбор финансов, команды и процессов",
          "выявление ключевых проблем",
          "приоритетный список действий",
        ],
        result: "Вы понимаете, где бизнес теряет деньги и какие меры нужно принять в первую очередь.",
        cta: "Оставить заявку",
        ctaHref: "#contacts",
        featured: false,
      },
      {
        name: "Стандартный пакет",
        sub: "План выхода из кризиса",
        items: [
          "глубокая диагностика бизнеса",
          "анализ финансовой модели",
          "разбор команды и управленческой структуры",
          "разработка антикризисного roadmap",
          "план внедрения с приоритетами и сроками",
        ],
        result: "Вы получаете конкретную стратегию выхода из кризиса и понятный порядок действий.",
        cta: "Обсудить формат работы",
        ctaHref: "#contacts",
        featured: true,
      },
      {
        name: "Расширенный пакет",
        sub: "Антикризисное сопровождение",
        items: [
          "полная диагностика бизнеса",
          "разработка плана выхода из кризиса",
          "сопровождение внедрения решений",
          "контроль финансовых и управленческих показателей",
          "регулярная корректировка действий",
        ],
        result: "Бизнес получает не только план, но и сопровождение до стабилизации ситуации.",
        cta: "Записаться на консультацию",
        ctaHref: "#contacts",
        featured: false,
      },
    ],
  },
  contact: {
    eyebrow: "Контакты",
    title: "Запишитесь на бесплатную диагностику бизнеса",
    description:
      "Разберём вашу ситуацию, определим ключевые проблемы и покажем, какие действия можно предпринять уже в ближайшие недели.",
    phoneLabel: "Телефон",
    phone: "+7 926 988 21 99",
    phoneHref: "tel:+79269882199",
    emailLabel: "Email",
    email: "viktor@semenduev.pro",
    emailHref: "mailto:viktor@semenduev.pro",
    badges: [
      "Ответ в течение рабочего дня",
      "Экспресс-разбор за 1 день",
      "Конфиденциально",
    ],
    formTitle: "Заявка на диагностику",
    formSubtitle: "Заполните форму — отвечу лично.",
    nameLabel: "Имя",
    phoneFieldLabel: "Телефон",
    messageLabel: "Кратко о ситуации",
    submitLabel: "Получить бесплатную диагностику",
    successTitle: "Заявка отправлена",
    successDescription: "Свяжусь с вами в течение рабочего дня.",
  },
  footer: {
    logo: logoImg,
    brand: "",
    copyright: "© {year} Виктор Семендуев · Антикризисное управление",
    phone: "+7 926 988 21 99",
    phoneHref: "tel:+79269882199",
    email: "viktor@semenduev.pro",
    emailHref: "mailto:viktor@semenduev.pro",
  },
};

export type SectionKey = keyof SiteContent;
