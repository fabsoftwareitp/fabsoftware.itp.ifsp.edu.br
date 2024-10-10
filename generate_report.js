const { Octokit } = require("@octokit/rest");
const fs = require("fs");

// Configurações do Octokit
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Configurações do repositório
const owner = process.env.REPO_OWNER; // Nome do usuário ou organização
const repo = process.env.REPO_NAME; // Nome do repositório

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

  // Escreve o relatório em um arquivo Markdown
  fs.writeFileSync("report.md", report);
}

generateReport().catch(console.error);
