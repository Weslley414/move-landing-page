import { useState } from "react";
import {
  Phone,
  Shield,
  DollarSign,
  MapPin,
  Play,
  ChevronRight,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import QuoteModal from "@/components/QuoteModal";
import videoThumb from "@/assets/video-thumb.jpg";

const HeroSection = ({ onQuoteClick }: { onQuoteClick: () => void }) => (
  <section
    className="relative min-h-[90vh] flex items-end pb-24"
    style={{
      backgroundImage: `url(${heroBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Overlays */}
    <div className="absolute inset-0 bg-foreground/50" />
    <div className="absolute inset-0 bg-neutral-900/10" />

    {/* LOGO */}
    <div className="absolute top-6 left-6 z-20">
      <span className="text-5xl font-extrabold text-primary-foreground tracking-tight">
        m<span className="text-primary">o</span>ve
      </span>
    </div>

    {/* Conteúdo */}
    <div className="relative z-10 container mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary-foreground leading-tight max-w-xl mb-4">
        Mudar-se nunca foi tão fácil antes
      </h1>

      <p className="text-primary-foreground/95 max-w-md mb-8 text-base">
        Ajudar você a planejar, reservar toda a sua mudança do conforto da sua
        casa.
      </p>

      <button
        onClick={onQuoteClick}
        className="bg-primary text-primary-foreground px-8 py-3.5 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors"
      >
        Faça um orçamento
      </button>
    </div>

    {/* recorte inferior */}
    <div
      className="absolute bottom-0 left-0 right-0 h-24 bg-background"
      style={{ clipPath: "polygon(100% 0, 0% 100%, 100% 100%)" }}
    />
  </section>
);

const services = [
  {
    icon: Phone,
    title: "Atendimento personalizado",
    description:
      "Reserva simples online, economize tempo e aborrecimento sem visitas domiciliares",
  },
  {
    icon: Shield,
    title: "Trasporte seguro premium",
    description:
      "Oferecemos os melhores seguros do mercado. Cada um de nossos movimentos é coberto por um transporte premium abrangente.",
  },
  {
    icon: DollarSign,
    title: "Totalmente trasparente",
    description:
      "Preços transparentes para todos os serviços. Não precisa ser caro. Nós sabemos.",
  },
];

const ServicesSection = () => (
  <section id="servicos" className="py-24 bg-background">
    <div className="container mx-auto px-6 text-center">
      <p className="text-primary uppercase text-sm font-semibold tracking-widest mb-2">
        Nossos serviço
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-16">
        Serviço personalizados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-card rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border border-border"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <s.icon className="text-primary" size={28} />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-3">
              {s.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const steps = [
  {
    num: 1,
    title: "Insira seus detalhes de movimentação",
    desc: "Adicione os detalhes da mudança e obtenha o preço pela mudança imediatamente.",
    side: "left",
  },
  {
    num: 2,
    title: "Organize tudo em um só lugar",
    desc: "Vamos ajudá-lo a criar uma lista de coisas para mover, vamos dominar isso juntos",
    side: "right",
  },
  {
    num: 3,
    title: "Dia de mudança. Sem pressa.",
    desc: "No grande dia, nossos carregadores chegam e fazem todo o trabalho duro",
    side: "left",
  },
  {
    num: 4,
    title: "Pague somente após a mudança.",
    desc: "Pague somente após nossos funcionários concluírem toda mudança de seus pertences em sua nova casa",
    side: "right",
  },
];

const stepIcons = ["📋", "🏠", "🚚", "✅"];

const HowItWorksSection = ({ onQuoteClick }: { onQuoteClick: () => void }) => (
  <section id="como-funciona" className="py-24 bg-background">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
        Como funciona?
      </h2>
      <div className="w-16 h-0.5 bg-foreground mx-auto mb-4" />
      <p className="text-muted-foreground text-sm mb-16">
        A move simplifica todo o processo de movimentação.
      </p>

      <div className="relative max-w-3xl mx-auto">
        {/* Dotted line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-muted-foreground/30 -translate-x-1/2" />

        <div className="space-y-16 md:space-y-20">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative flex flex-col md:flex-row items-center gap-6 ${step.side === "right" ? "md:flex-row-reverse" : ""}`}
            >
              <div
                className={`flex-1 text-left ${step.side === "right" ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}
              >
                <p className="text-4xl mb-3">{stepIcons[i]}</p>
                <h3 className="font-bold text-foreground mb-2">
                  {step.num}. {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
              <div className="hidden md:flex w-8 h-8 rounded-full bg-primary items-center justify-center z-10 shrink-0">
                <span className="text-primary-foreground text-xs font-bold">
                  {step.num}
                </span>
              </div>
              <div className="flex-1" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onQuoteClick}
        className="mt-16 border-2 border-primary text-primary px-8 py-3 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        Faça um orçamento online
      </button>
    </div>
  </section>
);

const VideoSection = () => {
  const [openVideo, setOpenVideo] = useState(false);
  const youtubeId = "2iynD-E96Xs";
  const videoThumbnail = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <section id="sobre" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* MINIATURA DO VÍDEO */}
          <div className="flex-1 relative">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src={videoThumb}
                alt="Vídeo sobre a Move"
                className="w-full object-cover rounded-lg"
              />
            </div>

            {/* BOTÃO DE PLAY */}
            <button
              onClick={() => setOpenVideo(true)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 bg-primary-foreground/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Play
                  className="text-foreground ml-1"
                  size={24}
                  fill="currentColor"
                />
              </div>
            </button>
          </div>

          {/* TEXTO */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Faça sua mudança com segurança e sem dor de cabeça.
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Com planejamento e uma equipe especializada, sua mudança pode ser
              tranquila, rápida e segura.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
            >
              Veja nossa história <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* MODAL DO YOUTUBE */}
      {openVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          onClick={() => setOpenVideo(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl aspect-video"
          >
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              title="Vídeo sobre a Move"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-2xl"
            />
          </div>

          {/* BOTÃO FECHAR */}
          <button
            onClick={() => setOpenVideo(false)}
            className="absolute top-6 right-6 text-white text-3xl font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
};

const MapSection = () => (
  <section id="contato" className="relative">
    <div className="w-full h-[400px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976!2d-46.6388!3d-23.5489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMyJzU2LjAiUyA0NsKwMzgnMTkuNyJX!5e0!3m2!1spt-BR!2sbr!4v1"
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        title="Localização Move"
      />
    </div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-card rounded-lg shadow-xl px-6 py-4 flex flex-col sm:flex-row items-center gap-4">
      <MapPin className="text-primary shrink-0" size={20} />
      <div className="text-center sm:text-left">
        <p className="font-semibold text-foreground text-sm">
          Move - Centro, n 123
        </p>
        <div className="flex gap-4 text-muted-foreground text-xs mt-1">
          <span>(11) 9 8765-4321</span>
          <span>(11) 9 1234-5678</span>
        </div>
      </div>
    </div>
  </section>
);

const Index = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* <Header onQuoteClick={() => setQuoteOpen(true)} /> */}
      <HeroSection onQuoteClick={() => setQuoteOpen(true)} />
      <ServicesSection />
      <HowItWorksSection onQuoteClick={() => setQuoteOpen(true)} />
      <VideoSection />
      <MapSection />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
};

export default Index;
