
import { useState } from "react";
import "./App.css";

type Status =
  | "Em andamento"
  | "Aguardando aceite"
  | "Aprovada"
  | "Bloqueada";

type Homologacao = {
  id: number;
  cliente: string;
  integracao: "PDV" | "E-commerce";
  responsavel: string;
  progresso: number;
  status: Status;
};

const homologacoes: Homologacao[] = [
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

const menu = [
  { label: "Visão geral", icon: "▦" },
  { label: "Homologações", icon: "▤" },
  { label: "Modelos de checklist", icon: "☷" },
  { label: "Relatórios", icon: "▧" },
];

function App() {
  const [pagina, setPagina] = useState("Visão geral");
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  const filtradas = homologacoes.filter((item) => {
    const correspondeBusca =
      item.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      item.integracao.toLowerCase().includes(busca.toLowerCase());

    const correspondeFiltro =
      filtro === "Todos" || item.status === filtro;

    return correspondeBusca && correspondeFiltro;
  });

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">H</div>
          <div>
            <strong>Homologação</strong>
            <span>Qualidade na integração</span>
          </div>
        </div>

        <div className="menu-label">MENU PRINCIPAL</div>

        <nav className="navigation">
          {menu.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${
                pagina === item.label ? "active" : ""
              }`}
              onClick={() => setPagina(item.label)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">?</div>
            <strong>Precisa de ajuda?</strong>
            <p>Acompanhe o processo de homologação das integrações.</p>
          </div>

          <div className="user-profile">
            <div className="avatar">IN</div>
            <div className="user-info">
              <strong>Integrador</strong>
              <span>Equipe técnica</span>
            </div>
            <span className="user-menu">•••</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace <span>/</span> {pagina}
          </div>

          <div className="topbar-actions">
            <span className="environment">
              <span className="environment-dot" />
              Ambiente local
            </span>
            <button className="notification-button" aria-label="Notificações">
              ♧
            </button>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-section">
            <div>
              <div className="eyebrow">CENTRAL DE HOMOLOGAÇÕES</div>
              <h1>{pagina}</h1>
              <p>
                Gerencie os testes, as evidências e as aprovações
                das suas integrações antes do Go-Live.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => setPagina("Nova homologação")}
            >
              <span className="plus-icon">+</span>
              Nova homologação
            </button>
          </section>

          {pagina === "Nova homologação" ? (
            <section className="panel new-homologation">
              <div className="panel-heading">
                <div>
                  <h2>Nova homologação</h2>
                  <p>
                    Esta tela é uma prévia visual. Ainda não salva dados.
                  </p>
                </div>
              </div>

              <label htmlFor="cliente">Nome do cliente</label>
              <input
                id="cliente"
                placeholder="Digite o nome do cliente"
              />

              <label htmlFor="integracao">Tipo de integração</label>
              <select id="integracao" defaultValue="PDV">
                <option value="PDV">PDV</option>
                <option value="E-commerce">E-commerce</option>
              </select>

              <div className="form-actions">
                <button
                  className="secondary-button"
                  onClick={() => setPagina("Visão geral")}
                >
                  Voltar
                </button>
                <button
                  className="primary-button"
                  onClick={() =>
                    alert("Vamos implementar o cadastro após definirmos os campos.")
                  }
                >
                  Continuar
                </button>
              </div>
            </section>
          ) : (
            <>
              <section className="stats-grid">
                <StatCard
                  label="Em homologação"
                  value="04"
                  description="Testes em andamento"
                  icon="◷"
                  color="blue"
                />
                <StatCard
                  label="Aguardando aprovação"
                  value="02"
                  description="Pendências de aceite"
                  icon="◎"
                  color="orange"
                />
                <StatCard
                  label="Aprovadas"
                  value="12"
                  description="Homologações concluídas"
                  icon="✓"
                  color="green"
                />
                <StatCard
                  label="Com bloqueios"
                  value="01"
                  description="Requer atenção"
                  icon="!"
                  color="red"
                />
              </section>

              <section className="panel">
                <div className="panel-heading">
                  <div>
                    <h2>Homologações recentes</h2>
                    <p>
                      Acompanhe o andamento das integrações dos clientes.
                    </p>
                  </div>

                  <button
                    className="secondary-button"
                    onClick={() => setPagina("Homologações")}
                  >
                    Ver todas
                    <span>→</span>
                  </button>
                </div>

                <div className="table-toolbar">
                  <div className="search-box">
                    <span>⌕</span>
                    <input
                      value={busca}
                      onChange={(event) => setBusca(event.target.value)}
                      placeholder="Buscar cliente ou integração..."
                    />
                  </div>

                  <select
                    className="filter-select"
                    value={filtro}
                    onChange={(event) => setFiltro(event.target.value)}
                    aria-label="Filtrar por status"
                  >
                    <option>Todos</option>
                    <option>Em andamento</option>
                    <option>Aguardando aceite</option>
                    <option>Aprovada</option>
                    <option>Bloqueada</option>
                  </select>
                </div>

                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>CLIENTE</th>
                        <th>INTEGRAÇÃO</th>
                        <th>PROGRESSO</th>
                        <th>STATUS</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtradas.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="client-cell">
                              <div className="client-avatar">
                                {item.cliente.charAt(0)}
                              </div>
                              <div>
                                <strong>{item.cliente}</strong>
                                <span>{item.responsavel}</span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <span className="integration-tag">
                              {item.integracao}
                            </span>
                          </td>

                          <td>
                            <div className="progress-cell">
                              <div className="progress-track">
                                <div
                                  className="progress-value"
                                  style={{ width: `${item.progresso}%` }}
                                />
                              </div>
                              <span>{item.progresso}%</span>
                            </div>
                          </td>

                          <td>
                            <StatusBadge status={item.status} />
                          </td>

                          <td>
                            <button
                              className="more-button"
                              aria-label={`Ver ${item.cliente}`}
                              onClick={() =>
                                alert(
                                  `A tela de detalhes de ${item.cliente} será implementada em seguida.`
                                )
                              }
                            >
                              ⋯
                            </button>
                          </td>
                        </tr>
                      ))}

                      {filtradas.length === 0 && (
                        <tr>
                          <td colSpan={5} className="empty-state">
                            Nenhuma homologação encontrada.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="table-footer">
                  Exibindo {filtradas.length} de {homologacoes.length} registros
                  <span>Dados demonstrativos</span>
                </div>
              </section>

              <div className="page-note">
                <span>ⓘ</span>
                Os indicadores e registros são fictícios nesta etapa
                de desenvolvimento.
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  description,
  icon,
  color,
}: {
  label: string;
  value: string;
  description: string;
  icon: string;
  color: string;
}) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <div className={`stat-icon ${color}`}>{icon}</div>
      </div>
      <strong className="stat-value">{value}</strong>
      <span className="stat-description">{description}</span>
    </article>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const classes: Record<Status, string> = {
    "Em andamento": "status-blue",
    "Aguardando aceite": "status-orange",
    Aprovada: "status-green",
    Bloqueada: "status-red",
  };

  return (
    <span className={`status-badge ${classes[status]}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}

export default App;
