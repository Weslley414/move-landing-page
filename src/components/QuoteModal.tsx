import { useState } from "react";
import { calculatePrice } from "@/lib/calculatePrice";
import { getCoordinatesFromCep } from "@/lib/getCoordinatesFromCep";
import { calcDistanceKm } from "@/lib/calcDistanceKm";
import { X, CheckCircle, MapPin } from "lucide-react";



interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

const totalSteps = 5;

const stepLabels = [
  "Informações iniciais",
  "Detalhes da mudança",
  "Endereço",
  "Revisão",
  "Confirmação",
];

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  dataDesejada: string;
  tipoMudanca: string;
  descricao: string;
  enderecoOrigem: string;
  enderecoDestino: string;
  cidadeOrigem: string;
  cidadeDestino: string;
  cepOrigem: string;
  cepDestino: string;
}

const QuoteModal = ({ open, onClose }: QuoteModalProps) => {
  const [step, setStep] = useState(1);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    dataDesejada: "",
    tipoMudanca: "",
    descricao: "",
    enderecoOrigem: "",
    enderecoDestino: "",
    cidadeOrigem: "",
    cidadeDestino: "",
    cepOrigem: "",
    cepDestino: "",
  });

  const update = (field: keyof FormData, value: string) => {
    setFormData((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (!formData.nome.trim()) e.nome = "Obrigatório";
      if (!formData.email.trim()) e.email = "Obrigatório";
      if (!formData.telefone.trim()) e.telefone = "Obrigatório";
    } else if (step === 2) {
      if (!formData.dataDesejada) e.dataDesejada = "Obrigatório";
      if (!formData.tipoMudanca) e.tipoMudanca = "Obrigatório";
    } else if (step === 3) {
      if (!formData.enderecoOrigem.trim()) {
        e.enderecoOrigem = "Obrigatório";
      }

      if (!formData.enderecoDestino.trim()) {
        e.enderecoDestino = "Obrigatório";
      }

      if (formData.cepOrigem.length !== 8) {
        e.cepOrigem = "CEP inválido";
      }

      if (formData.cepDestino.length !== 8) {
        e.cepDestino = "CEP inválido";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = async () => {
    if (validate()) {
      if (step === 3) {
        const origem = await getCoordinatesFromCep(formData.cepOrigem);
        const destino = await getCoordinatesFromCep(formData.cepDestino);

        const distanceKm = calcDistanceKm(
          origem.lat,
          origem.lon,
          destino.lat,
          destino.lon,
        );

        const price = calculatePrice({
          distanceKm,
          propertyType:
            formData.tipoMudanca === "comercial" ? "casa" : "apartamento",
          items: formData.descricao.length > 80 ? "muitos" : "medios",
          helpers: true,
        });

        setEstimatedPrice(price);
      }

      if (step === 4) {
        setStep(5);
        return;
      }

      setStep((s) => s + 1);
    }
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  const reset = () => {
    setStep(1);
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      dataDesejada: "",
      tipoMudanca: "",
      descricao: "",
      enderecoOrigem: "",
      enderecoDestino: "",
      cidadeOrigem: "",
      cidadeDestino: "",
      cepOrigem: "",
      cepDestino: "",
    });
    setErrors({});
    setEstimatedPrice(null);
    onClose();
  };

  if (!open) return null;

  const inputClass = (field: string) =>
    `w-full border rounded-md px-3 py-2.5 text-sm bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/50 ${errors[field] ? "border-destructive" : "border-border"}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4">
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Vamos começar?</h2>
          <button
            onClick={reset}
            className="text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4">
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${i < step ? "bg-primary" : "bg-border"}`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Etapa {step} de {totalSteps}: {stepLabels[step - 1]}
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Nome completo *
                </label>
                <input
                  value={formData.nome}
                  onChange={(e) => update("nome", e.target.value)}
                  className={inputClass("nome")}
                  placeholder="Seu nome"
                />
                {errors.nome && (
                  <p className="text-destructive text-xs mt-1">{errors.nome}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  E-mail *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass("email")}
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Telefone *
                </label>
                <input
                  value={formData.telefone}
                  onChange={(e) => update("telefone", e.target.value)}
                  className={inputClass("telefone")}
                  placeholder="(xx) xxxxx-xxxx"
                />
                {errors.telefone && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.telefone}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Data desejada *
                </label>
                <input
                  type="date"
                  value={formData.dataDesejada}
                  onChange={(e) => update("dataDesejada", e.target.value)}
                  className={inputClass("dataDesejada")}
                />
                {errors.dataDesejada && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.dataDesejada}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Tipo de mudança *
                </label>
                <select
                  value={formData.tipoMudanca}
                  onChange={(e) => update("tipoMudanca", e.target.value)}
                  className={inputClass("tipoMudanca")}
                >
                  <option value="">Selecione</option>
                  <option value="residencial">Residencial</option>
                  <option value="comercial">Comercial</option>
                  <option value="escritorio">Escritório</option>
                </select>
                {errors.tipoMudanca && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.tipoMudanca}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Descrição adicional
                </label>
                <textarea
                  rows={3}
                  value={formData.descricao}
                  onChange={(e) => update("descricao", e.target.value)}
                  className={inputClass("descricao")}
                  placeholder="Detalhes sobre a mudança..."
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Endereço de origem *
                </label>
                <input
                  value={formData.enderecoOrigem}
                  onChange={(e) => update("enderecoOrigem", e.target.value)}
                  className={inputClass("enderecoOrigem")}
                  placeholder="Rua, número, bairro"
                />
                {errors.enderecoOrigem && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.enderecoOrigem}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Cidade de origem
                </label>
                <input
                  value={formData.cidadeOrigem}
                  onChange={(e) => update("cidadeOrigem", e.target.value)}
                  className={inputClass("cidadeOrigem")}
                  placeholder="Cidade"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Endereço de destino *
                </label>
                <input
                  value={formData.enderecoDestino}
                  onChange={(e) => update("enderecoDestino", e.target.value)}
                  className={inputClass("enderecoDestino")}
                  placeholder="Rua, número, bairro"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* CEP ORIGEM */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                      <MapPin size={14} className="text-primary" />
                      CEP de origem
                    </label>

                    <input
                      type="text"
                      value={formData.cepOrigem}
                      onChange={(e) =>
                        update(
                          "cepOrigem",
                          e.target.value.replace(/\D/g, "").slice(0, 8),
                        )
                      }
                      placeholder="00000-000"
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.cepOrigem && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.cepOrigem}
                      </p>
                    )}
                  </div>

                  {/* CEP DESTINO */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                      <MapPin size={14} className="text-primary" />
                      CEP de destino
                    </label>

                    <input
                      type="text"
                      value={formData.cepDestino}
                      onChange={(e) =>
                        update(
                          "cepDestino",
                          e.target.value.replace(/\D/g, "").slice(0, 8),
                        )
                      }
                      placeholder="00000-000"
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.cepDestino && (
                      <p className="text-destructive text-xs mt-1">
                        {errors.cepDestino}
                      </p>
                    )}
                  </div>
                </div>
                {errors.enderecoDestino && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.enderecoDestino}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Cidade de destino
                </label>
                <input
                  value={formData.cidadeDestino}
                  onChange={(e) => update("cidadeDestino", e.target.value)}
                  className={inputClass("cidadeDestino")}
                  placeholder="Cidade"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground mb-2">
                Revise seus dados
              </h3>

              <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
                <p>
                  <span className="font-medium text-foreground">Nome:</span>{" "}
                  <span className="text-muted-foreground">{formData.nome}</span>
                </p>
                <p>
                  <span className="font-medium text-foreground">E-mail:</span>{" "}
                  <span className="text-muted-foreground">
                    {formData.email}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-foreground">Telefone:</span>{" "}
                  <span className="text-muted-foreground">
                    {formData.telefone}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-foreground">Data:</span>{" "}
                  <span className="text-muted-foreground">
                    {formData.dataDesejada}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-foreground">Tipo:</span>{" "}
                  <span className="text-muted-foreground">
                    {formData.tipoMudanca}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-foreground">Origem:</span>{" "}
                  <span className="text-muted-foreground">
                    {formData.enderecoOrigem}, {formData.cidadeOrigem}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-foreground">Destino:</span>{" "}
                  <span className="text-muted-foreground">
                    {formData.enderecoDestino}, {formData.cidadeDestino}
                  </span>
                </p>
                {formData.descricao && (
                  <p>
                    <span className="font-medium text-foreground">
                      Descrição:
                    </span>{" "}
                    <span className="text-muted-foreground">
                      {formData.descricao}
                    </span>
                  </p>
                )}
              </div>

              {/* 🔥 AQUI ENTRA O VALOR ESTIMADO */}
              {estimatedPrice && (
                <div className="mt-4 bg-primary/10 border border-primary rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Valor estimado
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    R$ {estimatedPrice.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto text-move-green mb-4" size={64} />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Tudo pronto!
              </h3>
              <p className="text-muted-foreground text-sm">
                Seu orçamento foi enviado e retornaremos por email
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex justify-between gap-3">
          {step < 5 ? (
            <>
              {step > 1 && (
                <button
                  onClick={prev}
                  className="px-6 py-2.5 border border-border rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Voltar
                </button>
              )}
              <button
                onClick={next}
                className="ml-auto px-6 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                {step === 4 ? "Confirmar" : "Continuar"}
              </button>
            </>
          ) : (
            <button
              onClick={reset}
              className="mx-auto px-8 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Voltar para início
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
