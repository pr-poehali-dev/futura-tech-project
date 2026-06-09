import { useState } from "react";
import { ArtDecoSunburst } from "@/components/ArtDecoSunburst";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const sectors = [
  "Стратегия",
  "Продукт",
  "Клиенты",
  "Продажи",
  "Маркетинг",
  "Финансы",
  "Команда",
  "Процессы",
  "Управление",
  "Партнёры",
  "Риски",
  "Энергия собственника",
];

const painPoints = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    text: "Бизнес буксует, но непонятно где",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path d="M12 7V4M8 7V5M16 7V5" />
      </svg>
    ),
    text: "Собственник устал всё держать на себе",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    text: "Команда спорит о симптомах, но не видит причины",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M12 2v20M2 12h20" />
        <path d="M17 7l-5-5-5 5M7 17l5 5 5-5" />
      </svg>
    ),
    text: "Деньги уходят в невидимые потери",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    text: "Перед ростом или перезапуском нужна честная диагностика",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M4 6h16M4 12h16M4 18h7" />
        <path d="M15 15l6 6M21 15l-6 6" />
      </svg>
    ),
    text: "Нет системы — есть только хаос и реакция",
  },
];

const results = [
  "Карта сильных и слабых зон бизнеса",
  "Понимание главных точек потерь",
  "Гипотезы роста",
  "Список первых действий",
  "Общий язык для собственника и команды",
  "Основа для стратегической сессии",
];

const steps = [
  { num: "01", title: "Предварительный запрос", desc: "Короткая анкета — понимаем контекст и запрос бизнеса" },
  { num: "02", title: "Диагностическая игра", desc: "Участники проходят структурированную игровую сессию" },
  { num: "03", title: "Работа с 12 секторами", desc: "Исследуем каждую ключевую зону бизнеса через точные вопросы" },
  { num: "04", title: "Выявление точек потерь и роста", desc: "Видим, где бизнес теряет, а где скрыт потенциал" },
  { num: "05", title: "Итоговая карта и первые шаги", desc: "Получаете наглядный результат и план действий" },
];

