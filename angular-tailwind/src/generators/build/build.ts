import {
  formatFiles,
  joinPathFragments,
  runTasksInSerial,
  Tree,
  updateJson,
} from '@nx/devkit';
import { applicationGenerator } from '@nx/angular/generators';
import { BuildGeneratorSchema } from './schema';

export async function buildGenerator(
  tree: Tree,
  options: BuildGeneratorSchema,
) {
  const projectName = options.name;

  const appDirectory = joinPathFragments('apps', projectName);

  const tasks: Array<() => void | Promise<void>> = [];
  const angularGenTask = await applicationGenerator(tree, {
    name: projectName,
    directory: appDirectory,
    standalone: false,
    style: 'scss',
    linter: 'eslint',
    e2eTestRunner: 'playwright',
    // keep other defaults from workspace nx.json
  } as any);
  if (angularGenTask) tasks.push(angularGenTask);

  // Ensure the generated global stylesheet imports Tailwind v4
  const stylesScssPath = `apps/${projectName}/src/styles.scss`;
  if (tree.exists(stylesScssPath)) {
    tree.write(stylesScssPath, '@import "tailwindcss";\n');
  }

  // Patch project.json to add tailwind targets + build dependency + output stylesheet
  const projectJsonPath = `apps/${projectName}/project.json`;
  if (tree.exists(projectJsonPath)) {
    updateJson(tree, projectJsonPath, (json) => {
      const targets = (json.targets ??= {});

      targets['tailwindcss-build'] = {
        executor: 'nx:run-commands',
        options: {
          cwd: `apps/${projectName}`,
          command:
            'npx @tailwindcss/cli -i ./src/styles.scss -o ./src/output.scss',
        },
      };

      targets['tailwindcss-watch'] = {
        executor: 'nx:run-commands',
        options: {
          cwd: `apps/${projectName}`,
          command:
            'npx @tailwindcss/cli -i ./src/styles.scss -o ./src/output.scss --watch',
        },
      };

      if (targets.build) {
        const build = targets.build;
        const dependsOn = (build.dependsOn ??= []);
        if (Array.isArray(dependsOn) && !dependsOn.includes('tailwindcss-build')) {
          dependsOn.push('tailwindcss-build');
        }

        // Update build options styles to use generated output.scss
        build.options ??= {};
        build.options.styles = [`apps/${projectName}/src/output.scss`];
      }

      return json;
    });
  }

  // Optional: ensure output.scss exists after first build (not committed, but helps editors)
  const outputScssPath = `apps/${projectName}/src/output.scss`;
  if (!tree.exists(outputScssPath)) {
    // Seed an empty file so Angular build doesn't choke if someone runs build without tailwind first.
    // (In practice, build dependsOn tailwindcss-build.)
    tree.write(outputScssPath, '');
  }

  // Keep generator template folder unused for now; we rely on @nx/angular generator output.
  await formatFiles(tree);
  return runTasksInSerial(...tasks);
}

export default buildGenerator;
