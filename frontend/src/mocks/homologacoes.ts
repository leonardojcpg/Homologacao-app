
import type { Homologacao } from "../types/homologacao";

export const homologacoesMock: Homologacao[] = [
  {
    id: 1,
    cliente: "Cliente demonstração A",
    integracao: "PDV",
    responsavel: "Equipe de integrações",
    progresso: 68,
    status: "Em andamento",
  },
  {
    id: 2,
    cliente: "Cliente demonstração B",
    integracao: "E-commerce",
    responsavel: "Equipe de integrações",
    progresso: 100,
    status: "Aguardando aceite",
  },
  {
    id: 3,
    cliente: "Cliente demonstração C",
    integracao: "PDV",
    responsavel: "Equipe de integrações",
    progresso: 35,
    status: "Bloqueada",
  },
  {
    id: 4,
    cliente: "Cliente demonstração D",
    integracao: "E-commerce",
    responsavel: "Equipe de integrações",
    progresso: 100,
    status: "Aprovada",
  },
];
