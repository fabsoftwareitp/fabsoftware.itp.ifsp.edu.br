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

async function generateIssuesByAssigneeReport() {
  const { data: issues } = await octokit.issues.listForRepo({
    owner,
    repo,
    state: "all",
  });

  // Agrupar issues por assignee
  const issuesByAssignee = {};

  issues.forEach(issue => {
    const assignee = issue.assignee ? issue.assignee.login : 'Unassigned';

    // Excluir usuários específicos e issues fechadas
    if (!excludedUsers.includes(assignee) && issue.state !== 'closed') {
      if (!issuesByAssignee[assignee]) {
        issuesByAssignee[assignee] = [];
      }
      issuesByAssignee[assignee].push(issue);
    }
  });

  // Criação do conteúdo do relatório
  let report = "# Relatório de Issues por Assignee\n\n";

  for (const [assignee, assigneeIssues] of Object.entries(issuesByAssignee)) {
    report += `## Issues de ${assignee}\n\n`;
    assigneeIssues.forEach(issue => {
      report += `- [${issue.state}] [${issue.title}](https://github.com/${owner}/${repo}/issues/${issue.number}) (#${issue.number})\n`;
    });
    report += "\n";
  }

  // Enviar o relatório para o Discord
  await sendReportToDiscord(report);
}

async function sendReportToDiscord(report) {
  await axios.post(discordWebhookUrl, {
    content: report,
  });
}

generateIssuesByAssigneeReport().catch(console.error);
