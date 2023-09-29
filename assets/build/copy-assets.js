const { promises: fs } = require("fs")
const path = require("path")

async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    let entries = await fs.readdir(src, { withFileTypes: true });

    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        entry.isDirectory() ?
            await copyDir(srcPath, destPath) :
            await fs.copyFile(srcPath, destPath);
    }
}

// Copy all Bootstrap SCSS files.
copyDir('./node_modules/bootstrap4/scss', './assets/scss/vendor/bootstrap4');
copyDir('./node_modules/bootstrap/scss', './assets/scss/vendor/bootstrap5');
// Copy all Font Awesome SCSS files.
copyDir('./node_modules/font-awesome/scss', './assets/scss/vendor/fontawesome');
