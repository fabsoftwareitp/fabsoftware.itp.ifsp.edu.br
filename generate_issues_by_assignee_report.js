import { Octokit } from "@octokit/rest";
import axios from "axios";
import { configDotenv } from "dotenv";
import fs from "fs";

configDotenv();
// Configurações do Octokit
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Configurações da organização
const org = process.env.ORG_NAME; // Nome da organização
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL; // URL do webhook do Discord

const repos = [
  "fabsoftware.itp.ifsp.edu.br",
  "geekif.fabsoftware.itp.ifsp.edu.br",
  "space.fabsoftware.itp.ifsp.edu.br",
  "pongo.fabsoftware.itp.ifsp.edu.br",
  "philab.fabsoftware.itp.ifsp.edu.br",
  "ranking.fabsoftware.itp.ifsp.edu.br",
  "pong.fabsoftware.itp.ifsp.edu.br",
];

const users = ["Leo2828", "JoniEmann", "maLu70", "MarcosFabSoftware2"];

async function generateOrganizationReport() {
  // Estruturas para dados por assignee
  const performanceByAssignee = {};

  for (const repo of repos) {
    const issuesResponse = await octokit.issues.listForRepo({
      owner: org,
      repo: repo,
      state: "all",
    });

    const commitsResponse = await octokit.repos.listCommits({
      owner: org,
      repo: repo,
      per_page: 2,
    });

    const issues = issuesResponse.data;
    const commits = commitsResponse.data;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Data de uma semana atrás

    issues.forEach((issue) => {
      const assignees = issue.assignees.map((a) => a.login); // Lista de assignees

      assignees.forEach((assignee) => {
        if (!users.includes(assignee)) return;

        // Inicializa dados para assignee
        if (!performanceByAssignee[assignee]) {
          performanceByAssignee[assignee] = {
            completedLastWeek: 0,
            totalCompleted: 0,
            openIssues: [],
            lastCommits: [],
          };
        }

        commits.forEach((commit) => {
          if (commit.author.login == assignee) {
            performanceByAssignee[assignee].lastCommits.push(commit);
          }
        });

        // Conta apenas issues fechadas
        if (issue.state === "closed") {
          performanceByAssignee[assignee].totalCompleted += 1;

          // Conta apenas issues fechadas na última semana
          if (new Date(issue.closed_at) >= oneWeekAgo) {
            performanceByAssignee[assignee].completedLastWeek += 1;
          }
        }

        // Armazena issues abertas por assignee
        if (issue.state !== "closed") {
          performanceByAssignee[assignee].openIssues.push(issue);
        }
      });
    });
  }

  //console.log(performanceByAssignee);

  fs.writeFileSync(
    "report.json",
    JSON.stringify(performanceByAssignee, null, 2)
  );

  const report = generateReport(performanceByAssignee);
  await sendReportToDiscord(report);
}

function generateReport(performanceByAssignee) {
  let report = `# 🚀 Status \n\n`;
  for (const [assignee, data] of Object.entries(performanceByAssignee)) {
    report += `### 👤 **${assignee}**\n\n`;
    if (data.openIssues.length > 0) {
      data.openIssues.forEach((issue) => {
        report += `[#${issue.number} - ${issue.title}](${issue.url}), `;
      });
    } else {
      report += `- Nenhuma issue aberta.`;
    }
    report += `\n`;
    report += `- **${data.completedLastWeek}** issues fechadas na última semana\n`;
    report += `- **${data.totalCompleted}** issues fechadas no total\n`;

    if (data.lastCommits.length > 0) {
      report += `- **${data.lastCommits.length}** commits na semana passada\n`;
    } else {
      report += `- Nenhum commit na última semana.\n`;
    }
    report += `\n`;
  }
  return report;
}

async function sendReportToDiscord(report) {
  await axios.post(discordWebhookUrl, {
    content: report,
  });
}
generateOrganizationReport().catch(console.error);

async function getMembersAndAssignedIssues(org) {
  try {
    // Get all members of the organization
    const membersResponse = await octokit.rest.orgs.listMembers({
      org,
      per_page: 100,
    });

    const members = membersResponse.data;

    console.log(members);
  } catch (error) {
    console.error("Error fetching members or assigned issues:", error);
  }
}

// const teams = await getMembersAndAssignedIssues("fabsoftwareitp");
// console.log(teams);
