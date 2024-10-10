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
const excludedUsers = ['danilocbueno', 'rafalmeida-ifsp']; // Usuários a serem excluídos
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL; // URL do webhook do Discord


async function generatePerformanceReport() {
  const { data: issues } = await octokit.issues.listForRepo({
    owner,
    repo,
    state: "all",
  });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Data de uma semana atrás

  // Contagem de issues por assignee
  const performanceByAssignee = {};

  issues.forEach((issue) => {
    const assignees = issue.assignees.map((a) => a.login); // Lista de assignees

    assignees.forEach((assignee) => {
        
      if (!performanceByAssignee[assignee]) {
        performanceByAssignee[assignee] = {
          completedLastWeek: 0, // Contador de issues completadas na última semana
          totalCompleted: 0, // Contador total de issues completadas
        };
      }

      // Conta todas as issues fechadas
      if (issue.state === "closed") {
        performanceByAssignee[assignee].totalCompleted += 1;

        // Conta apenas issues fechadas na última semana
        if (new Date(issue.closed_at) >= oneWeekAgo) {
          performanceByAssignee[assignee].completedLastWeek += 1;
        }
      }
    });
  });

  // Criação do conteúdo do relatório
  let report = "# Relatório de Performance por Assignee\n\n";

  for (const [assignee, data] of Object.entries(performanceByAssignee)) {
    report += `- ${assignee}: ${data.completedLastWeek} issues concluídas na última semana, ${data.totalCompleted} total de issues completadas\n`;
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

generatePerformanceReport().catch(console.error);
