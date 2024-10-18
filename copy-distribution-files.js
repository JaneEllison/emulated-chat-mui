import { copyFile } from 'fs';
copyFile('_redirects', './dist/_redirects', () => {});
