/**
 * @author Fernando del Rosal Cuesta.
 * Entorno grafico para Buscaminas.
 */

{
    let dificultad;

    let muestraTablero = function (f, c,tamanio,) {

        let div = document.getElementsByTagName("div")[2];
        console.log(div);
        div.innerHTML = "";

        let filas;
        let inputcampo;

        let banderas = document.getElementById("banderas");
        let minas = document.getElementById("minas");
        let tiempo = document.getElementById("tiempo");
        banderas.innerHTML = 0 + "🚩 | ";
        minas.innerHTML = 0 + "💣 | ";
        tiempo.innerHTML = "Tiempo: -:- | ";
        puntuacion.innerHTML = "Puntuacion: -:-";
        
        

        for (let i = 0; i < f; i++) {
            filas = document.createElement("div");
            for (let j = 0; j < c; j++) {
                inputcampo = document.createElement("input");

                inputcampo.type = "button";
                inputcampo.setAttribute("value", " ");
                inputcampo.setAttribute("id", i + "-" + j);
                inputcampo.style.width = tamanio;
                inputcampo.style.height = tamanio;
                
                
                filas.appendChild(inputcampo);
            }
            div.appendChild(filas);
        }
    }

    let init = function () {
        muestraTablero(10,10,'32px');
        dificultad = document.querySelector("select");
        dificultad.addEventListener("change", function (ev) {
           
            switch (ev.target.value) {
                case "facil":
                    muestraTablero(10,10,'32px');

                    break;
                case "medio":
                    muestraTablero(12,12,'30px');
                    break;
                case "dificil":
                    muestraTablero(15,15,'28px');
                    break;
            }
        });


    }

    document.addEventListener('DOMContentLoaded', init);
}