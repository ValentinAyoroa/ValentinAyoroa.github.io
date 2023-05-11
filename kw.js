module.exports = {

    mostarPantalla: function (req, res) {
        let kw = require('./kw.json');
        res.render('index', { pago: 0, pago2: 0, valor: 0, valorP: kw.valorPasado, valorP2: kw.valorPasado2 });
    },

    calcularKW: function CalcularKW(req, res) {
        const fs = require('fs');
        let kw = require('./kw.json');
        let valorActual = req.body.medidor;
        let valorActual2 = req.body.medidor2;
        let valorkw = 12.6570;
        medidorKw = valorActual - kw.valorPasado;
        medidor2Kw = valorActual2 - kw.valorPasado2;
        let pagoMedidor = Number(((medidorKw - medidor2Kw) * valorkw)).toFixed(2);
        let pagoMedidor2 = Number((medidor2Kw * valorkw)).toFixed(2);
        if(pagoMedidor>0 && pagoMedidor2>=0){
            kw.valorPasado = valorActual;
            kw.valorPasado2 = valorActual2;
            fs.writeFileSync('kw.json', JSON.stringify(kw));
        } else if(valorActual==-1){
            kw.valorPasado = 0;
            kw.valorPasado2 = 0;
            pagoMedidor = 0;
            pagoMedidor2 = 0;
            fs.writeFileSync('kw.json', JSON.stringify(kw));
        }
        res.render('index', { pago: pagoMedidor, pago2: pagoMedidor2, valor: valorActual, valorP: kw.valorPasado, valorP2: kw.valorPasado2});
    }
}
