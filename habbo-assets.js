const fs = require('fs');
const path = require('path');
const config = require('./config.js');

const type = process.argv[2];
const currentConfig = config[type];

async function downloadFile(url, filePath) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    fs.writeFileSync(filePath, buffer);
}

async function main() {
    if (!currentConfig) {
        console.error(`Tipo inválido: ${type}`);
        console.error(`Tipos disponibles: ${Object.keys(config).filter(k => typeof config[k] === 'object').join(', ')}`);
        process.exit(1);
    }

    console.log('type =', type);
    console.log('currentConfig =', currentConfig);

    const response = await fetch(currentConfig.jsonUrl);

    if (!response.ok) {
        throw new Error(`No se pudo descargar el JSON: HTTP ${response.status}`);
    }

    const data = await response.json();
    const items = data[currentConfig.arrayProperty];

    if (!Array.isArray(items)) {
        throw new Error(
            `La propiedad '${currentConfig.arrayProperty}' no existe o no es un array`
        );
    }

    fs.mkdirSync(currentConfig.outputDir, { recursive: true });

    let downloaded = 0;
    let failed = 0;

    for (const item of items) {
        const name = item[currentConfig.nameProperty];

        if (!name) continue;

        const fileName = `${name}.nitro`;

        const url = currentConfig.fileUrl.replace(
            '%name%',
            name
        );

        try {
            await downloadFile(
                url,
                path.join(currentConfig.outputDir, fileName)
            );

            downloaded++;
            console.log(`OK ${fileName}`);
        } catch (err) {
            failed++;
            console.log(`ERROR ${fileName} (${err.message})`);
        }
    }

    console.log('\nFinalizado');
    console.log(`Descargados: ${downloaded}`);
    console.log(`Errores: ${failed}`);
}

main().catch(err => {
    console.error('Error fatal:', err);
});