function CTAFormFull() {
  const [form, setForm] = useState({ name: "", company: "", contact: "", question: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact) return;
    setLoading(true);
    try {
      await fetch("https://functions.poehali.dev/d2a0c8fd-11a3-47d9-97ff-36a3607caec8", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="font-serif text-2xl text-primary mb-2">Заявка принята</p>
        <p className="text-muted-foreground">Александра свяжется с вами в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          placeholder="Ваше имя"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
        />
        <Input
          placeholder="Компания"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
        />
      </div>
      <Input
        placeholder="Телефон или Telegram"
        value={form.contact}
        onChange={(e) => setForm({ ...form, contact: e.target.value })}
        required
        className="bg-card border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
      />
      <textarea
        placeholder="Что сейчас важно понять в вашем бизнесе?"
        value={form.question}
        onChange={(e) => setForm({ ...form, question: e.target.value })}
        rows={3}
        className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
      />
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wider uppercase text-sm py-6 transition-all duration-300 disabled:opacity-60"
      >
        {loading ? "Отправляем..." : "Записаться на диагностику"}
      </Button>
    </form>
  );
}

function RadarCircle() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto aspect-square flex items-center justify-center">
      <div className="radar-ring absolute inset-0 rounded-full border border-primary/20" />
      <div className="radar-ring absolute inset-[10%] rounded-full border border-primary/25" style={{ animationDelay: "0.5s" }} />
      <div className="radar-ring absolute inset-[20%] rounded-full border border-primary/30" style={{ animationDelay: "1s" }} />
      <div className="absolute inset-[30%] rounded-full border border-primary/40" />

      <div className="absolute inset-0">
        {sectors.map((sector, i) => {
          const angle = (i * 360) / sectors.length - 90;
          const rad = (angle * Math.PI) / 180;
          const r = 44;
          const x = 50 + r * Math.cos(rad);
          const y = 50 + r * Math.sin(rad);
          return (
            <div
              key={sector}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div className="flex flex-col items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[9px] sm:text-[10px] text-muted-foreground text-center whitespace-nowrap leading-tight max-w-[64px] sm:max-w-none">
                  {sector}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 text-center px-4">
        <p className="text-primary tracking-[0.15em] uppercase text-xs mb-1">12 секторов</p>
        <p className="font-serif text-lg text-foreground leading-tight">Радар<br />бизнеса</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="min-h-screen bg-background dark">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <ArtDecoSunburst />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-px bg-primary" />
              <div className="w-3 h-3 rotate-45 border border-primary" />
              <div className="w-16 h-px bg-primary" />
            </div>
          </div>

          <p className="text-primary tracking-[0.3em] uppercase text-xs sm:text-sm mb-6">
            Диагностическая бизнес-игра
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-tight">
            Радар бизнеса
          </h1>
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-white/80 tracking-widest uppercase mb-6">
            Точка боли
          </p>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
            Диагностика, которая показывает, где бизнес теряет деньги, энергию и скорость
          </p>
          <p className="text-base sm:text-lg text-muted-foreground/75 max-w-xl mx-auto leading-relaxed mb-12">
            Игровая сессия для собственников и команд, которая помогает увидеть скрытые зоны потерь, сильные стороны и первые шаги к росту
          </p>

          <a href="#form">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wider uppercase text-sm px-10 py-6 transition-all duration-300">
              Записаться на диагностику
            </Button>
          </a>

          <div className="flex justify-center mt-12">
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-primary to-primary" />
              <div className="w-2 h-2 rotate-45 bg-primary" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── БОЛИ ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ArtDecoDivider variant="stepped" />

          <div className="text-center mb-16">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Узнаёте себя?</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-balance">
              Когда нужен Радар бизнеса
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((item, i) => (
              <div key={i} className="group relative p-6 bg-card border border-border hover:border-primary transition-all duration-500">
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary" />
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <p className="text-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ЧТО ЭТО ── */}
      <section className="py-24 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">О продукте</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight text-balance">
                Что такое «Радар бизнеса»?
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                «Радар бизнеса» — это диагностическая бизнес-игра, где участники исследуют ключевые зоны бизнеса, отвечают на точные вопросы и собирают карту текущего состояния.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Игра снижает сопротивление, помогает говорить честно, вытаскивает скрытые противоречия и показывает систему целиком. Участники не просто слушают эксперта — они сами видят взаимосвязи.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-px bg-primary" />
                <span className="text-primary text-sm tracking-widest uppercase">Навигация по бизнесу</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12 СЕКТОРОВ ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ArtDecoDivider variant="fan" />

          <div className="text-center mb-16">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Диагностика</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-balance">
              12 секторов диагностики
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Полная карта вашего бизнеса — от стратегии до энергии собственника
            </p>
          </div>

          <RadarCircle />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-12">
            {sectors.map((s, i) => (
              <div key={s} className="flex items-center gap-3 p-3 bg-card border border-border rounded">
                <span className="text-primary font-mono text-xs opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground text-sm">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ЧТО ПОЛУЧИТЕ ── */}
      <section className="py-24 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Результаты</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-balance">
              Что вы получите
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((r, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-card border border-border">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-primary text-primary font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-foreground leading-relaxed pt-1">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ФОРМАТЫ ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ArtDecoDivider variant="chevron" />

          <div className="text-center mb-16">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Форматы работы</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-balance">
              Форматы
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              title="Индивидуальная диагностика"
              description="Сессия для собственника — честный взгляд на весь бизнес глазами эксперта и через собственный опыт."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                </svg>
              }
            />
            <ServiceCard
              title="Командная бизнес-игра"
              description="Совместная диагностика для команды — создаёт общий язык, выявляет противоречия и объединяет вокруг картины."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              }
            />
            <ServiceCard
              title="Корпоративная сессия"
              description="Глубокий формат с итоговым отчётом — для компаний, которые хотят взять системный результат и конкретный план."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                  <path d="M7 8h4M7 11h10M7 14h6" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* ── КАК ПРОХОДИТ ── */}
      <section className="py-24 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Процесс</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground text-balance">
              Как проходит сессия
            </h2>
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="relative flex gap-6 items-start group">
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center border border-primary text-primary font-mono text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {step.num}
                </div>
                <div className="flex-1 pt-3 border-b border-border pb-6">
                  <h3 className="font-serif text-xl text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="absolute left-7 top-14 w-px h-6 bg-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ОБ АВТОРЕ ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ArtDecoDivider variant="stepped" />

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Автор</p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6 leading-tight">
                Александра Слепцова
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                Предприниматель, психолог, бизнес-коуч, игропрактик и разработчик трансформационных игр.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                В работе соединяет системный анализ, психологию, коучинг, финансы, предпринимательский опыт и игровые механики. Помогает собственникам увидеть бизнес целиком — и найти путь туда, где хочется быть.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Предприниматель", "Психолог", "Бизнес-коуч", "Игропрактик"].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 border border-primary/40 text-primary text-sm tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-primary" />
                <div className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-primary" />
                <div className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-primary" />
                <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-primary" />
                <div className="w-full h-full bg-card border border-border flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-10 h-10 text-primary">
                        <circle cx="12" cy="8" r="5" />
                        <path d="M3 21v-2a9 9 0 0118 0v2" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground text-sm">Место для вашего фото</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ФОРМА ЗАЯВКИ ── */}
      <section id="form" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <ArtDecoSunburst />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <ArtDecoDivider variant="chevron" />
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Диагностика</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 text-balance">
              Хотите увидеть, что на самом деле<br />происходит в вашем бизнесе?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Оставьте заявку — Александра свяжется с вами и подберёт подходящий формат.
            </p>
          </div>

          <div className="relative p-8 md:p-12 border border-border">
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary" />
            <CTAFormFull />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-primary" />
              <span className="font-serif text-xl text-foreground">Радар бизнеса</span>
              <div className="w-12 h-px bg-primary" />
            </div>
            <p className="text-muted-foreground text-sm text-center">
              Диагностическая бизнес-игра · Александра Слепцова
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="https://t.me/yourSleptsova" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                Telegram
              </a>
              <a href="mailto:A.sleptsova@micegroup.ru" className="text-muted-foreground hover:text-primary transition-colors">
                A.sleptsova@micegroup.ru
              </a>
              <a href="https://vk.com/sleptsova_aleksandra" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                ВКонтакте
              </a>
            </div>
            <p className="text-muted-foreground/40 text-xs">© 2025</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;