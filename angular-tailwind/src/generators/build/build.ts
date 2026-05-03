import {
  formatFiles,
  joinPathFragments,
  runTasksInSerial,
  Tree,
  updateJson,
} from '@nx/devkit';
import type { Schema as AngularApplicationSchema } from '@nx/angular/src/generators/application/schema';
import { E2eTestRunner } from '@nx/angular/src/utils/test-runners';
import { applicationGenerator } from '@nx/angular/generators';
import { BuildGeneratorSchema } from './schema';

/**
 * NgModule-based apps use `standalone: false` on components. The default
 * @angular-eslint flat config enables `prefer-standalone`, which fails CI.
 * We inject an override in the app eslint config.
 */
function ensurePreferStandaloneOffForNgModuleApp(
  tree: Tree,
  appRoot: string,
): void {
  const eslintPath = joinPathFragments(appRoot, 'eslint.config.mjs');
  if (!tree.exists(eslintPath)) {
    return;
  }
  const eslintRaw = tree.read(eslintPath, 'utf-8');
  if (!eslintRaw || eslintRaw.includes('@angular-eslint/prefer-standalone')) {
    return;
  }

  // Primary: match the current Nx Angular app eslint template
  const needle =
    "    rules: {\n      '@angular-eslint/directive-selector':";
  const replacement =
    "    rules: {\n      '@angular-eslint/prefer-standalone': 'off',\n      '@angular-eslint/directive-selector':";
  if (eslintRaw.includes(needle)) {
    tree.write(eslintPath, eslintRaw.replace(needle, replacement));
    return;
  }

  // Alternate: double-quoted files pattern
  const needle2 =
    '    rules: {\n      "@angular-eslint/directive-selector":';
  const replacement2 =
    '    rules: {\n      "@angular-eslint/prefer-standalone": "off",\n      "@angular-eslint/directive-selector":';
  if (eslintRaw.includes(needle2)) {
    tree.write(eslintPath, eslintRaw.replace(needle2, replacement2));
    return;
  }

  // Fallback: append a late override so we still pass even if the template changes
  const overrideBlock = `,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/prefer-standalone': 'off',
    },
  }`;
  const lastClose = eslintRaw.lastIndexOf('];');
  if (lastClose === -1) {
    return;
  }
  tree.write(
    eslintPath,
    eslintRaw.slice(0, lastClose) + overrideBlock + '\n' + eslintRaw.slice(lastClose),
  );
}

export async function buildGenerator(
  tree: Tree,
  options: BuildGeneratorSchema,
) {
  const projectName = options.name;

  const appDirectory = joinPathFragments('apps', projectName);

  const tasks: Array<() => void | Promise<void>> = [];
  const angularOptions: AngularApplicationSchema = {
    name: projectName,
    directory: appDirectory,
    standalone: false,
    style: 'scss',
    linter: 'eslint',
    e2eTestRunner: E2eTestRunner.Playwright,
  };
  const angularGenTask = await applicationGenerator(tree, angularOptions);
  if (angularGenTask) tasks.push(angularGenTask);

  ensurePreferStandaloneOffForNgModuleApp(tree, appDirectory);

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
