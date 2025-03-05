import fs from "fs";
import path from "path";
import matter from "gray-matter";

// This function will run only on the server during the build process
export const getProjects = async () => {
  const projectDir = path.join(process.cwd(), "src/projects"); // path to the 'projects' folder
  const filenames = fs.readdirSync(projectDir);

  return filenames.map((filename) => {
    const filePath = path.join(projectDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent); // Extract metadata (frontmatter) from the markdown file
    return {
      number: data.number,
      title: data.title,
      icon: data.icon,
      description: data.description,
      skills: data.skills,
    };
  });
};
