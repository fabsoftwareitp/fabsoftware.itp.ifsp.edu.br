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

async function generateDailyCommitsReport() {
  const today = new Date();
  const sinceDate = new Date(today);
  sinceDate.setDate(today.getDate() - 1); // Data de 24 horas atrás

  const { data: commits } = await octokit.repos.listCommits({
    owner,
    repo,
    since: sinceDate.toISOString(),
  });

  // Filtrar commits pelos usuários excluídos
  const filteredCommits = commits.filter(commit => {
    return !excludedUsers.includes(commit.committer.login);
  });

  // Criação do conteúdo do relatório
  let report = "# Relatório Diário de Commits\n\n";
  report += `**Projeto:** [${owner}/${repo}](https://github.com/${owner}/${repo})\n\n`;

  filteredCommits.forEach(commit => {
    report += `- [${commit.commit.committer.name}] ${commit.commit.message} ([Commit SHA: ${commit.sha}](https://github.com/${owner}/${repo}/commit/${commit.sha}))\n`;
  });

  // Enviar o relatório para o Discord
  await sendReportToDiscord(report);
}

async function sendReportToDiscord(report) {
  await axios.post(discordWebhookUrl, {
    content: report,
  });
}

generateDailyCommitsReport().catch(console.error);
