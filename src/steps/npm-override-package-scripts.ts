import { readFile } from '../file-system/read-file';
import { writeFile } from '../file-system/write-file';

export async function overrideNpmScripts(): Promise<void> {
  // TODO Make it strongly typed.
  // TODO Console -- overriding tsconfig settings.
  const packageJsonPath = `package.json`;

  const emptyCustomScripts =
`"test": "echo \\"Error: no test specified\\" && exit 1"`;

  const actualCustomScripts =
`"test": "karma start",
    "test:single-run": "karma start --single-run",
    "tslint": "tslint -c ./.config/tslint.json 'src/**/*.ts' -t stylish",
    "double-check": "npm run test:single-run && npm run tslint"`;

  const packageJsonText = [
    [emptyCustomScripts, actualCustomScripts],
  ].reduce(
    (subResult, replacement) => {
      const [searchValue, replaceValue] = replacement;
      return subResult.replace(searchValue, replaceValue);
    },
    (await readFile(packageJsonPath)).toString(),
  );

  await writeFile(packageJsonPath, packageJsonText);

}
