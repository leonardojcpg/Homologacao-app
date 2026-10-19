
import { apiFetch } from "./api";
import { homologacoesMock } from "../mocks/homologacoes";
import type { Homologacao } from "../types/homologacao";

const USAR_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

export async function listarHomologacoes(): Promise<Homologacao[]> {
  if (USAR_MOCKS) {
    return homologacoesMock;
  }

  // Endpoint proposto; será confirmado com o backend.
  return apiFetch<Homologacao[]>("/homologacoes");
}
