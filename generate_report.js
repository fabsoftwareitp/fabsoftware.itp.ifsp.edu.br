import { Octokit } from "@octokit/rest";
import fs from "fs";
import axios from "axios";

// Configurações do Octokit
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Configurações do repositório
const owner = process.env.REPO_OWNER; // Nome do usuário ou organização
const repo = process.env.REPO_NAME; // Nome do repositório
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL; // URL do webhook do Discord

async function generateReport() {
  const { data: issues } = await octokit.issues.listForRepo({
    owner,
    repo,
    state: "all",
  });

  // Agrupar issues por autor
  const issuesByUser = {};

  issues.forEach(issue => {
    const author = issue.user.login;

    if (!issuesByUser[author]) {
      issuesByUser[author] = [];
    }
    issuesByUser[author].push(issue);
  });

  // Criação do conteúdo do relatório
  let report = "# Relatório Semanal de Issues por Usuário\n\n";

  for (const [user, userIssues] of Object.entries(issuesByUser)) {
    report += `## Issues de ${user}\n\n`;
    userIssues.forEach(issue => {
      report += `- [${issue.state}] ${issue.title} (#${issue.number})\n`;
    });
    report += "\n";
  }

  // Enviar o relatório para o Discord
  await sendReportToDiscord(report);
}

async function sendReportToDiscord(report) {
  const response = await axios.post(discordWebhookUrl, {
    content: report,
  });

  if (response.status === 204) {
    console.log("Relatório enviado com sucesso para o Discord!");
  } else {
    console.error("Falha ao enviar relatório para o Discord:", response.status);
  }
}

generateReport().catch(console.error);
