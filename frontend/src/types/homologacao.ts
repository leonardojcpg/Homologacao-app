export type StatusHomologacao = "Em andamento" | "Aguardando aceite" | "Aprovada" | "Bloqueada" 

export type TipoIntegracao = "PDV"| "E-commerce"

export interface Homologacao {
    id: number
    cliente: string
    integracao: TipoIntegracao
    responsavel: string
    progresso: number
    status: StatusHomologacao
}