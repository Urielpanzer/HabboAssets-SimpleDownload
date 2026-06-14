module.exports = {

    effects: {
        jsonUrl: 'https://swfs.nabbo.es/gamedata/json/EffectMap_new.json',
        fileUrl: 'https://swfs.nabbo.es/effect_new/%name%.nitro',
        outputDir: './dist/effects',
        arrayProperty: 'effects',
        nameProperty: 'lib'
    },

    clothes: {
        jsonUrl: 'https://swfs.nabbo.es/gamedata/json/FigureMap_new.json',
        fileUrl: 'https://swfs.nabbo.es/figure_new/%name%.nitro',
        outputDir: './dist/clothes',
        arrayProperty: 'libraries',
        nameProperty: 'id'
    },

    concurrentDownloads: 10
};