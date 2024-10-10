import { Octokit } from "@octokit/rest";
import axios from "axios";

// Configurações do Octokit
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Configurações da organização
const org = process.env.ORG_NAME; // Nome da organização
const excludedUsers = ['danilocbueno', 'rafalmeida-ifsp']; // Usuários a serem excluídos
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL; // URL do webhook do Discord

async function generateOrganizationReport() {
  const { data: repos } = await octokit.repos.listForOrg({
    org,
    type: 'all', // Pode ser 'public', 'private', etc.
  });

  let report = `# 🚀 Relatório de Performance e Issues Abertas por Repositório da Organização ${org}\n\n`;

  for (const repo of repos) {
    const issuesResponse = await octokit.issues.listForRepo({
      owner: org,
      repo: repo.name,
      state: 'all',
    });

    const commitsResponse = await octokit.repos.listCommits({
      owner: org,
      repo: repo.name,
      per_page: 2,
    });

    const issues = issuesResponse.data;
    const commits = commitsResponse.data;

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
            completedLastWeek: 0,
            totalCompleted: 0,
            openIssues: []
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
          performanceByAssignee[assignee].openIssues.push(issue);
        }
      });
    });

    report += `## 🚀 Report\n\n`;

    for (const [assignee, data] of Object.entries(performanceByAssignee)) {
      report += `### 👤 **${assignee}**\n\n`;
      
      report += `#### 📌 Issues Abertas:\n`;
      if (data.openIssues.length > 0) {
        data.openIssues.forEach(issue => {
          report += `- [${issue.title}](https://github.com/${org}/${repo.name}/issues/${issue.number}) (#${issue.number})\n`;
        });
      } else {
        report += `- Nenhuma issue aberta.\n`;
      }
      
      report += `\n#### 🔄 Status:\n`;
      report += `- **${data.completedLastWeek}** issues fechadas na última semana\n`;
      report += `- **${data.totalCompleted}** total de issues fechadas\n`;

      // Adicionando os últimos dois commits
      const userCommits = commits.filter(commit => commit.committer && commit.committer.login === assignee);
      if (userCommits.length > 0) {
        userCommits.forEach(commit => {
          report += `- [${commit.commit.message}](https://github.com/${org}/${repo.name}/commit/${commit.sha}) - ${new Date(commit.commit.author.date).toLocaleDateString()}\n`;
        });
      } else {
        report += `- Nenhum commit encontrado.\n`;
      }

      report += `\n---\n`; // Linha horizontal para separar assignees
    }
  }

  // Enviar o relatório para o Discord
  await sendReportToDiscord(report);
}

async function sendReportToDiscord(report) {
  await axios.post(discordWebhookUrl, {
    content: report,
  });
}

generateOrganizationReport().catch(console.error);
