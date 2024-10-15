import data from "./report.json" assert { type: "json" };

function generateReport(performanceByAssignee) {
  let report = `# 🚀 Status \n\n`;
  for (const [assignee, data] of Object.entries(performanceByAssignee)) {
    report += `### 👤 **${assignee}**\n\n`;
    if (data.openIssues.length > 0) {
      data.openIssues.forEach((issue) => {
        report += `[#${issue.number} - ${issue.title}](${issue.html_url}), `;
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

console.log(generateReport(data));

/*`Data ${new Date(
              commit.commit.committer.date
            ).toLocaleDateString()} ${commit.html_url} (${repo})`;?*/
