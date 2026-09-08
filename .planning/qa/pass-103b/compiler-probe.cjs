const fs = require('node:fs');
const vm = require('node:vm');
const { transformSync } = require('next/dist/build/swc');
const { renderToStaticMarkup } = require('react-dom/server');
const cases = {
  entityMultiline: '<dd><span>$99</span> at launch &middot; $149\n after</dd>',
  entitySingleLine: '<dd><span>$99</span> at launch &middot; $149 after</dd>',
  plainMultiline: '<dd><span>$99</span> at launch / $149\n after</dd>',
  explicitSpace: '<dd><span>$99</span>{" "}at launch &middot; $149\n after</dd>',
};
const report = {};
for (const [name, source] of Object.entries(cases)) {
  const { code } = transformSync('module.exports = ' + source, {
    jsc: { parser: { syntax: 'ecmascript', jsx: true },
      transform: { react: { runtime: 'automatic' } }, target: 'es2020' },
    module: { type: 'commonjs' },
  });
  const context = { require, module: { exports: {} }, exports: {} };
  vm.runInNewContext(code, context);
  report[name] = { source, compiled: code, html: renderToStaticMarkup(context.module.exports) };
}
const built = fs.readFileSync('.next/server/app/playbook.html', 'utf8');
report.builtPrice = built.match(/<dt>Price<\/dt><dd>.*?<\/dd>/)[0];
console.log(JSON.stringify(report, null, 2));
