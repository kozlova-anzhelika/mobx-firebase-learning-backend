module.exports = {
  '*.ts': [() => 'tsc --noEmit', 'prettier --check', 'eslint --max-warnings 0'],
};
