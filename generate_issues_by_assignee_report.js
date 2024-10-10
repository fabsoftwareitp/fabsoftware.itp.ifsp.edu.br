import { Octokit } from "@octokit/rest";
import axios from "axios";

// Configurações do Octokit
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Configurações do repositório
const owner = process.env.REPO_OWNER; // Nome do usuário ou organização
const repo = process.env.REPO_NAME; // Nome do repositório
const excludedUsers = ['danilocbueno', 'rafalmeida-ifsp']; // Usuários a serem excluídos
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL; // URL do webhook do Discord

async function generateIssuesReport() {
  const { data: issues } = await octokit.issues.listForRepo({
    owner,
    repo,
    state: "all",
  });

  const { data: commits } = await octokit.repos.listCommits({
    owner,
    repo,
    per_page: 2,
  });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Data de uma semana atrás

  // Estruturas para dados por assignee
  const performanceByAssignee = {};

  issues.forEach(issue => {
    const assignees = issue.assignees.map(a => a.login); // Lista de assignees

    assignees.forEach(assignee => {
      if (excludedUsers.includes(assignee)) return; // Exclui usuários específicos

      // Inicializa dados para assignee
      if (!performanceByAssignee[assignee]) {
        performanceByAssignee[assignee] = {
          completedLastWeek: 0, // Contador de issues fechadas na última semana
          totalCompleted: 0, // Contador total de issues fechadas
          openIssues: [] // Lista de issues abertas
        };
      }

      // Conta apenas issues fechadas
      if (issue.state === 'closed') {
        performanceByAssignee[assignee].totalCompleted += 1;

        // Conta apenas issues fechadas na última semana
        if (new Date(issue.closed_at) >= oneWeekAgo) {
          performanceByAssignee[assignee].completedLastWeek += 1;
        }
      }

      // Armazena issues abertas por assignee
      if (issue.state !== 'closed') {
        performanceByAssignee[assignee].openIssues.push(issue); // Adiciona issue aberta
      }
    });
  });

  // Criação do conteúdo do relatório
  let report = `# 🚀 Relatório de Performance e Issues Abertas por Assignee\n\n`;

  for (const [assignee, data] of Object.entries(performanceByAssignee)) {
    report += `## 👤 **${assignee}**\n\n`;
    
    report += `### 📌 Issues Abertas:\n`;
    if (data.openIssues.length > 0) {
      data.openIssues.forEach(issue => {
        report += `- [${issue.title}](https://github.com/${owner}/${repo}/issues/${issue.number}) (#${issue.number})\n`;
      });
    } else {
      report += `- Nenhuma issue aberta.\n`;
    }
    
    report += `\n### 🎯 Desempenho de Fechamento:\n`;
    report += `- **${data.completedLastWeek}** issues fechadas na última semana\n`;
    report += `- **${data.totalCompleted}** total de issues fechadas\n`;

    // Adicionando os últimos dois commits
    report += `\n### 🔄 Últimos Commits:\n`;
    const userCommits = commits.filter(commit => commit.committer.login === assignee);
    if (userCommits.length > 0) {
      userCommits.forEach(commit => {
        report += `- [${commit.commit.message}](https://github.com/${owner}/${repo}/commit/${commit.sha}) - ${new Date(commit.commit.author.date).toLocaleDateString()}\n`;
      });
    } else {
      report += `- Nenhum commit encontrado.\n`;
    }

    report += `\n---\n`; // Linha horizontal para separar assignees
  }

  // Enviar o relatório para o Discord
  await sendReportToDiscord(report);
}

async function sendReportToDiscord(report) {
  await axios.post(discordWebhookUrl, {
    content: report,
  });
}

generateIssuesReport().catch(console.error);
