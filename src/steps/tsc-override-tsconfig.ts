import { readFile } from '../file-system/read-file';
import { writeFile } from '../file-system/write-file';

export async function overrideTsConfig(): Promise<void> {
  // TODO Make it strongly typed.
  // TODO Console -- overriding tsconfig settings.
  const tsconfigJsonPath = `tsconfig.json`;

  const tsConfigText = [
    [`"target": "es5"`, `"target": "es2015"`],
    [`// "lib": []`, `"lib": ["dom", "es2015"]`],
    [`// "declaration": true`, `"declaration": true`],
    [`// "sourceMap": true`, `"sourceMap": true`],
    [`// "outDir": "./"`, `"outDir": "./dist"`],
  ].reduce(
    (subResult, replacement) => {
      const [searchValue, replaceValue] = replacement;
      return subResult.replace(searchValue, replaceValue);
    },
    (await readFile(tsconfigJsonPath)).toString(),
  );

  await writeFile(tsconfigJsonPath, tsConfigText);

}
